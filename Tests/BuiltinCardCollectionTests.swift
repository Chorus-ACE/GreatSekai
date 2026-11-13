import Foundation
import SekaiKit

private actor MetadataProbe {
    let cached: [Card]?
    let fresh: [Card]?
    private var calls = 0
    private var freshCalls = 0
    init(cached: [Card]?, fresh: [Card]? = nil) { self.cached = cached; self.fresh = fresh ?? cached }
    func load(fresh: Bool) async -> [Card]? {
        calls += 1
        if fresh { freshCalls += 1 }
        try? await Task.sleep(for: .milliseconds(15))
        return fresh ? self.fresh : cached
    }
    func snapshot() -> (calls: Int, fresh: Int) { (calls, freshCalls) }
}

private actor MetadataGate {
    private var started = false
    private var startedWaiter: CheckedContinuation<Void, Never>?
    private var resultWaiter: CheckedContinuation<[Card]?, Never>?
    func load() async -> [Card]? {
        started = true
        startedWaiter?.resume(); startedWaiter = nil
        return await withCheckedContinuation { resultWaiter = $0 }
    }
    func waitUntilStarted() async {
        if started { return }
        await withCheckedContinuation { startedWaiter = $0 }
    }
    func release(_ cards: [Card]) { resultWaiter?.resume(returning: cards); resultWaiter = nil }
}

@main
struct BuiltinCardCollectionTests {
    static func main() async throws {
        assert(BuiltinCardCollections.kind(sourceType: .unitEventLimited, rarity: .four) == .worldLink)
        assert(BuiltinCardCollections.kind(sourceType: .bloomFestivalLimited, rarity: .four) == .festivals)
        assert(BuiltinCardCollections.kind(sourceType: .colorfulFestivalLimited, rarity: .four) == .festivals)
        assert(BuiltinCardCollections.kind(sourceType: .birthday, rarity: .birthday) == .birthdayAnniversary)
        assert(BuiltinCardCollections.kind(sourceType: .normal, rarity: .birthday) == .birthdayAnniversary)
        for source in [Card.SourceType.normal, .termLimited, .collaborationLimited] {
            assert(BuiltinCardCollections.kind(sourceType: source, rarity: .four) == nil)
        }
        if let fixtures = ProcessInfo.processInfo.environment["SEKAI_PROTOBUF_TEST_DATA"] {
            let root = URL(fileURLWithPath: fixtures, isDirectory: true)
            guard let cards = await SekaiProtobuf.$baseURL.withValue(root, operation: { await Card.allInLocale(.jp) }) else {
                fatalError("Could not load the local card.aar fixture")
            }
            let generated = BuiltinCardCollections.generate(from: cards)
            let lookup = Dictionary(uniqueKeysWithValues: cards.map { ($0.id, $0) })
            for kind in BuiltinCardCollectionKind.allCases {
                let saved = generated[kind] ?? []
                assert(!saved.isEmpty)
                assert(Set(saved.map(\.id)).count == saved.count)
                for image in saved {
                    let card = lookup[image.cardID]!
                    assert(BuiltinCardCollections.kind(sourceType: card.sourceType, rarity: card.rarity) == kind)
                    assert(image.imageURL == (image.trained ? card.afterTrainingArtURL : card.beforeTrainingArtURL))
                    assert(!image.trained || card.canTrain)
                    assert(image.trained || !card.isInitiallySpecialTrained || card.afterTrainingArtURL == nil)
                }
                print("\(kind.rawValue): \(saved.count) card images from local JP master data")
            }
            let festivals = generated[.festivals]!.compactMap { lookup[$0.cardID]?.sourceType }
            assert(festivals.contains(.bloomFestivalLimited) && festivals.contains(.colorfulFestivalLimited))
            await verifyMetadataCache(Array(cards.prefix(10)))
        }
        print("Built-in classification, both festival types, birthday/anniversary grouping and artwork variants passed.")
    }

    private static func verifyMetadataCache(_ cards: [Card]) async {
        assert(cards.count >= 2)
        let request = CollectionCardMetadataRequest(namespace: "source-a|jp|en", ids: Set(cards.map(\.id)))
        let probe = MetadataProbe(cached: cards)
        let cache = CardCollectionMetadataCache(loader: { await probe.load(fresh: $0) })
        await withTaskGroup(of: [Int: Card]?.self) { group in
            for _ in 0..<100 { group.addTask { await cache.load(request) } }
            for await result in group { assert(result?.count == cards.count) }
        }
        for _ in 0..<100 {
            let result = await cache.load(request)
            assert(result?[cards[0].id] == cards[0])
        }
        var counts = await probe.snapshot()
        assert(counts.calls == 1, "Scrolling and repeated rows must reuse one decoded table")
        let otherSource = CollectionCardMetadataRequest(namespace: "source-b|jp|en", ids: request.ids)
        _ = await cache.load(otherSource)
        let otherLocale = CollectionCardMetadataRequest(namespace: "source-a|en|jp", ids: request.ids)
        _ = await cache.load(otherLocale)
        counts = await probe.snapshot(); assert(counts.calls == 3)
        _ = await cache.load(.init(namespace: "empty", ids: []))
        counts = await probe.snapshot(); assert(counts.calls == 3)

        let incomplete = MetadataProbe(cached: [cards[0]], fresh: cards)
        let refreshing = CardCollectionMetadataCache(loader: { await incomplete.load(fresh: $0) })
        let refreshed = await refreshing.load(request)
        assert(refreshed?[cards[1].id] == cards[1])
        counts = await incomplete.snapshot(); assert(counts.calls == 2 && counts.fresh == 1)
        let expiring = CardCollectionMetadataCache(lifetime: 0, loader: { await incomplete.load(fresh: $0) })
        _ = await expiring.load(.init(namespace: "expired", ids: [cards[0].id]))
        _ = await expiring.load(.init(namespace: "expired", ids: [cards[0].id]))
        counts = await incomplete.snapshot(); assert(counts.calls == 4 && counts.fresh == 2)

        let failed = MetadataProbe(cached: nil)
        let retrying = CardCollectionMetadataCache(loader: { await failed.load(fresh: $0) })
        let firstFailure = await retrying.load(request)
        let retry = await retrying.load(request)
        assert(firstFailure == nil && retry == nil)
        counts = await failed.snapshot(); assert(counts.calls == 2)

        let gate = MetadataGate()
        let updating = CardCollectionMetadataCache(loader: { _ in await gate.load() })
        let reading = Task { await updating.load(.init(namespace: "shared", ids: [cards[0].id])) }
        await gate.waitUntilStarted()
        await updating.store(cards, namespace: "shared")
        await gate.release([cards[0]])
        let newest = await reading.value
        assert(newest?.count == cards.count, "A daily refresh must win over an older in-flight disk read")
        print("200 metadata requests shared one load; source/locale isolation, expiry, missing-ID refresh, retry and update races passed.")
    }
}
