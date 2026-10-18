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
                        TableColumn("MusicMeta.song") { row in
                            NavigationLink(destination: {
                                SongDetailView(id: row.song.id)
                            }, label: {
                                HighlightableText(row.title)
                                    .multilineTextAlignment(.leading)
                            })
                            .foregroundStyle(.primary)
                        }
                        TableColumn("MusicMeta.difficulty", value: \.difficultyRank) { row in
                            SongDifficultyIndicator(difficulty: row.meta.difficulty, level: row.level)
                                .accessibilityLabel(String("\(row.meta.difficulty.name) \(row.level)"))
                        }.width(SongDifficultyIndicator.diameter + 30)
                        TableColumn("MusicMeta.duration", value: \.duration) { Text($0.meta.duration, format: .number.precision(.fractionLength(1))) }
                        TableColumn("MusicMeta.notes", value: \.notes) { Text($0.notes.formatted()) }
                        TableColumn("MusicMeta.base", value: \.baseScore) { Text($0.meta.baseScore, format: .number.precision(.fractionLength(3))) }
                        TableColumn("MusicMeta.fever", value: \.feverScore) { Text($0.meta.feverScore, format: .number.precision(.fractionLength(3))) }
                        TableColumn("MusicMeta.event", value: \.eventRate) { Text($0.meta.eventRate, format: .number.precision(.fractionLength(2))) }
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
                                        VStack(alignment: .leading, spacing: 8) {
                                            HighlightableText(row.title).font(.headline)
                                            SongDifficultyIndicator(difficulty: row.meta.difficulty, level: row.level)
                                                .accessibilityLabel(String("\(row.meta.difficulty.name) \(row.level)"))
                                            Grid(alignment: .leading) {
                                                metric("MusicMeta.duration", row.meta.duration.formatted(.number.precision(.fractionLength(1))))
                                                metric("MusicMeta.notes", row.notes.formatted())
                                                metric("MusicMeta.base", row.meta.baseScore.formatted(.number.precision(.fractionLength(3))))
                                                metric("MusicMeta.fever", row.meta.feverScore.formatted(.number.precision(.fractionLength(3))))
                                                metric("MusicMeta.event", row.meta.eventRate.formatted())
                                            }.font(.caption).foregroundStyle(.secondary)
                                        }.frame(maxWidth: .infinity, alignment: .leading)
                                    }
                                }.buttonStyle(.plain)
                            }
                        }.padding()
                    }
                }
            } else if failed {
                ContentUnavailableView {
                    Label("MusicMeta.unavailable", systemImage: "music.note.list")
                } actions: { Button("General.retry") { Task { await load() } } }
            } else { ProgressView().controlSize(.large) }
        }
        .navigationTitle("App.tools.music-meta")
        .highlightKeyword($query)
        .searchable(text: $query)
        .toolbar {
            if sizeClass != .regular && platform != .macOS {
                ToolbarItem {
                    Menu("MusicMeta.sort", systemImage: "arrow.up.arrow.down") {
                        Button("MusicMeta.duration") { sortOrder = [.init(\.duration)] }
                        Button("MusicMeta.notes") { sortOrder = [.init(\.notes, order: .reverse)] }
                        Button("MusicMeta.difficulty") { sortOrder = [.init(\.difficultyRank, order: .reverse)] }
                        Button("MusicMeta.base") { sortOrder = [.init(\.baseScore, order: .reverse)] }
                        Button("MusicMeta.fever") { sortOrder = [.init(\.feverScore, order: .reverse)] }
                        Button("MusicMeta.event") { sortOrder = [.init(\.eventRate, order: .reverse)] }
                        Button("ID") { sortOrder = [.init(\.musicID)] }
                        Divider()
                        Button("MusicMeta.reverse") {
                            sortOrder = sortOrder.map { value in
                                var value = value; value.order = value.order == .forward ? .reverse : .forward; return value
                            }
                        }
                    }
                }
            }
        }
        .task { if rows == nil { await load() } }
    }
    private func metric(_ title: LocalizedStringKey, _ value: String) -> some View {
        GridRow { Text(title); Text(value).monospacedDigit() }
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
