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
    var body: some View {
        DetailViewBase(previewList: allCharacters, initialID: id) { information in
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
//            ExternalLinksSection(links: [ExternalLink(name: "External-link.bestdori", url: URL(string: "https://bestdori.com/info/events/\(id)")!)])
        } switcherDestination: {
            CharacterSearchView()
        }
    }
}
