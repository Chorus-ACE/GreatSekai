import Foundation
import SekaiKit

@main
struct StoryTranslationTests {
    @MainActor static func main() throws {
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
        print("Story translation alignment and response validation passed")
    }
}
