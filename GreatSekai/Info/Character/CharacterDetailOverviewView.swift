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
    @AppStorage("showCharacterDetails") var showCharacterDetails = false
    let information: Character
    @State var colorDetailsIsDisplaying = false
    var dateFormatter: DateFormatter {
        let df = DateFormatter()
        df.timeZone = .init(identifier: "Asia/Tokyo")!
        df.setLocalizedDateFormatFromTemplate("MMM d")
        return df
    }
    var body: some View {
        Group {
            VStack {
                CustomGroupBox(cornerRadius: 20) {
                    VStack {
                        Group {
                            ListItem(title: {
                                Text("Character.name")
                            }, value: {
                                LocalizableText(text: information.fullName)
                            })
                            
                            ListItem(title: {
                                Text("Character.furigana")
                            }, value: {
                                LocalizableText(text: information.fullNameRuby)
                            })
                            
                            if !information.characterVoice.isEmpty {
                                ListItem(title: {
                                    Text("Character.character-voice")
                                }, value: {
                                    LocalizableText(text: information.characterVoice)
                                })
                            }
                            
                            if let color = information.color {
                                ListItem(title: {
                                    Text("Character.color")
                                }, value: {
                                    HStack {
                                        ColorLabel(color: color)
                                        if showCharacterDetails {
                                            Button(action: {
                                                colorDetailsIsDisplaying = true
                                            }, label: {
                                                Image(systemName: "info.circle")
                                            })
                                            .buttonStyle(.plain)
                                        }
                                    }
                                })
                            }
                            
                            if showCharacterDetails {
                                ListItem(title: {
                                    Text("Character.gender")
                                }, value: {
                                    Text(information.gender.localizedName)
                                })
                            }
                            
                            ListItem(title: {
                                Text("Character.unit")
                            }, value: {
                                UnitLabel(unit: information.unit)
                            })
                            
                            
                            ListItem(title: {
                                Text("Character.birthday")
                                    .bold()
                            }, value: {
                                if let birthday = information.birthday, let date = Calendar.current.date(from: birthday) {
                                    Text(dateFormatter.string(from: date))
                                } else {
                                    LocalizableText(text: information.literalBirthday)
                                }
                            })
                            
                            ListItem(title: {
                                Text("Character.height")
                                    .bold()
                            }, value: {
                                Text(information.height, format: .measurement(width: .narrow, usage: .personHeight))
                            })
                            
                            if !information.school.isEmpty {
                                
                                ListItem(title: {
                                    Text("Character.school")
                                        .bold()
                                }, value: {
                                    LocalizableText(text: information.school)
                                })
                                
                                ListItem(title: {
                                    Text("Character.class")
                                }, value: {
                                    LocalizableText(text: information.schoolClass)
                                })
                                
                                ListItem(title: {
                                    Text("Character.special-skill")
                                        .bold()
                                }, value: {
                                    LocalizableText(text: information.specialSkill)
                                })
                                
                                ListItem(title: {
                                    Text("Character.hobby")
                                        .bold()
                                }, value: {
                                    LocalizableText(text: information.hobby)
                                })
                                
                                ListItem(title: {
                                    Text("Character.favorite-food")
                                        .bold()
                                }, value: {
                                    LocalizableText(text: information.favoriteFood)
                                })
                                
                                ListItem(title: {
                                    Text("Character.disliked-food")
                                        .bold()
                                }, value: {
                                    LocalizableText(text: information.dislikedFood)
                                })
                                
                                ListItem(title: {
                                    Text("Character.weakness")
                                        .bold()
                                }, value: {
                                    LocalizableText(text: information.weakness)
                                })
                            }
                            
                            ListItem(title: {
                                Text("Character.introduction")
                            }, value: {
                                LocalizableText(text: information.introduction, showSecondaryText: false)
                                    .environment(\.disablePopover, true)
                            })
                            .listItemLayout(.basedOnUISizeClass)
                            
                            ListItem(title: {
                                Text("Info.id")
                            }, value: {
                                Text("\(String(information.id))")
                            })
                        }
                        .insert {
                            Divider()
                        }
                    }
                }
                
                if showCharacterDetails {
                    CustomGroupBox(cornerRadius: 20) {
                        VStack {
                            Group {
                                ListItem(title: {
                                    Text("Character.advanced.figure")
                                }, value: {
                                    Text(information.figure.rawValue)
                                        .fontDesign(.monospaced)
                                })
                                
                                ListItem(title: {
                                    Text("Character.advanced.breast-size")
                                }, value: {
                                    Text(information.breastSize.rawValue)
                                        .fontDesign(.monospaced)
                                })
                                
                                ListItem(title: {
                                    Text("Character.advanced.live2d-height-adjustment-value")
                                }, value: {
                                    Text("\(information.live2DHeightAdjustment)")
                                        .fontDesign(.monospaced)
                                })
                                
                                ListItem(title: {
                                    Text("Character.advanced.support-unit-type")
                                }, value: {
                                    Text(information.supportUnitType.rawValue)
                                        .fontDesign(.monospaced)
                                })
                            }
                            .insert {
                                Divider()
                            }
                        }
                    }
                }
            }
        }
        .frame(maxWidth: infoContentMaxWidth)
        .sheet(isPresented: $colorDetailsIsDisplaying, content: {
            CharacterDetailColorInfo(colorInfo: information.colorInfo)
        })
    }
}

struct CharacterDetailColorInfo: View {
    var colorInfo: [Character.CharacterColors]
    var body: some View {
        ScrollView {
            VStack {
                ForEach(colorInfo, id: \.self) { colors in
                    CustomGroupBox(cornerRadius: 20) {
                        VStack {
                            Group {
                                ListItem(title: {
                                    Text("Info.id")
                                }, value: {
                                    Text(String(colors.id))
                                })
                                ListItem(title: {
                                    Text("Character.color.unit")
                                }, value: {
                                    UnitLabel(unit: colors.unit)
                                })
                                
                                ListItem(title: {
                                    Text("Character.color.main-color")
                                }, value: {
                                    ColorLabel(color: colors.mainColor)
                                })
                                
                                ListItem(title: {
                                    Text("Character.color.skin-color")
                                }, value: {
                                    ColorLabel(color: colors.skinColor)
                                })
                                
                                ListItem(title: {
                                    Text("Character.color.skin-shadow-color-1")
                                }, value: {
                                    ColorLabel(color: colors.skinShadowColor1)
                                })
                                
                                ListItem(title: {
                                    Text("Character.color.skin-shadow-color-2")
                                }, value: {
                                    ColorLabel(color: colors.skinShadowColor2)
                                })
                            }
                            .insert {
                                Divider()
                            }
                        }
                    }
                }
            }
            .padding()
        }
        .navigationTitle("Character.color.details")
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
                .aspectRatio(contentMode: .fit)
                .frame(height: 30)
            Text(unit.localizedName)
        }
    }
}
