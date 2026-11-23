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
            result[kind, default: []].append(contentsOf: card.collectionArtworks)
        }
        return result
    }
}

extension Card {
    nonisolated var collectionArtworks: [SavedCard] {
        let title = name.majorValue ?? "#\(id)"
        let trainedURL = afterTrainingArtURL
        var artworks: [SavedCard] = []
        if !isInitiallySpecialTrained || trainedURL == nil {
            artworks.append(SavedCard(cardID: id, trained: false, title: title, imageURL: beforeTrainingArtURL))
        }
        if let trainedURL {
            artworks.append(SavedCard(cardID: id, trained: true, title: title, imageURL: trainedURL))
        }
        return artworks
    }
}
