import SekaiKit
import SwiftUI
import SDWebImageSwiftUI

struct ComicDetailView: View {
    let id: Int
    var items: [Comic]? = nil
    var body: some View {
        DetailViewBase(forType: Comic.self, previewList: items, initialID: id) { comic in
            DetailInfoBase {
                DetailInfoItem("Comic.title", localizableText: comic.title)
                if !comic.minimumRank.isEmpty {
                    DetailInfoItem("Comic.minimum-rank", localizableText: comic.minimumRank.map { $0.map(String.init) })
                }
                if !comic.maximumRank.isEmpty {
                    DetailInfoItem("Comic.maximum-rank", localizableText: comic.maximumRank.map { $0.map(String.init) })
                }
                DetailInfoItem("ID", text: String(comic.id))
            } head: {
                ComicThumbnail(comic: comic).frame(maxWidth: 280)
            }
            ComicReaderSection(comic: comic).id(comic.id)
            ExternalLinksSection(links: [ExternalLink(.sekaiViewer, url: URL(string: "https://sekai.best/comic")!)])
        } switcherDestination: {
            ComicSearchView()
        }
    }
}

private struct ComicReaderSection: View {
    let comic: Comic
    @State private var locale = SekaiLocale.primaryLocale
    @State private var failed = false
    var body: some View {
        Section {
            WebImage(url: comic.imageURL(in: locale)) { image in
                image.resizable().scaledToFit()
            } placeholder: {
                CustomGroupBox {
                    HStack {
                        Spacer()
                        if failed {
                            Text("Comic.unavailable").foregroundStyle(.secondary)
                        } else { ProgressView() }
                        Spacer()
                    }
                }
            }
            .onFailure { _ in failed = true }
            .id(locale)
            .imageContextMenu(comic.imageURL(in: locale).map { [ImageInfo(url: $0)] } ?? [])
            .frame(maxWidth: infoContentMaxWidth)
        } header: {
            HStack {
                Text("App.info.comics").font(.title2).bold()
                if comic.availableLocales.count > 1 {
                    DetailSectionOptionPicker(selection: $locale, options: comic.availableLocales)
                }
                Spacer()
            }.frame(maxWidth: infoContentMaxWidth).detailSectionHeader()
        }
        .onChange(of: locale) { failed = false }
        .onAppear {
            if !comic.availableLocales.contains(locale), let first = comic.availableLocales.first { locale = first }
        }
    }
}
