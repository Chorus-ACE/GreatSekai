// Adapted from Greatdori's ItemSelector (Apache-2.0, Greatdori project authors).
// https://greatdori.com/LICENSE.txt
import SekaiKit
import SwiftUI

/// The shared search, filter and selection surface used by content pickers.
struct ItemSelectorView<Element: Identifiable & Sendable & Hashable & SekaiFilterable & SekaiSortable & SekaiSearchable & SekaiTypeDescribable, Layout: Hashable, Container: View, Content: View>: View {
    @Binding var selection: Element?
    var updateList: @Sendable () async -> [Element]?
    var sorterKeywords: [SekaiSorter.Keyword]
    var layoutOptions: [(LocalizedStringKey, String, Layout)]
    var makeContainer: (Layout, [Element], AnyView, @escaping (Element) -> AnyView) -> Container
    var makeContent: (Layout, Element) -> Content
    var emptySelectionTitle: LocalizedStringKey?
    var resultCountDescription: (Int) -> LocalizedStringResource

    @Environment(\.dismiss) private var dismiss
    @Environment(\.dismissSelection) private var dismissSelection
    @Environment(\.horizontalSizeClass) private var sizeClass
    @State private var layout: Layout
    @State private var filter: SekaiFilter
    @State private var sorter: SekaiSorter
    @State private var elements: [Element]?
    @State private var failed = false
    @State private var query = ""
    @State private var showFilterSheet = false
    @State private var retryID = 0

    init(
        selection: Binding<Element?>,
        initialLayout: Layout,
        initialSorter: SekaiSorter,
        layoutOptions: [(LocalizedStringKey, String, Layout)],
        sorterKeywords: [SekaiSorter.Keyword] = Element.applicableSortingTypes,
        emptySelectionTitle: LocalizedStringKey? = nil,
        updateList: @Sendable @escaping () async -> [Element]?,
        resultCountDescription: @escaping (Int) -> LocalizedStringResource,
        @ViewBuilder container: @escaping (Layout, [Element], AnyView, @escaping (Element) -> AnyView) -> Container,
        @ViewBuilder eachContent: @escaping (Layout, Element) -> Content
    ) {
        self._selection = selection
        self._layout = .init(initialValue: initialLayout)
        self._filter = .init(initialValue: .init(forKeys: Element.filterKeys))
        self._sorter = .init(initialValue: initialSorter)
        self.sorterKeywords = sorterKeywords
        self.layoutOptions = layoutOptions
        self.emptySelectionTitle = emptySelectionTitle
        self.updateList = updateList
        self.resultCountDescription = resultCountDescription
        self.makeContainer = container
        self.makeContent = eachContent
    }

    private var results: [Element]? {
        elements?.filter(withSekaiFilter: filter)
            .search(for: query)
            .sorted(withSekaiSorter: sorter)
    }

    var body: some View {
        Group {
            if let results {
                ScrollView {
                    VStack(spacing: 15) {
                        if let emptySelectionTitle {
                            Button {
                                selection = nil
                                close()
                            } label: {
                                CustomGroupBox {
                                    HStack {
                                        Text(emptySelectionTitle)
                                        Spacer()
                                        if selection == nil {
                                            Image(systemName: "checkmark").foregroundStyle(.tint)
                                        }
                                    }
                                }
                            }
                            .buttonStyle(.plain)
                            .frame(maxWidth: bannerWidth * 2 + bannerSpacing)
                        }
                        if results.isEmpty {
                            ContentUnavailableView.search(text: query)
                        } else {
                            makeContainer(layout, results, AnyView(
                                ForEach(results) { element in
                                    selectionButton(element)
                                }
                            )) { element in
                                AnyView(selectionButton(element))
                            }
                        }
                    }
                    .padding()
                    .frame(maxWidth: .infinity)
                }
            } else if failed {
                ContentUnavailableView {
                    Label(Element.pluralName, systemImage: Element.symbol)
                } description: {
                    Text("Search.unavailable.description")
                } actions: {
                    Button("General.retry") { retryID += 1 }
                }
            } else {
                ExtendedConstraints {
                    ProgressView().controlSize(.large)
                }
            }
        }
        .navigationTitle(Element.pluralName)
        .wrapIf(true) { content in
            if #available(iOS 26.0, macOS 26.0, *) {
                content.navigationSubtitle(resultCountDescription(results?.count ?? 0))
            } else {
                content
            }
        }
        .searchable(text: $query, prompt: LocalizedStringResource("Search.prompt.\(Element.pluralName)"))
        .scrollDismissesKeyboard(.interactively)
        .toolbar {
            ToolbarItem {
                LayoutPicker(selection: $layout, options: layoutOptions)
            }
            ToolbarItemGroup {
                FilterAndSorterPicker(
                    showFilterSheet: $showFilterSheet,
                    sorter: $sorter,
                    isFiltering: filter.isFiltering(referencing: Element.filterKeys),
                    sorterKeywords: sorterKeywords,
                    hasEndingDate: Element.hasEndingDate
                )
            }
            ToolbarItem(placement: .confirmationAction) {
                Button("General.done", systemImage: "checkmark") { close() }
            }
        }
        .withSystemBackground()
        .wrapIf(sizeClass == .regular || platform == .macOS) { content in
            content.inspector(isPresented: $showFilterSheet) {
                filterView
            }
        } else: { content in
            content.sheet(isPresented: $showFilterSheet) {
                filterView
            }
        }
        .withSystemBackground()
        .task(id: retryID) {
            failed = false
            let result = await updateList()
            guard !Task.isCancelled else { return }
            elements = result
            failed = result == nil
        }
        .onDisappear { showFilterSheet = false }
    }

    private func close() {
        if let dismissSelection { dismissSelection() } else { dismiss() }
    }

    private var filterView: some View {
        FilterView(filter: $filter, keys: Element.filterKeys)
            .presentationDetents([.medium, .large])
            .presentationDragIndicator(.visible)
            .presentationBackgroundInteraction(.enabled)
    }

    private func selectionButton(_ element: Element) -> some View {
        Button {
            selection = element
            close()
        } label: {
            makeContent(layout, element)
                .highlightKeyword($query)
                .groupBoxStrokeLineWidth(selection?.id == element.id ? 3 : 0)
                .overlay(alignment: .topTrailing) {
                    if selection?.id == element.id {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundStyle(.white, Color.accentColor)
                            .padding(8)
                    }
                }
        }
        .buttonStyle(.plain)
        .accessibilityAddTraits(selection?.id == element.id ? .isSelected : [])
    }
}
