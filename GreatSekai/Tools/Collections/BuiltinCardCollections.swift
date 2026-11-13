import Foundation
import SekaiKit

nonisolated enum BuiltinCardCollections {
    static func kind(sourceType: Card.SourceType, rarity: Card.Rarity) -> BuiltinCardCollectionKind? {
        switch sourceType {
        // cardSupplyId 6 identifies the unit-event-limited World Link cards,
        // rather than every reward card associated with a World Link event.
        case .unitEventLimited: .worldLink
        case .colorfulFestivalLimited, .bloomFestivalLimited: .festivals
        case .birthday: .birthdayAnniversary
        default: rarity == .birthday ? .birthdayAnniversary : nil
        }
    }

    static func generate(from cards: [Card]) -> [BuiltinCardCollectionKind: [SavedCard]] {
        var result: [BuiltinCardCollectionKind: [SavedCard]] = [:]
        for card in cards {
            guard let kind = kind(sourceType: card.sourceType, rarity: card.rarity) else { continue }
            let title = card.name.majorValue ?? "#\(card.id)"
            if !card.isInitiallySpecialTrained || card.afterTrainingArtURL == nil {
                result[kind, default: []].append(SavedCard(cardID: card.id, trained: false, title: title, imageURL: card.beforeTrainingArtURL))
            }
            if let url = card.afterTrainingArtURL {
                result[kind, default: []].append(SavedCard(cardID: card.id, trained: true, title: title, imageURL: url))
            }
        }
        return result
    }
}
