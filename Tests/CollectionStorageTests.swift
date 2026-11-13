import Foundation

@main
struct CollectionStorageTests {
    static func main() throws {
        let directory = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        defer { try? FileManager.default.removeItem(at: directory) }
        let shared = directory.appendingPathComponent("Shared", isDirectory: true)
        let local = directory.appendingPathComponent("Local", isDirectory: true)
        assert(CardCollectionStore.storageDirectory(shared: nil, local: local) == local)
        assert(CardCollectionStore.storageDirectory(shared: shared, local: local) == shared)
        #if DEBUG
        // A URL may exist while being unusable as a container. This reproduces the
        // directory creation failure that the unsigned macOS app encountered.
        let blocked = directory.appendingPathComponent("Blocked")
        try Data("not a directory".utf8).write(to: blocked)
        assert(CardCollectionStore.storageDirectory(shared: blocked, local: local) == local)
        let fallback = CardCollectionStore.storageDirectory(shared: blocked, local: local)
        try CardCollectionStore.save([SavedCardCollection(name: "Fallback")], in: fallback)
        let fallbackLoaded = try CardCollectionStore.load(from: fallback)
        assert(fallbackLoaded.first?.name == "Fallback")
        #endif
        let card = SavedCard(cardID: 1, trained: false, title: "一歌", imageURL: URL(string: "https://example.com/normal.jpg")!)
        let trained = SavedCard(cardID: 1, trained: true, title: "一歌", imageURL: URL(string: "https://example.com/trained.jpg")!)
        let collection = SavedCardCollection(name: "测试收藏 🎵", cards: [card, trained])
        // Archives saved before dynamic collections have neither optional field.
        struct LegacyCollection: Codable { let id: UUID; let name: String; let cards: [SavedCard] }
        let legacy = try PropertyListEncoder().encode([LegacyCollection(id: collection.id, name: collection.name, cards: collection.cards)])
        let restoredLegacy = try PropertyListDecoder().decode([SavedCardCollection].self, from: legacy)
        assert(restoredLegacy == [collection] && !restoredLegacy[0].isBuiltIn)
        let seeded = BuiltinCardCollectionUpdates.seed(restoredLegacy)
        assert(seeded.count == 4 && seeded[0] == collection)
        assert(Set(seeded.dropFirst().map(\.id)).count == 3)
        assert(BuiltinCardCollectionUpdates.seed(seeded) == seeded)
        assert(BuiltinCardCollectionUpdates.needsUpdate(seeded))
        let updatedAt = Date(timeIntervalSince1970: 200000)
        let snapshots = BuiltinCardCollectionUpdates.applying([
            .worldLink: [trained, card, trained],
            .festivals: [trained],
            .birthdayAnniversary: [card],
        ], to: seeded, now: updatedAt)
        assert(snapshots[0] == collection)
        assert(snapshots.first { $0.builtinKind == .worldLink }?.cards == [card, trained])
        assert(snapshots.dropFirst().map(\.id) == seeded.dropFirst().map(\.id))
        assert(BuiltinCardCollectionUpdates.lastUpdate(in: snapshots) == updatedAt)
        assert(!BuiltinCardCollectionUpdates.needsUpdate(snapshots, now: updatedAt.addingTimeInterval(86399)))
        assert(BuiltinCardCollectionUpdates.needsUpdate(snapshots, now: updatedAt.addingTimeInterval(86400)))
        assert(BuiltinCardCollectionUpdates.needsUpdate(snapshots, now: updatedAt.addingTimeInterval(-1)))
        let refreshed = BuiltinCardCollectionUpdates.applying([.worldLink: [trained]], to: snapshots, now: updatedAt.addingTimeInterval(86400))
        assert(refreshed[0] == collection)
        assert(refreshed.first { $0.builtinKind == .worldLink }?.cards == [trained])
        assert(refreshed.first { $0.builtinKind == .festivals }?.cards.isEmpty == true)
        let builtinDirectory = directory.appendingPathComponent("Builtins")
        try CardCollectionStore.save(snapshots, in: builtinDirectory)
        let storedSnapshots = try CardCollectionStore.load(from: builtinDirectory)
        assert(storedSnapshots == snapshots)
        assert(card.id != trained.id)
        let empty = try CardCollectionStore.load(from: directory); assert(empty.isEmpty)
        try CardCollectionStore.save([collection], in: directory)
        let loaded = try CardCollectionStore.load(from: directory); assert(loaded == [collection])
        var renamed = collection; renamed.name = "New name"; renamed.cards.reverse()
        try CardCollectionStore.save([renamed], in: directory)
        let updated = try CardCollectionStore.load(from: directory); assert(updated == [renamed])
        try Data("corrupted".utf8).write(to: directory.appendingPathComponent("Collections.plist"))
        do { _ = try CardCollectionStore.load(from: directory); fatalError("Corruption was silently accepted") } catch { }
        // Specifiers must identify one app/version pair unambiguously.
        var allSpecifiers = Set<String>()
        for (app, versions) in versionSpecifiers {
            for (version, specifiers) in versions {
                assert(specifiers.count == 20)
                for specifier in specifiers {
                    assert(specifier.utf8.count == 3 && specifier.utf8.allSatisfy { (65...90).contains($0) })
                    assert(allSpecifiers.insert(specifier).inserted)
                    let sample = String(specifier.prefix(1)) + "!payload" + specifier.suffix(2)
                    assert(determineCollectionCodeFormat(sample) == .init(app: app, version: version))
                    assert(determineCollectionCodeFormat(sample.lowercased()) == .init(app: app, version: version))
                }
            }
        }
        // Fixtures were generated with Greatdori's original implementation.
        // Its payload stays compatible while its app identity prevents import.
        let greatdoriFixtures: [(String, String)] = [
            ("", #"b"`wz41}&fS"#),
            ("Greatdori fixture", #"L$,zASI4L#HrxPN,R>[Hn.48JQLvH,UQXA9%]sL"#),
        ]
        for (name, code) in greatdoriFixtures {
            let info = CollectionEncodingInfo(name: name, cardList: [-1, 1, 100, -100])
            assert(encodeCollection(info, app: .greatdori) == code)
            assert(determineCollectionCodeFormat(code) == .init(app: .greatdori, version: .timbre))
            for prefix in ["", "GreatSekai:", "Greatdori:"] {
                assert(decodeCollectionResult(prefix + code) == .failure(.wrongApp(.greatdori)))
                assert(decodeCollection(prefix + code) == nil)
            }
            var corrupted = Array(code)
            corrupted[2] = corrupted[2] == "X" ? "Y" : "X"
            assert(decodeCollectionResult(String(corrupted)) == .failure(.invalidCode))
        }
        for cards in [[], [1], [-1, 1, 100, -100], Array(1...1000)] {
            let info = CollectionEncodingInfo(name: "测试收藏 🎵", cardList: cards)
            let code = encodeCollection(info)
            assert(determineCollectionCodeFormat(code) == .init(app: .greatsekai, version: .timbre))
            let decoded = decodeCollection(code)
            assert(decoded?.name == info.name)
            assert(decoded?.cardList.sorted() == info.cardList.sorted())
            assert(decodeCollection("GreatSekai:" + encodeCollection(info)) == decoded)
            assert(decodeCollection("Greatdori:" + code) == decoded)
        }
        // Hidden names remain absent from the payload; the decoder supplies the
        // caller's localized fallback without changing the code or card variants.
        for cards in [[1], [-1, 1, 100, -100], Array(1...1000)] {
            let info = CollectionEncodingInfo(name: "", cardList: cards)
            let code = encodeCollection(info)
            assert(decodeCollection(code)?.name == "")
            let decoded = decodeCollection(code, defaultName: "收藏集")
            assert(decoded?.name == "收藏集")
            assert(decoded?.cardList.sorted() == cards.sorted())
            assert(decodeCollection("GreatSekai:" + code, defaultName: "收藏集") == decoded)
            assert(decodeCollection(" \nGreatSekai: " + code + "\n ", defaultName: "收藏集") == decoded)
            assert(encodeCollection(.init(name: "", cardList: cards.reversed())) == code)
            assert(encodeCollection(.init(name: "", cardList: cards + cards)) == code)
            var url = URLComponents()
            url.scheme = "greatsekai"; url.host = "collections"
            url.queryItems = [URLQueryItem(name: "code", value: "GreatSekai:" + code)]
            let recovered = URLComponents(url: url.url!, resolvingAgainstBaseURL: false)?.queryItems?.first { $0.name == "code" }?.value
            assert(recovered == "GreatSekai:" + code)
            assert(recovered.flatMap { decodeCollection($0, defaultName: "收藏集") } == decoded)
        }
        let namedCode = encodeCollection(.init(name: "自定义名称", cardList: [1, -1]))
        assert(decodeCollection(namedCode, defaultName: "收藏集")?.name == "自定义名称")
        for input in ["", "H\u{0}abcND", "H😀abcND", String(repeating: "!", count: 32001)] { assert(decodeCollection(input) == nil) }
        for input in ["GreatSekai:", "GreatSekai:not-a-code", "GreatSekai:" + String(repeating: "!", count: 32001)] {
            assert(decodeCollection(input) == nil)
        }
        for _ in 0..<1500 {
            let input = String((0..<Int.random(in: 0...300)).map { _ in Character(UnicodeScalar(Int.random(in: 0...126))!) })
            _ = decodeCollection(input)
        }
        print("Collection persistence, app/version identification, cross-app rejection, Unicode code round-trips, variants and 1500 malformed inputs passed.")
    }
}
