import SekaiKit
import SDWebImageSwiftUI
import SwiftUI

struct ComicInfo: View {
    let information: Comic
    var layout: SummaryLayout
    init(_ information: Comic, layout: SummaryLayout = .horizontal) {
        self.information = information
        self.layout = layout
    }
    var body: some View {
        SummaryViewBase(layout, source: information) {
            ComicThumbnail(comic: information)
                .frame(width: layout == .horizontal ? 140 : 200)
        } detail: {
        }
        .fixedSize(horizontal: false, vertical: true)
    }
}

struct ComicThumbnail: View {
    let comic: Comic
    private let aspectRatio: CGFloat = 644.0 / 478.0
    var body: some View {
        FallbackableWebImage(throughURLs: comic.availableLocales.compactMap { comic.imageURL(in: $0) }) { image in
            image.resizable().scaledToFit()
        } placeholder: {
            RoundedRectangle(cornerRadius: 5).fill(getPlaceholderColor())
                .aspectRatio(aspectRatio, contentMode: .fit)
        }
        .clipShape(RoundedRectangle(cornerRadius: 5))
        .accessibilityLabel(comic.title.majorValue ?? "")
    }
}
