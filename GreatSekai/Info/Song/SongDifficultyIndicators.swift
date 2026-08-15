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
                    SongDifficultyIndicator(difficulty: item, level: information[item]!)
                }
            }
        }
    }
}


// MARK: SongDifficultyIndicator
struct SongDifficultyIndicator: View {
    static let diameter: CGFloat = imageButtonSize * 0.75
    
    @Environment(\.colorScheme) var colorScheme
    var difficulty: Song.Difficulty
    var level: Int
    
    var body: some View {
        ZStack {
            Circle()
                .wrapIf(difficulty == .append, in: {
                    $0.fill(
                        LinearGradient(
                            gradient: appendGradient,
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                }, otherwise: {
                    $0.foregroundStyle(difficulty.color)
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


let appendGradient = Gradient(colors: [
    Color(red: 180/255, green: 146/255, blue: 254/255),
    Color(red: 254/255, green: 123/255, blue: 227/255)
])
