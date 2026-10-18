import SekaiKit
import SwiftUI

struct StickerSearchView: View {
    let gridLayoutItemWidth: CGFloat = 200

    var body: some View {
        SearchViewBase(forType: Sticker.self, initialLayout: SummaryLayout.vertical(), layoutOptions: verticalAndHorizontalLayouts) { layout, _, content, _ in
            if layout == .horizontal {
                LazyVStack {
                    content
                }
                .frame(maxWidth: infoContentMaxWidth)
            } else {
                LazyVGrid(columns: [GridItem(.adaptive(minimum: gridLayoutItemWidth, maximum: gridLayoutItemWidth))]) {
                    content
                }
            }
        } eachContent: { layout, sticker in
            StickerInfo(sticker, layout: layout)
        } destination: { sticker, list in
            StickerDetailView(id: sticker.id, allStickers: list)
        }
        .resultCountDescription { "Sticker.count.\($0)" }
    }
}
