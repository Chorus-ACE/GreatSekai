import Foundation
import FoundationModels

@available(macOS 27.0, *)
private struct ExampleTool: Tool {
    let name = "find_event"
    let description = "Find an event by ID"
    @Generable struct Arguments { var eventID: Int }
    func call(arguments: Arguments) async throws -> String { "event-\(arguments.eventID)" }
}

/// Intercepts all test requests; no credentials or prompts leave this process.
nonisolated private final class ModelMockProtocol: URLProtocol, @unchecked Sendable {
    nonisolated override class func canInit(with request: URLRequest) -> Bool { true }
    nonisolated override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }
    nonisolated override func stopLoading() {}
    nonisolated override func startLoading() {
        do {
            let bodyData: Data
            if let data = request.httpBody { bodyData = data }
            else if let stream = request.httpBodyStream {
                stream.open()
                defer { stream.close() }
                var data = Data()
                var buffer = [UInt8](repeating: 0, count: 1024)
                while stream.hasBytesAvailable {
                    let count = stream.read(&buffer, maxLength: buffer.count)
                    if count <= 0 { break }
                    data.append(contentsOf: buffer.prefix(count))
                }
                bodyData = data
            } else { throw ModelManagerError.invalidResponse }
            let body = try JSONSerialization.jsonObject(with: bodyData) as! [String: Any]
            let messages = body["messages"] as! [[String: Any]]
            let model = body["model"] as! String
            var status = 200
            var message: [String: Any] = ["content": "Hello"]
            var finish = "stop"
            if model == "http-error" { status = 401 }
            else if model == "empty" { message = ["content": NSNull()] }
            else if model == "tool-model" {
                if let output = messages.last, output["role"] as? String == "tool" {
                    assert(output["tool_call_id"] as? String == "call-event")
                    assert((output["content"] as? String)?.contains("event-42") == true)
                    message = ["content": "Found event 42"]
                } else {
                    let tools = body["tools"] as! [[String: Any]]
                    let function = tools[0]["function"] as! [String: Any]
                    let schema = function["parameters"] as! [String: Any]
                    assert(schema["type"] as? String == "object")
                    assert((schema["properties"] as? [String: Any])?["eventID"] != nil)
                    message = ["content": NSNull(), "tool_calls": [[
                        "id": "call-event", "type": "function",
                        "function": ["name": "find_event", "arguments": "{\"eventID\":42}"]
                    ]]]
                    finish = "tool_calls"
                }
            }
            let response: [String: Any] = ["model": model, "choices": [["message": message, "finish_reason": finish]],
                "usage": ["prompt_tokens": 12, "completion_tokens": 4]]
            client?.urlProtocol(self, didReceive: HTTPURLResponse(url: request.url!, statusCode: status,
                httpVersion: "HTTP/1.1", headerFields: ["Content-Type": "application/json"])!, cacheStoragePolicy: .notAllowed)
            client?.urlProtocol(self, didLoad: try JSONSerialization.data(withJSONObject: response))
            client?.urlProtocolDidFinishLoading(self)
        } catch { client?.urlProtocol(self, didFailWithError: error) }
    }
}

@main
struct LanguageModelTests {
    @MainActor static func main() async throws {
        guard #available(macOS 27.0, *) else { return }
        try await ChatGPTTests.run()
        let suite = "GreatSekai.ModelTests.\(UUID().uuidString)"
        let defaults = UserDefaults(suiteName: suite)!
        defer { defaults.removePersistentDomain(forName: suite) }
        let chatGPT = ChatGPTConnection(defaults: defaults)
        var keys: [String: String] = [:]
        let credentials = LanguageModelManager.Credentials(
            read: { keys[$0] ?? "" }, write: { keys[$0] = $1 }, delete: { keys.removeValue(forKey: $0) })
        let manager = LanguageModelManager(defaults: defaults, credentials: credentials, chatGPTConnection: chatGPT)
        assert(manager.entries.count == 2 && manager.selectedID == LanguageModelManager.systemID)
        do { try manager.delete(LanguageModelManager.systemID); fatalError("Deleted system model") } catch {}
        assert(manager.entries[1].id == LanguageModelManager.privateCloudID)
        assert(manager.entries[1].kind == .privateCloudCompute)
        for id in [LanguageModelManager.systemID, LanguageModelManager.privateCloudID] {
            do { try manager.delete(id); fatalError("Deleted a built-in model") } catch {}
            do { try manager.register(SystemLanguageModel.default, id: id, name: "Overwrite"); fatalError("Registered over a built-in model") } catch {}
            let protected = OnlineModelConfiguration(id: id, name: "Overwrite", baseURL: "https://models.example/v1", modelID: "test")
            do { try manager.save(protected, apiKey: ""); fatalError("Saved over a built-in model") } catch {}
        }
        try manager.select(LanguageModelManager.privateCloudID)
        assert(LanguageModelManager(defaults: defaults, credentials: credentials, chatGPTConnection: chatGPT).selectedID == LanguageModelManager.privateCloudID)
        let privateCloud = try manager.model()
        assert(privateCloud is PrivateCloudComputeLanguageModel)
        _ = LanguageModelSession(model: privateCloud)
        assert(manager.isAvailable(manager.entries[1]) == manager.privateCloudModel.isAvailable)
        try manager.select(LanguageModelManager.systemID)
        var configuration = OnlineModelConfiguration(name: "Test", baseURL: "https://models.example/v1/", modelID: "text-model")
        var protected = configuration; protected.id = LanguageModelManager.systemID
        do { try manager.save(protected, apiKey: ""); fatalError("Overwrote system model") } catch {}
        let endpoint = try configuration.endpoint()
        assert(endpoint.absoluteString == "https://models.example/v1/chat/completions")
        for url in ["http://example.com/v1", "https://user:pass@example.com", "https://example.com?key=secret", "https://example.com/v1/chat/completions"] {
            var invalid = configuration; invalid.baseURL = url
            do { _ = try invalid.validated(); fatalError("Accepted invalid URL") } catch {}
        }
        try manager.save(configuration, apiKey: "test-secret")
        try manager.select(configuration.id)
        let restored = LanguageModelManager(defaults: defaults, credentials: credentials, chatGPTConnection: chatGPT)
        assert(restored.selectedID == configuration.id && restored.onlineModels.count == 1)
        assert(!String(data: defaults.data(forKey: "LanguageModels.configurations.v1")!, encoding: .utf8)!.contains("test-secret"))
        configuration.name = "Renamed"
        try manager.save(configuration, apiKey: "new-secret")
        assert(manager.entries.count == 3 && manager.onlineModels[0].name == "Renamed")
        let failingStore = LanguageModelManager.Credentials(read: { _ in "" },
            write: { _, _ in throw ModelManagerError.keychain(-1) }, delete: { _ in throw ModelManagerError.keychain(-1) })
        let failingManager = LanguageModelManager(defaults: defaults, credentials: failingStore, chatGPTConnection: chatGPT)
        var failedUpdate = configuration; failedUpdate.name = "Must not save"
        do { try failingManager.save(failedUpdate, apiKey: ""); fatalError("Ignored credential failure") } catch {}
        do { try failingManager.delete(configuration.id); fatalError("Ignored credential deletion failure") } catch {}
        assert(failingManager.onlineModels[0].name == "Renamed")
        assert(LanguageModelManager(defaults: defaults, credentials: credentials, chatGPTConnection: chatGPT).onlineModels[0].name == "Renamed")

        // Proves that the existential returned by the manager can directly start a session.
        URLProtocol.registerClass(ModelMockProtocol.self)
        defer { URLProtocol.unregisterClass(ModelMockProtocol.self) }
        let model = try manager.model()
        let session = LanguageModelSession(model: model)
        let answer = try await session.respond(to: "Hello")
        assert(answer.content == "Hello")

        configuration.modelID = "tool-model"; configuration.supportsTools = true
        try manager.save(configuration, apiKey: "")
        let toolSession = try manager.makeSession(tools: [ExampleTool()])
        let toolAnswer = try await toolSession.respond(to: "Find event 42")
        assert(toolAnswer.content == "Found event 42")

        for modelID in ["http-error", "empty"] {
            configuration.modelID = modelID
            try manager.save(configuration, apiKey: "")
            let failingSession = try manager.makeSession()
            do { _ = try await failingSession.respond(to: "Hello"); fatalError("Invalid response was accepted") } catch {}
        }
        try manager.register(SystemLanguageModel.default, id: "another-provider", name: "Registered Model")
        let registered = try manager.model(for: "another-provider")
        _ = LanguageModelSession(model: registered)
        try manager.delete("another-provider")
        try manager.delete(configuration.id)
        assert(manager.selectedID == LanguageModelManager.systemID && manager.entries.count == 2)
        assert(keys[configuration.id] == nil)
        let corruptData = Data("corrupt".utf8)
        defaults.set(corruptData, forKey: "LanguageModels.configurations.v1")
        let corruptManager = LanguageModelManager(defaults: defaults, credentials: credentials, chatGPTConnection: chatGPT)
        assert(corruptManager.loadError != nil)
        do { try corruptManager.save(configuration, apiKey: ""); fatalError("Overwrote corrupt archive") } catch {}
        assert(defaults.data(forKey: "LanguageModels.configurations.v1") == corruptData)
        print("Model CRUD, persistence, credential separation, validation, direct sessions, tool round-trip, and response errors passed.")
    }
}
