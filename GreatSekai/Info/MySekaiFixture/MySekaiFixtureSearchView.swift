import SekaiKit
import SwiftUI

struct MySekaiFixtureSearchView: View {
    var body: some View {
        SearchViewBase(forType: MySekaiFixture.self, initialLayout: SummaryLayout.horizontal, layoutOptions: verticalAndHorizontalLayouts) { layout, _, content, _ in
            if layout == .horizontal {
                LazyVStack { content }.frame(maxWidth: infoContentMaxWidth)
            } else {
                LazyVGrid(columns: [GridItem(.adaptive(minimum: 225, maximum: 225))]) { content }
            }
        } eachContent: { layout, element in
            MySekaiFixtureInfo(element, layout: layout)
        } destination: { element, list in
            MySekaiFixtureDetailView(id: element.id, items: list)
        }
        .resultCountDescription { "Fixture.count.\($0)" }
    }
}
