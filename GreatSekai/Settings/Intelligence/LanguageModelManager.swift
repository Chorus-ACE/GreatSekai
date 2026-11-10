import Foundation
import FoundationModels
import Observation
import Security

/// Persisted connection details. Credentials are stored separately in Keychain.
nonisolated struct OnlineModelConfiguration: Codable, Hashable, Identifiable, Sendable {
    var id: String = UUID().uuidString
    var name: String = ""
    var baseURL: String = "https://api.openai.com/v1"
    var modelID: String = ""
    var supportsTools = false

    func validated() throws -> Self {
        var result = self
        result.name = name.trimmingCharacters(in: .whitespacesAndNewlines)
        result.modelID = modelID.trimmingCharacters(in: .whitespacesAndNewlines)
        result.baseURL = baseURL.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !result.name.isEmpty, !result.modelID.isEmpty else { throw ModelManagerError.missingFields }
        _ = try result.endpoint()
        return result
    }

    /// A versioned API base URL, rather than a complete chat/completions endpoint.
    func endpoint() throws -> URL {
        guard let components = URLComponents(string: baseURL),
              components.scheme?.lowercased() == "https",
              let host = components.host, !host.isEmpty,
              components.user == nil, components.password == nil,
              components.query == nil, components.fragment == nil,
              let url = components.url else { throw ModelManagerError.invalidURL }
        let path = url.path.trimmingCharacters(in: CharacterSet(charactersIn: "/"))
        guard !path.hasSuffix("chat/completions") else { throw ModelManagerError.invalidURL }
        return url.appending(path: "chat/completions")
    }
}

nonisolated enum ModelManagerError: LocalizedError {
    case missingFields, invalidURL, protectedModel, modelNotFound, invalidResponse, unsupportedContent, unsupportedOptions
    case keychain(OSStatus)
    case httpStatus(Int)

    var errorDescription: String? {
        switch self {
        case .missingFields: String(localized: "Settings.models.error.required")
        case .invalidURL: String(localized: "Settings.models.error.url")
        case .protectedModel: String(localized: "Settings.models.error.protected")
        case .modelNotFound: String(localized: "Settings.models.error.not-found")
        case .invalidResponse: String(localized: "Settings.models.error.response")
        case .unsupportedContent: String(localized: "Settings.models.error.content")
        case .unsupportedOptions: String(localized: "Settings.models.error.options")
        case .keychain(let status): String(localized: "Settings.models.error.keychain.\(Int(status))")
        case .httpStatus(let status): String(localized: "Settings.models.error.http.\(status)")
        }
    }
}

/// Built-in Apple models are synthesized and can never be overwritten or deleted.
/// Other LanguageModel implementations can be registered by application code at launch.
@available(iOS 27.0, macOS 27.0, *)
@MainActor @Observable
final class LanguageModelManager {
    static let shared = LanguageModelManager()
    static let systemID = "system"
    static let privateCloudID = "private-cloud-compute"
    private static let builtInIDs: Set<String> = [systemID, privateCloudID]
    let privateCloudModel = PrivateCloudComputeLanguageModel()

    struct Entry: Identifiable {
        let id: String
        let name: String
        let kind: Kind
        enum Kind { case system, privateCloudCompute, openAICompatible, registered, chatGPT }
    }

    private(set) var onlineModels: [OnlineModelConfiguration] = []
    private(set) var registeredEntries: [Entry] = []
    private(set) var selectedID: String
    private(set) var loadError: String?
    @ObservationIgnored private let defaults: UserDefaults
    @ObservationIgnored private let credentials: Credentials
    @ObservationIgnored private let chatGPTConnection: ChatGPTConnection
    @ObservationIgnored private var registeredModels: [String: any LanguageModel] = [:]
    private static let configurationsKey = "LanguageModels.configurations.v1"
    private static let selectionKey = "LanguageModels.selectedID"

    var entries: [Entry] {
        [Entry(id: Self.systemID, name: String(localized: "Settings.models.system.local"), kind: .system),
         Entry(id: Self.privateCloudID, name: String(localized: "Settings.models.system.pcc"), kind: .privateCloudCompute)]
        + onlineModels.map { Entry(id: $0.id, name: $0.name, kind: .openAICompatible) }
        + registeredEntries
        + chatGPTConnection.profiles.filter { $0.connected && $0.sharing && !$0.modelID.isEmpty }.map {
            Entry(id: $0.id, name: "ChatGPT · \($0.modelName) · \($0.label)", kind: .chatGPT)
        }
    }

    struct Credentials {
        var read: (String) throws -> String
        var write: (String, String) throws -> Void
        var delete: (String) throws -> Void

        static let keychain = Self(
            read: { try ModelCredentialStore.read(id: $0) },
            write: { try ModelCredentialStore.write($1, id: $0) },
            delete: { try ModelCredentialStore.delete(id: $0) }
        )
    }

    init(defaults: UserDefaults = .standard, credentials: Credentials? = nil, chatGPTConnection: ChatGPTConnection? = nil) {
        self.defaults = defaults
        self.credentials = credentials ?? .keychain
        self.chatGPTConnection = chatGPTConnection ?? .shared
        selectedID = defaults.string(forKey: Self.selectionKey) ?? Self.systemID
        if let data = defaults.data(forKey: Self.configurationsKey) {
            do {
                let models = try JSONDecoder().decode([OnlineModelConfiguration].self, from: data)
                guard Set(models.map(\.id)).count == models.count,
                      models.allSatisfy({ !$0.id.isEmpty && !Self.builtInIDs.contains($0.id) && !$0.id.hasPrefix("chatgpt:") }) else {
                    throw ModelManagerError.protectedModel
                }
                onlineModels = try models.map { try $0.validated() }
            } catch { loadError = error.localizedDescription }
        }
        // An unregistered provider is resolved at use time and never silently replaced by a cloud model.
    }

    func isAvailable(_ entry: Entry) -> Bool {
        switch entry.kind {
        case .system: SystemLanguageModel.default.isAvailable
        case .privateCloudCompute: privateCloudModel.isAvailable
        default: true
        }
    }

    func select(_ id: String) throws {
        guard entries.contains(where: { $0.id == id }) else { throw ModelManagerError.modelNotFound }
        selectedID = id
        defaults.set(id, forKey: Self.selectionKey)
    }

    func save(_ configuration: OnlineModelConfiguration, apiKey: String) throws {
        guard loadError == nil else { throw ModelManagerError.invalidResponse }
        guard !configuration.id.isEmpty, !Self.builtInIDs.contains(configuration.id), !configuration.id.hasPrefix("chatgpt:"), registeredModels[configuration.id] == nil else {
            throw ModelManagerError.protectedModel
        }
        let configuration = try configuration.validated()
        var updated = onlineModels
        if let index = updated.firstIndex(where: { $0.id == configuration.id }) { updated[index] = configuration }
        else { updated.append(configuration) }
        let data = try JSONEncoder().encode(updated)
        try credentials.write(configuration.id, apiKey)
        defaults.set(data, forKey: Self.configurationsKey)
        onlineModels = updated
    }

    func delete(_ id: String) throws {
        guard !Self.builtInIDs.contains(id) else { throw ModelManagerError.protectedModel }
        if registeredModels[id] != nil {
            registeredModels.removeValue(forKey: id)
            registeredEntries.removeAll { $0.id == id }
        } else {
            guard onlineModels.contains(where: { $0.id == id }) else { throw ModelManagerError.modelNotFound }
            let updated = onlineModels.filter { $0.id != id }
            let data = try JSONEncoder().encode(updated)
            try credentials.delete(id)
            defaults.set(data, forKey: Self.configurationsKey)
            onlineModels = updated
        }
        if selectedID == id { try select(Self.systemID) }
    }

    /// Registration is process-local; a provider package should register its models on each launch.
    func register<Model: LanguageModel>(_ model: Model, id: String, name: String) throws {
        guard !id.isEmpty, !Self.builtInIDs.contains(id), !id.hasPrefix("chatgpt:"), !onlineModels.contains(where: { $0.id == id }) else {
            throw ModelManagerError.protectedModel
        }
        registeredModels[id] = model
        registeredEntries.removeAll { $0.id == id }
        registeredEntries.append(Entry(id: id, name: name, kind: .registered))
    }

    func model(for id: String? = nil) throws -> any LanguageModel {
        let id = id ?? selectedID
        if id == Self.systemID { return SystemLanguageModel.default }
        if id == Self.privateCloudID { return privateCloudModel }
        if let profile = chatGPTConnection.profiles.first(where: { $0.id == id }) {
            guard profile.connected, profile.sharing, !profile.modelID.isEmpty else { throw ChatGPTError.permission }
            return ChatGPTModel(clientID: profile.clientID, modelID: profile.modelID)
        }
        if let model = registeredModels[id] { return model }
        guard let configuration = onlineModels.first(where: { $0.id == id }) else { throw ModelManagerError.modelNotFound }
        return OpenAICompatibleModel(configuration: configuration, apiKey: try apiKey(for: id))
    }

    func apiKey(for id: String) throws -> String { try credentials.read(id) }

    func makeSession(instructions: String? = nil, tools: [any Tool] = []) throws -> LanguageModelSession {
        let model = try model()
        return LanguageModelSession(model: model, tools: tools, instructions: instructions)
    }
}

nonisolated enum ModelCredentialStore {
    private static let service = "com.chorus-ace.GreatSekai.language-models"

    private static func query(id: String) -> [String: Any] {
        [kSecClass as String: kSecClassGenericPassword,
         kSecAttrService as String: service, kSecAttrAccount as String: id,
         kSecUseDataProtectionKeychain as String: true]
    }

    static func read(id: String) throws -> String {
        var query = query(id: id)
        query[kSecReturnData as String] = true
        query[kSecMatchLimit as String] = kSecMatchLimitOne
        var result: CFTypeRef?
        let status = SecItemCopyMatching(query as CFDictionary, &result)
        if status == errSecItemNotFound { return "" }
        guard status == errSecSuccess, let data = result as? Data,
              let value = String(data: data, encoding: .utf8) else { throw ModelManagerError.keychain(status) }
        return value
    }

    static func write(_ key: String, id: String) throws {
        if key.isEmpty { try delete(id: id); return }
        let query = query(id: id)
        let values = [kSecValueData as String: Data(key.utf8)]
        let status = SecItemUpdate(query as CFDictionary, values as CFDictionary)
        if status == errSecItemNotFound {
            var item = query.merging(values) { _, new in new }
            item[kSecAttrAccessible as String] = kSecAttrAccessibleWhenUnlockedThisDeviceOnly
            let addStatus = SecItemAdd(item as CFDictionary, nil)
            guard addStatus == errSecSuccess else { throw ModelManagerError.keychain(addStatus) }
        } else if status != errSecSuccess { throw ModelManagerError.keychain(status) }
    }

    static func delete(id: String) throws {
        let status = SecItemDelete(query(id: id) as CFDictionary)
        guard status == errSecSuccess || status == errSecItemNotFound else { throw ModelManagerError.keychain(status) }
    }
}
