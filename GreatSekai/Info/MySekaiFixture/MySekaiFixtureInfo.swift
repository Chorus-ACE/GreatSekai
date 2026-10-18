import SekaiKit
import SDWebImageSwiftUI
import SwiftUI

struct MySekaiFixtureInfo: View {
    let information: MySekaiFixture
    var layout: SummaryLayout
    init(_ information: MySekaiFixture, layout: SummaryLayout = .horizontal) {
        self.information = information
        self.layout = layout
    }
    var body: some View {
        SummaryViewBase(layout, source: information) {
            FallbackableWebImage(throughURLs: information.availableLocales.compactMap { information.imageURL(in: $0) }) { image in
                image.resizable().scaledToFit()
            } placeholder: {
                RoundedRectangle(cornerRadius: 10).fill(getPlaceholderColor())
            }
            .frame(width: layout == .horizontal ? 110 : 180, height: layout == .horizontal ? 110 : 180)
        } detail: {
            HighlightableText(information.type.majorValue?.localizedName ?? "")
                .font(platform == .macOS ? .body : .caption)
        }
        .fixedSize(horizontal: false, vertical: true)
    }
}
