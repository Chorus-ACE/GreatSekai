//===---*- Greatdori! -*---------------------------------------------------===//
//
// CardDetailStatsView.swift
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

struct CardDetailStatsView: View {
    let card: Card
    @State private var tab = 1
    @State private var level = 1.0
    @State private var masterRank = 0
    @State private var episodes = 0
    @State private var trained = true
    @State private var mySekaiCanvas = false
    let regionalCards: [SekaiLocale: Card]?
    let regionalSkills: [SekaiLocale: [Skill]]?
    let retry: () -> Void

    private var rules: CardStatRules? { card.statRules }

    private var maximumLevel: Int {
        guard let rules else { return 1 }
        return trained || card.isInitiallySpecialTrained ? (rules.trainedMaxLevel ?? rules.normalMaxLevel) : rules.normalMaxLevel
    }

    private var selectedLevel: Int {
        tab == 0 ? 1 : tab == 1 ? (rules?.trainedMaxLevel ?? rules?.normalMaxLevel ?? 1) : Int(level)
    }

    private var power: CardStatRules.Power? {
        rules?.power(for: card, level: selectedLevel,
                     masterRank: tab == 0 ? 0 : tab == 1 ? (rules?.masterRanks.last ?? 0) : masterRank,
                     episodes: tab == 0 ? 0 : tab == 1 ? (rules?.episodeCount ?? 0) : episodes,
                     trained: tab == 1 ? card.canTrain : tab == 0 ? false : trained,
                     mySekaiCanvas: tab == 1 ? rules?.mySekaiCanvasBonus != nil : tab == 2 && mySekaiCanvas)
    }

    var body: some View {
        Section {
            Group {
                if rules == nil {
                    DetailUnavailableView(title: "Card.stats.unavailable", symbol: "exclamationmark.triangle")
                } else {
                    VStack {
                        Group {
                            if tab == 2 {
                                customControls
                            }
                        }
                        .animation(.default, value: tab)
                        CustomGroupBox(cornerRadius: 20) {
                            VStack {
                                if tab != 2 {
                                    ListItem { Text("Card.stats.level").bold() } value: { Text("\(selectedLevel)") }
                                    Divider()
                                }
                                ListItem { Text("Card.stats.parameters").bold() } value: {
                                    if let power {
                                        HStack(spacing: 1) {
                                            Text("\(power.performance)")
                                                .contentTransition(.numericText())
                                            Text(verbatim: " /  ")
                                            Text("\(power.technique)")
                                                .contentTransition(.numericText())
                                            Text(verbatim: " /  ")
                                            Text("\(power.stamina)")
                                                .contentTransition(.numericText())
                                        }
                                        .monospacedDigit()
                                    } else {
                                        Text("Info.unknown").foregroundStyle(.secondary)
                                    }
                                }
                                Divider()
                                statRow("Card.stats.total", value: power?.total)
                                    .monospacedDigit()
                            }
                            .contentTransition(.numericText())
                            .animation(.default, value: power)
                        }
                    }
                }
            }
            .frame(maxWidth: infoContentMaxWidth)
        } header: {
            HStack {
                Text("Card.stats").font(.title2).bold()
                DetailSectionOptionPicker(selection: $tab, options: [0, 1, 2], labels: [
                    0: String(localized: "Card.stats.min"), 1: String(localized: "Card.stats.max"),
                    2: String(localized: "Card.stats.custom")
                ])
                Spacer()
            }
            .frame(maxWidth: infoContentMaxWidth)
            .detailSectionHeader()
        }
        .onChange(of: card, initial: true) { configureStats() }
        .onChange(of: maximumLevel) { level = min(level, Double(maximumLevel)) }
        CardDetailSkillsView(baseCard: card, regionalCards: regionalCards, regionalSkills: regionalSkills) {
            retry()
        }
        .id(card.id)
    }

    private var customControls: some View {
        CustomGroupBox(cornerRadius: 20) {
            VStack {
                ListItem { Text("Card.stats.level").bold() } value: {
                    Text("\(Int(level))").contentTransition(.numericText())
                    Stepper("Card.stats.level", value: $level, in: 1...Double(maximumLevel), step: 1).labelsHidden()
                }
                Slider(value: $level, in: 1...Double(maximumLevel), step: 1) {
                    Text("Card.stats.level")
                }
                .labelsHidden()
                Divider()
                ListItem { Text("Card.stats.master-rank").bold() } value: {
                    Text("\(masterRank)")
                        .contentTransition(.numericText())
                    Stepper("Card.stats.master-rank", onIncrement: {
                        if let next = rules?.masterRanks.first(where: { $0 > masterRank }) {
                            masterRank = next
                        }
                    }, onDecrement: {
                        if let previous = rules?.masterRanks.last(where: { $0 < masterRank }) {
                            masterRank = previous
                        }
                    })
                    .labelsHidden()
                }
                if let rules, rules.episodeCount > 0 {
                    Divider()
                    ListItem { Text("Card.stats.episode").bold() } value: {
                        Text("\(episodes)")
                            .contentTransition(.numericText())
                        Stepper("Card.stats.episode", value: $episodes, in: 0...rules.episodeCount).labelsHidden()
                    }
                }
                if rules?.mySekaiCanvasBonus != nil {
                    Divider()
                    ListItem { Text("Card.stats.mysekai-canvas").bold() } value: {
                        Toggle("Card.stats.mysekai-canvas", isOn: $mySekaiCanvas)
                            .labelsHidden().toggleStyle(.switch)
                    }
                }
                if card.canTrain {
                    Divider()
                    ListItem { Text("Card.stats.trained").bold() } value: {
                        Toggle("Card.stats.trained", isOn: $trained).labelsHidden().toggleStyle(.switch)
                            .disabled(card.isInitiallySpecialTrained)
                    }
                }
            }
        }
    }

    private func statRow(_ title: LocalizedStringKey, value: Int?) -> some View {
        ListItem { Text(title).bold() } value: {
            if let value {
                Text("\(value)")
            } else {
                Text("Info.unknown").foregroundStyle(.secondary)
            }
        }
    }

    private func configureStats() {
        mySekaiCanvas = false
        guard let rules else { return }
        trained = card.canTrain || card.isInitiallySpecialTrained
        level = Double(trained ? (rules.trainedMaxLevel ?? rules.normalMaxLevel) : rules.normalMaxLevel)
        masterRank = rules.masterRanks.last ?? 0
        episodes = rules.episodeCount
    }

}

private struct CardDetailSkillsView: View {
    let baseCard: Card
    let regionalCards: [SekaiLocale: Card]?
    private var card: Card { regionalCards?[locale] ?? baseCard }
    let regionalSkills: [SekaiLocale: [Skill]]?
    @State private var locale: SekaiLocale = .primaryLocale

    private var skills: [Skill]? { regionalSkills?[locale] }
    private var availableLocales: [SekaiLocale] {
        baseCard.name.localizedData?.allAvailableLocales ?? [.primaryLocale]
    }
    let retry: () -> Void
    @State private var skillLevel = 1
    @State private var trainedSkill = false

    private var hasTrainedSkill: Bool {
        card.specialTrainingSkillID.map { $0 != card.skillID } ?? false
    }

    private var skill: Skill? {
        skills?.first { $0.id == (trainedSkill ? card.specialTrainingSkillID ?? card.skillID : card.skillID) }
    }

    private var characterName: String? {
        SekaiCache.preCache.character(id: card.characterID)?.fullName.forLocale(locale)
    }

    private var levels: [Int] {
        Array(Set(skill?.effects.flatMap { $0.details.map(\.level) } ?? [])).sorted()
    }

    private var name: String {
        let value = trainedSkill ? card.specialTrainingSkillName : card.skillName
        return value.localizedData?[locale] ?? value.majorValue ?? String(localized: "Info.unknown")
    }

    var body: some View {
        Section {
            CustomGroupBox(cornerRadius: 20) {
                VStack {
                    ListItem {
                        Text("Card.stats.skill-level")
                            .bold()
                    } value: {
                        Text("\(skillLevel)")
                            .contentTransition(.numericText())
                        Stepper("Card.stats.skill-level", onIncrement: incrementLevel, onDecrement: decrementLevel)
                            .labelsHidden()
                    }
                    Divider()
                    
                    ListItem {
                        Text("Card.stats.name")
                            .bold()
                    } value: {
                        Text(name)
                    }
                    Divider()
                    
                    ListItem {
                        Text("Card.stats.effect")
                            .bold()
                    } value: {
                        if let skill {
                            Text(skill.description(atLevel: skillLevel, short: true, characterName: characterName))
                                .contentTransition(.numericText())
                        } else {
                            Text(verbatim: "Lorem Ipsum Dolor")
                                .redacted(reason: .placeholder)
                        }
                    }
                    Divider()
                    
                    ListItem {
                        Text("Card.stats.full-effect")
                        .bold()
                    } value: {
                        if let skill {
                            Text(skill.description(atLevel: skillLevel, characterName: characterName))
                                .contentTransition(.numericText())
                        } else {
                            Text(verbatim: "Lorem Ipsum Dolor")
                                .redacted(reason: .placeholder)
                        }
                    }
                    Divider()
                    
                    ListItem {
                        Text("Card.stats.skill-type")
                        .bold()
                    } value: {
                        if let skill {
                            if let style = skill.style {
                                Text(style.localizedName)
                            } else {
                                Text("Info.unknown").foregroundStyle(.secondary)
                            }
                        } else {
                            Text(verbatim: "Lorem Ipsum")
                                .redacted(reason: .placeholder)
                        }
                    }
                }
                .animation(.default, value: skillLevel)
            }
            .frame(maxWidth: infoContentMaxWidth)
        } header: {
            HStack {
                Text("Card.stats.skill").font(.title2).bold()
                if hasTrainedSkill {
                    DetailSectionOptionPicker(selection: $trainedSkill, options: [false, true], labels: [
                        false: String(localized: "Card.arts.normal"),
                        true: String(localized: "Card.arts.trained")
                    ])
                }
                Spacer()
                if availableLocales.count > 1 {
                    DetailSectionOptionPicker(selection: $locale, options: availableLocales)
                }
            }
            .frame(maxWidth: infoContentMaxWidth)
            .detailSectionHeader()
        }
        .onAppear {
            locale = baseCard.name.majorLocale ?? .primaryLocale
            trainedSkill = card.isInitiallySpecialTrained && hasTrainedSkill
        }
        .onChange(of: levels, initial: true) {
            if !levels.contains(skillLevel) {
                skillLevel = levels.first ?? 1
            }
        }
    }

    private var incrementLevel: (() -> Void)? {
        guard let next = levels.first(where: { $0 > skillLevel }) else { return nil }
        return { skillLevel = next }
    }

    private var decrementLevel: (() -> Void)? {
        guard let previous = levels.last(where: { $0 < skillLevel }) else { return nil }
        return { skillLevel = previous }
    }
}

#Preview("Card Stats") {
    @Previewable @State var card: Card?
    ScrollView {
        VStack(spacing: 20) {
            if let card {
                CardDetailStatsView(card: card, regionalCards: [.primaryLocale: card], regionalSkills: [:], retry: {})
            } else {
                ProgressView()
            }
        }
        .padding()
    }
    .frame(width: 700, height: 650)
    .task { card = await Card.allWithCache()?.first { $0.rarity == .four } }
}
