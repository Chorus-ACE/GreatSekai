//
//  CharacterDetailOverviewView.swift
//  GreatSekai
//
//  Created by ThreeManager785 on 2026/3/22.
//

import SDWebImageSwiftUI
import SekaiKit
import SwiftUI


struct CharacterDetailOverviewView: View {
    let information: Character
    
    @State var colorDetailsIsDisplaying = false
    
    @AppStorage("showCharacterDetails") var showCharacterDetails = false
    
    var dateFormatter: DateFormatter {
        let df = DateFormatter()
        df.timeZone = .init(identifier: "Asia/Tokyo")!
        df.setLocalizedDateFormatFromTemplate("MMM d")
        return df
    }
    var calendar = {
        var calendar = Calendar.current
        calendar.timeZone = .init(identifier: "Asia/Tokyo")!
        return calendar
    }
    var body: some View {
        DetailInfoBase(content: {
            DetailInfoItem("Character.name", localizableText: information.fullName)
            DetailInfoItem(SekaiLocale.primaryLocale == .jp ? "Character.furigana" : "Character.pronunciation", localizableText: information.fullNameRuby)
            
            if !information.characterVoice.isEmpty {
                DetailInfoItem("Character.character-voice", localizableText: information.characterVoice)
            }
            
            if let color = information.color {
                DetailInfoItem("Character.color", content: {
                    HStack {
                        ColorLabel(color: color)
                        if showCharacterDetails {
                            Button(action: {
                                colorDetailsIsDisplaying = true
                            }, label: {
                                Label("Character.color.show-details", systemImage: "info.circle")
                                    .labelStyle(.iconOnly)
                            })
                            .buttonStyle(.plain)
                        }
                    }
                    .contextMenu {
                        Button(action: {
                            colorDetailsIsDisplaying = true
                        }, label: {
                            Label("Character.color.show-details", systemImage: "info.circle")
                        })
                    }
                })
            }
            
            DetailInfoItem("Character.unit", content: {
                UnitLabel(unit: information.unit)
            })
            
            if showCharacterDetails {
                DetailInfoItem("Character.advanced.support-unit-type", content: {
                    Text(information.supportUnitType.rawValue)
                        .fontDesign(.monospaced)
                })
            }
            
            if showCharacterDetails {
                DetailInfoItem("Character.gender", text: information.gender.localizedName)
            }
            
            DetailInfoItem("Character.birthday", content: {
                if let birthday = information.birthday, let date = calendar().date(from: birthday) {
                    Text(dateFormatter.string(from: date))
                } else {
                    LocalizableText(information.literalBirthday)
                }
            })
            
            DetailInfoItem("Character.height", content: {
                Text(information.height, format: .measurement(width: .narrow, usage: .personHeight))
            })
            
            if showCharacterDetails {
                DetailInfoItem("Character.advanced.live2d-height-adjustment-value", content: {
                    Text("\(information.live2DHeightAdjustment)")
                        .fontDesign(.monospaced)
                })
            }
            
            if !information.school.isEmpty {
                DetailInfoItem("Character.school", localizableText: information.school)
                DetailInfoItem("Character.class", localizableText: information.schoolClass)
                DetailInfoItem("Character.special-skill", localizableText: information.specialSkill)
                DetailInfoItem("Character.hobby", localizableText: information.hobby)
                DetailInfoItem("Character.favorite-food", localizableText: information.favoriteFood)
                DetailInfoItem("Character.disliked-food", localizableText: information.dislikedFood)
                DetailInfoItem("Character.weakness", localizableText: information.weakness)
            }
            
            DetailInfoItem("Character.advanced.figure", content: {
                Text(information.figure.rawValue)
                    .fontDesign(.monospaced)
            })
            
            DetailInfoItem("Character.advanced.breast-size", content: {
                Text(information.breastSize.rawValue)
                    .fontDesign(.monospaced)
            })
            
            DetailInfoItem("Character.introduction", content: {
                LocalizableText(information.introduction, showSecondaryText: false)
                    .listItemLayout(.basedOnUISizeClass)
                    .environment(\.disablePopover, true)
            })
            DetailInfoItem("Info.id", text: "\(String(information.id))")
        })
        .sheet(isPresented: $colorDetailsIsDisplaying, content: {
            CharacterDetailColorInfo(colorInfo: information.colorInfo.first)
        })
    }
}

struct CharacterDetailColorInfo: View {
    var colorInfo: Character.CharacterColors?
    
    @Environment(\.dismiss) var dismiss
    var body: some View {
        NavigationStack {
            Group {
                if let colorInfo {
                    Form {
                        ListItem(title: {
                            Text("Character.color.main-color")
                                .bold(false)
                        }, value: {
                            ColorLabel(color: colorInfo.mainColor)
                        })
                        
                        ListItem(title: {
                            Text("Character.color.skin-color")
                                .bold(false)
                        }, value: {
                            ColorLabel(color: colorInfo.skinColor)
                        })
                        
                        ListItem(title: {
                            Text("Character.color.skin-shadow-color-1")
                                .bold(false)
                        }, value: {
                            ColorLabel(color: colorInfo.skinShadowColor1)
                        })
                        
                        ListItem(title: {
                            Text("Character.color.skin-shadow-color-2")
                                .bold(false)
                        }, value: {
                            ColorLabel(color: colorInfo.skinShadowColor2)
                        })
                    }
                    .formStyle(.grouped)
                } else {
                    Text(verbatim: "111")
                }
            }
            .navigationTitle("Character.color.details")
            .toolbar {
                ToolbarItem(placement: .cancellationAction, content: {
                    Button(optionalRole: .cancel, action: {
                        dismiss()
                    }, label: {
                        Label("Character.color.details.close", systemImage: "xmark")
                            .wrapIf(platform == .macOS, in: {
                                $0.labelStyle(.titleOnly)
                            })
                    })
                })
            }
        }
    }
}

struct ColorLabel: View {
    var color: Color
    var body: some View {
        HStack {
            RoundedRectangle(cornerRadius: 7)
                .frame(width: 30, height: 30)
                .foregroundStyle(color)
            Text(color.toHex() ?? "")
                .fontDesign(.monospaced)
                .speechSpellsOutCharacters()
        }
    }
}

struct UnitLabel: View {
    var unit: SekaiKit.Unit
    var body: some View {
        HStack {
            WebImage(url: unit.iconImageURL)
                .resizable()
                .interpolation(.high)
                .antialiased(true)
//                .aspectRatio(contentMode: .fit)
                .scaledToFit()
                .frame(maxHeight: 30)
            Text(unit.localizedName)
        }
    }
}


struct CharacterWrappingHStack: View {
    var characters: [Int]
    
    init(characters: [Int]) {
        self.characters = characters
    }
    
    init(characters: [Character]) {
        self.characters = characters.map(\.id)
    }
    var body: some View {
        WrappingHStack(alignment: .trailing) {
            ForEach(characters, id: \.self) { item in
#if os(macOS)
                NavigationLink(destination: {
                    CharacterDetailView(id: item)
                }, label: {
                    WebImage(url: Character.iconImageURL(forID: item))
                        .antialiased(true)
                        .resizable()
                        .frame(width: imageButtonSize, height: imageButtonSize)
                })
                .buttonStyle(.plain)
#else
                Menu(content: {
                    NavigationLink(destination: {
                        CharacterDetailView(id: item)
                    }, label: {
                        HStack {
                            WebImage(url: Character.iconImageURL(forID: item))
                                .antialiased(true)
                                .resizable()
                                .frame(width: imageButtonSize, height: imageButtonSize)
                            if let name = SekaiCache.preCache.character(id: item)?.fullName.forPreferredLocale() {
                                Text(name)
                            } else {
                                Text(verbatim: "Lorum Ipsum")
                                    .foregroundStyle(Color(UIColor.placeholderText))
                                    .redacted(reason: .placeholder)
                            }
                        }
                    })
                }, label: {
                    WebImage(url: Character.iconImageURL(forID: item))
                        .antialiased(true)
                        .resizable()
                        .frame(width: imageButtonSize, height: imageButtonSize)
                })
#endif
            }
        }
        .frame(maxWidth: CGFloat(characters.count) * (imageButtonSize + 10))
    }
}
