import Astray
import Foundation

struct StoryPlaybackDocument {
    let scenario: Scenario
    private let lineIDs: [Int?]
    
    init(japanese: Scenario, regional: Scenario) throws {
        try japanese.validate()
        try regional.validate()
        guard japanese.talks.count == regional.talks.count,
              japanese.snippets.filter({ $0.action == .talk }).map(\.referenceIndex)
                == regional.snippets.filter({ $0.action == .talk }).map(\.referenceIndex),
              zip(japanese.talks, regional.talks).allSatisfy({
                  $0.characters.map(\.characterID) == $1.characters.map(\.characterID)
              }),
              japanese.effects.map(\.type) == regional.effects.map(\.type) else {
            throw PlaybackError(key: "Story.player.regional-mismatch")
        }
        var scenario = japanese
        for index in scenario.talks.indices {
            scenario.talks[index].speaker = regional.talks[index].speaker
            scenario.talks[index].body = regional.talks[index].body
        }
        for index in scenario.effects.indices where [8, 18, 23, 24].contains(scenario.effects[index].type) {
            scenario.effects[index].value = regional.effects[index].value
        }
        self.scenario = scenario
        
        // Regions can insert staging snippets. Match repeated references by occurrence.
        var positions: [SnippetReference: [Int]] = [:]
        for (index, snippet) in regional.snippets.enumerated() {
            positions[.init(snippet), default: []].append(index)
        }
        var occurrences: [SnippetReference: Int] = [:]
        var currentLineID: Int?
        lineIDs = japanese.snippets.map { snippet in
            let reference = SnippetReference(snippet)
            let occurrence = occurrences[reference, default: 0]
            occurrences[reference] = occurrence + 1
            let isText: Bool
            switch snippet.action {
            case .talk:
                isText = !scenario.talks[snippet.referenceIndex].body.isEmpty
            case .specialEffect:
                let effect = scenario.effects[snippet.referenceIndex]
                isText = [8, 18, 24, 38].contains(effect.type) && !effect.value.isEmpty
            default:
                isText = false
            }
            if isText {
                let matches = positions[reference, default: []]
                currentLineID = matches.indices.contains(occurrence) ? matches[occurrence] : nil
            }
            return currentLineID
        }
    }
    
    func lineID(at snippetIndex: Int) -> Int? {
        lineIDs.indices.contains(snippetIndex) ? lineIDs[snippetIndex] : nil
    }
    
    func snippetIndex(for lineID: Int) -> Int? {
        lineIDs.firstIndex { $0 == lineID }
    }
    
    struct PlaybackError: LocalizedError {
        let key: String
        var errorDescription: String? { NSLocalizedString(key, comment: "") }
    }
    
    private struct SnippetReference: Hashable {
        let action: Int
        let referenceIndex: Int
        
        init(_ snippet: ScenarioSnippet) {
            action = snippet.action.rawValue
            referenceIndex = snippet.referenceIndex
        }
    }
}
