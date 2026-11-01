import SekaiKit
import SDWebImageSwiftUI
import SwiftUI

struct HonorInfo: View {
    let information: Honor
    var layout: SummaryLayout = .horizontal

    var body: some View {
        SummaryViewBase(layout, source: information) {
            ExtendedConstraints(isActive: layout != .horizontal) {
                HonorImage(information: information)
                    .frame(maxWidth: layout == .horizontal ? 170 : 240)
            }
        } detail: {
            if let rarity = information.record.majorValue?.rarity {
                HighlightableText(rarity.localizedName)
            }
            if let title = information.title.localizedData?[.secondaryLocale], title != information.title.majorValue {
                HighlightableText(title).preferHiddenInCompactLayout()
            }
        }
    }
}

struct HonorImage: View {
    let information: Honor
    var locale: SekaiLocale? = nil
    var level: Int? = nil

    private var urls: [URL] {
        let locales = locale.map { [$0] } ?? ([information.record.majorLocale ?? .primaryLocale] + information.availableLocales)
        return locales.compactMap { information.imageURL(in: $0, level: level) }.reduce(into: []) { urls, url in
            if !urls.contains(url) { urls.append(url) }
        }
    }

    var body: some View {
        FallbackableWebImage(throughURLs: urls) { image in
            image.resizable().antialiased(true).scaledToFit()
        } placeholder: {
            RoundedRectangle(cornerRadius: 8).fill(getPlaceholderColor())
                .overlay { Image(systemName: "rosette").foregroundStyle(.secondary) }
        }
        .aspectRatio(380.0 / 80.0, contentMode: .fit)
        .accessibilityLabel(information.title.majorValue ?? "")
        .imageContextMenu(urls.map { ImageInfo(url: $0) })
    }
}
