//===---*- Greatdori! -*---------------------------------------------------===//
//
// CardDetailOverviewView.swift
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
import SDWebImageSwiftUI
import SekaiKit
import SwiftUI

// MARK: CardDetailOverviewView
struct CardDetailOverviewView: View {
    @Environment(\.horizontalSizeClass) var sizeClass
    let information: Card
    let cardCoverScalingFactor: CGFloat = 1
    var body: some View {
        DetailInfoBase {
            DetailInfoItem("Card.title", localizableText: information.name)
            DetailInfoItem("Card.type", text: information.sourceType.localizedName)
            
            if let character = SekaiCache.preCache.character(id: information.characterID) {
                DetailInfoItem("Card.character") {
                    NavigationLink(destination: {
                        CharacterDetailView(id: character.id)
                    }, label: {
                        HStack {
                            MultilingualText(text: character.fullName)
                            WebImage(url: Character.iconImageURL(forID: character.id))
                                .resizable()
                                .clipShape(Circle())
                                .frame(width: imageButtonSize, height: imageButtonSize)
                        }
                        .accessibilityLabel(character.fullName.forPreferredLocale() ?? String("Info.unknown"))
                    })
                }
            }
            
//             FIXME: Unit Localizable Name
            DetailInfoItem("Card.unit") {
                HStack {
                    Text(information.unit.localizedName)
                        .environment(\.disablePopover, true)
                    WebImage(url: information.unit.iconImageURL)
                        .resizable()
                        .scaledToFit()
                        .frame(maxHeight: imageButtonSize)
                }
            }
            
            if let supportUnit = information.supportUnit {
                DetailInfoItem("Card.support-unit") {
                    HStack {
                        Text(supportUnit.localizedName)
                            .environment(\.disablePopover, true)
                        WebImage(url: supportUnit.iconImageURL)
                            .resizable()
                            .scaledToFit()
                            .frame(maxHeight: imageButtonSize)
                    }
                }
            }
            
            DetailInfoItem("Card.attribute") {
                HStack {
                    Text(information.attribute.name)
                    WebImage(url: information.attribute.iconImageURL)
                        .resizable()
                        .frame(width: imageButtonSize, height: imageButtonSize)
                }
            }
            DetailInfoItem("Card.rarity") {
                Group {
                    if let rarityInt = information.rarity.integer {
                        HStack(spacing: 1) {
                            ForEach(1...rarityInt, id: \.self) { _ in
                                Image(rarityInt >= 3 ? .rarityStarTrained : .rarityStarTrained)
                                    .resizable()
                                    .frame(width: imageButtonSize, height: imageButtonSize)
                            }
                        }
                    } else {
                        Image(.rarityBirthday)
                            .resizable()
                            .frame(width: imageButtonSize, height: imageButtonSize)
                    }
                }
                .accessibilityLabel("\(information.rarity.localizedName)")
            }
            
//            if let skill = allSkills.first(where: { $0.id == information.card.skillID }) {
//                DetailInfoItem("Card.skill", text: skill.maximumDescription)
//            }
            
            if !information.gachaPhrase.isCollectionEmpty {
                DetailInfoItem("Card.gacha-phrase") {
                    LocalizableText(information.gachaPhrase)
                    CompactAudioPlayer(url: information.gachaPhraseVoiceURL, showPlayButtonOnly: true)
                }
            }
            DetailInfoItem("Card.release-date", date: information.releaseDate, showLocaleKey: true)
            DetailInfoItem("ID", text: "\(String(information.id))")
        } head: {
            VStack {
                CardImage(information)
                    .wrapIf(sizeClass == .regular) { content in
                        content
                            .frame(maxWidth: infoContentMaxWidth)
                    } else: { content in
                        content
                            .padding(.horizontal, -15)
                    }
//                CustomGroupBox(cornerRadius: 3417) {
//                    // FIXME: Gacha Voice
////                    if !information.card.gachaText.isValueEmpty {
////                        CompactAudioPlayer(url: information.card.gachaVoiceURL)
////                    }
//                }
//                .frame(maxWidth: infoContentMaxWidth)
            }
        }
//        .task {
//            // Load skills asynchronously once when the view appears
//            if allSkills.isEmpty {
//                if let fetched = await Skill.all() {
//                    allSkills = fetched
//                }
//            }
//        }
    }
}
