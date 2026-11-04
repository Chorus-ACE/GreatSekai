import Astray
import Foundation

@main
struct StoryPlaybackDocumentTests {
    static func main() throws {
        let japanese = Scenario(
            id: "jp",
            initialBGM: "jp-bgm",
            snippets: [
                .init(action: .specialEffect, referenceIndex: 0),
                .init(action: .talk, referenceIndex: 0),
                .init(action: .none),
                .init(action: .talk, referenceIndex: 1),
                .init(action: .talk, referenceIndex: 0),
                .init(action: .specialEffect, referenceIndex: 1),
                .init(action: .none)
            ],
            talks: [
                .init(
                    characters: [.init(characterID: 21)],
                    speaker: "ミク",
                    body: "こんにちは",
                    voices: [.init(voiceID: "jp-voice")]
                ),
                .init(speaker: "リン", body: "はい")
            ],
            effects: [.init(type: 1, value: "jp-background"), .init(type: 8, value: "セカイ")]
        )
        var regional = japanese
        regional.id = "cn"
        regional.initialBGM = "cn-bgm"
        regional.talks[0].speaker = "未来"
        regional.talks[0].body = "你好"
        regional.talks[0].voices = []
        regional.effects[0].value = "cn-background"
        regional.effects[1].value = "世界"
        regional.snippets.insert(.init(action: .none), at: 0)
        regional.snippets.insert(.init(action: .none), at: 5)
        let document = try StoryPlaybackDocument(japanese: japanese, regional: regional)
        precondition(document.scenario.id == japanese.id)
        precondition(document.scenario.initialBGM == japanese.initialBGM)
        precondition(document.scenario.talks[0].speaker == "未来")
        precondition(document.scenario.talks[0].body == "你好")
        precondition(document.scenario.talks[0].voices == japanese.talks[0].voices)
        precondition(document.scenario.effects[0].value == "jp-background")
        precondition(document.scenario.effects[1].value == "世界")
        precondition(japanese.talks[0].body == "こんにちは")
        precondition((0..<7).map(document.lineID) == [nil, 2, 2, 4, 6, 7, 7])
        precondition(document.snippetIndex(for: 2) == 1)
        precondition(document.snippetIndex(for: 6) == 4)
        precondition(document.snippetIndex(for: 7) == 5)
        precondition(document.snippetIndex(for: 100) == nil)
        precondition(document.lineID(at: -1) == nil)
        precondition(document.lineID(at: 7) == nil)
        
        let original = try StoryPlaybackDocument(japanese: japanese, regional: japanese)
        precondition((0..<7).map(original.lineID) == [nil, 1, 1, 3, 4, 5, 5])
        for mutation: (inout Scenario) -> Void in [
            { $0.talks.append(.init(body: "Extra")) },
            { $0.snippets[2].referenceIndex = 1 },
            { $0.talks[0].characters[0].characterID = 22 },
            { $0.effects[0].type = 2 }
        ] {
            var mismatched = regional
            mutation(&mismatched)
            do {
                _ = try StoryPlaybackDocument(japanese: japanese, regional: mismatched)
                preconditionFailure("Mismatched regional scripts must be rejected.")
            } catch let error as StoryPlaybackDocument.PlaybackError {
                precondition(error.key == "Story.player.regional-mismatch")
            }
        }
        
        var unmatchedCaption = regional
        unmatchedCaption.snippets.remove(at: 7)
        let unmatched = try StoryPlaybackDocument(japanese: japanese, regional: unmatchedCaption)
        precondition(unmatched.lineID(at: 5) == nil)
        precondition(unmatched.lineID(at: 6) == nil)
        print("Story playback checks passed: regional text, Japanese assets, mismatch rejection, repeated dialogue, staging, captions, and jumps.")
    }
}
