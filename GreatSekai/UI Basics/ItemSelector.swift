//===---*- Greatdori! -*---------------------------------------------------===//
//
// ItemSelector.swift
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

import CryptoKit
import SekaiKit
import SwiftUI

struct ItemSelectorView<Element: Sendable & Hashable & SekaiCachable & SekaiFilterable & SekaiSortable & SekaiSearchable & SekaiTypeDescribable, Layout, LayoutPicker: View, Container: View, Content: View>: View {
//    var titleKey: LocalizedStringResource
    @Binding var selection: [Element]
    var updateList: @Sendable () async -> [Element]?
    var makeLayoutPicker: (Binding<Layout>) -> LayoutPicker
    var makeContainer: (Layout, [Element], AnyView, @escaping (Element) -> AnyView) -> Container
    var makeSomeContent: (Layout, Element) -> Content
    @State var currentLayout: Layout

    var listCacheScope = ""
    var unavailableSystemImage: String = "bolt.horizontal.fill"
    var getResultCountDescription: ((Int) -> LocalizedStringResource)?

    init(
//        _ titleKey: LocalizedStringResource,
        selection: Binding<[Element]>,
        initialLayout: Layout,
        initialSorter: SekaiSorter? = nil,
        layoutOptions: [(LocalizedStringKey, String, Layout)],
        @ViewBuilder container: @escaping (_ layout: Layout, _ elements: [Element], _ content: AnyView, _ eachContent: @escaping (Element) -> AnyView) -> Container,
        @ViewBuilder eachContent: @escaping (_ layout: Layout, _ element: Element) -> Content
    ) where Element: ListGettable, Layout: Hashable, LayoutPicker == GreatSekai.LayoutPicker<Layout> {
        self.init(
//            titleKey,
            selection: selection,
            initialLayout: initialLayout,
            initialSorter: initialSorter,
            layoutPicker: { layout in
                GreatSekai.LayoutPicker(selection: layout, options: layoutOptions)
            },
            container: container,
            eachContent: eachContent
        )
    }
    init(
//        _ titleKey: LocalizedStringResource,
        selection: Binding<[Element]>,
        initialLayout: Layout,
        initialSorter: SekaiSorter? = nil,
        updateList: @Sendable @escaping () async -> [Element]?,
        layoutOptions: [(LocalizedStringKey, String, Layout)],
        @ViewBuilder container: @escaping (_ layout: Layout, _ elements: [Element], _ content: AnyView, _ eachContent: @escaping (Element) -> AnyView) -> Container,
        @ViewBuilder eachContent: @escaping (_ layout: Layout, _ element: Element) -> Content
    ) where Layout: Hashable, LayoutPicker == GreatSekai.LayoutPicker<Layout> {
        self.init(
//            titleKey,
            selection: selection,
            initialLayout: initialLayout,
            initialSorter: initialSorter,
            updateList: updateList,
            layoutPicker: { layout in
                GreatSekai.LayoutPicker(selection: layout, options: layoutOptions)
            },
            container: container,
            eachContent: eachContent
        )
    }
    init(
//        _ titleKey: LocalizedStringResource,
        selection: Binding<[Element]>,
        initialLayout: Layout,
        initialSorter: SekaiSorter? = nil,
        @ViewBuilder layoutPicker: @escaping (Binding<Layout>) -> LayoutPicker,
        @ViewBuilder container: @escaping (_ layout: Layout, _ elements: [Element], _ content: AnyView, _ eachContent: @escaping (Element) -> AnyView) -> Container,
        @ViewBuilder eachContent: @escaping (_ layout: Layout, _ element: Element) -> Content
    ) where Element: ListGettable {
        self.init(
//            titleKey,
            selection: selection,
            initialLayout: initialLayout,
            initialSorter: initialSorter,
            updateList: Element.all,
            layoutPicker: layoutPicker,
            container: container,
            eachContent: eachContent
        )
    }
    init(
//        _ titleKey: LocalizedStringResource,
        selection: Binding<[Element]>,
        initialLayout: Layout,
        initialSorter: SekaiSorter? = nil,
        updateList: @Sendable @escaping () async -> [Element]?,
        @ViewBuilder layoutPicker: @escaping (Binding<Layout>) -> LayoutPicker,
        @ViewBuilder container: @escaping (_ layout: Layout, _ elements: [Element], _ content: AnyView, _ eachContent: @escaping (Element) -> AnyView) -> Container,
        @ViewBuilder eachContent: @escaping (_ layout: Layout, _ element: Element) -> Content
    ) {
//        self.titleKey = titleKey
        self._selection = selection
        self.updateList = updateList
        self.makeLayoutPicker = layoutPicker
        self.makeContainer = container
        self.makeSomeContent = eachContent
        self._currentLayout = .init(initialValue: initialLayout)
        self._filter = .init(initialValue: .init(forKeys: Element.filterKeys))
        self._sorter = .init(initialValue: initialSorter ?? SekaiSorter(
            keyword: Element.applicableSortingTypes.contains(.releaseDate(in: .jp)) ? .releaseDate(in: .jp) : .id,
            direction: .descending
        ))
    }

    @Environment(\.dismiss) private var dismiss
    @Environment(\.dismissSelection) private var dismissSelection
    @Environment(\.supportsMultipleWindows) private var supportsMultipleWindows
    @Environment(\.horizontalSizeClass) private var sizeClass
    @Environment(\.colorScheme) private var colorScheme
    @Environment(\._itemSelectorMultiSelectionDisabled) private var isMultipleSelectionDisabled
    @State private var filter: SekaiFilter
    @State private var sorter: SekaiSorter
    @State private var elements: [Element]?
    @State private var searchedElements: [Element]?
    @State private var infoIsAvailable = true
    @State private var searchedText = ""
    @State private var showFilterSheet = false
    
    var isUISizeExpanded: Bool {
        #if os(macOS)
        true
        #else
        sizeClass == .regular && UIDevice.current.userInterfaceIdiom != .phone
        #endif
    }

    var body: some View {
        Group {
            Group {
                if let resultElements = searchedElements ?? elements {
                    Group {
                        if !resultElements.isEmpty {
                            ScrollViewReader { scrollProxy in
                                ScrollView {
                                    HStack {
                                        Spacer(minLength: 0)
                                        makeContainer(currentLayout, resultElements,
                                            AnyView(
                                                ForEach(resultElements, id: \.self) { element in
                                                    Button(action: {
                                                        if !isMultipleSelectionDisabled {
                                                            if selection.contains(element) {
                                                                selection.removeAll { $0 == element }
                                                            } else {
                                                                selection.append(element)
                                                            }
                                                        } else {
                                                            selection = [element]
                                                            close()
                                                        }
                                                    }, label: {
                                                        makeSomeContent(currentLayout, element)
                                                            .highlightKeyword($searchedText)
                                                            .groupBoxStrokeLineWidth(selection.contains(element) ? 3 : 0)
                                                    })
                                                    .buttonStyle(.plain)
                                                    .buttonBorderShape(.roundedRectangle(radius: 20))
                                                }
                                            )
                                        ) { element in
                                            AnyView(
                                                Button(action: {
                                                    if !isMultipleSelectionDisabled {
                                                        if selection.contains(element) {
                                                            selection.removeAll { $0 == element }
                                                        } else {
                                                            selection.append(element)
                                                        }
                                                    } else {
                                                        selection = [element]
                                                        close()
                                                    }
                                                }, label: {
                                                    makeSomeContent(currentLayout, element)
                                                        .highlightKeyword($searchedText)
                                                        .groupBoxStrokeLineWidth(selection.contains(element) ? 3 : 0)
                                                })
                                                .buttonStyle(.plain)
                                                .buttonBorderShape(.roundedRectangle(radius: 20))
                                            )
                                        }
                                        .padding(.horizontal)
                                        Spacer(minLength: 0)
                                    }
                                    .padding(.vertical)
                                }
                                .onAppear {
                                    if let sel = selection.first {
                                        scrollProxy.scrollTo(sel, anchor: .top)
                                    }
                                }
                            }
                        } else {
                            ContentUnavailableView("Search.no-results", systemImage: "magnifyingglass", description: Text("Search.no-results.description"))
                        }
                    }
                    .onSubmit {
                        if let elements {
                            searchedElements = elements.search(for: searchedText)
                        }
                    }
                } else {
                    if infoIsAvailable {
                        ExtendedConstraints {
                            ProgressView()
                        }
                    } else {
                        ExtendedConstraints {
                            ContentUnavailableView("Search.unavailable.\(Element.singularName)", systemImage: Element.symbol, description: Text("Search.unavailable.description"))
                                .onTapGesture {
                                    Task {
                                        await getList()
                                    }
                                }
                        }
                    }
                }
            }
            .searchable(text: $searchedText, prompt: "Search.prompt.\(Element.pluralName)")
            .navigationTitle(Element.pluralName)
//            #if !os(visionOS)
//            // Keep the searchable view's identity stable while the results load.
            .wrapIf(true, in: { content in
                if #available(iOS 26.0, macOS 26.0, *) {
                    content.navigationSubtitle(resultSubtitle)
                } else {
                    content
                }
            })
//            #endif
            .toolbar {
                ToolbarItem {
                    makeLayoutPicker($currentLayout)
                }
                #if !os(visionOS)
                if #available(iOS 26.0, macOS 26.0, *) {
                    ToolbarSpacer()
                }
                #endif
                ToolbarItemGroup {
                    FilterAndSorterPicker(showFilterSheet: $showFilterSheet, sorter: $sorter, isFiltering: filter.isFiltering(referencing: Element.filterKeys), sorterKeywords: Element.applicableSortingTypes, hasEndingDate: Element.hasEndingDate)
                }
                #if !os(visionOS)
                if #available(iOS 26.0, macOS 26.0, *) {
                    ToolbarSpacer()
                }
                #endif
                if !isUISizeExpanded {
                    ToolbarItem {
                        Button("Done", systemImage: "checkmark") {
                            close()
                        }
                        .wrapIf(true) { content in
                            if #available(iOS 26.0, macOS 26.0, *) {
                                content
                                    .buttonStyle(.glassProminent)
                            } else {
                                content
                                    .buttonStyle(.borderedProminent)
                            }
                        }
                    }
                }
            }
            .onDisappear {
                showFilterSheet = false
            }
        }
        .withSystemBackground()
        .inspector(isPresented: $showFilterSheet) {
            FilterView(filter: $filter, keys: Element.filterKeys)
                .presentationDetents([.medium, .large])
                .presentationDragIndicator(.visible)
                .presentationBackgroundInteraction(.enabled)
        }
        .withSystemBackground() // This modifier MUST be placed BOTH before
                                // and after `inspector` to make it work as expected
        .task {
            await getList()
        }
        .onChange(of: filter) {
            if let elements {
                searchedElements = elements.filter(withSekaiFilter: filter).search(for: searchedText).sorted(withSekaiSorter: sorter)
            }
        }
        .onChange(of: sorter) {
            if let elements {
                searchedElements = elements.filter(withSekaiFilter: filter).search(for: searchedText).sorted(withSekaiSorter: sorter)
            }
        }
        .onChange(of: searchedText, {
            if let elements {
                searchedElements = elements.filter(withSekaiFilter: filter).search(for: searchedText).sorted(withSekaiSorter: sorter)
            }
        })
    }

    private var resultSubtitle: LocalizedStringResource {
        guard let searchedElements else { return "" }
        if searchedText.isEmpty && !filter.isFiltering(referencing: Element.filterKeys) {
            return getResultCountDescription?(searchedElements.count) ?? "Search.item.\(searchedElements.count)"
        }
        return "Search.result.\(searchedElements.count)"
    }

    private func close() {
        if let dismissSelection {
            dismissSelection()
        } else {
            dismiss()
        }
    }

    func getList() async {
        infoIsAvailable = true
        let scope = SHA256.hash(data: Data(listCacheScope.utf8)).map { String(format: "%02x", $0) }.joined()
        let list: SekaiCache.Promise<[Element]?> = withSekaiCache(id: "\(Element.singularName.key)List_\(scope)", trait: .realTime) {
            await updateList()
        }
        list.onUpdate { result, _ in
            if let cards = result {
                self.elements = cards.sorted(withSekaiSorter: SekaiSorter(keyword: .id, direction: .ascending))
                searchedElements = cards.filter(withSekaiFilter: filter).search(for: searchedText).sorted(withSekaiSorter: sorter)
            } else {
                infoIsAvailable = false
            }
        }
    }
}

extension ItemSelectorView {
    func listCacheScope(_ scope: String) -> Self {
        var mutable = self
        mutable.listCacheScope = scope
        return mutable
    }

    func resultCountDescription(content: ((Int) -> LocalizedStringResource)?) -> Self {
        var mutable = self
        mutable.getResultCountDescription = content
        return mutable
    }
}
extension View {
    func selectorDisablesMultipleSelection(_ disabled: Bool = true) -> some View {
        environment(\._itemSelectorMultiSelectionDisabled, disabled)
    }
}
extension EnvironmentValues {
    @Entry fileprivate var _itemSelectorMultiSelectionDisabled = false
}

struct ItemSelectorButton<Element: Sendable & Hashable & Identifiable & SekaiCachable & TitleDescribable & SekaiTypeDescribable & ListGettable>: View {
    @Binding var selection: Element?
    var closeWindowOnSelectionChange = false
    var updateList: @Sendable () async -> [Element]? = { await Element.allWithCache() }
    var locale: SekaiLocale = .primaryLocale
    var availableIDs: Set<Int>?
    @Environment(\.isEnabled) private var isEnabled
    @State private var selectorWindowIsPresented = false
    var body: some View {
        Button(action: {
            selectorWindowIsPresented = true
        }, label: {
            if let selection {
                HStack {
                    Text(selection.title.localizedData?[locale] ?? selection.title.majorValue ?? "#\(selection.id)")
                        .multilineTextAlignment(.trailing)
                    Image(systemName: "chevron.up.chevron.down")
                        .bold(platform == .macOS)
                        .font(.footnote)
                }
            } else {
                Text("Selector.prompt.\(Element.singularName)")
            }
        })
        .wrapIf(platform != .macOS) {
            $0.foregroundStyle(isEnabled ? .accent : .secondary)
        }
        .padding(.vertical, platform == .macOS ? 0 : 3)
        .onChange(of: selection, {
            if closeWindowOnSelectionChange {
                selectorWindowIsPresented = false
            }
        })
        .onDisappear {
            selectorWindowIsPresented = false
        }
        .selectionWindow(isPresented: $selectorWindowIsPresented, title: Element.pluralName) {
            NavigationStack {
                Group {
                    if let eventBinding = bindingCast($selection, to: Event?.self) {
                        EventSelector(selection: eventBinding, locale: locale, availableEventIDs: availableIDs, updateList: { [updateList] in await updateList() as? [Event] })
                    } else if let cardBinding = bindingCast($selection, to: Card?.self) {
                        CardPicker(selection: cardBinding, locale: locale, availableCardIDs: availableIDs, updateList: { [updateList] in await updateList() as? [Card] })
                    }
                }
            }
        }
    }
}
