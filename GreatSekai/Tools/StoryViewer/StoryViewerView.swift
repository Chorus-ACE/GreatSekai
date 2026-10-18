// Story selection and transcript layout adapted from Greatdori’s StoryViewer,
// StoryCardView and StoryDetailView (Apache-2.0, Greatdori project authors).
// https://greatdori.com/LICENSE.txt
import AVKit
import SekaiKit
import SwiftUI
import SDWebImageSwiftUI

struct StoryViewerView: View {
    @State private var kind = Episode.Kind.event
    @State private var locale = SekaiLocale.primaryLocale
    @State private var episodes: [Episode]?
    @State private var selectedParent: Int?
    @State private var parentNames: [Int: String] = [:]
    @State private var choosingChapter = false
    @State private var chapterQuery = ""
    @State private var failed = false
    @State private var query = ""
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
                    } actions: { Button("General.retry") { Task { await load() } } }
                } else { ProgressView() }
            }.frame(maxWidth: infoContentMaxWidth).padding().frame(maxWidth: .infinity)
        }
        .navigationTitle("App.tools.story-viewer")
        .searchable(text: $query)
        .sheet(isPresented: $choosingChapter) {
            NavigationStack {
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
            }.frame(minWidth: platform == .macOS ? 500 : nil, minHeight: 400)
        }
        .task(id: "\(kind.rawValue)-\(locale.rawValue)") { await load() }
    }
    private func groupTitle(_ id: Int) -> String {
        let title = episodes?.first { $0.parentID == id }?.chapterTitle ?? ""
        return kind == .unit ? title : "#\(id) · \(parentNames[id] ?? "")"
    }
    private func load() async {
        episodes = nil; failed = false; selectedParent = nil
        let result = await Episode.all(in: locale, kind: kind)
        guard !Task.isCancelled else { return }
        episodes = result
        failed = result == nil
        selectedParent = groups.first
        parentNames = [:]
        switch kind {
        case .event:
            if let events = await SekaiKit.Event.allWithCache(), !Task.isCancelled {
                parentNames = Dictionary(events.map { ($0.id, $0.title.localizedData?[locale] ?? $0.title.majorValue ?? "") }, uniquingKeysWith: { a, _ in a })
            }
        case .card:
            if let cards = await Card.allWithCache(), !Task.isCancelled {
                parentNames = Dictionary(cards.map { ($0.id, $0.name.localizedData?[locale] ?? $0.name.majorValue ?? "") }, uniquingKeysWith: { a, _ in a })
            }
        case .unit: break
        }
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
                    if episodes.isEmpty { Text("Story.no-episodes").foregroundStyle(.secondary) }
                    ForEach(episodes) { EpisodeRow(episode: $0) }
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

struct StoryDetailView: View {
    let episode: Episode
    @State private var transcript: StoryTranscript?
    @State private var failed = false
    @State private var query = ""
    @State private var player = AVPlayer()
    @AppStorage("StoryViewerFontSize") private var fontSize = 16.0
    var body: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 18) {
                if let transcript {
                    if transcript.lines.isEmpty { Text("Story.no-dialogue").foregroundStyle(.secondary) }
                    ForEach(transcript.lines.filter { query.isEmpty || $0.text.localizedCaseInsensitiveContains(query) || $0.speaker.localizedCaseInsensitiveContains(query) }) { line in
                        if line.speaker.isEmpty {
                            Text(line.text).font(.system(size: fontSize)).underline()
                                .multilineTextAlignment(.center).textSelection(.enabled)
                                .frame(maxWidth: .infinity).padding(.vertical)
                        } else {
                            CustomGroupBox(cornerRadius: 20) {
                                VStack(alignment: .leading, spacing: 6) {
                                    HStack {
                                        if let ids = line.characterIDs, ids.count == 1, let id = ids.first,
                                           let icon = SekaiKit.Character.iconImageURL(forID: id) {
                                            WebImage(url: icon) { $0.resizable().scaledToFit() } placeholder: {
                                                Image(systemName: "person.crop.circle")
                                            }.frame(width: 20, height: 20)
                                        } else {
                                            Image(systemName: (line.characterIDs?.count ?? 0) > 1 ? "person.3.fill" : "person.crop.circle")
                                                .bold().frame(width: 20, height: 20)
                                        }
                                        Text(line.speaker).font(.headline)
                                        Spacer()
                                        if let url = line.voiceURL {
                                            Button("Story.play-voice", systemImage: "speaker.wave.2") {
                                                player.replaceCurrentItem(with: AVPlayerItem(url: url)); player.play()
                                            }.labelStyle(.iconOnly).buttonStyle(.plain)
                                        }
                                    }
                                    Text(line.text).font(.system(size: fontSize))
                                        .multilineTextAlignment(.leading).fixedSize(horizontal: false, vertical: true)
                                        .textSelection(.enabled)
                                }.frame(maxWidth: .infinity, alignment: .leading)
                            }
                        }
                    }
                } else if failed {
                    ContentUnavailableView {
                        Label("Story.unavailable", systemImage: "text.bubble")
                    } actions: { Button("General.retry") { Task { await load() } } }
                } else { ProgressView().frame(maxWidth: .infinity) }
            }.frame(maxWidth: infoContentMaxWidth).padding().frame(maxWidth: .infinity)
        }
        .navigationTitle(episode.title)
        .searchable(text: $query)
        .toolbar {
            ToolbarItem {
                Menu("Story.text-size", systemImage: "textformat.size") {
                    Button("Story.text-larger") { fontSize = min(fontSize + 2, 32) }
                    Button("Story.text-smaller") { fontSize = max(fontSize - 2, 12) }
                }
            }
        }
        .task(id: episode.id) { await load() }
        .onDisappear { player.pause(); player.replaceCurrentItem(with: nil) }
    }
    private func load() async {
        transcript = nil; failed = false
        let result = await SekaiCache.withDirectCache(id: "Transcript-v2-\(episode.id)", trait: .invocationElidable) {
            await StoryTranscript.load(episode)
        }
        guard !Task.isCancelled else { return }
        transcript = result; failed = result == nil
    }
}
