// Story selection and transcript layout adapted from Greatdori’s StoryViewer,
// StoryCardView and StoryDetailView (Apache-2.0, Greatdori project authors).
// https://greatdori.com/LICENSE.txt
import SekaiKit
import SwiftUI
import SDWebImageSwiftUI

struct StoryViewerView: View {
    @State private var kind = Episode.Kind.event
    @State private var locale = SekaiLocale.primaryLocale
    @State private var episodes: [Episode]?
    @State private var selectedParent: Int?
    @State private var events: [SekaiKit.Event] = []
    @State private var parentNames: [Int: String] = [:]
    @State private var choosingChapter = false
    @State private var chapterQuery = ""
    @State private var failed = false
    @State private var query = ""
    @State private var retryID = 0
    @State private var loadedKind: Episode.Kind?
    @State private var loadedRequestID: String?
    private var requestID: String { "\(kind.rawValue)-\(locale.rawValue)-\(retryID)" }
    private var groups: [Int] { Array(Set((episodes ?? []).map(\.parentID))).sorted(by: >) }
    private var displayed: [Episode] {
        (episodes ?? []).filter { (selectedParent == nil || $0.parentID == selectedParent) && (query.isEmpty || $0.title.localizedCaseInsensitiveContains(query)) }
    }
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                CustomGroupBox(cornerRadius: 20) {
                    VStack {
                        ListItem {
                            Text("Story.kind").bold()
                        } value: {
                            Picker("", selection: $kind) {
                                ForEach(Episode.Kind.allCases, id: \.self) { Text($0.localizedName).tag($0) }
                            }.labelsHidden()
                        }
                        Divider()
                        ListItem {
                            Text(kind == .event ? "Story.event" : kind == .card ? "Story.card" : "Story.chapter").bold()
                        } value: {
                            Button {
                                chapterQuery = ""; choosingChapter = true
                            } label: {
                                HStack {
                                    Text(selectedParent.map(groupTitle) ?? String(localized: "Story.all-chapters"))
                                        .multilineTextAlignment(.trailing)
                                    Image(systemName: "chevron.up.chevron.down").font(.footnote)
                                }
                            }.buttonStyle(.plain).foregroundStyle(.tint)
                            .disabled(episodes == nil)
                        }
                        Divider()
                        ListItem {
                            Text("Story.region").bold()
                        } value: {
                            Picker("", selection: $locale) {
                                ForEach(SekaiLocale.allCases, id: \.self) { Text($0.rawValue.uppercased()).tag($0) }
                            }.labelsHidden()
                        }
                    }
                }
                DetailSectionsSpacer(height: 15)
                if episodes != nil {
                    if displayed.isEmpty { ContentUnavailableView.search(text: query) }
                    LazyVStack {
                        ForEach(displayed) { EpisodeRow(episode: $0) }
                    }
                } else if failed {
                    ContentUnavailableView {
                        Label("Story.unavailable", systemImage: "text.bubble")
                    } actions: { Button("General.retry") { retryID += 1 } }
                } else { ProgressView() }
            }.frame(maxWidth: infoContentMaxWidth).padding().frame(maxWidth: .infinity)
        }
        .navigationTitle("App.tools.story-viewer")
        .searchable(text: $query)
        .selectionWindow(isPresented: $choosingChapter, title: "Story.select-chapter") {
            NavigationStack {
                if kind == .event {
                    EventPicker(
                        selection: Binding {
                            events.first { $0.id == selectedParent }
                        } set: { event in
                            selectedParent = event?.id
                            if let event {
                                events.removeAll { $0.id == event.id }
                                events.append(event)
                                parentNames[event.id] = event.title.localizedData?[locale] ?? event.title.majorValue ?? ""
                            }
                        },
                        locale: locale,
                        availableEventIDs: Set(groups),
                        emptySelectionTitle: "Story.all-chapters"
                    )
                } else {
                    List {
                        Button("Story.all-chapters") { selectedParent = nil; choosingChapter = false }
                        ForEach(groups.filter { chapterQuery.isEmpty || groupTitle($0).localizedCaseInsensitiveContains(chapterQuery) }, id: \.self) { id in
                            Button {
                                selectedParent = id; choosingChapter = false
                            } label: {
                                HStack {
                                    Text(groupTitle(id)).foregroundStyle(.primary)
                                    Spacer()
                                    if id == selectedParent { Image(systemName: "checkmark").foregroundStyle(.tint) }
                                }.padding(.vertical, 4)
                            }
                        }
                    }
                    .searchable(text: $chapterQuery)
                    .navigationTitle("Story.chapter")
                    .toolbar { ToolbarItem { Button("General.done") { choosingChapter = false } } }
                }
            }.frame(minWidth: platform == .macOS ? 500 : nil, minHeight: 400)
        }
        .withSystemBackground()
        .task(id: requestID) {
            guard loadedRequestID != requestID else { return }
            await load()
        }
    }
    private func groupTitle(_ id: Int) -> String {
        let title = episodes?.first { $0.parentID == id }?.chapterTitle ?? ""
        return kind == .unit ? title : "#\(id) · \(parentNames[id] ?? "")"
    }
    private func load() async {
        episodes = nil
        failed = false
        events = []
        parentNames = [:]
        let currentRequestID = requestID
        let selectedKind = kind
        let selectedLocale = locale
        let result = await Episode.all(in: selectedLocale, kind: selectedKind)
        guard !Task.isCancelled else { return }
        guard let result else {
            failed = true
            return
        }
        switch selectedKind {
        case .event:
            if let regionalEvents = await SekaiKit.Event.allInLocale(selectedLocale) {
                guard !Task.isCancelled else { return }
                events = regionalEvents
                parentNames = Dictionary(regionalEvents.map { ($0.id, $0.title.majorValue ?? "") }, uniquingKeysWith: { first, _ in first })
            }
        case .card:
            if let cards = await Card.allWithCache() {
                guard !Task.isCancelled else { return }
                parentNames = Dictionary(cards.map { ($0.id, $0.name.localizedData?[selectedLocale] ?? $0.name.majorValue ?? "") }, uniquingKeysWith: { first, _ in first })
            }
        case .unit: break
        }
        guard !Task.isCancelled else { return }
        episodes = result.sorted {
            $0.parentID == $1.parentID ? $0.number < $1.number : $0.parentID > $1.parentID
        }
        if loadedKind != selectedKind || selectedParent.map({ !groups.contains($0) }) == true {
            selectedParent = groups.first
        }
        loadedKind = selectedKind
        loadedRequestID = currentRequestID
    }

}

struct EpisodeRow: View {
    let episode: Episode
    var body: some View {
        NavigationLink { StoryDetailView(episode: episode) } label: {
            CustomGroupBox(cornerRadius: 20) {
                HStack(spacing: 12) {
                    VStack(alignment: .leading, spacing: 5) {
                        if episode.kind == .card {
                            Text("Story.episode.\(episode.number)")
                            Text(episode.title).font(.title3).bold()
                        } else {
                            (Text("Story.episode.\(episode.number)") + Text(" · " + episode.title)).font(.headline)
                        }
                    }
                    Spacer()
                    if let image = episode.imageURL {
                        WebImage(url: image) { $0.resizable().scaledToFit() } placeholder: {
                            RoundedRectangle(cornerRadius: 5).fill(getPlaceholderColor())
                        }.frame(width: 110, height: 60).clipShape(RoundedRectangle(cornerRadius: 5))
                    }
                }
            }
        }.buttonStyle(.plain)
    }
}

struct EventEpisodesSection: View {
    let event: SekaiKit.Event
    @State private var locale = SekaiLocale.primaryLocale
    @State private var episodes: [Episode]?
    @State private var failed = false
    private var locales: [SekaiLocale] {
        SekaiLocale.allCases.filter { event.title.localizedData?.availableInLocale($0) ?? ($0 == .primaryLocale) }
    }
    var body: some View {
        Section {
            VStack {
                if let episodes {
                    if episodes.isEmpty {
                        Text("Story.no-episodes")
                        .foregroundStyle(.secondary)
                    }
                    ForEach(episodes) {
                        EpisodeRow(episode: $0)
                    }
                } else if failed {
                    Button("General.retry") { Task { await load() } }
                } else {
                    CustomGroupBox {
                        HStack {
                            Spacer()
                            ProgressView()
                            Spacer()
                        }
                    }
                }
            }.frame(maxWidth: infoContentMaxWidth)
        } header: {
            HStack {
                Text("Event.episodes").font(.title2).bold()
                if locales.count > 1 { DetailSectionOptionPicker(selection: $locale, options: locales) }
                Spacer()
            }.frame(maxWidth: infoContentMaxWidth).detailSectionHeader()
        }
        .task(id: "\(event.id)-\(locale.rawValue)") {
            if !locales.contains(locale), let first = locales.first { locale = first; return }
            await load()
        }
    }
    private func load() async {
        episodes = nil; failed = false
        let all = await Episode.all(in: locale, kind: .event)
        guard !Task.isCancelled else { return }
        episodes = all?.filter { $0.parentID == event.id }.sorted { $0.number < $1.number }
        failed = all == nil
    }
}
