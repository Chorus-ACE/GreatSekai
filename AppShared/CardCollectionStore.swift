import Foundation

/// Shared by the app and Widget extension. Art is cached before a widget timeline is requested.
nonisolated struct SavedCardCollection: Codable, Identifiable, Hashable, Sendable {
    var id = UUID()
    var name: String
    var cards: [SavedCard] = []
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
