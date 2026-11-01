import SekaiKit
import SwiftUI

struct CardRelatedSections: View {
    let events: [Event]?
    let gachas: [Gacha]?
    let eventsFailed: Bool
    let gachasFailed: Bool
    let retryEvents: () -> Void
    let retryGachas: () -> Void

    var body: some View {
        Group {
            if eventsFailed {
                DetailRetrySection(title: Event.pluralName) { retryEvents() }
            } else {
                DetailsEventsSection(events: events)
            }
            if gachasFailed {
                DetailRetrySection(title: Gacha.pluralName) { retryGachas() }
            } else if let gachas, !gachas.isEmpty {
                DetailsGachasSection(gachas: gachas)
            }
        }
    }
}
