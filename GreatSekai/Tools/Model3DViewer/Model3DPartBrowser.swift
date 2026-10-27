import SekaiKit
import SwiftUI

struct Model3DPartGroup: Identifiable {
    let id: String
    let name: String?
    let variants: [CostumeVariant]

    func matches(_ query: String) -> Bool {
        query.isEmpty || name?.localizedStandardContains(query) == true || variants.contains { variant in
            variant.name?.localizedStandardContains(query) == true || variant.colorName?.localizedStandardContains(query) == true
                || String(variant.costumeID).contains(query) || variant.metadata.groupID.map { String($0).contains(query) } == true
        }
    }
}

/// The three clothing tabs share a searchable design grid and a color palette per design.
struct Model3DPartBrowser: View {
    let groups: [Model3DPartGroup]
    @Binding var selection: String?
    let locale: SekaiLocale
    let tab: ModelInspectorTab
    var allowsNone = false
    var isLocked = false
    @State private var search = ""

    init(groups: [Model3DPartGroup], selection: Binding<String?>, locale: SekaiLocale, tab: ModelInspectorTab, allowsNone: Bool = false, isLocked: Bool = false) {
        self.groups = groups
        self._selection = selection
        self.locale = locale
        self.tab = tab
        self.allowsNone = allowsNone
        self.isLocked = isLocked
    }

    private var query: String { search.trimmingCharacters(in: .whitespacesAndNewlines) }
    private var filteredGroups: [Model3DPartGroup] {
        groups.filter { $0.matches(query) }.sorted {
            ($0.variants.map(\.costumeID).min() ?? 0) < ($1.variants.map(\.costumeID).min() ?? 0)
        }
    }
    private var showsNone: Bool {
        allowsNone && (query.isEmpty || String(localized: "Model-3d.none").localizedStandardContains(query))
    }

    var body: some View {
        ScrollView {
            LazyVStack(pinnedViews: .sectionHeaders) {
                Section(content: {
                    if filteredGroups.isEmpty && !showsNone {
                        if query.isEmpty {
                            ContentUnavailableView("Model-3d.empty", systemImage: tab.symbol)
                        } else {
                            ContentUnavailableView.search(text: query)
                        }
                    } else {
                        LazyVGrid(columns: [GridItem(.adaptive(minimum: 100, maximum: 200))], alignment: .leading) {
                            if showsNone {
                                noneCard
                            }
                            
                            ForEach(filteredGroups) { group in
                                Model3DPartCard(
                                    group: group,
                                    selection: $selection,
                                    locale: locale,
                                    symbol: tab.symbol,
                                    query: query
                                )
                                .typesettingLanguage(.explicit(locale.nsLocale.language))
                            }
                        }
                        .disabled(isLocked)
                    }
                }, header: {
                    VStack(alignment: .leading) {
                        TextField(text: $search, label: {
                            Label("Model-3d.browser.search.\(tab.localizedLabel).\(groups.count)", systemImage: "magnifyingglass")
                        })
                        .textFieldStyle(.plain)
                        .padding(7)
                        .wrapIf(true, in: { content in
                            if #available(anyAppleOS 26.0, *) {
                                content.glassEffect()
                            } else {
                                content
                            }
                        })
                        
                        if isLocked {
                            Label("Model-3d.browser.hair-locked", systemImage: "lock.fill")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                    }
                    .padding(.vertical)
                })
            }
        }
        .padding(.horizontal)
        .scrollDismissesKeyboard(.interactively)
//        VStack(alignment: .leading, spacing: 12) {
////            HStack(spacing: 8) {
////                Image(systemName: "magnifyingglass").foregroundStyle(.secondary)
////                TextField("Model-3d.browser.search", text: $search)
////                    .textFieldStyle(.plain)
////                    .autocorrectionDisabled()
////                    .accessibilityIdentifier("model3d.search")
////                if !search.isEmpty {
////                    Button { search = "" } label: { Image(systemName: "xmark.circle.fill") }
////                        .buttonStyle(.plain)
////                        .foregroundStyle(.secondary)
////                        .accessibilityLabel(Text("Model-3d.browser.clear-search"))
////                }
////            }
////            .padding(10)
////            .background(.quaternary.opacity(0.5), in: RoundedRectangle(cornerRadius: 10))
////            .overlay { RoundedRectangle(cornerRadius: 10).strokeBorder(.secondary.opacity(0.2)) }
////            .padding(.horizontal, 16)
////            .padding(.top, 16)
//
////            Text("Model-3d.browser.count.\(filteredGroups.count)")
////                .font(.caption)
////                .foregroundStyle(.secondary)
////                .padding(.horizontal, 16)
//
////            GeometryReader { proxy in
////                let count = proxy.size.width >= 620 ? 4 : proxy.size.width >= 420 ? 3 : 2
////                ScrollView {
////                    
////                }
////                .scrollDismissesKeyboard(.interactively)
////            }
//        }
//
//        .background(.background)
    }

    private var noneCard: some View {
        VStack(alignment: .leading, spacing: 6) {
            Button { selection = nil } label: {
                RoundedRectangle(cornerRadius: 12)
                    .fill(.quaternary)
                    .aspectRatio(1, contentMode: .fit)
                    .overlay {
                        Image(systemName: "nosign")
                        .font(.largeTitle)
                        .foregroundStyle(.secondary)
                    }
                    .overlay {
                        RoundedRectangle(cornerRadius: 12)
                        .strokeBorder(selection == nil ? Color.accentColor : .clear, lineWidth: 3)
                    }
            }
            .buttonStyle(.plain)
            .accessibilityLabel(Text("Model-3d.none"))
            .accessibilityAddTraits(selection == nil ? .isSelected : [])
            

//            VStack(alignment: .leading, spacing: 3) {
                Text("Model-3d.none")
                    .font(.subheadline.weight(selection == nil ? .semibold : .regular))
                    .foregroundStyle(selection == nil ? .primary : .secondary)
//            }
            
            Spacer(minLength: 10)
        }
    }
}

private struct Model3DPartCard: View {
    let group: Model3DPartGroup
    @Binding var selection: String?
    let locale: SekaiLocale
    let symbol: String
    let query: String

    private var isSelected: Bool { group.variants.contains { $0.id == selection } }
    private var preview: CostumeVariant? {
        group.variants.first { $0.id == selection }
            ?? group.variants.first { !query.isEmpty && String($0.costumeID).contains(query) }
            ?? group.variants.first
    }
    private var name: String { group.name ?? preview?.name ?? preview.map { String($0.costumeID) } ?? "" }

    var body: some View {
        if let preview {
            VStack(alignment: .leading, spacing: 6) {
                Button { selection = preview.id } label: {
                    Model3DPartThumbnail(variant: preview, locale: locale, symbol: symbol, cornerRadius: 12)
                        .overlay(alignment: .topTrailing) {
                            if group.variants.count > 1 {
                                Text("\(group.variants.count)")
                                    .font(.caption2.weight(.medium))
                                    .foregroundStyle(.white)
                                    .padding(.horizontal, 6)
                                    .padding(.vertical, 3)
                                    .background(.black.opacity(0.65), in: Circle())
                                    .padding(6)
                            }
                        }
                        .overlay { RoundedRectangle(cornerRadius: 12).strokeBorder(isSelected ? Color.accentColor : .clear, lineWidth: 3) }
                }
                .buttonStyle(.plain)
                .accessibilityLabel(Text(verbatim: name))
                .accessibilityValue(Text(verbatim: preview.colorName ?? String(preview.costumeID)))
                .accessibilityAddTraits(isSelected ? .isSelected : [])

                VStack(alignment: .leading, spacing: 3) {
                    Text(verbatim: name)
                        .font(.subheadline.weight(isSelected ? .semibold : .regular))
                        .foregroundStyle(isSelected ? .primary : .secondary)
                        .lineLimit(2)
                        .accessibilityHidden(true)

                    if group.variants.count > 1 {
                        HStack {
                            ForEach(group.variants) { variant in
                                Button { selection = variant.id } label: {
                                    Model3DPartThumbnail(variant: variant, locale: locale, symbol: symbol, cornerRadius: 6)
//                                        .padding(0)
                                        .overlay {
                                            RoundedRectangle(cornerRadius: 6)
                                            .strokeBorder(selection == variant.id ? Color.accentColor : .clear, lineWidth: 2)
                                        }
                                }
                                .buttonStyle(.plain)
                                .accessibilityLabel(Text(verbatim: name + " · " + (variant.colorName ?? String(variant.costumeID))))
                                .accessibilityAddTraits(selection == variant.id ? .isSelected : [])
                            }
                        }
                    } else if let color = preview.colorName, !color.isEmpty {
                        Text(verbatim: color)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                            .lineLimit(1)
                            .accessibilityHidden(true)
                    }
                }
                
                Spacer(minLength: 10)
            }
        }
    }
}

private struct Model3DPartThumbnail: View {
    let variant: CostumeVariant
    let locale: SekaiLocale
    let symbol: String
    let cornerRadius: CGFloat

    var body: some View {
        ZStack {
            Color.cyan.opacity(0.18)
            FallbackableWebImage(throughURLs: variant.thumbnailImageURLs(in: locale)) { image in
                image.resizable().scaledToFit()
            } placeholder: {
                Image(systemName: symbol).font(.system(size: cornerRadius >= 12 ? 32 : 16, weight: .light)).foregroundStyle(.secondary)
            }
        }
        .aspectRatio(1, contentMode: .fit)
        .clipShape(RoundedRectangle(cornerRadius: cornerRadius))
        .accessibilityHidden(true)
    }
}


#if DEBUG
private struct Model3DInspectorPreview: View {
    @State private var selection: String?
    private let character: Model3DCharacter = {
        let designs: [(group: Int, ids: [Int], name: String, thumbnail: String)] = [
            (1, [2], "Default", "body_default_01"),
            (301, [301], "Cool School Rocker", "body_default_01_v2"),
            (1001, [1002, 1004, 1006, 1008], "School Rock", "cos0001_body"),
            (3001, [3002, 3004, 3006, 3008], "Melody Clover", "cos0003_body"),
            (5001, [5002, 5004, 5006, 5008], "Street Parka", "cos0005_body"),
            (7001, [7002, 7004, 7006, 7008], "Wonder Magic", "cos0007_body"),
            (9001, [9002, 9004, 9006, 9008], "Midnight Fiction", "cos0009_body"),
            (11001, [11002, 11004, 11006, 11008], "Street Casual (F)", "cos0011_body")
        ]
        let parts: [[String: Any]] = designs.flatMap { design in
            design.ids.enumerated().map { color, id in
                ["id": "1:light_sound:body:\(id)", "costumeID": id, "type": "body",
                 "name": design.name, "colorName": color == 0 ? "Normal" : "Variant \(color)",
                 "costume3dGroupId": design.group, "colorId": color + 1,
                 "costumeAssetbundleName": design.thumbnail + (color == 0 ? "" : String(format: "_%02d", color))]
            }
        }
        let document: [String: Any] = ["schemaVersion": 1, "region": "en", "revision": "preview", "files": [:],
            "roles": [["id": "1:light_sound", "characterId": 1, "unit": "light_sound", "name": "Ichika",
                       "bodyCostume3dId": 2, "headCostume3dId": 1, "hairCostume3dId": 201, "parts": parts]]]
        let data = try! JSONSerialization.data(withJSONObject: document)
        let catalog = try! JSONDecoder().decode(Model3DCatalog.self, from: data)
        return try! Model3DLibrary(catalog: catalog).characters[0]
    }()

    var body: some View {
        Model3DPartBrowser(groups: character.costumes.map { .init(id: $0.id, name: $0.name, variants: $0.variants) },
                           selection: $selection, locale: .en, tab: .costume)
            .onAppear { selection = character.costumes.first?.variants.first?.id }
    }
}

#Preview("Costume inspector") {
    Model3DInspectorPreview().frame(width: 350, height: 820).preferredColorScheme(.dark)
}

#Preview("Costume inspector - wide") {
    Model3DInspectorPreview().frame(width: 760, height: 1000).preferredColorScheme(.dark)
}
#endif
