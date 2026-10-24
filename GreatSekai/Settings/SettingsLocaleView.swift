//===---*- Greatdori! -*---------------------------------------------------===//
//
// SettingsLocaleView.swift
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
import SwiftUI

struct SettingsLocaleView: View {
    var body: some View {
//#if os(iOS)
//        Section(content: {
//            Group {
//                SettingsPrimaryAndSecondaryLocalePicker()
//                SettingsBirthdayTimeZonePicker()
//            }
//        }, header: {
//            Text("Settings.locale")
//        })
//#else
        Group {
            Section {
                SettingsPrimaryAndSecondaryLocalePicker()
            }
            Section {
                SettingsBirthdayTimeZonePicker()
            }
        }
        .navigationTitle("Settings.locale")
//#endif
    }
    
    
    struct SettingsPrimaryAndSecondaryLocalePicker: View {
        @State var primaryLocale = SekaiLocale.primaryLocale
        @State var secondaryLocale = SekaiLocale.secondaryLocale
        var body: some View {
            Group {
                LocalePicker($primaryLocale) {
                    Text("Settings.locale.primary-locale")
                }
                .onChange(of: primaryLocale, { oldValue, newValue in
                    if newValue == SekaiLocale.secondaryLocale {
                        SekaiLocale.secondaryLocale = oldValue
                        secondaryLocale = SekaiLocale.secondaryLocale
                    }
                    SekaiLocale.primaryLocale = newValue
                    UserDefaults(suiteName: "group.memz233.Greatdori.Widgets")?.set(newValue.rawValue, forKey: "PreferredLocale")
//                    SekaiCache.invalidateAll()
                })
                
                LocalePicker($secondaryLocale) {
                    Text("Settings.locale.secondary-locale")
                }
                .onChange(of: secondaryLocale, { oldValue, newValue in
                    if newValue == SekaiLocale.primaryLocale {
                        SekaiLocale.primaryLocale = oldValue
                        primaryLocale = SekaiLocale.primaryLocale
                    }
                    SekaiLocale.secondaryLocale = newValue
                    UserDefaults(suiteName: "group.memz233.Greatdori.Widgets")?.set(newValue.rawValue, forKey: "SecondaryLocale")
//                    SekaiCache.invalidateAll()
                })
            }
        }
    }
    
    struct SettingsBirthdayTimeZonePicker: View {
        var body: some View {
            Picker(selection: .init(
                get: { BirthdayManager.BirthdayTimeZone.current },
                set: { BirthdayManager.BirthdayTimeZone.current = $0 }
            ), content: {
                    ForEach(BirthdayManager.BirthdayTimeZone.allCases, id: \.self) { item in
                    VStack(alignment: .leading) {
                        Text(item.selectionLabel)
                        Group {
                            if item == .adaptive {
                                Text(verbatim: "\(TimeZone.current.localizedName(for: .generic, locale: Locale.current) ?? "") (\(timeZoneUTCOffsetDescription(for: TimeZone.current)))")
                            } else {
                                Text(item.offsetLabel)
                            }
                        }
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    .tag(item)
                }
            }, label: {
                VStack(alignment: .leading) {
                    Text("Settings.birthday-time-zone")
                    Text("Settings.birthday-time-zone.description")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }, optionalCurrentValueLabel: {
                Text(BirthdayManager.BirthdayTimeZone.current.abbreviation)
            })
            .wrapIf(true, in: { content in
#if os(iOS)
                content
                    .pickerStyle(.navigationLink)
#else
                content
#endif
            })
        }
    }
}
