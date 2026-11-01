import SekaiKit
import SDWebImageSwiftUI
import SwiftUI

struct VirtualLiveSetlistSection: View {
    let information: VirtualLive
    @State private var songsByID: [Int: Song] = [:]

    var body: some View {
        RegionalDetailSection("VirtualLive.program", values: information.record.map { $0?.virtualLiveSetlists ?? [] }) { entries, locale in
            DetailExpandableRows(elements: entries.sorted { ($0.seq ?? 0) < ($1.seq ?? 0) }, symbol: "music.note.list") { entry in
                if let id = entry.musicID {
                    NavigationLink { SongDetailView(id: id) } label: {
                        VirtualLiveProgramRow(entry: entry, song: songsByID[id], locale: locale)
                    }
                } else {
                    VirtualLiveProgramRow(entry: entry, song: nil, locale: locale)
                }
            }
        }
        .task {
            if let songs = await Song.allWithCache(), !Task.isCancelled {
                songsByID = Dictionary(songs.map { ($0.id, $0) }, uniquingKeysWith: { first, _ in first })
            }
        }
    }
}

private struct VirtualLiveProgramRow: View {
    let entry: VirtualLiveSetlistEntry
    let song: Song?
    let locale: SekaiLocale
    @AppStorage("showAdvancedDetails") private var showAdvancedDetails = false

    var body: some View {
        CustomGroupBox {
            HStack(spacing: 14) {
                if let sequence = entry.seq {
                    Text(String(sequence)).font(.title3).monospacedDigit().foregroundStyle(.secondary).frame(width: 30)
                }
                if let song {
                    WebImage(url: song.coverImageURL) { image in
                        image.resizable().scaledToFit()
                    } placeholder: {
                        RoundedRectangle(cornerRadius: 5).fill(getPlaceholderColor())
                    }
                    .frame(width: 60, height: 60).clipShape(RoundedRectangle(cornerRadius: 5))
                } else {
                    Image(systemName: entry.musicID == nil ? "text.bubble" : "music.note")
                        .font(.title2).foregroundStyle(.secondary).frame(width: 60, height: 60)
                }
                VStack(alignment: .leading, spacing: 4) {
                    if let song {
                        Text(song.title.localizedData?[locale] ?? song.title.majorValue ?? String(localized: "Info.unknown"))
                            .font(.headline)
                        Text(entry.type.localizedName).foregroundStyle(.secondary)
                    } else if let id = entry.musicID {
                        Text("VirtualLive.song.\(id)").font(.headline)
                    } else {
                        Text(entry.type.localizedName).font(.headline)
                    }
                    if showAdvancedDetails, let bundle = entry.assetBundleName {
                        Text(bundle).font(.caption.monospaced()).foregroundStyle(.secondary).textSelection(.enabled)
                    }
                }
                Spacer(minLength: 0)
                if entry.musicID != nil { Image(systemName: "chevron.right").font(.caption).foregroundStyle(.tertiary) }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
    }
}
