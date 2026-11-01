import SekaiKit
import SwiftUI

struct GachaDetailView: View {
    let id: Int
    var allGachas: [Gacha]? = nil
    @State private var cardsRetry = 0
    @State private var parsedCards: [Card]?
    @State private var cardsByID: [Int: Card]?
    @State private var cardsFailed = false

    var body: some View {
        DetailViewBase(forType: Gacha.self, previewList: allGachas, initialID: id) { information in
            GachaDetailContent(information: information, cards: parsedCards, cardsByID: cardsByID,
                               cardsFailed: cardsFailed, retryCards: { cardsRetry += 1 })
                .id(information.id)
                .task(id: "\(information.id)-\(cardsRetry)") {
                    await loadCards()
                }
        } switcherDestination: {
            GachaSearchView()
        }
    }

    private func loadCards() async {
        cardsFailed = false
        parsedCards = nil
        cardsByID = nil
        let cards = await Card.allWithCache()
        guard !Task.isCancelled else { return }
        parsedCards = cards
        cardsByID = cards.map { Dictionary($0.map { ($0.id, $0) }, uniquingKeysWith: { first, _ in first }) }
        cardsFailed = cards == nil
    }
}

private struct GachaDetailContent: View {
    let information: Gacha
    let cards: [Card]?
    let cardsByID: [Int: Card]?
    let cardsFailed: Bool
    let retryCards: () -> Void

    @AppStorage("showAdvancedDetails") var showAdvancedDetails = false
    var body: some View {
        DetailInfoBase {
            DetailInfoItem("Gacha.title", localizableText: information.title)
            DetailInfoItem("Gacha.type", text: information.type.localizedName)
            DetailInfoItem("Gacha.start-date", date: information.startDate)
            DetailInfoItem("Gacha.end-date", date: information.endDate)
            DetailInfoItem("Gacha.countdown") {
                CountdownText(startDate: information.startDate.localizedData ?? .init(), endDate: information.endDate.localizedData ?? .init())
            }
            if !information.configuration.map({ $0?.spinLimit }).isEmpty {
                DetailInfoItem("Gacha.spin-limit", localizableText: information.configuration.map { $0?.spinLimit.map { String($0) } }, showLocaleKey: true)
            }
            if !information.configuration.map({ $0?.dailySpinLimit }).isEmpty {
                DetailInfoItem("Gacha.daily-limit", localizableText: information.configuration.map { $0?.dailySpinLimit.map { String($0) } }, showLocaleKey: true)
            }
            if !information.configuration.map({ $0?.drawableHours }).isEmpty {
                DetailInfoItem("Gacha.drawable-hours", localizableText: information.configuration.map { $0?.drawableHours.map { String($0) } }, showLocaleKey: true)
            }
            if !information.configuration.map({ ($0?.wishSelectCount ?? 0) > 0 ? $0?.wishSelectCount : nil }).isEmpty {
                DetailInfoItem("Gacha.wish-count", localizableText: information.configuration.map { ($0?.wishSelectCount ?? 0) > 0 ? $0.map { String($0.wishSelectCount) } : nil }, showLocaleKey: true)
            }
            
            if !information.configuration.map({ $0?.pickupCardIDs }).isCollectionEmpty {
                DetailInfoItem("Gacha.pickup-cards") {
                    GachaPickupCardsView(information: information, cardsByID: cardsByID, failed: cardsFailed, retry: retryCards)
                }
            }
            DetailInfoItem("ID", text: String(information.id))
            
            if showAdvancedDetails {
                DetailInfoItem("Info.asset-bundle-name", content: {
                    Text(information.assetBundleName)
                        .fontDesign(.monospaced)
                        .textSelection(.enabled)
                })
            }
        } head: {
            FallbackableWebImage(throughURLs: information.previewImageURLs()) { image in
                image.resizable().scaledToFit()
            } placeholder: {
                RoundedRectangle(cornerRadius: 10).fill(getPlaceholderColor()).aspectRatio(3, contentMode: .fit)
            }
            .frame(maxWidth: bannerWidth)
            .clipShape(RoundedRectangle(cornerRadius: 10))
        }

        GachaDetailCardsView(information: information, cardsByID: cardsByID, failed: cardsFailed, retry: retryCards)
        GachaDetailPossibilityView(information: information, cards: cards)
        GachaDetailPaymentView(information: information)
        if !information.summary.isCollectionEmpty {
            GachaTextSection(title: "Gacha.summary", text: information.summary.majorValue ?? "")
        }
        if !information.description.isCollectionEmpty {
            GachaTextSection(title: "Gacha.description", text: information.description.majorValue ?? "")
        }
        DetailArtsSection {
            ArtsTab("Gacha.arts.banner", ratio: 3) {
                for locale in information.availableLocales {
                    if let url = information.bannerImageURL(in: locale) {
                        ArtsItem(title: .init(stringLiteral: locale.rawValue.uppercased()), url: url)
                    }
                }
            }
            ArtsTab("Gacha.arts.logo", ratio: 2) {
                for locale in information.availableLocales {
                    if let url = information.logoImageURL(in: locale) {
                        ArtsItem(title: .init(stringLiteral: locale.rawValue.uppercased()), url: url)
                    }
                }
            }
        }
        ExternalLinksSection(links: [ExternalLink(.sekaiViewer, url: URL(string: "https://sekai.best/gacha/\(information.id)")!)])
    }

}

private struct GachaTextSection: View {
    let title: LocalizedStringKey
    let text: String
    @State private var expanded = false

    var body: some View {
        Section {
            CustomGroupBox {
                Text(text)
                    .lineLimit(expanded ? nil : 5)
                    .multilineTextAlignment(.leading)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .textSelection(.enabled)
            }
            .frame(maxWidth: infoContentMaxWidth)
        } header: {
            HStack {
                Text(title).font(.title2).bold()
                Spacer()
                Button(expanded ? "Details.collapse" : "Details.expand") {
                    withAnimation {
                        expanded.toggle()
                    }
                }
                .buttonStyle(.plain)
                .foregroundStyle(.secondary)
            }
            .frame(maxWidth: infoContentMaxWidth)
            .detailSectionHeader()
        }
    }
}

// Existing gacha sections share the regional presentation used by other detail pages.
typealias GachaRegionalSection<Value: Equatable, Content: View> = RegionalDetailSection<Value, Content>
