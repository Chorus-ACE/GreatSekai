import CoreImage.CIFilterBuiltins
import SekaiKit
import SwiftUI

struct CardCollectionsView: View {
    var importCode: String? = nil
    @ObservedObject private var manager = CardCollectionManager.shared
    @State private var name = ""
    @State private var creating = false
    @State private var busy = false
    private var decodingResult: Result<CollectionEncodingInfo, CollectionCodeDecodingError> {
        decodeCollectionResult(name, defaultName: String(localized: "Collections.title"))
    }
    private var isCollectionCode: Bool {
        if case .failure(.invalidCode) = decodingResult { return false }
        return true
    }
    private var importError: String? {
        switch decodingResult {
        case .failure(.wrongApp(let app)):
            return String(localized: "Collections.import.wrong-app.\(app.localizedName)")
        case .failure(.unsupportedVersion):
            return String(localized: "Collections.import.unsupported-version")
        default:
            return nil
        }
    }
    var body: some View {
        Form {
            Section("Collections.user") {
                ForEach(manager.userCollections) { collection in
                    collectionLink(collection)
                        .wrapIf(platform == .macOS) { row in
                            row.contextMenu {
                                Button("Collections.duplicate", systemImage: "plus.square.on.square") { manager.duplicate(collection) }
                                Button("General.delete", systemImage: "trash", role: .destructive) { manager.remove(collection.id) }
                            }
                        }
                        .swipeActions(edge: .trailing, allowsFullSwipe: false) {
                            Button("General.delete", systemImage: "trash", role: .destructive) { manager.remove(collection.id) }
                            Button("Collections.duplicate", systemImage: "plus.square.on.square") { manager.duplicate(collection) }
                        }
                }
                .onMove { manager.moveUserCollections(from: $0, to: $1) }
                if manager.userCollections.isEmpty {
                    Text("Collections.user.empty").foregroundStyle(.secondary)
                }
                if busy {
                    Text("Collections.importing").foregroundStyle(.secondary)
                } else {
                    #if !os(macOS)
                    Button("Collections.new", systemImage: "plus") { name = ""; creating = true }
                    #endif
                }
            }
            Section("Collections.builtin") {
                ForEach(manager.builtinCollections) { collection in
                    collectionLink(collection)
                        .swipeActions(edge: .trailing, allowsFullSwipe: false) {
                            Button("Collections.duplicate", systemImage: "plus.square.on.square") { manager.duplicate(collection) }
                        }
                        .wrapIf(platform == .macOS) { row in
                            row.contextMenu {
                                Button("Collections.duplicate", systemImage: "plus.square.on.square") { manager.duplicate(collection) }
                            }
                        }
                }
            }
        }
        .formStyle(.grouped)
        .navigationTitle("Collections.title")
        .task(id: importCode) {
            if let importCode { name = importCode; creating = true }
        }
        .task { await manager.maintainBuiltinCollections() }
        .toolbar {
            #if os(macOS)
            ToolbarItem {
                Button("Collections.new", systemImage: "plus") { name = ""; creating = true }
                    .disabled(busy)
            }
            #endif
            ToolbarItem {
                Menu {
                    Button("Collections.builtin.update", systemImage: "arrow.clockwise") {
                        Task { await manager.updateBuiltinCollections(force: true) }
                    }
                    .disabled(manager.isUpdatingBuiltins)
                    Section("Collections.builtin.last-updated") {
                        if let date = manager.lastBuiltinUpdate {
                            Text(date, format: .dateTime.year().month().day().hour().minute())
                        } else { Text("Collections.builtin.never-updated") }
                    }
                    if let error = manager.builtinUpdateError { Text(error) }
                } label: {
                    if manager.isUpdatingBuiltins { ProgressView().controlSize(.small) }
                    else { Label("Collections.builtin.update", systemImage: "arrow.clockwise") }
                }
            }
        }
        .refreshable { await manager.updateBuiltinCollections(force: true) }
        .alert("Collections.new", isPresented: $creating) {
            TextField("Collections.name-or-code", text: $name)
            Button("General.cancel", role: .cancel) { }
            Button(isCollectionCode ? "Collections.import" : "Collections.add") {
                switch decodingResult {
                case .success(let decoded):
                    Task { await importCollection(decoded) }
                case .failure(.wrongApp(let app)):
                    manager.error = String(localized: "Collections.import.wrong-app.\(app.localizedName)")
                case .failure(.unsupportedVersion):
                    manager.error = String(localized: "Collections.import.unsupported-version")
                case .failure(.invalidCode):
                    manager.save(SavedCardCollection(name: name.trimmingCharacters(in: .whitespacesAndNewlines)))
                }
            }.disabled(busy || importError != nil || name.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
        } message: {
            if let importError {
                Text(importError)
            } else {
                Text("Collections.new-description")
            }
        }
        .alert("Collections.error", isPresented: Binding(get: { manager.error != nil }, set: { if !$0 { manager.error = nil } })) {
            Button("General.ok") { manager.error = nil }
        } message: { Text(manager.error ?? "") }
    }
    private func collectionLink(_ collection: SavedCardCollection) -> some View {
        NavigationLink { CardCollectionDetailView(id: collection.id) } label: {
            HStack {
                Text(collection.builtinKind?.localizedName ?? collection.name)
                Spacer()
                if !collection.cards.isEmpty {
                    Text("\(collection.cards.count)").foregroundStyle(.secondary)
                }
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }
    private func importCollection(_ decoded: CollectionEncodingInfo) async {
        guard decoded.cardList.count <= 1000,
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
        name = ""
        let importedCards = imported.cards
        Task {
            for card in importedCards { await manager.cache(card) }
        }
    }
}

// The collection detail and editor follow Greatdori's collection UI.
struct CardCollectionDetailView: View {
    let id: UUID
    @ObservedObject private var manager = CardCollectionManager.shared
    @Environment(\.dismiss) private var dismiss
    @State private var editing = false
    @State private var deleting = false
    @State private var sharing = false
    @State private var name = ""
    @State private var layout = 1
    @State private var downloading = false
    @State private var downloaded = 0
    @State private var downloadTotal = 0
    @State private var cachedBytes: Int64 = 0
    @State private var allImagesCached = false
    @State private var cardMetadata: [Int: Card] = [:]
    private var collection: SavedCardCollection? { manager.collections.first { $0.id == id } }

    private var metadataRequest: CollectionCardMetadataRequest {
        .init(namespace: CardCollectionMetadataCache.namespace, ids: Set(collection?.cards.map(\.cardID) ?? []))
    }

    var body: some View {
        ScrollView {
            if let collection {
                HStack {
                    Spacer(minLength: 0)
                    LazyVStack {
                        collectionInformation(collection)
                        DetailSectionsSpacer()
                        #if !os(macOS)
                        if !collection.isBuiltIn {
                            CustomGroupBox {
                                Button { editing = true } label: {
                                    HStack {
                                        Spacer()
                                        Label("Collections.edit", systemImage: "square.and.pencil").bold()
                                        Spacer()
                                    }
                                    .contentShape(Rectangle())
                                }
                            }
                        }
                        #endif
                        ForEach(collection.cards) { card in
                            CollectionSavedCardRow(collectionID: id, saved: card, layout: layout,
                                card: cardMetadata[card.cardID], isEditable: !collection.isBuiltIn)
                        }
                        if collection.cards.isEmpty {
                            CustomGroupBox {
                                HStack {
                                    Spacer()
                                    Text("Collections.no-cards").foregroundStyle(.secondary)
                                    Spacer()
                                }
                            }
                        }
                    }
                    .frame(maxWidth: infoContentMaxWidth)
                    .padding()
                    Spacer(minLength: 0)
                }
            }
        }
        .withSystemBackground()
        .navigationTitle(name)
        .wrapIf(true) { content in
            if #available(iOS 26.0, macOS 26.0, *) {
                content.navigationSubtitle("Card.count.\(collection?.cards.count ?? 0)")
            } else { content }
        }
        .toolbar {
            if collection?.cards.isEmpty == false {
                ToolbarItem {
                    LayoutPicker(selection: $layout, options: [("Filter.view.list", "list.bullet", 1), ("Filter.view.gallery", "text.below.rectangle", 3)])
                }
                if #available(iOS 26.0, macOS 26.0, *) { ToolbarSpacer() }
            }
            #if os(macOS)
            if collection?.isBuiltIn == false {
                ToolbarItem { Button("Collections.edit", systemImage: "square.and.pencil") { editing = true } }
                if #available(macOS 26.0, *) { ToolbarSpacer() }
            }
            #endif
            if collection?.cards.isEmpty == false {
                ToolbarItem(placement: .primaryAction) {
                    Button("Collections.share", systemImage: "square.and.arrow.up") { sharing = true }
                }
            }
        }
        .selectionWindow(isPresented: $editing, title: "Cards") {
            NavigationStack { CollectionCardPicker(collectionID: id) }
        }
        .sheet(isPresented: $sharing) {
            if let collection {
                NavigationStack { CollectionShareView(collection: collection) }
            }
        }
        .alert("Collections.delete-confirm", isPresented: $deleting) {
            Button("General.delete", role: .destructive) { manager.remove(id); dismiss() }
            Button("General.cancel", role: .cancel) { }
        }
        .collectionErrorAlert()
        .onAppear {
            name = collection?.name ?? ""
            if var collection, !collection.isBuiltIn {
                collection.cards.sort { $0.cardID < $1.cardID }
                manager.save(collection)
            }
            updateCacheSize()
        }
        .onDisappear(perform: saveName)
        .onChange(of: collection?.cards) { updateCacheSize() }
        .task(id: metadataRequest) {
            let request = metadataRequest
            guard let metadata = await CardCollectionMetadataCache.shared.load(request), !Task.isCancelled else { return }
            cardMetadata = metadata
        }
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

    private func collectionInformation(_ collection: SavedCardCollection) -> some View {
//        CustomGroupBox(cornerRadius: platform == .macOS ? 15 : 25) {
            DetailInfoBase {
                DetailInfoItem("Collections.name") {
                    if collection.isBuiltIn {
                        Text(collection.builtinKind?.localizedName ?? collection.name).textSelection(.enabled)
                    } else {
                        TextField("Collections.name", text: $name)
                            .multilineTextAlignment(.trailing)
                            .onSubmit(saveName)
                            .textFieldStyle(.plain)
                            .fixedSize(horizontal: true, vertical: false)
                    }
                }
                
                if !collection.cards.isEmpty {
//                    DetailInfoItem("Collections.name") {
//                        TextField("Collections.name", text: $name)
//                            .multilineTextAlignment(.trailing)
//                            .onSubmit(saveName)
//                            .textFieldStyle(.plain)
//                    }
                    
                    if downloading {
                        DetailInfoItem("Collections.download-progress.\(downloaded).\(downloadTotal)") {
                            ProgressView(value: Double(downloaded), total: Double(max(downloadTotal, 1)))
                        }
                    } else if allImagesCached {
                        DetailInfoItem {
                            Button(role: .destructive) {
                                manager.removeCachedImages(in: collection)
                                updateCacheSize()
                            } label: {
                                HStack {
                                    Label("Collections.remove-downloads.\(ByteCountFormatter.string(fromByteCount: cachedBytes, countStyle: .file))", systemImage: "arrow.down.circle")
                                        .bold().foregroundStyle(.red)
                                    Spacer()
                                }
                                .contentShape(Rectangle())
                            }
                            .buttonStyle(.plain)
                        }
                    } else {
                        DetailInfoItem {
                            Button { downloading = true } label: {
                                HStack {
                                    Label("Collections.cache.\(ByteCountFormatter.string(fromByteCount: Int64(Double(collection.cards.count) * 0.53 * 1024 * 1024), countStyle: .file))", systemImage: "arrow.down.circle")
                                        .bold().foregroundStyle(.tint)
                                    Spacer()
                                }
                                .contentShape(Rectangle())
                            }
                            .buttonStyle(.plain)
                        }
                    }
                }
                
                if !collection.isBuiltIn {
                    DetailInfoItem {
                        Button(role: .destructive) { deleting = true } label: {
                            HStack {
                                Label("General.delete", systemImage: "trash").bold().foregroundStyle(.red)
                                Spacer()
                            }
                            .contentShape(Rectangle())
                        }
                    }
                }
            }
            
//            VStack {
//                HStack {
//                    Text("Collections.name").bold()
//                    Spacer()
//                    
//                }
//                if !collection.cards.isEmpty {
//                    Divider()
//                    if downloading {
//                        VStack(alignment: .leading) {
//                            Text("Collections.download-progress.\(downloaded).\(downloadTotal)")
//                            ProgressView(value: Double(downloaded), total: Double(max(downloadTotal, 1)))
//                        }
//                    } else if allImagesCached {
//                        Button(role: .destructive) {
//                            manager.removeCachedImages(in: collection)
//                            updateCacheSize()
//                        } label: {
//                            HStack {
//                                Label("Collections.remove-downloads.\(ByteCountFormatter.string(fromByteCount: cachedBytes, countStyle: .file))", systemImage: "arrow.down.circle")
//                                    .bold().foregroundStyle(.red)
//                                Spacer()
//                            }
//                            .contentShape(Rectangle())
//                        }
//                        .buttonStyle(.plain)
//                    } else {
//                        Button { downloading = true } label: {
//                            HStack {
//                                Label("Collections.cache.\(ByteCountFormatter.string(fromByteCount: Int64(Double(collection.cards.count) * 0.53 * 1024 * 1024), countStyle: .file))", systemImage: "arrow.down.circle")
//                                    .bold().foregroundStyle(.tint)
//                                Spacer()
//                            }
//                            .contentShape(Rectangle())
//                        }
//                        .buttonStyle(.plain)
//                    }
//                    Divider()
//                    Button(role: .destructive) { deleting = true } label: {
//                        HStack {
//                            Label("General.delete", systemImage: "trash").bold().foregroundStyle(.red)
//                            Spacer()
//                        }
//                        .contentShape(Rectangle())
//                    }
//                    .buttonStyle(.plain)
//                    .padding(.top, platform == .macOS ? 0 : 3)
//                }
//            }
//        }
    }

    private func saveName() {
        let trimmed = name.trimmingCharacters(in: .whitespacesAndNewlines)
        guard collection?.isBuiltIn != true else { return }
        guard !trimmed.isEmpty, var edited = collection else { name = collection?.name ?? ""; return }
        guard edited.name != trimmed else { return }
        edited.name = trimmed; manager.save(edited); name = trimmed
    }
    private func updateCacheSize() {
        let cards = collection?.cards ?? []
        cachedBytes = cards.reduce(0) { total, card in
            total + Int64((try? CardCollectionStore.imageURL(for: card).resourceValues(forKeys: [.fileSizeKey]).fileSize) ?? 0)
        }
        allImagesCached = !cards.isEmpty && cards.allSatisfy { FileManager.default.fileExists(atPath: CardCollectionStore.imageURL(for: $0).path) }
    }
}

private struct CollectionSavedCardRow: View {
    let collectionID: UUID
    let saved: SavedCard
    let layout: Int
    let card: Card?
    let isEditable: Bool

    var body: some View {
        CustomGroupBox {
            Group {
                if layout == 1 {
                    HStack {
                        cardNavigation {
                            HStack {
                                artwork
                                Spacer().frame(maxWidth: 15)
                                cardDescription
                                Spacer(minLength: 0)
                            }
                        }
                        actions
                    }
                } else {
                    VStack {
                        cardNavigation { artwork }
                        Spacer()
                        HStack {
                            Spacer(minLength: 0)
                            cardNavigation { cardDescription }
                            Spacer(minLength: 0)
                            actions
                        }
                    }
                    .wrapIf(true) { content in
                        HStack {
                            Spacer(minLength: 0)
                            content
                            Spacer(minLength: 0)
                        }
                    }
                }
            }
        }
        .wrapIf(card == nil) { $0.redacted(reason: .placeholder) }
    }

    private func cardNavigation<Content: View>(@ViewBuilder content: () -> Content) -> some View {
        NavigationLink { CardDetailView(id: saved.cardID) } label: {
            content().contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .foregroundStyle(.primary)
    }

    @ViewBuilder private var artwork: some View {
        if layout != 3 {
            HStack(spacing: 5) {
                if let card {
                    CardThumbnail(card, showTrainedVersion: saved.trained)
                } else {
                    RoundedRectangle(cornerRadius: 5)
                        .fill(getPlaceholderColor())
                        .aspectRatio(1, contentMode: .fit)
                        .frame(width: 67, height: 67)
                }
            }
        } else if let card {
            CardImage(card, showNavigationHints: false, displayType: saved.trained ? .trainedOnly : .normalOnly)
                .allowsHitTesting(false)
        } else {
            RoundedRectangle(cornerRadius: 10)
                .fill(getPlaceholderColor())
                .aspectRatio(expectedCardRatio, contentMode: .fit)
        }
    }

    private var cardDescription: some View {
        VStack(alignment: layout == 1 ? .leading : .center) {
            if let card {
                HighlightableText(card.name.majorValue ?? "").bold().layoutPriority(1)
                Group {
                    if layout == 1 {
                        cardIdentity(card)
                        Text(saved.trained ? "Collections.card.trained" : "Collections.card.normal")
                    } else {
                        cardIdentity(card) + Text("Typography.bold-dot-seperater").bold() + Text(saved.trained ? "Collections.card.trained" : "Collections.card.normal")
                    }
                }
                .foregroundStyle(.secondary)
                .font(.caption)
            } else {
                Text(verbatim: "Lorem Ipsum Dolor").bold()
                Group {
                    if layout == 1 {
                        Text(verbatim: "Lorem Ipsum Dolor").redacted(reason: .placeholder)
                        Text(verbatim: "Lorem").redacted(reason: .placeholder)
                    } else {
                        Text(verbatim: "Lorem Ipsum Dolor Sit Amet").foregroundStyle(.secondary)
                    }
                }
                .font(.caption)
            }
        }
    }

    @ViewBuilder private var actions: some View {
        if isEditable { CollectionSavedCardActions(collectionID: collectionID, saved: saved, card: card) }
    }

    private func cardIdentity(_ card: Card) -> Text {
        let name = SekaiCache.preCache.character(id: card.characterID)?.fullName.forPreferredLocale() ?? String(localized: "Info.unknown")
        return Text(name) + Text("Typography.bold-dot-seperater").bold() + Text("#\(String(card.id))").fontDesign(.monospaced)
    }
}

private struct CollectionSavedCardActions: View {
    let collectionID: UUID
    let saved: SavedCard
    let card: Card?
    @ObservedObject private var manager = CardCollectionManager.shared
    @State private var targetIsAvailable = false

    private var oppositeSelected: Bool {
        manager.collections.first { $0.id == collectionID }?.cards.contains {
            $0.cardID == saved.cardID && $0.trained != saved.trained
        } ?? true
    }
    private var canSwitch: Bool { targetIsAvailable && !oppositeSelected }
    private var targetURL: URL? { card.flatMap { saved.trained ? $0.beforeTrainingArtURL : $0.afterTrainingArtURL } }

    var body: some View {
        Menu {
            Group {
                Button(saved.trained ? "Collections.change-normal" : "Collections.change-trained", systemImage: "rectangle.2.swap", action: switchTraining)
                    .disabled(!canSwitch)
                Button("Collections.remove-card", systemImage: "minus.circle", role: .destructive) {
                    manager.remove(saved, from: collectionID)
                }
            }
        } label: {
            Image(systemName: "ellipsis.circle").font(platform == .macOS ? .body : .title3)
        }
        .task(id: [targetURL?.absoluteString, oppositeSelected ? "selected" : "unselected"]) {
            guard let card, !oppositeSelected else { targetIsAvailable = false; return }
            if saved.trained { targetIsAvailable = await collectionImageIsAvailable(card.beforeTrainingArtURL) }
            else { targetIsAvailable = card.afterTrainingArtURL != nil }
        }
    }

    private func switchTraining() {
        guard canSwitch, let card,
              let url = saved.trained ? card.beforeTrainingArtURL as URL? : card.afterTrainingArtURL,
              var collection = manager.collections.first(where: { $0.id == collectionID }),
              let index = collection.cards.firstIndex(where: { $0.id == saved.id }) else { return }
        let replacement = SavedCard(cardID: saved.cardID, trained: !saved.trained, title: saved.title, imageURL: url)
        collection.cards[index] = replacement
        manager.save(collection)
        Task { await manager.cache(replacement) }
    }
}

private struct CollectionCardPicker: View {
    let collectionID: UUID
    @ObservedObject private var manager = CardCollectionManager.shared
    @Environment(\.dismissSelection) private var dismissSelection
    @Environment(\.dismiss) private var dismiss
    @State private var cards: [Card]?
    @State private var failed = false
    @State private var query = ""
    @State private var filter = SekaiFilter(forKeys: Card.filterKeys)
    @State private var sorter = SekaiSorter(keyword: Card.applicableSortingTypes.first ?? .id)
    @State private var showFilter = false
    @State private var selectedOnly = false
    @State private var layout = 1
    @State private var retry = 0
    @State private var showAutoSaveTip = true
    @State private var showBatchProgress = false
    @State private var confirmSelectAll = false
    @State private var batch: [Card] = []
    @State private var requested = 0
    @State private var succeeded = 0
    @State private var unavailable = 0
    @State private var existing = 0
    @State private var batchStartedAt: ContinuousClock.Instant?
    @State private var batchCandidateCount = 0
    @State private var estimatedBatchCompletion: ContinuousClock.Instant?
    private var selected: [SavedCard] { manager.collections.first { $0.id == collectionID }?.cards ?? [] }
    private var results: [Card]? {
        let ids = Set(selected.map(\.cardID))
        return cards?.filter(withSekaiFilter: filter).search(for: query).sorted(withSekaiSorter: sorter)
            .filter { !selectedOnly || ids.contains($0.id) }
    }
    private var pending: Int { max(0, requested - succeeded - unavailable - existing) }

    var body: some View {
        Group {
            if let results {
                if results.isEmpty {
                    ContentUnavailableView("Search.no-results", systemImage: "magnifyingglass", description: Text("Search.no-results.description"))
                } else {
                    ScrollView {
                        HStack {
                            Spacer(minLength: 0)
                            LazyVStack {
                                ForEach(results) { card in
                                    CollectionPickerCardRow(card: card, collectionID: collectionID, layout: layout)
                                }
                            }
                            .frame(maxWidth: infoContentMaxWidth)
                            .padding(.horizontal)
                            Spacer(minLength: 0)
                        }
                        .padding(.vertical)
                    }
                    .geometryGroup()
                    .scrollDisablesPopover()
                }
            } else if failed {
                ContentUnavailableView {
                    Label("Cards", systemImage: "person.crop.square.on.square.angled")
                } description: { Text("Search.unavailable.description") } actions: {
                    Button("General.retry") { retry += 1 }
                }
            } else { ProgressView().frame(maxWidth: .infinity, maxHeight: .infinity) }
        }
        .navigationTitle("Cards")
        .searchable(text: $query, prompt: "Search.prompt.\(String(localized: "Cards"))")
        .highlightKeyword($query)
        .wrapIf(results != nil) { content in
            if #available(iOS 26.0, macOS 26.0, *) {
                content.navigationSubtitle(showAutoSaveTip ? Text("Collections.auto-save") : (query.isEmpty && !filter.isFiltering(referencing: Card.filterKeys) ? Text("Card.count.\(results?.count ?? 0)") : Text("Search.result.\(results?.count ?? 0)")))
            } else { content }
        }
        .toolbar {
            if requested > 0 {
                ToolbarItem {
                    Button { showBatchProgress.toggle() } label: {
                        if pending > 0 { ProgressView().controlSize(.small) }
                        else { Image(systemName: "checkmark.circle") }
                    }
                    .popover(isPresented: $showBatchProgress) { batchProgress }
                }
            }
            ToolbarItem {
                Menu {
                    #if !os(macOS)
                    Section {
                        Button(showFilter ? "Collections.filter.hide" : "Collections.filter.show", systemImage: "line.3.horizontal.decrease") { showFilter.toggle() }
                        SorterPickerView(sorter: $sorter, allOptions: Card.applicableSortingTypes)
                        LayoutPicker(selection: $layout, options: [("Filter.view.list", "list.bullet", 1), ("Filter.view.gallery", "text.below.rectangle", 3)])
                    }
                    #endif
                    Section {
                        Menu {
                            Section("Search.result.\(results?.count ?? 0)") {
                                Button("Collections.select-all", systemImage: "checkmark.circle") {
                                    if (results?.count ?? 0) > 500 { confirmSelectAll = true }
                                    else { selectAll() }
                                }
                                Button("Collections.deselect-results", systemImage: "circle.slash", action: deselectAll)
                            }
                            .disabled(results?.isEmpty != false || !batch.isEmpty)
                        } label: { Label("Collections.selection", systemImage: "checklist") }
                        Toggle(isOn: $selectedOnly) { Label("Collections.selected-only", systemImage: "rectangle.on.rectangle.dashed") }
                    }
                } label: { Image(systemName: "ellipsis") }
            }
            if #available(iOS 26.0, macOS 26.0, *) { ToolbarSpacer() }
            #if os(macOS)
            ToolbarItemGroup {
                FilterAndSorterPicker(showFilterSheet: $showFilter, sorter: $sorter,
                    isFiltering: filter.isFiltering(referencing: Card.filterKeys), sorterKeywords: Card.applicableSortingTypes,
                    hasEndingDate: Card.hasEndingDate)
            }
            #else
            ToolbarItem {
                Button("General.done", systemImage: "checkmark") {
                    if let dismissSelection { dismissSelection() } else { dismiss() }
                }
                .wrapIf(true) { button in
                    if #available(iOS 26.0, *) { button.buttonStyle(.glassProminent) }
                    else { button.buttonStyle(.borderedProminent) }
                }
            }
            #endif
        }
        .withSystemBackground()
        .wrapIf(platform == .macOS) { content in
            content.inspector(isPresented: $showFilter) { FilterView(filter: $filter, keys: Card.filterKeys) }
        } else: { content in
            content.sheet(isPresented: $showFilter) {
                FilterView(filter: $filter, keys: Card.filterKeys)
                    .presentationDetents([.medium, .large])
                    .presentationDragIndicator(.visible)
                    .presentationBackgroundInteraction(.enabled)
            }
        }
        .onDisappear { showFilter = false }
        .task(id: retry) {
            failed = false
            let fetched = await Card.allWithCache()
            guard !Task.isCancelled else { return }
            cards = fetched; failed = fetched == nil
        }
        .task {
            if platform != .macOS { try? await Task.sleep(for: .seconds(2)) }
            withAnimation { showAutoSaveTip = false }
        }
        .task(id: batch) {
            guard !batch.isEmpty else { return }
            let selectedIDs = Set(selected.map(\.id))
            var candidates: [SavedCard] = []
            var alreadySelected = 0
            var missing = 0
            for card in batch {
                for trained in [false, true] {
                    let savedID = "\(card.id)-\(trained ? "trained" : "normal")"
                    if selectedIDs.contains(savedID) { alreadySelected += 1; continue }
                    guard let url = trained ? card.afterTrainingArtURL : card.beforeTrainingArtURL as URL? else { missing += 1; continue }
                    candidates.append(SavedCard(cardID: card.id, trained: trained, title: card.name.majorValue ?? "#\(card.id)", imageURL: url))
                }
            }
            existing = alreadySelected
            unavailable = missing
            batchCandidateCount = candidates.count
            batchStartedAt = ContinuousClock().now
            estimatedBatchCompletion = nil
            var imagesToCache: [SavedCard] = []
            defer {
                manager.cacheInBackground(imagesToCache)
                batchStartedAt = nil
                estimatedBatchCompletion = nil
                batch = []
            }
            await CardCollectionBatchSelection.process(candidates) { available, rejected in
                defer { updateBatchEstimate() }
                unavailable += rejected
                guard !available.isEmpty else { return }
                guard let added = manager.add(available, to: collectionID) else {
                    unavailable += available.count
                    return
                }
                succeeded += added.count
                existing += available.count - added.count
                imagesToCache.append(contentsOf: added)
            }
        }
        .alert("Collections.select-all-confirm.\(results?.count ?? 0)", isPresented: $confirmSelectAll) {
            Button("Collections.select-all", action: selectAll)
            Button("General.cancel", role: .cancel) { }
        } message: { Text("Collections.select-all-description") }
        .collectionErrorAlert()
    }

    private var batchProgress: some View {
        VStack(alignment: .leading, spacing: 7) {
            HStack {
                GeometryReader { geometry in
                    HStack(spacing: 0) {
                        Rectangle().fill(.green).frame(width: geometry.size.width * Double(succeeded) / Double(max(requested, 1)))
                        Rectangle().fill(.red).frame(width: geometry.size.width * Double(unavailable) / Double(max(requested, 1)))
                        Rectangle().fill(.yellow).frame(width: geometry.size.width * Double(existing) / Double(max(requested, 1)))
                        Rectangle().fill(.gray)
                    }.clipShape(Capsule())
                }.frame(height: 10)
                Text(verbatim: "/\(requested)")
            }
            progressRow("Collections.batch.succeeded", symbol: "checkmark.circle", color: .green, count: succeeded)
            progressRow("Collections.batch.failed", symbol: "xmark.circle", color: .red, count: unavailable)
            progressRow("Collections.batch.existing", symbol: "exclamationmark.circle", color: .yellow, count: existing)
            progressRow("Collections.batch.pending", symbol: "ellipsis.circle", color: .gray, count: pending)
            Divider()
            if pending == 0 {
                Label("Collections.batch.done", systemImage: "externaldrive.badge.checkmark")
            } else {
                TimelineView(.periodic(from: .now, by: 1)) { _ in
                    HStack {
                        ProgressView()
                            .controlSize(.small)
                        Text("Collections.batch.loading")
                        Spacer()
                        if let batchCountdown {
                            Text(verbatim: batchCountdown)
                                .foregroundStyle(.secondary)
                                .monospacedDigit()
                        }
                    }
                }
            }
        }
        .padding()
        .frame(width: 300)
        .presentationCompactAdaptation(.popover)
    }
    private func progressRow(_ title: LocalizedStringKey, symbol: String, color: Color, count: Int) -> some View {
        HStack {
            Label {
                Text(title)
            } icon: {
                Image(systemName: symbol)
                    .foregroundStyle(color)
            }
            Spacer()
            Text(verbatim: "\(count), \((Double(count) / Double(max(requested, 1)) * 100).formatted(.number.precision(.fractionLength(1))))%")
                .foregroundStyle(.secondary)
        }
    }
    private func updateBatchEstimate() {
        let completed = batchCandidateCount - pending
        guard let batchStartedAt, completed > 0, pending > 0 else {
            estimatedBatchCompletion = nil
            return
        }
        let now = ContinuousClock().now
        let remaining = batchStartedAt.duration(to: now) / completed * pending
        estimatedBatchCompletion = now.advanced(by: remaining)
    }
    private var batchCountdown: String? {
        guard let estimatedBatchCompletion else { return nil }
        let duration = ContinuousClock().now.duration(to: estimatedBatchCompletion).components
        let seconds = max(1, duration.seconds + (duration.attoseconds > 0 ? 1 : 0))
        return String(format: "-%02lld:%02lld", seconds / 60, seconds % 60)
    }
    private func selectAll() {
        guard batch.isEmpty, let results, !results.isEmpty else { return }
        succeeded = 0; unavailable = 0; existing = 0
        batchStartedAt = nil
        batchCandidateCount = 0
        estimatedBatchCompletion = nil
        requested = results.count * 2
        batch = results
    }
    private func deselectAll() {
        let ids = Set((results ?? []).map(\.id))
        guard var collection = manager.collections.first(where: { $0.id == collectionID }) else { return }
        collection.cards.removeAll { ids.contains($0.cardID) }
        manager.save(collection)
    }
}

private struct CollectionPickerCardRow: View {
    let card: Card
    let collectionID: UUID
    let layout: Int
    @ObservedObject private var manager = CardCollectionManager.shared
    @State private var normalAvailable: Bool? = nil
    @State private var trainedAvailable: Bool? = nil
    @State private var normalPreviewAvailable = true
    private var selected: [SavedCard] { manager.collections.first { $0.id == collectionID }?.cards ?? [] }
    private var hasSelection: Bool { selected.contains { $0.cardID == card.id } }

    var body: some View {
        CustomGroupBox(strokeLineWidth: hasSelection ? 3 : 0) {
            CustomStack(axis: platform == .macOS ? .horizontal : .vertical) {
                CustomStack(axis: layout == 1 ? .horizontal : .vertical) {
                    if layout == 1 {
                        HStack(spacing: 5) {
                            if normalPreviewAvailable {
                                CardThumbnail(card, sideLength: 67, onFailure: { normalPreviewAvailable = false })
                            }
                            if card.afterTrainingThumbnailURL != nil { CardThumbnail(card, showTrainedVersion: true, sideLength: 67) }
                        }
                        Spacer().frame(maxWidth: 15)
                    } else {
                        CardImage(card).wrapIf(platform != .macOS) { $0.allowsHitTesting(false) }
                        Spacer()
                    }
                    HStack {
                        if layout == 3 && (normalAvailable == nil || trainedAvailable == nil) {
                            ProgressView()
                                .controlSize(.small)
                        }
                        VStack(alignment: layout == 1 ? .leading : .center) {
                            HighlightableText(card.name.majorValue ?? "#\(card.id)").bold().layoutPriority(1)
                            (Text(SekaiCache.preCache.character(id: card.characterID)?.fullName.forPreferredLocale() ?? String(localized: "Info.unknown")) + Text("Typography.bold-dot-seperater").bold() + Text("#\(card.id)").monospaced())
                                .foregroundStyle(.secondary).font(.caption)
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: layout == 1 ? .leading : .center)
                    .multilineTextAlignment(layout == 1 ? .leading : .center)
                    Spacer(minLength: 0)
                    if layout == 1 && (normalAvailable == nil || trainedAvailable == nil) { ProgressView()
                            .controlSize(.small)
                    }
                }
                .padding(.bottom, 2)
                
                #if os(macOS)
                VStack(alignment: .trailing) {
                    choice(trained: false, available: normalAvailable)
                    choice(trained: true, available: trainedAvailable)
                }
                #else
                HStack {
                    choice(trained: false, available: normalAvailable)
                    choice(trained: true, available: trainedAvailable)
                }
                #endif
                
            }
        }
        .animation(.easeInOut(duration: 0.2), value: hasSelection)
        .task(id: [card.beforeTrainingArtURL, card.afterTrainingArtURL]) {
            normalAvailable = nil
            trainedAvailable = nil
            normalPreviewAvailable = true
            async let normal = collectionImageIsAvailable(card.beforeTrainingArtURL)
            async let trained = collectionImageIsAvailable(card.afterTrainingArtURL)
            let availability = await (normal, trained)
            guard !Task.isCancelled else { return }
            normalAvailable = availability.0; trainedAvailable = availability.1
        }
    }

    private func choice(trained: Bool, available: Bool?) -> some View {
        let isSelected = selected.contains { $0.cardID == card.id && $0.trained == trained }
        return Button {
            guard available == true else { return }
            if let saved = selected.first(where: { $0.cardID == card.id && $0.trained == trained }) {
                manager.remove(saved, from: collectionID)
            } else {
                Task { await manager.add(card, trained: trained, to: collectionID) }
            }
        } label: {
            CollectionSelectionCapsule(active: isSelected, unavailable: available == false) {
                Text(trained ? "Collections.card.trained" : "Collections.card.normal").bold()
                    .frame(maxWidth: platform == .macOS ? nil : .infinity)
            }
        }
        .buttonStyle(.plain)
        .accessibilityAddTraits(isSelected ? .isSelected : [])
    }
}

private struct CollectionSelectionCapsule<Content: View>: View {
    let active: Bool
    let unavailable: Bool
    @ViewBuilder var content: () -> Content
    @State private var showUnavailable = false

    var body: some View {
        Group {
            if showUnavailable {
                Text("Collection.picker.not-available")
                .bold()
                .frame(maxWidth: platform == .macOS ? nil : .infinity) }
            else { content().strikethrough(unavailable) }
        }
        .foregroundStyle(active && !unavailable ? .white : .gray)
        .frame(height: filterItemHeight)
        .padding(.horizontal, platform == .macOS ? 10 : nil)
        .background {
            if unavailable { Capsule().strokeBorder(.gray, lineWidth: 2) }
            else { Capsule().fill(active ? Color.accentColor : getTertiaryLabelColor()) }
        }
        .contentShape(Capsule())
        .wrapIf(unavailable) { content in
            content.onTapGesture { withAnimation { showUnavailable = true } }
        }
        .task(id: showUnavailable) {
            guard showUnavailable else { return }
            try? await Task.sleep(for: .seconds(2))
            withAnimation { showUnavailable = false }
        }
        .animation(.easeInOut(duration: 0.05), value: active)
    }
}

private func collectionImageIsAvailable(_ url: URL?) async -> Bool {
    await CardCollectionImageAvailability.shared.isAvailable(url)
}

private struct CollectionShareView: View {
    let collection: SavedCardCollection
    @Environment(\.dismiss) private var dismiss
    @AppStorage("hideCollectionNameWhileSharing") private var hideName = false
    @State private var code = ""
    @State private var link: URL?
    @State private var qrCode: CGImage?
    @State private var copiedCode = false
    @State private var copiedLink = false
    @State private var showHelp = false

    var body: some View {
        Form {
            Section {
                if let qrCode {
                    HStack {
                        Spacer()
                        Image(decorative: qrCode, scale: 3).resizable().interpolation(.none)
                            .scaledToFit().frame(width: 200, height: 200)
                        Spacer()
                    }
                }
                Text(code).textSelection(.enabled).fontDesign(.monospaced).foregroundStyle(.secondary)
            }
            Section {
                Text("Collections.share.description")
                Button {
                    copyStringToClipboard(code); copiedCode = true
                } label: {
                    ZStack {
                        Label("Collections.share.copy-code", systemImage: "doc.on.doc").opacity(copiedCode ? 0 : 1)
                        Label("Collections.share.copied", systemImage: "checkmark.circle").foregroundStyle(.green).opacity(copiedCode ? 1 : 0)
                    }
                }
                Button {
                    if let link { copyStringToClipboard(link.absoluteString); copiedLink = true }
                } label: {
                    ZStack {
                        Label("Collections.share.copy-link", systemImage: "link").opacity(copiedLink ? 0 : 1)
                        Label("Collections.share.link-copied", systemImage: "checkmark.circle").foregroundStyle(.green).opacity(copiedLink ? 1 : 0)
                    }
                }
                if let link { ShareLink(item: link) }
            }
            Section {
                Toggle("Collections.share.hide-name", isOn: $hideName)
            } footer: {
                Button("Collections.share.learn-more") { showHelp = true }
                    .font(platform == .macOS ? .body : .caption)
            }
        }
        .formStyle(.grouped)
        .frame(minHeight: 300)
        .wrapIf(platform != .macOS) { $0.navigationTitle(collection.name) }
        .toolbar {
            ToolbarItem(placement: .confirmationAction) {
                #if os(macOS)
                Button("General.done") { dismiss() }
                #else
                Button("General.done", systemImage: "checkmark") { dismiss() }
                #endif
            }
        }
        .animation(.easeInOut(duration: 0.4), value: copiedCode)
        .animation(.easeInOut(duration: 0.4), value: copiedLink)
        .onAppear(perform: updateContent)
        .onChange(of: hideName, updateContent)
        .task(id: copiedCode) {
            guard copiedCode else { return }
            try? await Task.sleep(for: .seconds(1)); copiedCode = false
        }
        .task(id: copiedLink) {
            guard copiedLink else { return }
            try? await Task.sleep(for: .seconds(1)); copiedLink = false
        }
        .sheet(isPresented: $showHelp) {
            NavigationStack {
                ScrollView { Text("Collections.share.help").padding() }
                    .navigationTitle("Collections.share.learn-more")
                    .toolbar { ToolbarItem(placement: .confirmationAction) { Button("General.done") { showHelp = false } } }
            }.frame(minWidth: 300, minHeight: 250)
        }
    }
    private func updateContent() {
        code = collectionCodePrefix + encodeCollection(.init(name: hideName ? "" : collection.name, cardList: collection.cards.map { $0.trained ? -$0.cardID : $0.cardID }))
        var components = URLComponents()
        components.scheme = "greatsekai"; components.host = "collections"
        components.queryItems = [URLQueryItem(name: "code", value: code)]
        link = components.url
        let filter = CIFilter.qrCodeGenerator()
        filter.message = Data((link?.absoluteString ?? code).utf8)
        filter.correctionLevel = "L"
        qrCode = filter.outputImage.flatMap { image in
            CIContext().createCGImage(image.transformed(by: CGAffineTransform(scaleX: 3, y: 3)), from: image.extent.applying(CGAffineTransform(scaleX: 3, y: 3)))
        }
    }
}

private extension View {
    func collectionErrorAlert() -> some View {
        alert("Collections.error", isPresented: Binding(get: { CardCollectionManager.shared.error != nil }, set: { if !$0 { CardCollectionManager.shared.error = nil } })) {
            Button("General.ok") { CardCollectionManager.shared.error = nil }
        } message: { Text(CardCollectionManager.shared.error ?? "") }
    }
}

struct AddCardToCollectionMenu: View {
    let card: Card
    @ObservedObject private var manager = CardCollectionManager.shared
    var body: some View {
        Menu("Collections.add-card", systemImage: "rectangle.stack.badge.plus") {
            if manager.userCollections.isEmpty { Text("Collections.create-first") }
            ForEach(manager.userCollections) { collection in
                Menu(collection.name) {
                    Button("Collections.card.normal") { Task { await manager.add(card, trained: false, to: collection.id) } }
                    if card.canTrain { Button("Collections.card.trained") { Task { await manager.add(card, trained: true, to: collection.id) } } }
                }
            }
        }
    }
}

#Preview("Collections") {
    NavigationStack { CardCollectionsView() }
}

#Preview("Collection sharing") {
    NavigationStack { CollectionShareView(collection: SavedCardCollection(name: "Collection", cards: [])) }
        .frame(width: 500, height: 700)
}
