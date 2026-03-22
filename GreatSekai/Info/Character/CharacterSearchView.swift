//
//  CharacterSearchView.swift
//  GreatSekai
//
//  Created by ThreeManager785 on 2026/3/22.
//

import SDWebImageSwiftUI
import SekaiKit
import SwiftUI

struct CharacterSearchView: View {
    @Environment(\.horizontalSizeClass) var sizeClass
    @Namespace var detailNavigation
    
    @State var infoIsAvailable = true
    @State var infoIsReady = false
    
    @State var allCharacters: [Character] = []
    var body: some View {
        Group {
            if infoIsReady {
                ScrollView {
                    HStack {
                        Spacer(minLength: 0)
                        VStack {
                            ForEach(Unit.allCases, id: \.self) { unit in
                                WebImage(url: unit.logoImageURL, content: { content in
                                    content
                                        .aspectRatio(contentMode: .fit)
                                }, placeholder: {
                                    RoundedRectangle(cornerRadius: 5)
                                        .foregroundStyle(.tertiary)
                                        .aspectRatio(637/247, contentMode: .fit)
                                })
                                .resizable()
                                .frame(height: 76*1.2)
                                .help(unit.localizedName)
                                .accessibilityElement()
                                .accessibilityLabel(unit.localizedName)
                                .accessibilityAddTraits([.isImage, .isHeader])
                                HStack {
                                    ForEach(unit.members, id: \.self) { charID in
                                        NavigationLink(destination: {
                                            CharacterDetailView(id: charID, allCharacters: allCharacters)
                                            EmptyView()
#if !os(macOS)
                                                .wrapIf(true, in: { content in
                                                    if #available(iOS 18.0, *) {
                                                        content
                                                            .navigationTransition(.zoom(sourceID: char.id, in: detailNavigation))
                                                    } else {
                                                        content
                                                    }
                                                })
#endif
                                        }, label: {
                                            WebImage(url: Character.selectionImageURL(forID: charID), content: { content in
                                                content
                                                    .aspectRatio(contentMode: .fit)
                                            }, placeholder: {
                                                RoundedRectangle(cornerRadius: 5)
                                                    .foregroundStyle(.tertiary)
                                                    .aspectRatio(unit == .virturalSinger ? 240/840 : 376/840, contentMode: .fit)
                                            })
                                            .resizable()
                                            .frame(maxWidth: 200*(unit == .virturalSinger ? 2/3 : 1))
                                        })
                                        .buttonStyle(.plain)
                                        .id(charID)
                                        .wrapIf(true, in: { content in
                                            if #available(iOS 18.0, macOS 15.0, *) {
                                                content
                                                    .matchedTransitionSource(id: charID, in: detailNavigation)
                                            } else {
                                                content
                                            }
                                        })
                                        .help(allCharacters.first(where: { $0.id == charID })?.fullName ?? "")
                                        .accessibilityLabel(allCharacters.first(where: { $0.id == charID })?.fullName ?? "")
                                    }
                                }
                                if sizeClass == .regular {
                                    Rectangle()
                                        .frame(width: 0, height: 20)
                                }
                            }
                        }
                        Spacer(minLength: 0)
                    }
                    .padding(.horizontal)
                }
            } else {
                if infoIsAvailable {
                    VStack {
                        Spacer()
                        HStack {
                            Spacer()
                            ProgressView()
                            Spacer()
                        }
                        Spacer()
                    }
                } else {
                    ContentUnavailableView("Character.search.unavailable", systemImage: "person.2.fill", description: Text("Search.unavailable.description"))
                        .onTapGesture {
                            Task {
                                await getCharacters()
                            }
                        }
                }
            }
        }
        .onAppear {
            Task {
                await getCharacters()
            }
        }
        .navigationTitle("Character")
        .wrapIf(platform == .macOS, in: { content in
            if #available(iOS 26.0, macOS 26.0, *) {
                content
                    .navigationSubtitle("Character.unit.count.\(6)")
            } else {
                content
            }
        })
    }
    
    func getCharacters() async {
        Task {
            infoIsAvailable = true
            SekaiCache.withCache(id: "AllCharacters", invocation: {
                await Character.all()
            }) .onUpdate { result in
                if let result {
                    allCharacters = result
                    infoIsReady = true
                } else {
                    infoIsAvailable = false
                }
            }
        }
    }
}
