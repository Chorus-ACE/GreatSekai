import FoundationModels
import SwiftUI

struct SettingsModelsView: View {
    var body: some View {
        Group {
            if #available(iOS 27.0, macOS 27.0, *) {
                ModelManagementView()
            } else {
                ContentUnavailableView {
                    Label("Settings.models", systemImage: "sparkles")
                } description: {
                    Text("Settings.models.requires-system")
                }
            }
        }
        .navigationTitle("Settings.models")
    }
}

@available(iOS 27.0, macOS 27.0, *)
struct ModelManagementView: View {
    @State private var manager = LanguageModelManager.shared
    
    @State private var editing: OnlineModelConfiguration?
    @State private var pendingDeletion: LanguageModelManager.Entry?
    @State private var errorMessage: String?
    @State private var connection = ChatGPTConnection.shared
    @State private var availableChatGPTModels: [String: [ChatGPTAPI.Catalog.Model]] = [:]
    @State private var chatGPTSignInTask: Task<Void, Never>?
    @State private var chatGPTBusy = false
    @State private var chatGPTSignInError: String?
    @AppStorage("LanguageModels.chatgpt.welcome-shown") private var chatGPTWelcomeShown = false
    @Environment(\.openURL) private var openURL
    #if os(iOS)
    @State private var chatGPTBrowser: ChatGPTBrowserPage?
    private struct ChatGPTBrowserPage: Identifiable {
        let id = UUID()
        let url: URL
    }
    #endif
    
    var body: some View {
        Form {
            Section {
                Text("Settings.models.introduction")
                
                if let loadError = manager.loadError {
                    Text(loadError)
                        .foregroundStyle(.red)
                }
            }
            
            Section {
                ForEach(manager.entries.filter { $0.kind == .system || $0.kind == .privateCloudCompute }) { item in
                    ModelRow(
                        title: item.name,
                        caption: item.kind == .privateCloudCompute ? String(localized: "Settings.models.system.model.pcc.caption") : String(localized: "Settings.models.system.model.local.caption"),
                        symbol: item.kind == .system ? "apple.intelligence" : "cloud",
                        isSelected: item.id == manager.selectedID,
                        select: { perform { try manager.select(item.id) } }
                    ) {
                        EmptyView()
                    }
                    .disabled(!manager.isAvailable(item))
                }
            } header: {
                Text("Settings.models.system")
            } footer: {
                if !SystemLanguageModel.default.isAvailable || !manager.privateCloudModel.isAvailable  {
                    Text("Settings.models.system.unavailable")
                }
            }

            Section(content: {
                ForEach(manager.entries.filter({ $0.kind == .openAICompatible })) { item in
                    let configuration = manager.onlineModels.first(where: { $0.id == item.id })
                    ModelRow(
                        title: item.name,
                        caption: configuration?.modelID ?? String(localized: "Info.unknown"),
                        symbol: nil,
                        isSelected: item.id == manager.selectedID,
                        select: { perform { try manager.select(item.id) } }
                    ) {
                        Menu(content: {
                            if let configuration {
                                Button { editing = configuration } label: {
                                    Label("Settings.models.edit", systemImage: "pencil")
                                }
                            }
                            
                            Button(role: .destructive) { pendingDeletion = item } label: {
                                Label("Settings.models.delete", systemImage: "trash")
                            }
                        }, label: {
                            Label("Settings.models.edit", systemImage: "ellipsis.circle")
                                .foregroundStyle(.secondary)
                                .labelStyle(.iconOnly)
                        })
                        .buttonStyle(.borderless)
                    }
                }
                
                Button(action: {
                    editing = OnlineModelConfiguration()
                }, label: {
                    Label("Settings.models.add", systemImage: "plus")
                })
                .disabled(manager.loadError != nil)
            }, header: {
                Text("Settings.models.remote")
            }, footer: {
                Text("Settings.models.remote.description")
            })
            
            chatgptSection
        }
        .formStyle(.grouped)
        .sheet(item: $editing) { configuration in
            ModelEditorView(manager: manager, configuration: configuration)
        }
        #if os(iOS)
        .sheet(item: $chatGPTBrowser, onDismiss: {
            if connection.isSigningIn { cancelChatGPTSignIn() }
            completeChatGPTSignIn()
        }) { page in
            ChatGPTSafariView(url: page.url)
                .ignoresSafeArea()
                .interactiveDismissDisabled()
        }
        #endif
        .confirmationDialog("Settings.models.delete.confirm", isPresented: Binding(
            get: { pendingDeletion != nil },
            set: { if !$0 { pendingDeletion = nil } }
        ), titleVisibility: .visible) {
            Button("Settings.models.delete", role: .destructive) {
                if let entry = pendingDeletion { perform { try manager.delete(entry.id) } }
                pendingDeletion = nil
            }
            Button("Settings.models.cancel", role: .cancel) { pendingDeletion = nil }
        } message: {
            if let entry = pendingDeletion { Text(verbatim: entry.name) }
        }
        .alert("Settings.models.error", isPresented: Binding(
            get: { errorMessage != nil }, set: { if !$0 { errorMessage = nil } }
        )) {
            Button("General.done") { errorMessage = nil }
        } message: {
            Text(errorMessage ?? "")
        }
        .onDisappear { cancelChatGPTSignIn() }
    }

    private var chatgptSection: some View {
        Section {
            ForEach(connection.profiles) { profile in
                ModelRow(
                    title: profile.label,
                    caption: chatGPTCaption(for: profile),
                    symbol: nil,
                    isSelected: profile.id == manager.selectedID && profile.connected && profile.sharing && !profile.modelID.isEmpty,
                    select: {
                        perform { try manager.select(profile.id) }
                    },
                    selectionDisabled: !profile.connected || !profile.sharing || profile.modelID.isEmpty
                ) {
                    Menu {
                        if profile.connected && profile.sharing {
                            chatGPTModelPicker(for: profile)
                            if availableChatGPTModels[profile.id]?.isEmpty == true {
                                Button("General.retry") {
                                    Task { await loadChatGPTModels(for: profile) }
                                }
                            }
                        }
                        Button { signInToChatGPT(profile) } label: {
                            Label("Settings.models.chatgpt.reconnect", systemImage: "arrow.clockwise")
                        }
                        if profile.connected {
                            Button(role: .destructive) { signOutOfChatGPT(profile) } label: {
                                Label("Settings.models.chatgpt.sign-out", systemImage: "rectangle.portrait.and.arrow.right")
                            }
                        }
                    } label: {
                        Label("Settings.models.edit", systemImage: "ellipsis.circle")
                            .foregroundStyle(.secondary)
                            .labelStyle(.iconOnly)
                    }
                    .buttonStyle(.borderless)
                }
                .disabled(chatGPTBusy || chatGPTSignInTask != nil || connection.isSigningIn)
                .task(id: profile.connected && profile.sharing && !connection.isSigningIn) {
                    await loadChatGPTModels(for: profile)
                }
            }
            
            Button(action: {
                if chatGPTSignInTask != nil || connection.isSigningIn {
                    cancelChatGPTSignIn()
                } else {
                    signInToChatGPT(nil)
                }
            }, label: {
                if chatGPTSignInTask != nil || connection.isSigningIn {
                    Label(title: {
                        Text("Settings.models.chatgpt.sign-in.cancel")
                    }, icon: {
                        ProgressView()
                            .controlSize(.small)
                    })
                } else if chatGPTBusy {
                    Label(title: {
                        Text("Settings.models.chatgpt.signing-in")
                    }, icon: {
                        ProgressView()
                            .controlSize(.small)
                    })
                } else {
                    Label("Settings.models.chatgpt.continue", systemImage: "plus")
                }
            })
            .disabled(chatGPTBusy)

            Link(destination: URL(string: "https://chatgpt.com/settings/usage")!) {
                Label("Settings.models.chatgpt.manage-usage", systemImage: "arrow.up.right.square")
            }
            
            if let loadError = connection.loadError {
                Label(loadError, systemImage: "exclamationmark.circle")
                    .foregroundStyle(.red)
            }
        } header: {
            Text(verbatim: "ChatGPT")
        } footer: {
            Text("Settings.models.chatgpt.description")
        }
    }

    private func chatGPTModelPicker(for profile: ChatGPTProfile) -> some View {
        let availableModels = availableChatGPTModels[profile.id]
        return Picker("Settings.models.chatgpt.choose-model", selection: Binding(
            get: { profile.modelID },
            set: { modelID in
                guard let model = availableModels?.first(where: { $0.slug == modelID }) else { return }
                perform {
                    try connection.selectModel(model, profileID: profile.id)
                    try manager.select(profile.id)
                }
            }
        )) {
            if let availableModels {
                if availableModels.isEmpty {
                    Text("Settings.models.chatgpt.no-models")
                        .tag(profile.modelID)
                        .disabled(true)
                } else {
                    if !availableModels.contains(where: { $0.slug == profile.modelID }) {
                        Text(verbatim: chatGPTCaption(for: profile))
                            .tag(profile.modelID)
                            .disabled(true)
                    }
                    ForEach(availableModels, id: \.slug) { model in
                        Text(verbatim: model.display_name).tag(model.slug)
                    }
                }
            } else {
                Label(title: {
                    Text("Settings.models.chatgpt.model.loading")
                }, icon: {
                    ProgressView().controlSize(.small)
                })
                .tag(profile.modelID)
                .disabled(true)
            }
        }
        .pickerStyle(.menu)
    }

    private func loadChatGPTModels(for profile: ChatGPTProfile) async {
        availableChatGPTModels[profile.id] = nil
        guard profile.connected, profile.sharing, !connection.isSigningIn else { return }
        do {
            let models = try await connection.models(for: profile)
            try Task.checkCancellation()
            availableChatGPTModels[profile.id] = models
        } catch is CancellationError {
        } catch {
            guard !Task.isCancelled else { return }
            availableChatGPTModels[profile.id] = []
            errorMessage = error.localizedDescription
        }
    }

    private func chatGPTCaption(for profile: ChatGPTProfile) -> String {
        if !profile.connected { return String(localized: "Settings.models.chatgpt.disconnected") }
        if !profile.sharing { return String(localized: "Settings.models.chatgpt.disabled") }
        if profile.modelID.isEmpty { return String(localized: "Settings.models.chatgpt.model-not-chosen") }
        return profile.modelName.isEmpty ? profile.modelID : profile.modelName
    }

    private func signInToChatGPT(_ profile: ChatGPTProfile?) {
        guard chatGPTSignInTask == nil, !connection.isSigningIn, !chatGPTBusy else { return }
        chatGPTSignInTask = Task {
            defer {
                chatGPTSignInTask = nil
                #if os(iOS)
                // Present the result after Safari has finished dismissing.
                if chatGPTBrowser != nil {
                    chatGPTBrowser = nil
                } else {
                    completeChatGPTSignIn()
                }
                #else
                completeChatGPTSignIn()
                #endif
            }
            do {
                try await connection.signIn(profile: profile) { url in
                    #if os(iOS)
                    chatGPTBrowser = ChatGPTBrowserPage(url: url)
                    #else
                    openURL(url)
                    #endif
                }
                try Task.checkCancellation()
            } catch is CancellationError {
            } catch {
                if !Task.isCancelled { chatGPTSignInError = error.localizedDescription }
            }
        }
    }

    private func completeChatGPTSignIn() {
        if let chatGPTSignInError {
            errorMessage = chatGPTSignInError
            self.chatGPTSignInError = nil
        }
    }

    private func cancelChatGPTSignIn() {
        guard chatGPTSignInTask != nil else { return }
        connection.cancelSignIn()
        chatGPTSignInTask?.cancel()
    }

    private func signOutOfChatGPT(_ profile: ChatGPTProfile) {
        guard !chatGPTBusy, chatGPTSignInTask == nil, !connection.isSigningIn else { return }
        chatGPTBusy = true
        Task {
            defer { chatGPTBusy = false }
            do {
                if manager.selectedID == profile.id { try manager.select(LanguageModelManager.systemID) }
                try await connection.signOut(profile)
            } catch { errorMessage = error.localizedDescription }
        }
    }
    
    private struct ModelRow<V: View>: View {
        var title: String
        var caption: String
        var symbol: String?
        var isSelected: Bool
        var select: () -> Void
        var selectionDisabled = false
        @ViewBuilder var configuration: () -> V

        var body: some View {
//            HStack {
                Button(action: select) {
                    HStack {
                        if let symbol {
                            Image(systemName: symbol)
                                .foregroundStyle(.tint)
                                .font(.title3)
                        }

                        VStack(alignment: .leading) {
                            Text(verbatim: title)
                                .foregroundStyle(.primary)
                            Text(verbatim: caption)
                                .font(.caption).foregroundStyle(.secondary)
                        }

                        Spacer()
                        
                        configuration()
                        
                        if isSelected {
                            Image(systemName: "checkmark").foregroundStyle(.tint)
                        }
                    }
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .disabled(selectionDisabled)
                .accessibilityAddTraits(isSelected ? .isSelected : [])
//            }
        }
    }

    private func perform(_ action: () throws -> Void) {
        do { try action() } catch { errorMessage = error.localizedDescription }
    }
}

//@available(iOS 27.0, macOS 27.0, *)
//private struct ModelManagementView: View {
//    @State private var manager = LanguageModelManager.shared
//    @State private var editing: OnlineModelConfiguration?
//    @State private var pendingDeletion: LanguageModelManager.Entry?
//    @State private var errorMessage: String?
//
//    var body: some View {
//        Form {
//            Section {
//                modelRow(manager.entries[0])
//            } header: {
//                Text("Settings.models.system")
//            } footer: {
//                if case .unavailable = SystemLanguageModel.default.availability {
//                    Text("Settings.models.system.unavailable")
//                }
//            }
//
//            Section {
//                ForEach(manager.entries.dropFirst().filter { $0.kind != .chatGPT }) { entry in
//                    modelRow(entry)
//                        .contextMenu {
//                            Button("Settings.models.select") { perform { try manager.select(entry.id) } }
//                            if let configuration = manager.onlineModels.first(where: { $0.id == entry.id }) {
//                                Button("Settings.models.edit") { editing = configuration }
//                            }
//                            Button("Settings.models.delete", role: .destructive) { pendingDeletion = entry }
//                        }
//                        .swipeActions {
//                            Button("Settings.models.delete", role: .destructive) { pendingDeletion = entry }
//                        }
//                }
//                Button {
//                    editing = OnlineModelConfiguration()
//                } label: {
//                    Label("Settings.models.add", systemImage: "plus")
//                }
//                .disabled(manager.loadError != nil)
//            } header: {
//                Text("Settings.models.custom")
//            } footer: {
//                Text("Settings.models.custom.description")
//            }
//            
//            ChatGPTSettingsSection(manager: manager)
//            
//            if let loadError = manager.loadError {
//                Section { Text(loadError).foregroundStyle(.red) }
//            }
//        }
//        .formStyle(.grouped)
//        .sheet(item: $editing) { configuration in
//            ModelEditorView(manager: manager, configuration: configuration)
//        }
//        .confirmationDialog("Settings.models.delete.confirm", isPresented: Binding(
//            get: { pendingDeletion != nil },
//            set: { if !$0 { pendingDeletion = nil } }
//        ), titleVisibility: .visible) {
//            Button("Settings.models.delete", role: .destructive) {
//                if let entry = pendingDeletion { perform { try manager.delete(entry.id) } }
//                pendingDeletion = nil
//            }
//            Button("Settings.models.cancel", role: .cancel) { pendingDeletion = nil }
//        } message: {
//            if let entry = pendingDeletion { Text(verbatim: entry.name) }
//        }
//        .alert("Settings.models.error", isPresented: Binding(
//            get: { errorMessage != nil }, set: { if !$0 { errorMessage = nil } }
//        )) {
//            Button("General.done") { errorMessage = nil }
//        } message: {
//            Text(errorMessage ?? "")
//        }
//    }
//
//    private func modelRow(_ entry: LanguageModelManager.Entry) -> some View {
//        HStack {
//            Button {
//                perform { try manager.select(entry.id) }
//            } label: {
//                HStack {
//                    Image(systemName: entry.kind == .system ? "apple.intelligence" : "network")
//                        .foregroundStyle(.tint)
//                        .frame(width: 28)
//                    VStack(alignment: .leading) {
//                        Text(verbatim: entry.name).foregroundStyle(.primary)
//                        if let configuration = manager.onlineModels.first(where: { $0.id == entry.id }) {
//                            Text(verbatim: configuration.modelID).font(.caption).foregroundStyle(.secondary)
//                            Text(verbatim: URL(string: configuration.baseURL)?.host() ?? configuration.baseURL)
//                                .font(.caption).foregroundStyle(.secondary)
//                        } else if entry.kind == .system {
//                            Text("Settings.models.system.description").font(.caption).foregroundStyle(.secondary)
//                        }
//                    }
//                    Spacer()
//                    if entry.id == manager.selectedID {
//                        Image(systemName: "checkmark").foregroundStyle(.tint)
//                    }
//                }
//                .contentShape(Rectangle())
//            }
//            .buttonStyle(.plain)
//            .accessibilityAddTraits(entry.id == manager.selectedID ? .isSelected : [])
//            if let configuration = manager.onlineModels.first(where: { $0.id == entry.id }) {
//                Button { editing = configuration } label: {
//                    Label("Settings.models.edit", systemImage: "pencil")
//                }
//                .labelStyle(.iconOnly)
//                .buttonStyle(.borderless)
//            }
//            if entry.kind != .system {
//                Button(role: .destructive) { pendingDeletion = entry } label: {
//                    Label("Settings.models.delete", systemImage: "trash")
//                }
//                .labelStyle(.iconOnly)
//                .buttonStyle(.borderless)
//            }
//        }
//    }
//    private func perform(_ action: () throws -> Void) {
//        do { try action() } catch { errorMessage = error.localizedDescription }
//    }
//}

@available(iOS 27.0, macOS 27.0, *)
private struct ModelEditorView: View {
    @Environment(\.dismiss) private var dismiss
    let manager: LanguageModelManager
    @State private var configuration: OnlineModelConfiguration
    @State private var apiKey = ""
    @State private var errorMessage: String?
    @State private var credentialsLoaded = false
    private let isNew: Bool

    init(manager: LanguageModelManager, configuration: OnlineModelConfiguration) {
        self.manager = manager
        _configuration = State(initialValue: configuration)
        isNew = !manager.onlineModels.contains(where: { $0.id == configuration.id })
    }

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    LabeledContent("Settings.models.provider") { Text(verbatim: "OpenAI Compatible") }
                    TextField("Settings.models.name", text: $configuration.name)
                    TextField("Settings.models.base-url", text: $configuration.baseURL)
                        .autocorrectionDisabled()
                    TextField("Settings.models.model-id", text: $configuration.modelID)
                        .autocorrectionDisabled()
                    SecureField("Settings.models.api-key", text: $apiKey)
                        .autocorrectionDisabled()
                } footer: {
                    Text("Settings.models.connection.description")
                }
                Section {
                    Toggle("Settings.models.tools", isOn: $configuration.supportsTools)
                } footer: {
                    Text("Settings.models.tools.description")
                }
                Section {
                    Text("Settings.models.privacy").font(.footnote).foregroundStyle(.secondary)
                }
                if let errorMessage {
                    Section {
                        Text(errorMessage).foregroundStyle(.red)
                        if !credentialsLoaded {
                            Button("General.retry") { loadCredentials() }
                        }
                    }
                }
            }
            .formStyle(.grouped)
            #if os(iOS)
            .textInputAutocapitalization(.never)
            #endif
            .navigationTitle(isNew ? Text("Settings.models.add") : Text("Settings.models.edit"))
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Settings.models.cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Settings.models.save") { save() }
                        .disabled(!credentialsLoaded || (try? configuration.validated()) == nil)
                }
            }
            .task { loadCredentials() }
            #if os(macOS)
            .frame(minWidth: 520, minHeight: 480)
            #endif
        }
    }

    private func loadCredentials() {
        do {
            apiKey = isNew ? "" : try manager.apiKey(for: configuration.id)
            credentialsLoaded = true
            errorMessage = nil
        } catch { errorMessage = error.localizedDescription }
    }

    private func save() {
        do {
            try manager.save(configuration, apiKey: apiKey.trimmingCharacters(in: .whitespacesAndNewlines))
            dismiss()
        } catch { errorMessage = error.localizedDescription }
    }
}

#Preview {
    NavigationStack { SettingsModelsView() }
}
