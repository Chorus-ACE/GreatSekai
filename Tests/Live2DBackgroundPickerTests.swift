import Foundation

@main struct Live2DBackgroundPickerTests {
    static func main() throws {
        let groups = Live2DDefaultBackgrounds.groups
        let entries = groups.flatMap(\.entries)
        precondition(groups.count == 11 && entries.count == 150)
        precondition(Set(entries.map(\.assetName)).count == entries.count, "Every menu selection needs a unique asset")
        let source = try String(contentsOfFile: CommandLine.arguments[1], encoding: .utf8)
        let sourceAssets = source.split(whereSeparator: \.isNewline).compactMap { line -> String? in
            guard let separator = line.range(of: " - ") else { return nil }
            return String(line[..<separator.lowerBound]).trimmingCharacters(in: .whitespaces)
        }
        precondition(entries.filter { Set(sourceAssets).contains($0.assetName) }.map(\.assetName) == sourceAssets, "Keep every supplied background and its source order")
        let vbs = groups.first { $0.category == .vbs }!
        let outsideCafe = vbs.families.first { $0.place == .streetSekaiCafeOutside }!
        let insideCafe = vbs.families.first { $0.place == .streetSekaiCafeInside }!
        precondition(!outsideCafe.hasVariants && !insideCafe.hasVariants, "Distinct names outside parentheses remain direct choices")
        precondition(outsideCafe.entries[0].assetName == "bg_c000401" && insideCafe.entries[0].assetName == "bg_c000501")
        let school = groups[0].families.first { $0.place == .schoolSekaiClassroom }!
        precondition(school.hasVariants && school.entries.count == 3)
        precondition(school.entries.map(\.variant) == [.day, .night, .noon])
        precondition(groups[0].entries.map(\.assetName)[3...5] == ["bg_f000201", "bg_f000701", "bg_f001503"])
        precondition(!groups[0].families.first { $0.place == .schoolSekaiHallway }!.hasVariants)
        let wonderland = groups.first { $0.category == .ws }!
        precondition(wonderland.families.first { $0.place == .wonderlandSekaiThemePark }!.entries.map(\.variant) == [.day, .night])
        precondition(!wonderland.families.first { $0.place == .wonderlandSekaiStage }!.hasVariants)
        let corrected = groups.first { $0.category == .miyamasuzaka }!.families.first { $0.place == .miyamasuzakaCourtyard }!
        precondition(corrected.entries.map(\.assetName) == ["bg_a002201", "bg_a002202", "bg_a002203", "bg_a002204"])
        let street = groups.first { $0.category == .realWorld }!.families.first { $0.place == .miyamasuzakaStreet }!
        precondition(street.entries.map(\.variant) == [.day, .dusk, .night])
        precondition(groups.last?.category == .colors)
        precondition(groups.last?.entries.map(\.place) == [.white, .black])
        // The same place name in separate headers must not merge those headers.
        precondition(groups.filter { $0.families.contains { $0.place == .garden } }.count == 2)
        let outdoor = school.entries[0]
        precondition(outdoor.localizedName(locale: Locale(identifier: "en")) == "Classroom, School SEKAI (Day)")
        for (language, variant) in [("ja", "昼"), ("ko", "낮"), ("zh-Hans", "白天"), ("zh-Hant", "白天")] {
            let name = outdoor.localizedName(locale: Locale(identifier: language))
            precondition(name.contains(variant) && !name.contains("Live2D."), "Localize the place and variant in \(language): \(name)")
        }
        func automatic(_ mode: Live2DDefaultBackgrounds.Automatic, _ category: Live2DDefaultBackgrounds.Category?, _ id: Int?, _ dark: Bool) -> String {
            Live2DDefaultBackgrounds.automaticAssetName(mode, category: category, characterID: id, dark: dark)
        }
        precondition(automatic(.original, .ln, 1, false) == "bg_f000101")
        precondition(automatic(.original, .ln, 1, true) == "bg_f000102")
        precondition(automatic(.brandNewWorld, .ln, 1, false) == "bg_f001503")
        precondition(automatic(.original, .ws, 13, true) == "bg_d000402")
        precondition(automatic(.brandNewWorld, .ws, 13, true) == "bg_d002501")
        precondition(automatic(.bedroom, .n25, 17, false) == "bg_e000103")
        precondition(automatic(.bedroom, .n25, 17, true) == "bg_e000102")
        precondition(automatic(.bedroom, .ln, 1, false) == "bg_f000301")
        precondition(automatic(.original, nil, 99, true) == "bg_f000904")
        precondition(automatic(.brandNewWorld, .mmj, 5, false) == "bg_b003101")
        precondition(automatic(.brandNewWorld, .vbs, 9, false) == "bg_c002501")
        precondition(automatic(.brandNewWorld, .n25, 17, false) == "bg_e002201")
        for id in 1...20 {
            precondition(automatic(.bedroom, nil, id, false) != "bg_f000904")
            precondition(automatic(.bedroom, nil, id, true) != "bg_f000904")
        }
        precondition(automatic(.bedroom, nil, 21, false) == "bg_f000904")
        print("PASS: 150 unique assets in source order, 11 headers, nested variants, corrected IDs, day/dusk/night and five localized full labels")
    }
}
