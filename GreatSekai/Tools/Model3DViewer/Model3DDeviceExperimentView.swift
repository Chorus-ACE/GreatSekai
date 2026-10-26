import SekaiKit
import SwiftUI
import WebKit

/// On-device processing with independent regional source catalogs and explicit samples.
struct Model3DDeviceExperimentView: View {
    @State private var manifest: Model3DDeviceSourceManifest?
    @State private var catalog: Model3DDeviceCatalog?
    @State private var parts: Model3DDevicePartCatalog?
    @State private var online = true
    @State private var locale = SekaiLocale.primaryLocale
    @State private var characterID = 1
    @State private var partID = ""
    @State private var result: Model3DDeviceResult?
    @State private var error: String?
    @State private var processing = false
    @State private var loading = false
    @State private var rendering = false
    @State private var request = 0
    @State private var refresh = 0
    @State private var previewID = UUID()
    private var sourceKey: String { "\(online)-\(locale.rawValue)-\(refresh)" }
    private var readyParts: [Model3DDevicePartCatalog.Part] { parts?.parts.filter(\.isReady) ?? [] }

    var body: some View {
        VStack(spacing: 0) {
            Form {
                Section {
                    Picker("Model-3d.device.catalog-source", selection: $online) {
                        Text("Model-3d.device.online").tag(true)
                        Text("Model-3d.device.samples").tag(false)
                    }
                    if online {
                        Picker("Model-3d.device.region", selection: $locale) {
                            ForEach(SekaiLocale.allCases, id: \.self) { Text(verbatim: $0.rawValue.uppercased()).tag($0) }
                        }
                        if let catalog, !catalog.characters.isEmpty {
                            Picker("Model-3d.device.character", selection: $characterID) {
                                ForEach(catalog.characters) { Text(verbatim: $0.name).tag($0.id) }
                            }
                            if let parts {
                                LabeledContent("Model-3d.device.ready-count") { Text(verbatim: "\(readyParts.count) / \(parts.parts.count)") }
                            }
                        }
                        if !readyParts.isEmpty {
                            Picker("Model-3d.device.part", selection: $partID) {
                                ForEach(readyParts) { part in
                                    Text(verbatim: "\(part.name) · \(part.type.localizedName) · \(part.costumeID)").tag(part.id)
                                }
                            }
                        } else if !loading {
                            Text(locale == .jp ? "Model-3d.device.pending" : "Model-3d.device.unsupported-region")
                                .font(.caption).foregroundStyle(.secondary)
                        }
                    } else if let manifest {
                        Picker("Model-3d.device.sample", selection: $partID) {
                            ForEach(manifest.parts) { part in Text(verbatim: part.name).tag(part.id) }
                        }
                    }
                    Button("Model-3d.device.process") { request += 1 }
                        .disabled(loading || partID.isEmpty)
                    Text("Model-3d.device.note").font(.caption).foregroundStyle(.secondary)
                }.disabled(processing)
                if let error {
                    Section {
                        Text(error).foregroundStyle(.red)
                        Button("Model-3d.retry") { refresh += 1 }
                    }
                }
                if let result {
                    Section {
                        LabeledContent("Model-3d.device.source") { Text(result.cacheHit ? "Model-3d.device.cached" : "Model-3d.device.converted") }
                        LabeledContent("Model-3d.device.downloaded") { Text(ByteCountFormatter.string(fromByteCount: Int64(result.downloadedBytes), countStyle: .file)) }
                        LabeledContent("Model-3d.device.duration") { Text(Measurement(value: result.conversionSeconds * 1000, unit: UnitDuration.milliseconds), format: .measurement(width: .abbreviated, usage: .asProvided, numberFormatStyle: .number.precision(.fractionLength(0)))) }
                    }
                }
            }
            .formStyle(.grouped)
            .frame(maxHeight: result == nil ? 400 : 440)
            ZStack {
                if let result { DeviceModelPreview(directory: result.directory, rendering: $rendering, error: $error).id(previewID) }
                else if !processing && !loading { ContentUnavailableView("Model-3d.device.empty", systemImage: "cube") }
                if processing || rendering || loading { ProgressView("Model-3d.device.processing") }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .navigationTitle("Model-3d.device.title")
        .task(id: sourceKey) {
            loading = true; error = nil; catalog = nil; parts = nil; manifest = nil; partID = ""
            result = nil; rendering = false
            defer { loading = false }
            do {
                if online {
                    let loaded = try await Model3DDeviceSourceClient.shared.catalog(for: locale)
                    try Task.checkCancellation()
                    characterID = loaded.characters.first(where: { $0.id == characterID })?.id ?? loaded.characters.first?.id ?? 1
                    catalog = loaded
                } else {
                    manifest = try .japaneseSamples()
                    partID = manifest?.parts.first?.id ?? ""
                }
            } catch is CancellationError { } catch { self.error = error.localizedDescription }
        }
        .task(id: "\(sourceKey)-\(catalog?.revision ?? "")-\(characterID)") {
            guard online, let catalog else { return }
            loading = true; error = nil; parts = nil; partID = ""; result = nil; rendering = false
            defer { loading = false }
            do {
                let loaded = try await Model3DDeviceSourceClient.shared.parts(for: characterID, in: catalog)
                try Task.checkCancellation()
                parts = loaded
                partID = loaded.parts.first(where: \.isReady)?.id ?? ""
            } catch is CancellationError { } catch { self.error = error.localizedDescription }
        }
        .task(id: request) {
            guard request > 0 else { return }
            processing = true; error = nil
            defer { processing = false }
            do {
                let plan: Model3DDeviceSourceManifest
                if online, let parts, let part = parts.parts.first(where: { $0.id == partID && $0.isReady }) {
                    plan = try await Model3DDeviceSourceClient.shared.manifest(for: part, in: parts)
                } else if !online, let manifest {
                    plan = manifest
                } else { return }
                let output = try await Model3DDeviceClient.shared.prepare(partID: partID, manifest: plan)
                try Task.checkCancellation()
                rendering = true; previewID = UUID(); result = output
            } catch is CancellationError { } catch { self.error = error.localizedDescription }
        }
    }
}

#if os(macOS)
private typealias DeviceModelRepresentable = NSViewRepresentable
#else
private typealias DeviceModelRepresentable = UIViewRepresentable
#endif
private struct DeviceModelPreview: DeviceModelRepresentable {
    let directory: URL
    @Binding var rendering: Bool
    @Binding var error: String?
    @Environment(\.colorScheme) var colorScheme
    func makeCoordinator() -> DevicePreviewCoordinator { .init(self) }
    #if os(macOS)
    func makeNSView(context: Context) -> WKWebView { context.coordinator.makeWebView() }
    func updateNSView(_ view: WKWebView, context: Context) { context.coordinator.owner = self; context.coordinator.update(view) }
    static func dismantleNSView(_ view: WKWebView, coordinator: DevicePreviewCoordinator) { coordinator.stop(view) }
    #else
    func makeUIView(context: Context) -> WKWebView { context.coordinator.makeWebView() }
    func updateUIView(_ view: WKWebView, context: Context) { context.coordinator.owner = self; context.coordinator.update(view) }
    static func dismantleUIView(_ view: WKWebView, coordinator: DevicePreviewCoordinator) { coordinator.stop(view) }
    #endif
}

@MainActor private final class DevicePreviewCoordinator: NSObject, WKURLSchemeHandler, WKScriptMessageHandler, WKNavigationDelegate {
    var owner: DeviceModelPreview
    private var ready = false
    private var loaded = false
    private var colorScheme: ColorScheme?
    private var tasks: [ObjectIdentifier: Task<Void, Never>] = [:]
    init(_ owner: DeviceModelPreview) { self.owner = owner }
    func makeWebView() -> WKWebView {
        let config = WKWebViewConfiguration()
        config.setURLSchemeHandler(self, forURLScheme: "sekai3d")
        config.userContentController.add(self, name: "deviceModel")
        config.userContentController.addUserScript(WKUserScript(source: "window.viewerColorScheme = '\(owner.colorScheme == .dark ? "dark" : "light")';", injectionTime: .atDocumentStart, forMainFrameOnly: true))
        let view = WKWebView(frame: .zero, configuration: config)
        view.navigationDelegate = self
        #if !os(macOS)
        view.scrollView.isScrollEnabled = false
        view.scrollView.contentInsetAdjustmentBehavior = .never
        view.scrollView.bounces = false
        view.scrollView.pinchGestureRecognizer?.isEnabled = false
        #endif
        view.load(URLRequest(url: URL(string: "sekai3d://viewer/device-model.html")!))
        return view
    }
    func update(_ view: WKWebView) {
        guard ready else { return }
        if colorScheme != owner.colorScheme {
            colorScheme = owner.colorScheme
            view.evaluateJavaScript("window.setViewerColorScheme('\(owner.colorScheme == .dark ? "dark" : "light")'); null")
        }
        if !loaded { loaded = true; view.evaluateJavaScript("window.loadDeviceModel('sekai3d://device/scene.json'); null") }
    }
    func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let body = message.body as? [String: String] else { return }
        switch body["type"] {
        case "ready": ready = true; if let view = message.webView { update(view) }
        case "loaded": owner.rendering = false
        case "error": owner.rendering = false; owner.error = body["message"]
        default: break
        }
    }
    func webView(_ view: WKWebView, start task: any WKURLSchemeTask) {
        let id = ObjectIdentifier(task)
        tasks[id] = Task { @MainActor in
            defer { tasks.removeValue(forKey: id) }
            do {
                guard let url = task.request.url else { throw URLError(.badURL) }
                let path = String(url.path.dropFirst())
                guard !path.isEmpty, !path.contains(".."), !path.contains("\\") else { throw URLError(.badURL) }
                let file: URL
                if url.host == "device" {
                    guard path == "scene.json" || (path.hasPrefix("textures/") && path.hasSuffix(".png") && path.count == 77 && path.dropFirst(9).dropLast(4).allSatisfy({ "0123456789abcdef".contains($0) })) else { throw URLError(.badURL) }
                    file = owner.directory.appendingPathComponent(path)
                } else {
                    guard url.host == "viewer", let bundle = Bundle.main.url(forResource: "Model3DWeb", withExtension: "bundle") else { throw URLError(.fileDoesNotExist) }
                    file = bundle.appendingPathComponent(path)
                }
                let data = try await Task.detached { try Data(contentsOf: file, options: .mappedIfSafe) }.value
                try Task.checkCancellation()
                let mime = ["html": "text/html", "js": "text/javascript", "png": "image/png", "json": "application/json"][file.pathExtension] ?? "application/octet-stream"
                task.didReceive(HTTPURLResponse(url: url, statusCode: 200, httpVersion: "HTTP/1.1", headerFields: ["Content-Type": mime, "Access-Control-Allow-Origin": "*"])!)
                task.didReceive(data); task.didFinish()
            } catch { if !Task.isCancelled { task.didFailWithError(error) } }
        }
    }
    func webView(_ view: WKWebView, stop task: any WKURLSchemeTask) { tasks.removeValue(forKey: ObjectIdentifier(task))?.cancel() }
    func webView(_ view: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) { owner.rendering = false; owner.error = error.localizedDescription }
    func stop(_ view: WKWebView) {
        tasks.values.forEach { $0.cancel() }; tasks.removeAll()
        view.evaluateJavaScript("window.disposeDeviceModelViewer?.(); null")
        view.stopLoading(); view.configuration.userContentController.removeScriptMessageHandler(forName: "deviceModel")
    }
}
