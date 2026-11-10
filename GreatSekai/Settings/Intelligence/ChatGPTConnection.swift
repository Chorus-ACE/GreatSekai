import Foundation
import CryptoKit
import Security
import Network
import Observation

nonisolated enum ChatGPTError: LocalizedError {
    case signIn, identity, permission, expired, callback, stream, remoteSignOut
    case inference(String?)
    case service(Int, String?)
    var errorDescription: String? {
        switch self {
        case .signIn: String(localized: "Settings.models.chatgpt.error.sign-in")
        case .identity: String(localized: "Settings.models.chatgpt.error.identity")
        case .permission: String(localized: "Settings.models.chatgpt.error.permission")
        case .expired: String(localized: "Settings.models.chatgpt.error.expired")
        case .callback: String(localized: "Settings.models.chatgpt.error.callback")
        case .stream: String(localized: "Settings.models.chatgpt.error.stream")
        case .remoteSignOut: String(localized: "Settings.models.chatgpt.error.sign-out")
        case .inference(let code):
            String(localized: "Settings.models.chatgpt.error.stream") + (code.map { " (\($0))" } ?? "")
        case .service(let status, let code):
            String(localized: "Settings.models.chatgpt.error.http.\(status)") + (code.map { " (\($0))" } ?? "")
        }
    }
}

nonisolated struct ChatGPTProfile: Codable, Hashable, Identifiable, Sendable {
    var id: String { "chatgpt:\(clientID)" }
    let clientID: String
    var subject: String?
    var email: String?
    var modelID: String = ""
    var modelName: String = ""
    var connected = false
    var sharing = false
    var label: String { "\(email ?? "ChatGPT") · \(clientID.suffix(6))" }
}

nonisolated struct ChatGPTTokens: Codable, Sendable {
    let accessToken: String
    let refreshToken: String?
    let idToken: String
    let scopes: [String]
    let expiresAt: Date
    var sharing: Bool { scopes.contains("chatgpt.tokens.use.direct") }
}

nonisolated enum ChatGPTAPI {
    static let resource = "https://api.openai.com/v1"
    static let issuer = "https://auth.openai.com"
    static let tokenURL = URL(string: issuer + "/api/accounts/oauth/token")!
    static let session: URLSession = {
        let config = URLSessionConfiguration.ephemeral
        config.timeoutIntervalForRequest = 90
        config.urlCache = nil
        config.httpShouldSetCookies = false
        return URLSession(configuration: config)
    }()

    static func form(_ parameters: [String: String]) -> Data {
        var components = URLComponents()
        components.queryItems = parameters.sorted { $0.key < $1.key }.map { URLQueryItem(name: $0.key, value: $0.value) }
        // '+' is literal in RFC 3986 queries, but a space in form encoding.
        return Data((components.percentEncodedQuery ?? "").replacingOccurrences(of: "+", with: "%2B").utf8)
    }

    static func post(_ url: URL, parameters: [String: String]) async throws -> Data {
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
        request.httpBody = form(parameters)
        let (data, response) = try await session.data(for: request)
        try check(response, data: data)
        return data
    }

    static func check(_ response: URLResponse, data: Data = Data()) throws {
        guard let http = response as? HTTPURLResponse else { throw ModelManagerError.invalidResponse }
        guard (200..<300).contains(http.statusCode) else {
            throw ChatGPTError.service(http.statusCode, safeCode(data))
        }
    }

    // Never surface arbitrary server text or token responses. Only known recovery codes are shown.
    static func safeCode(_ data: Data) -> String? {
        guard let root = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else { return nil }
        let error = root["error"] as? [String: Any]
        let code = error?["code"] as? String ?? root["error"] as? String ?? root["code"] as? String
        return ["invalid_grant", "subscription_sharing_usage_limit_exceeded", "subscription_sharing_usage_unavailable",
                "subscription_sharing_user_not_eligible", "subscription_sharing_unsupported_capability",
                "subscription_sharing_route_not_supported", "subscription_sharing_invalid_user",
                "subscription_sharing_user_unavailable", "chatpass_v2_scope_not_authorized",
                "chatpass_v2_invalid_authorization_context", "access_denied", "invalid_token"].contains(code ?? "") ? code : nil
    }

    static func tokens(_ data: Data, previous: ChatGPTTokens? = nil) throws -> ChatGPTTokens {
        struct Response: Decodable {
            let access_token: String
            let refresh_token: String?
            let id_token: String?
            let token_type: String
            let expires_in: Double
            let scope: String?
        }
        let result = try JSONDecoder().decode(Response.self, from: data)
        guard !result.access_token.isEmpty, result.token_type.lowercased() == "bearer", result.expires_in > 0,
              let idToken = result.id_token ?? previous?.idToken else { throw ChatGPTError.identity }
        return ChatGPTTokens(accessToken: result.access_token, refreshToken: result.refresh_token ?? previous?.refreshToken,
            idToken: idToken, scopes: result.scope.map { $0.split(separator: " ").map(String.init) } ?? previous?.scopes ?? [],
            expiresAt: Date().addingTimeInterval(result.expires_in))
    }

    struct Catalog: Decodable, Sendable {
        let models: [Model]
        struct Model: Decodable, Hashable, Sendable {
            let slug: String
            let display_name: String
            let visibility: String?
        }
    }

    static func models(token: String, session: URLSession = ChatGPTAPI.session) async throws -> [Catalog.Model] {
        var request = URLRequest(url: URL(string: resource + "/models")!)
        request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        let (data, response) = try await session.data(for: request)
        try check(response, data: data)
        return try JSONDecoder().decode(Catalog.self, from: data).models.filter { $0.visibility == "list" }
    }
}

/// One refresh at a time per registration. Rotating credentials are replaced atomically in Keychain.
actor ChatGPTCredentialVault {
    static let shared = ChatGPTCredentialVault()
    struct Storage: Sendable {
        var read: @Sendable (String) throws -> String
        var write: @Sendable (String, String) throws -> Void
        var delete: @Sendable (String) throws -> Void
        static let keychain = Storage(read: { try ModelCredentialStore.read(id: $0) },
            write: { try ModelCredentialStore.write($1, id: $0) }, delete: { try ModelCredentialStore.delete(id: $0) })
    }
    private let storage: Storage
    private let refresh: @Sendable (String, String, ChatGPTTokens) async throws -> ChatGPTTokens
    init(storage: Storage = .keychain,
         refresh: @escaping @Sendable (String, String, ChatGPTTokens) async throws -> ChatGPTTokens = { clientID, refreshToken, old in
             let data = try await ChatGPTAPI.post(ChatGPTAPI.tokenURL, parameters: ["grant_type": "refresh_token",
                 "client_id": clientID, "refresh_token": refreshToken, "resource": ChatGPTAPI.resource])
             return try ChatGPTAPI.tokens(data, previous: old)
         }) {
        self.storage = storage; self.refresh = refresh
    }
    private var refreshes: [String: Task<ChatGPTTokens, Error>] = [:]
    private var generations: [String: UUID] = [:]
    private func key(_ clientID: String) -> String { "chatgpt.tokens:\(clientID)" }

    func read(_ clientID: String) throws -> ChatGPTTokens {
        let value = try storage.read(key(clientID))
        guard !value.isEmpty else { throw ChatGPTError.expired }
        return try JSONDecoder().decode(ChatGPTTokens.self, from: Data(value.utf8))
    }

    func save(_ tokens: ChatGPTTokens, clientID: String) throws {
        refreshes.removeValue(forKey: clientID)?.cancel()
        generations[clientID] = UUID()
        try write(tokens, clientID: clientID)
    }

    private func write(_ tokens: ChatGPTTokens, clientID: String) throws {
        try storage.write(key(clientID), String(decoding: JSONEncoder().encode(tokens), as: UTF8.self))
    }

    func clear(_ clientID: String) throws {
        generations[clientID] = UUID()
        refreshes.removeValue(forKey: clientID)?.cancel()
        try storage.delete(key(clientID))
    }

    func accessToken(_ clientID: String) async throws -> String {
        let tokens = try read(clientID)
        guard tokens.sharing else { throw ChatGPTError.permission }
        if tokens.expiresAt.timeIntervalSinceNow > 60 { return tokens.accessToken }
        if let task = refreshes[clientID] { return try await task.value.accessToken }
        guard let refresh = tokens.refreshToken else { throw ChatGPTError.expired }
        let generation = generations[clientID] ?? UUID()
        generations[clientID] = generation
        let task = Task {
            let renewed = try await self.refresh(clientID, refresh, tokens)
            try Task.checkCancellation()
            guard self.generations[clientID] == generation else { throw ChatGPTError.expired }
            try self.write(renewed, clientID: clientID)
            guard renewed.sharing else { throw ChatGPTError.permission }
            return renewed
        }
        refreshes[clientID] = task
        do {
            let renewed = try await task.value
            guard generations[clientID] == generation else { throw ChatGPTError.expired }
            refreshes[clientID] = nil
            return renewed.accessToken
        } catch {
            if generations[clientID] == generation { refreshes[clientID] = nil }
            throw error
        }
    }
}

/// Validates RS256 with Apple's Security framework, never trusting decoded claims before signature verification.
nonisolated enum ChatGPTIdentity {
    struct Identity: Sendable { let subject: String; let email: String? }
    static func decodeURL(_ value: String) throws -> Data {
        let base64 = value.replacingOccurrences(of: "-", with: "+").replacingOccurrences(of: "_", with: "/")
        guard let data = Data(base64Encoded: base64 + String(repeating: "=", count: (4 - base64.count % 4) % 4)) else {
            throw ChatGPTError.identity
        }
        return data
    }
    static func validate(_ token: String, clientID: String, nonce: String) async throws -> Identity {
        let (data, response) = try await ChatGPTAPI.session.data(from: URL(string: ChatGPTAPI.issuer + "/.well-known/jwks.json")!)
        try ChatGPTAPI.check(response)
        return try validate(token, clientID: clientID, nonce: nonce, jwks: data)
    }
    static func validate(_ token: String, clientID: String, nonce: String, jwks: Data) throws -> Identity {
        let parts = token.split(separator: ".", omittingEmptySubsequences: false).map(String.init)
        guard parts.count == 3,
              let header = try JSONSerialization.jsonObject(with: decodeURL(parts[0])) as? [String: Any],
              header["alg"] as? String == "RS256", let kid = header["kid"] as? String,
              let keys = try JSONSerialization.jsonObject(with: jwks) as? [String: Any],
              let key = (keys["keys"] as? [[String: Any]])?.first(where: { $0["kid"] as? String == kid && $0["kty"] as? String == "RSA" }),
              key["use"] == nil || key["use"] as? String == "sig",
              key["alg"] == nil || key["alg"] as? String == "RS256",
              let n = key["n"] as? String, let e = key["e"] as? String else { throw ChatGPTError.identity }
        func der(_ tag: UInt8, _ content: Data) -> Data {
            var length = content.count
            var bytes: [UInt8] = []
            repeat { bytes.insert(UInt8(length & 255), at: 0); length >>= 8 } while length > 0
            return Data([tag] + (content.count < 128 ? [UInt8(content.count)] : [0x80 | UInt8(bytes.count)] + bytes)) + content
        }
        func integer(_ value: Data) -> Data {
            var value = Data(value.drop(while: { $0 == 0 }))
            if value.isEmpty || value.first! & 0x80 != 0 { value.insert(0, at: 0) }
            return der(0x02, value)
        }
        let encoded = try der(0x30, integer(decodeURL(n)) + integer(decodeURL(e)))
        guard let publicKey = SecKeyCreateWithData(encoded as CFData, [kSecAttrKeyType: kSecAttrKeyTypeRSA,
                kSecAttrKeyClass: kSecAttrKeyClassPublic] as CFDictionary, nil),
              SecKeyVerifySignature(publicKey, .rsaSignatureMessagePKCS1v15SHA256,
                Data("\(parts[0]).\(parts[1])".utf8) as CFData, try decodeURL(parts[2]) as CFData, nil),
              let claims = try JSONSerialization.jsonObject(with: decodeURL(parts[1])) as? [String: Any] else {
            throw ChatGPTError.identity
        }
        let audiences = (claims["aud"] as? [String]) ?? (claims["aud"] as? String).map { [$0] } ?? []
        guard claims["iss"] as? String == ChatGPTAPI.issuer,
              audiences.contains(clientID), audiences.count == 1 || claims["azp"] as? String == clientID,
              claims["azp"] == nil || claims["azp"] as? String == clientID,
              claims["nonce"] as? String == nonce,
              let expiry = claims["exp"] as? Double, expiry > Date().timeIntervalSince1970,
              let subject = claims["sub"] as? String, !subject.isEmpty else { throw ChatGPTError.identity }
        if let notBefore = claims["nbf"] as? Double, notBefore > Date().timeIntervalSince1970 + 30 { throw ChatGPTError.identity }
        return Identity(subject: subject, email: claims["email"] as? String)
    }
}

/// A short-lived listener bound only to IPv4 loopback; state and exact path are checked before consuming a code.
@MainActor final class ChatGPTCallbackListener {
    private let listener: NWListener
    private var ready: CheckedContinuation<URL, Error>?
    private var callback: CheckedContinuation<URL, Error>?
    private var result: Result<URL, Error>?
    private var timeout: Task<Void, Never>?
    private var connections: [UUID: NWConnection] = [:]
    private let state: String
    private(set) var redirectURI: URL?

    init(state: String) throws {
        self.state = state
        let parameters = NWParameters.tcp
        parameters.requiredLocalEndpoint = .hostPort(host: "127.0.0.1", port: .any)
        listener = try NWListener(using: parameters)
    }
    func start() async throws -> URL {
        try await withCheckedThrowingContinuation { continuation in
            ready = continuation
            listener.stateUpdateHandler = { [weak self] state in
                Task { @MainActor [weak self] in
                    guard let self else { return }
                    switch state {
                    case .ready:
                        guard let port = self.listener.port,
                              let url = URL(string: "http://127.0.0.1:\(port.rawValue)/auth/callback") else {
                            self.finish(.failure(ChatGPTError.callback)); return
                        }
                        self.redirectURI = url
                        self.ready?.resume(returning: url); self.ready = nil
                    case .failed: self.finish(.failure(ChatGPTError.callback))
                    default: break
                    }
                }
            }
            listener.newConnectionHandler = { [weak self] connection in
                Task { @MainActor [weak self] in self?.accept(connection) }
            }
            listener.start(queue: .main)
            timeout = Task { [weak self] in
                do { try await Task.sleep(for: .seconds(300)) } catch { return }
                self?.finish(.failure(ChatGPTError.callback))
            }
        }
    }
    func wait() async throws -> URL {
        try await withTaskCancellationHandler {
            try Task.checkCancellation()
            if let result { return try result.get() }
            return try await withCheckedThrowingContinuation { callback = $0 }
        } onCancel: { Task { @MainActor in self.cancel() } }
    }
    func cancel() { finish(.failure(CancellationError())) }
    private func finish(_ result: Result<URL, Error>) {
        guard self.result == nil else { return }
        self.result = result
        timeout?.cancel(); timeout = nil
        if let ready { ready.resume(throwing: ChatGPTError.callback); self.ready = nil }
        callback?.resume(with: result); callback = nil
        listener.cancel()
        for connection in connections.values { connection.cancel() }
        connections.removeAll()
    }
    private func accept(_ connection: NWConnection) {
        guard result == nil, connections.count < 8 else { connection.cancel(); return }
        let id = UUID()
        connections[id] = connection
        connection.start(queue: .main)
        receive(connection, id: id, data: Data())
    }
    private func receive(_ connection: NWConnection, id: UUID, data: Data) {
        connection.receive(minimumIncompleteLength: 1, maximumLength: 16384) { [weak self] chunk, _, complete, error in
            Task { @MainActor [weak self] in
                guard let self, self.connections[id] != nil else { connection.cancel(); return }
                var data = data; data.append(chunk ?? Data())
                guard data.count <= 16384, error == nil else { self.close(id); return }
                guard let text = String(data: data, encoding: .utf8), text.contains("\r\n\r\n") else {
                    if complete { self.close(id) } else { self.receive(connection, id: id, data: data) }
                    return
                }
                let first = text.components(separatedBy: "\r\n")[0].split(separator: " ")
                var validURL: URL?
                if first.count == 3, first[0] == "GET", first[1].hasPrefix("/auth/callback?"),
                   let base = self.redirectURI,
                   let url = URL(string: String(first[1]), relativeTo: base)?.absoluteURL,
                   let items = URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems,
                   items.filter({ $0.name == "state" }).count == 1,
                   items.first(where: { $0.name == "state" })?.value == self.state {
                    validURL = url
                }
                let message = validURL == nil ? "Invalid callback." : String(localized: "Settings.models.chatgpt.browser.done")
                let body = Data(message.utf8)
                let response = Data("HTTP/1.1 \(validURL == nil ? "400 Bad Request" : "200 OK")\r\nContent-Type: text/plain; charset=utf-8\r\nContent-Length: \(body.count)\r\nCache-Control: no-store\r\nConnection: close\r\n\r\n".utf8) + body
                let verifiedURL = validURL
                connection.send(content: response, completion: .contentProcessed { [weak self] _ in
                    Task { @MainActor [weak self] in
                        self?.close(id)
                        if let verifiedURL { self?.finish(.success(verifiedURL)) }
                    }
                })
            }
        }
    }
    private func close(_ id: UUID) { connections.removeValue(forKey: id)?.cancel() }
}

@MainActor @Observable final class ChatGPTConnection {
    static let shared = ChatGPTConnection()
    private(set) var profiles: [ChatGPTProfile] = []
    private(set) var isSigningIn = false
    private(set) var loadError: String?
    @ObservationIgnored private var listener: ChatGPTCallbackListener?
    @ObservationIgnored private let defaults: UserDefaults
    private static let profilesKey = "LanguageModels.chatgpt.profiles.v1"
    private static let hostKey = "LanguageModels.chatgpt.host.v1"

    init(defaults: UserDefaults = .standard) {
        self.defaults = defaults
        if let data = defaults.data(forKey: Self.profilesKey) {
            do {
                profiles = try JSONDecoder().decode([ChatGPTProfile].self, from: data)
                guard Set(profiles.map(\.id)).count == profiles.count else { throw ChatGPTError.identity }
            } catch { profiles = []; loadError = String(localized: "Settings.models.chatgpt.error.storage") }
        }
    }
    private func save(_ profile: ChatGPTProfile) throws {
        guard loadError == nil else { throw ChatGPTError.signIn }
        var updated = profiles.filter { $0.id != profile.id }; updated.append(profile)
        defaults.set(try JSONEncoder().encode(updated), forKey: Self.profilesKey)
        profiles = updated
    }
    func cancelSignIn() { listener?.cancel() }
    func signIn(profile: ChatGPTProfile? = nil, openBrowser: (URL) -> Void) async throws {
        guard !isSigningIn, loadError == nil else { throw ChatGPTError.signIn }
        isSigningIn = true
        defer { listener?.cancel(); listener = nil; isSigningIn = false }
        func random() throws -> String {
            var bytes = [UInt8](repeating: 0, count: 32)
            guard SecRandomCopyBytes(kSecRandomDefault, bytes.count, &bytes) == errSecSuccess else { throw ChatGPTError.signIn }
            return Data(bytes).base64URLEncoded
        }
        let state = try random(), nonce = try random(), verifier = try random()
        let hostID: String
        if let existing = defaults.string(forKey: Self.hostKey) { hostID = existing }
        else { hostID = "urn:uuid:\(UUID().uuidString.lowercased())"; defaults.set(hostID, forKey: Self.hostKey) }
        let listener = try ChatGPTCallbackListener(state: state)
        self.listener = listener
        let redirect = try await withTaskCancellationHandler {
            try Task.checkCancellation()
            return try await listener.start()
        } onCancel: { Task { @MainActor in listener.cancel() } }
        var parameters = ["client_id": profile?.clientID ?? "dynamic_agent_client", "ext_agent_host_id": hostID,
            "response_type": "code", "redirect_uri": redirect.absoluteString,
            "scope": "openid profile email offline_access resource.invoke chatgpt.tokens.use.direct",
            "resource": ChatGPTAPI.resource, "state": state, "nonce": nonce, "code_challenge_method": "S256",
            "code_challenge": Data(SHA256.hash(data: Data(verifier.utf8))).base64URLEncoded]
        if profile == nil { parameters["agent_name_hint"] = "GreatSekai" }
        if let profile {
            if let old = try? await ChatGPTCredentialVault.shared.read(profile.clientID) { parameters["id_token_hint"] = old.idToken }
            if let email = profile.email { parameters["login_hint"] = email }
            if !profile.sharing { parameters["prompt"] = "consent" }
        }
        var authorize = URLComponents(string: ChatGPTAPI.issuer + "/api/accounts/authorize")!
        authorize.queryItems = parameters.map { URLQueryItem(name: $0.key, value: $0.value) }
        try Task.checkCancellation()
        openBrowser(authorize.url!)
        let callback = try await listener.wait()
        let result = try Self.parseCallback(callback, state: state, clientID: profile?.clientID)
        // Retain registration even if the one-use code expires during exchange.
        var saved = profile ?? profiles.first(where: { $0.clientID == result.clientID }) ?? ChatGPTProfile(clientID: result.clientID)
        try save(saved)
        let data = try await ChatGPTAPI.post(ChatGPTAPI.tokenURL, parameters: ["grant_type": "authorization_code",
            "client_id": result.clientID, "code": result.code, "code_verifier": verifier,
            "redirect_uri": redirect.absoluteString, "resource": ChatGPTAPI.resource])
        let tokens = try ChatGPTAPI.tokens(data)
        let identity = try await ChatGPTIdentity.validate(tokens.idToken, clientID: result.clientID, nonce: nonce)
        guard saved.subject == nil || saved.subject == identity.subject else { throw ChatGPTError.identity }
        try Task.checkCancellation()
        try await ChatGPTCredentialVault.shared.save(tokens, clientID: result.clientID)
        saved.subject = identity.subject; saved.email = identity.email; saved.connected = true; saved.sharing = tokens.sharing
        try save(saved)
    }
    nonisolated static func parseCallback(_ url: URL, state: String, clientID: String?) throws -> (code: String, clientID: String) {
        guard url.scheme == "http", url.host == "127.0.0.1", url.path == "/auth/callback",
              let items = URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems,
              Set(items.map(\.name)).count == items.count,
              items.first(where: { $0.name == "state" })?.value == state else { throw ChatGPTError.callback }
        func value(_ name: String) -> String? { items.first { $0.name == name }?.value }
        guard value("error") == nil else { throw ChatGPTError.signIn }
        guard let code = value("code"), !code.isEmpty, let issued = value("client_id") ?? clientID,
              !issued.isEmpty, issued != "dynamic_agent_client",
              clientID == nil || issued == clientID else { throw ChatGPTError.callback }
        return (code, issued)
    }
    func models(for profile: ChatGPTProfile) async throws -> [ChatGPTAPI.Catalog.Model] {
        try await ChatGPTAPI.models(token: ChatGPTCredentialVault.shared.accessToken(profile.clientID))
    }
    func selectModel(_ model: ChatGPTAPI.Catalog.Model, profileID: String) throws {
        guard var profile = profiles.first(where: { $0.id == profileID }), profile.connected, profile.sharing else {
            throw ChatGPTError.permission
        }
        profile.modelID = model.slug; profile.modelName = model.display_name
        try save(profile)
    }
    func signOut(_ profile: ChatGPTProfile) async throws {
        var saved = profile
        saved.connected = false; saved.sharing = false
        // Stop new requests before doing network work. Invalidate any rotating refresh first.
        let tokens = try? await ChatGPTCredentialVault.shared.read(profile.clientID)
        try await ChatGPTCredentialVault.shared.clear(profile.clientID)
        try save(saved)
        guard let refresh = tokens?.refreshToken else { return }
        struct Discovery: Decodable { let revocation_endpoint: URL }
        do {
            let (data, response) = try await ChatGPTAPI.session.data(from: URL(string: ChatGPTAPI.issuer + "/.well-known/openid-configuration")!)
            try ChatGPTAPI.check(response)
            let endpoint = try JSONDecoder().decode(Discovery.self, from: data).revocation_endpoint
            guard endpoint.scheme == "https", endpoint.host == "auth.openai.com" else { throw ChatGPTError.remoteSignOut }
            var revoked = false
            for attempt in 0..<3 {
                do {
                    _ = try await ChatGPTAPI.post(endpoint, parameters: ["token": refresh, "token_type_hint": "refresh_token", "client_id": profile.clientID])
                    revoked = true; break
                } catch {
                    if attempt < 2 { try await Task.sleep(for: .seconds(attempt + 1)) }
                }
            }
            guard revoked else { throw ChatGPTError.remoteSignOut }
        } catch { throw ChatGPTError.remoteSignOut }
    }
}

nonisolated extension Data {
    var base64URLEncoded: String {
        base64EncodedString().replacingOccurrences(of: "+", with: "-").replacingOccurrences(of: "/", with: "_").replacingOccurrences(of: "=", with: "")
    }
}
