//
//  CardInfoView.swift
//  GreatSekai
//
//  Created by ThreeManager785 on 2026/8/1.
//

import Foundation
import SDWebImageSwiftUI
import SekaiKit
import SwiftUI

// MARK: CardInfo
struct CardInfo: View {
    var layoutType = 1
    // 1 - List
    // 2 - Grid
    // 3 - Gallery
    
    private var card: Card
    private var displayType: CardImageDisplayType
    private var characterName: LocalizedData<String>?
//    @State var isNormalCardAvailable = true
    
    @Environment(\.horizontalSizeClass) var sizeClass
    
    init(_ card: Card, layoutType: Int = 1, displayType: CardImageDisplayType = .both) {
        self.card = card
        self.layoutType = layoutType
        self.displayType = displayType
        
        self.characterName = SekaiCache.preCache.character(id: card.characterID)?.fullName
    }
    
    var body: some View {
        SummaryViewBase(layoutType == 1 ? .horizontal : .vertical(), source: card) {
            Group {
                if layoutType != 3 {
                    HStack(spacing: 5) {
                        if /*isNormalCardAvailable && */displayType != .trainedOnly {
                            CardThumbnail(card)
                        }
                        if card.afterTrainingThumbnailURL != nil && displayType != .normalOnly {
                            CardThumbnail(card, showTrainedVersion: true)
                        }
                    }
                    .wrapIf(sizeClass == .regular) { content in
                        content.frame(maxWidth: 200)
                    }
                } else {
                    CardImage(card)
                        .cornerRadius(2)
                    #if os(iOS)
                        .allowsHitTesting(false)
                    #endif
                }
            }
            .accessibilityHidden(true)
        } detail: {
            Group {
                Text(characterName?.forPreferredLocale() ?? String(localized: "Info.unknown")) + Text("Typography.bold-dot-seperater").bold() + Text(card.sourceType.localizedName)
            }
            .foregroundStyle(.secondary)
            .font(platform == .macOS ? .body : .caption)
            .accessibilityLabel(String("\(characterName?.forPreferredLocale() ?? String(localized: "Info.unknown")), \(card.sourceType.localizedName)"))
        }
        .accessibilityCustomContent("Card.rarity", Text(card.rarity.localizedName))
        .accessibilityCustomContent("Card.attribute", card.attribute.name)
        .accessibilityCustomContent("Card.unit", card.unit.localizedName)
        .accessibilityCustomContent("Card.type", card.sourceType.localizedName)
    }
}

enum CardImageDisplayType: Hashable {
    case normalOnly
    case trainedOnly
    case both
}

