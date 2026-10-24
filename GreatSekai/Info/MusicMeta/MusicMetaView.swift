import SekaiKit
import SwiftUI

struct MusicMetaView: View {
    @Environment(\.horizontalSizeClass) private var sizeClass
    @State private var rows: [Row]?
    @State private var failed = false
    @State private var query = ""
    @State private var sortOrder = [KeyPathComparator(\Row.musicID)]
    private var displayedRows: [Row] {
        (rows ?? []).filter { query.isEmpty || $0.title.localizedCaseInsensitiveContains(query) || String($0.song.id) == query }
            .sorted { lhs, rhs in
                for comparator in sortOrder {
                    let result = comparator.compare(lhs, rhs)
                    if result != .orderedSame { return result == .orderedAscending }
                }
                return lhs.musicID == rhs.musicID ? lhs.meta.difficulty < rhs.meta.difficulty : lhs.musicID < rhs.musicID
            }
    }
    var body: some View {
        Group {
            if rows != nil {
                if sizeClass == .regular || platform == .macOS {
                    Table(displayedRows, sortOrder: $sortOrder) {
                        TableColumn("ID", value: \.musicID) {
                            Text($0.musicID.formatted())
                                .foregroundStyle(.secondary)
                        }
                        .width(50)
                        TableColumn("Music-meta.song") { row in
                            NavigationLink(destination: {
                                SongDetailView(id: row.song.id)
                            }, label: {
                                HighlightableText(row.title)
                                    .multilineTextAlignment(.leading)
                            })
                            .foregroundStyle(.primary)
                        }
                        TableColumn("Music-meta.difficulty", value: \.difficultyRank) { row in
                            SongDifficultyIndicator(difficulty: row.meta.difficulty, level: row.level)
                                .accessibilityLabel(String("\(row.meta.difficulty.name) \(row.level)"))
                        }.width(SongDifficultyIndicator.diameter + 30)
                        TableColumn("Music-meta.duration", value: \.duration) { Text($0.meta.duration, format: .number.precision(.fractionLength(1))) }
                        TableColumn("Music-meta.notes", value: \.notes) { Text($0.notes.formatted()) }
                        TableColumn("Music-meta.base", value: \.baseScore) { Text($0.meta.baseScore, format: .number.precision(.fractionLength(3))) }
                        TableColumn("Music-meta.fever", value: \.feverScore) { Text($0.meta.feverScore, format: .number.precision(.fractionLength(3))) }
                        TableColumn("Music-meta.event", value: \.eventRate) { Text($0.meta.eventRate, format: .number.precision(.fractionLength(2))) }
                    }
                    // Replacing the table avoids AppKit diffing thousands of row moves
                    // and repeatedly measuring automatic row heights after a sort.
                    .id(sortOrder)
                    .id(query)
                } else {
                    ScrollView {
                        LazyVStack {
                            ForEach(displayedRows) { row in
                                NavigationLink { SongDetailView(id: row.song.id) } label: {
                                    CustomGroupBox {
                                        VStack(alignment: .leading) {
                                            HStack {
                                                HighlightableText(row.title)
                                                    .font(.headline)
                                                Spacer()
                                                SongDifficultyIndicator(difficulty: row.meta.difficulty, level: row.level)
                                            }
                                            
                                            LazyVGrid(columns: [GridItem(.adaptive(minimum: 50, maximum: 200))], alignment: .leading) {
                                                metric(
                                                    title: "Music-meta.duration",
                                                    symbol: "timer",
                                                    value: row.meta.duration.formatted(.number.precision(.fractionLength(1))) + "s"
                                                )
                                                metric(
                                                    title: "Music-meta.notes",
                                                    symbol: "music.quarternote.3",
                                                    value: row.notes.formatted()
                                                )
                                                metric(
                                                    title: "Music-meta.base",
                                                    symbol: "number.sign",
                                                    value: row.meta.baseScore.formatted(.number.precision(.fractionLength(3)))
                                                )
                                                metric(
                                                    title: "Music-meta.fever",
                                                    symbol: "flame",
                                                    value: row.meta.feverScore.formatted(.number.precision(.fractionLength(3)))
                                                )
                                                metric(
                                                    title: "Music-meta.event",
                                                    symbol: "percent",
                                                    value: (row.meta.eventRate/100).formatted(.percent)
                                                )
                                            }
                                        }
                                        .frame(maxWidth: .infinity, alignment: .leading)
                                    }
                                }
                                .buttonStyle(.plain)
                            }
                        }
                        .padding()
                    }
                }
            } else if failed {
                ContentUnavailableView {
                    Label("Music-meta.unavailable", systemImage: "music.note.list")
                } actions: {
                    Button("General.retry") {
                        Task {
                            await load()
                        }
                    }
                }
            } else { ProgressView().controlSize(.large) }
        }
        .navigationTitle("App.tools.music-meta")
        .highlightKeyword($query)
        .searchable(text: $query)
        .toolbar {
            if sizeClass != .regular && platform != .macOS {
                ToolbarItem {
                    Menu(content: {
                        Picker(selection: Binding(get: {
                            selectedSortOption
                        }, set: { option in
                            if option == selectedSortOption {
                                sortOrder = sortOrder.map { comparator in
                                    var comparator = comparator
                                    comparator.order = comparator.order == .forward ? .reverse : .forward
                                    return comparator
                                }
                            } else {
                                sortOrder = [option.comparator]
                            }
                        }), content: {
                            ForEach(SortOption.allCases, id: \.self) { option in
                                // Match SorterPickerView's menu subtitle workaround.
                                Button(action: {}, label: {
                                    Text(option.localizedName)
                                        .tag(option)
                                    if selectedSortOption == option {
                                        Text(sortDirectionName)
                                    }
                                })
                                .wrapIf(selectedSortOption == option) {
                                    $0
                                        .accessibilityLabel(String("\(option.localizedName), \(sortDirectionName)"))
                                        .accessibilityHint("Sorter.reverse-direction")
                                }
                            }
                        }, label: {
                            EmptyView()
                        })
                        .pickerStyle(.inline)
                        .labelsHidden()
                    }, label: {
                        Label("Sort", systemImage: "arrow.up.arrow.down")
                    })
                    .buttonBorderShape(.circle)
                    .accessibilityValue(String("\(selectedSortOption.localizedName), \(sortDirectionName)"))
                }
            }
        }
        .task {
            if rows == nil {
                await load()
            }
        }
    }
    
    private var selectedSortOption: SortOption {
        SortOption.allCases.first { $0.comparator.keyPath == sortOrder.first?.keyPath } ?? .id
    }

    private var sortDirectionName: String {
        sortOrder.first?.order == .reverse
            ? String(localized: "Sorter.order.descending")
            : String(localized: "Sorter.order.ascending")
    }

    private enum SortOption: CaseIterable {
        case difficulty
        case duration
        case notes
        case baseScore
        case feverScore
        case eventRate
        case id

        var localizedName: String {
            switch self {
            case .duration: String(localized: "Music-meta.duration")
            case .notes: String(localized: "Music-meta.notes")
            case .difficulty: String(localized: "Music-meta.difficulty")
            case .baseScore: String(localized: "Music-meta.base")
            case .feverScore: String(localized: "Music-meta.fever")
            case .eventRate: String(localized: "Music-meta.event")
            case .id: String(localized: "ID")
            }
        }

        var comparator: KeyPathComparator<Row> {
            switch self {
            case .duration: .init(\.duration)
            case .notes: .init(\.notes, order: .reverse)
            case .difficulty: .init(\.difficultyRank, order: .reverse)
            case .baseScore: .init(\.baseScore, order: .reverse)
            case .feverScore: .init(\.feverScore, order: .reverse)
            case .eventRate: .init(\.eventRate, order: .reverse)
            case .id: .init(\.musicID)
            }
        }
    }

    private func metric(title: LocalizedStringKey, symbol: String, value: String) -> some View {
        HStack(spacing: 3) {
            Label(title, systemImage: symbol)
                .labelStyle(.iconOnly)
            Text(value)
        }
//        Label(value, systemImage: symbol)
//            .accessibilityLabel(title)
            .font(.caption)
            .foregroundStyle(.secondary)
    }
    private func load() async {
        failed = false
        async let songs = Song.allWithCache()
        async let metas = SekaiCache.withDirectCache(id: "MusicMeta", trait: .invocationElidable) { await MusicMeta.all() }
        guard let songs = await songs, let metas = await metas else { failed = true; return }
        let songMap = Dictionary(songs.map { ($0.id, $0) }, uniquingKeysWith: { a, _ in a })
        rows = metas.compactMap { meta in
            guard let song = songMap[meta.musicID], let level = song.difficultyLevel[meta.difficulty], let notes = song.noteCounts[meta.difficulty] else { return nil }
            return Row(song: song, meta: meta, level: level, notes: notes)
        }.sorted { $0.song.id == $1.song.id ? $0.meta.difficulty < $1.meta.difficulty : $0.song.id < $1.song.id }
    }
    private struct Row: Identifiable {
        var id: String { meta.id }
        let song: Song
        let meta: MusicMeta
        let level: Int
        let notes: Int
        var title: String { song.title.majorValue ?? "#\(song.id)" }
        var musicID: Int { song.id }
        var difficultyRank: Int { level * 10 + (Song.Difficulty.allCases.firstIndex(of: meta.difficulty) ?? 0) }
        var duration: Double { meta.duration }
        var baseScore: Double { meta.baseScore }
        var feverScore: Double { meta.feverScore }
        var eventRate: Double { meta.eventRate }
    }
}
