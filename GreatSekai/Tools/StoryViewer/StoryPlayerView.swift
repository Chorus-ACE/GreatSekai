import AVFoundation
import AudioToolbox
import Foundation
import SekaiKit
import SwiftUI
import WebKit
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

    var javaScript: String {
        "{auto: \(autoPlay), fast: \(fast), uiHidden: \(uiHidden), voice: \(voice)}"
    }
}

struct StoryPlayerView: View {
    let episode: Episode
    let locale: SekaiLocale
    @Environment(\.scenePhase) private var scenePhase
    @Environment(\.colorScheme) private var colorScheme
    @Binding var currentLineID: Int?
    @Binding var playing: Bool
    @Binding var fullscreen: Bool
    let jump: StoryPlayerCommand?
    let transcript: [StoryTranscript.Line]
    let stopTranscriptVoice: () -> Void
    @State private var playbackControls = StoryPlaybackControls()
    @State private var backlogPresented = false
    @State private var backlogLines: [StoryTranscript.Line] = []
    @State private var lastTranscriptLineID: Int?
    @State private var requested = false
    @State private var configuration: String?
    @State private var error: String?
    @State private var loading = true
    @State private var missingModels = false
    @State private var retry = 0
    @State private var muted = false
    @State private var muteChosen = false

    var body: some View {
        VStack {
            ZStack {
                Rectangle().fill(.black)
                if requested {
                    if let configuration {
                        StoryPlayerWebView(configuration: configuration, active: scenePhase == .active,
                                           loading: $loading, error: $error, missingModels: $missingModels,
                                           currentLineID: $currentLineID, playing: $playing,
                                           muted: $muted, fullscreen: $fullscreen, controls: $playbackControls, jump: jump)
                            .id("\(locale.rawValue)-\(retry)")
                    }
                    if loading, error == nil {
                        ProgressView("Story.player.loading")
                            .wrapIf(colorScheme == .light, in: { content in
                                content.colorInvert()
                            })
                            .opacity(0.8)
//                            .padding().background(.regularMaterial, in: RoundedRectangle(cornerRadius: 12))
                    }
                    if let error {
                        ContentUnavailableView {
                            Label("Story.player.error", systemImage: "exclamationmark.triangle")
                        } description: { Text(error) } actions: {
                            Button("General.retry") { retry += 1 }
                        }
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
                    }.padding(7)
                }
                #endif
            }
            .aspectRatio(fullscreen ? nil : 16.0 / 9, contentMode: .fit)
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
            currentLineID = nil
            lastTranscriptLineID = nil
            playing = false
            configuration = nil
            error = nil
            missingModels = false
            loading = true
            #if os(iOS)
            try? AVAudioSession.sharedInstance().setCategory(.playback)
            try? AVAudioSession.sharedInstance().setActive(true)
            #endif
            do {
                let result = try await StoryPlaybackDocument.configuration(for: episode, textLocale: locale)
                try Task.checkCancellation()
                configuration = result
            } catch is CancellationError {
            } catch {
                guard !Task.isCancelled else { return }
                self.error = error.localizedDescription
                loading = false
            }
        }
        .task {
            #if os(iOS)
            let silent = await StorySilentMode.check()
            if !muteChosen { muted = silent }
            #endif
        }
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

/// The JP record supplies staging and audio. Each selected region supplies its own
/// episode record and scenario URL; bundle paths are never inferred across regions.
enum StoryPlaybackDocument {
    static func resolve(_ episode: Episode, in locale: SekaiLocale) async throws -> Episode {
        if episode.locale == locale { return episode }
        let episodes = await Episode.all(in: locale, kind: episode.kind)
        try Task.checkCancellation()
        guard let match = episodes?.first(where: { $0.episodeID == episode.episodeID && $0.parentID == episode.parentID }) else {
            throw PlaybackError(key: locale == .jp ? "Story.player.no-jp" : "Story.player.no-region")
        }
        return match
    }

    static func scenario(_ episode: Episode) async throws -> [String: Any] {
        guard let url = episode.scenarioURL else { throw URLError(.badURL) }
        var request = URLRequest(url: url)
        request.timeoutInterval = 30
        let (data, response) = try await URLSession.shared.data(for: request)
        try Task.checkCancellation()
        guard let response = response as? HTTPURLResponse, (200..<300).contains(response.statusCode) else {
            throw PlaybackError(key: "Story.unavailable")
        }
        guard let object = try JSONSerialization.jsonObject(with: data) as? [String: Any],
              object["Snippets"] is [Any], object["TalkData"] is [Any],
              object["SpecialEffectData"] is [Any] else {
            throw PlaybackError(key: "Story.player.invalid-script")
        }
        return object
    }

    static func configuration(for episode: Episode, textLocale: SekaiLocale) async throws -> String {
        let jp = try await resolve(episode, in: .jp)
        let script = try await scenario(jp)
        let menu: [String: String] = [
            "fullscreen": String(localized: "Story.player.fullscreen"),
            "auto": String(localized: "Story.player.auto"),
            "mute": String(localized: "Story.player.mute"),
            "fast": String(localized: "Story.player.fast"),
            "hide": String(localized: "Story.player.hide"),
            "log": String(localized: "Story.player.log")
        ]
        let labels: [String: Any] = [
            "start": String(localized: "Story.player.start"),
            "loading": String(localized: "Story.player.loading"),
            "models": String(localized: "Story.player.models"),
            "files": String(localized: "Story.player.files"),
            "preloading": String(localized: "Story.player.preloading"),
            "preloadFailed": String(localized: "Story.player.preload-failed"),
            "retry": String(localized: "General.retry"),
            "continue": String(localized: "Story.player.continue"),
            "menu": menu
        ]
        let language = Bundle.main.preferredLocalizations.first ?? "en"
        let uiLocale = language.hasPrefix("zh") ? "zh" : language.hasPrefix("ja") ? "ja" : "en"
        let textScript = textLocale == .jp ? "ja" : textLocale == .en ? "latin" : textLocale == .kr ? "ko" : "zh"
        var object: [String: Any] = [
            "scenario": script, "kind": jp.kind.rawValue,
            "textScript": textScript, "language": textLocale.nsLocale.identifier,
            "uiLocale": uiLocale, "closeLabel": String(localized: "General.done"), "labels": labels
        ]
        if jp.kind == .event {
            let path = jp.scenarioPath.split(separator: "/")
            guard path.count > 1, path[0] == "event_story" else { throw PlaybackError(key: "Story.player.invalid-script") }
            object["eventBundle"] = String(path[1])
        }
        if textLocale != .jp {
            let regional = try await resolve(episode, in: textLocale)
            object["regional"] = try await scenario(regional)
        }
        let data = try JSONSerialization.data(withJSONObject: object, options: [.sortedKeys])
        guard let json = String(data: data, encoding: .utf8) else { throw PlaybackError(key: "Story.player.invalid-script") }
        return json
    }

    struct PlaybackError: LocalizedError {
        let key: String
        var errorDescription: String? { NSLocalizedString(key, comment: "") }
    }
}

@MainActor final class StoryPlayerWebCoordinator: NSObject, WKURLSchemeHandler, WKScriptMessageHandler, WKNavigationDelegate {
    var owner: StoryPlayerWebView
    private var ready = false
    private var sentConfiguration: String?
    private var sentActive: Bool?
    private var stopped = false
    private var sentMuted: Bool?
    private var sentJump: UUID?
    private var sentControls: StoryPlaybackControls?

    init(_ owner: StoryPlayerWebView) { self.owner = owner }

    func webView(_ webView: WKWebView, start urlSchemeTask: any WKURLSchemeTask) {
        do {
            guard let url = urlSchemeTask.request.url, url.host == "viewer",
                  let root = Bundle.main.url(forResource: "StoryPlayerWeb", withExtension: "bundle") else {
                throw URLError(.fileDoesNotExist)
            }
            let file = root.appendingPathComponent(url.path).standardizedFileURL.resolvingSymlinksInPath()
            guard file.path.hasPrefix(root.resolvingSymlinksInPath().path + "/") else { throw URLError(.noPermissionsToReadFile) }
            let mime: String
            switch file.pathExtension {
            case "html": mime = "text/html"
            case "js", "mjs": mime = "text/javascript"
            case "css": mime = "text/css"
            case "txt": mime = "text/plain"
            default: throw URLError(.unsupportedURL)
            }
            let data = try Data(contentsOf: file)
            let response = URLResponse(url: url, mimeType: mime, expectedContentLength: data.count, textEncodingName: "utf-8")
            urlSchemeTask.didReceive(response)
            urlSchemeTask.didReceive(data)
            urlSchemeTask.didFinish()
        } catch {
            urlSchemeTask.didFailWithError(error)
        }
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: any WKURLSchemeTask) {}

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard !stopped, message.frameInfo.isMainFrame,
              message.frameInfo.request.url?.scheme == "sekai-story",
              let body = message.body as? [String: Any], let type = body["type"] as? String else { return }
        switch type {
        case "ready":
            ready = true
            if let view = message.webView { update(view) }
        case "mode":
            if let muted = body["muted"] as? Bool { owner.muted = muted }
            if let auto = body["auto"] as? Bool, let fast = body["fast"] as? Bool,
               let hidden = body["uiHidden"] as? Bool, let voice = body["voice"] as? Bool {
                owner.controls = StoryPlaybackControls(autoPlay: auto, fast: fast, uiHidden: hidden, voice: voice)
            }
        case "fullscreen": owner.fullscreen = true
        case "playing": owner.playing = true
        case "progress": owner.currentLineID = body["transcriptIndex"] as? Int
        case "ended": owner.currentLineID = nil; owner.playing = false
        case "loading":
            owner.playing = false
            owner.currentLineID = nil
            owner.loading = true
        case "prepared", "loaded": owner.loading = false
        case "missingModels": owner.missingModels = true
        case "error":
            owner.playing = false
            owner.currentLineID = nil
            owner.loading = false
            let message = body["message"] as? String ?? ""
            owner.error = message == "regionalMismatch" ? String(localized: "Story.player.regional-mismatch") : message
        default: break
        }
    }

    func update(_ view: WKWebView) {
        guard ready, !stopped else { return }
        // Set lifecycle state before loading so a page initialized in the background stays idle.
        if sentActive != owner.active {
            sentActive = owner.active
            view.evaluateJavaScript("window.storyPlayer.setActive(\(owner.active)); null")
        }
        if sentControls != owner.controls {
            sentControls = owner.controls
            view.evaluateJavaScript("window.storyPlayer.setModes(\(owner.controls.javaScript)); null")
        }
        if sentMuted != owner.muted {
            sentMuted = owner.muted
            view.evaluateJavaScript("window.storyPlayer.setMuted(\(owner.muted)); null")
        }
        if let jump = owner.jump, sentJump != jump.id {
            sentJump = jump.id
            view.evaluateJavaScript("window.storyPlayer.jumpTo(\(jump.lineID)); null")
        }
        if sentConfiguration != owner.configuration {
            sentConfiguration = owner.configuration
            view.evaluateJavaScript("window.storyPlayer.load(\(owner.configuration)); null") { [weak self] _, error in
                guard let self, !self.stopped, let error else { return }
                self.owner.error = error.localizedDescription
                self.owner.loading = false
            }
        }
    }

    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction,
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        let url = navigationAction.request.url
        decisionHandler(url?.scheme == "sekai-story" && url?.host == "viewer" ? .allow : .cancel)
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        fail(error)
    }
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) { fail(error) }
    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        guard !stopped else { return }
        owner.playing = false
        owner.currentLineID = nil
        owner.error = String(localized: "Story.player.process-ended")
        owner.loading = false
    }
    private func fail(_ error: Error) {
        guard !stopped else { return }
        owner.playing = false
        owner.currentLineID = nil
        owner.error = error.localizedDescription
        owner.loading = false
    }

    func stop(_ view: WKWebView) {
        stopped = true
        view.evaluateJavaScript("window.storyPlayer?.destroy(); null")
        view.setAllMediaPlaybackSuspended(true)
        view.stopLoading()
        view.configuration.userContentController.removeScriptMessageHandler(forName: "storyPlayer")
        view.navigationDelegate = nil
    }
}

#if os(macOS)
struct StoryPlayerWebView: NSViewRepresentable {
    let configuration: String
    let active: Bool
    @Binding var loading: Bool
    @Binding var error: String?
    @Binding var missingModels: Bool
    @Binding var currentLineID: Int?
    @Binding var playing: Bool
    @Binding var muted: Bool
    @Binding var fullscreen: Bool
    @Binding var controls: StoryPlaybackControls
    let jump: StoryPlayerCommand?
    func makeCoordinator() -> StoryPlayerWebCoordinator { StoryPlayerWebCoordinator(self) }
    func makeNSView(context: Context) -> WKWebView { makeStoryWebView(context.coordinator) }
    func updateNSView(_ view: WKWebView, context: Context) { context.coordinator.owner = self; context.coordinator.update(view) }
    static func dismantleNSView(_ view: WKWebView, coordinator: StoryPlayerWebCoordinator) { coordinator.stop(view) }
}
#else
struct StoryPlayerWebView: UIViewRepresentable {
    let configuration: String
    let active: Bool
    @Binding var loading: Bool
    @Binding var error: String?
    @Binding var missingModels: Bool
    @Binding var currentLineID: Int?
    @Binding var playing: Bool
    @Binding var muted: Bool
    @Binding var fullscreen: Bool
    @Binding var controls: StoryPlaybackControls
    let jump: StoryPlayerCommand?
    func makeCoordinator() -> StoryPlayerWebCoordinator { StoryPlayerWebCoordinator(self) }
    func makeUIView(context: Context) -> WKWebView { makeStoryWebView(context.coordinator) }
    func updateUIView(_ view: WKWebView, context: Context) { context.coordinator.owner = self; context.coordinator.update(view) }
    static func dismantleUIView(_ view: WKWebView, coordinator: StoryPlayerWebCoordinator) { coordinator.stop(view) }
}
#endif

@MainActor private func makeStoryWebView(_ coordinator: StoryPlayerWebCoordinator) -> WKWebView {
    let configuration = WKWebViewConfiguration()
    configuration.setURLSchemeHandler(coordinator, forURLScheme: "sekai-story")
    configuration.userContentController.add(coordinator, name: "storyPlayer")
    configuration.preferences.isElementFullscreenEnabled = true
    configuration.mediaTypesRequiringUserActionForPlayback = []
    #if !os(macOS)
    configuration.allowsInlineMediaPlayback = true
    #endif
    let view = WKWebView(frame: .zero, configuration: configuration)
    view.navigationDelegate = coordinator
    #if os(macOS)
    view.allowsMagnification = false
    #else
    view.scrollView.isScrollEnabled = false
    view.scrollView.bounces = false
    #endif
    view.load(URLRequest(url: URL(string: "sekai-story://viewer/index.html")!))
    return view
}

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
