//// Selector and inspector layout follows Greatdori's Live2DViewer (Apache-2.0).
//import SwiftUI
//import UniformTypeIdentifiers
//
//struct Live2DViewerView: View {
//    @State private var choosingFolder = false
//    @State private var folder: URL?
//    @State private var models: [URL] = []
//    @State private var selectedModel: URL?
//    @State private var error: String?
//    var body: some View {
//        ScrollView {
//            VStack(spacing: 20) {
//                CustomGroupBox(cornerRadius: 20) {
//                    VStack {
//                        ListItem {
//                            Text("Live2D.model-folder").bold()
//                        } value: {
//                            Button(folder?.lastPathComponent ?? String(localized: "Live2D.choose-folder")) { choosingFolder = true }
//                        }
//                        if !models.isEmpty {
//                            Divider()
//                            ListItem {
//                                Text("Live2D.model").bold()
//                            } value: {
//                                Picker("Live2D.model", selection: $selectedModel) {
//                                    ForEach(models, id: \.self) { Text($0.deletingPathExtension().deletingPathExtension().lastPathComponent).tag(Optional($0)) }
//                                }.labelsHidden()
//                            }
//                        }
//                    }
//                }
//                if let selectedModel {
//                    NavigationLink { NativeLive2DDetailView(modelURL: selectedModel, folderURL: folder) } label: {
//                        Text("Live2D.open").frame(maxWidth: .infinity)
//                    }.buttonStyle(.borderedProminent)
//                }
//                Text("Live2D.folder-help").foregroundStyle(.secondary).font(.callout)
//                #if !canImport(CubismBridge)
//                ContentUnavailableView("Live2D.unavailable", systemImage: "person.and.viewfinder", description: Text("Live2D.unavailable-description"))
//                #endif
//            }.frame(maxWidth: infoContentMaxWidth).padding().frame(maxWidth: .infinity)
//        }
//        .navigationTitle("App.tools.live2d-viewer")
//        .fileImporter(isPresented: $choosingFolder, allowedContentTypes: [.folder]) { result in
//            do {
//                let url = try result.get()
//                let access = url.startAccessingSecurityScopedResource()
//                defer { if access { url.stopAccessingSecurityScopedResource() } }
//                let files = try FileManager.default.contentsOfDirectory(at: url, includingPropertiesForKeys: nil)
//                    .filter { $0.lastPathComponent.hasSuffix(".model3.json") }.sorted { $0.lastPathComponent < $1.lastPathComponent }
//                guard !files.isEmpty else { throw Live2DViewerError.noModel }
//                folder = url; models = files; selectedModel = files.first
//            } catch { self.error = error.localizedDescription }
//        }
//        .alert("Live2D.error", isPresented: Binding(get: { error != nil }, set: { if !$0 { error = nil } })) {
//            Button("General.done") { error = nil }
//        } message: { Text(error ?? "") }
//    }
//}
//
//enum Live2DViewerError: LocalizedError {
//    case noModel, invalidModel, unavailable
//    var errorDescription: String? {
//        switch self {
//        case .noModel: String(localized: "Live2D.no-model")
//        case .invalidModel: String(localized: "Live2D.invalid-model")
//        case .unavailable: String(localized: "Live2D.unavailable-description")
//        }
//    }
//}
//
//struct NativeLive2DDetailView: View {
//    let modelURL: URL
//    let folderURL: URL?
//    @Environment(\.scenePhase) private var scenePhase
//    @State private var inspectorPresented = false
//    #if canImport(CubismBridge)
//    @StateObject private var player = NativeLive2DPlayer()
//    #endif
//    var body: some View {
//        Group {
//            #if canImport(CubismBridge)
//            NativeLive2DSurface(player: player)
//                .overlay {
//                    if let error = player.error {
//                        ContentUnavailableView("Live2D.error", systemImage: "exclamationmark.triangle", description: Text(error))
//                    } else if !player.loaded { ProgressView() }
//                }
//                .onAppear { player.load(modelURL, scope: folderURL); player.active = scenePhase == .active }
//                .onDisappear { player.close() }
//                .onChange(of: scenePhase) { player.active = scenePhase == .active }
//            #else
//            ContentUnavailableView("Live2D.unavailable", systemImage: "person.and.viewfinder", description: Text("Live2D.unavailable-description"))
//            #endif
//        }
//        .navigationTitle(modelURL.deletingPathExtension().deletingPathExtension().lastPathComponent)
//        #if canImport(CubismBridge)
//        .toolbar {
//            ToolbarItem { Button("Live2D.inspector", systemImage: "slider.horizontal.3") { inspectorPresented.toggle() } }
//        }
//        .inspector(isPresented: $inspectorPresented) {
//            Form {
//                Section {
//                    Picker("Live2D.motion", selection: $player.motion) {
//                        if player.motions.isEmpty { Text("Live2D.none").tag("") }
//                        ForEach(player.motions, id: \.self) { Text($0).tag($0) }
//                    }
//                    Toggle("Live2D.repeat", isOn: $player.repeats)
//                    Toggle("Live2D.pause", isOn: $player.paused)
//                    Picker("Live2D.frame-rate", selection: $player.frameRate) {
//                        Text("30 FPS").tag(30)
//                        Text("60 FPS").tag(60)
//                    }
//                }
//                Section("Live2D.framing") {
//                    Slider(value: $player.zoom, in: 0.5...3) { Text("Live2D.zoom") }
//                    Slider(value: $player.offsetY, in: -2...2) { Text("Live2D.position") }
//                    Button("Live2D.reset") { player.zoom = 1; player.offsetY = 0 }
//                }
//            }.formStyle(.grouped).presentationDetents([.medium, .large]).presentationDragIndicator(.visible)
//        }
//        #endif
//    }
//}
