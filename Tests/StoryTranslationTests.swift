import Foundation
import FoundationModels
import SekaiKit

@available(macOS 27.0, *)
nonisolated private struct TranslationFixtureModel: LanguageModel {
    typealias Executor = TranslationFixtureExecutor
    var capabilities: LanguageModelCapabilities { .init([]) }
    var executorConfiguration: Executor.Configuration { .init() }
}

@available(macOS 27.0, *)
nonisolated private struct TranslationFixtureExecutor: LanguageModelExecutor {
    typealias Model = TranslationFixtureModel
    struct Configuration: Hashable, Sendable {}
    init(configuration: Configuration) {}
    func respond(to request: LanguageModelExecutorGenerationRequest, model: Model,
                 streamingInto channel: LanguageModelExecutorGenerationChannel) async throws {
        await channel.send(.response(action: .appendText(
            #"{"lines":[{"id":2,"speaker":"Ichika","text":"Hello from SEKAI"},{"id":8,"speaker":"","text":"Classroom"}]}"#,
            tokenCount: 0)))
    }
}

@available(macOS 27.0, *)
nonisolated private struct SummaryStreamFixtureModel: LanguageModel {
    typealias Executor = SummaryStreamFixtureExecutor
    var capabilities: LanguageModelCapabilities { .init([]) }
    var executorConfiguration: Executor.Configuration { .init() }
}
@available(macOS 27.0, *)
nonisolated private struct SummaryStreamFixtureExecutor: LanguageModelExecutor {
    typealias Model = SummaryStreamFixtureModel
    struct Configuration: Hashable, Sendable {}
    init(configuration: Configuration) {}
    func respond(to request: LanguageModelExecutorGenerationRequest, model: Model,
                 streamingInto channel: LanguageModelExecutorGenerationChannel) async throws {
        await channel.send(.response(action: .appendText("Ichika and Saki", tokenCount: 3)))
        try await Task.sleep(for: .milliseconds(20))
        await channel.send(.response(action: .appendText(" visit SEKAI.", tokenCount: 3)))
    }
}

@main
struct StoryTranslationTests {
    @MainActor static func main() async throws {
        func transcript(_ json: String) throws -> StoryTranscript {
            try JSONDecoder().decode(StoryTranscript.self, from: Data(json.utf8))
        }
        func rejects(_ operation: () throws -> Void) {
            do { try operation(); fatalError("Accepted an unsafe translation") } catch {}
        }
        let source = try transcript(#"{"lines":[{"id":2,"speaker":"一歌","text":"こんにちは","textKind":"dialogue","characterIDs":[1],"voiceURL":"https://jp.example/a.mp3"},{"id":8,"speaker":"","text":"教室","textKind":"caption"}]}"#)
        let official = try transcript(#"{"lines":[{"id":4,"speaker":"Ichika","text":"Hello","textKind":"dialogue","characterIDs":[1],"voiceURL":"https://en.example/a.mp3"},{"id":9,"speaker":"","text":"Classroom","textKind":"caption"}]}"#)
        let aligned = try StoryTranslation.align(source, with: official)
        assert(aligned[2]?.speaker == "Ichika" && aligned[2]?.text == "Hello")
        assert(aligned[8]?.text == "Classroom" && aligned[4] == nil)

        // Regional insertion: a unique voice still identifies the original line.
        let dialogue = try transcript(#"{"lines":[{"id":2,"speaker":"一歌","text":"こんにちは","textKind":"dialogue","characterIDs":[1],"voiceURL":"https://jp.example/a.mp3"}]}"#)
        let voiced = try StoryTranslation.align(dialogue, with: official)
        assert(voiced[2]?.text == "Hello")
        rejects { _ = try StoryTranslation.align(source, with: dialogue) }
        let ambiguous = try transcript(#"{"lines":[{"id":1,"speaker":"A","text":"One","voiceURL":"https://en.example/a.mp3"},{"id":2,"speaker":"B","text":"Two","voiceURL":"https://en.example/a.mp3"}]}"#)
        rejects { _ = try StoryTranslation.align(dialogue, with: ambiguous) }

        let valid = #"[{"id":8,"speaker":"","text":"Classroom"},{"id":2,"speaker":"Ichika","text":"Hello"}]"#
        let plain = try StoryTranslation.decode(valid, matching: source.lines)
        let fenced = try StoryTranslation.decode("```json\n" + valid + "\n```", matching: source.lines)
        assert(plain.count == 2 && fenced == plain)
        for invalid in ["Not JSON", "[]",
            #"[{"id":2,"speaker":"Ichika","text":"Hello"},{"id":2,"speaker":"","text":"Classroom"}]"#,
            #"[{"id":99,"speaker":"Ichika","text":"Hello"},{"id":8,"speaker":"","text":"Classroom"}]"#,
            #"[{"id":2,"speaker":"Ichika","text":" "},{"id":8,"speaker":"","text":"Classroom"}]"#] {
            rejects { _ = try StoryTranslation.decode(invalid, matching: source.lines) }
        }
        let episode = try JSONDecoder().decode(Episode.self, from: Data(#"{"episodeID":42,"parentID":1,"number":1,"title":"セカイへ","chapterTitle":"Chapter","scenarioID":"event_1_01","scenarioPath":"story.asset","locale":"jp","kind":"event"}"#.utf8))
        let directory = FileManager.default.temporaryDirectory.appending(path: UUID().uuidString)
        defer { try? FileManager.default.removeItem(at: directory) }
        let cache = AIOutputCache(root: directory.appending(path: "AIOutputs"))
        func request(target: SekaiLocale? = .en, modelID: String = "fixture", retryID: Int = 0,
                     transcript: StoryTranscript? = nil) -> StoryTranslation.Request {
            .init(episode: episode, transcript: transcript ?? source, target: target, alwaysUseModel: true,
                  modelID: modelID, configuration: nil, chatGPTProfile: nil, retryID: retryID)
        }
        let glossary = StoryAI.terminology(from: .jp, to: .en)
        for character in SekaiCache.preCache.characters {
            assert(glossary.contains(character.givenName[.jp]!))
            assert(glossary.contains(character.givenName[.en]!))
        }
        assert(SekaiCache.preCache.characters.count == 26)
        assert(glossary.contains("SEKAI"))
        assert(StoryAI.terminology(from: .jp, to: .cn).contains("「世界」"))
        assert(StoryTranslation.speaker(source.lines[0], to: .en) == "Ichika")
        assert(StoryTranslation.speaker(source.lines[1], to: .en) == "")
        let masked = try transcript(#"{"lines":[{"id":1,"speaker":"？？？","text":"Hello","characterIDs":[1]}]}"#)
        assert(StoryTranslation.speaker(masked.lines[0], to: .en) == nil)
        assert(StoryTranslation.normalizeTerm("「セカイ」とセカイ", to: .cn) == "「世界」と「世界」")
        let wrapped = try StoryTranslation.decode("{\"lines\":" + valid + "}", matching: source.lines)
        assert(wrapped == plain)

        var calls = 0
        let translator = StoryTranslation(cache: cache) { instructions, prompt in
            calls += 1
            assert(instructions.contains("一歌") && prompt.contains("contextBefore"))
            if calls == 1 { return "invalid" } // A malformed response must not poison the cache.
            return #"{"lines":[{"id":2,"speaker":"Wrong name","text":"セカイ"},{"id":8,"speaker":"Wrong caption speaker","text":"Classroom"}]}"#
        }
        await translator.load(request())
        assert(translator.error == nil && translator.lines.count == 2 && calls == 2)
        assert(translator.lines[2]?.speaker == "Ichika" && translator.lines[2]?.text == "SEKAI")
        assert(translator.lines[8]?.speaker == "")
        // A new controller represents reopening the story or relaunching the app.
        let reopened = StoryTranslation(cache: AIOutputCache(root: directory.appending(path: "AIOutputs"))) { _, _ in
            fatalError("A persisted translation should not call a model")
        }
        await reopened.load(request(retryID: 7))
        assert(reopened.lines == translator.lines && reopened.error == nil)
        assert(reopened.status == String(localized: "Story.ai.cached"))
        await translator.load(request(target: .cn))
        assert(calls == 3 && translator.lines[2]?.text == "「世界」")
        await translator.load(request(modelID: "another-model"))
        assert(calls == 4)
        let updated = try transcript(#"{"lines":[{"id":2,"speaker":"一歌","text":"Changed","characterIDs":[1]},{"id":8,"speaker":"","text":"教室"}]}"#)
        await translator.load(request(transcript: updated))
        assert(calls == 5)

        let manyLines = try transcript(String(decoding: JSONSerialization.data(withJSONObject: ["lines":
            (0..<35).map { ["id": $0, "speaker": "一歌", "text": "咲希とセカイへ行く。"] as [String: Any] }
        ]), as: UTF8.self))
        let contextPrompt = try StoryTranslation.prompt(manyLines, range: 4..<8, previous: [3: .init(id: 3, speaker: "Ichika", text: "Before")], episode: episode)
        assert(contextPrompt.contains("Before") && contextPrompt.contains("contextAfter"))
        var summaryCalls = 0
        let summary = StorySummary(cache: cache) { instructions, prompt in
            summaryCalls += 1
            assert(instructions.contains("一歌") && !prompt.isEmpty)
            return "Ichika and Saki visit セカイ."
        }
        await summary.load(request(transcript: manyLines))
        assert(summary.error == nil && summary.text == "Ichika and Saki visit SEKAI." && summaryCalls == 1)
        let count = summaryCalls
        await summary.load(request(retryID: 2, transcript: manyLines))
        assert(summaryCalls == count && summary.status == String(localized: "Story.ai.cached"))
        await summary.load(request(target: .cn, transcript: manyLines))
        assert(summaryCalls > count && summary.text?.contains("「世界」") == true)

        // A remote model summarizes a long script in a few bounded requests while
        // preserving every section, rather than requesting every 16 dialogue lines.
        let longSource = try transcript(String(decoding: JSONSerialization.data(withJSONObject: ["lines":
            (0..<600).map { ["id": $0, "speaker": "一歌", "text": "marker-\($0)-end 咲希とセカイへ行って、みんなと話しました。"] as [String: Any] }
        ]), as: UTF8.self))
        var summaryPrompts: [String] = []
        let fastSummary = StorySummary(cache: cache) { _, prompt in
            summaryPrompts.append(prompt)
            return "Everyone meets in SEKAI."
        }
        let remote = OnlineModelConfiguration(id: "summary-fixture", name: "Fixture", baseURL: "https://example.invalid/v1", modelID: "fixture")
        let fastRequest = StoryTranslation.Request(episode: episode, transcript: longSource, target: .en, alwaysUseModel: true,
                                                   modelID: remote.id, configuration: remote, chatGPTProfile: nil, retryID: 0)
        await fastSummary.load(fastRequest)
        assert(fastSummary.error == nil && fastSummary.text == "Everyone meets in SEKAI.")
        assert(summaryPrompts.count <= 10)
        assert((0..<600).allSatisfy { id in summaryPrompts.contains { $0.contains("marker-\(id)-end") } })
        let fastCalls = summaryPrompts.count
        await fastSummary.load(fastRequest)
        assert(summaryPrompts.count == fastCalls)
        print("Summary requests: 35-line script = 1; 600-line remote script = \(fastCalls), with every source line covered.")

        // Clearing AI outputs is reflected by existing cache readers as well.
        try AdvancedCacheFiles.remove([.aiOutputs], informationRoot: directory)
        await translator.load(request())
        assert(calls == 6)

        var pending: CheckedContinuation<String, Never>?
        let stale = StoryTranslation(cache: cache) { _, _ in
            await withCheckedContinuation { pending = $0 }
        }
        let oldLoad = Task { await stale.load(request(modelID: "slow")) }
        while pending == nil { await Task.yield() }
        await stale.load(request(target: nil))
        pending?.resume(returning: valid)
        await oldLoad.value
        assert(stale.lines.isEmpty && stale.error == nil && !stale.isLoading)
        var partialCalls = 0
        let partialSource = try transcript(String(decoding: JSONSerialization.data(withJSONObject: ["lines":
            (0..<12).map { ["id": $0, "speaker": "一歌", "text": "こんにちは"] as [String: Any] }
        ]), as: UTF8.self))
        let partialResponder: StoryAI.Responder = { _, prompt in
            partialCalls += 1
            if partialCalls == 2 { throw StoryTranslation.Failure.unavailable }
            let input = try JSONSerialization.jsonObject(with: Data(prompt.utf8)) as! [String: Any]
            let records = input["lines"] as! [[String: Any]]
            return try StoryAI.json(records.map { StoryTranslation.Text(id: $0["id"] as! Int, speaker: "Ichika", text: "Hello") })
        }
        let partial = StoryTranslation(cache: cache, responder: partialResponder)
        await partial.load(request(modelID: "partial", transcript: partialSource))
        assert(partial.error != nil && partial.lines.count == 8 && partialCalls == 3)
        assert(Set(partial.lines.keys) == Set(Array(0..<4) + Array(8..<12)))
        assert(partial.failedLineIDs == Set(4..<8) && !partial.isLoading)
        // A new controller must retry only the missing batch, even though filling it
        // changes the neighboring translation context of the already successful third batch.
        let partialReopened = StoryTranslation(cache: AIOutputCache(root: directory.appending(path: "AIOutputs")), responder: partialResponder)
        await partialReopened.load(request(modelID: "partial", retryID: 1, transcript: partialSource))
        assert(partialReopened.error == nil && partialReopened.lines.count == 12 && partialCalls == 4)
        assert(partialReopened.failedLineIDs.isEmpty)

        func response(to prompt: String) throws -> (Int, String) {
            let json = String(prompt.split(separator: "\n", maxSplits: 1)[0])
            let input = try JSONSerialization.jsonObject(with: Data(json.utf8)) as! [String: Any]
            let records = input["lines"] as! [[String: Any]]
            return (records[0]["id"] as! Int,
                    try StoryAI.json(records.map { StoryTranslation.Text(id: $0["id"] as! Int, speaker: "Ichika", text: "Hello") }))
        }
        var attempts: [Int] = []
        let invalid = StoryTranslation(cache: cache) { _, prompt in
            let (id, result) = try response(to: prompt)
            attempts.append(id)
            return id == 4 && attempts.filter({ $0 == 4 }).count <= 2 ? "invalid" : result
        }
        await invalid.load(request(modelID: "invalid-batch", transcript: partialSource))
        assert(attempts == [0, 4, 4, 8] && invalid.lines.count == 8)
        assert(invalid.failedLineIDs == Set(4..<8) && invalid.error != nil)
        await invalid.load(request(modelID: "invalid-batch", retryID: 1, transcript: partialSource))
        assert(attempts == [0, 4, 4, 8, 4] && invalid.lines.count == 12 && invalid.error == nil)

        var failedCalls = 0
        let allFailed = StoryTranslation(cache: cache) { _, _ in
            failedCalls += 1
            throw URLError(.badServerResponse)
        }
        await allFailed.load(request(modelID: "all-failed", transcript: partialSource))
        assert(failedCalls == 3 && allFailed.lines.isEmpty && allFailed.failedLineIDs == Set(0..<12))
        assert(allFailed.error != nil && !allFailed.isLoading)

        var cancelledCalls = 0
        var cancellationContinuation: CheckedContinuation<String, Never>?
        let cancelled = StoryTranslation(cache: cache) { _, _ in
            cancelledCalls += 1
            return await withCheckedContinuation { cancellationContinuation = $0 }
        }
        let cancelledLoad = Task { await cancelled.load(request(modelID: "cancelled", transcript: partialSource)) }
        while cancellationContinuation == nil { await Task.yield() }
        cancelledLoad.cancel()
        cancellationContinuation?.resume(returning: "")
        await cancelledLoad.value
        assert(cancelledCalls == 1 && cancelled.lines.isEmpty && cancelled.failedLineIDs.isEmpty)
        assert(cancelled.error == nil && !cancelled.isLoading)

        if #available(macOS 27.0, *) {
            let modelID = "translation-fixture-" + UUID().uuidString
            let manager = LanguageModelManager.shared
            let selectedID = manager.selectedID
            try manager.register(TranslationFixtureModel(), id: modelID, name: "Translation Fixture")
            defer { try? manager.delete(modelID) }
            let frameworkTranslation = StoryTranslation(cache: cache)
            await frameworkTranslation.load(request(modelID: modelID))
            assert(frameworkTranslation.error == nil && frameworkTranslation.lines[2]?.text == "Hello from SEKAI")
            assert(manager.selectedID == selectedID)
            let summaryModelID = "summary-stream-fixture-" + UUID().uuidString
            try manager.register(SummaryStreamFixtureModel(), id: summaryModelID, name: "Summary Stream Fixture")
            defer { try? manager.delete(summaryModelID) }
            let streamed = StorySummary(cache: cache)
            // The SDK may coalesce custom-executor deltas. Verify final assembly
            // through the real streaming API without depending on delivery timing.
            await streamed.load(request(modelID: summaryModelID))
            assert(streamed.error == nil && streamed.text == "Ichika and Saki visit SEKAI.")
        }
        if ProcessInfo.processInfo.environment["SEKAI_VERIFY_SYSTEM_MODEL"] == "1",
           #available(macOS 27.0, *) {
            if SystemLanguageModel.default.availability == .available {
                let live = StoryTranslation(cache: cache)
                await live.load(request(modelID: "system"))
                print("On-device model result: \(live.error ?? "success"); translated lines: \(live.lines.count)")
                assert(live.error == nil && live.lines.count == source.lines.count)
            } else { print("On-device model unavailable on this Mac; live check skipped") }
        }
        print("Story translation alignment, names, terminology, context, retries, persistent caches, invalidation, summaries, batch failure continuation/recovery, cancellation, and stale request checks passed")
    }
}
