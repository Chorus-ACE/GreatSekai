import Foundation
import SekaiKit
import SwiftUI
import WebKit

struct StoryPlayerView: View {
    let episode: Episode
    @Environment(\.scenePhase) private var scenePhase
    @State private var locale: SekaiLocale
    @State private var configuration: String?
    @State private var error: String?
    @State private var loading = true
    @State private var missingModels = false
    @State private var retry = 0

    init(episode: Episode) {
        self.episode = episode
        _locale = State(initialValue: episode.locale)
    }

    var body: some View {
        VStack(spacing: 0) {
            HStack {
                Label("Story.player.jp-source", systemImage: "globe.asia.australia")
                Spacer()
                Text(verbatim: locale.rawValue.uppercased())
                    .accessibilityLabel(Text("Story.player.text-region"))
                    .accessibilityValue(locale.rawValue.uppercased())
            }
            .font(.caption)
            .foregroundStyle(.secondary)
            .padding(.horizontal)
            .padding(.vertical, 8)
            if missingModels {
                Label("Story.player.missing-models", systemImage: "exclamationmark.triangle")
                    .font(.caption).padding(8)
            }
            ZStack {
                Color.black
                if let configuration {
                    StoryPlayerWebView(configuration: configuration, active: scenePhase == .active,
                                       loading: $loading, error: $error, missingModels: $missingModels)
                        .id("\(locale.rawValue)-\(retry)")
                }
                if loading, error == nil {
                    ProgressView("Story.player.loading")
                        .padding().background(.regularMaterial, in: RoundedRectangle(cornerRadius: 12))
                }
                if let error {
                    ContentUnavailableView {
                        Label("Story.player.error", systemImage: "exclamationmark.triangle")
                    } description: {
                        Text(error)
                    } actions: {
                        Button("General.retry") { retry += 1 }
                    }
                    .background(.regularMaterial)
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .navigationTitle(episode.title)
        .toolbar {
            ToolbarItem {
                Menu {
                    LocalePicker($locale) { Text("Story.player.text-region") }.pickerStyle(.inline)
                } label: {
                    Label("Story.player.text-region", systemImage: "globe")
                }
            }
            ToolbarItem {
                Button("Story.player.restart", systemImage: "arrow.counterclockwise") { retry += 1 }
            }
        }
        .task(id: "\(locale.rawValue)-\(retry)") {
            configuration = nil
            error = nil
            missingModels = false
            loading = true
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
    }
}

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
        case "loading": owner.loading = true
        case "prepared", "loaded": owner.loading = false
        case "missingModels": owner.missingModels = true
        case "error":
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
        owner.error = String(localized: "Story.player.process-ended")
        owner.loading = false
    }
    private func fail(_ error: Error) {
        guard !stopped else { return }
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
