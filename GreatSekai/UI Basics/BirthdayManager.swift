//
//  BirthdayManager.swift
//  GreatSekai
//
//  Created by ThreeManager785 on 2026/10/24.
//

import Foundation
import SekaiKit

class BirthdayManager {
//    static var currentBirthdayDate: Date {
//        var birthdayCalendar = Calendar(identifier: .gregorian)
//        birthdayCalendar.timeZone = BirthdayTimeZone.current.timeZone
//        
//        let birthdayMonth: Int = birthdayCalendar.component(.month, from: Date.now)
//        let birthdayDay: Int = birthdayCalendar.component(.day, from: Date.now)
//    }
    
    private var dateFormatter: DateFormatter {
        let df = DateFormatter()
        df.setLocalizedDateFormatFromTemplate("MMMd")
        df.timeZone = BirthdayTimeZone.current.timeZone
        return df
    }
    
    func birthdayDateLabel(for date: Date) -> String {
        return dateFormatter.string(from: date)
    }
    
    static func isSameDay(date1: Date, timeZone1: BirthdayTimeZone, date2: Date, timeZone2: BirthdayTimeZone) -> Bool {
        var calendar1 = Calendar(identifier: .gregorian)
        var calendar2 = Calendar(identifier: .gregorian)
        
        calendar1.timeZone = timeZone1.timeZone
        calendar2.timeZone = timeZone2.timeZone
        
        let month1: Int = calendar1.component(.month, from: date1)
        let day1: Int = calendar1.component(.day, from: date1)
        
        let month2: Int = calendar2.component(.month, from: date2)
        let day2: Int = calendar2.component(.day, from: date2)
        
        return month1 == month2 && day1 == day2
    }
    
    
    static func birthdayTimeIsInSameDayWithSystemTime() -> Bool {
        Self.isSameDay(
            date1: Date.now, timeZone1: .adaptive,
            date2: Date.now, timeZone2: .current)
    }
    
    static func isTodayTheirBirthday(_ birthday: Date) -> Bool {
        Self.isSameDay(
            date1: birthday, timeZone1: .current,
            date2: .now, timeZone2: .current)
    }
    
    
    enum BirthdayTimeZone: String, CaseIterable {
        case adaptive
        case JST
        case UTC
        case CST
        case PT
        
        var localizedName: LocalizedStringResource {
            switch self {
            case .adaptive: "Settings.birthday-time-zone.name.adaptive"
            case .JST: "Settings.birthday-time-zone.name.JST"
            case .UTC: "Settings.birthday-time-zone.name.UTC"
            case .CST: "Settings.birthday-time-zone.name.CST"
            case .PT: "Settings.birthday-time-zone.name.PT"
            }
        }
        
        var selectionLabel: LocalizedStringResource {
            switch self {
            case .adaptive: "Settings.birthday-time-zone.selection.adaptive"
            case .JST: "Settings.birthday-time-zone.selection.JST"
            case .UTC: "Settings.birthday-time-zone.selection.UTC"
            case .CST: "Settings.birthday-time-zone.selection.CST"
            case .PT: Self.PT.timeZone.isDaylightSavingTime() ? "Settings.birthday-time-zone.selection.PT.PDT" : "Settings.birthday-time-zone.selection.PT.PST"
            }
        }
        
        var abbreviation: LocalizedStringResource {
            switch self {
            case .adaptive: "Settings.birthday-time-zone.selection.adaptive.abbr"
            case .JST: "Settings.birthday-time-zone.selection.JST.abbr"
            case .UTC: "Settings.birthday-time-zone.selection.UTC.abbr"
            case .CST: "Settings.birthday-time-zone.selection.CST.abbr"
            case .PT: "Settings.birthday-time-zone.selection.PT.abbr"
            }
        }
        
        var timeZone: TimeZone {
            switch self {
            case .adaptive: TimeZone.autoupdatingCurrent
            case .JST: TimeZone(identifier: "Asia/Tokyo")!
            case .UTC: TimeZone.gmt
            case .CST: TimeZone(identifier: "Asia/Shanghai")!
            case .PT: TimeZone(identifier: "America/Los_Angeles")!
            }
        }
        
        static var current: Self {
            get {
                let rawValue = UserDefaults.standard.string(forKey: "BirthdayTimeZone") ?? "JST"
                return .init(rawValue: rawValue) ?? .JST
            }
            set {
                UserDefaults.standard.setValue(newValue.rawValue, forKey: "BirthdayTimeZone")
            }
        }
        
        var offsetLabel: String {
            let now = Date()
            let systemTimeZone = TimeZone.current
            let targetTimeZone = self.timeZone
            
            let systemOffset = systemTimeZone.secondsFromGMT(for: now)
            let targetOffset = targetTimeZone.secondsFromGMT(for: now)
            
            let hoursDiff = (targetOffset - systemOffset) / 3600
            
            if hoursDiff == 0 {
                return String(localized: "Time-zone.same-time")
            }
            
            let systemDate = Calendar.current.dateComponents(in: systemTimeZone, from: now).day
            let targetDate = Calendar.current.dateComponents(in: targetTimeZone, from: now).day
            
            var dayDescription = String(localized: "Time-zone.today")
            if let sysDay = systemDate, let tgtDay = targetDate {
                if tgtDay == sysDay - 1 {
                    dayDescription = String(localized: "Time-zone.yesterday")
                } else if tgtDay == sysDay + 1 {
                    dayDescription = String(localized: "Time-zone.tomorrow")
                }
            }
            
            return String(localized: "Time-zone.\(dayDescription).\(hoursDiff >= 0 ? "+" : "-").\(abs(hoursDiff))")
        }
    }
    
    struct HomeBirthdayCharacter: Identifiable, Equatable {
        let id: Int
        let isVirtualSinger: Bool
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
            isVirtualSinger = character.unit == .virtualSinger
            self.birthday = birthday
            characterName = character.fullName
            iconImageURL = character.iconImageURL
        }
        
        var isBirthdayToday: Bool {
            BirthdayManager.isTodayTheirBirthday(birthday)
        }
    }

}
