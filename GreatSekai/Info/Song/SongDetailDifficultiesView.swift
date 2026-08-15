//
//  SongDetailDifficulties.swift
//  GreatSekai
//
//  Created by ThreeManager785 on 2026/8/15.
//

import SekaiKit
import SwiftUI

struct SongDetailDifficultiesView: View {
    var information: ExtendedSong
    @State var difficulty: Song.Difficulty = .master
    var body: some View {
        Section {
            CustomGroupBox {
                VStack {
                    Group {
                        ListItem(title: {
                            Text("Song.difficulties.level")
                                .bold()
                        }, value: {
                            SongDifficultyIndicator(difficulty: difficulty, level: information.song.difficultyLevel[difficulty] ?? 0)
//                            Text("\(, default: String(localized: "Info.unknown"))")
                        })
                        
                        ListItem(title: {
                            Text("Song.difficulties.notes")
                                .bold()
                        }, value: {
                            Text("\(information.song.noteCounts[difficulty], default: String(localized: "Info.unknown"))")
                        })
                    }
                    .contentTransition(.numericText())
                    .animation(.default, value: difficulty)
                    .insert {
                        Divider()
                    }
                }
            }
            .frame(maxWidth: infoContentMaxWidth)
        } header: {
            HStack {
                Text("Song.difficulties")
                    .font(.title2)
                    .bold()
                DetailSectionOptionPicker(
                    selection: $difficulty,
                    options: information.song.difficultyLevel.map(\.key).sorted(by: <),
                    labels: Dictionary(uniqueKeysWithValues: zip(Song.Difficulty.allCases, Song.Difficulty.allCases.map(\.name)))
                )
                Spacer()
            }
            .frame(maxWidth: 615)
            .detailSectionHeader()
        }
    }
}
