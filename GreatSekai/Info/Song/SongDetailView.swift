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
    @State private var lyricsRetry = 0
    @State private var releaseConditions: [ReleaseCondition]?
    @State private var videoContent: LocalizedData<Song.VideoContent>?
    @State private var lyrics: Song.Lyrics?
    @State private var lyricsLoading = true
    @State private var lyricsFailed = false

    var body: some View {
        DetailViewBase(previewList: allSongs, initialID: id) { information in
            Group {
                SongDetailOverviewView(information: information)

                if !(information.vocals?.isEmpty ?? true) {
                    SongDetailVocalsView(information: information, releaseConditions: releaseConditions)
                }

                SongDetailDifficultiesView(information: information)
    //            SongDetailGameplayView(information: information)
                SongDetailMusicVideoView(content: videoContent).id(information.id)
                
                if let lyrics {
                    SongDetailLyricsView(lyrics: lyrics)
                        .id(information.id)
                } else if lyricsFailed {
                    DetailRetrySection(title: "Song.lyrics") { lyricsRetry += 1 }
                } else if lyricsLoading {
                    Section {
                        ProgressView()
                            .frame(maxWidth: infoContentMaxWidth)
                    } header: {
                        Text("Song.lyrics").font(.title2).bold().detailSectionHeader()
                    }
                }
    //            DetailsEventsSection(events: information.events, applyLocaleFilter: true)
    //            SongDetailMatchView(song: information.song, songMatches: $songMatches)


                DetailArtsSection {
                    ArtsTab("Song.arts.cover") {
                        for locale in SekaiLocale.allCases where information.song.title.localizedData?.availableInLocale(locale) == true {
                            ArtsItem(title: .init(stringLiteral: locale.rawValue.uppercased()), url: information.song.coverImageURL(in: locale))
                        }
                    }
                }

                SongExternalLinksSection(content: videoContent, links: [
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
            }
            .task(id: information.id) {
                videoContent = nil
                async let video: Void = loadVideoContent(for: information.song)
                async let conditions: Void = loadReleaseConditions()
                _ = await (video, conditions)
            }
            .task(id: "\(information.id)-lyrics-\(lyricsRetry)") {
                await loadLyrics(for: information.song)
            }
        } switcherDestination: {
            SongSearchView()
        }
    }

    private func loadReleaseConditions() async {
        releaseConditions = nil
        let result = await ReleaseCondition.allWithCache()
        guard !Task.isCancelled else { return }
        releaseConditions = result
    }

    private func loadVideoContent(for song: Song) async {
        let result = await song.videoContent()
        guard !Task.isCancelled else { return }
        videoContent = result
    }

    private func loadLyrics(for song: Song) async {
        lyricsLoading = true
        lyrics = nil
        lyricsFailed = false
        do {
            let result = try await song.lyrics()
            guard !Task.isCancelled else { return }
            lyrics = result
            lyricsLoading = false
        } catch {
            guard !Task.isCancelled else { return }
            lyricsFailed = true
            lyricsLoading = false
        }
    }

}

private struct SongExternalLinksSection: View {
    let content: LocalizedData<Song.VideoContent>?
    let links: [ExternalLink?]

    private var videoLinks: [ExternalLink] {
        var seen = Set<URL>()
        let locales = [SekaiLocale.primaryLocale, .secondaryLocale] + SekaiLocale.allCases
        return locales.flatMap { content?[$0]?.externalURLs ?? [] }
            .filter { seen.insert($0).inserted }
            .map { ExternalLink.musicVideo(url: $0) }
    }

    var body: some View {
        ExternalLinksSection(links: links + videoLinks.map(Optional.some))
    }
}
