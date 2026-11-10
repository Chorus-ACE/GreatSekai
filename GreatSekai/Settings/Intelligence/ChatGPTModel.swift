import Foundation
import FoundationModels

/// ChatGPT plan access is scoped to this fixed public Responses endpoint.
/// It cannot send OAuth credentials to a user-supplied OpenAI-compatible host.
@available(iOS 27.0, macOS 27.0, *)
nonisolated struct ChatGPTModel: LanguageModel {
    typealias Executor = ChatGPTExecutor
    let clientID: String
    let modelID: String
    let credentialVault: ChatGPTCredentialVault
    let session: URLSession

    init(clientID: String, modelID: String, credentialVault: ChatGPTCredentialVault = .shared,
         session: URLSession = ChatGPTAPI.session) {
        self.clientID = clientID
        self.modelID = modelID
        self.credentialVault = credentialVault
        self.session = session
    }

    var capabilities: LanguageModelCapabilities { .init([]) }
    var executorConfiguration: Executor.Configuration { .init(clientID: clientID, modelID: modelID) }
}

@available(iOS 27.0, macOS 27.0, *)
nonisolated struct ChatGPTExecutor: LanguageModelExecutor {
    typealias Model = ChatGPTModel
    struct Configuration: Hashable, Sendable { let clientID: String; let modelID: String }
    let configuration: Configuration
    init(configuration: Configuration) throws { self.configuration = configuration }

    func respond(to request: LanguageModelExecutorGenerationRequest, model: Model,
                 streamingInto channel: LanguageModelExecutorGenerationChannel) async throws {
        let body = try Self.requestBody(request, modelID: model.modelID)
        let token = try await model.credentialVault.accessToken(model.clientID)
        var urlRequest = URLRequest(url: URL(string: ChatGPTAPI.resource + "/responses")!)
        urlRequest.httpMethod = "POST"
        urlRequest.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")
        urlRequest.setValue("text/event-stream", forHTTPHeaderField: "Accept")
        urlRequest.httpBody = try JSONSerialization.data(withJSONObject: body)
        let (bytes, response) = try await model.session.bytes(for: urlRequest)
        defer { bytes.task.cancel() }
        if let http = response as? HTTPURLResponse, !(200..<300).contains(http.statusCode) {
            var data = Data()
            for try await byte in bytes {
                try Task.checkCancellation()
                guard data.count < 64 * 1024 else { break }
                data.append(byte)
            }
            try ChatGPTAPI.check(response, data: data)
        }
        try ChatGPTAPI.check(response)
        var parser = ChatGPTEventStream()
        // AsyncBytes.lines discards empty lines, which are significant SSE event boundaries.
        for try await byte in bytes {
            try Task.checkCancellation()
            if let event = try parser.feed(byte: byte) {
                switch event {
                case .text(let text): await channel.send(.response(action: .appendText(text, tokenCount: 0)))
                case .completed(let modelID, let input, let output, let cached, let reasoning):
                    await channel.send(.response(action: .updateMetadata(["modelID": modelID ?? model.modelID])))
                    if let input, let output {
                        await channel.send(.response(action: .updateUsage(
                            input: .init(totalTokenCount: input, cachedTokenCount: cached),
                            output: .init(totalTokenCount: output, reasoningTokenCount: reasoning))))
                    }
                    try parser.finish()
                    return
                }
            }
        }
        try parser.finish()
    }

    static func requestBody(_ request: LanguageModelExecutorGenerationRequest, modelID: String) throws -> [String: Any] {
        guard request.schema == nil else {
            throw LanguageModelError.unsupportedCapability(.init(capability: .guidedGeneration,
                debugDescription: "ChatGPT guided generation is not supported by this adapter."))
        }
        guard request.enabledToolDefinitions.isEmpty, request.generationOptions.toolCallingMode != .required else {
            throw LanguageModelError.unsupportedCapability(.init(capability: .toolCalling,
                debugDescription: "ChatGPT tool calling is not supported by this adapter."))
        }
        let options = request.generationOptions
        // This route rejects sampling and max_output_tokens; never silently drop a caller's controls.
        guard options.temperature == nil, options.samplingMode == nil, options.maximumResponseTokens == nil,
              request.contextOptions.reasoningLevel == nil else { throw ModelManagerError.unsupportedOptions }
        var input: [[String: Any]] = []
        for entry in request.transcript {
            switch entry {
            case .instructions(let item): input.append(["role": "developer", "content": try text(item.segments)])
            case .prompt(let item): input.append(["role": "user", "content": try text(item.segments)])
            case .response(let item): input.append(["role": "assistant", "content": try text(item.segments)])
            default: throw ModelManagerError.unsupportedContent
            }
        }
        return ["model": modelID, "input": input, "store": false, "stream": true]
    }
    private static func text(_ segments: [Transcript.Segment]) throws -> String {
        try segments.map { segment in
            switch segment {
            case .text(let text): text.content
            case .structure(let structure): structure.content.jsonString
            default: throw ModelManagerError.unsupportedContent
            }
        }.joined(separator: "\n")
    }
}

/// SSE parsing is separate so interrupted streams and late plan-limit failures are testable.
nonisolated struct ChatGPTEventStream {
    enum Event {
        case text(String)
        case completed(String?, Int?, Int?, Int, Int)
    }
    private var dataLines: [String] = []
    private var byteCount = 0
    private(set) var completed = false
    private var hasText = false
    private var lineBytes = Data()
    private var skipLineFeed = false
    private var firstLine = true

    /// Preserve blank lines, fragmented UTF-8 and all three SSE line endings.
    mutating func feed(byte: UInt8) throws -> Event? {
        if skipLineFeed {
            skipLineFeed = false
            if byte == 0x0a { return nil }
        }
        if byte == 0x0a || byte == 0x0d {
            skipLineFeed = byte == 0x0d
            guard var line = String(data: lineBytes, encoding: .utf8) else { throw ChatGPTError.stream }
            lineBytes.removeAll(keepingCapacity: true)
            if firstLine {
                firstLine = false
                if line.first == "\u{feff}" { line.removeFirst() }
            }
            return try feed(line)
        }
        guard lineBytes.count < 4 * 1024 * 1024 else { throw ChatGPTError.stream }
        lineBytes.append(byte)
        return nil
    }

    mutating func feed(_ line: String) throws -> Event? {
        if line.isEmpty {
            guard !dataLines.isEmpty else { return nil }
            let data = Data(dataLines.joined(separator: "\n").utf8)
            dataLines = []; byteCount = 0
            if String(decoding: data, as: UTF8.self) == "[DONE]" { return nil }
            guard let root = try JSONSerialization.jsonObject(with: data) as? [String: Any],
                  let type = root["type"] as? String else { throw ChatGPTError.stream }
            guard !completed else { throw ChatGPTError.stream }
            switch type {
            case "response.output_text.delta":
                guard let delta = root["delta"] as? String else { throw ChatGPTError.stream }
                if !delta.isEmpty { hasText = true }
                return .text(delta)
            case "response.refusal.delta", "response.refusal.done": throw ChatGPTError.stream
            case "response.failed", "response.incomplete", "error":
                let response = root["response"] as? [String: Any] ?? root
                let data = try JSONSerialization.data(withJSONObject: response)
                throw ChatGPTError.inference(ChatGPTAPI.safeCode(data))
            case "response.completed":
                guard let response = root["response"] as? [String: Any], response["status"] as? String == "completed",
                      hasText, let items = response["output"] as? [[String: Any]],
                      items.allSatisfy({ item in
                          let type = item["type"] as? String
                          return type == "reasoning" || (type == "message" &&
                              (item["content"] as? [[String: Any]])?.allSatisfy { $0["type"] as? String == "output_text" } == true)
                      }) else { throw ChatGPTError.stream }
                completed = true
                let usage = response["usage"] as? [String: Any]
                return .completed(response["model"] as? String, usage?["input_tokens"] as? Int, usage?["output_tokens"] as? Int,
                    (usage?["input_tokens_details"] as? [String: Any])?["cached_tokens"] as? Int ?? 0,
                    (usage?["output_tokens_details"] as? [String: Any])?["reasoning_tokens"] as? Int ?? 0)
            default: return nil
            }
        }
        if line.hasPrefix("data:") {
            let value = line.dropFirst(5)
            let data = String(value.first == " " ? value.dropFirst() : value)
            byteCount += data.utf8.count
            guard byteCount < 4 * 1024 * 1024 else { throw ChatGPTError.stream }
            dataLines.append(data)
        }
        return nil
    }
    func finish() throws {
        guard completed, dataLines.isEmpty, lineBytes.isEmpty else { throw ChatGPTError.stream }
    }
}
