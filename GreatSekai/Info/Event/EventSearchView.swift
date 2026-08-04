//
//  EventSearchView.swift
//  GreatSekai
//
//  Created by ThreeManager785 on 2026/7/25.
//

import SekaiKit
import SwiftUI
import SDWebImageSwiftUI

struct EventSearchView: View {
    let gridLayoutItemWidth: CGFloat = 225
    
    @Environment(\.horizontalSizeClass) var sizeClass
    @Namespace var eventNamespace
    var body: some View {
        SearchViewBase(forType: Event.self, initialLayout: true, layoutOptions: bannerLayouts) { showDetails, elements, content, eachContent in
            ViewThatFits {
                LazyVStack(spacing: showDetails ? nil : 15) {
                    let events = elements.chunked(into: 2)
                    ForEach(events, id: \.self) { eventGroup in
                        HStack {
                            Spacer(minLength: 0)
                            ForEach(eventGroup) { event in
                                eachContent(event)
                                if eventGroup.count == 1 && events[0].count != 1 {
                                    Rectangle()
                                        .frame(maxWidth: bannerWidth*bannerRatio, maxHeight: bannerHeight)
                                        .opacity(0)
                                }
                            }
                            Spacer(minLength: 0)
                        }
                    }
                }
                .frame(width: bannerWidth * 2 + bannerSpacing)
                LazyVStack(spacing: showDetails ? nil : bannerSpacing) {
                    content
                }
                .frame(maxWidth: bannerWidth)
            }
            .animation(.spring(duration: 0.3, bounce: 0.1, blendDuration: 0), value: showDetails)
        } eachContent: { showDetails, element in
            EventInfo(element, showDetails: showDetails)
                .wrapIf(sizeClass == .regular, in: {
                    $0.frame(maxWidth: bannerWidth)
                })
        } destination: { element, list in
//            EventDetailView(id: element.id, allEvents: list)
        }
        .resultCountDescription { count in
            "Event.count.\(count)"
        }
    }
}
