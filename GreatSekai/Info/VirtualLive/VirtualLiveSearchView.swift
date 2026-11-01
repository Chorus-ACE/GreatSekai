import SekaiKit
import SwiftUI

struct VirtualLiveSearchView: View {
    @Environment(\.horizontalSizeClass) private var sizeClass

    var body: some View {
        SearchViewBase(forType: VirtualLive.self, initialLayout: true, layoutOptions: bannerLayouts) { showDetails, elements, content, eachContent in
            ViewThatFits(in: .horizontal) {
                LazyVStack(spacing: showDetails ? nil : bannerSpacing) {
                    let rows = elements.chunked(into: 2)
                    ForEach(rows.indices, id: \.self) { index in
                        HStack(spacing: bannerSpacing) {
                            ForEach(rows[index]) { item in eachContent(item).frame(width: bannerWidth) }
                            if rows[index].count == 1 { Color.clear.frame(width: bannerWidth, height: 1) }
                        }
                    }
                }
                .frame(width: bannerWidth * 2 + bannerSpacing)
                LazyVStack(spacing: showDetails ? nil : bannerSpacing) { content }
            }
            .animation(.spring(duration: 0.3, bounce: 0.1), value: showDetails)
        } eachContent: { showDetails, information in
            VirtualLiveInfo(information: information, showDetails: showDetails)
                .wrapIf(sizeClass == .regular) { $0.frame(maxWidth: bannerWidth) }
        } destination: { information, list in
            VirtualLiveDetailView(id: information.id, allVirtualLives: list)
        }
        .resultCountDescription { "VirtualLive.count.\($0)" }
    }
}

#Preview { VirtualLiveSearchView() }
