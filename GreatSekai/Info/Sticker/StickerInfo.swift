import SekaiKit
import SDWebImageSwiftUI
import SwiftUI

struct StickerInfo: View {
    let information: Sticker
    var layout: SummaryLayout

    init(_ sticker: Sticker, layout: SummaryLayout = .vertical()) {
        self.information = sticker
        self.layout = layout
    }

    let horizontalLayoutCoverSideLength: CGFloat = 110
    let verticalLayoutCoverSideLength: CGFloat = 120

    var body: some View {
        SummaryViewBase(layout, source: information) {
            StickerImage(sticker: information)
                .frame(width: layout == .horizontal ? horizontalLayoutCoverSideLength : verticalLayoutCoverSideLength,
                       height: layout == .horizontal ? horizontalLayoutCoverSideLength : verticalLayoutCoverSideLength)
        } detail: {
            HighlightableText(information.type.majorValue?.localizedName ?? String(localized: "Info.unknown"))
                .font(platform == .macOS ? .body : .caption)
        }
        .fixedSize(horizontal: false, vertical: true)
    }
}

struct StickerImage: View {
    let sticker: Sticker
    var locale: SekaiLocale? = nil
    @State private var failed = false

    var body: some View {
        Group {
            if failed {
                Image(systemName: "photo.badge.exclamationmark")
                    .font(.largeTitle).foregroundStyle(.secondary)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else {
                WebImage(url: sticker.imageURL(in: locale)) { image in
                    image.resizable().scaledToFit()
                } placeholder: {
                    RoundedRectangle(cornerRadius: 10).fill(getPlaceholderColor())
                }
                .onFailure { _ in failed = true }
            }
        }
        .aspectRatio(1, contentMode: .fit)
        .onChange(of: sticker.imageURL(in: locale)) { failed = false }
        .accessibilityLabel(sticker.title.majorValue ?? "")
    }
}
