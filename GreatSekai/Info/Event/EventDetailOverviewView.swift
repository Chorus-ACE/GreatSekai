//===---*- Greatdori! -*---------------------------------------------------===//
//
// EventDetailOverviewView.swift
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

import SekaiKit
import SDWebImageSwiftUI
import SwiftUI

// MARK: EventDetailOverviewView
struct EventDetailOverviewView: View {
    let information: ExtendedEvent
//    @State var eventCharacterPercentageDict: [Int: [DoriAPI.Events.EventCharacter]] = [:]
//    @State var eventCharacterNameDict: [Int: LocalizedData<String>] = [:]
//    @State var cardsArray: [PreviewCard] = []
//    @State var cardsArraySeperated: [[PreviewCard?]] = []
//    @State var cardsPercentage: Int = -100
//    @State var rewardsArray: [PreviewCard] = []
//    @State var cardsTitleWidth: CGFloat = 0 // Fixed
//    @State var cardsPercentageWidth: CGFloat = 0 // Fixed
//    @State var cardsContentRegularWidth: CGFloat = 0 // Fixed
//    @State var cardsFixedWidth: CGFloat = 0 //Fixed
//    @State var cardsUseCompactLayout = true
    
    @State var accessibilityNavigationTargetCard = 0
    @State var accessibilityNavigationIsActive = false
    var dateFormatter: DateFormatter { let df = DateFormatter(); df.dateStyle = .long; df.timeStyle = .short; return df }
    var body: some View {
        DetailInfoBase {
            DetailInfoItem("Event.title", localizableText: information.event.title)
            DetailInfoItem("Event.type", text: information.event.eventType.localizedName)
            DetailInfoItem("Event.countdown", content: {
                CountdownText(information.event)
            })
            
            DetailInfoItem("Event.start-date", date: information.event.startDate)
            DetailInfoItem("Event.end-date", date: information.event.endDate)
            
            if let unit = information.event.unit {
                DetailInfoItem("Event.unit", content: {
                    UnitLabel(unit: unit)
                })
            }
            
            if let attribute = information.event.attribute, let attributeBonus = information.event.attributeBonus {
                DetailInfoItem("Event.attribute") {
                    VStack(alignment: .trailing) {
                        HStack {
                            WebImage(url: attribute.iconImageURL)
                                .antialiased(true)
                                .resizable()
                                .frame(width: imageButtonSize, height: imageButtonSize)
                            Text(verbatim: "+\(attributeBonus)%")
                        }
                    }
                    .accessibilityLabel(String("\(attribute.name), +\(attributeBonus)%"))
                }
            }
            
            DetailInfoItem("Event.character") {
                CharacterWrappingHStack(characters: information.event.characters)
                Text("+\(information.event.characterBonus)%")
                    .lineLimit(1)
                    .fixedSize(horizontal: true, vertical: true)
            }
            
            DetailInfoItem("ID", text: "\(String(information.id))")
        } head: {
            VStack {
                Group {
                    // MARK: Title Image
                    Group {
                        Rectangle()
                            .opacity(0)
                            .frame(height: 2)
                        FallbackableWebImage(throughURLs: [information.event.bannerImageURL, information.event.bannerImageAltURL]) { image in
                            image
                                .resizable()
                                .antialiased(true)
                                .interpolation(.high)
                        } placeholder: {
                            RoundedRectangle(cornerRadius: 10)
                                .fill(getPlaceholderColor())
                        }
                        .aspectRatio(bannerRatio, contentMode: .fit)
                        .frame(maxWidth: bannerWidth, maxHeight: bannerWidth/bannerRatio)
                        .cornerRadius(10)
                        
                        Rectangle()
                            .opacity(0)
                            .frame(height: 2)
                    }
                    
//                    if isSayuruVersion {
                        CustomGroupBox(cornerRadius: 3417) {
                            CompactAudioPlayer(url: information.event.backgroundMusicURL)
                        }
//                    }
                }
            }
        }
    }
}
