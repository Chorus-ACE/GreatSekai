import SekaiKit
import SwiftUI

struct DetailsGachasSection: View {
    var gachas: [Gacha]?
    var cardID: Int? = nil

    private var selectedGachas: [Gacha]? {
        guard let cardID else { return gachas }
        return gachas?.filter { gacha in
            switch gacha.configuration {
            case .localized(let configurations):
                return SekaiLocale.allCases.contains { configurations[$0]?.pickupCardIDs.contains(cardID) == true }
            case .unlocalized(let configuration):
                return configuration?.pickupCardIDs.contains(cardID) == true
            }
        }
    }

    private var sortedGachas: [Gacha]? {
        selectedGachas?.sorted {
            compare($0.startDate.majorValue?.corrected(), $1.startDate.majorValue?.corrected(), direction: .descending)
        }
    }

    var body: some View {
        DetailSectionBase(elements: sortedGachas) { gacha in
            NavigationLink {
                GachaDetailView(id: gacha.id, allGachas: sortedGachas)
            } label: {
                GachaInfo(gacha: gacha)
            }
        }
    }
}
