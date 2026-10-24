import SwiftUI
import SekaiKit
import WebKit

struct Model3DViewerView: View {
    @State private var locale = SekaiLocale.primaryLocale
    @State private var catalog: Model3DCatalog?
    @State private var roleID = ""
    @State private var bodyID = 0
    @State private var hairID = 0
    @State private var headID = 0
    @State private var accessoryID = 0
    @State private var error: String?
    @State private var loading = true
    @State private var retry = 0
    private var role: Model3DCatalog.Role? { catalog?.roles.first { $0.id == roleID } }
    private var selection: String {
        let object: [String: Any] = ["roleId": roleID, "bodyCostume3dId": bodyID, "hairCostume3dId": hairID, "headCostume3dId": headID, "headOptionalCostume3dId": accessoryID == 0 ? NSNull() : accessoryID]
        return String(data: try! JSONSerialization.data(withJSONObject: object, options: [.sortedKeys]), encoding: .utf8)!
    }
    var body: some View {
        VStack(spacing: 0) {
            Form {
                Picker("Model3D.region", selection: $locale) {
                    ForEach(SekaiLocale.allCases, id: \.self) { Text($0.rawValue.uppercased()).tag($0) }
                }
                if let catalog, !catalog.roles.isEmpty {
                    Picker("Model3D.character", selection: $roleID) {
                        ForEach(catalog.roles) { role in Text(verbatim: (role.name ?? String(role.characterID)) + (role.characterID == 21 ? " · \(role.unit)" : "")).tag(role.id) }
                    }
                    if let role {
                        partPicker("Model3D.body", type: "body", selection: $bodyID, role: role)
                        partPicker("Model3D.hair", type: "hair", selection: $hairID, role: role)
                        partPicker("Model3D.head", type: "head", selection: $headID, role: role, includesNone: true)
                        partPicker("Model3D.accessory", type: "head_optional", selection: $accessoryID, role: role, includesNone: true)
                    }
                }
            }.formStyle(.grouped).frame(maxHeight: 260)
            ZStack {
                if let catalog, role != nil, bodyID != 0 {
                    Model3DWebView(catalog: catalog, selection: selection, loading: $loading, error: $error)
                        .id("\(locale.rawValue)-\(catalog.revision)-\(retry)")
                } else if !loading, error == nil {
                    ContentUnavailableView("Model3D.empty", systemImage: "cube.transparent")
                }
                if loading { ProgressView().padding().background(.regularMaterial, in: RoundedRectangle(cornerRadius: 12)) }
                if let error {
                    VStack {
                        ContentUnavailableView("Model3D.error", systemImage: "exclamationmark.triangle", description: Text(error))
                        Button("Model3D.retry") { retry += 1 }
                    }.background(.regularMaterial)
                }
            }.frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .navigationTitle("App.tools.model3d-viewer")
        .task(id: "\(locale.rawValue)-\(retry)") {
            loading = true; error = nil; catalog = nil
            do {
                let result = try await Model3DClient.shared.catalog(for: locale)
                try Task.checkCancellation()
                catalog = result; roleID = result.roles.first?.id ?? ""; resetSelection()
                if result.roles.isEmpty { loading = false }
            } catch is CancellationError { } catch { self.error = error.localizedDescription; loading = false }
        }
        .onChange(of: roleID) { resetSelection() }
    }
    private func resetSelection() {
        guard let role else { return }
        bodyID = role.bodyCostumeID; hairID = role.hairCostumeID; headID = role.headCostumeID; accessoryID = 0
    }
    private func partPicker(_ title: LocalizedStringKey, type: String, selection: Binding<Int>, role: Model3DCatalog.Role, includesNone: Bool = false) -> some View {
        Picker(title, selection: selection) {
            if includesNone { Text("Model3D.none").tag(type == "head" ? role.headCostumeID : 0) }
            ForEach(role.parts.filter { $0.type == type && (!includesNone || $0.costumeID != role.headCostumeID) }) { part in
                Text(verbatim: "\(part.name) · \(part.colorName)").tag(part.costumeID)
            }
        }
    }
}

@MainActor final class Model3DWebCoordinator: NSObject, WKURLSchemeHandler, WKScriptMessageHandler, WKNavigationDelegate {
    let catalog: Model3DCatalog
    var owner: Model3DWebView
    var ready = false
    var sentSelection = ""
    private var tasks: [ObjectIdentifier: Task<Void, Never>] = [:]
    init(_ owner: Model3DWebView) { self.owner = owner; catalog = owner.catalog }
    func webView(_ webView: WKWebView, start urlSchemeTask: any WKURLSchemeTask) {
        let id = ObjectIdentifier(urlSchemeTask)
        tasks[id] = Task { @MainActor in
            defer { tasks.removeValue(forKey: id) }
            do {
                guard let url = urlSchemeTask.request.url else { throw URLError(.badURL) }
                let data: Data
                let path = String(url.path.dropFirst())
                if url.host == "runtime" { data = try await Model3DClient.shared.resource(at: path, in: catalog) }
                else {
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
                if !Task.isCancelled { urlSchemeTask.didFailWithError(error) }
            }
        }
    }
    func webView(_ webView: WKWebView, stop urlSchemeTask: any WKURLSchemeTask) {
        tasks.removeValue(forKey: ObjectIdentifier(urlSchemeTask))?.cancel()
    }
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let body = message.body as? [String: String] else { return }
        switch body["type"] {
        case "ready": ready = true; if let webView = message.webView { load(webView) }
        case "loading": owner.loading = true; owner.error = nil
        case "loaded": owner.loading = false
        case "error": owner.loading = false; owner.error = body["message"]
        default: break
        }
    }
    func load(_ webView: WKWebView) {
        guard ready, sentSelection != owner.selection else { return }
        sentSelection = owner.selection
        webView.evaluateJavaScript("window.loadModel(\(owner.selection)); null") { [weak self] _, error in
            if let error { self?.owner.error = error.localizedDescription; self?.owner.loading = false }
        }
    }
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) { owner.error = error.localizedDescription; owner.loading = false }
    func stop() { tasks.values.forEach { $0.cancel() }; tasks.removeAll() }
}

#if os(macOS)
struct Model3DWebView: NSViewRepresentable {
    let catalog: Model3DCatalog
    let selection: String
    @Binding var loading: Bool
    @Binding var error: String?
    func makeCoordinator() -> Model3DWebCoordinator { Model3DWebCoordinator(self) }
    func makeNSView(context: Context) -> WKWebView { makeWebView(context.coordinator) }
    func updateNSView(_ view: WKWebView, context: Context) { context.coordinator.owner = self; context.coordinator.load(view) }
    static func dismantleNSView(_ view: WKWebView, coordinator: Model3DWebCoordinator) { view.stopLoading(); coordinator.stop(); view.configuration.userContentController.removeScriptMessageHandler(forName: "model3D") }
}
#else
struct Model3DWebView: UIViewRepresentable {
    let catalog: Model3DCatalog
    let selection: String
    @Binding var loading: Bool
    @Binding var error: String?
    func makeCoordinator() -> Model3DWebCoordinator { Model3DWebCoordinator(self) }
    func makeUIView(context: Context) -> WKWebView { makeWebView(context.coordinator) }
    func updateUIView(_ view: WKWebView, context: Context) { context.coordinator.owner = self; context.coordinator.load(view) }
    static func dismantleUIView(_ view: WKWebView, coordinator: Model3DWebCoordinator) { view.stopLoading(); coordinator.stop(); view.configuration.userContentController.removeScriptMessageHandler(forName: "model3D") }
}
#endif

@MainActor private func makeWebView(_ coordinator: Model3DWebCoordinator) -> WKWebView {
    let config = WKWebViewConfiguration()
    config.setURLSchemeHandler(coordinator, forURLScheme: "sekai3d")
    config.userContentController.add(coordinator, name: "model3D")
    let view = WKWebView(frame: .zero, configuration: config)
    view.navigationDelegate = coordinator
    view.load(URLRequest(url: URL(string: "sekai3d://viewer/index.html")!))
    return view
}
