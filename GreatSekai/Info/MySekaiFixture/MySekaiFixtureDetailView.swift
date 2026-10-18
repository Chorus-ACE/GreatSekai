import SekaiKit
import SDWebImageSwiftUI
import SwiftUI

struct MySekaiFixtureDetailView: View {
    let id: Int
    var items: [MySekaiFixture]? = nil
    var body: some View {
        DetailViewBase(forType: MySekaiFixture.self, previewList: items, initialID: id) { fixture in
            DetailInfoBase {
                DetailInfoItem("Fixture.name", localizableText: fixture.title)
                DetailInfoItem("Fixture.description", localizableText: fixture.description)
                DetailInfoItem("Fixture.type", localizableText: fixture.type.map { $0?.localizedName })
                DetailInfoItem("Fixture.genre", localizableText: fixture.mainGenre)
                DetailInfoItem("Fixture.subgenre", localizableText: fixture.subGenre)
                DetailInfoItem("Fixture.site", localizableText: fixture.site.map { $0?.localizedName })
                DetailInfoItem("Fixture.layout", localizableText: fixture.layout.map { $0?.localizedName })
                DetailInfoItem("Fixture.size", localizableText: fixture.size.map { $0.map { "\($0.width) × \($0.depth) × \($0.height)" } })
                DetailInfoItem("Fixture.disassemble", localizableText: fixture.canDisassemble.map { $0.map { String(localized: $0 ? "General.yes" : "General.no") } })
                DetailInfoItem("Fixture.character-action", localizableText: fixture.hasCharacterAction.map { $0.map { String(localized: $0 ? "General.yes" : "General.no") } })
                DetailInfoItem("ID", text: String(fixture.id))
            } head: {
                WebImage(url: fixture.imageURL()) { $0.resizable().scaledToFit() } placeholder: {
                    RoundedRectangle(cornerRadius: 10).fill(getPlaceholderColor())
                }.frame(width: 240, height: 240)
            }
            FixtureMaterialsSection(fixture: fixture).id(fixture.id)
            DetailArtsSection {
                ArtsTab("Fixture.image") {
                    for locale in fixture.availableLocales {
                        if let url = fixture.imageURL(in: locale) {
                            ArtsItem(title: .init(stringLiteral: locale.rawValue.uppercased()), url: url)
                        }
                    }
                }
            }
            ExternalLinksSection(links: [ExternalLink(name: "External-link.sekai-viewer", url: URL(string: "https://sekai.best/mysekai/fixture/\(fixture.id)")!)])
        } switcherDestination: { MySekaiFixtureSearchView() }
    }
}

private struct FixtureMaterialsSection: View {
    let fixture: MySekaiFixture
    @State private var locale = SekaiLocale.primaryLocale
    private var materials: [MySekaiFixture.MaterialCost]? {
        fixture.materials.localizedData?[locale] ?? (fixture.materials.localizedData == nil ? fixture.materials.majorValue : nil)
    }
    var body: some View {
        Section {
            CustomGroupBox {
                if let materials {
                    if materials.isEmpty {
                        Text("Fixture.no-materials").foregroundStyle(.secondary)
                    } else {
                        VStack(spacing: 12) {
                            ForEach(materials) { material in
                                HStack {
                                    WebImage(url: material.imageURL(in: locale)) { $0.resizable().scaledToFit() } placeholder: { Color.clear }
                                        .frame(width: 40, height: 40)
                                    Text(material.name)
                                    Spacer()
                                    Text(verbatim: "×\(material.quantity)")
                                        .monospacedDigit()
                                }
                            }
                        }
                    }
                } else { Text("Info.unknown").foregroundStyle(.secondary) }
            }.frame(maxWidth: infoContentMaxWidth)
        } header: {
            HStack {
                Text("Fixture.materials").font(.title2).bold()
                if fixture.availableLocales.count > 1 {
                    DetailSectionOptionPicker(selection: $locale, options: fixture.availableLocales)
                }
                Spacer()
            }.frame(maxWidth: infoContentMaxWidth).detailSectionHeader()
        }
        .onAppear {
            if !fixture.availableLocales.contains(locale), let first = fixture.availableLocales.first { locale = first }
        }
    }
}
