//===---*- Greatdori! -*---------------------------------------------------===//
//
// SettingsStoryView.swift
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
private import Builtin

struct SettingsStoryView: View {
    var hasSelectedLayout: Binding<Bool>?
    @StateObject private var fontManager = FontManager.shared
    @AppStorage("ISVLayoutDemoPlayFlag") private var layoutDemoPlayFlag = 0
    @State private var selectedLayout: Bool? // isFullScreen
    @State private var storyViewerFonts: [SekaiLocale: String] = [:]
    @State private var storyViewerUpdateIndex: Int = 0
    var body: some View {
        Group {
            Section(content: {
                ForEach(SekaiLocale.allCases, id: \.self) { locale in
                    NavigationLink(destination: {
                        SettingsFontsPicker(externalUpdateIndex: $storyViewerUpdateIndex, locale: locale)
                    }, label: {
                        HStack {
                            Text("\(locale.rawValue.uppercased())")
                            Spacer()
                            Text(fontManager.getUserFriendlyFontDisplayName(forFontName: storyViewerFonts[locale] ?? "") ?? (storyViewerFonts[locale] ?? ""))
                                .foregroundStyle(.secondary)
                        }
                    })
                }
                if platform == .iOS {
                    SettingsDocumentButton(document: "FontSuggestions") {
                        Text("Settings.fonts.learn-more")
                    }
                }
            }, header: {
                Text("Settings.story-viewer.fonts")
            }, footer: {
                if platform == .macOS {
                    SettingsDocumentButton(document: "FontSuggestions") {
                        Text("Settings.fonts.learn-more")
                    }
                }
            })
            .onChange(of: storyViewerUpdateIndex, initial: true) {
                for locale in SekaiLocale.allCases {
                    storyViewerFonts.updateValue(UserDefaults.standard.string(forKey: "StoryViewerFont\(locale.rawValue.uppercased())") ?? storyViewerDefaultFont[locale] ?? ".AppleSystemUIFont", forKey: locale)
                }
            }
        }
        .navigationTitle("Settings.story-viewer")
    }
}
