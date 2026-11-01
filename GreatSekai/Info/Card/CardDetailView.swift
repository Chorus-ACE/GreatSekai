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
    @State private var eventsRetry = 0
    @State private var gachasRetry = 0
    @State private var statsRetry = 0
    @State private var parsedEvents: [Event]?
    @State private var parsedGachas: [Gacha]?
    @State private var eventsFailed = false
    @State private var gachasFailed = false
    @State private var regionalCards: [SekaiLocale: Card]?
    @State private var regionalSkills: [SekaiLocale: [Skill]]?

    var body: some View {
        DetailViewBase(forType: Card.self, previewList: allCards, initialID: id) { information in
            Group {
                CardDetailOverviewView(information: information, regionalSkills: regionalSkills)
                CardDetailStatsView(card: information, regionalCards: regionalCards, regionalSkills: regionalSkills, retry: { statsRetry += 1 }).id(information.id)
    //            DetailsCostumesSection(costumes: [information.costume])
                CardRelatedSections(events: parsedEvents, gachas: parsedGachas,
                                    eventsFailed: eventsFailed, gachasFailed: gachasFailed,
                                    retryEvents: { eventsRetry += 1 },
                                    retryGachas: { gachasRetry += 1 }).id(information.id)
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
                    ArtsTab("Card.arts.cutout") {
                        ArtsItem(title: "Card.arts.normal", url: information.beforeTrainingCutoutURL)
                        if let url = information.afterTrainingCutoutURL {
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

                    ExternalLink(.sekaipedia, url: {
                        await Sekaipedia.url(for: .card, id: information.id)
                    }, note: "SekaipediaDynamicFetch"),

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
            }
            .task(id: "\(information.id)-events-\(eventsRetry)") {
                await loadEvents(for: information.id)
            }
            .task(id: "\(information.id)-gachas-\(gachasRetry)") {
                await loadGachas(for: information.id)
            }
            .task(id: "\(information.id)-stats-\(statsRetry)") {
                await loadStats(for: information)
            }
        } switcherDestination: {
            CardSearchView()
        }
    }

    private func loadEvents(for cardID: Int) async {
        eventsFailed = false
        parsedEvents = nil
        let events = await ExtendedEvent.events(containingCardID: cardID)
        guard !Task.isCancelled else { return }
        parsedEvents = events
        eventsFailed = events == nil
    }

    private func loadGachas(for cardID: Int) async {
        gachasFailed = false
        parsedGachas = nil
        let gachas = await Gacha.allWithCache()
        guard !Task.isCancelled else { return }
        parsedGachas = gachas?.filter { gacha in
            switch gacha.configuration {
            case .localized(let configurations):
                return SekaiLocale.allCases.contains { configurations[$0]?.pickupCardIDs.contains(cardID) == true }
            case .unlocalized(let configuration):
                return configuration?.pickupCardIDs.contains(cardID) == true
            }
        }
        gachasFailed = gachas == nil
    }

    private func loadStats(for card: Card) async {
        regionalCards = nil
        regionalSkills = nil
        let result = await withTaskGroup(of: (SekaiLocale, Card?, [Skill]?).self) { group in
            let locales = Set((card.name.localizedData?.allAvailableLocales ?? [])
                              + [.primaryLocale, .secondaryLocale, card.skillName.majorLocale ?? .primaryLocale])
            for locale in locales {
                group.addTask {
                    async let cards = Card.allInLocale(locale)
                    async let skills = Skill.all(forLocale: locale)
                    return await (locale, cards?.first { $0.id == card.id }, skills)
                }
            }
            var cards: [SekaiLocale: Card] = [:]
            var skills: [SekaiLocale: [Skill]] = [:]
            for await (locale, card, list) in group {
                cards[locale] = card
                skills[locale] = list
            }
            return (cards, skills)
        }
        guard !Task.isCancelled else { return }
        regionalCards = result.0
        regionalSkills = result.1
    }

}
