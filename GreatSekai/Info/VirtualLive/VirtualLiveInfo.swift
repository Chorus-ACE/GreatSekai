import SekaiKit
import SDWebImageSwiftUI
import SwiftUI

struct VirtualLiveInfo: View {
    let information: VirtualLive
    var showDetails = true

    var body: some View {
        SummaryViewBase(.vertical(hidesDetail: !showDetails), source: information) {
            VirtualLiveImage(information: information)
        } detail: {
            HighlightableText(information.record.majorValue?.type.localizedName ?? String(localized: "Info.unknown"))
            if let start = information.startDate.majorValue {
                Text(start, format: .dateTime.year().month().day())
            }
        }
    }
}

struct VirtualLiveImage: View {
    let information: VirtualLive
    var locale: SekaiLocale? = nil

    var body: some View {
        FallbackableWebImage(throughURLs: information.previewImageURLs(in: locale)) { image in
            image.resizable().antialiased(true).scaledToFit()
        } placeholder: {
            RoundedRectangle(cornerRadius: 10).fill(getPlaceholderColor())
                .overlay { Image(systemName: "microphone.dynamic.on.stand").font(.largeTitle).foregroundStyle(.secondary) }
        }
        .aspectRatio(790.0 / 243.0, contentMode: .fit)
        .clipShape(RoundedRectangle(cornerRadius: 10))
        .accessibilityLabel(information.title.majorValue ?? "")
        .imageContextMenu(information.previewImageURLs(in: locale).map { ImageInfo(url: $0) })
    }
}
