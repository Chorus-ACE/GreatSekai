//===---*- Greatdori! -*---------------------------------------------------===//
//
// SongDetailView.swift
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


// MARK: SongDetailView
struct SongDetailView: View {
    var id: Int
    var allSongs: [Song]? = nil
//    @State var songMatches: [Int: DoriFrontend.Songs._NeoSongMatchResult]?
//    @State private var lyrics: DoriFrontend.Songs.Lyrics?
    var body: some View {
        DetailViewBase(previewList: allSongs, initialID: id) { information in
            SongDetailOverviewView(information: information)
            
            if !(information.vocals?.isEmpty ?? true) {
                SongDetailVocalsView(information: information)
            }
            
            SongDetailDifficultiesView(information: information)
//            SongDetailGameplayView(information: information)
//            SongDetailMusicMovieView(musicVideos: information.song.musicVideos)
//            DetailsEventsSection(events: information.events, applyLocaleFilter: true)
//            SongDetailMatchView(song: information.song, songMatches: $songMatches)
//            if #available(iOS 26.0, macOS 26.0, visionOS 26.0, *), let lyrics {
//                SongDetailLyricsView(lyrics: lyrics)
//            }

            
            DetailArtsSection {
                ArtsTab("Song.arts.cover") {
                    for locale in SekaiLocale.allCases where information.song.title.localizedData?.availableInLocale(locale) == true {
                        ArtsItem(title: .init(stringLiteral: locale.rawValue.uppercased()), url: information.song.coverImageURL(in: locale))
                    }
                }
            }
            
            ExternalLinksSection(links: [
                ExternalLink(
                    name: "External-link.sekai-viewer",
                    url: URL(string: "https://sekai.best/music/\(information.id)")!
                ),
                ExternalLink(
                    name: "External-link.sonolus",
                    url: URL(string: "https://sonolus.sekai.best/playlists/sekai-best-\(information.id)")!
                ),
                ExternalLink(
                    name: "External-link.cleista",
                    url: URL(string: "https://pjsk.cleista.cc/#/music/\(information.id)")!
                ),
                ExternalLink(
                    name: "External-link.moesekai",
                    url: URL(string: "https://pjsk.moe/music/\(information.id)/")!
                ),
                ExternalLink(
                    name: "External-link.haruki",
                    url: URL(string: "https://haruki.seiunx.com/music/\(information.id)")!
                ),
                ExternalLink(
                    name: "External-link.pjsekai-moe",
                    url: URL(string: "https://pjsekai.moe/#/music/\(information.id)")!
                )
            ])
        } switcherDestination: {
            SongSearchView()
        }
//        .id(lyrics?.hashValue ?? id)
    }
}
