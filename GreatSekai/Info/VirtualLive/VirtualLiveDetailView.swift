import SekaiKit
import SwiftUI

struct VirtualLiveDetailView: View {
    let id: Int
    var allVirtualLives: [VirtualLive]? = nil

    var body: some View {
        DetailViewBase(forType: VirtualLive.self, previewList: allVirtualLives, initialID: id) { information in
            VirtualLiveDetailContent(information: information).id(information.id)
        } switcherDestination: {
            VirtualLiveSearchView()
        }
    }
}

private struct VirtualLiveDetailContent: View {
    let information: VirtualLive
    @AppStorage("showAdvancedDetails") private var showAdvancedDetails = false
    @State private var events: [Event]?
    @State private var eventsFailed = false
    @State private var descriptionExpanded = false

    private var characterIDs: LocalizableData<[Int]> {
        information.record.map { record in
            guard let record else { return nil }
            let ids = (record.virtualLiveCharacters ?? []).compactMap(\.gameCharacterUnitID).map {
                (27...56).contains($0) ? 21 + ($0 - 27) / 5 : $0
            }
            return ids.reduce(into: []) { result, id in if !result.contains(id) { result.append(id) } }
        }
    }

    var body: some View {
        DetailInfoBase {
            DetailInfoItem("VirtualLive.name", localizableText: information.title)
            DetailInfoItem("VirtualLive.type", localizableText: information.record.map { $0?.type.localizedName })
            DetailInfoItem("VirtualLive.start-date", date: information.startDate)
            DetailInfoItem("VirtualLive.end-date", date: information.endDate)
            if !characterIDs.isCollectionEmpty {
                DetailInfoItem("VirtualLive.performers") {
                    VirtualLivePerformers(values: characterIDs)
                }
            }
            DetailInfoItem("VirtualLive.countdown") {
                CountdownText(startDate: information.startDate.localizedData ?? .init(), endDate: information.endDate.localizedData ?? .init())
            }
            DetailInfoItem("ID", text: String(information.id))
            if showAdvancedDetails {
                DetailInfoItem("Info.asset-bundle-name", localizableText: information.record.map { $0?.assetBundleName }, showLocaleKey: true)
                DetailInfoItem("VirtualLive.rewards", localizableText: information.record.map { $0.map { $0.rewardBoxIDs.map(String.init).joined(separator: ", ") } }, showLocaleKey: true)
            }
        } head: {
            VirtualLiveImage(information: information).frame(maxWidth: bannerWidth)
        }

        VirtualLiveSetlistSection(information: information)
        VirtualLiveSchedulesSection(information: information)

        if eventsFailed {
            DetailRetrySection(title: Event.pluralName) { await loadEvents() }
        } else {
            DetailsEventsSection(events: events)
        }

        if !information.record.map({ $0?.virtualLiveInformation?.summary }).isCollectionEmpty {
            RegionalDetailSection("VirtualLive.summary", values: information.record.map { $0?.virtualLiveInformation?.summary }) { text in
                CustomGroupBox { Text(text).frame(maxWidth: .infinity, alignment: .leading).textSelection(.enabled) }
            }
        }
        if !information.record.map({ $0?.virtualLiveInformation?.description }).isCollectionEmpty {
            RegionalDetailSection("VirtualLive.description", values: information.record.map { $0?.virtualLiveInformation?.description }, expanded: $descriptionExpanded) { text in
                CustomGroupBox {
                    Text(text).lineLimit(descriptionExpanded ? nil : 5)
                        .frame(maxWidth: .infinity, alignment: .leading).textSelection(.enabled)
                }
            }
        }
        DetailArtsSection {
            ArtsTab("VirtualLive.arts.banner", ratio: 790.0 / 243.0) {
                for locale in information.availableLocales {
                    if let url = information.bannerImageURL(in: locale) { ArtsItem(title: .init(stringLiteral: locale.rawValue.uppercased()), url: url) }
                }
            }
            ArtsTab("VirtualLive.arts.home-banner", ratio: bannerRatio) {
                for locale in information.availableLocales {
                    if let url = information.homeBannerImageURL(in: locale) { ArtsItem(title: .init(stringLiteral: locale.rawValue.uppercased()), url: url) }
                }
            }
        }
        .task { await loadEvents() }
    }

    private func loadEvents() async {
        eventsFailed = false
        let loaded = await Event.allWithCache()
        guard !Task.isCancelled else { return }
        guard let loaded else { eventsFailed = true; return }
        events = loaded.filter { $0.virtualLiveID == information.id }
    }
}

private struct VirtualLivePerformers: View {
    let values: LocalizableData<[Int]>
    @State private var locale = SekaiLocale.primaryLocale
    private var locales: [SekaiLocale] { values.localizedData?.allAvailableLocales ?? [.primaryLocale] }
    private var selectedLocale: SekaiLocale { locales.contains(locale) ? locale : (values.majorLocale ?? .primaryLocale) }
    private var needsPicker: Bool {
        locales.dropFirst().contains { values.localizedData?[$0] != values.localizedData?[locales.first ?? .primaryLocale] }
    }
    var body: some View {
        VStack(alignment: .trailing) {
            if needsPicker { DetailSectionOptionPicker(selection: $locale, options: locales) }
            CharacterWrappingHStack(characters: values.localizedData?[selectedLocale] ?? values.majorValue ?? [])
        }
        .onChange(of: locales, initial: true) { locale = selectedLocale }
    }
}

#Preview { NavigationStack { VirtualLiveDetailView(id: 1) } }
