import AVKit
import SekaiKit
import SwiftUI

struct SongDetailMusicVideoView: View {
    let content: LocalizedData<Song.VideoContent>?
    @State private var locale = SekaiLocale.primaryLocale
    @State private var selectedID: String?
    private var locales: [SekaiLocale] {
        SekaiLocale.allCases.filter { !(content?[$0]?.videos.isEmpty ?? true) }
    }
    private var videos: [Song.MusicVideo] { content?[locale]?.videos ?? [] }
    private var selectedVideo: Song.MusicVideo? {
        videos.first { $0.id == selectedID } ?? videos.first
    }

    var body: some View {
        Group {
            if !locales.isEmpty {
                Section {
                    VStack {
                        if videos.count > 1 {
                            Picker("Song.music-video.version", selection: Binding(
                                get: { selectedVideo?.id }, set: { selectedID = $0 }
                            )) {
                                ForEach(videos) { video in
                                    Text(video.caption.map { video.mediaType.localizedName + " · " + $0 } ?? video.mediaType.localizedName)
                                        .tag(Optional(video.id))
                                }
                            }
                            .pickerStyle(.menu)
                        }
                        if let selectedVideo {
                            SongMoviePlayer(video: selectedVideo).id(selectedVideo.id)
                        }
                    }
                    .frame(maxWidth: infoContentMaxWidth)
                } header: {
                    HStack {
                        Text("Song.music-video").font(.title2).bold()
                        if locales.count > 1 {
                            DetailSectionOptionPicker(selection: $locale, options: locales)
                        }
                        Spacer()
                    }
                    .frame(maxWidth: infoContentMaxWidth)
                    .detailSectionHeader()
                }
            }
        }
        .onChange(of: locales, initial: true) {
            if !locales.contains(locale) {
                locale = locales.contains(.secondaryLocale) ? .secondaryLocale : (locales.first ?? .primaryLocale)
            }
        }
    }
}

private struct SongMoviePlayer: View {
    let video: Song.MusicVideo
    @State private var player = AVPlayer()
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
                .aspectRatio(16.0 / 9.0, contentMode: .fit)
            } else if failed {
                ContentUnavailableView {
                    Label("Song.music-video.unavailable", systemImage: "film")
                } actions: {
                    Button("General.retry") { retry += 1 }
                }
            } else {
                SongVideoPlayerView(player: player)
                    .aspectRatio(16.0 / 9.0, contentMode: .fit)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
            }
        }
        .task(id: retry) {
            loading = true
            failed = false
            statusObservation?.invalidate()
            player.replaceCurrentItem(with: nil)
            do {
                guard let url = await video.videoURL() else { throw URLError(.resourceUnavailable) }
                let asset = try await SongMovieAsset.make(videoURL: url, audioURL: video.audioURL)
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
        .onDisappear {
            statusObservation?.invalidate()
            statusObservation = nil
            player.pause()
            player.replaceCurrentItem(with: nil)
        }
    }
}

// Avoid _AVKit_SwiftUI's generic VideoPlayer host, which aborts while
// initializing its superclass metadata on macOS 27.3.
#if os(macOS)
private struct SongVideoPlayerView: NSViewRepresentable {
    let player: AVPlayer

    func makeNSView(context: Context) -> AVPlayerView {
        let view = AVPlayerView()
        view.controlsStyle = .inline
        view.videoGravity = .resizeAspect
        view.player = player
        return view
    }

    func updateNSView(_ view: AVPlayerView, context: Context) {
        if view.player !== player { view.player = player }
    }

    static func dismantleNSView(_ view: AVPlayerView, coordinator: ()) {
        view.player = nil
    }
}
#else
private struct SongVideoPlayerView: UIViewControllerRepresentable {
    let player: AVPlayer

    func makeUIViewController(context: Context) -> AVPlayerViewController {
        let controller = AVPlayerViewController()
        controller.player = player
        return controller
    }

    func updateUIViewController(_ controller: AVPlayerViewController, context: Context) {
        if controller.player !== player { controller.player = player }
    }

    static func dismantleUIViewController(_ controller: AVPlayerViewController, coordinator: ()) {
        controller.player = nil
    }
}
#endif
