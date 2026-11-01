//===---*- Greatdori! -*---------------------------------------------------===//
//
// GachaDetailPossibilityView.swift
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

struct GachaDetailPossibilityView: View {
    let information: Gacha
    @State private var locale: SekaiLocale = .primaryLocale
    @State private var selectedCard: Card?
    let cards: [Card]?
    @State private var calculatePlaysByPossibility = true
    @State private var possibility: Double = 99
    @State private var plays = 1

    private var configuration: Gacha.Configuration? {
        information.configuration.localizedData?[locale] ?? (information.configuration.localizedData == nil ? information.configuration.majorValue : nil)
    }
    private var availableIDs: Set<Int> { Set(configuration?.cards.map(\.cardID) ?? []) }

    var body: some View {
        Section {
            VStack {
                CustomGroupBox {
                    VStack {
                        ListItem { Text("Gacha.possibility.locale") } value: {
                            LocalePicker($locale, options: information.availableLocales)
                        }
                        Divider()
                        ListItem { Text("Gacha.possibility.card") } value: {
                            ItemSelectorButton(selection: $selectedCard, updateList: { cards }, locale: locale, availableIDs: availableIDs)
                                .disabled(cards == nil)
                        }
                        Divider()
                        ListItem { Text("Gacha.possibility.calculate") } value: {
                            Picker("Gacha.possibility.calculate", selection: $calculatePlaysByPossibility) {
                                Text("Gacha.possibility.calculate.plays-by-possibility").tag(true)
                                Text("Gacha.possibility.calculate.possibility-by-plays").tag(false)
                            }
                            .labelsHidden()
                        }
                        Divider()
                        if calculatePlaysByPossibility {
                            ListItem { Text("Gacha.possibility.possibility") } value: {
                                HStack {
                                    TextField("", value: $possibility, format: .number.precision(.fractionLength(0...4)))
                                        .labelsHidden().frame(maxWidth: 100)
                                    Stepper("Gacha.possibility.possibility", value: $possibility, in: 0...99.99)
                                        .labelsHidden()
                                }
                            }
                        } else {
                            ListItem { Text("Gacha.possibility.plays") } value: {
                                HStack {
                                    TextField("", value: $plays, format: .number.grouping(.never))
                                        .labelsHidden().frame(maxWidth: 100)
                                    Stepper("Gacha.possibility.plays", value: $plays, in: 0...Int.max)
                                        .labelsHidden()
                                }
                            }
                        }
                    }
                }
                CustomGroupBox {
                    HStack {
                        result
                        Spacer(minLength: 0)
                    }
                    .multilineTextAlignment(.leading)
                }
            }
            .frame(maxWidth: infoContentMaxWidth)
        } header: {
            HStack {
                Text("Gacha.possibility").font(.title2).bold()
                Spacer()
            }
            .frame(maxWidth: infoContentMaxWidth).detailSectionHeader()
        } footer: {
            Text("Gacha.possibility.ordinary-draws").font(.caption).foregroundStyle(.secondary)
                .frame(maxWidth: infoContentMaxWidth, alignment: .leading)
        }
        .onChange(of: information.id, initial: true) {
            locale = information.configuration.majorLocale ?? .primaryLocale
        }
        .onChange(of: locale) { selectedCard = nil }
    }

    @ViewBuilder private var result: some View {
        if let selectedCard, let configuration, let cards,
           let entry = configuration.cards.first(where: { $0.cardID == selectedCard.id }) {
            let rarities = Dictionary(cards.map { ($0.id, $0.rarity) }, uniquingKeysWith: { first, _ in first })
            if let probability = configuration.probability(of: entry, cardRarities: rarities) {
                if calculatePlaysByPossibility {
                    if let draws = GachaDrawEstimate.draws(perDraw: probability, target: possibility / 100) {
                        VStack(alignment: .leading) {
                            Text("Gacha.possibility.result.draws.\(draws).\(possibility.formatted(.number.precision(.fractionLength(0...4))))")
                            cost(for: draws, configuration: configuration)
                        }
                    } else { Text("Gacha.possibility.invalid-target") }
                } else if let chance = GachaDrawEstimate.probability(perDraw: probability, draws: plays) {
                    VStack(alignment: .leading) {
                        Text("Gacha.possibility.result.chance.\(plays).\((chance * 100).formatted(.number.precision(.fractionLength(0...4))))")
                        cost(for: plays, configuration: configuration)
                    }
                } else { Text("Gacha.possibility.invalid-plays") }
            } else { Text("Gacha.possibility.unsupported") }
        } else { Text("Gacha.possibility.error.card-not-selected") }
    }

    @ViewBuilder private func cost(for draws: Int, configuration: Gacha.Configuration) -> some View {
        // Only quote a crystal cost when there is a single unrestricted ordinary rate.
        let options = configuration.behaviors.filter { $0.type == "normal" && $0.spinCount > 0 && $0.executeLimit == nil }
        let costs = Set(options.compactMap { option -> Int? in
            guard option.costResourceType == "jewel", option.costQuantity >= 0,
                  option.costQuantity % option.spinCount == 0 else { return nil }
            return option.costQuantity / option.spinCount
        })
        if costs.count == 1, options.allSatisfy({ $0.costResourceType == "jewel" && $0.costQuantity % $0.spinCount == 0 }),
           let unitCost = costs.first {
            let (total, overflow) = draws.multipliedReportingOverflow(by: unitCost)
            if !overflow { Text("Gacha.possibility.result.cost.\(total)") }
        }
    }

}
