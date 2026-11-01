//===---*- Greatdori! -*---------------------------------------------------===//
//
// GachaDetailCardsView.swift
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

struct GachaDetailCardsView: View {
    let information: Gacha
    @State private var locale: SekaiLocale = .primaryLocale
    let cardsByID: [Int: Card]?
    let failed: Bool
    let retry: () -> Void
    @State private var showAsTrained = false

    private var configuration: Gacha.Configuration? {
        information.configuration.localizedData?[locale] ?? (information.configuration.localizedData == nil ? information.configuration.majorValue : nil)
    }

    var body: some View {
        Section {
            VStack {
                if failed {
                    Button(action: retry) {
                        DetailUnavailableView(title: "Gacha.cards.unavailable", symbol: "arrow.clockwise")
                    }
                    .buttonStyle(.plain)
                } else if let cardsByID, let configuration {
                    if configuration.cards.isEmpty {
                        CustomGroupBox { Text("Gacha.section.empty").foregroundStyle(.secondary) }
                    } else {
                        ForEach(Array(Card.Rarity.allCases.reversed()), id: \.self) { rarity in
                            let entries = configuration.cards.filter { cardsByID[$0.cardID]?.rarity == rarity }
                            if !entries.isEmpty {
                                GachaRarityPool(configuration: configuration, rarity: rarity, entries: entries,
                                                cardsByID: cardsByID, showAsTrained: showAsTrained)
                                    .id("\(locale.rawValue)-\(rarity.rawValue)")
                            }
                        }
                        let missing = Array(Set(configuration.cards.map(\.cardID).filter { cardsByID[$0] == nil })).sorted()
                        if !missing.isEmpty {
                            CustomGroupBox {
                                Text("Gacha.cards.missing").foregroundStyle(.secondary)
                                GachaCardGrid(ids: missing, cardsByID: cardsByID)
                            }
                        }
                        if configuration.probability(of: configuration.cards[0], cardRarities: cardsByID.mapValues(\.rarity)) == nil {
                            Text("Gacha.cards.special-rates").font(.caption).foregroundStyle(.secondary)
                        }
                    }
                } else {
                    CustomGroupBox(useExtenedConstraints: true) {
                        ProgressView()
                    }
                }
            }
            .frame(maxWidth: infoContentMaxWidth)
        } header: {
            HStack {
                Text("Gacha.cards").font(.title2).bold()
                DetailSectionOptionPicker(selection: $locale, options: information.availableLocales)
                Spacer()
                Button { showAsTrained.toggle() } label: {
                    Text("Gacha.cards.show-as-trained")
                        .foregroundStyle(showAsTrained ? Color.accentColor : .secondary)
                }
                .buttonStyle(.plain)
            }
            .frame(maxWidth: infoContentMaxWidth)
            .detailSectionHeader()
        }
        .onChange(of: information.id, initial: true) {
            locale = information.configuration.majorLocale ?? .primaryLocale
        }
    }
}

private struct GachaRarityPool: View {
    let configuration: Gacha.Configuration
    let rarity: Card.Rarity
    let entries: [Gacha.PoolCard]
    let cardsByID: [Int: Card]
    let showAsTrained: Bool
    @State private var expanded = false

    var body: some View {
        CustomGroupBox {
            VStack {
                Button {
                    withAnimation { expanded.toggle() }
                } label: {
                    HStack {
                        let rates = configuration.rarityRates.filter { $0.rarity == rarity && $0.lotteryType == "normal" }
                        if rates.count == 1, let rate = rates.first {
                            Text(rate.rate / 100, format: .percent.precision(.fractionLength(0...3))).bold()
                        }
                        HStack(spacing: 1) {
                            if let stars = rarity.integer {
                                ForEach(0..<stars, id: \.self) { _ in
                                    Image(stars > 2 ? .rarityStarTrained : .rarityStarRegular)
                                        .resizable().frame(width: 16, height: 16)
                                }
                            } else {
                                Image(.rarityBirthday).resizable().frame(width: 16, height: 16)
                            }
                        }
                        .accessibilityLabel(rarity.localizedName)
                        Spacer()
                        Text("\(Set(entries.map(\.cardID)).count)").foregroundStyle(.secondary)
                        Image(systemName: "chevron.forward")
                            .foregroundStyle(.secondary)
                            .rotationEffect(.degrees(expanded ? 90 : 0))
                            .font(platform == .macOS ? .body : .caption)
                    }
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .accessibilityValue(Text(expanded ? "Gacha.cards.collapse" : "Details.expand"))
                if expanded {
                    ForEach(Array(Set(entries.map(\.weight))).sorted(by: >), id: \.self) { weight in
                        Divider()
                        let group = entries.filter { $0.weight == weight }
                        HStack(alignment: .top) {
                            VStack(alignment: .leading) {
                                if let entry = group.first, let probability = configuration.probability(of: entry, cardRarities: cardsByID.mapValues(\.rarity)) {
                                    Text(probability, format: .percent.precision(.fractionLength(2...4)))
                                } else {
                                    Text("Gacha.cards.weight.\(weight)").foregroundStyle(.secondary)
                                }
                            }
                            .frame(width: 60, alignment: .leading)
                            GachaCardGrid(ids: Array(Set(group.map(\.cardID))).sorted(), cardsByID: cardsByID, showTrained: showAsTrained)
                        }
                    }
                }
            }
        }
    }
}

struct GachaCardGrid: View {
    let ids: [Int]
    let cardsByID: [Int: Card]
    var showTrained = false
    @State private var expanded = false

    var body: some View {
        VStack(alignment: .trailing) {
            WrappingHStack(alignment: .trailing) {
                ForEach(expanded ? ids : Array(ids.prefix(20)), id: \.self) { id in
                    NavigationLink { CardDetailView(id: id) } label: {
                        if let card = cardsByID[id] {
                            CardThumbnail(card, showTrainedVersion: showTrained, sideLength: 60, showNavigationHints: true)
                        } else {
                            Text("#\(id)").frame(width: 60, height: 60)
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
    let cardsByID: [Int: Card]?
    let failed: Bool
    let retry: () -> Void
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
        VStack(alignment: .trailing) {
            if needsPicker {
                DetailSectionOptionPicker(selection: $locale, options: locales)
            }
            if failed {
                Button("General.retry", action: retry)
            } else if let cardsByID {
                let ids = values.localizedData?[locale] ?? (values.localizedData == nil ? values.majorValue : nil) ?? []
                if ids.isEmpty {
                    Text("Gacha.section.empty")
                        .foregroundStyle(.secondary)
                } else {
                    GachaCardGrid(ids: ids, cardsByID: cardsByID)
                }
            } else {
                ProgressView()
                    .controlSize(.small)
            }
        }
        .onChange(of: information.id, initial: true) {
            locale = values.majorLocale ?? .primaryLocale
        }
    }

}

#Preview("Gacha Cards and Possibility") {
    @Previewable @State var gacha: Gacha?
    @Previewable @State var cards: [Card]?
    NavigationStack {
        ScrollView {
            VStack(spacing: 20) {
                if let gacha {
                    GachaDetailCardsView(information: gacha, cardsByID: cards.map { Dictionary($0.map { ($0.id, $0) }, uniquingKeysWith: { first, _ in first }) }, failed: false, retry: {})
                    GachaDetailPossibilityView(information: gacha, cards: cards)
                } else { ProgressView() }
            }
            .padding()
        }
    }
    .frame(width: 700, height: 900)
    .task { cards = await Card.allWithCache() }
    .task { gacha = await Gacha.allWithCache()?.last { !($0.configuration.majorValue?.cards.isEmpty ?? true) } }
}
