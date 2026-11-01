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
    let regionalSkills: [SekaiLocale: [Skill]]?
    private var skillDescription: LocalizedData<String> {
        LocalizedData { locale in
            let skillID = information.isInitiallySpecialTrained ? information.specialTrainingSkillID ?? information.skillID : information.skillID
            let skill = regionalSkills?[locale]?.first { $0.id == skillID }
            let level = skill?.effects.flatMap { $0.details.map(\.level) }.max() ?? 1
            return skill?.description(atLevel: level, characterName: SekaiCache.preCache.character(id: information.characterID)?.fullName.forLocale(locale))
        }
    }
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
            
            if !skillDescription.isEmpty {
                DetailInfoItem("Card.skill", localizableText: .localized(skillDescription))
            }
            
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
                    .frame(maxWidth: infoContentMaxWidth)
//                    .wrapIf(sizeClass == .regular) { content in
//                        content
//                            .frame(maxWidth: infoContentMaxWidth)
//                    } else: { content in
//                        content
//                            .padding(.horizontal, -15)
//                    }
//                CustomGroupBox(cornerRadius: 3417) {
//                    // FIXME: Gacha Voice
////                    if !information.card.gachaText.isValueEmpty {
////                        CompactAudioPlayer(url: information.card.gachaVoiceURL)
////                    }
//                }
//                .frame(maxWidth: infoContentMaxWidth)
            }
        }
    }
}
