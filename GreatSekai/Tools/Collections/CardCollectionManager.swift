import Combine
import ImageIO
import UniformTypeIdentifiers
import Foundation
import SekaiKit
import WidgetKit
import SwiftUI

@MainActor
final class CardCollectionManager: ObservableObject {
    static let shared = CardCollectionManager()
    @Published private(set) var collections: [SavedCardCollection] = []
    @Published var error: String?
    @Published private(set) var isUpdatingBuiltins = false
    @Published private(set) var builtinUpdateError: String?
    var userCollections: [SavedCardCollection] { collections.filter { !$0.isBuiltIn } }
    var builtinCollections: [SavedCardCollection] { collections.filter(\.isBuiltIn) }
    var lastBuiltinUpdate: Date? { BuiltinCardCollectionUpdates.lastUpdate(in: collections) }
    private var builtinUpdateTask: Task<Void, Never>?
    private var storageAvailable = true
    private var imageCacheTasks: [String: Task<Bool, Error>] = [:]
    private var backgroundCacheTask: Task<Void, Never>?
    private var backgroundCacheQueue: [SavedCard] = []
    private var backgroundCacheIDs = Set<String>()
    private var nextBackgroundImage = 0

    private init() {
        do {
            let loaded = try CardCollectionStore.load()
            collections = BuiltinCardCollectionUpdates.seed(loaded)
            if collections != loaded { persist(collections) }
        }
        catch { self.error = error.localizedDescription; storageAvailable = false }
    }
    @discardableResult
    func save(_ collection: SavedCardCollection) -> Bool {
        guard !collection.isBuiltIn, collections.first(where: { $0.id == collection.id })?.isBuiltIn != true else { return false }
        var updated = collections
        if let index = updated.firstIndex(where: { $0.id == collection.id }) { updated[index] = collection }
        else { updated.append(collection) }
        return persist(updated)
    }
    func remove(_ id: UUID) {
        guard collections.first(where: { $0.id == id })?.isBuiltIn != true else { return }
        persist(collections.filter { $0.id != id })
    }

    func duplicate(_ collection: SavedCardCollection) {
        let names = Set(collections.map(\.name))
        var suffix = 2
        var name = collection.name
        while names.contains(name) { name = "\(collection.name) \(suffix)"; suffix += 1 }
        save(SavedCardCollection(name: name, cards: collection.cards))
    }

    func moveUserCollections(from offsets: IndexSet, to destination: Int) {
        var users = userCollections
        users.move(fromOffsets: offsets, toOffset: destination)
        persist(users + builtinCollections)
    }

    func updateBuiltinCollections(force: Bool = false) async {
        if let builtinUpdateTask { await builtinUpdateTask.value; return }
        guard storageAvailable else { builtinUpdateError = error; return }
        let seeded = BuiltinCardCollectionUpdates.seed(collections)
        if seeded != collections, !persist(seeded) { builtinUpdateError = error; return }
        guard force || BuiltinCardCollectionUpdates.needsUpdate(collections) else { return }
        isUpdatingBuiltins = true
        builtinUpdateError = nil
        let metadataNamespace = CardCollectionMetadataCache.namespace
        let task = Task {
            // all() revalidates the Protobuf source; allWithCache() may return a
            // stale fallback, which must not advance the daily refresh timestamp.
            guard let cards = await Card.all(), !cards.isEmpty else {
                builtinUpdateError = String(localized: "Collections.builtin.update-failed")
                return
            }
            if metadataNamespace == CardCollectionMetadataCache.namespace {
                await CardCollectionMetadataCache.shared.store(cards, namespace: metadataNamespace)
            }
            let generated = BuiltinCardCollections.generate(from: cards)
            let updated = BuiltinCardCollectionUpdates.applying(generated, to: collections)
            if persist(updated) {
                cacheInBackground(generated.values.flatMap { $0 })
            } else { builtinUpdateError = error }
        }
        builtinUpdateTask = task
        await task.value
        builtinUpdateTask = nil
        isUpdatingBuiltins = false
    }

    /// Refresh while the app is active, and catch up when it becomes active again.
    /// A failed load keeps old data and retries after an hour, or immediately on demand.
    func maintainBuiltinCollections() async {
        while !Task.isCancelled {
            await updateBuiltinCollections()
            let delay: TimeInterval
            if BuiltinCardCollectionUpdates.needsUpdate(collections) { delay = 3600 }
            else { delay = max(1, (lastBuiltinUpdate ?? .now).addingTimeInterval(BuiltinCardCollectionUpdates.interval).timeIntervalSinceNow) }
            do { try await Task.sleep(for: .seconds(delay)) }
            catch { return }
        }
    }
    @discardableResult
    private func persist(_ updated: [SavedCardCollection]) -> Bool {
        guard storageAvailable else { return false }
        do {
            try CardCollectionStore.save(updated)
            collections = updated
            WidgetCenter.shared.reloadTimelines(ofKind: CardCollectionStore.widgetKind)
            return true
        } catch { self.error = error.localizedDescription; return false }
    }
    func add(_ card: Card, trained: Bool, to collectionID: UUID) async {
        guard let url = trained ? card.afterTrainingArtURL : card.beforeTrainingArtURL as URL? else { return }
        let saved = SavedCard(cardID: card.id, trained: trained, title: card.name.majorValue ?? "#\(card.id)", imageURL: url)
        guard add([saved], to: collectionID) != nil else { return }
        await cache(saved)
    }
    /// Merges against the latest collection so edits made while checks are in
    /// flight are preserved. A chunk needs one disk write and Widget refresh.
    func add(_ cards: [SavedCard], to collectionID: UUID) -> [SavedCard]? {
        guard var collection = collections.first(where: { $0.id == collectionID }), !collection.isBuiltIn else { return nil }
        var ids = Set(collection.cards.map(\.id))
        let added = cards.filter { ids.insert($0.id).inserted }
        guard !added.isEmpty else { return [] }
        collection.cards.append(contentsOf: added)
        return save(collection) ? added : nil
    }
    func remove(_ card: SavedCard, from collectionID: UUID) {
        guard var collection = collections.first(where: { $0.id == collectionID }), !collection.isBuiltIn else { return }
        collection.cards.removeAll { $0.id == card.id }
        save(collection)
    }

    func removeCachedImages(in collection: SavedCardCollection) {
        do {
            for card in collection.cards {
                let url = CardCollectionStore.imageURL(for: card)
                if FileManager.default.fileExists(atPath: url.path) { try FileManager.default.removeItem(at: url) }
            }
            WidgetCenter.shared.reloadTimelines(ofKind: CardCollectionStore.widgetKind)
        } catch { self.error = error.localizedDescription }
    }

    /// Keeps automatic image downloads independent of the picker's lifetime.
    /// Bulk selection can finish without waiting for full-size art downloads.
    func cacheInBackground(_ cards: [SavedCard]) {
        for card in cards where !FileManager.default.fileExists(atPath: CardCollectionStore.imageURL(for: card).path) {
            if backgroundCacheIDs.insert(card.id).inserted { backgroundCacheQueue.append(card) }
        }
        guard backgroundCacheTask == nil, nextBackgroundImage < backgroundCacheQueue.count else { return }
        backgroundCacheTask = Task {
            await withTaskGroup(of: Void.self) { group in
                for _ in 0..<4 {
                    guard let card = takeNextBackgroundImage() else { break }
                    group.addTask { await self.cache(card, reloadWidgets: false) }
                }
                let clock = ContinuousClock()
                var lastRefresh = clock.now
                var completed = 0
                while await group.next() != nil {
                    completed += 1
                    if completed % 16 == 0 || lastRefresh.duration(to: clock.now) >= .seconds(2) {
                        WidgetCenter.shared.reloadTimelines(ofKind: CardCollectionStore.widgetKind)
                        lastRefresh = clock.now
                    }
                    if let card = takeNextBackgroundImage() {
                        group.addTask { await self.cache(card, reloadWidgets: false) }
                    }
                }
            }
            backgroundCacheQueue.removeAll()
            backgroundCacheIDs.removeAll()
            nextBackgroundImage = 0
            backgroundCacheTask = nil
            WidgetCenter.shared.reloadTimelines(ofKind: CardCollectionStore.widgetKind)
        }
    }

    private func takeNextBackgroundImage() -> SavedCard? {
        guard nextBackgroundImage < backgroundCacheQueue.count else { return nil }
        defer { nextBackgroundImage += 1 }
        return backgroundCacheQueue[nextBackgroundImage]
    }

    func cache(_ card: SavedCard, reloadWidgets: Bool = true) async {
        guard !FileManager.default.fileExists(atPath: CardCollectionStore.imageURL(for: card).path) else { return }
        let ownsTask = imageCacheTasks[card.id] == nil
        let task: Task<Bool, Error>
        if let existing = imageCacheTasks[card.id] {
            task = existing
        } else {
            task = Task.detached(priority: .utility) { try await Self.downloadAndCache(card) }
            imageCacheTasks[card.id] = task
        }
        defer { if ownsTask { imageCacheTasks[card.id] = nil } }
        do {
            let changed = try await task.value
            if changed && reloadWidgets { WidgetCenter.shared.reloadTimelines(ofKind: CardCollectionStore.widgetKind) }
        } catch { self.error = String(localized: "Collections.cache-failed") }
    }

    /// Downloading, decoding, resizing and writing all run off the main actor.
    nonisolated private static func downloadAndCache(_ card: SavedCard) async throws -> Bool {
        guard !FileManager.default.fileExists(atPath: CardCollectionStore.imageURL(for: card).path) else { return false }
        let (data, response) = try await URLSession.shared.data(from: card.imageURL)
        guard let response = response as? HTTPURLResponse, (200..<300).contains(response.statusCode), response.mimeType?.hasPrefix("image/") == true else {
            throw URLError(.badServerResponse)
        }
        // Bound decoded bitmap memory for the Widget extension.
        guard let source = CGImageSourceCreateWithData(data as CFData, nil),
              let thumbnail = CGImageSourceCreateThumbnailAtIndex(source, 0, [
                kCGImageSourceCreateThumbnailFromImageAlways: true,
                kCGImageSourceThumbnailMaxPixelSize: 1000,
                kCGImageSourceCreateThumbnailWithTransform: true
              ] as CFDictionary) else { throw URLError(.cannotDecodeContentData) }
        let resized = NSMutableData()
        guard let destination = CGImageDestinationCreateWithData(resized, UTType.jpeg.identifier as CFString, 1, nil) else { throw URLError(.cannotDecodeContentData) }
        CGImageDestinationAddImage(destination, thumbnail, [kCGImageDestinationLossyCompressionQuality: 0.9] as CFDictionary)
        guard CGImageDestinationFinalize(destination) else { throw URLError(.cannotDecodeContentData) }
        try CardCollectionStore.cacheImage(resized as Data, for: card)
        return true
    }
}
