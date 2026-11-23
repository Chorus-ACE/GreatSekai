import AppIntents
import SwiftUI
import WidgetKit
#if os(macOS)
import AppKit
#else
import UIKit
#endif

struct CollectionEntity: AppEntity {
    static var typeDisplayRepresentation = TypeDisplayRepresentation(name: "Collections.title")
    static var defaultQuery = CollectionQuery()
    static let randomCard = Self(id: UUID(uuidString: "F6C541A7-C858-4C9D-B4E7-000000000004")!, name: "")

    let id: UUID
    let name: String
    var displayRepresentation: DisplayRepresentation {
        if id == Self.randomCard.id {
            DisplayRepresentation(title: "Collections.widget-random")
        } else {
            DisplayRepresentation(title: "\(name)")
        }
    }
}

struct CollectionQuery: EntityQuery {
    func entities(for identifiers: [UUID]) async throws -> [CollectionEntity] {
        try await suggestedEntities().filter { identifiers.contains($0.id) }
    }
    func suggestedEntities() async throws -> [CollectionEntity] {
        let collections = (try? CardCollectionStore.load()) ?? []
        return [.randomCard] + collections.filter { $0.id != CollectionEntity.randomCard.id }
            .map { CollectionEntity(id: $0.id, name: $0.name) }
    }
    func defaultResult() async -> CollectionEntity? { .randomCard }
}

struct CollectionWidgetIntent: WidgetConfigurationIntent {
    static var title: LocalizedStringResource = "Collections.widget"
    static var description = IntentDescription("Collections.widget-description")
    @Parameter(title: "Collections.title", default: CollectionEntity.randomCard)
    var collection: CollectionEntity?
}

struct CollectionEntry: TimelineEntry {
    let date: Date
    let name: String
    let card: SavedCard?
    let imageData: Data?
    var emptyMessage: LocalizedStringKey = "Collections.widget-empty"
}

struct CollectionProvider: AppIntentTimelineProvider {
    private let interval: TimeInterval = 15 * 60
    private let timelineCount = 4

    func placeholder(in context: Context) -> CollectionEntry {
        CollectionEntry(date: .now, name: "GreatSekai", card: nil, imageData: nil)
    }
    func snapshot(for configuration: CollectionWidgetIntent, in context: Context) async -> CollectionEntry {
        await entries(for: configuration, count: 1).first ?? placeholder(in: context)
    }
    func timeline(for configuration: CollectionWidgetIntent, in context: Context) async -> Timeline<CollectionEntry> {
        let entries = await entries(for: configuration, count: timelineCount)
        let slots = isRandom(configuration) ? entries.count : timelineCount
        return Timeline(entries: entries, policy: .after(.now.addingTimeInterval(interval * Double(slots))))
    }

    private func isRandom(_ configuration: CollectionWidgetIntent) -> Bool {
        (configuration.collection ?? .randomCard).id == CollectionEntity.randomCard.id
    }

    private func entries(for configuration: CollectionWidgetIntent, count: Int) async -> [CollectionEntry] {
        if isRandom(configuration) { return await randomEntries(count: count) }

        let collections = (try? CardCollectionStore.load()) ?? []
        let now = Date()
        guard let collection = collections.first(where: { $0.id == configuration.collection?.id }) else {
            return [CollectionEntry(date: now, name: "GreatSekai", card: nil, imageData: nil)]
        }
        let cards = collection.cards.filter { FileManager.default.fileExists(atPath: CardCollectionStore.imageURL(for: $0).path) }
        guard !cards.isEmpty else { return [CollectionEntry(date: now, name: collection.name, card: nil, imageData: nil)] }
        let start = Int(now.timeIntervalSince1970 / interval) % cards.count
        return (0..<count).map { offset in
            let card = cards[(start + offset) % cards.count]
            return CollectionEntry(date: now.addingTimeInterval(Double(offset) * interval), name: collection.name, card: card,
                                   imageData: try? Data(contentsOf: CardCollectionStore.imageURL(for: card)))
        }
    }

    private func randomEntries(count: Int) async -> [CollectionEntry] {
        let name = String(localized: "Collections.widget-random")
        let catalog = (try? CardCollectionStore.loadCatalog()) ?? []
        guard !catalog.isEmpty else {
            return [CollectionEntry(date: .now, name: name, card: nil, imageData: nil,
                                    emptyMessage: "Collections.widget-random.load-catalog")]
        }

        // Sample entries before picking their artwork so each card has the same chance.
        let loaded = await withTaskGroup(of: (index: Int, card: SavedCard, data: Data)?.self) { group in
            for (index, entry) in catalog.shuffled().prefix(count).enumerated() {
                group.addTask {
                    for artwork in entry.artworks.shuffled() {
                        if let data = try? Data(contentsOf: CardCollectionStore.imageURL(for: artwork)) {
                            return (index, artwork, data)
                        }
                        if let data = try? await CardCollectionStore.downloadArtwork(from: artwork.imageURL, timeout: 5) {
                            return (index, artwork, data)
                        }
                    }
                    return nil
                }
            }
            var artworks: [(index: Int, card: SavedCard, data: Data)] = []
            for await artwork in group {
                if let artwork { artworks.append(artwork) }
            }
            return artworks.sorted { $0.index < $1.index }
        }
        let now = Date()
        guard !loaded.isEmpty else {
            return [CollectionEntry(date: now, name: name, card: nil, imageData: nil,
                                    emptyMessage: "Collections.widget-random.artwork-unavailable")]
        }
        return loaded.enumerated().map { offset, artwork in
            CollectionEntry(date: now.addingTimeInterval(Double(offset) * interval), name: name,
                            card: artwork.card, imageData: artwork.data)
        }
    }
}

struct CollectionWidgetView: View {
    let entry: CollectionEntry
    var body: some View {
        let artwork = entry.imageData.flatMap(platformImage)
        Group {
            if let artwork {
                GeometryReader { proxy in
                    artwork.resizable().scaledToFill().frame(width: proxy.size.width, height: proxy.size.height).clipped()
                }.accessibilityLabel(entry.card?.title ?? entry.name)
            } else {
                VStack(spacing: 8) {
                    Image(systemName: "rectangle.stack").font(.largeTitle)
                    Text(entry.name).font(.headline)
                    Text(entry.emptyMessage).font(.caption).multilineTextAlignment(.center)
                }.padding()
            }
        }
        .containerBackground(.fill.tertiary, for: .widget)
        .widgetURL(artwork == nil ? CardWidgetLink.collectionsURL : entry.card.map { CardWidgetLink(id: $0.cardID).url })
    }
    private func platformImage(_ data: Data) -> Image? {
        #if os(macOS)
        NSImage(data: data).map { Image(nsImage: $0) }
        #else
        UIImage(data: data).map { Image(uiImage: $0) }
        #endif
    }
}

@main
struct CardCollectionWidget: Widget {
    var body: some WidgetConfiguration {
        AppIntentConfiguration(kind: CardCollectionStore.widgetKind, intent: CollectionWidgetIntent.self, provider: CollectionProvider()) {
            CollectionWidgetView(entry: $0)
        }
        .configurationDisplayName("Collections.widget")
        .description("Collections.widget-description")
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge, .systemExtraLarge])
        .contentMarginsDisabled()
    }
}
