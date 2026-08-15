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


// MARK: DetailsSongsSection
struct DetailsSongsSection: View {
    var songs: [Song]?
    var body: some View {
        DetailSectionBase(elements: songs?.sorted {
            compare($0.publishDate.majorValue?.corrected(), $1.publishDate.majorValue?.corrected(), direction: .descending)
        }) { item in
            NavigationLink(destination: {
                SongDetailView(id: item.id)
            }, label: {
                SongInfo(item)
            })
        }
    }
}
