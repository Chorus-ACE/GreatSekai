//===---*- Greatdori! -*---------------------------------------------------===//
//
// CardDetailView.swift
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

import AVKit
import SekaiKit
import SwiftUI
import SDWebImageSwiftUI
import SwiftUI


// MARK: CardDetailView
struct CardDetailView: View {
    var id: Int
    var allCards: [Card]? = nil
    var body: some View {
        DetailViewBase(forType: Card.self, previewList: allCards, initialID: id) { information in
            CardDetailOverviewView(information: information)
//            CardDetailStatsView(card: information.card)
//            DetailsCostumesSection(costumes: [information.costume])
//            if !information.event.isEmpty || information.cardSource.containsSource(from: .event) {
//                DetailsEventsSection(event: information.event, sources: information.cardSource)
//            }
//            if information.cardSource.containsSource(from: .gacha) {
//                DetailsGachasSection(sources: information.cardSource)
//            }
//            CardDetailStoriesView(information: information)
//            DetailArtsSection {
//                ArtsTab("Card.arts.full", ratio: 1334/1002) {
//                    ArtsItem(title: "Card.arts.normal", url: information.card.coverNormalImageURL)
//                    if let url = information.card.coverAfterTrainingImageURL {
//                        ArtsItem(title: "Card.arts.trained", url: url)
//                    }
//                }
//                ArtsTab("Card.arts.trimmed", ratio: 1) {
//                    ArtsItem(title: "Card.arts.normal", url: information.card.trimmedNormalImageURL)
//                    if let url = information.card.trimmedAfterTrainingImageURL {
//                        ArtsItem(title: "Card.arts.trained", url: url)
//                    }
//                }
//                ArtsTab("Card.arts.thumb", ratio: 1) {
//                    ArtsItem(title: "Card.arts.normal", url: information.card.thumbNormalImageURL)
//                    if let url = information.card.thumbAfterTrainingImageURL {
//                        ArtsItem(title: "Card.arts.trained", url: url)
//                    }
//                }
//                ArtsTab("Card.arts.livesd", ratio: 1) {
//                    ArtsItem(title: "Card.arts.livesd", url: information.card.sdImageURL)
//                }
//            }
            DetailArtsSection {
                ArtsTab("Card.arts.full", ratio: 16.0 / 9.0) {
                    ArtsItem(title: "Card.arts.normal", url: information.beforeTrainingArtURL)
                    if let url = information.afterTrainingArtURL {
                        ArtsItem(title: "Card.arts.trained", url: url)
                    }
                }
                ArtsTab("Card.arts.thumb") {
                    ArtsItem(title: "Card.arts.normal", url: information.beforeTrainingThumbnailURL)
                    if let url = information.afterTrainingThumbnailURL {
                        ArtsItem(title: "Card.arts.trained", url: url)
                    }
                }
            }
            #if os(visionOS)
            .environment(\.imageSupportsCreateSpatial, true)
            #endif
            
            ExternalLinksSection(links: [
                ExternalLink(.sekaiViewer, url:
                                URL(string: "https://sekai.best/card/\(information.id)")!
                            ),
                
                ExternalLink(.cleista, url:
                                URL(string: "https://pjsk.cleista.cc/#/cards/\(SekaiCache.preCache.character(id: information.characterID)?.givenName.forLocale(.en)?.lowercased() ?? "")-\(information.id)")!
                             ),
                
                ExternalLink(.moeSekai, url:
                                URL(string: "https://pjsk.moe/cards/\(information.id)/")!
                            ),
                
                ExternalLink(.haruki, url:
                                URL(string: "https://haruki.seiunx.com/cards/\(information.id)")!
                            )
            ])
        } switcherDestination: {
            CardSearchView()
        }
    }
}
