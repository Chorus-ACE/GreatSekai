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
    
    @State private var allCards: [Card]?
    @State private var allEvents: [Event]?
    @State var randomCard: Card? = nil
    
    @Environment(\.horizontalSizeClass) var sizeClass
    var body: some View {
        DetailViewBase(forType: Character.self, previewList: allCharacters, initialID: id) { information in
            HStack {
                Spacer(minLength: 0)
                VStack {
                    if let randomCard, randomCard.characterID == information.id {
                        CardImage(randomCard)
                            .frame(maxWidth: infoContentMaxWidth)
                    }
                    
                    if randomCard?.characterID == information.id {
                        Button(action: {
                            randomCard = allCards?.filter({ $0.characterID == information.id }).randomElement()
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
            .task(id: information.id) {
                if allCards == nil {
                    let fetchedCards = await Card.allWithCache()
                    guard !Task.isCancelled else { return }
                    allCards = fetchedCards ?? []
                }
                if randomCard?.characterID != information.id {
                    randomCard = allCards?.filter { $0.characterID == information.id }.randomElement()
                }
            }
            
            CharacterDetailOverviewView(information: information)
            DetailsCardsSection(cards: allCards?.filter { $0.characterID == information.id })
            DetailsEventsSection(events: allEvents, character: information)
            
            ExternalLinksSection(links: [
                ExternalLink(.sekaiViewer,
                    url: URL(string: "https://sekai.best/chara/\(information.id)")!
                ),
                ExternalLink(.sekaipedia,
                    url: URL(string: "https://www.sekaipedia.org/wiki/\((information.fullName.localizedData?.forLocale(.en) ?? "").replacingOccurrences(of: " ", with: "_"))")!
                ),
                ExternalLink(.cleista,
                    url: URL(string: "https://pjsk.cleista.cc/#/characters/\(information.givenNameEnglish.lowercased())")!
                ),
                ExternalLink(.moeSekai,
                    url: URL(string: "https://pjsk.moe/character/\(information.id)/")!
                )
            ])
        } switcherDestination: {
            CharacterSearchView()
        }
        .task {
            if allEvents == nil {
                let fetchedEvents = await Event.allWithCache()
                guard !Task.isCancelled else { return }
                allEvents = fetchedEvents ?? []
            }
        }
    }
}
