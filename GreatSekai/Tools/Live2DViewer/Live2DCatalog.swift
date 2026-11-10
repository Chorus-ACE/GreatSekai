import Astray
import Foundation

struct Live2DCatalog: Sendable {
    struct Model: Identifiable, Hashable, Sendable {
        let id: String
        let directory: String
        let file: String
        let motionBase: String?
        let motions: [String]
        let character2DID: Int?
        let characterID: Int?
        var unit: String? = nil
    }
    struct Animations: Sendable {
        var motions: [String]
        var expressions: [String]
    }
    let root: URL
    let models: [Model]

    static func load() async throws -> Self {
        let roots = ["https://sekai-assets-haruki.seiunx.net/jp-assets/",
                     "https://sekai-assets-cn03-she01-cdn.haruki.seiunx.com/jp-assets/"]
        var lastError: Error = URLError(.cannotLoadFromNetwork)
        for value in roots {
            do {
                let root = URL(string: value)!
                async let index = StoryAssetCache.shared.data(at: root.appending(path: "story-player/index.json"), revalidate: true)
                async let characters = StoryAssetCache.shared.data(at: URL(string: "https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/main/character2ds.json")!, revalidate: true)
                return try await decode(index: index, characters: characters, root: root)
            } catch {
                try Task.checkCancellation()
                lastError = error
            }
        }
        throw lastError
    }

    static func decode(index: Data, characters: Data, root: URL) throws -> Self {
        struct Index: Decodable {
            struct Entry: Decodable { let dir: String; let model3: String; let motionBase: String?; let motions: [String]? }
            let models: [String: Entry]
        }
        struct Character: Decodable { let id: Int; let assetName: String?; let characterId: Int?; let characterType: String?; let unit: String? }
        let rows = try JSONDecoder().decode([Character].self, from: characters).sorted {
            let lhs = $0.assetName?.count ?? 0, rhs = $1.assetName?.count ?? 0
            return lhs == rhs ? $0.id < $1.id : lhs > rhs
        }
        let index = try JSONDecoder().decode(Index.self, from: index)
        let models = index.models.sorted { $0.key < $1.key }.map { key, value in
            let matches = rows.filter {
                guard let name = $0.assetName, !name.isEmpty else { return false }
                return key == name || key.hasPrefix(name + "_")
            }
            // Virtual Singers share asset-name prefixes across SEKAI; model suffixes
            // distinguish those variants before choosing a character2ds record.
            let singerUnits = ["band": "light_sound", "idol": "idol", "street": "street",
                               "wonder": "theme_park", "night": "school_refusal", "normal": "piapro"]
            let singerUnit = matches.first.flatMap { character -> String? in
                guard let id = character.characterId, (21...26).contains(id), let prefix = character.assetName else { return nil }
                let suffix = key.dropFirst(prefix.count).split(separator: "_").first.map(String.init) ?? ""
                return singerUnits.first { suffix == $0.key || suffix == $0.key + "black" }?.value
            }
            let character = matches.first { singerUnit == nil || $0.unit == singerUnit } ?? matches.first
            return Model(id: key, directory: value.dir, file: value.model3, motionBase: value.motionBase,
                         motions: value.motions ?? [], character2DID: character?.id,
                         characterID: character?.characterType == "game_character" ? character?.characterId : nil, unit: character?.unit)
        }
        return .init(root: root, models: models)
    }

    /// Original bundle listings provide the authoritative base-motion/expression names.
    /// Astray resolves the corresponding converted motion3 JSON at the selected root.
    func animations(for model: Model) async throws -> Animations {
        var motions = Set(model.motions)
        var expressions = Set<String>()
        if let base = model.motionBase, !base.isEmpty {
            var components = base.split(separator: "/").map(String.init)
            if let first = components.first, ["startapp", "ondemand"].contains(first) { components.removeFirst() }
            let prefix = components.joined(separator: "/") + "/"
            var token: String?
            for _ in 0..<20 {
                var url = URLComponents(string: "https://storage.sekai.best/sekai-jp-assets/")!
                url.queryItems = [.init(name: "list-type", value: "2"), .init(name: "max-keys", value: "1000"),
                                  .init(name: "prefix", value: prefix)]
                if let token { url.queryItems?.append(.init(name: "continuation-token", value: token)) }
                let data = try await StoryAssetCache.shared.data(at: url.url!)
                let listing = Live2DListingDelegate()
                let parser = XMLParser(data: data)
                parser.delegate = listing
                guard parser.parse(), listing.rootIsValid else { throw URLError(.cannotParseResponse) }
                for key in listing.keys where key.hasPrefix(prefix) {
                    let relative = String(key.dropFirst(prefix.count))
                    let parts = relative.split(separator: "/")
                    guard parts.count == 2, parts[1].hasSuffix(".asset") else { continue }
                    let name = String(parts[1].dropLast(".asset".count))
                    if parts[0] == "motion" { motions.insert(name) }
                    if parts[0] == "facial" { expressions.insert(name) }
                }
                if !listing.truncated { return .init(motions: motions.sorted(), expressions: expressions.sorted()) }
                guard let next = listing.nextToken, next != token else { throw URLError(.cannotParseResponse) }
                token = next
            }
            throw URLError(.dataLengthExceedsMaximum)
        }
        return .init(motions: motions.sorted(), expressions: expressions.sorted())
    }
}

nonisolated private final class Live2DListingDelegate: NSObject, XMLParserDelegate {
    var keys: [String] = []
    var nextToken: String?
    var truncated = false
    var hasTruncationFlag = false
    var rootIsValid = false
    private var value = ""
    func parser(_ parser: XMLParser, didStartElement elementName: String, namespaceURI: String?, qualifiedName qName: String?, attributes: [String: String]) {
        if elementName == "ListBucketResult" { rootIsValid = true }
        value = ""
    }
    func parser(_ parser: XMLParser, foundCharacters string: String) { value += string }
    func parser(_ parser: XMLParser, didEndElement elementName: String, namespaceURI: String?, qualifiedName qName: String?) {
        switch elementName {
        case "Key": keys.append(value)
        case "NextContinuationToken": nextToken = value
        case "IsTruncated":
            let flag = value.trimmingCharacters(in: .whitespacesAndNewlines)
            hasTruncationFlag = flag == "true" || flag == "false"
            truncated = flag == "true"
        default: break
        }
        value = ""
    }
}

/// Enumerate the extracted Japanese game's whole scenario-background directory,
/// rather than deriving a partial list from the stories the user has opened.
struct Live2DBackgroundCatalog: Sendable {
    struct Background: Identifiable, Hashable, Sendable {
        let path: String
        var id: String { (path as NSString).deletingPathExtension }
        var name: String { ((path as NSString).lastPathComponent as NSString).deletingPathExtension }
        var url: URL { URL(string: "https://storage.sekai.best/sekai-jp-assets/")!.appending(path: path) }
    }
    let backgrounds: [Background]
    static let customSelection = "custom"
    static let customPrefix = "custom:"
    static let defaultBackgroundID = "scenario/background/bg_f000904/bg_f000904"

    /// Resolve a complete image URL, a catalog path, or a game background identifier.
    static func backgroundURL(for input: String, catalog: Self? = nil) -> URL? {
        let input = input.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !input.isEmpty else { return nil }
        if let url = URL(string: input), let scheme = url.scheme {
            guard ["http", "https"].contains(scheme.lowercased()), url.host?.isEmpty == false else { return nil }
            return url
        }
        if let background = catalog?.backgrounds.first(where: { $0.id == input || $0.name == input || $0.path == input }) {
            return background.url
        }
        let path: String
        if input.range(of: #"^[A-Za-z0-9_-]+$"#, options: .regularExpression) != nil {
            path = "scenario/background/\(input)/\(input).webp"
        } else {
            let components = input.split(separator: "/", omittingEmptySubsequences: false)
            guard components.count >= 4, components[0] == "scenario", components[1] == "background",
                  components.allSatisfy({ $0.range(of: #"^[A-Za-z0-9_.-]+$"#, options: .regularExpression) != nil && $0 != "." && $0 != ".." }) else { return nil }
            let ext = (input as NSString).pathExtension.lowercased()
            guard ext.isEmpty || ["webp", "png", "jpg", "jpeg"].contains(ext) else { return nil }
            path = input + (ext.isEmpty ? ".webp" : "")
        }
        return URL(string: "https://storage.sekai.best/sekai-jp-assets/")!.appending(path: path)
    }

    static func load(fetch: @Sendable (URL) async throws -> Data = {
        try await StoryAssetCache.shared.data(at: $0, revalidate: true)
    }) async throws -> Self {
        let prefix = "scenario/background/"
        var token: String?
        var seenTokens = Set<String>()
        var images: [String: Background] = [:]
        let extensions = ["png", "jpg", "jpeg", "webp"]
        while true {
            try Task.checkCancellation()
            var url = URLComponents(string: "https://storage.sekai.best/sekai-jp-assets/")!
            url.queryItems = [.init(name: "list-type", value: "2"), .init(name: "max-keys", value: "1000"),
                              .init(name: "prefix", value: prefix)]
            if let token { url.queryItems?.append(.init(name: "continuation-token", value: token)) }
            let data = try await fetch(url.url!)
            try Task.checkCancellation()
            let listing = Live2DListingDelegate()
            let parser = XMLParser(data: data)
            parser.delegate = listing
            guard parser.parse(), listing.rootIsValid, listing.hasTruncationFlag else { throw URLError(.cannotParseResponse) }
            for key in listing.keys where key.hasPrefix(prefix) {
                let parts = key.split(separator: "/", omittingEmptySubsequences: false)
                guard parts.allSatisfy({ !$0.isEmpty && $0 != "." && $0 != ".." && !$0.contains("\\") }),
                      let priority = extensions.firstIndex(of: (key as NSString).pathExtension.lowercased()) else { continue }
                let item = Background(path: key)
                if let existing = images[item.id],
                   let existingPriority = extensions.firstIndex(of: (existing.path as NSString).pathExtension.lowercased()),
                   existingPriority <= priority { continue }
                images[item.id] = item
            }
            if !listing.truncated {
                return .init(backgrounds: images.values.sorted { $0.id < $1.id })
            }
            guard let next = listing.nextToken, !next.isEmpty, seenTokens.insert(next).inserted else {
                throw URLError(.cannotParseResponse)
            }
            token = next
        }
    }
}
