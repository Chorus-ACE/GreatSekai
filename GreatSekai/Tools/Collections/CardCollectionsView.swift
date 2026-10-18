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
    @Environment(\.dismiss) private var dismiss
    @State private var editing = false
    @State private var deleting = false
    @State private var name = ""
    @State private var downloading = false
    @State private var downloaded = 0
    @State private var downloadTotal = 0
    @State private var cachedBytes: Int64 = 0
    private var collection: SavedCardCollection? { manager.collections.first { $0.id == id } }

    var body: some View {
        ScrollView {
            if let collection {
                LazyVStack(spacing: 16) {
                    CustomGroupBox {
                        VStack(spacing: 12) {
                            HStack {
                                Text("Collections.name").bold().fixedSize()
                                TextField("Collections.name", text: $name)
                                    .textFieldStyle(.plain).multilineTextAlignment(.trailing)
                                    .onSubmit(saveName)
                            }
                            Divider()
                            HStack {
                                Text("Card.count.\(collection.cards.count)")
                                Spacer()
                                Button("Collections.edit", systemImage: "square.and.pencil") { editing = true }
                            }
                            Divider()
                            if downloading {
                                ProgressView(value: Double(downloaded), total: Double(max(downloadTotal, 1))) {
                                    Text("Collections.download-progress.\(downloaded).\(downloadTotal)")
                                }
                            } else {
                                HStack {
                                    Button("Collections.cache", systemImage: "arrow.down.circle") { downloading = true }
                                        .disabled(collection.cards.isEmpty)
                                    Spacer()
                                    Text(ByteCountFormatter.string(fromByteCount: cachedBytes, countStyle: .file))
                                        .foregroundStyle(.secondary).monospacedDigit()
                                }
                            }
                            if cachedBytes > 0 {
                                HStack {
                                    Button("Collections.remove-downloads", systemImage: "trash", role: .destructive) {
                                        manager.removeCachedImages(in: collection); updateCacheSize()
                                    }
                                    .disabled(downloading)
                                    Spacer()
                                }
                            }
                            HStack {
                                ShareLink(item: "GreatSekai:" + encodeCollection(.init(name: collection.name, cardList: collection.cards.map { $0.trained ? -$0.cardID : $0.cardID }))) {
                                    Label("Collections.share", systemImage: "square.and.arrow.up")
                                }
                                Spacer()
                                Button("General.delete", role: .destructive) { deleting = true }
                            }
                        }
                    }
                    if collection.cards.isEmpty {
                        ContentUnavailableView("Collections.empty", systemImage: "rectangle.stack", description: Text("Collections.add-description"))
                    }
                    ForEach(collection.cards) { card in
                        NavigationLink { CardDetailView(id: card.cardID) } label: {
                            CustomGroupBox {
                                HStack(spacing: 12) {
                                    WebImage(url: card.imageURL) { $0.resizable().scaledToFit() } placeholder: { Color.clear }
                                        .frame(width: 150, height: 85)
                                    VStack(alignment: .leading, spacing: 6) {
                                        Text(card.title).foregroundStyle(.primary)
                                        Text(card.trained ? "Card.arts.trained" : "Card.arts.normal")
                                            .font(.caption).foregroundStyle(.secondary)
                                    }
                                    Spacer(minLength: 0)
                                }
                            }
                        }
                        .buttonStyle(.plain)
                        .contextMenu {
                            Button("General.delete", role: .destructive) { manager.remove(card, from: id) }
                            Button("Collections.move-up") { move(card, by: -1) }.disabled(collection.cards.first?.id == card.id)
                            Button("Collections.move-down") { move(card, by: 1) }.disabled(collection.cards.last?.id == card.id)
                        }
                    }
                }
                .frame(maxWidth: infoContentMaxWidth).padding().frame(maxWidth: .infinity)
            }
        }
        .navigationTitle(collection?.name ?? "")
        .toolbar { ToolbarItem { Button("Collections.edit", systemImage: "square.and.pencil") { editing = true } } }
        .selectionWindow(isPresented: $editing, title: "Cards") {
            NavigationStack { CollectionCardPicker(collectionID: id) }
        }
        .alert("Collections.delete-confirm", isPresented: $deleting) {
            Button("General.delete", role: .destructive) { manager.remove(id); dismiss() }
            Button("General.cancel", role: .cancel) { }
        }
        .alert("Collections.error", isPresented: Binding(get: { manager.error != nil }, set: { if !$0 { manager.error = nil } })) {
            Button("General.ok") { manager.error = nil }
        } message: { Text(manager.error ?? "") }
        .onAppear { name = collection?.name ?? ""; updateCacheSize() }
        .onDisappear(perform: saveName)
        .onChange(of: collection?.cards) { updateCacheSize() }
        .task(id: downloading) {
            guard downloading else { return }
            let cards = collection?.cards ?? []
            downloaded = 0; downloadTotal = cards.count
            for card in cards {
                guard !Task.isCancelled else { downloading = false; return }
                await manager.cache(card)
                downloaded += 1
            }
            updateCacheSize()
            downloading = false
        }
    }
    private func saveName() {
        let trimmed = name.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty, var edited = collection else { name = collection?.name ?? ""; return }
        guard edited.name != trimmed else { return }
        edited.name = trimmed; manager.save(edited); name = trimmed
    }
    private func updateCacheSize() {
        cachedBytes = (collection?.cards ?? []).reduce(0) { total, card in
            total + Int64((try? CardCollectionStore.imageURL(for: card).resourceValues(forKeys: [.fileSizeKey]).fileSize) ?? 0)
        }
    }
    private func move(_ card: SavedCard, by offset: Int) {
        guard var edited = collection, let index = edited.cards.firstIndex(where: { $0.id == card.id }),
              edited.cards.indices.contains(index + offset) else { return }
        edited.cards.swapAt(index, index + offset); manager.save(edited)
    }
}

private struct CollectionCardPicker: View {
    let collectionID: UUID
    @ObservedObject private var manager = CardCollectionManager.shared
    @Environment(\.dismissSelection) private var dismissSelection
    @Environment(\.dismiss) private var dismiss
    @Environment(\.horizontalSizeClass) private var sizeClass
    @State private var cards: [Card]?
    @State private var failed = false
    @State private var query = ""
    @State private var filter = SekaiFilter(forKeys: Card.filterKeys)
    @State private var sorter = SekaiSorter(keyword: Card.applicableSortingTypes.first ?? .id)
    @State private var showFilter = false
    @State private var selectedOnly = false
    @State private var layout = 1
    @State private var retry = 0
    @State private var batch: [SavedCard] = []
    @State private var cached = 0
    private var selected: [SavedCard] { manager.collections.first { $0.id == collectionID }?.cards ?? [] }
    private var results: [Card]? {
        let ids = Set(selected.map(\.cardID))
        return cards?.filter(withSekaiFilter: filter).search(for: query).sorted(withSekaiSorter: sorter)
            .filter { !selectedOnly || ids.contains($0.id) }
    }
    var body: some View {
        Group {
            if let results {
                ScrollView {
                    VStack(spacing: 12) {
                        Text("Collections.auto-save").font(.caption).foregroundStyle(.secondary)
                        if !batch.isEmpty {
                            ProgressView(value: Double(cached), total: Double(batch.count))
                                .frame(maxWidth: infoContentMaxWidth)
                        }
                        if results.isEmpty { ContentUnavailableView.search(text: query) }
                        else if layout == 1 {
                            LazyVStack { ForEach(results) { card in cardRow(card) } }.frame(maxWidth: infoContentMaxWidth)
                        } else {
                            LazyVGrid(columns: [GridItem(.adaptive(minimum: layout == 2 ? 230 : 350, maximum: layout == 2 ? 280 : 500))]) {
                                ForEach(results) { card in cardRow(card) }
                            }
                        }
                    }.padding().frame(maxWidth: .infinity)
                }
                .scrollDisablesPopover()
            } else if failed {
                ContentUnavailableView {
                    Label("Cards", systemImage: "person.crop.square")
                } description: { Text("Search.unavailable.description") } actions: {
                    Button("General.retry") { retry += 1 }
                }
            } else { ProgressView().frame(maxWidth: .infinity, maxHeight: .infinity) }
        }
        .navigationTitle("Cards")
        .searchable(text: $query)
        .highlightKeyword($query)
        .toolbar {
            ToolbarItem { LayoutPicker(selection: $layout, options: [("Filter.view.list", "list.bullet", 1), ("Filter.view.grid", "square.grid.2x2", 2), ("Filter.view.gallery", "text.below.rectangle", 3)]) }
            ToolbarItem {
                Menu {
                    Toggle("Collections.selected-only", isOn: $selectedOnly)
                    Divider()
                    Button("Collections.select-normal") { selectAll(trained: false) }.disabled(!batch.isEmpty)
                    Button("Collections.select-trained") { selectAll(trained: true) }.disabled(!batch.isEmpty)
                    Button("Collections.deselect-results") {
                        let ids = Set((results ?? []).map(\.id))
                        guard var collection = manager.collections.first(where: { $0.id == collectionID }) else { return }
                        collection.cards.removeAll { ids.contains($0.cardID) }; manager.save(collection)
                    }.disabled(!batch.isEmpty)
                } label: { Label("Collections.selection", systemImage: "checkmark.circle") }
            }
            ToolbarItemGroup {
                FilterAndSorterPicker(showFilterSheet: $showFilter, sorter: $sorter,
                    isFiltering: filter.isFiltering(referencing: Card.filterKeys), sorterKeywords: Card.applicableSortingTypes,
                    hasEndingDate: Card.hasEndingDate)
            }
            ToolbarItem(placement: .confirmationAction) {
                Button("General.done", systemImage: "checkmark") {
                    if let dismissSelection { dismissSelection() } else { dismiss() }
                }
            }
        }
        .wrapIf(platform == .macOS || sizeClass == .regular) { content in
            content.inspector(isPresented: $showFilter) { FilterView(filter: $filter, keys: Card.filterKeys) }
        } else: { content in
            content.sheet(isPresented: $showFilter) { FilterView(filter: $filter, keys: Card.filterKeys).presentationDetents([.medium, .large]) }
        }
        .task(id: retry) {
            failed = false
            let fetched = await Card.allWithCache()
            guard !Task.isCancelled else { return }
            cards = fetched; failed = fetched == nil
        }
        .task(id: batch) {
            guard !batch.isEmpty else { return }
            cached = 0
            for card in batch {
                guard !Task.isCancelled else { return }
                await manager.cache(card); cached += 1
            }
            batch = []
        }
        .alert("Collections.error", isPresented: Binding(get: { manager.error != nil }, set: { if !$0 { manager.error = nil } })) {
            Button("General.ok") { manager.error = nil }
        } message: { Text(manager.error ?? "") }
    }
    private func cardRow(_ card: Card) -> some View {
        VStack(spacing: 8) {
            CardInfo(card, layoutType: layout)
                .contextMenu {
                    NavigationLink { CardDetailView(id: card.id) } label: { Label("Card.details", systemImage: "info.circle") }
                }
            HStack {
                choice(card, trained: false)
                if card.canTrain { choice(card, trained: true) }
            }
        }
        .padding(.bottom, 8)
    }
    private func choice(_ card: Card, trained: Bool) -> some View {
        let isSelected = selected.contains { $0.cardID == card.id && $0.trained == trained }
        return Button {
            if let saved = selected.first(where: { $0.cardID == card.id && $0.trained == trained }) {
                manager.remove(saved, from: collectionID)
            } else {
                Task { await manager.add(card, trained: trained, to: collectionID) }
            }
        } label: {
            HStack(spacing: 6) {
                Image(systemName: isSelected ? "checkmark.circle.fill" : "circle")
                Text(trained ? "Card.arts.trained" : "Card.arts.normal")
            }
            .font(.subheadline)
            .padding(.horizontal, 12).padding(.vertical, 6)
            .background(isSelected ? Color.accentColor.opacity(0.15) : Color.secondary.opacity(0.1), in: Capsule())
            .foregroundStyle(isSelected ? Color.accentColor : .secondary)
        }
        .buttonStyle(.plain)
        .accessibilityAddTraits(isSelected ? .isSelected : [])
    }
    private func selectAll(trained: Bool) {
        guard var collection = manager.collections.first(where: { $0.id == collectionID }) else { return }
        var pending: [SavedCard] = []
        for card in results ?? [] {
            guard let url = trained ? card.afterTrainingArtURL : card.beforeTrainingArtURL as URL? else { continue }
            let saved = SavedCard(cardID: card.id, trained: trained, title: card.name.majorValue ?? "#\(card.id)", imageURL: url)
            if !collection.cards.contains(where: { $0.id == saved.id }) { collection.cards.append(saved) }
            pending.append(saved)
        }
        manager.save(collection)
        batch = pending
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
