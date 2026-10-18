//#if canImport(CubismBridge)
//import Combine
//import Live2DKit
//import MetalKit
//import SwiftUI
//
///// Cubism's global state and model mutations are confined to the main thread.
//@MainActor final class NativeLive2DPlayer: NSObject, ObservableObject, MTKViewDelegate {
//    @Published private(set) var loaded = false
//    @Published private(set) var error: String?
//    @Published private(set) var motions: [String] = []
//    @Published var motion = "" { didSet { startMotion() } }
//    @Published var repeats = true
//    @Published var paused = false { didSet { updatePlayback() } }
//    @Published var frameRate = 60 { didSet { view?.preferredFramesPerSecond = frameRate } }
//    @Published var zoom: Float = 1 { didSet { renderer?.framingScale = zoom; redraw() } }
//    @Published var offsetY: Float = 0 { didSet { renderer?.framingOffsetY = offsetY; redraw() } }
//    var active = true { didSet { updatePlayback() } }
//    private weak var view: MTKView?
//    private var model: Live2DModel?
//    private var renderer: Live2DRenderer?
//    private var queue: MTLCommandQueue?
//    private var lastCommand: MTLCommandBuffer?
//    private var lastFrame: CFTimeInterval?
//    private var motionIndices: [String: (group: String, index: Int)] = [:]
//    private var scopedURL: URL?
//    private var requestedURL: URL?
//    private var pendingScope: URL?
//
//    func attach(_ view: MTKView) {
//        self.view = view
//        view.device = MTLCreateSystemDefaultDevice()
//        Live2DRenderer.configure(view)
//        view.clearColor = MTLClearColorMake(0, 0, 0, 0)
//        #if os(iOS)
//        view.isOpaque = false
//        view.backgroundColor = .clear
//        #endif
//        view.preferredFramesPerSecond = frameRate
//        view.isPaused = true
//        view.delegate = self
//        if let requestedURL { load(requestedURL, scope: pendingScope) }
//    }
//    func load(_ url: URL, scope: URL?) {
//        // SwiftUI may call onAppear before making the platform view.
//        guard let view else { requestedURL = url; pendingScope = scope; return }
//        close()
//        requestedURL = url
//        if let scope, scope.startAccessingSecurityScopedResource() { scopedURL = scope }
//        do {
//            guard let device = view.device, let queue = device.makeCommandQueue() else { throw Live2DViewerError.unavailable }
//            let manifest = try JSONSerialization.jsonObject(with: Data(contentsOf: url)) as? [String: Any]
//            guard let refs = manifest?["FileReferences"] as? [String: Any],
//                  let textures = refs["Textures"] as? [String], !textures.isEmpty,
//                  refs["Moc"] is String else { throw Live2DViewerError.invalidModel }
//            let directory = url.deletingLastPathComponent().resolvingSymlinksInPath()
//            func fileURL(_ path: String) throws -> URL {
//                let result = directory.appendingPathComponent(path).standardizedFileURL.resolvingSymlinksInPath()
//                guard !path.hasPrefix("/"), result.path.hasPrefix(directory.path + "/") else { throw Live2DViewerError.invalidModel }
//                return result
//            }
//            // Validate all file references before handing the manifest to native code.
//            for key in ["Moc", "Physics", "Pose", "DisplayInfo", "UserData"] {
//                if let path = refs[key] as? String { _ = try fileURL(path) }
//            }
//            for clips in (refs["Motions"] as? [String: [[String: Any]]])?.values ?? Dictionary<String, [[String: Any]]>().values {
//                for clip in clips { if let path = clip["File"] as? String { _ = try fileURL(path) } }
//            }
//            for expression in refs["Expressions"] as? [[String: Any]] ?? [] {
//                if let path = expression["File"] as? String { _ = try fileURL(path) }
//            }
//            let textureURLs = try textures.map(fileURL)
//            Live2DRuntime.start()
//            let model = try Live2DModel(contentsOf: url)
//            let size = view.drawableSize
//            guard let renderer = Live2DRenderer(model: model, device: device, width: Int(size.width), height: Int(size.height)), renderer.isReady else { throw Live2DViewerError.unavailable }
//            let loader = MTKTextureLoader(device: device)
//            for (index, textureURL) in textureURLs.enumerated() {
//                let texture = try loader.newTexture(URL: textureURL, options: [.SRGB: false, .generateMipmaps: false])
//                renderer.bindTexture(texture, at: index)
//            }
//            // Initialize pose-controlled visibility even when loading while paused.
//            // Geometry-only updates leave alternate parts visible on the first frame.
//            model.update(deltaTime: 0)
//            self.model = model; self.renderer = renderer; self.queue = queue
//            renderer.framingScale = zoom; renderer.framingOffsetY = offsetY
//            motionIndices = [:]
//            for group in model.motionGroupNames {
//                let count = model.motionCount(inGroup: group)
//                for index in 0..<count {
//                    motionIndices[count == 1 ? group : "\(group) · \(index + 1)"] = (group, index)
//                }
//            }
//            motions = motionIndices.keys.sorted()
//            motion = motions.first(where: { $0.localizedCaseInsensitiveContains("idle") }) ?? motions.first ?? ""
//            loaded = true; error = nil
//            updatePlayback()
//        } catch {
//            self.error = error.localizedDescription
//            view.isPaused = true
//            if let scopedURL { scopedURL.stopAccessingSecurityScopedResource(); self.scopedURL = nil }
//        }
//    }
//    func close() {
//        view?.isPaused = true
//        lastCommand?.waitUntilCompleted()
//        lastCommand = nil; renderer = nil; model = nil; queue = nil
//        lastFrame = nil; loaded = false; requestedURL = nil; pendingScope = nil
//        motionIndices = [:]; motions = []; motion = ""; error = nil
//        if let scopedURL { scopedURL.stopAccessingSecurityScopedResource(); self.scopedURL = nil }
//    }
//    private func startMotion() {
//        guard let clip = motionIndices[motion] else { return }
//        model?.startMotion(group: clip.group, index: clip.index)
//        redraw()
//    }
//    private func updatePlayback() {
//        lastFrame = nil
//        view?.isPaused = paused || !active || !loaded
//        if active && loaded { redraw() }
//    }
//    private func redraw() { if view?.isPaused == true && active && loaded { view?.draw() } }
//    func mtkView(_ view: MTKView, drawableSizeWillChange size: CGSize) {
//        lastCommand?.waitUntilCompleted()
//        renderer?.resize(width: Int(size.width), height: Int(size.height))
//        redraw()
//    }
//    func draw(in view: MTKView) {
//        guard active, loaded, let model, let renderer, let queue else { return }
//        // Reuse Cubism buffers only after the GPU finishes the previous frame. Skip a
//        // busy tick instead of blocking UI or building an unbounded command queue.
//        if let lastCommand, lastCommand.status != .completed && lastCommand.status != .error { return }
//        if let failure = lastCommand?.error {
//            error = failure.localizedDescription; view.isPaused = true; return
//        }
//        guard let pass = view.currentRenderPassDescriptor, let drawable = view.currentDrawable,
//              let command = queue.makeCommandBuffer() else { return }
//        let now = CACurrentMediaTime()
//        let delta = paused ? 0 : min(max(now - (lastFrame ?? now), 0), 0.1)
//        lastFrame = now
//        if !paused {
//            if repeats && model.motionsFinished { startMotion() }
//            model.evaluateMotions(deltaTime: delta)
//            model.update(deltaTime: delta)
//        } else { model.update() }
//        renderer.draw(commandBuffer: command, renderPassDescriptor: pass, drawableSize: view.drawableSize)
//        command.present(drawable)
//        command.commit()
//        lastCommand = command
//    }
//}
//
//#if os(macOS)
//struct NativeLive2DSurface: NSViewRepresentable {
//    let player: NativeLive2DPlayer
//    func makeNSView(context: Context) -> MTKView { let view = MTKView(); player.attach(view); return view }
//    func updateNSView(_ view: MTKView, context: Context) {}
//    static func dismantleNSView(_ view: MTKView, coordinator: ()) { view.isPaused = true; view.delegate = nil }
//}
//#else
//struct NativeLive2DSurface: UIViewRepresentable {
//    let player: NativeLive2DPlayer
//    func makeUIView(context: Context) -> MTKView { let view = MTKView(); player.attach(view); return view }
//    func updateUIView(_ view: MTKView, context: Context) {}
//    static func dismantleUIView(_ view: MTKView, coordinator: ()) { view.isPaused = true; view.delegate = nil }
//}
//#endif
//#endif
