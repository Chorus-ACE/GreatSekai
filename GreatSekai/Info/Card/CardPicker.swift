//===---*- Greatdori! -*---------------------------------------------------===//
//
// CardSelector.swift
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
import SwiftUI

struct MultiCardSelector: View {
    @Binding var selection: [Card]
    let gridLayoutItemWidth: CGFloat = 200
    let galleryLayoutItemMinimumWidth: CGFloat = 400
    let galleryLayoutItemMaximumWidth: CGFloat = 500
    var locale: SekaiLocale = .primaryLocale
    var availableCardIDs: Set<Int>?
    var updateList: @Sendable () async -> [Card]? = { await Card.allWithCache() }
    var body: some View {
        ItemSelectorView(selection: $selection, initialLayout: 1, initialSorter: SekaiSorter(keyword: .releaseDate(in: locale), direction: .descending), updateList: {
            await updateList()?.filter { card in
                (availableCardIDs?.contains(card.id) ?? true)
                    && (card.name.localizedData?.availableInLocale(locale) ?? true)
            }
        }, layoutOptions: [("Filter.view.list", "list.bullet", 1), ("Filter.view.grid", "square.grid.2x2", 2), ("Filter.view.gallery", "text.below.rectangle", 3)]) { layout, _, content, _ in
            if layout == 1 {
                LazyVStack {
                    content
                }
                .frame(maxWidth: infoContentMaxWidth)
            } else {
                LazyVGrid(columns: [GridItem(.adaptive(minimum: layout == 2 ? gridLayoutItemWidth : galleryLayoutItemMinimumWidth, maximum: layout == 2 ? gridLayoutItemWidth : galleryLayoutItemMaximumWidth))]) {
                    content
                }
            }
        } eachContent: { layout, element in
            CardInfo(element, layoutType: layout, locale: locale)
                .environment(\.disablePopover, true)
        }
        .listCacheScope("\(locale.rawValue)_\(availableCardIDs.map { $0.sorted().map(String.init).joined(separator: ",") } ?? "all")")
        .resultCountDescription { count in
            "Card.count.\(count)"
        }
    }
}

struct CardPicker: View {
    @Binding var selection: Card?
    var locale: SekaiLocale = .primaryLocale
    var availableCardIDs: Set<Int>?
    var updateList: @Sendable () async -> [Card]? = { await Card.allWithCache() }
    var body: some View {
        MultiCardSelector(selection: .init { [selection].compactMap { $0 } } set: { selection = $0.first }, locale: locale, availableCardIDs: availableCardIDs, updateList: { [updateList] in await updateList() })
            .selectorDisablesMultipleSelection()
    }
}
