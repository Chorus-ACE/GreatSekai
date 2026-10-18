//
//  EventSearchView.swift
//  GreatSekai
//
//  Created by ThreeManager785 on 2026/7/25.
//

import SekaiKit
import SDWebImageSwiftUI
import SwiftUI

let bannerHeight: CGFloat = 120
//let bannerWidth: CGFloat = bannerHeight * bannerRatio
let bannerRatio: CGFloat = 2.346

struct EventInfo: View {
    var subtitle: LocalizedStringKey? = nil
    var showDetails: Bool
    var event: Event
    var locale: SekaiLocale?
    
    init(_ event: Event, subtitle: LocalizedStringKey? = nil, showDetails: Bool = true, locale: SekaiLocale? = nil) {
        self.event = event
        self.subtitle = subtitle
        self.showDetails = showDetails
        self.locale = locale
    }
    
    @Environment(\.horizontalSizeClass) private var sizeClass
    @Environment(\.regularInfoImageSizeFactor) private var sizeFactor

    var body: some View {
        SummaryViewBase(.vertical(hidesDetail: !showDetails), title: locale.map { .unlocalized(event.title.localizedData?[$0] ?? event.title.majorValue) } ?? event.title) {
            FallbackableWebImage(throughURLs: [event.bannerImageURL(in: locale), event.bannerImageAltURL(in: locale)]) { image in
                image
                    .resizable()
                    .antialiased(true)
                    .aspectRatio(bannerRatio, contentMode: .fit)
                    .frame(maxWidth: bannerHeight*bannerRatio * (sizeClass == .regular ? sizeFactor : 1))
            } placeholder: {
                RoundedRectangle(cornerRadius: 10)
                    .fill(getPlaceholderColor())
                    .aspectRatio(bannerRatio, contentMode: .fit)
                    .frame(maxWidth: bannerHeight*bannerRatio * (sizeClass == .regular ? sizeFactor : 1))
            }
            .interpolation(.high)
//            .upscale { image in
//                image
//                    .resizable()
//                    .antialiased(true)
//                    .aspectRatio(bannerRatio, contentMode: .fit)
//                    .frame(maxWidth: bannerHeight*bannerRatio * (sizeClass == .regular ? sizeFactor : 1))
//            }
            .cornerRadius(10)
        } detail: {
            Group {
                HighlightableText(
                    event.focusCharacterLabel(in: locale ?? .primaryLocale) ?? event.unit?.localizedName ?? String(localized: "Event.shuffle"),
                    suffix: "\(String(localized: "Typography.bold-dot-seperater"))\(event.eventType.localizedName)"
                )
                .typesettingLanguage(.explicit(.init(identifier: (locale ?? .primaryLocale).nsLocale.language.minimalIdentifier)))
            }
            
            if let subtitle {
                Text(subtitle)
                    .foregroundStyle(.secondary)
            }
        }
    }
}

