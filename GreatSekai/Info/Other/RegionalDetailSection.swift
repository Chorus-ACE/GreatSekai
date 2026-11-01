import SekaiKit
import SwiftUI

/// Shared by regional detail sections. Identical editions do not need a region picker.
struct RegionalDetailSection<Value: Equatable, Content: View>: View {
    let title: LocalizedStringKey
    let values: LocalizableData<Value>
    let content: (Value, SekaiLocale) -> Content
    @State private var locale: SekaiLocale

    init(_ title: LocalizedStringKey, values: LocalizableData<Value>, @ViewBuilder content: @escaping (Value, SekaiLocale) -> Content) {
        self.title = title
        self.values = values
        self.content = content
        _locale = State(initialValue: values.majorLocale ?? .primaryLocale)
    }

    init(_ title: LocalizedStringKey, values: LocalizableData<Value>, @ViewBuilder content: @escaping (Value) -> Content) {
        self.init(title, values: values) { value, _ in content(value) }
    }

    private var locales: [SekaiLocale] { values.localizedData?.allAvailableLocales ?? [.primaryLocale] }
    private var needsPicker: Bool {
        guard let first = locales.first else { return false }
        return locales.dropFirst().contains { values.localizedData?[$0] != values.localizedData?[first] }
    }

    var body: some View {
        Section {
            if let value = values.localizedData?[locale] ?? (values.localizedData == nil ? values.majorValue : nil) {
                content(value, locale).id(locale).frame(maxWidth: infoContentMaxWidth)
            } else {
                DetailUnavailableView(title: "Info.section.empty", symbol: "tray")
                    .frame(maxWidth: infoContentMaxWidth)
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
        .onChange(of: locales) {
            if !locales.contains(locale) { locale = values.majorLocale ?? .primaryLocale }
        }
    }
}

/// Long programme and schedule lists use the same progressive disclosure as related-content sections.
struct DetailExpandableRows<Element, Content: View>: View {
    let elements: [Element]
    var symbol = "tray"
    var initialCount = 5
    @ViewBuilder var content: (Element) -> Content
    @State private var expanded = false

    var body: some View {
        VStack(spacing: 10) {
            if elements.isEmpty {
                DetailUnavailableView(title: "Info.section.empty", symbol: symbol)
            } else {
                ForEach(Array((expanded ? elements : Array(elements.prefix(initialCount))).enumerated()), id: \.offset) { _, element in
                    content(element).buttonStyle(.plain)
                }
                if elements.count > initialCount {
                    Button {
                        withAnimation(.easeInOut(duration: 0.2)) { expanded.toggle() }
                    } label: {
                        Text(expanded ? "Details.show-less" : "Details.show-all.\(elements.count)")
                            .foregroundStyle(.secondary)
                    }
                    .buttonStyle(.plain)
                }
            }
        }
    }
}


struct DetailRetrySection: View {
    let title: LocalizedStringResource
    let retry: () async -> Void

    var body: some View {
        Section {
            Button { Task { await retry() } } label: {
                DetailUnavailableView(title: "Info.related.retry", symbol: "arrow.clockwise")
            }
            .buttonStyle(.plain)
        } header: {
            Text(title).font(.title2).bold().detailSectionHeader()
        }
        .frame(maxWidth: infoContentMaxWidth)
    }
}
