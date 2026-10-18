import Combine
import ImageIO
import UniformTypeIdentifiers
import Foundation
import SekaiKit
import WidgetKit

@MainActor
final class CardCollectionManager: ObservableObject {
    static let shared = CardCollectionManager()
    @Published private(set) var collections: [SavedCardCollection] = []
    @Published var error: String?
    private var storageAvailable = true

    private init() {
        do { collections = try CardCollectionStore.load() }
        catch { self.error = error.localizedDescription; storageAvailable = false }
    }
    func save(_ collection: SavedCardCollection) {
        var updated = collections
        if let index = updated.firstIndex(where: { $0.id == collection.id }) { updated[index] = collection }
        else { updated.append(collection) }
        persist(updated)
    }
    func remove(_ id: UUID) { persist(collections.filter { $0.id != id }) }
    private func persist(_ updated: [SavedCardCollection]) {
        guard storageAvailable else { return }
        do {
            try CardCollectionStore.save(updated)
            collections = updated
            WidgetCenter.shared.reloadTimelines(ofKind: CardCollectionStore.widgetKind)
        } catch { self.error = error.localizedDescription }
    }
    func add(_ card: Card, trained: Bool, to collectionID: UUID) async {
        guard let url = trained ? card.afterTrainingArtURL : card.beforeTrainingArtURL as URL? else { return }
        let saved = SavedCard(cardID: card.id, trained: trained, title: card.name.majorValue ?? "#\(card.id)", imageURL: url)
        guard var collection = collections.first(where: { $0.id == collectionID }) else { return }
        if !collection.cards.contains(where: { $0.id == saved.id }) {
            collection.cards.append(saved)
            save(collection)
        }
        await cache(saved)
    }
    func cache(_ card: SavedCard) async {
        guard !FileManager.default.fileExists(atPath: CardCollectionStore.imageURL(for: card).path) else { return }
        do {
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
            WidgetCenter.shared.reloadTimelines(ofKind: CardCollectionStore.widgetKind)
        } catch { self.error = String(localized: "Collections.cache-failed") }
    }
}
