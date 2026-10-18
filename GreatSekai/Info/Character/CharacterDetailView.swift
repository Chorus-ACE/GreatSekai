//
//  CharacterDetailView.swift
//  GreatSekai
//
//  Created by ThreeManager785 on 2026/3/10.
//

import SekaiKit
import SwiftUI

struct CharacterDetailView: View {
    var id: Int
    var allCharacters: [Character]?
    
    @State var allCards: [Card] = []
//    @State var allCharacterCards: [Card] = []
    @State var randomCard: Card? = nil
    
    @Environment(\.horizontalSizeClass) var sizeClass
    var body: some View {
        DetailViewBase(forType: Character.self, previewList: allCharacters, initialID: id) { information in
            HStack {
                Spacer(minLength: 0)
                VStack {
                    if let randomCard {
                        CardImage(randomCard)
                            .frame(maxWidth: infoContentMaxWidth)
                    }
                    
                    if randomCard != nil {
                        Button(action: {
                            randomCard = allCards.filter({ $0.characterID == information.id }).randomElement()
                        }, label: {
                            Label("Character.random-card", systemImage: "arrow.clockwise")
                        })
                        .wrapIf(true) { content in
                            if #available(iOS 26.0, macOS 26.0, *) {
                                content.buttonStyle(.glass)
                            } else {
                                content.buttonStyle(.bordered)
                            }
                        }
                        .buttonBorderShape(.capsule)
                    }
                }
                Spacer(minLength: 0)
            }
            .onAppear {
                if randomCard?.id != information.id {
                    randomCard = allCards.filter({ $0.characterID == information.id }).randomElement()
                }
            }
            
            CharacterDetailOverviewView(information: information)
//            DetailArtsSection {
//                ArtsTab("Event.arts.banner", ratio: 3) {
//                    for locale in DoriLocale.allCases {
//                        if let url = information.event.bannerImageURL(in: locale, allowsFallback: false) {
//                            ArtsItem(title: LocalizedStringResource(stringLiteral: locale.rawValue.uppercased()), url: url)
//                        }
//                        if let url = information.event.homeBannerImageURL(in: locale, allowsFallback: false) {
//                            ArtsItem(title: LocalizedStringResource(stringLiteral: locale.rawValue.uppercased()), url: url)
//                        }
// 
//                    }
//                }
//                ArtsTab("Event.arts.logo", ratio: 450/200) {
//                    for locale in DoriLocale.allCases {
//                        if let url = information.event.logoImageURL(in: locale, allowsFallback: false) {
//                            ArtsItem(title: LocalizedStringResource(stringLiteral: locale.rawValue.uppercased()), url: url)
//                        }
//                    }
//                }
//                ArtsTab("Event.arts.home-screen") {
//                    ArtsItem(title: "Event.arts.home-screen.characters", url: information.event.topScreenTrimmedImageURL, ratio: 1)
//                    ArtsItem(title: "Event.arts.home-screen.background", url: information.event.topScreenBackgroundImageURL, ratio: 816/613)
//                }
//            }
//            
            DetailArtsSection {
                ArtsTab("Character.arts.selection", ratio: 0.45) {
                    for locale in SekaiLocale.allCases where information.givenName.localizedData?.availableInLocale(locale) == true {
                        ArtsItem(title: .init(stringLiteral: locale.rawValue.uppercased()), url: information.selectionImageURL(in: locale))
                    }
                }
                if let url = information.iconImageURL {
                    ArtsTab("Character.arts.icon") {
                        ArtsItem(title: .init(stringLiteral: information.fullName.majorValue ?? ""), url: url)
                    }
                }
            }
            
            ExternalLinksSection(links: [
                ExternalLink(
                    name: "External-link.sekai-viewer",
                    url: URL(string: "https://sekai.best/chara/\(information.id)")!
                ),
                ExternalLink(
                    name: "External-link.sekaipedia",
                    url: URL(string: "https://www.sekaipedia.org/wiki/\((information.fullName.localizedData?.forLocale(.en) ?? "").replacingOccurrences(of: " ", with: "_"))")!
                ),
                ExternalLink(
                    name: "External-link.cleista",
                    url: URL(string: "https://pjsk.cleista.cc/#/characters/\(information.givenNameEnglish.lowercased())")!
                ),
                ExternalLink(
                    name: "External-link.moesekai",
                    url: URL(string: "https://pjsk.moe/character/\(information.id)/")!
                )
            ])
        } switcherDestination: {
            CharacterSearchView()
        }
        .onAppear {
            if allCards.isEmpty {
                Task {
                    if let fetchedCards = await Card.allWithCache(), randomCard == nil {
                        allCards = fetchedCards
                        randomCard = allCards.filter({ $0.characterID == id }).randomElement()
                    }
                }
            }
        }
    }
}
