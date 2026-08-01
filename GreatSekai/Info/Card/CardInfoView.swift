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
        
        self.characterName = SekaiCache.preCache.characters.first(where: { $0.id == card.characterID })?.fullName
    }
    
    var body: some View {
        SummaryViewBase(layoutType == 1 ? .horizontal : .vertical(), source: card) {
            Group {
                if layoutType != 3 {
                    HStack(spacing: 5) {
                        if /*isNormalCardAvailable && */displayType != .trainedOnly {
                            CardPreviewImage(card)
//                            Text(verbatim: "1")
                        }
                        if card.afterTrainingThumbnailURL != nil && displayType != .normalOnly {
//                            CardPreviewImage(previewCard, showTrainedVersion: true)
                            CardPreviewImage(card, showTrainedVersion: true)
                        }
                    }
                    .wrapIf(sizeClass == .regular) { content in
                        content.frame(maxWidth: 200)
                    }
                } else {
                    Text(verbatim: "CardCoverImage")
//                    CardCoverImage(previewCard, band: band)
                    #if os(iOS)
                        .allowsHitTesting(false)
                    #endif
                }
            }
            .accessibilityHidden(true)
//            .accessibialityHidden(true)
        } detail: {
            Group {
                Text(characterName?.forPreferredLocale() ?? String(localized: "Character.unknown")) + Text("Typography.bold-dot-seperater").bold() + Text(card.sourceType?.localizedName ?? String(localized: "Info.unknown"))
            }
            .foregroundStyle(.secondary)
            .font(platform == .macOS ? .body : .caption)
            .accessibilityLabel(String("\(characterName?.forPreferredLocale() ?? String(localized: "Character.unknown")), \(card.sourceType?.localizedName ?? String(localized: "Info.unknown"))"))
        }
        .onAppear {
//            if cardCharacterName == nil { // First appear
//                Task {
//                    isNormalCardAvailable = await DoriURLValidator.reachability(
//                        of: layoutType != 3 ? previewCard.thumbNormalImageURL : previewCard.coverNormalImageURL
//                    )
//                }
//            }
        }
//        .accessibilityCustomContent("Card.rarity", "\(previewCard.rarity)")
//        .accessibilityCustomContent("Card.attribute", previewCard.attribute.selectorText)
//        .accessibilityCustomContent("Card.band", band?.bandName.forPreferredLocale() ?? "")
//        .accessibilityCustomContent("Card.type", previewCard.type.selectorText)
    }
}

enum CardImageDisplayType: Hashable {
    case normalOnly
    case trainedOnly
    case both
}

