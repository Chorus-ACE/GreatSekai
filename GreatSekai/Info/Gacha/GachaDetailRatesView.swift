import SekaiKit
import SwiftUI

struct GachaRateDefinition: Equatable {
    let configuration: Gacha.Configuration
    var guarantees: [Card.Rarity] {
        [.three, .four].filter { rarity in
            configuration.behaviors.contains { $0.type == (rarity == .three ? "over_rarity_3_once" : "over_rarity_4_once") }
                && configuration.rates(guaranteeing: rarity) != nil
        }
    }
    static func == (lhs: Self, rhs: Self) -> Bool {
        lhs.guarantees == rhs.guarantees && lhs.configuration.rarityRates.elementsEqual(rhs.configuration.rarityRates) {
            $0.rarityType == $1.rarityType && $0.lotteryType == $1.lotteryType && $0.rate == $1.rate
        }
    }
}

struct GachaDetailRatesView: View {
    let information: Gacha
    var body: some View {
        if !information.configuration.map({ $0?.rarityRates }).isCollectionEmpty {
            GachaRegionalSection("Gacha.rates", values: information.configuration.map { $0.map(GachaRateDefinition.init) }) { definition in
                GachaRateTable(definition: definition)
            }
        }
    }
}

private struct GachaRateTable: View {
    let definition: GachaRateDefinition
    @State private var guarantee: Card.Rarity? = nil

    var body: some View {
        CustomGroupBox {
            VStack(spacing: 12) {
                if !definition.guarantees.isEmpty {
                    Picker("Gacha.rates.draw-type", selection: $guarantee) {
                        Text("Gacha.lottery.normal").tag(Optional<Card.Rarity>.none)
                        ForEach(definition.guarantees, id: \.self) { rarity in
                            Text(rarity == .three ? "Gacha.behavior.over_rarity_3_once" : "Gacha.behavior.over_rarity_4_once")
                                .tag(Optional(rarity))
                        }
                    }
                    .pickerStyle(.menu)
                    Divider()
                }
                let rates = definition.configuration.rates(guaranteeing: guarantee) ?? definition.configuration.rarityRates
                if rates.isEmpty { Text("Gacha.section.empty").foregroundStyle(.secondary) }
                ForEach(rates) { rate in
                    ListItem {
                        VStack(alignment: .leading, spacing: 3) {
                            Text(rate.rarity?.localizedName ?? rate.rarityType).bold()
                            if rate.lotteryType != "normal" {
                                Text(lotteryName(rate.lotteryType)).font(.caption).foregroundStyle(.secondary)
                            }
                        }
                    } value: {
                        Text(rate.rate / 100, format: .percent.precision(.fractionLength(0...3))).monospacedDigit()
                    }
                    if rate.id != rates.last?.id { Divider() }
                }
                if guarantee != nil {
                    Text("Gacha.rates.guaranteed-slot").font(.caption).foregroundStyle(.secondary)
                }
            }
        }
        .onChange(of: definition) {
            if let guarantee, !definition.guarantees.contains(guarantee) { self.guarantee = nil }
        }
    }

    private func lotteryName(_ type: String) -> String {
        switch type {
        case "normal": String(localized: "Gacha.lottery.normal")
        case "categorized_wish": String(localized: "Gacha.lottery.categorized_wish")
        case "rate_choice_first": String(localized: "Gacha.lottery.rate_choice_first")
        case "rate_choice_second": String(localized: "Gacha.lottery.rate_choice_second")
        default: type
        }
    }
}
