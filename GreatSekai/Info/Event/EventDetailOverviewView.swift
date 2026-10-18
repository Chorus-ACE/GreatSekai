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

    @State var accessibilityNavigationTargetCard = 0
    @State var accessibilityNavigationIsActive = false
    
    @AppStorage("showAdvancedDetails") var showAdvancedDetails = false
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
                CharacterWrappingHStack(characters: information.event.characters, wrapCompleteVirtualSingers: true)
                Text("+\(information.event.characterBonus)%")
                    .lineLimit(1)
                    .fixedSize(horizontal: true, vertical: true)
            }
            
            if let focusID = information.event.focusCharacterID,
               let rotation = information.event.focusCharacterIndex,
               let character = SekaiCache.preCache.character(id: focusID),
               let rotationNumeralText = { () -> String? in
//                if Locale.current.language.minimalIdentifier.contains("zh") {
//                    return String(rotation)
//                }
                let formatter = NumberFormatter()
                formatter.numberStyle = .ordinal
                return formatter.string(from: NSNumber(value: rotation))
            }()
            {
                DetailInfoItem("Event.focus") {
                    NavigationLink(destination: {
                        CharacterDetailView(id: character.id)
                    }, label: {
                        HStack {
                            VStack(alignment: .trailing) {
                                Text(character.fullName.forPreferredLocale() ?? String(localized: "Info.unknown"))
                                    .typesettingLanguage(.explicit(SekaiLocale.primaryLocale.nsLocale.language))
                                Text("Event.focus.rotation-\(rotationNumeralText)")
                                    .foregroundStyle(.secondary)
                            }
                            .multilineTextAlignment(.trailing)
                            .textSelection(.enabled)
                            .fixedSize(horizontal: false, vertical: true)
                            
                            WebImage(url: Character.iconImageURL(forID: character.id))
                                .resizable()
                                .clipShape(Circle())
                                .frame(width: imageButtonSize, height: imageButtonSize)
                        }
                        .accessibilityLabel(information.event.focusCharacterLabel ?? String("Info.unknown"))
                    })
                }
            }
            
            if showAdvancedDetails {
                DetailInfoItem("Info.asset-bundle-name", content: {
                    Text(information.event.assetBundleName)
                        .fontDesign(.monospaced)
                })
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
