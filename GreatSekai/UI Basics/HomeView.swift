//===---*- Greatdori! -*---------------------------------------------------===//
//
// HomeView.swift
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

import SwiftUI
import SekaiKit
import Combine
import SDWebImageSwiftUI

let loadingAnimationDuration = 0.1

private let _homeNavigationSubject = PassthroughSubject<NavigationPage?, Never>()
@_transparent
private func homeNavigate(to page: NavigationPage?) {
    _homeNavigationSubject.send(page)
}
enum NavigationPage: Hashable {
    case characterDetail(Int)
    case eventDetail(Int)
}

struct HomeView: View {
    @Environment(\.horizontalSizeClass) var sizeClass
    @Environment(\.colorScheme) var colorScheme
    @State var useCompactVariant = true
    @State var showSettingsSheet = false
    @State var currentNavigationPage: NavigationPage?
    var body: some View {
        NavigationStack {
            ScrollView {
                ZStack {
                    VStack {
                        HomeBannersView()
                        HStack {
                            VStack {
                                CustomGroupBox { HomeBirthdayView() }
                                HomeEventsView(locale: homeEventSecondaryLocale())
                                Spacer()
                            }
                            VStack {
                                HomeEventsView(locale: .jp)
                                Spacer()
                            }
                        }
                    }
                    .padding(.horizontal)
                    .opacity(useCompactVariant ? 0 : 1)
                    .frame(width: useCompactVariant ? 0 : nil, height: useCompactVariant ? 0 : nil)
                    VStack {
                        HomeBannersView()
                        CustomGroupBox { HomeBirthdayView() }
                        HomeEventsView(locale: .jp)
                        HomeEventsView(locale: homeEventSecondaryLocale())
                    }
                    .padding(.horizontal)
                    .opacity(!useCompactVariant ? 0 : 1)
                    .frame(width: !useCompactVariant ? 0 : nil, height: !useCompactVariant ? 0 : nil)
                }
                .padding(.vertical, useCompactVariant ? 0 : nil)
            }
            .withSystemBackground()
            .navigationTitle("App.home")
            .navigationDestination(item: $currentNavigationPage) { page in
                switch page {
                case .characterDetail(let id):
                    CharacterDetailView(id: id)
                case .eventDetail(let id):
                    EventDetailView(id: id)
                }
            }
            .toolbar {
                if platform != .macOS && (sizeClass == .compact || platform == .visionOS) {
                    ToolbarItem {
                        Button(action: {
                            showSettingsSheet = true
                        }, label: {
                            Image(systemName: "gear")
                        })
                        .buttonBorderShape(.circle)
                    }
                }
            }
            .sheet(isPresented: $showSettingsSheet, content: {
                SettingsView(usedAsSheet: true)
            })
        }
        .onFrameChange { geometry in
            if useCompactVariant && geometry.size.width > 675 {
                useCompactVariant = false
            } else if !useCompactVariant && geometry.size.width <= 675 {
                useCompactVariant = true
            }
        }
        .onReceive(_homeNavigationSubject) { page in
            currentNavigationPage = page
        }
    }
    
    func homeEventSecondaryLocale() -> SekaiLocale {
        if SekaiLocale.primaryLocale != .jp {
            return SekaiLocale.primaryLocale
        } else {
            return SekaiLocale.secondaryLocale
        }
    }
}

struct HomeBirthdayView: View {
    @AppStorage("BirthdayTimeZone") private var birthdayTimeZone = "JST"
    @AppStorage("showBirthdayDate") var showBirthdayDate = showBirthdayDateDefaultValue
    @State private var birthdays: [HomeBirthdayCharacter]?
    @State private var systemBirthdays: [HomeBirthdayCharacter]?
    var formatter = DateFormatter()
    var todaysDateFormatter = DateFormatter()
    var calendar = Calendar(identifier: .gregorian)
    var todaysDateCalendar = Calendar(identifier: .gregorian)
    init() {
        calendar.timeZone = TimeZone(identifier: "Asia/Tokyo")!
        formatter.locale = Locale.current
        formatter.setLocalizedDateFormatFromTemplate("MMMd")
        formatter.timeZone = .init(identifier: "Asia/Tokyo")
        
        todaysDateCalendar.timeZone = getBirthdayTimeZone()
        todaysDateFormatter.locale = Locale.current
        todaysDateFormatter.setLocalizedDateFormatFromTemplate("MMMd")
        todaysDateFormatter.timeZone = getBirthdayTimeZone()
    }
    var body: some View {
        HStack {
            VStack(alignment: .leading) {
                HStack {
                    if birthdays?.first.map({ todaysTheirBirthday($0.birthday) }) == true {
                        Text("Home.birthday.happy-birthday")
                            .font(.title2)
                            .bold()
                    } else if birthdays != nil {
                        Text("Home.birthday")
                            .font(.title2)
                            .bold()
                    } else {
                        Text("Home.birthday")
                            .foregroundStyle(getPlaceholderColor())
                            .font(.title2)
                            .bold()
                            .redacted(reason: .placeholder)
                    }
                    Spacer()
                    Group {
                        if showBirthdayDate == 3 {
                            Text(todaysDateFormatter.string(from: .now))
                        } else if showBirthdayDate == 2 {
                            // If today's someone's birthday
                            if (birthdays?.first.map { todaysTheirBirthday($0.birthday) } == true) {
                                Text(todaysDateFormatter.string(from: .now))
                            }
                        } else if showBirthdayDate == 1 {
                            if systemBirthdays != nil && birthdays != nil && (systemBirthdays != birthdays) {
                                Text(todaysDateFormatter.string(from: .now))
                            }
                        }
                    }
                    .foregroundStyle(.secondary)
                    .fontWeight(.light)
                    .font(.title3)
                    .wrapIf(birthdays == nil) { content in
                        content
                            .redacted(reason: .placeholder)
                    }
                }
                if let birthdays {
                    HStack {
                        ForEach(0..<birthdays.count, id: \.self) { i in
                            if (i != birthdays.count - 1)
                                && (birthdays[i].birthday == birthdays[i + 1].birthday)
                                && (!todaysTheirBirthday(birthdays[i].birthday)) {
                                // If she is not the last person & the person next have the same birthday & today's not her birthday.
                                // (Cond. 3 is because labels should be expanded to show their full name during their birthday.)
                                Menu(content: {
                                    Button(action: {
                                        homeNavigate(to: .characterDetail(birthdays[i].id))
                                    }, label: {
                                        HStack {
                                            #if os(iOS)
                                            WebImage(url: birthdays[i].iconImageURL)
                                                .resizable()
                                                .clipShape(Circle())
                                                .frame(width: 30, height: 30)
                                            #endif
                                            Text(birthdays[i].characterName.majorValue ?? "")
                                        }
                                    })
                                    Button(action: {
                                        homeNavigate(to: .characterDetail(birthdays[i + 1].id))
                                    }, label: {
                                        HStack {
                                            #if os(iOS)
                                            WebImage(url: birthdays[i+1].iconImageURL)
                                                .resizable()
                                                .clipShape(Circle())
                                                .frame(width: imageButtonSize, height: imageButtonSize)
                                            #endif
                                            Text(birthdays[i+1].characterName.majorValue ?? "")
                                        }
                                    })
                                }, label: {
                                    WebImage(url: birthdays[i].iconImageURL)
                                        .resizable()
                                        .clipShape(Circle())
                                        .frame(width: imageButtonSize, height: imageButtonSize)
                                        .zIndex(2)
                                    WebImage(url: birthdays[i+1].iconImageURL)
                                        .resizable()
                                        .clipShape(Circle())
                                        .frame(width: imageButtonSize, height: imageButtonSize)
                                        .padding(.leading, -15)
                                        .zIndex(1)
                                    Text(formatter.string(from: birthdays[i].birthday))
                                })
                                Rectangle()
                                    .opacity(0)
                                    .frame(width: 2, height: 2)
                            } else if (i != 0)
                                        && (birthdays[i].birthday == birthdays[i - 1].birthday)
                                        && (!todaysTheirBirthday(birthdays[i].birthday)) {
                                // If she is not the first person & the person in front have the same birthday & today's not her birthday.
                                EmptyView()
                            } else {
                                Button(action: {
                                    homeNavigate(to: .characterDetail(birthdays[i].id))
                                }, label: {
                                    WebImage(url: birthdays[i].iconImageURL)
                                        .resizable()
                                        .clipShape(Circle())
                                        .frame(width: imageButtonSize, height: imageButtonSize)
                                    if todaysTheirBirthday(birthdays[i].birthday) {
                                        Text(birthdays[i].characterName.majorValue ?? "")
                                    } else {
                                        Text(formatter.string(from: birthdays[i].birthday))
                                    }
                                })
                                .buttonStyle(.plain)
                                .accessibilityLabel(birthdays[i].characterName.majorValue ?? "")
                                .accessibilityValue(formatter.string(from: birthdays[i].birthday))
                                Rectangle()
                                    .opacity(0)
                                    .frame(width: 2, height: 2)
                            }
                        }
                    }
                } else {
                    HStack {
                        Text(verbatim: "Lorem ipsum")
                            .foregroundStyle(getPlaceholderColor())
                            .redacted(reason: .placeholder)
                        Rectangle()
                            .opacity(0)
                            .frame(width: 2, height: 2)
                        Text(verbatim: "dolor sit")
                            .foregroundStyle(getPlaceholderColor())
                            .redacted(reason: .placeholder)
                        Spacer()
                    }
                }
            }
            Spacer()
        }
        .animation(.easeInOut(duration: loadingAnimationDuration), value: birthdays?.count)
        .buttonStyle(.plain)
        .foregroundStyle(.primary)
        .task(id: birthdayTimeZone) {
            todaysDateFormatter.timeZone = getBirthdayTimeZone()
            await updateBirthday()
        }
        .onReceive(Timer.publish(every: 60, on: .main, in: .common).autoconnect()) { _ in
            Task { await updateBirthday() }
        }
        .onActivationChange { isActive in
            if isActive {
                Task { await updateBirthday() }
            }
        }
    }
    func todaysTheirBirthday(_ birthday: Date) -> Bool {
        let today = Date.now
        var calendar = Calendar(identifier: .gregorian)
        var jstCalendar = calendar
        calendar.timeZone = getBirthdayTimeZone()
        jstCalendar.timeZone = TimeZone(identifier: "Asia/Tokyo")!
        
        let birthdaysMonth: Int = jstCalendar.component(.month, from: birthday)
        let birthdaysDay: Int = jstCalendar.component(.day, from: birthday)
        
        let todaysMonth: Int = calendar.component(.month, from: today)
        let todaysDay: Int = calendar.component(.day, from: today)
        
        return (birthdaysMonth == todaysMonth && birthdaysDay == todaysDay)
    }
    func birthdayTimeIsInSameDayWithSystemTime() -> Bool {
        var birthdayCalendar = Calendar(identifier: .gregorian)
        birthdayCalendar.timeZone = getBirthdayTimeZone()
        let systemCalendar = Calendar(identifier: .gregorian)
        
        let birthdayMonth: Int = birthdayCalendar.component(.month, from: Date.now)
        let birthdayDay: Int = birthdayCalendar.component(.day, from: Date.now)
        
        let systemMonth: Int = systemCalendar.component(.month, from: Date.now)
        let systemDay: Int = systemCalendar.component(.day, from: Date.now)
        
        return (birthdayMonth == systemMonth && birthdayDay == systemDay)
    }
    
    func updateBirthday() async {
        let timeZone = getBirthdayTimeZone()
        let characters = await Character.recentBirthdayCharacters(timeZone: timeZone)
        guard !Task.isCancelled else { return }
        birthdays = characters?.compactMap(HomeBirthdayCharacter.init)
        if timeZone != TimeZone.autoupdatingCurrent {
            let systemCharacters = await Character.recentBirthdayCharacters(timeZone: getBirthdayTimeZone(from: .adaptive))
            guard !Task.isCancelled else { return }
            systemBirthdays = systemCharacters?.compactMap(HomeBirthdayCharacter.init)
        } else {
            systemBirthdays = nil
        }
    }
}

private struct HomeBirthdayCharacter: Identifiable, Equatable {
    let id: Int
    let birthday: Date
    let characterName: LocalizableData<String>
    let iconImageURL: URL?

    init?(_ character: Character) {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = TimeZone(identifier: "Asia/Tokyo")!
        guard var components = character.birthday else { return nil }
        components.year = 2000
        guard let birthday = calendar.date(from: components) else { return nil }
        id = character.id
        self.birthday = birthday
        characterName = character.fullName
        iconImageURL = character.iconImageURL
    }
}

struct HomeEventsView: View {
    @State var latestEvent: Event?
    @State var imageOpacity: Double = 0
    @State var placeholderOpacity: Double = 1
    var locale: SekaiLocale = .jp
    var dateFormatter = DateFormatter()
    
    init(locale: SekaiLocale = .jp) {
        self.locale = locale
        dateFormatter.dateStyle = .medium
        dateFormatter.timeStyle = .short
    }
    
    var body: some View {
        Button(action: {
            if let latestEvent {
                homeNavigate(to: .eventDetail(latestEvent.id))
            }
        }, label: {
            CustomGroupBox {
                ZStack {
                    Group {
                        if let latestEvent {
                            EventInfoForHome(latestEvent, inLocale: locale, showsCountdown: true)
                        }
                    }
                    .opacity(imageOpacity)
                    .zIndex(2)
                    Group {
                        if latestEvent == nil {
                            VStack {
                                RoundedRectangle(cornerRadius: 10)
                                    .fill(Color.gray.opacity(0.15))
                                    .aspectRatio(3.0, contentMode: .fit)
                                Text(verbatim: "Lorem ipsum dolor sit amet consectetur")
                                    .bold()
                                    .font(.title3)
                                    .foregroundStyle(getPlaceholderColor())
                                    .redacted(reason: .placeholder)
                                Text(verbatim: "Lorem ipsum dolor")
                                    .foregroundStyle(getPlaceholderColor())
                                    .redacted(reason: .placeholder)
                            }
                        }
                    }
                    .opacity(placeholderOpacity)
                    .zIndex(1)
                }
            }
        })
        .buttonStyle(.plain)
        .buttonBorderShape(.roundedRectangle(radius: 20))
        .foregroundStyle(.primary)
        .task {
            updateEvent()
        }
        .onActivationChange { isActive in
            if isActive {
                updateEvent()
            }
        }
        .accessibilityElement(children: .contain)
    }
    
    func updateEvent() {
        withSekaiCache(id: "Home_LatestEvents", trait: .realTime) {
            await Event.all()
        }.onUpdate { events, _ in
            latestEvent = events.flatMap { Event.featuredEvent(in: $0, locale: locale) }
            withAnimation(.easeInOut(duration: loadingAnimationDuration)) {
                imageOpacity = 1
            }
        }
    }
}

struct HomeBannersView: View {
    @AppStorage("AdvancedSettingsHaveReset") var advSettingsHaveReset = false
    var body: some View {
        Banner(isPresented: $advSettingsHaveReset, dismissable: true) {
            Image(systemName: "exclamationmark.circle")
                .font(.title3)
                .bold()
            VStack(alignment: .leading) {
                Text("Home.banner.crash.title")
                    .bold()
                Text("Home.banner.crash.subtitle")
                    .font(platform == .macOS ? .body : .footnote)
            }
        }
    }
}

extension PassthroughSubject: @retroactive @unchecked Sendable where Output: Sendable, Failure: Sendable {}
