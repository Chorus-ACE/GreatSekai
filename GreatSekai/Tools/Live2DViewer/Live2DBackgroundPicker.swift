import SwiftUI

/// Curated backgrounds: header menus contain places, and variant menus contain
/// only the parenthesized part of each name. Selection remains the catalog path.
struct Live2DBackgroundPicker: View {
    @Binding var value: String
    let catalog: Live2DBackgroundCatalog
    let onCustom: () -> Void
    var search = ""
    var label: LocalizedStringResource = "Live2D.background"
    @Environment(\.locale) private var locale

    private let backgroundsByName: [String: Live2DBackgroundCatalog.Background]

    init(value: Binding<String>, catalog: Live2DBackgroundCatalog, search: String = "",
         label: LocalizedStringResource = "Live2D.background", onCustom: @escaping () -> Void) {
        self.onCustom = onCustom
        self._value = value
        self.catalog = catalog
        self.search = search
        self.label = label
        self.backgroundsByName = Dictionary(catalog.backgrounds.map { ($0.name, $0) }, uniquingKeysWith: { first, second in
            let canonical = "scenario/background/\(first.name)/\(first.name)"
            return second.id == canonical ? second : first
        })
    }

    var backgroundCount: Int {
        Live2DDefaultBackgrounds.groups.flatMap(\.entries).filter { backgroundsByName[$0.assetName] != nil }.count
    }
    var hasMatches: Bool {
        Live2DDefaultBackgrounds.groups.contains { group in group.entries.contains { matches($0, group: group) } }
    }
    private var currentName: String {
        if let automatic = Live2DDefaultBackgrounds.Automatic(rawValue: value) {
            return Live2DDefaultBackgrounds.Entry.localized(automatic.title, locale: locale)
        }
        if value.hasPrefix(Live2DBackgroundCatalog.customPrefix) { return String(localized: "Live2D.background.custom", locale: locale) }
        guard let background = catalog.backgrounds.first(where: { $0.id == value }) else { return value }
        if let entry = Live2DDefaultBackgrounds.groups.flatMap(\.entries).first(where: { $0.assetName == background.name }) {
            return entry.localizedName(locale: locale)
        }
        if background.name == "livetalk_default" {
            return String(localized: "Live2D.background.place.live-talk", defaultValue: "Live Talk Classroom", locale: locale)
        }
        return background.name
    }
    private var query: String { search.trimmingCharacters(in: .whitespacesAndNewlines) }

    private func matches(_ entry: Live2DDefaultBackgrounds.Entry, group: Live2DDefaultBackgrounds.Group) -> Bool {
        guard backgroundsByName[entry.assetName] != nil else { return false }
        return query.isEmpty || entry.assetName.localizedStandardContains(query)
            || entry.localizedName(locale: locale).localizedStandardContains(query)
            || entry.localizedName(locale: Locale(identifier: "en")).localizedStandardContains(query)
            || Live2DDefaultBackgrounds.Entry.localized(group.category.title, locale: locale).localizedStandardContains(query)
            || group.category.rawValue.localizedStandardContains(query)
    }

    private var selection: Binding<String> {
        Binding(get: { value }, set: { choice in
            if choice == Live2DBackgroundCatalog.customSelection { onCustom() }
            else { value = choice }
        })
    }

    var body: some View {
        Picker(selection: selection) {
            Text(verbatim: currentName).tag(value)
            Divider()
            ForEach(Live2DDefaultBackgrounds.Automatic.allCases) { automatic in
                Text(automatic.title).tag(automatic.rawValue)
            }
            Divider()
            ForEach(Live2DDefaultBackgrounds.groups) { group in
                if group.entries.contains(where: { matches($0, group: group) }) {
                    categoryMenu(group)
                }
            }
            Divider()
            Text("Live2D.background.custom").tag(Live2DBackgroundCatalog.customSelection)
        } label: {
            Text(label)
        } currentValueLabel: {
            Text(verbatim: currentName)
        }
        .pickerStyle(.menu)
    }

    private func categoryMenu(_ group: Live2DDefaultBackgrounds.Group) -> some View {
        // Buttons avoid the separators macOS inserts around each inline picker.
        Menu {
            ForEach(group.families) { family in
                let entries = family.entries.filter { matches($0, group: group) }
                if !entries.isEmpty {
                    if family.hasVariants {
                        Menu {
                            variantOptions(entries)
                        } label: {
                            Text(family.place.title)
                        }
                    } else {
                        directOptions(entries)
                    }
                }
            }
        } label: {
            Text(group.category.title)
        }
    }

    @ViewBuilder private func variantOptions(_ entries: [Live2DDefaultBackgrounds.Entry]) -> some View {
        #if os(iOS)
        Picker(selection: $value) {
            ForEach(entries) { entry in
                if let variant = entry.variant, let background = backgroundsByName[entry.assetName] {
                    Text(variant.title).tag(background.id)
                }
            }
        } label: { EmptyView() }
        .pickerStyle(.inline).labelsHidden()
        #else
        ForEach(entries) { entry in
            if let variant = entry.variant {
                option(entry, title: Live2DDefaultBackgrounds.Entry.localized(variant.title, locale: locale))
            }
        }
        #endif
    }

    @ViewBuilder private func directOptions(_ entries: [Live2DDefaultBackgrounds.Entry]) -> some View {
        #if os(iOS)
        Picker(selection: $value) {
            ForEach(entries) { entry in
                if let background = backgroundsByName[entry.assetName] {
                    Text(verbatim: entry.localizedName(locale: locale)).tag(background.id)
                }
            }
        } label: { EmptyView() }
        .pickerStyle(.inline).labelsHidden()
        #else
        ForEach(entries) { option($0, title: $0.localizedName(locale: locale)) }
        #endif
    }

    @ViewBuilder private func option(_ entry: Live2DDefaultBackgrounds.Entry, title: String) -> some View {
        if let background = backgroundsByName[entry.assetName] {
            Button { value = background.id } label: {
                HStack {
                    Text(verbatim: title)
                    if value == background.id { Image(systemName: "checkmark") }
                }
            }
        }
    }
}
