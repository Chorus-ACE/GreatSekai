import SekaiKit
import SwiftUI

struct HonorSearchView: View {
    var body: some View {
        SearchViewBase(forType: Honor.self, initialLayout: SummaryLayout.horizontal, layoutOptions: verticalAndHorizontalLayouts) { layout, _, content, _ in
            if layout == .horizontal {
                LazyVStack { content }.frame(maxWidth: infoContentMaxWidth)
            } else {
                LazyVGrid(columns: [GridItem(.adaptive(minimum: 160, maximum: 300))]) { content }
            }
        } eachContent: { layout, information in
            HonorInfo(information: information, layout: layout)
        } destination: { information, list in
            HonorDetailView(id: information.id, allHonors: list)
        }
        .resultCountDescription { "Honor.count.\($0)" }
    }
}

#Preview { HonorSearchView() }
