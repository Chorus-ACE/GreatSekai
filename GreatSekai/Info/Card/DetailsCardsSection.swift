//===---*- Greatdori! -*---------------------------------------------------===//
//
// DetailsCardsSection.swift
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


import SekaiKit
import SDWebImageSwiftUI
import SwiftUI


// MARK: DetailsCardsSection
struct DetailsCardsSection: View {
    var cards: [Card]?
    var body: some View {
            DetailSectionBase(elements: cards?.sorted {
                compare($0.releaseDate.majorValue?.corrected(), $1.releaseDate.majorValue?.corrected(), direction: .descending)
            }) { item in
                NavigationLink(destination: {
                    CardDetailView(id: item.id)
                }, label: {
                    CardInfo(item)
                })
            }
    }
}
