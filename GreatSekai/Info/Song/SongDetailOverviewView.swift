//===---*- Greatdori! -*---------------------------------------------------===//
//
// SongDetailOverviewView.swift
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

// MARK: SongDetailOverviewView
struct SongDetailOverviewView: View {
    @Environment(\.horizontalSizeClass) var sizeClass
    let information: ExtendedSong
    
    let coverSideLengthRegular: CGFloat = 260
    let coverSideLengthCompact: CGFloat = 220
    var body: some View {
        DetailInfoBase(content: {
            DetailInfoItem("Song.title", localizableText: information.song.title)
            DetailInfoItem("Song.category", content: {
                let categories = information.song.categories.filter({ $0 != .all })
                    HStack {
                        if categories.count <= 2 {
                            Text(ListFormatter.localizedString(byJoining: categories.map(\.localizedName)))
                        } else if categories.count == 7 {
                            Text("Song.category.all")
                        } else {
                            Text("Song.category.multiple")
                        }
                        ForEach(categories, id: \.self) { category in
                            Group {
                                if let unit = category.correspondingUnit {
                                    WebImage(url: unit.iconImageURL)
                                        .resizable()
                                } else {
                                    Image(systemName: "ellipsis.circle")
                                        .resizable()
                                        .foregroundStyle(.secondary)
                                        .scaleEffect(0.8)
                                }
                            }
                            .scaledToFit()
                            .frame(maxHeight: imageButtonSize)
                        }
                    }
            })
            DetailInfoItem("Song.type", text: information.song.isNewlyWrittenMusic ? String(localized: "Song.type.commission") : String(localized: "Song.type.pre-existed"))
            DetailInfoItem("Song.composer", localizableText: information.song.composer)
            DetailInfoItem("Song.arranger", localizableText: information.song.arranger)
            DetailInfoItem("Song.lyricist", localizableText: information.song.lyricist)
            DetailInfoItem("Song.media", text: ListFormatter.localizedString(byJoining: information.song.availableMedia.map(\.localizedName)))
            DetailInfoItem("Song.release-date", date: information.song.publishDate, showLocaleKey: true)
            //            DetailInfoItem("Song.length", localizableText: information.song.isFullLength)
            DetailInfoItem("ID", text: "\(String(information.id))")
        }, head: {
            VStack {
                WebImage(url: information.song.coverImageURL) { image in
                    image
                        .antialiased(true)
                        .resizable()
                        .cornerRadius(10)
                        .scaledToFit()
                } placeholder: {
                    RoundedRectangle(cornerRadius: 10)
                        .fill(getPlaceholderColor())
                }
                .interpolation(.high)
                .frame(width: sizeClass == .regular ? coverSideLengthRegular : coverSideLengthCompact, height: sizeClass == .regular ? coverSideLengthRegular : coverSideLengthCompact)
                .shadow(radius: 5, y: 4)
                .imageContextMenu([.init(url: information.song.coverImageURL)])
                //                Rectangle()
                //                    .opacity(0)
                //                    .frame(height: 2)
                
                //                if isSayuruVersion {
                //                    CustomGroupBox(cornerRadius: 3417) {
                //                        CompactAudioPlayer(url: information.soundURL, mediaInfo: (information.title.forPreferredLocale(), information.creatorArtist.localizedData?.forPreferredLocale()))
                //                    }
                //                }
            }
        })
    }
}
