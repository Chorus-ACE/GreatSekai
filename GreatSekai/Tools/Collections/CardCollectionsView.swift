import SekaiKit
import SwiftUI
import SDWebImageSwiftUI

struct CardCollectionsView: View {
    @ObservedObject private var manager = CardCollectionManager.shared
    @State private var name = ""
    @State private var creating = false
    @State private var importing = false
    @State private var code = ""
    @State private var busy = false
    var body: some View {
        List {
            if manager.collections.isEmpty {
                ContentUnavailableView("Collections.empty", systemImage: "rectangle.stack", description: Text("Collections.empty-description"))
            }
            ForEach(manager.collections) { collection in
                NavigationLink { CardCollectionDetailView(id: collection.id) } label: {
                    HStack {
                        if let card = collection.cards.first {
                            WebImage(url: card.imageURL) { $0.resizable().scaledToFill() } placeholder: { Color.clear }
                                .frame(width: 90, height: 52).clipped().clipShape(RoundedRectangle(cornerRadius: 6))
                        }
                        VStack(alignment: .leading) {
                            Text(collection.name).font(.headline)
                            Text("Card.count.\(collection.cards.count)").foregroundStyle(.secondary)
                        }
                    }
                }
                .contextMenu {
                    ShareLink(item: export(collection)) { Label("Collections.share", systemImage: "square.and.arrow.up") }
                    Button("General.delete", role: .destructive) { manager.remove(collection.id) }
                }
            }.onDelete { offsets in
                let ids = offsets.map { manager.collections[$0].id }
                for id in ids { manager.remove(id) }
            }
        }
        .navigationTitle("Collections.title")
        .toolbar {
            ToolbarItem { Button("Collections.import", systemImage: "square.and.arrow.down") { importing = true } }
            ToolbarItem { Button("Collections.new", systemImage: "plus") { name = ""; creating = true } }
        }
        .alert("Collections.new", isPresented: $creating) {
            TextField("Collections.name", text: $name)
            Button("General.cancel", role: .cancel) { }
            Button("General.save") {
                manager.save(SavedCardCollection(name: name.trimmingCharacters(in: .whitespacesAndNewlines)))
            }.disabled(name.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
        }
        .sheet(isPresented: $importing) {
            NavigationStack {
                Form {
                    TextField("Collections.code", text: $code, axis: .vertical)
                    Button("Collections.import") { Task { await importCollection() } }.disabled(busy || code.isEmpty)
                    if busy { ProgressView() }
                }.navigationTitle("Collections.import")
                .toolbar { ToolbarItem { Button("General.cancel") { importing = false }.disabled(busy) } }
            }.frame(minWidth: platform == .macOS ? 350 : nil, minHeight: 250)
        }
        .alert("Collections.error", isPresented: Binding(get: { manager.error != nil }, set: { if !$0 { manager.error = nil } })) {
            Button("General.ok") { manager.error = nil }
        } message: { Text(manager.error ?? "") }
    }
    private func export(_ collection: SavedCardCollection) -> String {
        "GreatSekai:" + encodeCollection(.init(name: collection.name, cardList: collection.cards.map { $0.trained ? -$0.cardID : $0.cardID }))
    }
    private func importCollection() async {
        let input = code.trimmingCharacters(in: .whitespacesAndNewlines)
        guard input.hasPrefix("GreatSekai:"), let decoded = decodeCollection(String(input.dropFirst("GreatSekai:".count))),
              !decoded.name.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty, decoded.cardList.count <= 1000,
              decoded.cardList.allSatisfy({ $0 != Int.min && $0 != 0 }) else { manager.error = String(localized: "Collections.invalid-code"); return }
        busy = true
        defer { busy = false }
        guard let cards = await Card.allWithCache() else { manager.error = String(localized: "Collections.import-failed"); return }
        let lookup = Dictionary(cards.map { ($0.id, $0) }, uniquingKeysWith: { a, _ in a })
        var imported = SavedCardCollection(name: decoded.name)
        for id in decoded.cardList {
            guard let card = lookup[abs(id)], let url = id < 0 ? card.afterTrainingArtURL : card.beforeTrainingArtURL as URL? else {
                manager.error = String(localized: "Collections.import-failed"); return
            }
            let saved = SavedCard(cardID: card.id, trained: id < 0, title: card.name.majorValue ?? "#\(card.id)", imageURL: url)
            if !imported.cards.contains(where: { $0.id == saved.id }) { imported.cards.append(saved) }
        }
        manager.save(imported)
        importing = false; code = ""
        for card in imported.cards { await manager.cache(card) }
    }
}

struct CardCollectionDetailView: View {
    let id: UUID
    @ObservedObject private var manager = CardCollectionManager.shared
    @State private var adding = false
    @State private var renaming = false
    @State private var name = ""
    private var collection: SavedCardCollection? { manager.collections.first { $0.id == id } }
    var body: some View {
        List {
            if let collection {
                if collection.cards.isEmpty { Text("Collections.add-description").foregroundStyle(.secondary) }
                ForEach(collection.cards) { card in
                    HStack {
                        NavigationLink { CardDetailView(id: card.cardID) } label: {
                            HStack {
                                WebImage(url: card.imageURL) { $0.resizable().scaledToFit() } placeholder: { Color.clear }
                                    .frame(width: 150, height: 85)
                                VStack(alignment: .leading) {
                                    Text(card.title)
                                    Text(card.trained ? "Card.arts.trained" : "Card.arts.normal").font(.caption).foregroundStyle(.secondary)
                                }
                            }
                        }
                    }
                    .contextMenu {
                        Button("General.delete", role: .destructive) {
                            var edited = collection
                            edited.cards.removeAll { $0.id == card.id }
                            manager.save(edited)
                        }
                        Button("Collections.move-up") { move(card, by: -1) }
                            .disabled(collection.cards.first?.id == card.id)
                        Button("Collections.move-down") { move(card, by: 1) }
                            .disabled(collection.cards.last?.id == card.id)
                    }
                }
                .onDelete { offsets in
                    var edited = collection; edited.cards.remove(atOffsets: offsets); manager.save(edited)
                }
                .onMove { offsets, target in
                    var edited = collection; edited.cards.move(fromOffsets: offsets, toOffset: target); manager.save(edited)
                }
            }
        }
        .navigationTitle(collection?.name ?? "")
        .toolbar {
            #if os(iOS)
            ToolbarItem { EditButton() }
            #endif
            ToolbarItem { Button("Collections.rename", systemImage: "pencil") { name = collection?.name ?? ""; renaming = true } }
            ToolbarItem { Button("Collections.add-card", systemImage: "plus") { adding = true } }
            ToolbarItem {
                Button("Collections.cache", systemImage: "arrow.down.circle") {
                    Task { for card in collection?.cards ?? [] { await manager.cache(card) } }
                }
            }
        }
        .alert("Collections.rename", isPresented: $renaming) {
            TextField("Collections.name", text: $name)
            Button("General.cancel", role: .cancel) { }
            Button("General.save") {
                if var edited = collection { edited.name = name.trimmingCharacters(in: .whitespacesAndNewlines); manager.save(edited) }
            }.disabled(name.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
        }
        .sheet(isPresented: $adding) {
            NavigationStack {
                CollectionCardPicker(collectionID: id)
                    .toolbar { ToolbarItem { Button("General.done") { adding = false } } }
            }.frame(minWidth: platform == .macOS ? 600 : nil, minHeight: platform == .macOS ? 500 : nil)
        }
    }
    private func move(_ card: SavedCard, by offset: Int) {
        guard var edited = collection, let index = edited.cards.firstIndex(where: { $0.id == card.id }),
              edited.cards.indices.contains(index + offset) else { return }
        edited.cards.swapAt(index, index + offset)
        manager.save(edited)
    }
}

private struct CollectionCardPicker: View {
    let collectionID: UUID
    var body: some View {
        SearchViewBase(forType: Card.self, initialLayout: 1, layoutOptions: [("Filter.view.list", "list.bullet", 1)]) { _, _, content, _ in
            LazyVStack { content }.frame(maxWidth: infoContentMaxWidth)
        } eachContent: { _, card in CardInfo(card, layoutType: 1) } destination: { card, _ in
            CollectionCardChoice(card: card, collectionID: collectionID)
        }
    }
}

private struct CollectionCardChoice: View {
    let card: Card
    let collectionID: UUID
    @ObservedObject private var manager = CardCollectionManager.shared
    @State private var busy = false
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                choice(trained: false, url: card.beforeTrainingArtURL)
                if let url = card.afterTrainingArtURL { choice(trained: true, url: url) }
            }.padding().frame(maxWidth: infoContentMaxWidth).frame(maxWidth: .infinity)
        }.navigationTitle(card.name.majorValue ?? "")
    }
    private func choice(trained: Bool, url: URL) -> some View {
        let contains = manager.collections.first { $0.id == collectionID }?.cards.contains { $0.cardID == card.id && $0.trained == trained } ?? false
        return VStack {
            WebImage(url: url) { $0.resizable().scaledToFit() } placeholder: { ProgressView() }
            Button(contains ? "Collections.added" : "Collections.add-card", systemImage: contains ? "checkmark" : "plus") {
                busy = true
                Task { await manager.add(card, trained: trained, to: collectionID); busy = false }
            }.disabled(contains || busy)
        }
    }
}

struct AddCardToCollectionMenu: View {
    let card: Card
    @ObservedObject private var manager = CardCollectionManager.shared
    var body: some View {
        Menu("Collections.add-card", systemImage: "rectangle.stack.badge.plus") {
            if manager.collections.isEmpty { Text("Collections.create-first") }
            ForEach(manager.collections) { collection in
                Menu(collection.name) {
                    Button("Card.arts.normal") { Task { await manager.add(card, trained: false, to: collection.id) } }
                    if card.canTrain { Button("Card.arts.trained") { Task { await manager.add(card, trained: true, to: collection.id) } } }
                }
            }
        }
    }
}
