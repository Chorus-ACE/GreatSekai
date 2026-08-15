//
//  SongDetailVocalsView.swift
//  GreatSekai
//
//  Created by ThreeManager785 on 2026/8/15.
//

import SDWebImageSwiftUI
import SekaiKit
import SwiftUI

struct SongDetailVocalsView: View {
    var information: ExtendedSong
    @State var vocal: Song.VocalVersion? = nil
    
    let dateFormatter = {
        let df = DateFormatter()
        df.dateStyle = .long
        df.timeStyle = .short
        return df
    }()
    var body: some View {
        Section(content: {
            VStack {
                ForEach(information.vocals ?? []) { vocal in
                    CustomGroupBox {
                        VStack {
                            Group {
                                ListItem(title: {
                                    Text("Song.vocal.name")
                                }, value: {
                                    LocalizableText(vocal.caption)
                                })
                                
                                ListItem(title: {
                                    Text("Song.vocal.characters")
                                }, value: {
                                    if vocal.characters.isEmpty {
                                        Text("Song.vocal.none")
                                            .foregroundStyle(.secondary)
                                    } else if vocal.characters.count == 1 {
                                        let item = vocal.characters.first!
                                        if item.isInternalCharacter {
                                            NavigationLink(destination: {
                                                CharacterDetailView(id: item.characterID)
                                            }, label: {
                                                Text(item.name.majorValue ?? String(localized: "Info.unknown"))
                                                WebImage(url: Character.iconImageURL(forID: item.characterID))
                                                    .antialiased(true)
                                                    .resizable()
                                                    .frame(width: imageButtonSize, height: imageButtonSize)
                                            })
                                            .buttonStyle(.plain)
                                        } else {
                                            Text(item.name.majorValue ?? String(localized: "Info.unknown"))
                                        }
                                    } else if vocal.characters.allSatisfy(\.isInternalCharacter) {
                                        CharacterWrappingHStack(characters: vocal.characters.map(\.characterID))
                                    } else {
                                        Text(ListFormatter.localizedString(byJoining: vocal.characters.map({ $0.name.majorValue ?? String(localized: "Info.unknown") })))
                                    }
                                })
                                
                                if vocal.publishDate.corrected() != nil {
                                    ListItem(title: {
                                        Text("Song.vocal.release-date")
                                    }, value: {
                                        Text(dateFormatter.string(from: vocal.publishDate))
                                    })
                                }
                            }
                            .insert {
                                Divider()
                            }
                        }
                    }
                }
            }
            .emptyReplacement {
                CustomGroupBox {
                    HStack {
                        Spacer()
                        ProgressView()
                        Spacer()
                    }
                }
            }
            .frame(maxWidth: infoContentMaxWidth)
        }, header: {
            HStack {
                Text("Song.vocal")
                    .font(.title2)
                    .bold()
//                if let vocals = information.vocals {
//                    DetailSectionOptionPicker(
//                        selection: $vocal,
//                        options: vocals,
//                        labels: Dictionary(uniqueKeysWithValues: zip(
//                            vocals,
//                            vocals.map({ $0.caption.majorValue ?? "" })
//                        ))
//                    )
//                    .disabled(vocals.count <= 1)
//                }
                Spacer()
            }
            .frame(maxWidth: 615)
            .detailSectionHeader()
        })
        .onAppear {
            if vocal == nil {
                vocal = information.vocals?.first(where: { $0.type == .sekai }) ?? information.vocals?.first
            }
        }
    }
}
