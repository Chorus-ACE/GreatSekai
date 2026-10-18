import SekaiKit
import SwiftUI

struct GachaDetailView: View {
    let id: Int
    var allGachas: [Gacha]? = nil

    var body: some View {
        DetailViewBase(forType: Gacha.self, previewList: allGachas, initialID: id) { information in
            GachaDetailContent(information: information).id(information.id)
        } switcherDestination: {
            GachaSearchView()
        }
    }
}

private struct GachaDetailContent: View {
    let information: Gacha

    @AppStorage("showAdvancedDetails") var showAdvancedDetails = false
    var body: some View {
        DetailInfoBase {
            DetailInfoItem("Gacha.title", localizableText: information.title)
            DetailInfoItem("Gacha.type", text: information.type.localizedName)
            DetailInfoItem("Gacha.start-date", date: information.startDate)
            DetailInfoItem("Gacha.end-date", date: information.endDate)
            DetailInfoItem("Gacha.countdown") {
                CountdownText(startDate: information.startDate.localizedData ?? .init(), endDate: information.endDate.localizedData ?? .init())
            }
            if !information.configuration.map({ $0?.spinLimit }).isEmpty {
                DetailInfoItem("Gacha.spin-limit", localizableText: information.configuration.map { $0?.spinLimit.map { String($0) } }, showLocaleKey: true)
            }
            if !information.configuration.map({ $0?.dailySpinLimit }).isEmpty {
                DetailInfoItem("Gacha.daily-limit", localizableText: information.configuration.map { $0?.dailySpinLimit.map { String($0) } }, showLocaleKey: true)
            }
            if !information.configuration.map({ $0?.drawableHours }).isEmpty {
                DetailInfoItem("Gacha.drawable-hours", localizableText: information.configuration.map { $0?.drawableHours.map { String($0) } }, showLocaleKey: true)
            }
            if !information.configuration.map({ ($0?.wishSelectCount ?? 0) > 0 ? $0?.wishSelectCount : nil }).isEmpty {
                DetailInfoItem("Gacha.wish-count", localizableText: information.configuration.map { ($0?.wishSelectCount ?? 0) > 0 ? $0.map { String($0.wishSelectCount) } : nil }, showLocaleKey: true)
            }
            
            if showAdvancedDetails {
                DetailInfoItem("Info.asset-bundle-name", content: {
                    Text(information.assetBundleName)
                        .fontDesign(.monospaced)
                })
            }
            
            DetailInfoItem("ID", text: String(information.id))
        } head: {
            FallbackableWebImage(throughURLs: information.previewImageURLs()) { image in
                image.resizable().scaledToFit()
            } placeholder: {
                RoundedRectangle(cornerRadius: 10).fill(getPlaceholderColor()).aspectRatio(3, contentMode: .fit)
            }
            .frame(maxWidth: bannerWidth)
            .clipShape(RoundedRectangle(cornerRadius: 10))
        }
        GachaDetailCardsView(information: information)
        GachaDetailRatesView(information: information)
        GachaDetailPaymentView(information: information)
        if !information.summary.isCollectionEmpty {
            GachaTextSection(title: "Gacha.summary", text: information.summary.majorValue ?? "")
        }
        if !information.description.isCollectionEmpty {
            GachaTextSection(title: "Gacha.description", text: information.description.majorValue ?? "")
        }
        DetailArtsSection {
            ArtsTab("Gacha.arts.banner", ratio: 3) {
                for locale in information.availableLocales {
                    if let url = information.bannerImageURL(in: locale) {
                        ArtsItem(title: .init(stringLiteral: locale.rawValue.uppercased()), url: url)
                    }
                }
            }
            ArtsTab("Gacha.arts.logo", ratio: 2) {
                for locale in information.availableLocales {
                    if let url = information.logoImageURL(in: locale) {
                        ArtsItem(title: .init(stringLiteral: locale.rawValue.uppercased()), url: url)
                    }
                }
            }
        }
        ExternalLinksSection(links: [ExternalLink(name: "External-link.sekai-viewer", url: URL(string: "https://sekai.best/gacha/\(information.id)")!)])
    }

}

private struct GachaTextSection: View {
    let title: LocalizedStringKey
    let text: String
    @State private var expanded = false

    var body: some View {
        Section {
            CustomGroupBox {
                Text(text)
                    .lineLimit(expanded ? nil : 4)
                    .multilineTextAlignment(.leading)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .textSelection(.enabled)
            }
            .frame(maxWidth: infoContentMaxWidth)
        } header: {
            HStack {
                Text(title).font(.title2).bold()
                Spacer()
                Button(expanded ? "Details.collapse" : "Details.expand") {
                    expanded.toggle()
                }
                .buttonStyle(.plain)
                .foregroundStyle(.secondary)
            }
            .frame(maxWidth: infoContentMaxWidth)
            .detailSectionHeader()
        }
    }
}

/// A region switch belongs to its section, and is omitted when all editions agree.
struct GachaRegionalSection<Value: Equatable, Content: View>: View {
    let title: LocalizedStringKey
    let values: LocalizableData<Value>
    let content: (Value) -> Content
    @State private var locale: SekaiLocale

    init(_ title: LocalizedStringKey, values: LocalizableData<Value>, @ViewBuilder content: @escaping (Value) -> Content) {
        self.title = title
        self.values = values
        self.content = content
        _locale = State(initialValue: values.majorLocale ?? .primaryLocale)
    }

    private var locales: [SekaiLocale] { values.localizedData?.allAvailableLocales ?? [.primaryLocale] }
    private var needsPicker: Bool {
        guard let first = locales.first else { return false }
        return locales.dropFirst().contains { values.localizedData?[$0] != values.localizedData?[first] }
    }

    var body: some View {
        Section {
            if let value = values.localizedData?[locale] ?? (values.localizedData == nil ? values.majorValue : nil) {
                content(value).id(locale).frame(maxWidth: infoContentMaxWidth)
            }
        } header: {
            HStack {
                Text(title).font(.title2).bold()
                if needsPicker {
                    DetailSectionOptionPicker(selection: $locale, options: locales)
                        .accessibilityLabel(Text("Content.locale"))
                }
                Spacer()
            }
            .frame(maxWidth: infoContentMaxWidth).detailSectionHeader()
        }
    }
}
