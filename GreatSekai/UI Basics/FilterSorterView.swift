//===---*- Greatdori! -*---------------------------------------------------===//
//
// FilterView.swift
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

import SekaiKit
import SDWebImageSwiftUI
import SwiftUI
#if os(iOS)
import UIKit
#endif

let filterItemHeight: CGFloat = platform == .macOS ? 25 : 35
let filerKeysWithSmallerIcons = ["unit", "rarity"] // "attribute",

let flowLayoutDefaultVerticalSpacing: CGFloat = 3
let flowLayoutDefaultHorizontalSpacing: CGFloat = 3
let capsuleDefaultCornerRadius: CGFloat = platform == .macOS ? 6 : 10


struct FilterView: View {
    @Binding var filter: SekaiFilter
    var keys: [SekaiFilter.Key]
    
    let hiddenKeys: [String] = []
    
    @Environment(\.horizontalSizeClass) var sizeClass
    
    var body: some View {
        Form {
            Section(content: {
                ForEach(keys) { key in
                    if !hiddenKeys.contains(key.id) {
                        FilterItemView(filter: $filter, key: key, allKeys: keys)
                    }
                }
            }, header: {
                VStack(alignment: .leading) {
                    if sizeClass == .compact {
                        Color.clear.frame(height: 10)
                    }
                    Text("Filter")
                }
            })
            
            Section {
                Button(action: {
                    filter = SekaiFilter(forKeys: keys)
                }, label: {
                    Text("Filter.clear-all")
                })
                .disabled(!filter.isFiltering(referencing: keys))
            }
        }
        .geometryGroup()
    }
}

struct FilterItemView: View {
    @Binding var filter: SekaiFilter
    let key: SekaiFilter.Key
    let allKeys: [SekaiFilter.Key]
    
//    @State var isHovering = false
//    @State var characterRequiresMatchAll = false
//    @State var skill: SekaiFilter.Skill? = nil
//    @State var levelSliderIsEnabled = false
//    @State var level: Double = 5
    var body: some View {
        VStack(alignment: .leading) {
            if key.allowMultipleSelection {
                // MARK: Title Part
                HStack {
                    VStack {
                        Text(key.title)
                            .bold()
                            .accessibilityHeading(.h2)
                    }
                    
                    // FIXME: Match All
                    /*
                    if key == .character && allKeys.contains(.characterRequiresMatchAll) {
                        Menu(content: {
                            Picker(selection: $characterRequiresMatchAll, content: {
                                Text("Filter.match-all.any-selected")
                                    .tag(false)
                                Text("Filter.match-all.all-selected")
                                    .tag(true)
                            }, label: {
                                Text("")
                            })
                            .pickerStyle(.inline)
                            .labelsHidden()
                            .multilineTextAlignment(.leading)
                        }, label: {
                            ViewThatFits {
                                Text(getAttributedStringForMatchAll(isAllSelected: characterRequiresMatchAll))
                                Text(getAttributedStringForMatchAll(isAllSelected: characterRequiresMatchAll, isCompact: true))
                            }
                        })
                        .menuIndicator(.hidden)
                        .menuStyle(.borderlessButton)
                        .buttonStyle(.plain)
                        .onChange(of: characterRequiresMatchAll, {
                            filter.characterRequiresMatchAll = characterRequiresMatchAll
                        })
                        .accessibilityLabel(Text(getAttributedStringForMatchAll(isAllSelected: characterRequiresMatchAll)))
                    }
                     */
                    Spacer()
                    Button(action: {
                        withAnimation(.easeInOut(duration: 0.05)) {
                            if (filter[key.id]?.count ?? 0) == 0 {
                                filter[key.id] = Set(key.allCasesID)
                            } else {
                                filter[key.id] = Set()
                            }
//                            let allCases = key.allCasesID
//                            if let filterSet = filter[key] as? Set<AnyHashable> {
//                                if filterSet.count == 0 {
//                                    filter[key] = Set(allCases)
////                                    if key == .band && allKeys.contains(.bandMatchesOthers) {
////                                        filter.bandMatchesOthers = .includeOthers
////                                    } else if key == .character && allKeys.contains(.characterMatchesOthers) {
////                                        filter.characterMatchesOthers = .includeOthers
////                                    }
//                                } else {
//                                    if var filterSet = filter[key] as? Set<AnyHashable> {
//                                        filterSet.removeAll()
//                                        filter[key] = filterSet
////                                        if key == .band && allKeys.contains(.bandMatchesOthers) {
////                                            filter.bandMatchesOthers = .excludeOthers
////                                        } else if key == .character && allKeys.contains(.characterMatchesOthers) {
////                                            filter.characterMatchesOthers = .excludeOthers
////                                        }
//                                    }
//                                }
//                            }
                        }
                    }, label: {
                        Group {
                            let filterSelectionCount = filter[key.id]?.count ?? 0
                            let selectionStatus = (filterSelectionCount == key.options.count) ? true : (filterSelectionCount == 0 ? false : nil)
                            CompactToggle(isLit: selectionStatus)
                                .filterToggleAccessibility(selectionStatus: selectionStatus)
                            
                            
//                            let allCases = key.selector.items.map { $0.item.value }
//                            if let filterSet = filter[key] as? Set<AnyHashable> {
//                                if key == .band && allKeys.contains(.bandMatchesOthers) || key == .character && allKeys.contains(.characterMatchesOthers) {
//                                    let includeOthers = key == .band ? filter.bandMatchesOthers == .includeOthers : filter.characterMatchesOthers == .includeOthers
//                                    
////                                    let selectionStatus = (filterSet.count == allCases.count && includeOthers) ? true : (filterSet.count == 0 && !includeOthers ? false : nil)
//                                    CompactToggle(isLit: selectionStatus)
//                                        .filterToggleAccessibility(selectionStatus: selectionStatus)
//                                } else {
//                                    let selectionStatus = (filterSet.count == allCases.count) ? true : (filterSet.count == 0 ? false : nil)
//                                    CompactToggle(isLit: selectionStatus)
//                                        .filterToggleAccessibility(selectionStatus: selectionStatus)
//                                }
//                            }
                        }
                        .foregroundStyle(.secondary)
                        .accessibilityLabel("Filter.selections-toggle")
                    })
                    .buttonStyle(.plain)
                }
                
                // MARK: Picker Part
                // Multiple Selection
                
                if key.options.first?.selectorImage != nil {
                    // MARK: Image Selection
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: filterItemHeight))]/*, spacing: 3*/) {
                        // FIXME: MatchesOthers
                        ForEach(key.options, id: \.self) { option in
                            Group {
                                Button(action: {
//                                    withAnimation(.easeInOut(duration: 0.05)) {
                                        var options = filter[key.id] ?? Set([])
                                        if options.contains(option.id) {
                                            options.remove(option.id)
                                        } else {
                                            options.insert(option.id)
                                        }
                                        filter[key.id] = options
//                                    }
                                }, label: {
                                    ZStack {
                                        Circle()
                                            .stroke(Color.accent, lineWidth: 2)
                                            .frame(width: filterItemHeight, height: filterItemHeight)
                                            .opacity(filter[key.id]?.contains(option.id) ?? false ? 1 : 0)
                                            
                                        WebImage(url: option.selectorImage)
                                            .resizable()
                                            .interpolation(.high)
                                            .frame(width: filterItemHeight, height: filterItemHeight)
                                            .scaleEffect(filerKeysWithSmallerIcons.contains(key.id) ? 0.75 : 0.9)
                                            .mask(Circle())
                                    }
                                    .contentShape(Circle())
                                })
                                .accessibilityValue(filter[key.id]?.contains(option.id) ?? false ? "Filter.activated" : "")
                            }
                            .buttonStyle(.plain)
                            .accessibilityLabel(Text(option.selectorName))
                            .accessibilityHint("Filter.tap-to-toggle")
                        }
                    }
                } else {
                    // MARK: Text Selection
                    FlowLayout(items: key.options, verticalSpacing: flowLayoutDefaultVerticalSpacing, horizontalSpacing: flowLayoutDefaultHorizontalSpacing) { option in
                        Button(action: {
//                            withAnimation(.easeInOut(duration: 0.05)) {
                                var options = filter[key.id] ?? Set([])
                                if options.contains(option.id) {
                                    options.remove(option.id)
                                } else {
                                    options.insert(option.id)
                                }
                                filter[key.id] = options
//                            }
                        }, label: {
                            FilterSelectionCapsuleView(isActive: filter[key.id]?.contains(option.id) ?? false, content: {
                                Text(option.selectorName)
                            })
                            .animation(.easeInOut(duration: 0.05))
                        })
                        .buttonStyle(.plain)
                        .accessibilityValue(filter[key.id]?.contains(option.id) ?? false ? "Filter.activated" : "")
                        .accessibilityHint("Filter.tap-to-toggle")
                    }
                }
            } else {
                /*
                 // MARK: Single Selection
                 if key == .skill {
                 Group {
                 #if os(iOS)
                 VStack(alignment: .leading) {
                 Text(key.localizedString)
                 .bold()
                 //                                        .offset(y: 5)
                 Picker(selection: $skill, content: {
                 // Optional "Any" to clear the filter
                 Text("Filter.skill.any")
                 .tag(Optional<SekaiFilter.Skill>.none)
                 
                 ForEach(key.selector.items, id: \.self) { item in
                 if let value = item.item.value as? SekaiFilter.Skill {
                 // Use the skill's simpleDescription (localized) instead of selectorText
                 //                                    let label = value.simpleDescription.forPreferredLocale() ?? ""
                 //                                    let label = value.description.forPreferredLocale() ?? ""
                 Text(item.text)
                 .tag(Optional(value))
                 }
                 }
                 }, label: {
                 Text(key.localizedString)
                 .bold()
                 }, optionalCurrentValueLabel: {
                 HStack {
                 Text(skill?.selectorText ?? String(localized: "Filter.skill.any"))
                 Spacer()
                 //                                                .multilineTextAlignment(.trailing)
                 }
                 })
                 .labelsHidden()
                 .padding(.vertical, -4)
                 .padding(.leading, -5)
                 //                                    .border(.red)
                 .offset(y: -5)
                 }
                 #else
                 Picker(selection: $skill, content: {
                 // Optional "Any" to clear the filter
                 Text("Filter.skill.any")
                 .tag(Optional<SekaiFilter.Skill>.none)
                 
                 ForEach(key.selector.items, id: \.self) { item in
                 if let value = item.item.value as? SekaiFilter.Skill {
                 // Use the skill's simpleDescription (localized) instead of selectorText
                 //                                    let label = value.simpleDescription.forPreferredLocale() ?? ""
                 //                                    let label = value.description.forPreferredLocale() ?? ""
                 Text(item.text)
                 .tag(Optional(value))
                 }
                 }
                 }, label: {
                 Text(key.localizedName)
                 .bold()
                 .lineLimit(nil)
                 })
                 #endif
                 }
                 .pickerStyle(.menu)
                 .onChange(of: skill) { _, newValue in
                 filter.skill = newValue
                 }
                 } else if /*key == .level*/ false { // FIXME: Level
                 VStack {
                 Toggle(isOn: $levelSliderIsEnabled, label: {
                 HStack {
                 Text(key.localizedName)
                 .bold()
                 Spacer()
                 if levelSliderIsEnabled {
                 Text("\(Int(level))")
                 // .contentTransition(.numericText())
                 // .animation(.default, value: level)
                 Stepper("", value: $level, in: 5...35, step: 1, onEditingChanged: { value in
                 // FIXME: Level
                 //                                        filter.level = Int(level)
                 })
                 .labelsHidden()
                 .accessibilityHidden(true)
                 }
                 
                 }
                 })
                 .toggleStyle(.switch)
                 .tint(Color.accentColor)
                 //                            .foregroundStyle(Color.tint)
                 if levelSliderIsEnabled {
                 Slider(value: $level, in: 5...35, step: 1, label: {
                 Text("")
                 }, onEditingChanged: { value in
                 if !value {
                 // FIXME: Level
                 //                                    filter.level = Int(level)
                 }
                 })
                 .labelsHidden()
                 .disabled(!levelSliderIsEnabled)
                 }
                 }
                 //                    .onChange(of: levelSliderIsEnabled) { _, isEnabledNow in
                 //                        if isEnabledNow {
                 //                            filter.level = Int(level)
                 //                        } else {
                 //                            filter.level = nil
                 //                        }
                 //                    }
                 }
                 */
            }
        }
        // FIXME: Level & Skill
        //        .onAppear {
        //            skill = filter.skill
        //            if let filterLevel = filter.level {
        //                levelSliderIsEnabled = true
        //                level = Double(filterLevel)
        //            } else {
        //                levelSliderIsEnabled = false
        //            }
        //        }
        //        .onChange(of: filter.skill) {
        //            if skill == nil {
        //                skill = filter.skill
        //            }
        //        }
        //        .onChange(of: filter.level) {
        //            if filter.level == nil {
        //                levelSliderIsEnabled = false
        //            }
        //        }
    }
    struct FilterSelectionCapsuleView<Content: View>: View {
        @Environment(\.horizontalSizeClass) var sizeClass
        var isActive: Bool
        let content: Content
        let cornerRadius: CGFloat = capsuleDefaultCornerRadius
        @State var textWidth: CGFloat = 0
        
        init(isActive: Bool, @ViewBuilder content: () -> Content) {
            self.isActive = isActive
            self.content = content()
        }
        var body: some View {
            ZStack {
                RoundedRectangle(cornerRadius: cornerRadius)
                    .foregroundStyle(isActive ? Color.accentColor : getTertiaryLabelColor())
                    .frame(width: textWidth, height: filterItemHeight)
                content
                    .foregroundStyle(isActive ? .white : Color.gray)
                    .frame(height: filterItemHeight)
                    .padding(.horizontal, platform == .macOS ? 10 : nil)
                    .onFrameChange(perform: { geometry in
                        textWidth = geometry.size.width
                    })
                //FIXME: Text padding to much in macOS
            }
            .animation(.easeInOut(duration: 0.05), value: isActive)
        }
    }
    func getAttributedStringForMatchAll(isAllSelected: Bool = false, isCompact: Bool = false) -> AttributedString {
        var attrString = AttributedString()
        if isCompact {
            attrString = AttributedString(String(localized: isAllSelected ? "Filter.match-all.all-selected.abbr" : "Filter.match-all.any-selected.abbr"))
        } else {
            attrString = AttributedString(String(localized: isAllSelected ? "Filter.match-all.all-selected" : "Filter.match-all.any-selected"))
        }
        attrString.font = .system(.body, weight: .thin)
        attrString.foregroundColor = .secondary
        return attrString
    }
}



// You may ask why this View looks so weird and has so many warnings.
// It becuase it's generated by ChatGPT and it suprisingly works.
// (P.S. It's super weird that I wanted to add a comment every time I see this.)
// --@ThreeManager785
struct FlowLayout<Data: RandomAccessCollection, Content: View>: View
where Data.Element: Hashable {
    let items: Data
    let verticalSpacing: CGFloat
    let horizontalSpacing: CGFloat
    let content: (Data.Element) -> Content
    
    @State private var totalHeight = CGFloat.zero
    
    var body: some View {
        GeometryReader { geo in
            self.generateContent(in: geo)
        }
        .frame(height: totalHeight)
    }
    
    private func generateContent(in geo: GeometryProxy) -> some View {
        var width = CGFloat.zero
        var height = CGFloat.zero
        
        return ZStack(alignment: .topLeading) {
            ForEach(Array(items), id: \.self) { item in
                content(item)
                    .padding(.vertical, verticalSpacing)
                    .padding(.horizontal, horizontalSpacing)
                    .alignmentGuide(.leading) { d in
                        if (abs(width - d.width) > geo.size.width) {
                            width = 0
                            height -= d.height
                        }
                        let result = width
                        if item == items.last {
                            width = 0 // reset
                        } else {
                            width -= d.width
                        }
                        return result
                    }
                    .alignmentGuide(.top) { _ in
                        let result = height
                        if item == items.last {
                            height = 0 // reset
                        }
                        return result
                    }
            }
        }
        .background(
            GeometryReader { geo -> Color in
                DispatchQueue.main.async {
                    self.totalHeight = geo.size.height
                }
                return Color.clear
            }
        )
        //        .offset(x: -horizontalSpacing)wo x
    }
}

struct SorterPickerView: View {
    @Binding var sorter: SekaiSorter
    var allOptions: [SekaiSorter.Keyword] = SekaiSorter.Keyword.allCases
    var sortingItemsHaveEndingDate = false
    @State var isMenuPresented = false // iOS only
    var body: some View {
        Group {
            #if !os(macOS)
            Menu(content: {
                Picker(selection: Binding.init(get: {
                    sorter.keyword
                }, set: {
                    if $0 == sorter.keyword {
                        sorter.direction.reverse()
                    } else {
                        sorter.keyword = $0
                    }
                }), content: {
                    ForEach(DoriFrontend.Sorter.Keyword.allCases, id: \.self) { item in
                        // Super weird fix. Thanks to https://jeffverkoeyen.com/blog/2024/08/16/SwiftUI-Menu-subtitle-shenanigans/ for inspiration.
                        if allOptions.contains(item) {
                            Button(action: {}, label: {
                                Text(item.localizedString(hasEndingDate: sortingItemsHaveEndingDate))
                                    .tag(item)
                                if sorter.keyword == item {
                                    Text(sorter.localizedDirectionName())
                                }
                            })
                            .wrapIf(sorter.keyword == item) {
                                $0
                                    .accessibilityLabel(String("\(sorter.keyword.localizedString(hasEndingDate: sortingItemsHaveEndingDate)), \(sorter.localizedDirectionName())"))
//                                    .accessibilityLabel(String("\(sorter.localizedString(hasEndingDate: sortingItemsHaveEndingDate))"))
                                    .accessibilityHint("Accessibility.sorter.reverse-direction")
                            }
//                            .accessibilityValue(Text(sorter.localizedDirectionName()), isEnabled: sorter.keyword == item)
//                            .accessibilityHint("Accessibility.sorter.reverse-direction")
                        }
                    }
                }, label: {
                    EmptyView()
                })
                .pickerStyle(.inline)
                .labelsHidden()
            }, label: {
                Label("Sort", systemImage: "arrow.up.arrow.down")
            })
            .buttonBorderShape(.circle)
            #else
            Menu(content: {
                Section {
                    Picker(selection: Binding.init(get: {
                        sorter.keyword
                    }, set: {
                        sorter.keyword = $0
                    }), content: {
                        ForEach(SekaiSorter.Keyword.allCases, id: \.self) { item in
                            Group {
                                if allOptions.contains(item) {
                                    Text(item.localizedString(hasEndingDate: sortingItemsHaveEndingDate))
                                }
                            }
                            .tag(item)
                        }
                    }, label: {
                        EmptyView()
                    })
                    .pickerStyle(.inline)
                }
                
                Section {
                    Picker(selection: Binding.init(get: {
                        sorter.direction
                    }, set: {
                        sorter.direction = $0
                    }), content: {
                        Text(sorter.localizedDirectionName(direction: .descending))
                            .tag(SekaiSorter.Direction.descending)
                        Text(sorter.localizedDirectionName(direction: .ascending))
                            .tag(SekaiSorter.Direction.ascending)
                    }, label: {
                        EmptyView()
                    })
                    .pickerStyle(.inline)
                }
            }, label: {
                Label("Sort", systemImage: "arrow.up.arrow.down")
            })
//            .menuIndicator(.hidden)
            #endif
        }
        .accessibilityValue(String("\(sorter.keyword.localizedString(hasEndingDate: sortingItemsHaveEndingDate)), \(sorter.localizedDirectionName())"))
    }
}

extension View {
    @ViewBuilder
    func filterToggleAccessibility(selectionStatus: Bool?) -> some View {
        self
        .accessibilityValue({
            if selectionStatus == true {
                return "Filter.selections-toggle.value.all-selected"
            } else if selectionStatus == false {
                return "Filter.selections-toggle.value.none-selected"
            } else {
                return "Filter.selections-toggle.value.partially-selected"
            }
        }())
    #if !os(visionOS)
        .accessibilityHint({
            if selectionStatus == false {
                return "Filter.selections-toggle.hint.select-all"
            } else {
                return "Filter.selections-toggle.hint.deselect-all"
            }
        }())
    #endif
    }
}
