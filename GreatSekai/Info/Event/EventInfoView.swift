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
    @State var event: Event
    
    init(_ event: Event, subtitle: LocalizedStringKey? = nil, showDetails: Bool = true) {
        self.event = event
        self.subtitle = subtitle
        self.showDetails = showDetails
    }
    
    @Environment(\.horizontalSizeClass) private var sizeClass
    @Environment(\.regularInfoImageSizeFactor) private var sizeFactor
    
    var body: some View {
        SummaryViewBase(.vertical(hidesDetail: !showDetails), source: event) {
            FallbackableWebImage(throughURLs: [event.bannerImageURL, event.bannerImageAltURL]) { image in
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
                HighlightableText(event.unit?.localizedName ?? String(localized: "Event.shuffle"), suffix: "\(String(localized: "Typography.bold-dot-seperater"))\(event.eventType.localizedName)")
            }
            
            if let subtitle {
                Text(subtitle)
                    .foregroundStyle(.secondary)
            }
        }
    }
}

