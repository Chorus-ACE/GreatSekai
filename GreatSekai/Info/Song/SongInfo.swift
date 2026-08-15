//===---*- Greatdori! -*---------------------------------------------------===//
//
// SongInfo.swift
//
// This source file is part of the Greatdori! open source project
//
// Copyright (c) 2025 the Greatdori! project authors
// Licensed under Apache License v2.0
//
// See https://greatdori.com/LICENSE.txt for license information
// See https://greatdori.com/CONTRIBUTORS.txt for the list of Greatdori! project authors
//
//===----------------------------------------------------------------------===//

import SDWebImageSwiftUI
import SekaiKit
import SwiftUI


// MARK: SongInfo
struct SongInfo: View {
    @State var information: Song
    var subtitle: LocalizedStringKey? = nil
    var layout: SummaryLayout
    
    init(_ song: Song, subtitle: LocalizedStringKey? = nil, layout: SummaryLayout = .horizontal) {
        self.information = song
        self.subtitle = subtitle
        self.layout = layout
    }
    
    let horizontalLayoutCoverSideLength: CGFloat = 110
    let verticalLayoutCoverSideLength: CGFloat = 120
    
    var body: some View {
        SummaryViewBase(layout, source: information) {
            WebImage(url: information.coverImageURL) { image in
                image
                    .resizable()
                    .antialiased(true)
                    .aspectRatio(1, contentMode: .fit)
                    .frame(width: (layout == .horizontal ? horizontalLayoutCoverSideLength : verticalLayoutCoverSideLength), height: (layout == .horizontal ? horizontalLayoutCoverSideLength : verticalLayoutCoverSideLength))
                    .cornerRadius(5)
            } placeholder: {
                RoundedRectangle(cornerRadius: 5)
                    .fill(getPlaceholderColor())
                    .frame(width: (layout == .horizontal ? horizontalLayoutCoverSideLength : verticalLayoutCoverSideLength), height: (layout == .horizontal ? horizontalLayoutCoverSideLength : verticalLayoutCoverSideLength))
            }
            .interpolation(.high)
        } detail: {
            Group {
                if let subtitle {
                    Text(information.creatorArtist.localizedData?.forPreferredLocale() ?? String(localized: "Info.unknown")) + Text("Typography.bold-dot-seperater").bold() + Text(subtitle)
                } else {
                    HighlightableText(information.creatorArtist.localizedData?.forPreferredLocale() ?? String(localized: "Info.unknown"), suffix: "\(String(localized: "Typography.bold-dot-seperater"))\(information.majorCategory.localizedName(caseAllConveysMixed: true))")
                }
            }
            .font(platform == .macOS ? .body : .caption)
            SongDifficultiesIndicator(information.difficultyLevel)
                .foregroundStyle(.primary)
                .preferHiddenInCompactLayout()
        }
//        .onAppear {
//            bandName = DoriCache.preCache.bands.first { $0.id == information.bandID }?.bandName.forPreferredLocale() ?? "Lorem Ipsum"
//            if bandName == "Lorem Ipsum" {
//                Task {
//                    let allBands = await Band.all()
//                    bandName = allBands?.first{ $0.id == information.bandID }?.bandName.forPreferredLocale() ?? "Lorem Ipsum"
//                }
//            }
//        }
    }
}
