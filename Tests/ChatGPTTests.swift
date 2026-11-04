import Foundation
import Security
import FoundationModels

nonisolated private final class MemoryCredentials: @unchecked Sendable {
    private let lock = NSLock()
    private var values: [String: String] = [:]
    func read(_ key: String) -> String { lock.withLock { values[key] ?? "" } }
    func write(_ key: String, _ value: String) { lock.withLock { values[key] = value } }
    func delete(_ key: String) { lock.withLock { _ = values.removeValue(forKey: key) } }
    var storage: ChatGPTCredentialVault.Storage { .init(read: read, write: write, delete: delete) }
}

private actor RefreshCounter {
    var calls = 0
    func refresh() async throws -> ChatGPTTokens {
        calls += 1
        try await Task.sleep(for: .milliseconds(50))
        return ChatGPTTokens(accessToken: "renewed", refreshToken: "rotated", idToken: "id", scopes: ["chatgpt.tokens.use.direct"], expiresAt: .distantFuture)
    }
}

@available(macOS 27.0, *)
enum ChatGPTTests {
    static func rejects(_ action: () throws -> Void) {
        do { try action(); fatalError("Accepted invalid ChatGPT data") } catch { }
    }
    static func run() async throws {
        let callback = URL(string: "http://127.0.0.1:1234/auth/callback?state=expected&code=code&client_id=oaiapp_test")!
        let parsed = try ChatGPTConnection.parseCallback(callback, state: "expected", clientID: nil)
        assert(parsed.clientID == "oaiapp_test")
        for url in [
            "http://127.0.0.1:1234/auth/callback?state=wrong&code=x&client_id=oaiapp_test",
            "http://127.0.0.1:1234/auth/callback?state=expected&code=x&client_id=dynamic_agent_client",
            "http://127.0.0.1:1234/auth/callback?state=expected&code=x&code=y&client_id=oaiapp_test",
            "http://127.0.0.1:1234/auth/callback?state=expected&error=access_denied&code=x",
            "http://localhost:1234/auth/callback?state=expected&code=x&client_id=oaiapp_test",
            "http://127.0.0.1:1234/callback?state=expected&code=x&client_id=oaiapp_test"
        ] { rejects { _ = try ChatGPTConnection.parseCallback(URL(string: url)!, state: "expected", clientID: nil) } }
        rejects { _ = try ChatGPTConnection.parseCallback(callback, state: "expected", clientID: "another-client") }
        let returning = URL(string: "http://127.0.0.1:42/auth/callback?state=s&code=c")!
        let result = try ChatGPTConnection.parseCallback(returning, state: "s", clientID: "saved-client")
        assert(result.clientID == "saved-client")
        let form = String(decoding: ChatGPTAPI.form(["token": "a+b &=c"]), as: UTF8.self)
        assert(form == "token=a%2Bb%20%26%3Dc")
        let identityOnly = try ChatGPTAPI.tokens(Data(#"{"access_token":"a","id_token":"i","token_type":"Bearer","expires_in":60,"scope":"openid email"}"#.utf8))
        assert(!identityOnly.sharing)
        let renewed = try ChatGPTAPI.tokens(Data(#"{"access_token":"b","token_type":"Bearer","expires_in":60}"#.utf8), previous: identityOnly)
        assert(renewed.idToken == "i" && !renewed.sharing)
        try identityValidation()
        try streamValidation()
        let session = LanguageModelSession(model: ChatGPTBodyTestModel(), instructions: "Translate faithfully")
        let response = try await session.respond(to: "Hello")
        assert(response.content == "checked")
        let unsupported = LanguageModelSession(model: ChatGPTBodyTestModel())
        do {
            _ = try await unsupported.respond(to: "Hello", options: .init(temperature: 0.5))
            fatalError("Silently dropped unsupported ChatGPT sampling")
        } catch { }
        try await refreshValidation()
        try await listenerValidation()
        print("ChatGPT callback validation, signed identity verification, SSE terminal errors, token rotation, refresh serialization, sign-out races, and loopback listener passed.")
    }

    static func identityValidation() throws {
        let privateKey = SecKeyCreateRandomKey([kSecAttrKeyType: kSecAttrKeyTypeRSA, kSecAttrKeySizeInBits: 2048] as CFDictionary, nil)!
        let publicKey = SecKeyCopyPublicKey(privateKey)!
        let publicDER = SecKeyCopyExternalRepresentation(publicKey, nil)! as Data
        // Parse Apple's PKCS#1 RSA public key solely to create the test JWKS.
        var offset = 0
        func readElement() -> Data {
            offset += 1
            var length = Int(publicDER[offset]); offset += 1
            if length & 0x80 != 0 {
                let count = length & 0x7f; length = 0
                for _ in 0..<count { length = length * 256 + Int(publicDER[offset]); offset += 1 }
            }
            let value = publicDER.subdata(in: offset..<offset + length)
            offset += length
            return value
        }
        // Skip the sequence header, then read the modulus and exponent.
        offset = 1
        let count = Int(publicDER[offset]); offset += 1
        if count & 0x80 != 0 { offset += count & 0x7f }
        let modulus = Data(readElement().drop(while: { $0 == 0 }))
        let exponent = readElement()
        let jwks = try JSONSerialization.data(withJSONObject: ["keys": [["kid": "test", "kty": "RSA", "alg": "RS256", "use": "sig",
            "n": modulus.base64URLEncoded, "e": exponent.base64URLEncoded]]])
        func token(_ claims: [String: Any], algorithm: String = "RS256") throws -> String {
            let header = try JSONSerialization.data(withJSONObject: ["alg": algorithm, "kid": "test"]).base64URLEncoded
            let payload = try JSONSerialization.data(withJSONObject: claims).base64URLEncoded
            let message = "\(header).\(payload)"
            let signature = SecKeyCreateSignature(privateKey, .rsaSignatureMessagePKCS1v15SHA256, Data(message.utf8) as CFData, nil)! as Data
            return message + "." + signature.base64URLEncoded
        }
        let valid: [String: Any] = ["iss": "https://auth.openai.com", "sub": "user", "aud": "client", "nonce": "nonce", "exp": Date().timeIntervalSince1970 + 3600]
        let signed = try token(valid)
        let identity = try ChatGPTIdentity.validate(signed, clientID: "client", nonce: "nonce", jwks: jwks)
        assert(identity.subject == "user")
        for (key, value) in [("iss", "https://attacker.invalid" as Any), ("aud", "wrong" as Any), ("nonce", "wrong" as Any), ("exp", 1 as Any), ("nbf", Date().timeIntervalSince1970 + 600 as Any)] {
            var invalid = valid; invalid[key] = value
            let signed = try token(invalid)
            rejects { _ = try ChatGPTIdentity.validate(signed, clientID: "client", nonce: "nonce", jwks: jwks) }
        }
        let none = try token(valid, algorithm: "none")
        rejects { _ = try ChatGPTIdentity.validate(none, clientID: "client", nonce: "nonce", jwks: jwks) }
        let parts = signed.split(separator: ".")
        let forged = "\(parts[0]).\(Data(#"{"sub":"attacker"}"#.utf8).base64URLEncoded).\(parts[2])"
        rejects { _ = try ChatGPTIdentity.validate(forged, clientID: "client", nonce: "nonce", jwks: jwks) }
    }

    static func streamValidation() throws {
        func event(_ json: String, parser: inout ChatGPTEventStream) throws {
            _ = try parser.feed("data: " + json)
            _ = try parser.feed("")
        }
        let delta = #"{"type":"response.output_text.delta","delta":"Hello"}"#
        let done = #"{"type":"response.completed","response":{"status":"completed","model":"example","output":[{"type":"message","content":[{"type":"output_text","text":"Hello"}]}],"usage":{"input_tokens":3,"output_tokens":1}}}"#
        var parser = ChatGPTEventStream()
        try event(delta, parser: &parser); try event(done, parser: &parser); try parser.finish()
        assert(parser.completed)
        var interrupted = ChatGPTEventStream(); try event(delta, parser: &interrupted)
        rejects { try interrupted.finish() }
        for terminal in [
            #"{"type":"response.failed","response":{"error":{"code":"subscription_sharing_usage_limit_exceeded"}}}"#,
            #"{"type":"response.incomplete","response":{"status":"incomplete"}}"#,
            #"{"type":"error","error":{"code":"invalid_token"}}"#,
            #"{"type":"response.refusal.delta","delta":"No"}"#
        ] {
            var parser = ChatGPTEventStream(); try event(delta, parser: &parser)
            rejects { try event(terminal, parser: &parser) }
            rejects { try parser.finish() }
        }
        var empty = ChatGPTEventStream(); rejects { try event(done, parser: &empty) }
    }

    static func refreshValidation() async throws {
        let memory = MemoryCredentials(), counter = RefreshCounter()
        let vault = ChatGPTCredentialVault(storage: memory.storage, refresh: { _, _, _ in try await counter.refresh() })
        let old = ChatGPTTokens(accessToken: "expired", refreshToken: "old-refresh", idToken: "id", scopes: ["chatgpt.tokens.use.direct"], expiresAt: .distantPast)
        try await vault.save(old, clientID: "client")
        async let first = vault.accessToken("client")
        async let second = vault.accessToken("client")
        let values = try await [first, second]
        let calls = await counter.calls
        assert(values == ["renewed", "renewed"] && calls == 1)
        let saved = try await vault.read("client")
        assert(saved.refreshToken == "rotated")
        try await vault.save(old, clientID: "client")
        let pending = Task { try await vault.accessToken("client") }
        try await Task.sleep(for: .milliseconds(10))
        try await vault.clear("client")
        do { _ = try await pending.value; fatalError("Refresh revived signed-out session") } catch { }
        do { _ = try await vault.read("client"); fatalError("Signed-out credentials remained") } catch { }
        let noGrant = ChatGPTTokens(accessToken: "a", refreshToken: "r", idToken: "i", scopes: ["openid"], expiresAt: .distantFuture)
        try await vault.save(noGrant, clientID: "client")
        do { _ = try await vault.accessToken("client"); fatalError("Identity-only login used for inference") } catch { }
    }

    static func listenerValidation() async throws {
        let listener = try ChatGPTCallbackListener(state: "secret-state")
        let redirect = try await listener.start()
        defer { listener.cancel() }
        assert(redirect.host == "127.0.0.1")
        let config = URLSessionConfiguration.ephemeral
        config.protocolClasses = []
        let session = URLSession(configuration: config)
        defer { session.invalidateAndCancel() }
        let bad = URL(string: redirect.absoluteString + "?state=wrong&code=x&client_id=client")!
        let (_, response) = try await session.data(from: bad)
        assert((response as? HTTPURLResponse)?.statusCode == 400)
        let good = URL(string: redirect.absoluteString + "?state=secret-state&code=x&client_id=client")!
        let (_, goodResponse) = try await session.data(from: good)
        assert((goodResponse as? HTTPURLResponse)?.statusCode == 200)
        let callback = try await listener.wait()
        let parsed = try ChatGPTConnection.parseCallback(callback, state: "secret-state", clientID: nil)
        assert(parsed.clientID == "client")
        let cancelled = try ChatGPTCallbackListener(state: "s")
        _ = try await cancelled.start()
        cancelled.cancel()
        do { _ = try await cancelled.wait(); fatalError("Cancelled listener returned success") } catch { }
    }
}


/// Exercises the real request serializer through FoundationModels without network or credentials.
@available(macOS 27.0, *)
nonisolated private struct ChatGPTBodyTestModel: LanguageModel {
    typealias Executor = ChatGPTBodyTestExecutor
    var capabilities: LanguageModelCapabilities { .init([]) }
    var executorConfiguration: Executor.Configuration { .init() }
}

@available(macOS 27.0, *)
nonisolated private struct ChatGPTBodyTestExecutor: LanguageModelExecutor {
    typealias Model = ChatGPTBodyTestModel
    struct Configuration: Hashable, Sendable { }
    init(configuration: Configuration) throws { }
    func respond(to request: LanguageModelExecutorGenerationRequest, model: Model,
                 streamingInto channel: LanguageModelExecutorGenerationChannel) async throws {
        let body = try ChatGPTExecutor.requestBody(request, modelID: "account-model")
        assert(body["model"] as? String == "account-model")
        assert(body["stream"] as? Bool == true && body["store"] as? Bool == false)
        assert(body["temperature"] == nil && body["previous_response_id"] == nil)
        let input = body["input"] as! [[String: Any]]
        assert(input.contains { $0["role"] as? String == "developer" && $0["content"] as? String == "Translate faithfully" })
        assert(input.last?["role"] as? String == "user" && input.last?["content"] as? String == "Hello")
        await channel.send(.response(action: .appendText("checked", tokenCount: 0)))
    }
}
