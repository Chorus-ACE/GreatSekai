import Foundation
import SekaiKit

nonisolated struct CollectionCardMetadataRequest: Hashable, Sendable {
    let namespace: String
    let ids: Set<Int>
}

/// One decoded card list per source/locale configuration, shared by every row.
actor CardCollectionMetadataCache {
    static let shared = CardCollectionMetadataCache()

    nonisolated static var namespace: String {
        [SekaiProtobuf.baseURL.absoluteString, SekaiLocale.primaryLocale.rawValue, SekaiLocale.secondaryLocale.rawValue].joined(separator: "|")
    }

    private struct Entry {
        let cards: [Int: Card]
        let date: Date
        let revision = UUID()
    }
    private var entries: [String: Entry] = [:]
    private var pending: [String: Task<[Int: Card]?, Never>] = [:]
    private let lifetime: TimeInterval
    private let loader: @Sendable (Bool) async -> [Card]?

    init(lifetime: TimeInterval = 24 * 60 * 60, loader: @escaping @Sendable (Bool) async -> [Card]? = { fresh in
        await Card.allWithCache(trait: fresh ? .realTime : .invocationElidable)
    }) {
        self.lifetime = lifetime
        self.loader = loader
    }

    func store(_ cards: [Card], namespace: String) {
        entries[namespace] = Entry(cards: Dictionary(cards.map { ($0.id, $0) }, uniquingKeysWith: { first, _ in first }), date: .now)
    }

    func load(_ request: CollectionCardMetadataRequest) async -> [Int: Card]? {
        guard !request.ids.isEmpty else { return [:] }
        let cached = entries[request.namespace]
        let age = cached.map { Date.now.timeIntervalSince($0.date) }
        let fresh = age.map { $0 >= 0 && $0 < lifetime } ?? false
        if let cached, fresh, request.ids.isSubset(of: cached.cards.keys) { return cached.cards }
        let cards = await fetch(namespace: request.namespace, fresh: cached != nil)
        if let cards, !request.ids.isSubset(of: cards.keys) {
            return await fetch(namespace: request.namespace, fresh: true) ?? cards
        }
        return cards ?? cached?.cards
    }

    private func fetch(namespace: String, fresh: Bool) async -> [Int: Card]? {
        if let task = pending[namespace] { return await task.value }
        let revision = entries[namespace]?.revision
        let task = Task {
            defer { pending[namespace] = nil }
            let loaded = await loader(fresh)
            // A daily refresh may have supplied newer data while a disk read
            // was pending. Never replace that snapshot with the older result.
            if entries[namespace]?.revision == revision, let loaded { store(loaded, namespace: namespace) }
            return entries[namespace]?.cards
        }
        pending[namespace] = task
        return await task.value
    }
}
