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
            SongDetailMusicVideoView(song: information.song).id(information.id)
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
            
            SongExternalLinksSection(song: information.song, links: [
                ExternalLink(.sekaiViewer,
                    url: URL(string: "https://sekai.best/music/\(information.id)")!
                ),
                ExternalLink(.sekaipedia, url: {
                    await Sekaipedia.url(for: .music, id: information.id)
                }, note: "SekaipediaDynamicFetch"),
                ExternalLink(.sonolus,
                    url: URL(string: "https://sonolus.sekai.best/playlists/sekai-best-\(information.id)")!
                ),
                ExternalLink(.cleista,
                    url: URL(string: "https://pjsk.cleista.cc/#/music/\(information.id)")!
                ),
                ExternalLink(.moeSekai,
                    url: URL(string: "https://pjsk.moe/music/\(information.id)/")!
                ),
                ExternalLink(.haruki,
                    url: URL(string: "https://haruki.seiunx.com/music/\(information.id)")!
                ),
                ExternalLink(.pjsekaiMoe,
                    url: URL(string: "https://pjsekai.moe/#/music/\(information.id)")!
                )
            ]).id(information.id)
        } switcherDestination: {
            SongSearchView()
        }
//        .id(lyrics?.hashValue ?? id)
    }
}

private struct SongExternalLinksSection: View {
    let song: Song
    let links: [ExternalLink?]
    @State private var videoLinks: [ExternalLink] = []

    var body: some View {
        ExternalLinksSection(links: links + videoLinks.map(Optional.some))
            .task(id: song.id) {
                let content = await song.videoContent()
                guard !Task.isCancelled else { return }
                // Preserve region-specific uploads while displaying each destination once.
                var seen = Set<URL>()
                let locales = [SekaiLocale.primaryLocale, .secondaryLocale] + SekaiLocale.allCases
                videoLinks = locales.flatMap { content?[$0]?.externalURLs ?? [] }
                    .filter { seen.insert($0).inserted }
                    .map { ExternalLink.musicVideo(url: $0) }
            }
    }
}
