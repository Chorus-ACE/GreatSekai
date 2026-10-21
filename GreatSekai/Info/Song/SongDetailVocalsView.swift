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
    @State private var expanded = false

    private var displayedVocals: [Song.VocalVersion] {
        let vocals = information.vocals ?? []
        return expanded ? vocals : Array(vocals.prefix(3))
    }
    
    let dateFormatter = {
        let df = DateFormatter()
        df.dateStyle = .long
        df.timeStyle = .short
        return df
    }()
    var body: some View {
        Section(content: {
            VStack {
                ForEach(displayedVocals) { vocal in
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
                                
                                if let publishDate = vocal.publishDate?.corrected() {
                                    ListItem(title: {
                                        Text("Song.vocal.release-date")
                                    }, value: {
                                        Text(dateFormatter.string(from: publishDate))
                                    })
                                }
                                
                                ListItemReleaseCondition(releaseConditionID: vocal.releaseConditionID)
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
                Spacer()
                if (information.vocals?.count ?? 0) > 3 {
                    Button(expanded ? "Details.show-less" : "Details.show-all.\(information.vocals?.count ?? 0)") {
                        expanded.toggle()
                    }
                    .buttonStyle(.plain)
                    .foregroundStyle(.secondary)
                }
            }
            .frame(maxWidth: 615)
            .detailSectionHeader()
        })
        .onChange(of: information.id) {
            expanded = false
        }
    }
}

struct ListItemReleaseCondition: View {
    var releaseConditionID: Int
    @State var sentence: LocalizableData<String>? = nil
    var body: some View {
        ListItem(title: {
            Text("Release-condition")
        }, value: {
            if let sentence {
                LocalizableText(sentence)
            } else {
                Text(verbatim: "Lorem Ipsum")
                    .redacted(reason: .placeholder)
            }
        })
        .onChange(of: releaseConditionID, initial: true) {
            Task {
                sentence = await ReleaseCondition(id: releaseConditionID)?.title
            }
        }
    }
}
