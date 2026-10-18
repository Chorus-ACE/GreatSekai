//
//  DetailsEventsSection.swift
//  GreatSekai
//

import SekaiKit
import SwiftUI

struct DetailsEventsSection: View {
    var events: [Event]?
    var character: Character? = nil
    @State private var bannerOnly = true

    private var selectedEvents: [Event]? {
        guard let character else { return events }
        return events?.filter {
            if character.unit != .virtualSinger && bannerOnly {
                return $0.focusCharacterID == character.id
            }
            return $0.characters.contains(character.id)
        }
    }

    var body: some View {
        DetailSectionBase(elements: selectedEvents?.sorted {
            compare($0.startDate.majorValue?.corrected(), $1.startDate.majorValue?.corrected(), direction: .descending)
        }, headerAccessory: {
            if let character, character.unit != .virtualSinger {
                DetailSectionOptionPicker(selection: $bannerOnly, options: [true, false], labels: [
                    true: String(localized: "Character.events.banner-only"),
                    false: String(localized: "Character.events.participated")
                ])
            }
        }) { event in
            NavigationLink(destination: {
                EventDetailView(id: event.id, allEvents: selectedEvents)
            }, label: {
                EventInfo(event)
            })
        }
    }
}
