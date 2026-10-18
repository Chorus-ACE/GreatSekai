//===---*- Greatdori! -*---------------------------------------------------===//
//
// ExternalLinks.swift
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

struct ExternalLinksSection: View {
    var links: [ExternalLink?] = []
    @Environment(\.defaultMinListRowHeight) var defaultMinListRowHeight
    @Environment(\.openURL) private var openURL
    var body: some View {
        if !links.isEmpty {
            Section {
                VStack {
                    CustomGroupBox {
                        VStack {
                            ForEach(links.compactMap({ $0 })) { item in
                                Button(action: {
                                    openURL(item.url)
                                }, label: {
                                    HStack {
                                        Group {
                                            if let icon = item.icon {
                                                Image(icon)
                                                    .resizable()
                                                    .scaledToFit()
                                            } else {
                                                Image(systemName: "globe")
                                            }
                                        }
                                        .mask({
                                            RoundedRectangle(cornerRadius: 5)
                                        })
                                        .frame(maxWidth: 20, maxHeight: 20)
                                        
                                        Text(item.name)
                                        Spacer()
                                        Image(systemName: "arrow.up.forward.app")
                                            .foregroundStyle(.secondary)
                                    }
                                    .contentShape(Rectangle())
                                })
                                .buttonStyle(.plain)
                                .id(item.id)
                                .frame(minHeight: platform == .macOS ? defaultMinListRowHeight : nil)
                            }
                            .insert {
                                Divider()
                            }
                        }
                    }
                    
                    HStack {
                        Text("External-links.disclaimer")
                            .foregroundStyle(.secondary)
                            .font(.caption)
                            .multilineTextAlignment(.leading)
                        Spacer()
                    }
                    .padding(.vertical, 1)
                }
                .frame(maxWidth: infoContentMaxWidth)
            } header: {
                HStack {
                    Text("External-links")
                        .font(.title2)
                        .bold()
                    Spacer()
                }
                .frame(maxWidth: 615)
                .detailSectionHeader()
            }
        }
    }
}

struct ExternalLink: Hashable, Identifiable {
    let id: UUID = .init()
    let name: LocalizedStringResource
    let icon: String?
    let url: URL
    
    init(name: LocalizedStringResource, icon: String? = nil, url: URL) {
        self.name = name
        self.icon = icon
        self.url = url
    }
    
    init(_ source: DefaultSource, url: URL) {
        self.name = source.localizedName
        self.icon = source.icon
        self.url = url
    }
    
    enum DefaultSource {
        case sekaiViewer
        case sekaipedia
        case sonolus
        case cleista
        case moeSekai
        case haruki
        case pjsekaiMoe
        
        var localizedName: LocalizedStringResource {
            switch self {
            case .sekaiViewer: "External-link.sekai-viewer"
            case .sekaipedia: "External-link.sekaipedia"
            case .sonolus: "External-link.sonolus"
            case .cleista: "External-link.cleista"
            case .moeSekai: "External-link.moesekai"
            case .haruki: "External-link.haruki"
            case .pjsekaiMoe: "External-link.pjsekai-moe"
            }
        }
        
        var icon: String {
            switch self {
            case .sekaiViewer: "ExternalSekaiViewer"
            case .sekaipedia: "ExternalSekaipedia"
            case .sonolus: "ExternalSonolus"
            case .cleista: "ExternalCleista"
            case .moeSekai: "ExternalMoeSekai"
            case .haruki: "ExternalHaruki"
            case .pjsekaiMoe: "ExternalPjsekaiMoe"
            }
        }
    }
}
