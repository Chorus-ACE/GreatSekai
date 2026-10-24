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

    private var visibleLinks: [ExternalLink] {
        links.compactMap { $0 }.filter {
            $0.note != "SekaipediaDynamicFetch" || AppFlag["SekaipediaDynamicFetch"]
        }
    }

    var body: some View {
        if !visibleLinks.isEmpty {
            Section {
                VStack {
                    CustomGroupBox {
                        VStack {
                            ForEach(visibleLinks) { item in
                                ExternalLinkRow(item: item)
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
    let source: DefaultSource?
    let url: @MainActor () async -> URL
    let note: String?
    
    init(name: LocalizedStringResource, icon: String? = nil, url: URL, note: String? = nil) {
        self.name = name
        self.icon = icon
        self.source = nil
        self.url = { url }
        self.note = note
    }
    
    init(_ source: DefaultSource, url: URL, note: String? = nil) {
        self.name = source.localizedName
        self.icon = source.icon
        self.source = source
        self.url = { url }
        self.note = note
    }

    init(_ source: DefaultSource, url: @escaping @MainActor () async -> URL, note: String? = nil) {
        self.name = source.localizedName
        self.icon = source.icon
        self.source = source
        self.url = url
        self.note = note
    }
    
    static func == (lhs: Self, rhs: Self) -> Bool { lhs.id == rhs.id }
    func hash(into hasher: inout Hasher) { hasher.combine(id) }

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

private struct ExternalLinkRow: View {
    let item: ExternalLink
    @Environment(\.openURL) private var openURL
    @Environment(\.defaultMinListRowHeight) private var rowHeight
    @State private var opening = false

    var body: some View {
        Button {
            opening = true
            Task { @MainActor in
                defer { opening = false }
                let url = await item.url()
                openURL(url)
            }
        } label: {
            HStack {
                Group {
                    if let icon = item.icon {
                        Image(icon).resizable().scaledToFit()
                    } else {
                        Image(systemName: "globe")
                    }
                }
                .clipShape(RoundedRectangle(cornerRadius: 5))
                .frame(width: 20, height: 20)
                Text(item.name)
                Spacer()
                if opening {
                    Text("External-link.fetching")
                        .foregroundStyle(.secondary)
                    ProgressView()
                        .controlSize(.small)
                } else {
                    Image(systemName: "arrow.up.forward.app")
                        .foregroundStyle(.secondary)
                }
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .disabled(opening)
        .frame(minHeight: rowHeight)
    }
}
