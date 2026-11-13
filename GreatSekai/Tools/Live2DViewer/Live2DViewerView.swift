import Astray
import SekaiKit
import SwiftUI

struct Live2DViewerView: View {
    @Environment(\.colorScheme) private var colorScheme
    @Environment(\.scenePhase) private var scenePhase
    @Environment(\.horizontalSizeClass) private var sizeClass
    @State private var catalog: Live2DCatalog?
    @State private var catalogError: String?
    @AppStorage("Live2DViewer.model-id") private var modelID = "v2_21miku_normal"
    @State private var motion = ""
    @State private var expression = ""
    @State private var paused = false
    @State private var inspectorIsDisplaying = true
    @State private var inspectorTab: Live2DInspectorTab? = .character
    @State private var retry = 0
    @State private var animationRetry = 0
    @State private var catalogRetry = 0
    @State private var player = NativeLive2DPlayer()
    #if os(macOS) || (os(iOS) && !targetEnvironment(macCatalyst))
    @State private var faceCapture = Live2DFaceCapture()
    #endif
    @State private var backgroundCatalog: Live2DBackgroundCatalog?
    @State private var backgroundCatalogError: String?
    @AppStorage("Live2DViewer.background-id") private var backgroundID = Live2DBackgroundCatalog.defaultBackgroundID
    @State private var showsCustomBackground = false
    @State private var customBackgroundInput = ""
    @State private var parameterPage = 0
    @State private var backgroundCatalogRetry = 0
    @State private var backgroundRetry = 0

    private var models: [Live2DCatalog.Model] {
        (catalog?.models ?? []).sorted {
            let lhsIsV2 = $0.id.hasPrefix("v2_"), rhsIsV2 = $1.id.hasPrefix("v2_")
            return lhsIsV2 == rhsIsV2 ? $0.id < $1.id : lhsIsV2
        }
    }
    private var resolvedBackgroundID: String {
        guard let mode = Live2DDefaultBackgrounds.Automatic(rawValue: backgroundID) else { return backgroundID }
        let category: Live2DDefaultBackgrounds.Category?
        switch selectedModel?.unit {
        case Unit.leoNeed.rawValue: category = .ln
        case Unit.moreMoreJump.rawValue: category = .mmj
        case Unit.vividBadSquad.rawValue: category = .vbs
        case Unit.wonderlandsShowtime.rawValue: category = .ws
        case Unit.nightcordAt25.rawValue: category = .n25
        default: category = nil
        }
        let name = Live2DDefaultBackgrounds.automaticAssetName(mode, category: category,
                    characterID: selectedModel?.characterID, dark: colorScheme == .dark)
        if let backgroundCatalog, !backgroundCatalog.backgrounds.contains(where: { $0.name == name }) {
            return Live2DBackgroundCatalog.defaultBackgroundID
        }
        return "scenario/background/\(name)/\(name)"
    }

    private var backgroundURL: URL? {
        let input = resolvedBackgroundID.hasPrefix(Live2DBackgroundCatalog.customPrefix)
            ? String(resolvedBackgroundID.dropFirst(Live2DBackgroundCatalog.customPrefix.count)) : resolvedBackgroundID
        return Live2DBackgroundCatalog.backgroundURL(for: input, catalog: backgroundCatalog)
    }
    private var selectedModel: Live2DCatalog.Model? { catalog?.models.first { $0.id == modelID } }
    private var characterIDs: [Int] { Array(Set((catalog?.models ?? []).compactMap(\.characterID))).sorted() }
    private var playbackKey: String { "\(catalog?.root.absoluteString ?? "")|\(modelID)|\(retry)" }
    private var animationKey: String { "\(modelID)|\(motion)|\(expression)|\(animationRetry)" }
    private var isLoading: Bool { catalog == nil && catalogError == nil || player.loading }
    private var showsLoading: Bool { isLoading || player.backgroundLoading || (backgroundCatalog == nil && backgroundCatalogError == nil) }
    private var canPlay: Bool { selectedModel != nil && !player.loading && player.error == nil }
    private var usesInspector: Bool {
        #if os(macOS)
        true
        #else
        sizeClass == .regular
        #endif
    }

    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea()
            if let renderer = player.renderer {
                AstrayStoryView(renderer: renderer)
                    .ignoresSafeArea()
                    .allowsHitTesting(false)
            }
            Rectangle()
                .fill(.black)
                .ignoresSafeArea()
                .opacity(showsLoading || catalogError != nil || player.error != nil ? 0.3 : 0)
                .animation(.easeInOut(duration: 0.35), value: showsLoading)
                .allowsHitTesting(false)
            if let error = catalogError ?? player.error {
                VStack {
                    ContentUnavailableView("Live2D.error", systemImage: "exclamationmark.circle", description: Text(error))
                    Button("General.retry") {
                        if catalog == nil { catalogRetry += 1 } else { retry += 1 }
                    }
                    .buttonStyle(.bordered)
                }
                .padding()
                .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 10))
                .padding()
            } else if isLoading {
                VStack(spacing: 12) {
                    ProgressView("Live2D.loading")
                        .controlSize(.large)
                    if catalog != nil {
                        ProgressView(value: player.progress)
                            .progressViewStyle(.linear)
                            .frame(maxWidth: 260)
                    }
                }
                .tint(.white)
                .foregroundStyle(.white)
            } else if showsLoading {
                ProgressView()
                    .controlSize(.large)
                    .tint(.white)
                    .accessibilityLabel(Text("Live2D.loading"))
            } else if selectedModel == nil {
                ContentUnavailableView("Live2D.none", systemImage: "person.and.viewfinder")
                    .foregroundStyle(.white)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .toolbar {
            ToolbarItemGroup(placement: .primaryAction) {
                Button(paused ? "Live2D.play" : "Live2D.pause", systemImage: paused ? "play.fill" : "pause.fill") { paused.toggle() }
                    .disabled(!canPlay)
                Button("Live2D.replay", systemImage: "arrow.counterclockwise") { player.player.replayModelMotion() }
                    .disabled(!canPlay)
            }
            ToolbarItem(placement: .primaryAction) {
                #if os(macOS)
                Picker(selection: Binding(get: { inspectorTab }, set: { tab in
                    if tab == inspectorTab && inspectorIsDisplaying {
                        inspectorIsDisplaying = false
                        inspectorTab = nil
                    } else {
                        inspectorTab = tab
                        inspectorIsDisplaying = true
                    }
                })) {
                    ForEach(Live2DInspectorTab.allCases, id: \.self) { tab in
                        Label(tab.localizedLabel, systemImage: tab.symbol)
                            .tag(Optional(tab))
                            .help(Text(tab.localizedLabel))
                            .accessibilityLabel(Text(tab.localizedLabel))
                    }
                } label: {
                    Label("Live2D.inspector", systemImage: "sidebar.trailing")
                }
                .pickerStyle(.inline)
                #else
                Button {
                    inspectorIsDisplaying.toggle()
                } label: {
                    Label("Live2D.inspector", systemImage: "slider.horizontal.3")
                }
                .labelStyle(.iconOnly)
                #endif
            }
        }
        .wrapIf(usesInspector) { content in
            content.inspector(isPresented: $inspectorIsDisplaying) { panel }
        } else: { content in
            content.sheet(isPresented: $inspectorIsDisplaying) { panel }
        }
        .navigationTitle("App.tools.live2d-viewer")
        #if os(macOS) || (os(iOS) && !targetEnvironment(macCatalyst))
        .wrapIf(true) { content in
            if #available(iOS 26.0, macOS 26.0, *) {
                content.navigationSubtitle(faceCapture.subtitle.map { String(localized: $0) } ?? "")
            } else {
                content.overlay(alignment: .top) {
                    if let subtitle = faceCapture.subtitle {
                        Text(subtitle).font(.subheadline).padding(8).background(.regularMaterial, in: Capsule()).padding()
                    }
                }
            }
        }
        #endif
        #if os(iOS)
        .toolbarBackground(.hidden, for: .navigationBar, .tabBar)
        #endif
        .task(id: catalogRetry) {
            catalogError = nil
            do {
                let loaded = try await Live2DCatalog.load()
                try Task.checkCancellation()
                catalog = loaded
                if !models.contains(where: { $0.id == modelID }) {
                    selectModel(models.first { $0.id == "v2_21miku_normal" }?.id ?? models.first?.id ?? "")
                }
            } catch { if !Task.isCancelled { catalogError = error.localizedDescription } }
        }
        .task(id: playbackKey) {
            guard let catalog, let model = selectedModel else { player.close(); return }
            await player.load(model, catalog: catalog)
            guard !Task.isCancelled else { return }
            if motion.isEmpty { motion = player.initialMotion }
            updatePlayback()
            await player.updateAnimations(motion: motion, expression: expression)
        }
        .task(id: animationKey) { await player.updateAnimations(motion: motion, expression: expression) }
        .task(id: backgroundCatalogRetry) {
            backgroundCatalogError = nil
            do {
                let loaded = try await Live2DBackgroundCatalog.load()
                try Task.checkCancellation()
                backgroundCatalog = loaded
            } catch { if !Task.isCancelled { backgroundCatalogError = error.localizedDescription } }
        }
        .task(id: "\(backgroundURL?.absoluteString ?? "")-\(backgroundRetry)") {
            await player.loadBackground(url: backgroundURL)
        }
        .alert("Live2D.background.custom.title", isPresented: $showsCustomBackground) {
            TextField("Live2D.background.custom.input", text: $customBackgroundInput)
                #if os(iOS)
                .textInputAutocapitalization(.never)
                .autocorrectionDisabled()
                #endif
            Button("General.cancel", role: .cancel) {}
            Button("Live2D.background.custom.load") {
                backgroundID = Live2DBackgroundCatalog.customPrefix + customBackgroundInput.trimmingCharacters(in: .whitespacesAndNewlines)
            }
            .disabled(Live2DBackgroundCatalog.backgroundURL(for: customBackgroundInput, catalog: backgroundCatalog) == nil)
        } message: {
            Text("Live2D.background.custom.description")
        }
        .onChange(of: paused) {
            updatePlayback()
            if inspectorTab == .parameters { player.refreshParameters() }
        }
        .onChange(of: inspectorTab) { if inspectorTab == .parameters { player.refreshParameters() } }
        .onChange(of: modelID) { parameterPage = 0 }
        .onChange(of: scenePhase) {
            updatePlayback()
            #if os(macOS) || (os(iOS) && !targetEnvironment(macCatalyst))
            if scenePhase == .background { faceCapture.stop() }
            #endif
        }
        .onAppear {
            #if os(macOS) || (os(iOS) && !targetEnvironment(macCatalyst))
            faceCapture.onParameters = { [weak player] values in player?.player.modelFaceTrackingValues = values }
            #endif
        }
        .onDisappear {
            #if os(macOS) || (os(iOS) && !targetEnvironment(macCatalyst))
            faceCapture.stop()
            #endif
            player.close()
        }
    }

    private var panel: some View {

        VStack(spacing: 0) {
            #if os(iOS)
            Picker("Live2D.inspector", selection: $inspectorTab) {
                ForEach(Live2DInspectorTab.allCases, id: \.self) { tab in
                    Text(tab.localizedLabel).tag(Optional(tab))
                }
            }
            .pickerStyle(.palette)
            .labelsHidden()
            .padding()
            #endif
            switch inspectorTab {
            case .character:
                characterPanel
            case .parameters:
                parameterPanel
            case nil:
                EmptyView()
            }
        }
        .presentationDetents([.medium, .large])
        .presentationDragIndicator(.visible)
        .presentationBackgroundInteraction(.enabled)
    }

    private var characterPanel: some View {
        Form {
            Section {
                modelPicker
                Picker("Live2D.motion", selection: $motion) {
                    Text("Live2D.none").tag("")
                    ForEach(player.motions, id: \.self) { Text(verbatim: $0).tag($0) }
                }
                .disabled(!canPlay)
                Picker("Live2D.expression", selection: $expression) {
                    Text("Live2D.none").tag("")
                    ForEach(player.expressions, id: \.self) { Text(verbatim: $0).tag($0) }
                }
                .disabled(!canPlay)
                if player.optionsFailed {
                    Button("Live2D.retry-animations") { retry += 1 }
                }
                if let error = player.animationError {
                    Text(error).font(.caption).foregroundStyle(.secondary)
                    Button("General.retry") { animationRetry += 1 }
                }
            }
            Section {
                if let catalog = backgroundCatalog {
                    Live2DBackgroundPicker(value: $backgroundID, catalog: catalog) {
                        showsCustomBackground = true
                    }
                } else if let error = backgroundCatalogError {
                    Text(error).foregroundStyle(.secondary)
                    Button("General.retry") { backgroundCatalogRetry += 1 }
                } else {
                    Text("Live2D.background.loading")
                        .foregroundStyle(.secondary)
                }
                if player.backgroundLoading {
                    Text("Live2D.background.loading")
                        .foregroundStyle(.secondary)
                }
                if let error = player.backgroundError {
                    Text(error).font(.caption).foregroundStyle(.secondary)
                    Button("General.retry") { backgroundRetry += 1 }
                }
            }
            Section("Live2D.animation") {
                Toggle("Live2D.sway", isOn: Binding(get: { player.player.isModelBreathSwayEnabled }, set: { player.player.isModelBreathSwayEnabled = $0 }))
                Toggle("Live2D.breathe", isOn: Binding(get: { player.player.isModelBreathEnabled }, set: { player.player.isModelBreathEnabled = $0 }))
                Toggle("Live2D.blink", isOn: Binding(get: { player.player.isModelBlinkEnabled }, set: { player.player.isModelBlinkEnabled = $0 }))
            }
            #if (os(macOS) && arch(arm64)) || (os(iOS) && !targetEnvironment(macCatalyst))
            Section("Live2D.face-tracking") {
                Toggle("Live2D.face-tracking.enable", isOn: Binding(get: { faceCapture.isEnabled }, set: { enabled in
                    if enabled { Task { await faceCapture.start() } }
                    else { faceCapture.stop() }
                }))
                .disabled(!Live2DFaceCapture.isSupported)
                if !Live2DFaceCapture.isSupported {
                    Text("Live2D.face-tracking.unsupported").font(.caption).foregroundStyle(.secondary)
                }
                if faceCapture.isEnabled {
                    Button("Live2D.face-tracking.recalibrate") {
                        faceCapture.recalibrate()
                    }
                    HStack {
                        Circle()
                            .foregroundStyle(faceCapture.phase.color)
                            .frame(width: 7, height: 7)
                        Text(faceCapture.phase.label)
                        Spacer()
                    }
                }
                if let error = faceCapture.error {
                    Text(error).font(.caption).foregroundStyle(.secondary)
                }
            }
            #endif
        }
        .formStyle(.grouped)
    }

    private var modelPicker: some View {
        let units = Unit.allSupportableUnits + [.virtualSinger]
        let knownIDs = characterIDs.filter { id in
            guard let character = SekaiCache.preCache.character(id: id) else { return false }
            return units.contains { $0.rawValue == character.unit }
        }
        let others = models.filter { model in !knownIDs.contains(model.characterID ?? -1) }
        return Picker(selection: modelSelection) {
            Section {
                if !modelID.isEmpty { Text(verbatim: modelID).tag(modelID) }
            }
            ForEach(units, id: \.self) { unit in
                let members = knownIDs.filter { SekaiCache.preCache.character(id: $0)?.unit == unit.rawValue }
                if !members.isEmpty {
                    Section(unit.localizedName) {
                        ForEach(members, id: \.self) { id in
                            Menu {
                                modelOptions(models.filter { $0.characterID == id })
                            } label: { Text(characterName(id)) }
                        }
                    }
                }
            }
            Section {
                if !others.isEmpty {
                    Menu {
                        modelOptions(others)
                    } label: { Text("Live2D.model.other") }
                }
            }
        } label: { Text("Live2D.model") } currentValueLabel: { Text(verbatim: modelID) }
        .pickerStyle(.menu)
    }

    @ViewBuilder private func modelOptions(_ models: [Live2DCatalog.Model]) -> some View {
        #if os(iOS)
        Picker(selection: modelSelection) {
            ForEach(models) { Text(verbatim: $0.id).tag($0.id) }
        } label: { EmptyView() }
        .pickerStyle(.inline)
        .labelsHidden()
        #else
        ForEach(models) { modelOption($0) }
        #endif
    }

    private func modelOption(_ model: Live2DCatalog.Model) -> some View {
        Button { selectModel(model.id) } label: {
            HStack {
                Text(verbatim: model.id)
                if model.id == modelID { Image(systemName: "checkmark") }
            }
        }
    }

    private var parameterPanel: some View {
        let parameters = player.parameters.filter { $0.minimum.isFinite && $0.maximum.isFinite && $0.minimum < $0.maximum }
        let pageCount = max(1, (parameters.count + 11) / 12)
        let page = min(parameterPage, pageCount - 1)
        return Form {
            Section {
                Button("Live2D.parameters.reset") { player.player.modelParameterOverrides = [:] }
                    .disabled(player.player.modelParameterOverrides.isEmpty)
                if pageCount > 1 {
                    HStack {
                        Button("Live2D.parameters.previous", systemImage: "chevron.left") { parameterPage = page - 1 }
                            .labelStyle(.iconOnly).buttonStyle(.borderless).disabled(page == 0)
                        Spacer()
                        Text("Live2D.parameters.page.\(page + 1).of.\(pageCount)").font(.caption).monospacedDigit()
                        Spacer()
                        Button("Live2D.parameters.next", systemImage: "chevron.right") { parameterPage = page + 1 }
                            .labelStyle(.iconOnly).buttonStyle(.borderless).disabled(page == pageCount - 1)
                    }
                }
            }
            Section {
                ForEach(Array(parameters.dropFirst(page * 12).prefix(12))) { parameter in
                    VStack(alignment: .leading) {
                        HStack {
                            Text(verbatim: parameter.id).font(.caption).textSelection(.enabled)
                            Spacer()
                            let value = player.player.modelParameterOverrides[parameter.id] ?? parameter.value
                            Text(value, format: .number.precision(.fractionLength(2)))
                                .monospacedDigit().font(.caption)
                            Button {
                                player.player.modelParameterOverrides[parameter.id] = nil
                            } label: { Image(systemName: "arrow.counterclockwise") }
                                .help(Text("Live2D.parameters.automatic"))
                                .accessibilityLabel(Text("Live2D.parameters.automatic"))
                                .buttonStyle(.borderless)
                                .disabled(player.player.modelParameterOverrides[parameter.id] == nil)
                        }
                        Slider(value: Binding(get: {
                            min(parameter.maximum, max(parameter.minimum, player.player.modelParameterOverrides[parameter.id] ?? parameter.value))
                        }, set: { player.player.modelParameterOverrides[parameter.id] = $0 }),
                               in: parameter.minimum...parameter.maximum) { Text(verbatim: parameter.id) }
                            .labelsHidden()
                    }
                    .padding(.vertical, 4)
                }
                if parameters.isEmpty {
                    ContentUnavailableView("Live2D.parameters.unavailable", systemImage: "slider.horizontal.3")
                }
            }
        }
        .formStyle(.grouped)
        .disabled(!canPlay)
    }

    private var modelSelection: Binding<String> {
        Binding(get: { modelID }, set: selectModel)
    }
    private func selectModel(_ id: String) {
        guard modelID != id else { return }
        motion = ""
        expression = ""
        modelID = id
    }
    private func characterName(_ id: Int) -> String {
        SekaiCache.preCache.character(id: id)?.fullName.forPreferredLocale() ?? "#\(id)"
    }
    private func updatePlayback() { player.activity(paused: paused, active: scenePhase == .active) }
}

private enum Live2DInspectorTab: CaseIterable {
    case character, parameters

    var symbol: String {
        switch self {
        case .character: "person.2"
        case .parameters: "slider.horizontal.3"
        }
    }
    var localizedLabel: LocalizedStringResource {
        switch self {
        case .character: "Live2D.character"
        case .parameters: "Live2D.parameters"
        }
    }
}
