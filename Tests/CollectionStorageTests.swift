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
        assert(card.id != trained.id)
        let empty = try CardCollectionStore.load(from: directory); assert(empty.isEmpty)
        try CardCollectionStore.save([collection], in: directory)
        let loaded = try CardCollectionStore.load(from: directory); assert(loaded == [collection])
        var renamed = collection; renamed.name = "New name"; renamed.cards.reverse()
        try CardCollectionStore.save([renamed], in: directory)
        let updated = try CardCollectionStore.load(from: directory); assert(updated == [renamed])
        try Data("corrupted".utf8).write(to: directory.appendingPathComponent("Collections.plist"))
        do { _ = try CardCollectionStore.load(from: directory); fatalError("Corruption was silently accepted") } catch { }
        for cards in [[], [1], [-1, 1, 100, -100], Array(1...1000)] {
            let info = CollectionEncodingInfo(name: "测试收藏 🎵", cardList: cards)
            let decoded = decodeCollection(encodeCollection(info))
            assert(decoded?.name == info.name)
            assert(decoded?.cardList.sorted() == info.cardList.sorted())
        }
        for input in ["", "H\u{0}abcND", "H😀abcND", String(repeating: "!", count: 32001)] { assert(decodeCollection(input) == nil) }
        for _ in 0..<1500 {
            let input = String((0..<Int.random(in: 0...300)).map { _ in Character(UnicodeScalar(Int.random(in: 0...126))!) })
            _ = decodeCollection(input)
        }
        print("Collection persistence, corruption handling, Unicode code round-trips, variants and 1500 malformed inputs passed.")
    }
}
