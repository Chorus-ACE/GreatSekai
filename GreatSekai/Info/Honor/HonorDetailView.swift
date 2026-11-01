import SekaiKit
import SwiftUI

struct HonorDetailView: View {
    let id: Int
    var allHonors: [Honor]? = nil

    var body: some View {
        DetailViewBase(forType: Honor.self, previewList: allHonors, initialID: id) { information in
            HonorDetailContent(information: information).id(information.id)
        } switcherDestination: {
            HonorSearchView()
        }
    }
}

private struct HonorDetailContent: View {
    let information: Honor
    @AppStorage("showAdvancedDetails") private var showAdvancedDetails = false

    var body: some View {
        DetailInfoBase {
            DetailInfoItem("Honor.name", localizableText: information.title)
            if !information.record.map({ $0?.honorRarity }).isEmpty {
                DetailInfoItem("Honor.rarity", localizableText: information.record.map { $0?.rarity.localizedName })
            }
            if !information.startDate.isEmpty {
                DetailInfoItem("Honor.release-date", date: information.startDate)
            }
            DetailInfoItem("ID", text: String(information.id))
            if showAdvancedDetails {
                DetailInfoItem("Info.asset-bundle-name", localizableText: information.record.map { $0?.assetBundleName }, showLocaleKey: true)
            }
        } head: {
            HonorImage(information: information).frame(maxWidth: 380).padding(.vertical, 8)
        }

        RegionalDetailSection("Honor.levels", values: information.record.map { $0?.levels ?? [] }) { levels, locale in
            DetailExpandableRows(elements: levels.sorted { ($0.level ?? 0) < ($1.level ?? 0) }, symbol: "rosette") { level in
                CustomGroupBox {
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            if let number = level.level { Text("Honor.level.\(number)").font(.headline) }
                            Spacer()
                            if level.honorRarity != nil { Text(level.rarity.localizedName).foregroundStyle(.secondary) }
                        }
                        HonorImage(information: information, locale: locale, level: level.level)
                            .frame(maxWidth: 380).frame(maxWidth: .infinity)
                        if let description = level.description {
                            Text(description).textSelection(.enabled)
                        }
                        if let bonus = level.bonus {
                            Text("Honor.bonus.\(bonus)").foregroundStyle(.secondary)
                        }
                        if let start = level.startAt {
                            Text(Date(timeIntervalSince1970: start / 1000), format: .dateTime)
                                .font(.caption).foregroundStyle(.secondary)
                        }
                    }.frame(maxWidth: .infinity, alignment: .leading)
                }
            }
        }

        DetailArtsSection {
            ArtsTab("Honor.arts.image", ratio: 380.0 / 80.0) {
                for locale in information.availableLocales {
                    if let url = information.imageURL(in: locale) {
                        ArtsItem(title: .init(stringLiteral: locale.rawValue.uppercased()), url: url)
                    }
                }
            }
        }
        ExternalLinksSection(links: [ExternalLink(.sekaiViewer, url: URL(string: "https://sekai.best/honor")!)])
    }
}

#Preview { NavigationStack { HonorDetailView(id: 1) } }
