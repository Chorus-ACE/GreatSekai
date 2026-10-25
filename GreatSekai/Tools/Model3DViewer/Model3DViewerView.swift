import SekaiKit
import Observation
import SwiftUI
import WebKit

struct Model3DViewerView: View {
    @State private var locale: SekaiLocale = .primaryLocale
    @State private var library: Model3DLibrary?
    @State private var configuration: Model3DRenderConfiguration?
    @State private var characterID = ""
    @State private var selection: Model3DSelection?
    @State private var error: String?
    @State private var loading = true
    @State private var retry = 0
    @State private var viewControls = Model3DViewControls()
    
    @State var inspectorIsDisplaying = true
    @State var inspectorTab: ModelInspectorTab? = .character
    
    @Environment(\.horizontalSizeClass) var sizeClass

    private var character: Model3DCharacter? {
        library?.characters.first { $0.id == characterID }
    }

    var body: some View {
        ZStack {
            if let configuration {
                Model3DWebView(configuration: configuration, viewControls: viewControls, loading: $loading, error: $error)
                    .id("\(configuration.locale.rawValue)-\(configuration.revision)-\(retry)")
            } else if !loading, error == nil {
                ContentUnavailableView("Model-3d.empty", systemImage: "cube.transparent")
            }
            
            if loading || error != nil {
                Rectangle()
                    .foregroundStyle(.black)
                    .opacity(0.3)
            }
            
            if loading {
                ProgressView()
            }
            
            if let error {
                VStack {
                    ContentUnavailableView("Model-3d.error", systemImage: "exclamationmark.circle", description: Text(error))
                    Button("Model-3d.retry") {
                        retry += 1
                    }
                    .buttonStyle(.bordered)
                }
                .padding()
                .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 10))
            }
        }
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                if sizeClass == .regular {
                    Picker(selection: Binding.init(get: {
                        inspectorTab
                    }, set: {
                        if $0 == inspectorTab {
                            inspectorTab = nil
                            inspectorIsDisplaying = false
                        } else {
                            inspectorTab = $0
                            inspectorIsDisplaying = true
                        }
                    }), content: {
                        ForEach(ModelInspectorTab.allCases, id: \.self) { item in
                            Label(item.localizedLabel, systemImage: item.symbol)
                                .tag(item)
                        }
                    }, label: {
                        Label("Model-3d.inspector", systemImage: "sidebar.trailing")
                    })
                    .pickerStyle(.inline)
                } else {
                    Button(action: {
                        inspectorIsDisplaying.toggle()
                    }, label: {
                        Label("Model-3d.inspector", systemImage: "sidebar.trailing")
                    })
                }
            }
        }
        .wrapIf(sizeClass == .regular) { content in
            content.inspector(isPresented: $inspectorIsDisplaying) { panel() }
        } else: { content in
            content.sheet(isPresented: $inspectorIsDisplaying) { panel() }
        }
        .navigationTitle("App.tools.model3d-viewer")
        .task(id: "\(locale.rawValue)-\(retry)") {
            loading = true; error = nil; configuration = nil; library = nil; selection = nil
            do {
                let result = try await Model3DClient.shared.library(for: locale)
                try Task.checkCancellation()
                library = result
                characterID = result.characters.first?.id ?? ""
                resetSelection()
                if configuration == nil { loading = false }
            } catch is CancellationError { } catch { self.error = error.localizedDescription; loading = false }
        }
        .onChange(of: characterID) { resetSelection() }
        .onChange(of: selection) { resolve() }
    }

    private func panel() -> some View {
        VStack(spacing: 0) {
            if sizeClass == .compact {
                Picker(selection: $inspectorTab) {
                    ForEach(ModelInspectorTab.allCases, id: \.self) { item in
                        Text(item.localizedLabel).tag(Optional(item))
                    }
                } label: {
                    Label("Model-3d.inspector", systemImage: "sidebar.trailing")
                }
                .pickerStyle(.palette)
                .labelsHidden()
                .padding()
            }
            switch inspectorTab {
            case .character:
                Form {
                    LocalePicker($locale) { Text("Model-3d.region") }
//                    if let library {
                        Picker("Model-3d.character", selection: $characterID) {
                            ForEach(Unit.allCases, id: \.self) { unit in
                                Section(unit.localizedName) {
                                    ForEach(unit.members, id: \.self) { item in
                                        Text(SekaiCache.preCache.character(id: item)?.fullName.forLocale(locale) ?? String(localized: "Info.unknown"))
                                            .typesettingLanguage(.explicit(locale.nsLocale.language))
                                            .tag(item)
                                    }
                                }
                            }
//                            ForEach(library.characters) { character in
//                                Text(SekaiCache.preCache.character(id: character.characterID)?.fullName.forLocale(locale) ?? character.name ?? String(character.characterID))
//                                    .typesettingLanguage(.explicit(locale.nsLocale.language))
//                                    .tag(character.id)
//                            }
                        }
                    
//                    }
                    Section("Model-3d.view") {
                        LabeledContent("Model-3d.view.zoom") {
                            HStack {
                                Text(viewControls.zoom, format: .percent.precision(.fractionLength(0)))
                                    .monospacedDigit()
                                    .foregroundStyle(.primary)
                                Stepper("Model-3d.view.zoom", value: $viewControls.zoom, in: 0.5...3, step: 0.1)
                                    .labelsHidden()
                            }
                        }
                        Button(action: viewControls.reset) {
                            Label("Model-3d.view.reset", systemImage: "arrow.counterclockwise")
                        }
                    }
                    .disabled(loading || error != nil || !viewControls.isEnabled)
                }
                .formStyle(.grouped)
            case .costume, .hairstyle, .accessory:
                if let character, let inspectorTab {
                    partBrowser(for: inspectorTab, character: character)
                        .id("\(locale.rawValue)-\(characterID)-\(inspectorTab)")
                } else if loading {
                    ProgressView().frame(maxWidth: .infinity, maxHeight: .infinity)
                } else {
                    ContentUnavailableView("Model-3d.empty", systemImage: "hanger")
                }
            case nil:
                EmptyView()
            }
        }
        .presentationDetents([.medium, .large])
        .presentationDragIndicator(.visible)
        .presentationBackgroundInteraction(.enabled)
    }

    @ViewBuilder private func partBrowser(for tab: ModelInspectorTab, character: Model3DCharacter) -> some View {
        switch tab {
        case .costume:
            Model3DPartBrowser(groups: character.costumes.map { .init(id: $0.id, name: $0.name, variants: $0.variants) },
                               selection: binding(\.costumeID), locale: locale, tab: tab)
        case .hairstyle:
            Model3DPartBrowser(groups: character.hairstyles.map { .init(id: $0.id, name: $0.name, variants: $0.variants) },
                               selection: binding(\.hairstyleID), locale: locale, tab: tab,
                               isLocked: configuration?.hairstyleIsLocked == true)
        case .accessory:
            Model3DPartBrowser(groups: character.accessories.map { .init(id: $0.id, name: $0.name, variants: $0.variants) },
                               selection: accessoryBinding, locale: locale, tab: tab, allowsNone: true)
        case .character:
            EmptyView()
        }
    }

    private func resetSelection() {
        selection = character?.defaultSelection()
        resolve()
    }

    private func resolve() {
        guard let library, let selection else { configuration = nil; return }
        do {
            let resolved = try library.resolve(selection)
            self.selection = resolved.selection
            configuration = resolved
            error = nil
        } catch { self.error = error.localizedDescription; loading = false }
    }

    private func binding(_ keyPath: WritableKeyPath<Model3DSelection, String>) -> Binding<String?> {
        Binding(get: { selection?[keyPath: keyPath] }, set: { value in
            guard let value else { return }
            selection?[keyPath: keyPath] = value
        })
    }

    private var accessoryBinding: Binding<String?> {
        Binding(get: { selection?.accessoryID }, set: { selection?.accessoryID = $0 })
    }
}

enum ModelInspectorTab: CaseIterable {
    case character
    case costume
    case hairstyle
    case accessory
    
    var symbol: String {
        switch self {
        case .character: "person.2"
        case .costume: "hanger"
        case .hairstyle: "scissors"
        case .accessory: "crown"
        }
    }
    
    var localizedLabel: LocalizedStringResource {
        switch self {
        case .character: "Model-3d.inspector.character"
        case .costume: "Model-3d.inspector.costume"
        case .hairstyle: "Model-3d.inspector.hairstyle"
        case .accessory: "Model-3d.inspector.accessory"
        }
    }
    
//    func countLabel(_ count: Int) -> LocalizedStringResource? {
//        switch self {
//        case .costume: "Model-3d.inspector.costume.\(count)"
//        case .hairstyle: "Model-3d.inspector.hairstyle.\(count)"
//        case .accessory: "Model-3d.inspector.accessory.\(count)"
//        default: nil
//        }
//    }
}

/// Native inspector actions and the camera state reported by the active web viewer.
@MainActor @Observable final class Model3DViewControls {
    private var zoomValue = 1.0
    /// Writable for Stepper/Slider bindings. Web feedback updates the backing value directly.
    var zoom: Double {
        get { zoomValue }
        set {
            guard isEnabled, newValue.isFinite else { return }
            let value = min(3, max(0.5, newValue))
            guard value != zoomValue else { return }
            zoomValue = value
            send("window.setModelViewZoom(\(value)); null")
        }
    }
    
    private(set) var isEnabled = false
    @ObservationIgnored private weak var webView: WKWebView?

    var canZoomIn: Bool { isEnabled && zoom < 3 }
    var canZoomOut: Bool { isEnabled && zoom > 0.5 }

    func attach(_ view: WKWebView) {
        webView = view
        zoomValue = 1
        isEnabled = false
    }

    func isAttached(to view: WKWebView?) -> Bool {
        guard let view else { return false }
        return webView === view
    }

    func detach(_ view: WKWebView) {
        guard isAttached(to: view) else { return }
        webView = nil
        isEnabled = false
    }

    func update(zoom: Double, enabled: Bool, from view: WKWebView) {
        guard isAttached(to: view), zoom.isFinite, (0.5...3).contains(zoom) else { return }
        zoomValue = zoom
        isEnabled = enabled
    }

    func setUnavailable() { isEnabled = false }
    func zoomIn() { if canZoomIn { send("window.zoomModelViewBy(1.2); null") } }
    func zoomOut() { if canZoomOut { send("window.zoomModelViewBy(1 / 1.2); null") } }
    func reset() { if isEnabled { send("window.resetModelView(); null") } }

    private func send(_ script: String) {
        guard let webView else { return }
        webView.evaluateJavaScript(script) { [weak self, weak webView] _, error in
            guard let self, self.isAttached(to: webView), error != nil else { return }
            self.setUnavailable()
        }
    }
}

@MainActor final class Model3DWebCoordinator: NSObject, WKURLSchemeHandler, WKScriptMessageHandler, WKNavigationDelegate {
    let configuration: Model3DRenderConfiguration
    var owner: Model3DWebView
    var ready = false
    var sentSelection = ""
    private var sentColorScheme: ColorScheme?
    private var tasks: [ObjectIdentifier: Task<Void, Never>] = [:]
    init(_ owner: Model3DWebView) {
        self.owner = owner; configuration = owner.configuration
    }

    func webView(_ webView: WKWebView, start urlSchemeTask: any WKURLSchemeTask) {
        let id = ObjectIdentifier(urlSchemeTask)
        tasks[id] = Task { @MainActor in
            defer { tasks.removeValue(forKey: id) }
            do {
                guard let url = urlSchemeTask.request.url else { throw URLError(.badURL) }
                let data: Data
                let path = String(url.path.dropFirst())
                if url.host == "runtime" {
                    data = try await Model3DClient.shared.resource(at: path, in: configuration)
                } else {
                    guard url.host == "viewer", !path.contains(".."), !path.contains("\\"),
                          let bundle = Bundle.main.url(forResource: "Model3DWeb", withExtension: "bundle") else { throw URLError(.fileDoesNotExist) }
                    data = try Data(contentsOf: bundle.appendingPathComponent(path))
                }
                try Task.checkCancellation()
                let mime: String
                switch url.pathExtension {
                case "html": mime = "text/html"
                case "js", "mjs": mime = "text/javascript"
                case "css": mime = "text/css"
                case "wasm": mime = "application/wasm"
                case "png": mime = "image/png"
                default: mime = "application/octet-stream"
                }
                let response = HTTPURLResponse(url: url, statusCode: 200, httpVersion: "HTTP/1.1", headerFields: ["Content-Type": mime, "Access-Control-Allow-Origin": "*"])!
                urlSchemeTask.didReceive(response); urlSchemeTask.didReceive(data); urlSchemeTask.didFinish()
            } catch {
                if !Task.isCancelled {
                    urlSchemeTask.didFailWithError(error)
                }
            }
        }
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: any WKURLSchemeTask) {
        tasks.removeValue(forKey: ObjectIdentifier(urlSchemeTask))?.cancel()
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard owner.viewControls.isAttached(to: message.webView),
              let body = message.body as? [String: Any], let type = body["type"] as? String else { return }
        switch type {
        case "view-state":
            if let webView = message.webView, let zoom = body["zoom"] as? Double, let enabled = body["enabled"] as? Bool {
                owner.viewControls.update(zoom: zoom, enabled: enabled, from: webView)
            }
        case "ready":
            ready = true
            if let webView = message.webView {
                updateAppearance(webView)
                let locale = Bundle.main.preferredLocalizations.first ?? "en"
                if let data = try? JSONSerialization.data(withJSONObject: [locale]), let json = String(data: data, encoding: .utf8) {
                    webView.evaluateJavaScript("window.setViewerLocale(\(json)[0]); null")
                }
                load(webView)
            }
        case "loading": owner.viewControls.setUnavailable(); owner.loading = true; owner.error = nil
        case "loaded": owner.loading = false
        case "error": owner.viewControls.setUnavailable(); owner.loading = false; owner.error = body["message"] as? String
        default: break
        }
    }

    func load(_ webView: WKWebView) {
        updateAppearance(webView)
        guard ready, sentSelection != owner.configuration.recipeJSON else { return }
        sentSelection = owner.configuration.recipeJSON
        webView.evaluateJavaScript("window.loadModel(\(owner.configuration.recipeJSON)); null") { [weak self] _, error in
            if let error {
                self?.owner.error = error.localizedDescription; self?.owner.loading = false
            }
        }
    }

    private func updateAppearance(_ webView: WKWebView) {
        guard ready, sentColorScheme != owner.colorScheme else { return }
        sentColorScheme = owner.colorScheme
        let theme = owner.colorScheme == .dark ? "dark" : "light"
        webView.evaluateJavaScript("window.setViewerColorScheme('\(theme)'); null")
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        owner.viewControls.setUnavailable()
        owner.error = error.localizedDescription; owner.loading = false
    }

    func stop() {
        tasks.values.forEach { $0.cancel() }; tasks.removeAll()
    }
}

#if os(macOS)
struct Model3DWebView: NSViewRepresentable {
    @Environment(\.colorScheme) var colorScheme
    let configuration: Model3DRenderConfiguration
    let viewControls: Model3DViewControls
    @Binding var loading: Bool
    @Binding var error: String?
    func makeCoordinator() -> Model3DWebCoordinator {
        Model3DWebCoordinator(self)
    }

    func makeNSView(context: Context) -> WKWebView {
        makeWebView(context.coordinator)
    }

    func updateNSView(_ view: WKWebView, context: Context) {
        context.coordinator.owner = self; context.coordinator.load(view)
    }

    static func dismantleNSView(_ view: WKWebView, coordinator: Model3DWebCoordinator) {
        coordinator.owner.viewControls.detach(view)
        view.stopLoading(); coordinator.stop(); view.configuration.userContentController.removeScriptMessageHandler(forName: "model3D")
    }
}
#else
struct Model3DWebView: UIViewRepresentable {
    @Environment(\.colorScheme) var colorScheme
    let configuration: Model3DRenderConfiguration
    let viewControls: Model3DViewControls
    @Binding var loading: Bool
    @Binding var error: String?
    func makeCoordinator() -> Model3DWebCoordinator {
        Model3DWebCoordinator(self)
    }

    func makeUIView(context: Context) -> WKWebView {
        makeWebView(context.coordinator)
    }

    func updateUIView(_ view: WKWebView, context: Context) {
        context.coordinator.owner = self; context.coordinator.load(view)
    }

    static func dismantleUIView(_ view: WKWebView, coordinator: Model3DWebCoordinator) {
        coordinator.owner.viewControls.detach(view)
        view.stopLoading(); coordinator.stop(); view.configuration.userContentController.removeScriptMessageHandler(forName: "model3D")
    }
}
#endif

@MainActor private func makeWebView(_ coordinator: Model3DWebCoordinator) -> WKWebView {
    let config = WKWebViewConfiguration()
    config.setURLSchemeHandler(coordinator, forURLScheme: "sekai3d")
    config.userContentController.add(coordinator, name: "model3D")
    let theme = coordinator.owner.colorScheme == .dark ? "dark" : "light"
    config.userContentController.addUserScript(WKUserScript(
        source: "window.viewerColorScheme = '\(theme)';",
        injectionTime: .atDocumentStart,
        forMainFrameOnly: true
    ))
    config.userContentController.addUserScript(WKUserScript(
        source: "document.addEventListener('dblclick', event => event.preventDefault(), {capture: true});",
        injectionTime: .atDocumentStart,
        forMainFrameOnly: true
    ))
    let view = WKWebView(frame: .zero, configuration: config)
    coordinator.owner.viewControls.attach(view)
    view.navigationDelegate = coordinator
    #if os(macOS)
    view.allowsMagnification = false
    #endif
    #if !os(macOS)
    // The canvas handles pan/pinch itself; prevent the web page from scrolling or zooming.
    view.scrollView.isScrollEnabled = false
    view.scrollView.bounces = false
    view.scrollView.pinchGestureRecognizer?.isEnabled = false
    #endif
    view.load(URLRequest(url: URL(string: "sekai3d://viewer/index.html")!))
    return view
}

