import Foundation
import FoundationModels

/// Chat Completions adapter. Text and optional function calling only; unsupported
/// modalities and generation controls fail explicitly instead of losing context.
@available(iOS 27.0, macOS 27.0, *)
nonisolated struct OpenAICompatibleModel: LanguageModel {
    typealias Executor = OpenAICompatibleExecutor
    let configuration: OnlineModelConfiguration
    let apiKey: String

    var capabilities: LanguageModelCapabilities {
        LanguageModelCapabilities(configuration.supportsTools ? [.toolCalling] : [])
    }

    var executorConfiguration: Executor.Configuration {
        .init(connection: configuration, apiKey: apiKey)
    }
}

@available(iOS 27.0, macOS 27.0, *)
nonisolated struct OpenAICompatibleExecutor: LanguageModelExecutor {
    typealias Model = OpenAICompatibleModel
    struct Configuration: Hashable, Sendable {
        let connection: OnlineModelConfiguration
        let apiKey: String
    }
    let configuration: Configuration

    init(configuration: Configuration) throws { self.configuration = configuration }

    func respond(to request: LanguageModelExecutorGenerationRequest, model: Model,
                 streamingInto channel: LanguageModelExecutorGenerationChannel) async throws {
        let body = try Self.requestBody(request, model: model)
        var urlRequest = URLRequest(url: try model.configuration.endpoint())
        urlRequest.httpMethod = "POST"
        urlRequest.timeoutInterval = 90
        urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")
        if !model.apiKey.isEmpty { urlRequest.setValue("Bearer \(model.apiKey)", forHTTPHeaderField: "Authorization") }
        urlRequest.httpBody = try JSONSerialization.data(withJSONObject: body)
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        try Task.checkCancellation()
        guard let response = response as? HTTPURLResponse else { throw ModelManagerError.invalidResponse }
        // Do not display arbitrary server response bodies, which can echo credentials.
        guard (200..<300).contains(response.statusCode) else { throw ModelManagerError.httpStatus(response.statusCode) }
        let result = try JSONDecoder().decode(Completion.self, from: data)
        guard let choice = result.choices.first else { throw ModelManagerError.invalidResponse }
        let calls = choice.message.tool_calls ?? []
        if choice.finish_reason == "length" { throw ModelManagerError.invalidResponse }
        if choice.finish_reason == "content_filter" || choice.message.refusal != nil {
            throw LanguageModelError.refusal(.init(explanation: String(localized: "Settings.models.error.refusal"),
                                                   debugDescription: "The provider refused the request."))
        }
        guard !(choice.message.content ?? "").isEmpty || !calls.isEmpty else { throw ModelManagerError.invalidResponse }
        let names = Set(request.enabledToolDefinitions.map(\.name))
        let mode = request.generationOptions.toolCallingMode ?? .allowed
        guard calls.isEmpty || (model.configuration.supportsTools && mode != .disallowed) else {
            throw ModelManagerError.invalidResponse
        }
        guard mode != .required || !calls.isEmpty else { throw ModelManagerError.invalidResponse }
        guard Set(calls.map(\.id)).count == calls.count else { throw ModelManagerError.invalidResponse }
        for call in calls {
            guard call.type == "function", !call.id.isEmpty, names.contains(call.function.name),
                  (try? JSONSerialization.jsonObject(with: Data(call.function.arguments.utf8))) is [String: Any] else {
                throw ModelManagerError.invalidResponse
            }
        }
        await channel.send(.response(action: .updateMetadata(["modelID": result.model ?? model.configuration.modelID])))
        if let usage = result.usage {
            await channel.send(.response(action: .updateUsage(
                input: .init(totalTokenCount: usage.prompt_tokens, cachedTokenCount: 0),
                output: .init(totalTokenCount: usage.completion_tokens, reasoningTokenCount: 0))))
        }
        if let text = choice.message.content, !text.isEmpty {
            await channel.send(.response(action: .appendText(text, tokenCount: 0)))
        }
        // Buffered completions are forwarded through the framework's generation channel.
        // The provider's call IDs must be preserved for the following tool-result messages.
        for call in calls {
            await channel.send(.toolCalls(action: .toolCall(id: call.id, name: call.function.name,
                action: .appendArguments(call.function.arguments, tokenCount: 0))))
        }
    }

    static func requestBody(_ request: LanguageModelExecutorGenerationRequest, model: Model) throws -> [String: Any] {
        if request.schema != nil {
            throw LanguageModelError.unsupportedCapability(.init(capability: .guidedGeneration,
                debugDescription: "This adapter does not support guided generation."))
        }
        if request.contextOptions.reasoningLevel != nil { throw ModelManagerError.unsupportedOptions }
        var messages: [[String: Any]] = []
        for entry in request.transcript {
            switch entry {
            case .instructions(let item): messages.append(["role": "system", "content": try text(item.segments)])
            case .prompt(let item): messages.append(["role": "user", "content": try text(item.segments)])
            case .response(let item): messages.append(["role": "assistant", "content": try text(item.segments)])
            case .toolCalls(let items):
                messages.append(["role": "assistant", "tool_calls": items.map { item in
                    ["id": item.id, "type": "function", "function":
                        ["name": item.toolName, "arguments": item.arguments.jsonString]] as [String: Any]
                }])
            case .toolOutput(let item):
                messages.append(["role": "tool", "tool_call_id": item.id, "content": try text(item.segments)])
            default: throw ModelManagerError.unsupportedContent
            }
        }
        var body: [String: Any] = ["model": model.configuration.modelID, "messages": messages, "stream": false]
        let options = request.generationOptions
        if let temperature = options.temperature { body["temperature"] = temperature }
        if let sampling = options.samplingMode {
            switch sampling.kind {
            case .greedy: body["temperature"] = 0
            case .randomProbabilityThreshold(let threshold, let seed):
                body["top_p"] = threshold
                if let seed { body["seed"] = seed }
            case .randomTopK: throw ModelManagerError.unsupportedOptions
            @unknown default: throw ModelManagerError.unsupportedOptions
            }
        }
        if let maxTokens = options.maximumResponseTokens { body["max_completion_tokens"] = maxTokens }
        let tools = request.enabledToolDefinitions
        let mode = options.toolCallingMode ?? .allowed
        if !tools.isEmpty {
            guard model.configuration.supportsTools else {
                throw LanguageModelError.unsupportedCapability(.init(capability: .toolCalling,
                    debugDescription: "Tool calling is disabled for this model."))
            }
            body["tools"] = try tools.map { tool -> [String: Any] in
                let schema = try JSONSerialization.jsonObject(with: JSONEncoder().encode(tool.parameters))
                return ["type": "function", "function": ["name": tool.name, "description": tool.description, "parameters": schema]]
            }
            switch mode.kind {
            case .allowed: body["tool_choice"] = "auto"
            case .required: body["tool_choice"] = "required"
            case .disallowed: body["tool_choice"] = "none"
            @unknown default: throw ModelManagerError.unsupportedOptions
            }
        } else if mode == .required { throw ModelManagerError.unsupportedOptions }
        return body
    }

    private static func text(_ segments: [Transcript.Segment]) throws -> String {
        try segments.map { segment in
            switch segment {
            case .text(let value): value.content
            case .structure(let value): value.content.jsonString
            default: throw ModelManagerError.unsupportedContent
            }
        }.joined(separator: "\n")
    }

    private struct Completion: Decodable {
        let model: String?
        let choices: [Choice]
        let usage: Usage?
        struct Choice: Decodable {
            let message: Message
            let finish_reason: String?
        }
        struct Message: Decodable {
            let content: String?
            let refusal: String?
            let tool_calls: [Call]?
        }
        struct Call: Decodable {
            let id: String
            let type: String
            let function: Function
            struct Function: Decodable { let name: String; let arguments: String }
        }
        struct Usage: Decodable { let prompt_tokens: Int; let completion_tokens: Int }
    }
}
