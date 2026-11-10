import Astray
import SekaiKit
import Foundation

extension StoryPlaybackDocument {
    static func resolve(_ episode: Episode, in locale: SekaiLocale) async throws -> Episode {
        if episode.locale == locale { return episode }
        let episodes = await Episode.all(in: locale, kind: episode.kind)
        try Task.checkCancellation()
        guard let match = episodes?.first(where: {
            $0.episodeID == episode.episodeID && $0.parentID == episode.parentID
        }) else {
            throw PlaybackError(key: locale == .jp ? "Story.player.no-jp" : "Story.player.no-region")
        }
        return match
    }
    
    static func scenario(_ episode: Episode) async throws -> Scenario {
        guard let url = episode.scenarioURL else { throw URLError(.badURL) }
        let data = try await StoryAssetCache.shared.data(at: url, revalidate: true)
        try Task.checkCancellation()
        do {
            guard let object = try JSONSerialization.jsonObject(with: data) as? [String: Any],
                  object["Snippets"] is [Any], object["TalkData"] is [Any],
                  object["SpecialEffectData"] is [Any] else {
                throw PlaybackError(key: "Story.player.invalid-script")
            }
            return try Scenario.decode(data)
        } catch {
            throw PlaybackError(key: "Story.player.invalid-script")
        }
    }
    
    static func load(for episode: Episode, textLocale: SekaiLocale) async throws -> Self {
        let japaneseEpisode = try await resolve(episode, in: .jp)
        let japanese = try await scenario(japaneseEpisode)
        let regional: Scenario
        if textLocale == .jp {
            regional = japanese
        } else {
            let regionalEpisode = try await resolve(episode, in: textLocale)
            regional = try await scenario(regionalEpisode)
        }
        return try .init(japanese: japanese, regional: regional)
    }
    
    func assetResolver() async throws -> HarukiAssetResolver {
        let roots = [
            URL(string: "https://sekai-assets-haruki.seiunx.net/jp-assets/")!,
            URL(string: "https://sekai-assets-cn03-she01-cdn.haruki.seiunx.com/jp-assets/")!
        ]
        var lastError: Error = URLError(.cannotLoadFromNetwork)
        for root in roots {
            do {
                return try await .init(baseURL: root, scenario: scenario)
            } catch {
                try Task.checkCancellation()
                lastError = error
            }
        }
        throw lastError
    }
}
