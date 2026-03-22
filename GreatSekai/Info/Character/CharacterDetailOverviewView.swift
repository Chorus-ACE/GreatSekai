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
    var body: some View {
        Group {
            VStack {
                Group {
                    //MARK: Info
                    CustomGroupBox(cornerRadius: 20) {
                        VStack {
                            Group {
                                ListItem(title: {
                                    Text("Character.name")
                                        .bold()
                                }, value: {
                                    Text(information.fullName)
                                })
                                
                                ListItem(title: {
                                    Text("Character.familyName")
                                        .bold()
                                }, value: {
                                    Text(information.familyName ?? "")
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
    }
}

