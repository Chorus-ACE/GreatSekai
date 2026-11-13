import Foundation

/// Shared by the app and Widget extension. Art is cached before a widget timeline is requested.
nonisolated struct SavedCardCollection: Codable, Identifiable, Hashable, Sendable {
    var id = UUID()
    var name: String
    var cards: [SavedCard] = []
    var builtinKind: BuiltinCardCollectionKind? = nil
    var updatedAt: Date? = nil
    var isBuiltIn: Bool { builtinKind != nil }
}

nonisolated enum BuiltinCardCollectionKind: String, Codable, CaseIterable, Sendable {
    case worldLink
    case festivals
    case birthdayAnniversary

    var id: UUID {
        switch self {
        case .worldLink: UUID(uuidString: "F6C541A7-C858-4C9D-B4E7-000000000001")!
        case .festivals: UUID(uuidString: "F6C541A7-C858-4C9D-B4E7-000000000002")!
        case .birthdayAnniversary: UUID(uuidString: "F6C541A7-C858-4C9D-B4E7-000000000003")!
        }
    }

    var localizedName: String {
        switch self {
        case .worldLink: String(localized: "Collections.builtin.world-link")
        case .festivals: String(localized: "Collections.builtin.festivals")
        case .birthdayAnniversary: String(localized: "Collections.builtin.birthday-anniversary")
        }
    }
}

nonisolated enum BuiltinCardCollectionUpdates {
    static let interval: TimeInterval = 24 * 60 * 60

    /// Includes placeholders on first launch without replacing user collections.
    /// Fixed IDs keep Widget selections valid across refreshes and renames.
    static func seed(_ collections: [SavedCardCollection]) -> [SavedCardCollection] {
        collections.filter { !$0.isBuiltIn } + BuiltinCardCollectionKind.allCases.map { kind in
            var collection = collections.first { $0.builtinKind == kind }
                ?? SavedCardCollection(id: kind.id, name: kind.localizedName, builtinKind: kind)
            collection.id = kind.id
            collection.name = kind.localizedName
            return collection
        }
    }

    static func lastUpdate(in collections: [SavedCardCollection]) -> Date? {
        let dates = BuiltinCardCollectionKind.allCases.compactMap { kind in
            collections.first { $0.builtinKind == kind }?.updatedAt
        }
        guard dates.count == BuiltinCardCollectionKind.allCases.count else { return nil }
        return dates.min()
    }

    static func needsUpdate(_ collections: [SavedCardCollection], now: Date = .now) -> Bool {
        guard let lastUpdate = lastUpdate(in: collections) else { return true }
        let age = now.timeIntervalSince(lastUpdate)
        return age < 0 || age >= interval
    }

    /// Call only after a complete, fresh master-data load. All three snapshots
    /// and their timestamps are persisted together, preserving prior data on failure.
    static func applying(
        _ cards: [BuiltinCardCollectionKind: [SavedCard]],
        to collections: [SavedCardCollection], now: Date = .now
    ) -> [SavedCardCollection] {
        seed(collections).map { collection in
            guard let kind = collection.builtinKind else { return collection }
            var result = collection
            var ids = Set<String>()
            result.cards = (cards[kind] ?? []).filter { ids.insert($0.id).inserted }
                .sorted { ($0.cardID, $0.trained ? 1 : 0) < ($1.cardID, $1.trained ? 1 : 0) }
            result.updatedAt = now
            return result
        }
    }
}

nonisolated struct SavedCard: Codable, Identifiable, Hashable, Sendable {
    var id: String { "\(cardID)-\(trained ? "trained" : "normal")" }
    var cardID: Int
    var trained: Bool
    var title: String
    var imageURL: URL
    var imageFile: String { id + ".image" }
}

nonisolated enum CardCollectionStore {
    static let groupID = "group.com.qastor.GreatSekai.Widgets"
    static let widgetKind = "com.qastor.GreatSekai.CardCollection"
    static let directory: URL = {
        let manager = FileManager.default
        let local = manager.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
            .appendingPathComponent("GreatSekaiCollections", isDirectory: true)
        return storageDirectory(shared: manager.containerURL(forSecurityApplicationGroupIdentifier: groupID), local: local)
    }()
    static func storageDirectory(shared: URL?, local: URL) -> URL {
        guard let shared else { return local }
        #if DEBUG
        let manager = FileManager.default
        // Unsigned macOS builds can receive a container URL without permission to
        // use it. Keep development collections local when that container is unavailable.
        do {
            try manager.createDirectory(at: shared, withIntermediateDirectories: true)
            guard manager.isWritableFile(atPath: shared.path) else { return local }
        } catch { return local }
        #endif
        return shared
    }
    static var file: URL { directory.appendingPathComponent("Collections.plist") }
    static func load(from directory: URL = Self.directory) throws -> [SavedCardCollection] {
        let file = directory.appendingPathComponent("Collections.plist")
        guard FileManager.default.fileExists(atPath: file.path) else { return [] }
        return try PropertyListDecoder().decode([SavedCardCollection].self, from: Data(contentsOf: file))
    }
    static func save(_ collections: [SavedCardCollection], in directory: URL = Self.directory) throws {
        let file = directory.appendingPathComponent("Collections.plist")
        try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        let encoder = PropertyListEncoder()
        encoder.outputFormat = .binary
        try encoder.encode(collections).write(to: file, options: .atomic)
    }
    static func imageURL(for card: SavedCard) -> URL {
        directory.appendingPathComponent("Images", isDirectory: true).appendingPathComponent(card.imageFile)
    }
    static func cacheImage(_ data: Data, for card: SavedCard) throws {
        let path = imageURL(for: card)
        try FileManager.default.createDirectory(at: path.deletingLastPathComponent(), withIntermediateDirectories: true)
        try data.write(to: path, options: .atomic)
    }
}
