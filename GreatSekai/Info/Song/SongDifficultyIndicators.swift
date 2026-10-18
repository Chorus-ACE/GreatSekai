//===---*- Greatdori! -*---------------------------------------------------===//
//
// SongDifficultyIndicators.swift
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

import SDWebImageSwiftUI
import SekaiKit
import SwiftUI


// MARK: SongDifficultiesIndicator
struct SongDifficultiesIndicator: View {
    var information: [Song.Difficulty: Int]
    var allAvailableDifficulties: [Song.Difficulty]
    
    @Environment(\.highlightedSongLevel) var highlightedLevel
    
    init (_ difficulty: [Song.Difficulty: Int]) {
        self.information = difficulty
        
        var difficultyAvailability: [Song.Difficulty] = []
        for difficulty in Song.Difficulty.allCases {
            if information[difficulty] != nil {
                difficultyAvailability.append(difficulty)
            }
        }
        self.allAvailableDifficulties = difficultyAvailability
    }
    
    var body: some View {
        HStack {
            if !allAvailableDifficulties.isEmpty {
                ForEach(allAvailableDifficulties, id: \.self) { item in
                    SongDifficultyIndicator(
                        difficulty: shallFade(item) ? nil : item,
                        level: information[item]!
                    )
                }
            }
        }
    }
    
    func shallFade(_ item: Song.Difficulty) -> Bool {
        guard let level = information[item] else { return true }
        guard let highlightedLevel else { return false }
        return highlightedLevel != level
    }
}


// MARK: SongDifficultyIndicator
struct SongDifficultyIndicator: View {
    static let diameter: CGFloat = imageButtonSize * 0.75
    
    @Environment(\.colorScheme) var colorScheme
    var difficulty: Song.Difficulty?
    var level: Int
    
    var body: some View {
        ZStack {
            Circle()
                .wrapIf(difficulty == .append, in: {
                    $0.fill(
                        LinearGradient(
                            gradient: Song.Difficulty.appendGradient,
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                }, otherwise: {
                    $0.foregroundStyle(difficulty?.color ?? .secondary)
                })
                .frame(width: Self.diameter, height: Self.diameter)
            Text("\(level)")
                .foregroundStyle(.white)
                .fontWeight(.semibold)
                .scaleEffect(platform == .macOS ? 1 : 0.8)
        }
            .frame(width: Self.diameter, height: Self.diameter)
    }
}

extension EnvironmentValues {
    @Entry var highlightedSongLevel: Int? = nil
}
