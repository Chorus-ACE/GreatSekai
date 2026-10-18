//
//  EventDetailView.swift
//  GreatSekai
//
//  Created by Rain on 2026/8/7.
//

import SekaiKit
import SDWebImageSwiftUI
import SwiftUI


// MARK: EventDetailView
struct EventDetailView: View {
    var id: Int
    var allEvents: [Event]?
    
    @State var parsedCards: [Card]?
    @State var parsedSongs: [Song]?
    
    var body: some View {
        DetailViewBase(previewList: allEvents, initialID: id) { information in
            Group {
                EventDetailOverviewView(information: information)
                DetailsCardsSection(cards: parsedCards)
                
                if !(parsedSongs?.isEmpty ?? false) {
                    DetailsSongsSection(songs: parsedSongs)
                }
                
                EventEpisodesSection(event: information.event).id(information.id)
                DetailArtsSection {
                    ArtsTab("Event.arts.banner", ratio: bannerRatio) {
                        for locale in SekaiLocale.allCases where information.event.title.localizedData?.availableInLocale(locale) == true {
                            ArtsItem(title: .init(stringLiteral: locale.rawValue.uppercased()), url: information.event.bannerImageURL(in: locale))
                        }
                    }
                    
                    ArtsTab("Event.arts.banner-home", ratio: bannerRatio) {
                        for locale in SekaiLocale.allCases where information.event.title.localizedData?.availableInLocale(locale) == true {
                            ArtsItem(title: .init(stringLiteral: locale.rawValue.uppercased()), url: information.event.bannerImageAltURL(in: locale))
                        }
                    }
                    
                    ArtsTab("Event.arts.logo", ratio: 2) {
                        for locale in SekaiLocale.allCases where information.event.title.localizedData?.availableInLocale(locale) == true {
                            ArtsItem(title: .init(stringLiteral: locale.rawValue.uppercased()), url: information.event.logoImageURL(in: locale))
                        }
                    }
                }
                
                ExternalLinksSection(links: [
                    ExternalLink(
                        name: "External-link.sekai-viewer",
                        url: URL(string: "https://sekai.best/event/\(information.id)")!
                    ),
                    ExternalLink(
                        name: "External-link.cleista",
                        url: URL(string: "https://pjsk.cleista.cc/#/event-story/\(information.id)/episode-list")!
                    ),
                    ExternalLink(
                        name: "External-link.moesekai",
                        url: URL(string: "https://pjsk.moe/events/\(information.id)/")!
                    ),
                    ExternalLink(
                        name: "External-link.haruki",
                        url: URL(string: "https://haruki.seiunx.com/events/\(information.id)")!
                    )
                ])
            }
            .onAppear {
                parsedCards = nil
                parsedSongs = nil
                
                if let cards = information.cards {
                    Task {
                        parsedCards = await withTaskGroup(of: Card?.self) { taskGroup in
                            for cardID in cards {
                                taskGroup.addTask {
                                    await Card(id: cardID)
                                }
                            }
                            var results: [Card] = []
                            
                            for await result in taskGroup {
                                if let result {
                                    results.append(result)
                                }
                            }
                            
                            return results
                        }
                    }
                } else {
                    parsedCards = []
                }
                
                if let songs = information.songs {
                    Task {
                        parsedSongs = await withTaskGroup(of: Song?.self) { taskGroup in
                            for songID in songs {
                                taskGroup.addTask {
                                    await Song(id: songID)
                                }
                            }
                            var results: [Song] = []
                            
                            for await result in taskGroup {
                                if let result {
                                    results.append(result)
                                }
                            }
                            
                            return results
                        }
                    }
                } else {
                    parsedSongs = []
                }
            }
        } switcherDestination: {
            EventSearchView()
        }
    }
//    
//    private func songs(for locale: DoriLocale, with information: ExtendedEvent) -> [PreviewSong] {
//        Array(Set(information.songs.filter { $0.publishedAt.forLocale(locale) != nil }
//        + (information.eventSongs?.forLocale(locale) ?? [])))
//    }
}
