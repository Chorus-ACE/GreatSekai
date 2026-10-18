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
    let id: UUID
    let name: String
    var displayRepresentation: DisplayRepresentation { DisplayRepresentation(title: "\(name)") }
}

struct CollectionQuery: EntityQuery {
    func entities(for identifiers: [UUID]) async throws -> [CollectionEntity] {
        try CardCollectionStore.load().filter { identifiers.contains($0.id) }.map { CollectionEntity(id: $0.id, name: $0.name) }
    }
    func suggestedEntities() async throws -> [CollectionEntity] {
        try CardCollectionStore.load().map { CollectionEntity(id: $0.id, name: $0.name) }
    }
    func defaultResult() async -> CollectionEntity? { try? await suggestedEntities().first }
}

struct CollectionWidgetIntent: WidgetConfigurationIntent {
    static var title: LocalizedStringResource = "Collections.widget"
    static var description = IntentDescription("Collections.widget-description")
    @Parameter(title: "Collections.title") var collection: CollectionEntity?
}

struct CollectionEntry: TimelineEntry {
    let date: Date
    let name: String
    let card: SavedCard?
    let imageData: Data?
}

struct CollectionProvider: AppIntentTimelineProvider {
    func placeholder(in context: Context) -> CollectionEntry {
        CollectionEntry(date: .now, name: "GreatSekai", card: nil, imageData: nil)
    }
    func snapshot(for configuration: CollectionWidgetIntent, in context: Context) async -> CollectionEntry {
        entries(configuration).first ?? placeholder(in: context)
    }
    func timeline(for configuration: CollectionWidgetIntent, in context: Context) async -> Timeline<CollectionEntry> {
        Timeline(entries: entries(configuration), policy: .after(Date().addingTimeInterval(3600)))
    }
    private func entries(_ configuration: CollectionWidgetIntent) -> [CollectionEntry] {
        let collections = (try? CardCollectionStore.load()) ?? []
        let collection = configuration.collection.map { selected in collections.first { $0.id == selected.id } } ?? collections.first
        let now = Date()
        guard let collection, !collection.cards.isEmpty else {
            return [CollectionEntry(date: now, name: collection?.name ?? "GreatSekai", card: nil, imageData: nil)]
        }
        // Only cache-backed cards enter the timeline; WidgetKit does not render remote async images.
        let cards = collection.cards.filter { FileManager.default.fileExists(atPath: CardCollectionStore.imageURL(for: $0).path) }
        guard !cards.isEmpty else { return [CollectionEntry(date: now, name: collection.name, card: nil, imageData: nil)] }
        let start = Int(now.timeIntervalSince1970 / 900) % cards.count
        return (0..<4).map { offset in
            let card = cards[(start + offset) % cards.count]
            return CollectionEntry(date: now.addingTimeInterval(Double(offset) * 900), name: collection.name, card: card,
                                   imageData: try? Data(contentsOf: CardCollectionStore.imageURL(for: card)))
        }
    }
}

struct CollectionWidgetView: View {
    let entry: CollectionEntry
    var body: some View {
        Group {
            if let data = entry.imageData, let image = platformImage(data) {
                GeometryReader { proxy in
                    image.resizable().scaledToFill().frame(width: proxy.size.width, height: proxy.size.height).clipped()
                }.accessibilityLabel(entry.card?.title ?? entry.name)
            } else {
                VStack(spacing: 8) {
                    Image(systemName: "rectangle.stack").font(.largeTitle)
                    Text(entry.name).font(.headline)
                    Text("Collections.widget-empty").font(.caption).multilineTextAlignment(.center)
                }.padding()
            }
        }
        .containerBackground(.fill.tertiary, for: .widget)
        .widgetURL(URL(string: "greatsekai://collections"))
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
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
        .contentMarginsDisabled()
    }
}
