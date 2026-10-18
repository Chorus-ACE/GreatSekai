import SekaiKit
import SwiftUI

struct GachaDetailCardsView: View {
    let information: Gacha
    @State private var cardsByID: [Int: Card]?
    @State private var failed = false

    var body: some View {
        Group {
            GachaRegionalSection("Gacha.cards", values: information.configuration.map { $0.map(GachaPoolDefinition.init) }) { definition in
                if failed {
                    Button { Task { await loadCards() } } label: {
                        DetailUnavailableView(title: "Gacha.cards.unavailable", symbol: "arrow.clockwise")
                    }
                    .buttonStyle(.plain)
                } else if let cardsByID {
                    GachaCardPoolBody(configuration: definition.configuration, cardsByID: cardsByID)
                } else {
                    ProgressView().frame(maxWidth: .infinity).padding()
                }
            }
        }
        .task(id: information.id) { await loadCards() }
    }

    private func loadCards() async {
        failed = false
        guard let cards = await Card.allWithCache() else {
            if !Task.isCancelled { failed = true }
            return
        }
        guard !Task.isCancelled else { return }
        cardsByID = Dictionary(cards.map { ($0.id, $0) }, uniquingKeysWith: { first, _ in first })
    }
}

private struct GachaPoolDefinition: Equatable {
    let configuration: Gacha.Configuration

    static func == (lhs: Self, rhs: Self) -> Bool {
        let l = lhs.configuration, r = rhs.configuration
        return l.wishSelectCount == r.wishSelectCount && l.selectsCharacter == r.selectsCharacter &&
            l.rarityRates.elementsEqual(r.rarityRates, by: { $0.rarityType == $1.rarityType && $0.lotteryType == $1.lotteryType && $0.rate == $1.rate }) &&
            l.cards.sorted { $0.cardID < $1.cardID }.elementsEqual(r.cards.sorted { $0.cardID < $1.cardID }) {
                $0.cardID == $1.cardID && $0.weight == $1.weight && $0.isWish == $1.isWish &&
                $0.wishType == $1.wishType && $0.fixedBonusWeight == $1.fixedBonusWeight
            }
    }
}

private struct GachaCardPoolBody: View {
    let configuration: Gacha.Configuration
    let cardsByID: [Int: Card]
    @State private var showTrained = false

    private var cardRarities: [Int: Card.Rarity] { cardsByID.mapValues(\.rarity) }
    private var missing: [Int] { Array(Set(configuration.cards.map(\.cardID).filter { cardsByID[$0] == nil })).sorted() }

    var body: some View {
        VStack(spacing: 12) {
            if configuration.cards.isEmpty {
                CustomGroupBox { Text("Gacha.section.empty").foregroundStyle(.secondary) }
            } else {
                HStack {
                    Text("Gacha.cards.normal-rates").font(.caption).foregroundStyle(.secondary)
                    Spacer()
                    Button { showTrained.toggle() } label: {
                        Text("Gacha.cards.show-as-trained")
                            .foregroundStyle(showTrained ? Color.accentColor : .secondary)
                    }
                    .buttonStyle(.plain)
                }
                ForEach(Array(Card.Rarity.allCases.reversed()), id: \.self) { rarity in
                    let entries = configuration.cards.filter { cardsByID[$0.cardID]?.rarity == rarity }
                    if !entries.isEmpty {
                        GachaRarityPool(configuration: configuration, rarity: rarity, entries: entries,
                                        cardsByID: cardsByID, cardRarities: cardRarities, showTrained: showTrained)
                    }
                }
                if !missing.isEmpty {
                    CustomGroupBox {
                        VStack(alignment: .leading) {
                            Text("Gacha.cards.missing").foregroundStyle(.secondary)
                            GachaCardGrid(ids: missing, cardsByID: cardsByID)
                        }
                    }
                }
                if configuration.selectsCharacter || configuration.wishSelectCount > 0 || configuration.rarityRates.contains(where: { $0.lotteryType != "normal" }) || configuration.cards.contains(where: { ($0.fixedBonusWeight ?? 0) != 0 }) {
                    Text("Gacha.cards.special-rates").font(.caption).foregroundStyle(.secondary)
                }
            }
        }
    }
}

private struct GachaRarityPool: View {
    let configuration: Gacha.Configuration
    let rarity: Card.Rarity
    let entries: [Gacha.PoolCard]
    let cardsByID: [Int: Card]
    let cardRarities: [Int: Card.Rarity]
    let showTrained: Bool
    @State private var expanded = false

    var body: some View {
        CustomGroupBox {
            DisclosureGroup(isExpanded: $expanded) {
                VStack(spacing: 12) {
                    ForEach(Array(Set(entries.map(\.weight))).sorted(by: >), id: \.self) { weight in
                        let group = entries.filter { $0.weight == weight }
                        Divider()
                        VStack(alignment: .leading, spacing: 8) {
                            if let entry = group.first, let probability = configuration.probability(of: entry, cardRarities: cardRarities) {
                                Text(probability, format: .percent.precision(.fractionLength(0...4)))
                                    .monospacedDigit().font(.subheadline).bold()
                            } else {
                                Text("Gacha.cards.weight.\(weight)").font(.subheadline).foregroundStyle(.secondary)
                            }
                            GachaCardGrid(ids: Array(Set(group.map(\.cardID))).sorted(), cardsByID: cardsByID, showTrained: showTrained)
                        }
                    }
                }
                .padding(.top, 8)
            } label: {
                HStack {
                    Text(rarity.localizedName).bold()
                    Spacer()
                    Text("\(Set(entries.map(\.cardID)).count)").foregroundStyle(.secondary)
                }
            }
        }
    }
}

private struct GachaCardGrid: View {
    let ids: [Int]
    let cardsByID: [Int: Card]
    var showTrained = false
    @State private var expanded = false

    var body: some View {
        VStack(alignment: .trailing) {
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 72, maximum: 90))], spacing: 10) {
                ForEach(expanded ? ids : Array(ids.prefix(20)), id: \.self) { id in
                    NavigationLink { CardDetailView(id: id) } label: {
                        if let card = cardsByID[id] {
                            CardThumbnail(card, showTrainedVersion: showTrained, showNavigationHints: true)
                        } else {
                            Label("#\(id)", systemImage: "person.crop.square")
                                .frame(width: 72, height: 72)
                        }
                    }
                    .buttonStyle(.plain)
                }
            }
            if ids.count > 20 {
                Button { expanded.toggle() } label: {
                    if expanded { Label("Gacha.cards.collapse", systemImage: "chevron.up") }
                    else { Label("Gacha.cards.expand.\(ids.count)", systemImage: "chevron.down") }
                }
                .buttonStyle(.borderless)
            }
        }
    }
}

struct GachaPickupCardsView: View {
    let information: Gacha
    @State private var cardsByID: [Int: Card]?
    @State private var failed = false
    @State private var locale: SekaiLocale = .primaryLocale
    private var values: LocalizableData<[Int]> {
        information.configuration.map { $0.map { Array(Set($0.pickupCardIDs)).sorted() } }
    }
    private var locales: [SekaiLocale] { values.localizedData?.allAvailableLocales ?? [] }
    private var needsPicker: Bool {
        guard let first = locales.first else { return false }
        return locales.dropFirst().contains { values.localizedData?[$0] != values.localizedData?[first] }
    }
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            if needsPicker {
                DetailSectionOptionPicker(selection: $locale, options: locales)
            }
            if failed {
                Button("General.retry") { Task { await load() } }
            } else if let cardsByID {
                let ids = values.localizedData?[locale] ?? (values.localizedData == nil ? values.majorValue : nil) ?? []
                if ids.isEmpty { Text("Gacha.section.empty").foregroundStyle(.secondary) }
                else { GachaCardGrid(ids: ids, cardsByID: cardsByID) }
            } else { ProgressView() }
        }
        .task(id: information.id) {
            locale = values.majorLocale ?? .primaryLocale
            await load()
        }
    }
    private func load() async {
        failed = false
        let cards = await Card.allWithCache()
        guard !Task.isCancelled else { return }
        cardsByID = cards.map { Dictionary($0.map { ($0.id, $0) }, uniquingKeysWith: { first, _ in first }) }
        failed = cards == nil
    }
}
