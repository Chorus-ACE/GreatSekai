import AVKit
import Combine
import Observation
import SekaiKit
import SwiftUI

struct SongDetailMusicVideoView: View {
    let content: LocalizedData<Song.VideoContent>?
    @State private var selectedID: String?
    private var videos: [Song.MusicVideo] { content?[.primaryLocale]?.videos ?? [] }
    private var selectedVideo: Song.MusicVideo? {
        videos.first { $0.id == selectedID } ?? videos.first
    }

    var body: some View {
        Group {
            if !videos.isEmpty {
                Section {
                    if let selectedVideo {
                        SongMoviePlayer(video: selectedVideo)
                            .id(selectedVideo.id)
                            .frame(maxWidth: infoContentMaxWidth)
                    }
                } header: {
                    HStack {
                        Text("Song.music-video").font(.title2).bold()
                        if videos.count > 1 {
                            DetailSectionOptionPicker(
                                selection: Binding(get: { selectedVideo?.id ?? "" }, set: { selectedID = $0 }),
                                options: videos.map(\.id),
                                labels: Dictionary(uniqueKeysWithValues: videos.map { video in
                                    (video.id, video.caption.map { video.mediaType.localizedName + " · " + $0 }
                                        ?? video.mediaType.localizedName)
                                })
                            )
                        }
                        Spacer()
                    }
                    .frame(maxWidth: infoContentMaxWidth)
                    .detailSectionHeader()
                }
            }
        }
    }
}

private struct SongMoviePlayer: View {
    let video: Song.MusicVideo
    @State private var playback = SongMoviePlayback()
    private var player: AVPlayer { playback.player }
    @State private var loading = true
    @State private var failed = false
    @State private var retry = 0
    @State private var statusObservation: NSKeyValueObservation?

    var body: some View {
        Group {
            if loading {
                CustomGroupBox(useExtenedConstraints: true) {
                    ProgressView()
                }
            } else if failed {
                DetailUnavailableView(title: "Song.music-video.unavailable", symbol: "film")
            } else {
                SongVideoPlayerView(playback: playback)
                    .aspectRatio(16.0 / 9.0, contentMode: .fit)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
            }
        }
        .task(id: retry) {
            // Returning to an inline player must preserve an active PiP timeline.
            if playback.isPictureInPictureActive, player.currentItem != nil {
                loading = false
                return
            }
            loading = true
            failed = false
            statusObservation?.invalidate()
            player.replaceCurrentItem(with: nil)
            do {
                guard let url = await video.videoURL() else { throw URLError(.resourceUnavailable) }
                let asset = try await SongMovieAsset.make(videoURL: url, audioURL: video.audioURL, startOffset: video.startOffset)
                try Task.checkCancellation()
                let item = AVPlayerItem(asset: asset)
                statusObservation = item.observe(\.status, options: [.new]) { item, _ in
                    let didFail = item.status == .failed
                    if didFail {
                        Task { @MainActor in
                            if player.currentItem === item { failed = true }
                        }
                    }
                }
                player.replaceCurrentItem(with: item)
                loading = false
            } catch {
                guard !Task.isCancelled else { return }
                failed = true
                loading = false
            }
        }
        .onReceive(NotificationCenter.default.publisher(for: .AVPlayerItemFailedToPlayToEndTime)) { notification in
            if let item = notification.object as? AVPlayerItem, item === player.currentItem { failed = true }
        }
        .onAppear { playback.isVisible = true }
        .onReceive(player.publisher(for: \.timeControlStatus).receive(on: DispatchQueue.main)) { status in
            #if os(iOS)
            if status != .paused {
                try? AVAudioSession.sharedInstance().setCategory(.playback, mode: .moviePlayback)
                try? AVAudioSession.sharedInstance().setActive(true)
            }
            #endif
        }
        .onDisappear {
            statusObservation?.invalidate()
            statusObservation = nil
            playback.isVisible = false
            playback.stopIfHidden()
        }
    }
}

@MainActor @Observable private final class SongMoviePlayback {
    let player: AVPlayer = {
        let player = AVPlayer()
        player.audiovisualBackgroundPlaybackPolicy = .continuesIfPossible
        return player
    }()
    var isVisible = true
    var isPictureInPictureActive = false

    func stopIfHidden() {
        guard !isVisible, !isPictureInPictureActive else { return }
        player.pause()
        player.replaceCurrentItem(with: nil)
    }
}

// Avoid _AVKit_SwiftUI's generic VideoPlayer host, which aborts while
// initializing its superclass metadata on macOS 27.3.
#if os(macOS)
private struct SongVideoPlayerView: NSViewRepresentable {
    let playback: SongMoviePlayback
    private var player: AVPlayer { playback.player }

    func makeCoordinator() -> Coordinator { Coordinator(playback: playback) }

    func makeNSView(context: Context) -> AVPlayerView {
        let view = SongAVPlayerView()
        view.controlsStyle = .inline
        view.allowsPictureInPicturePlayback = true
        view.pictureInPictureDelegate = context.coordinator
        view.videoGravity = .resizeAspect
        view.player = player
        return view
    }

    func updateNSView(_ view: AVPlayerView, context: Context) {
        if view.player !== player { view.player = player }
    }

    static func dismantleNSView(_ view: AVPlayerView, coordinator: Coordinator) {
        if !coordinator.playback.isPictureInPictureActive { view.player = nil }
    }

    final class Coordinator: NSObject, AVPlayerViewPictureInPictureDelegate {
        let playback: SongMoviePlayback
        init(playback: SongMoviePlayback) { self.playback = playback }

        func playerViewWillStartPicture(inPicture playerView: AVPlayerView) {
            playback.isPictureInPictureActive = true
        }

        func playerViewDidStopPicture(inPicture playerView: AVPlayerView) {
            playback.isPictureInPictureActive = false
            playback.stopIfHidden()
        }

        func playerView(_ playerView: AVPlayerView, failedToStartPictureInPictureWithError error: any Error) {
            playback.isPictureInPictureActive = false
            playback.stopIfHidden()
        }
    }
}

private final class SongAVPlayerView: AVPlayerView {
    // Native playback controls otherwise consume wheel events as seeking.
    override func hitTest(_ point: NSPoint) -> NSView? {
        if NSApp.currentEvent?.type == .scrollWheel {
            return bounds.contains(convert(point, from: superview)) ? self : nil
        }
        return super.hitTest(point)
    }

    override func scrollWheel(with event: NSEvent) {
        nextResponder?.scrollWheel(with: event)
    }
}
#else
private struct SongVideoPlayerView: UIViewControllerRepresentable {
    let playback: SongMoviePlayback
    private var player: AVPlayer { playback.player }

    func makeCoordinator() -> Coordinator { Coordinator(playback: playback) }

    func makeUIViewController(context: Context) -> AVPlayerViewController {
        let controller = AVPlayerViewController()
        controller.player = player
        controller.delegate = context.coordinator
        controller.allowsPictureInPicturePlayback = true
        controller.canStartPictureInPictureAutomaticallyFromInline = true
        return controller
    }

    func updateUIViewController(_ controller: AVPlayerViewController, context: Context) {
        if controller.player !== player { controller.player = player }
    }

    static func dismantleUIViewController(_ controller: AVPlayerViewController, coordinator: Coordinator) {
        if !coordinator.playback.isPictureInPictureActive { controller.player = nil }
    }

    final class Coordinator: NSObject, AVPlayerViewControllerDelegate {
        let playback: SongMoviePlayback
        init(playback: SongMoviePlayback) { self.playback = playback }

        func playerViewControllerWillStartPictureInPicture(_ playerViewController: AVPlayerViewController) {
            playback.isPictureInPictureActive = true
        }

        func playerViewControllerDidStopPictureInPicture(_ playerViewController: AVPlayerViewController) {
            playback.isPictureInPictureActive = false
            playback.stopIfHidden()
        }

        func playerViewController(_ playerViewController: AVPlayerViewController, failedToStartPictureInPictureWithError error: any Error) {
            playback.isPictureInPictureActive = false
            playback.stopIfHidden()
        }

        func playerViewController(_ playerViewController: AVPlayerViewController,
                                  restoreUserInterfaceForPictureInPictureStopWithCompletionHandler completionHandler: @escaping (Bool) -> Void) {
            completionHandler(playback.isVisible)
        }
    }
}
#endif
