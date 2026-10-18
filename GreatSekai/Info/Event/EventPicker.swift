// Adapted from Greatdori's EventSelector (Apache-2.0, Greatdori project authors).
// https://greatdori.com/LICENSE.txt
import SekaiKit
import SwiftUI

struct EventPicker: View {
    @Binding var selection: Event?
    var locale: SekaiLocale = .primaryLocale
    /// Restrict choices to events with stories in the selected region.
    var availableEventIDs: Set<Int>?
    var emptySelectionTitle: LocalizedStringKey?

    var body: some View {
        ItemSelectorView(
            selection: $selection,
            initialLayout: true,
            initialSorter: SekaiSorter(keyword: .releaseDate(in: locale), direction: .descending),
            layoutOptions: bannerLayouts,
            sorterKeywords: [.releaseDate(in: locale), .id],
            emptySelectionTitle: emptySelectionTitle,
            updateList: {
                // Load the actual regional record, including its asset bundle name.
                await Event.allInLocale(locale)?.compactMap { event in
                    guard availableEventIDs?.contains(event.id) ?? true else { return nil }
                    return Event.combineLocalizations([locale: event], defaultLocale: locale)
                }
            },
            resultCountDescription: { "Event.count.\($0)" }
        ) { showDetails, events, content, eachContent in
            ViewThatFits {
                LazyVStack(spacing: showDetails ? nil : bannerSpacing) {
                    let rows = events.chunked(into: 2)
                    ForEach(rows, id: \.self) { row in
                        HStack {
                            ForEach(row) { event in
                                eachContent(event)
                            }
                            if row.count == 1 && events.count > 1 {
                                Color.clear.frame(maxWidth: bannerWidth)
                            }
                        }
                    }
                }
                .frame(width: bannerWidth * 2 + bannerSpacing)
                LazyVStack(spacing: showDetails ? nil : bannerSpacing) {
                    content
                }
                .frame(maxWidth: bannerWidth)
            }
            .animation(.spring(duration: 0.3, bounce: 0.1), value: showDetails)
        } eachContent: { showDetails, event in
            EventInfo(event, showDetails: showDetails, locale: locale)
        }
        .id(locale)
    }
}
