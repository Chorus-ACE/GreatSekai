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
        Section(content: {
            CustomGroupBox {
                VStack {
                    Group {
                        ListItem(title: {
                            Text("Song.difficulties.level")
                        }, value: {
                            SongDifficultyIndicator(difficulty: difficulty, level: information.song.difficultyLevel[difficulty] ?? 0)
                        })
                        
                        ListItem(title: {
                            Text("Song.difficulties.notes")
                        }, value: {
                            Text("\(information.song.noteCounts[difficulty], default: String(localized: "Info.unknown"))")
                        })
                        
                        ListItem(title: {
                            VStack(alignment: .leading) {
                                Text("Song.difficulties.chart")
                                Text("Song.difficulties.chart.footer")
                                    .foregroundStyle(.secondary)
                                    .bold(false)
                            }
                        }, value: {
                            HStack {
                                Link(destination: information.song.chartImageURL(for: difficulty, preferSVG: true), label: {
                                    Label(String("SVG"), systemImage: "arrow.up.right.circle")
                                })
                                
                                Link(destination: information.song.chartImageURL(for: difficulty, preferSVG: false), label: {
                                    Label(String("PNG"), systemImage: "arrow.up.right.circle")
                                })
                            }
                            .wrapIf(true) { context in
                                if #available(iOS 26.0, macOS 26.0, *) {
                                    context.labelIconToTitleSpacing(5)
                                } else {
                                    context
                                }
                            }
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
        }, header: {
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
        })
    }
}
