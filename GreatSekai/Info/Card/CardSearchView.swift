//
//  CardSearchView.swift
//  GreatSekai
//
//  Created by ThreeManager785 on 2026/7/25.
//

import SekaiKit
import SwiftUI

// MARK: CardSearchView
struct CardSearchView: View {
    let gridLayoutItemWidth: CGFloat = 230
    let galleryLayoutItemMinimumWidth: CGFloat = 400
    let galleryLayoutItemMaximumWidth: CGFloat = 500
    var body: some View {
        SearchViewBase(forType: Card.self, initialLayout: 1, layoutOptions: [("Filter.view.list", "list.bullet", 1), ("Filter.view.grid", "square.grid.2x2", 2), ("Filter.view.gallery", "text.below.rectangle", 3)]) { layout, _, content, _ in
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
            CardInfo(element, layoutType: layout)
        } destination: { element, list in
            CardDetailView(id: element.id, allCards: list)
        }
        .resultCountDescription { count in
            "Card.count.\(count)"
        }
    }
}
