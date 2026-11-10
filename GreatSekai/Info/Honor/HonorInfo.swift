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
    @State private var retry = 0

    private var artwork: Honor.Artwork? { information.artwork(in: locale, level: level) }
    private var imageURLs: [URL] {
        guard let artwork else { return [] }
        return [artwork.backgroundURLs.first, artwork.overlayURLs.first, artwork.frameURLs.first].compactMap { $0 }
    }
    private func frameName(_ rarity: Honor.Rarity) -> String? {
        switch rarity {
        case .low: "HonorFrame1"
        case .middle: "HonorFrame2"
        case .high: "HonorFrame3"
        case .highest: "HonorFrame4"
        case .unknown: nil
        }
    }
    var body: some View {
        GeometryReader { geometry in
            if let artwork {
                ZStack(alignment: .topLeading) {
                    FallbackableWebImage(throughURLs: artwork.backgroundURLs, options: [.retryFailed]) { phase in
                        if let image = phase.image {
                            image.resizable().antialiased(true).scaledToFit()
                        } else {
                            RoundedRectangle(cornerRadius: 8).fill(getPlaceholderColor())
                                .overlay {
                                    if phase.error != nil {
                                        Button("General.retry", systemImage: "arrow.clockwise") { retry += 1 }
                                            .labelStyle(.iconOnly).buttonStyle(.borderless)
                                    } else { Image(systemName: "rosette").foregroundStyle(.secondary) }
                                }
                        }
                    }
                    .frame(width: geometry.size.width, height: geometry.size.height)
                    if !artwork.frameURLs.isEmpty {
                        FallbackableWebImage(throughURLs: artwork.frameURLs, options: [.retryFailed]) { image in
                            image.resizable().scaledToFit()
                        } placeholder: {
                            if let name = frameName(artwork.rarity) { Image(name).resizable().scaledToFit() }
                        }
                        .frame(width: geometry.size.width, height: geometry.size.height)
                    } else if let name = frameName(artwork.rarity) {
                        Image(name).resizable().scaledToFit()
                            .frame(width: geometry.size.width, height: geometry.size.height)
                    }
                    if !artwork.overlayURLs.isEmpty {
                        FallbackableWebImage(throughURLs: artwork.overlayURLs, options: [.retryFailed]) { image in
                            image.resizable().scaledToFit()
                        } placeholder: { Color.clear }
                        .frame(width: geometry.size.width * artwork.overlayRect.width,
                               height: geometry.size.height * artwork.overlayRect.height)
                        .offset(x: geometry.size.width * artwork.overlayRect.minX,
                                y: geometry.size.height * artwork.overlayRect.minY)
                    }
                    if let medalLevel = artwork.medalLevel {
                        ForEach(0..<min(5, max(0, medalLevel)), id: \.self) { index in
                            Image(index < medalLevel - 5 ? "HonorLevel6" : "HonorLevel")
                                .resizable().scaledToFit()
                                .frame(width: geometry.size.width * 16 / 380, height: geometry.size.height * 16 / 80)
                                .offset(x: geometry.size.width * CGFloat((artwork.birthdayMedals ? 180 : 50) + index * 16) / 380,
                                        y: geometry.size.height * 64 / 80)
                        }
                    }
                }.id(retry)
            } else {
                RoundedRectangle(cornerRadius: 8).fill(getPlaceholderColor())
                    .overlay { Image(systemName: "rosette").foregroundStyle(.secondary) }
            }
        }
        .aspectRatio(380.0 / 80.0, contentMode: .fit)
        .accessibilityLabel(information.title.majorValue ?? "")
        .imageContextMenu(imageURLs.map { ImageInfo(url: $0) })
    }
}
