import Astray
import SwiftUI
import SekaiKit
import Foundation
import AVFoundation
import AudioToolbox
import SDWebImageSwiftUI

struct StoryPlayerCommand: Equatable {
    let id = UUID()
    let lineID: Int
}

struct StoryPlaybackControls: Equatable {
    var autoPlay = true
    var fast = false
    var uiHidden = false
    var voice = true
}

struct StoryPlayerView: View {
    let episode: Episode
    let locale: SekaiLocale
    @Environment(\.scenePhase) private var scenePhase
    @Environment(\.colorScheme) private var colorScheme
    @Binding var currentLineID: Int?
    @Binding var playing: Bool
    @Binding var fullscreen: Bool
    let fillsScreen: Bool
    let safeAreaInsets: EdgeInsets
    let jump: StoryPlayerCommand?
    let transcript: [StoryTranscript.Line]
    let stopTranscriptVoice: () -> Void
    @State private var playbackControls = StoryPlaybackControls()
    @State private var backlogPresented = false
    @State private var backlogLines: [StoryTranscript.Line] = []
    @State private var lastTranscriptLineID: Int?
    @State private var requested = false
    @State private var player = Astray.StoryPlayer()
    @State private var renderer: StoryRenderer?
    @State private var document: StoryPlaybackDocument?
    @State private var error: String?
    @State private var loading = true
    @State private var missingModels = false
    @State private var retry = 0
    @State private var muted = false
    @State private var muteChosen = false

    var body: some View {
        VStack {
            StoryStageLayout(fullscreen: fullscreen) {
                ZStack {
                    Rectangle().fill(.black)
                    if requested {
                        if let renderer {
                            AstrayStoryView(
                                renderer: renderer,
                                contentMode: fillsScreen ? .fill : .fit,
                                safeAreaInsets: safeAreaInsets
                            )
                        }
                        if loading, error == nil {
                            ProgressView("Story.player.loading")
                                .wrapIf(colorScheme == .light, in: { content in
                                    content.colorInvert()
                                })
                                .opacity(0.8)
                        }
                        if let error {
                            ContentUnavailableView {
                                Label("Story.player.error", systemImage: "exclamationmark.triangle")
                            } description: { Text(error) } actions: {
                                Button("General.retry") { retry += 1 }
                            }
                            .padding(safeAreaInsets)
                            .background(.regularMaterial)
                        }
                    } else {
                        Button(action: {
                            requested = true
                        }, label: {
                            Image(systemName: "play.fill")
                                .foregroundStyle(.white)
                                .opacity(0.7)
                                .font(.system(size: 50))
                                .accessibilityLabel("Story.player.load")
                        })
                        .buttonStyle(.borderless)
                    }
                    #if os(iOS)
                    if requested, !loading, !playbackControls.uiHidden {
                        VStack {
                            HStack {
                                Spacer()
                                actionMenu
                                    .wrapIf(true) { content in
                                        if #available(iOS 26.0, *) { content.buttonStyle(.glass) }
                                        else { content.buttonStyle(.bordered) }
                                    }
                                    .buttonBorderShape(.circle)
                            }
                            Spacer()
                        }
                        .padding(7)
                        .padding(safeAreaInsets)
                    }
                    #endif
                }
            }
            .clipped()
            if !fullscreen {
                controls
                if missingModels {
                    Label("Story.player.missing-models", systemImage: "exclamationmark.triangle")
                        .font(.caption)
                }
            }
        }
        .frame(maxWidth: .infinity, maxHeight: fullscreen ? .infinity : nil)
        #if !os(iOS)
        .toolbar {
            if requested {
                ToolbarItem { actionMenu.buttonBorderShape(.circle) }
                if fullscreen {
                    ToolbarItem(placement: .navigation) {
                        Button("Story.player.exit-fullscreen", systemImage: "xmark") { fullscreen = false }
                    }
                }
            }
        }
        #endif
        .sheet(isPresented: $backlogPresented) {
            StoryBacklogView(lines: backlogLines, locale: locale)
                .onAppear(perform: stopTranscriptVoice)
                #if os(macOS)
                .frame(width: 500, height: 350)
                #endif
        }
        .onChange(of: currentLineID) {
            if let currentLineID { lastTranscriptLineID = currentLineID }
        }
        .task(id: "\(requested)-\(locale.rawValue)-\(retry)") {
            guard requested else { return }
            await load()
        }
        .onChange(of: scenePhase) { updateActivity() }
        .onChange(of: backlogPresented) { updateActivity() }
        .onChange(of: playbackControls) { updateControls() }
        .onChange(of: muted) { updateControls() }
        .onChange(of: player.isDialogueHidden) {
            playbackControls.uiHidden = player.isDialogueHidden
        }
        .onChange(of: jump) {
            guard let jump, let index = document?.snippetIndex(for: jump.lineID) else { return }
            do {
                try player.jump(to: index)
                updateActivity()
            } catch {
                fail(error)
            }
        }
        .onDisappear {
            player.onEvent = nil
            player.stop()
            playing = false
        }
        .task {
            #if os(iOS)
            let silent = await StorySilentMode.check()
            if !muteChosen { muted = silent }
            #endif
        }
    }

    private func load() async {
        player.onEvent = nil
        player.stop()
        renderer = nil
        document = nil
        currentLineID = nil
        lastTranscriptLineID = nil
        playing = false
        error = nil
        missingModels = false
        loading = true
        stopTranscriptVoice()
        #if os(iOS)
        try? AVAudioSession.sharedInstance().setCategory(.playback)
        try? AVAudioSession.sharedInstance().setActive(true)
        #endif
        do {
            let document = try await StoryPlaybackDocument.load(for: episode, textLocale: locale)
            let renderer = try StoryRenderer(player: player)
            let resolver = try await document.assetResolver()
            try Task.checkCancellation()
            self.document = document
            player.onEvent = { event in
                switch event {
                case .progress(let index, _), .dialogue(let index):
                    currentLineID = document.lineID(at: index)
                case .finished:
                    currentLineID = nil
                    playing = false
                case .warning(let warning):
                    switch warning {
                    case .assetUnavailable(let url, _) where url.path.contains("/live2d/"):
                        missingModels = true
                    case .renderingFailed, .metalUnavailable, .shaderLibraryUnavailable:
                        fail(warning)
                    default: break
                    }
                default: break
                }
            }
            updateControls()
            try await player.load(document.scenario, resolver: resolver)
            try Task.checkCancellation()
            self.renderer = renderer
            loading = false
            updateActivity()
        } catch is CancellationError {
        } catch {
            guard !Task.isCancelled else { return }
            fail(error)
        }
    }
    
    private func updateControls() {
        player.isAutomatic = playbackControls.autoPlay
        player.isFastForwarding = playbackControls.fast
        player.isDialogueHidden = playbackControls.uiHidden
        player.setVolume(
            bgm: muted ? 0 : 0.7,
            voice: muted || !playbackControls.voice ? 0 : 1,
            sound: muted ? 0 : 1
        )
    }
    
    private func updateActivity() {
        guard !loading, error == nil else { return }
        if scenePhase == .active, !backlogPresented {
            player.play()
        } else {
            player.pause()
        }
        playing = player.status == .playing
    }
    
    private func fail(_ error: Error) {
        player.pause()
        playing = false
        currentLineID = nil
        loading = false
        self.error = error.localizedDescription
    }
    
    private var availableBacklog: [StoryTranscript.Line] {
        guard let lastTranscriptLineID,
              let index = transcript.firstIndex(where: { $0.id == lastTranscriptLineID }) else { return [] }
        return Array(transcript[...index]).filter { $0.characterIDs != nil || $0.textKind == .narration }
    }

    private var actionMenu: some View {
        Menu {
            Section {
                Toggle("Story.player.auto", systemImage: "play", isOn: $playbackControls.autoPlay)
                Button("Story.player.hide-auto", systemImage: "pano.badge.play") {
                    playbackControls.autoPlay = true
                    playbackControls.uiHidden = true
                }
                Toggle("Story.player.fast", systemImage: "forward", isOn: $playbackControls.fast)
                Button("Story.player.log", systemImage: "text.document") {
                    backlogLines = availableBacklog
                    backlogPresented = true
                }
                .disabled(availableBacklog.isEmpty)
                Toggle("Story.player.hide", systemImage: "xmark", isOn: $playbackControls.uiHidden)
                Toggle("Story.player.voice", systemImage: "person.wave.2", isOn: $playbackControls.voice)
                Toggle("Story.player.mute", systemImage: muted ? "speaker.wave.2" : "speaker.slash", isOn: $muted)
                    .onChange(of: muted) { muteChosen = true }
                Button(fullscreen ? "Story.player.exit-fullscreen" : "Story.player.fullscreen",
                       systemImage: fullscreen ? "arrow.up.forward.and.arrow.down.backward" : "arrow.down.backward.and.arrow.up.forward") {
                    fullscreen.toggle()
                }
            }
        } label: {
            Image(systemName: "ellipsis")
                #if os(iOS)
                .font(.system(size: 20)).padding(5)
                #endif
        }
        .menuStyle(.button)
        .menuIndicator(.hidden)
        .disabled(loading || error != nil)
    }

    private var controls: some View {
        HStack {
            Button {
                muteChosen = true
                muted.toggle()
            } label: {
                Label("Story.player.mute", systemImage: muted ? "speaker.slash" : "speaker.wave.2")
                    .foregroundStyle(muted ? Color.red : Color.primary)
                    .labelStyle(.iconOnly)
                    #if os(macOS)
                    .frame(width: 10)
                    #else
                    .frame(width: 15)
                    #endif
                    .contentTransition(.symbolEffect(.replace.magic(fallback: .downUp)))
            }
            Button {
                fullscreen.toggle()
            } label: {
                Label(fullscreen ? "Story.player.exit-fullscreen" : "Story.player.fullscreen",
                      systemImage: fullscreen ? "arrow.up.forward.and.arrow.down.backward" : "arrow.down.backward.and.arrow.up.forward")
            }
            .disabled(!requested)
        }
        .wrapIf(true) { content in
            #if !os(visionOS)
            if #available(iOS 26.0, macOS 26.0, *) {
                content.buttonStyle(.glass)
            } else {
                content.buttonStyle(.bordered)
            }
            #else
            content.buttonStyle(.bordered)
            #endif
        }
        .buttonBorderShape(.capsule)
    }
}

private struct StoryStageLayout: Layout {
    let fullscreen: Bool
    
    func sizeThatFits(
        proposal: ProposedViewSize,
        subviews: Subviews,
        cache: inout ()
    ) -> CGSize {
        let width = proposal.width.flatMap { $0.isFinite ? $0 : nil } ?? 1280
        let height = proposal.height.flatMap { $0.isFinite ? $0 : nil } ?? width * 9 / 16
        return .init(width: width, height: fullscreen ? height : width * 9 / 16)
    }
    
    func placeSubviews(
        in bounds: CGRect,
        proposal: ProposedViewSize,
        subviews: Subviews,
        cache: inout ()
    ) {
        for subview in subviews {
            subview.place(
                at: bounds.origin,
                anchor: .topLeading,
                proposal: .init(width: bounds.width, height: bounds.height)
            )
        }
    }
}

#if os(iOS)
// Like Greatdori's Mute dependency, infer silent mode from the completion time
// of a silent System Sound. System Sounds respect the ringer switch even while
// the app's playback audio session permits explicitly unmuted story audio.
private enum StorySilentMode {
    @MainActor static func check() async -> Bool {
        let url = FileManager.default.temporaryDirectory.appendingPathComponent("story-silence.wav")
        var data = Data()
        func bytes(_ value: UInt32, count: Int = 4) {
            for index in 0..<count { data.append(UInt8((value >> (8 * index)) & 255)) }
        }
        data.append(contentsOf: "RIFF".utf8); bytes(8856)
        data.append(contentsOf: "WAVEfmt ".utf8); bytes(16); bytes(1, count: 2); bytes(1, count: 2)
        bytes(22050); bytes(44100); bytes(2, count: 2); bytes(16, count: 2)
        data.append(contentsOf: "data".utf8); bytes(8820); data.append(Data(count: 8820))
        do { try data.write(to: url, options: .atomic) } catch { return false }
        var sound: SystemSoundID = 0
        guard AudioServicesCreateSystemSoundID(url as CFURL, &sound) == kAudioServicesNoError else { return false }
        let soundID = sound
        let start = ContinuousClock.now
        return await withCheckedContinuation { continuation in
            AudioServicesPlaySystemSoundWithCompletion(soundID) {
                let silent = start.duration(to: .now) < .milliseconds(100)
                AudioServicesDisposeSystemSoundID(soundID)
                continuation.resume(returning: silent)
            }
        }
    }
}
#endif

// Backlog layout adapted from Greatdori's ISVBacklogView (Apache-2.0).
// https://greatdori.com/LICENSE.txt
private struct StoryBacklogView: View {
    let lines: [StoryTranscript.Line]
    let locale: SekaiLocale
    @Environment(\.dismiss) private var dismiss
    @State private var player = AVPlayer()
    @State private var voiceLineID: Int?

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading) {
                    ForEach(lines) { line in
                        HStack(alignment: .top) {
                            Button {
                                if voiceLineID == line.id { stopVoice(); return }
                                stopVoice()
                                guard let url = line.voiceURL else { return }
                                voiceLineID = line.id
                                player.replaceCurrentItem(with: AVPlayerItem(url: url))
                                player.play()
                            } label: {
                                ZStack(alignment: .bottomTrailing) {
                                    avatar(line)
                                        .frame(width: 40, height: 40)
                                    if line.voiceURL != nil {
                                        Image(systemName: "speaker.wave.3.fill")
                                            .foregroundStyle(Color.accentColor)
                                            .shadow(color: .white, radius: 1)
                                            .offset(x: 5, y: 5)
                                    }
                                }
                            }
                            .buttonStyle(.plain)
                            .disabled(line.voiceURL == nil)
                            .accessibilityLabel(Text("Story.play-voice"))
                            VStack(alignment: .leading) {
                                Text(line.speaker.isEmpty ? String(localized: "Story.narrator") : line.speaker)
                                    .font(.system(size: 15))
                                    .foregroundStyle(.white)
                                    .padding(.horizontal, 10)
                                    .frame(width: 200, alignment: .leading)
                                    .frame(minHeight: 20)
                                    .background(Color.accentColor, in: Capsule())
                                Text(displayedText(line))
                                    .font(.system(size: 16))
                                    .textSelection(.enabled)
                                    .padding(.leading, 20)
                            }
                            Spacer(minLength: 0)
                        }
                        .padding(.bottom)
                    }
                }
                .padding()
                .typesettingLanguage(.explicit(.init(identifier: locale.nsLocale.language.minimalIdentifier)))
            }
            .navigationTitle("Story.player.log")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button { dismiss() } label: {
                        Label("General.done", systemImage: "xmark")
                            #if os(macOS)
                            .labelStyle(.titleOnly)
                            #else
                            .labelStyle(.iconOnly)
                            #endif
                    }
                }
            }
        }
        .onReceive(NotificationCenter.default.publisher(for: .AVPlayerItemDidPlayToEndTime)) { notification in
            if let item = notification.object as? AVPlayerItem, item === player.currentItem { stopVoice() }
        }
        .onDisappear { stopVoice() }
    }

    @ViewBuilder private func avatar(_ line: StoryTranscript.Line) -> some View {
        if line.textKind == .narration || line.speaker.isEmpty {
            Image(systemName: "person").resizable().scaledToFit()
        } else if let id = line.characterIDs?.first, let url = SekaiKit.Character.iconImageURL(forID: id) {
            WebImage(url: url) { $0.resizable().scaledToFit() } placeholder: {
                Image(systemName: "person.crop.circle").resizable().scaledToFit()
            }
        } else {
            Image(systemName: "person.crop.circle").resizable().scaledToFit()
        }
    }

    private func displayedText(_ line: StoryTranscript.Line) -> String {
        guard line.textKind == .narration else { return line.text }
        return line.text.split(separator: "\n", omittingEmptySubsequences: false)
            .map { String($0.drop(while: { $0.isWhitespace })) }.joined(separator: "\n")
    }

    private func stopVoice() {
        player.pause()
        player.replaceCurrentItem(with: nil)
        voiceLineID = nil
    }
}
