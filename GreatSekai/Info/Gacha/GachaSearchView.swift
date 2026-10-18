import SekaiKit
import SDWebImageSwiftUI
import SwiftUI

struct GachaSearchView: View {
    @Environment(\.horizontalSizeClass) private var sizeClass

    var body: some View {
        SearchViewBase(forType: Gacha.self, initialLayout: true, layoutOptions: bannerLayouts) { showDetails, elements, content, eachContent in
            ViewThatFits(in: .horizontal) {
                LazyVStack(spacing: showDetails ? nil : bannerSpacing) {
                    let rows = elements.chunked(into: 2)
                    ForEach(rows.indices, id: \.self) { index in
                        HStack(spacing: bannerSpacing) {
                            ForEach(rows[index]) { gacha in
                                eachContent(gacha)
                                    .frame(width: bannerWidth)
                            }
                            if rows[index].count == 1 {
                                Color.clear.frame(width: bannerWidth, height: 1)
                            }
                        }
                    }
                }
                .frame(width: bannerWidth * 2 + bannerSpacing)
                LazyVStack(spacing: showDetails ? nil : bannerSpacing) {
                    content
                }
            }
            .animation(.spring(duration: 0.3, bounce: 0.1), value: showDetails)
        } eachContent: { showDetails, gacha in
            GachaInfo(gacha: gacha, showDetails: showDetails)
                .wrapIf(sizeClass == .regular) { $0.frame(maxWidth: bannerWidth) }
        } destination: { gacha, list in
            GachaDetailView(id: gacha.id, allGachas: list)
        }
        .resultCountDescription { "Gacha.count.\($0)" }
    }
}

struct GachaInfo: View {
    let gacha: Gacha
    var showDetails = true

    var body: some View {
        SummaryViewBase(.vertical(hidesDetail: !showDetails), source: gacha) {
            FallbackableWebImage(throughURLs: gacha.previewImageURLs()) { image in
                image.resizable().scaledToFit()
            } placeholder: {
                RoundedRectangle(cornerRadius: 10)
                    .fill(getPlaceholderColor())
                    .aspectRatio(2.346, contentMode: .fit)
            }
            .clipShape(RoundedRectangle(cornerRadius: 10))
        } detail: {
            HighlightableText(gacha.type.localizedName)
        }
    }
}

