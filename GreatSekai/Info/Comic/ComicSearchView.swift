import SekaiKit
import SwiftUI

struct ComicSearchView: View {
    var body: some View {
        SearchViewBase(forType: Comic.self, initialLayout: SummaryLayout.horizontal, layoutOptions: verticalAndHorizontalLayouts) { layout, _, content, _ in
            if layout == .horizontal {
                LazyVStack { content }.frame(maxWidth: infoContentMaxWidth)
            } else {
                LazyVGrid(columns: [GridItem(.adaptive(minimum: 234, maximum: 234))]) { content }
            }
        } eachContent: { layout, element in
            ComicInfo(element, layout: layout)
        } destination: { element, list in
            ComicDetailView(id: element.id, items: list)
        }
        .resultCountDescription { "Comic.count.\($0)" }
    }
}
