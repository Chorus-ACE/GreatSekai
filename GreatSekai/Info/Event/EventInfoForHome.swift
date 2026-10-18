//===---*- Greatdori! -*---------------------------------------------------===//
//
// EventInfoForHome.swift
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


// MARK: EventInfoForHome
struct EventInfoForHome: View {
    private var eventImageURL: URL
    private var eventImageAltURL: URL
    private var title: LocalizableData<String>
    private var startAt: LocalizableData<Date>
    private var endAt: LocalizableData<Date>
    private var locale: SekaiLocale?
    private var showsCountdown: Bool
    
    init(_ event: Event, inLocale locale: SekaiLocale?, showsCountdown: Bool = false) {
        self.eventImageURL = event.bannerImageURL(in: locale ?? SekaiLocale.primaryLocale)
        self.eventImageAltURL = event.bannerImageAltURL(in: locale ?? SekaiLocale.primaryLocale)
        self.title = event.title
        self.startAt = event.startDate
        self.endAt = event.aggregateDate
        self.locale = locale
        self.showsCountdown = showsCountdown
    }
    
    var body: some View {
        VStack {
            HStack {
                Spacer(minLength: 0)
                FallbackableWebImage(throughURLs: [eventImageURL, eventImageAltURL]) { image in
                    image
                        .resizable()
                        .antialiased(true)
                        .aspectRatio(bannerRatio, contentMode: .fit)
                } placeholder: {
                    RoundedRectangle(cornerRadius: 10)
                        .fill(getPlaceholderColor())
                        .aspectRatio(bannerRatio, contentMode: .fit)
                }
                .interpolation(.high)
                .frame(maxWidth: 500)
                .cornerRadius(10)
                Spacer(minLength: 0)
            }
            
            if showsCountdown { // Accually Title & Countdown
                Text(locale != nil ? (title.localizedData?[locale!] ?? title.localizedData?.jp ?? "") : (title.majorValue ?? ""))
                    .bold()
                    .font(.title3)
                    .multilineTextAlignment(.center)
                Group {
                    if let startDate = locale != nil ? startAt.localizedData?[locale!] : startAt.majorValue,
                       let endDate = locale != nil ? endAt.localizedData?[locale!] : endAt.majorValue {
                        if startDate > .now {
                            Text("Events.countdown.start-at.\(Text(startDate, style: .relative)).\(locale != nil ? "(\(locale!.rawValue.uppercased()))" : "")")
                        } else if endDate > .now {
                            Text("Events.countdown.end-at.\(Text(endDate, style: .relative)).\(locale != nil ? "(\(locale!.rawValue.uppercased()))" : "")")
                        } else {
                            Text("Events.countdown.ended.\(locale != nil ? "(\(locale!.rawValue.uppercased()))" : "")")
                        }
                    } else {
                        Text("Events.countdown.unstarted.\(locale != nil ? "(\(locale!.rawValue.uppercased()))" : "")")
                    }
                }
                #if !os(visionOS)
                .multilineTextAlignment(.center)
                #endif
            }
        }
    }
}
