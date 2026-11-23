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
    let information: Song
    var subtitle: LocalizedStringKey? = nil
    var layout: SummaryLayout
    
    init(_ song: Song, subtitle: LocalizedStringKey? = nil, layout: SummaryLayout = .horizontal) {
        self.information = song
        self.subtitle = subtitle
        self.layout = layout
    }
    
    let horizontalLayoutCoverSideLength: CGFloat = 110
    let verticalLayoutCoverSideLength: CGFloat = 120
    
    var coverSideLength: CGFloat {
        layout == .horizontal ? horizontalLayoutCoverSideLength : verticalLayoutCoverSideLength
    }
    
    var body: some View {
        SummaryViewBase(layout, source: information) {
            WebImage(url: information.coverImageURL) { image in
                image
                    .resizable()
                    .antialiased(true)
                    .aspectRatio(1, contentMode: .fit)
                    .frame(width: coverSideLength, height: coverSideLength)
                    .cornerRadius(5)
            } placeholder: {
                RoundedRectangle(cornerRadius: 5)
                    .fill(getPlaceholderColor())
                    .frame(width: coverSideLength, height: coverSideLength)
            }
            .interpolation(.high)
        } detail: {
            Group {
                let creator = information.creatorArtist.localizedData?.forPreferredLocale() ?? String(localized: "Info.unknown")
                let separator = String(localized: "Typography.bold-dot-seperater")
                if let subtitle {
                    Text(creator) + Text("Typography.bold-dot-seperater").bold() + Text(subtitle)
                } else if let focus = information.focusCharacterLabel {
                    HighlightableText("\(creator)\(separator)\(focus)")
                        .typesettingLanguage(.explicit(SekaiLocale.primaryLocale.nsLocale.language))
                } else {
                    HighlightableText(creator, suffix: "\(separator)\(information.majorCategory.localizedName(caseAllConveysMixed: true))")
                }
            }
            .font(platform == .macOS ? .body : .caption)
            SongDifficultiesIndicator(information.difficultyLevel)
                .foregroundStyle(.primary)
                .preferHiddenInCompactLayout()
        }
    }
}
