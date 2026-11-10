//===---*- Greatdori! -*---------------------------------------------------===//
//
// SettingsAdvanced.swift
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

import SDWebImageSwiftUI
import SekaiKit
import SwiftUI
import Astray

#if os(iOS)
import UIKit
#endif

struct SettingsAdvancedView: View {
    @State var isInLowPowerMode = ProcessInfo.processInfo.isLowPowerModeEnabled
    @State var thermalState = ProcessInfo.processInfo.thermalState
    var body: some View {
        Group {
//#if os(iOS)
//            List {
//                settingsAdvancedSections()
//            }
//#else
            Group {
                settingsAdvancedSections()
            }
//#endif
        }
        .navigationTitle("Settings.advanced")
        .onReceive(ProcessInfo.processInfo.publisher(for: \.isLowPowerModeEnabled)) { lowPowerMode in
            isInLowPowerMode = lowPowerMode
        }
        .onReceive(ProcessInfo.processInfo.publisher(for: \.thermalState)) { state in
            thermalState = state
        }
    }
    
    @ViewBuilder
    func settingsAdvancedSections() -> some View {
        SettingsAdvancedBannersSection(isInLowPowerMode: $isInLowPowerMode, thermalState: $thermalState)
        SettingsAdvancedImageSection(disablePowerConsumingFeatures: isInLowPowerMode || thermalState == .critical)
        SettingsAdvancedUISection()
        SettingsAdvancedStorageSection()
    }
}

struct SettingsAdvancedBannersSection: View {
    @Binding var isInLowPowerMode: Bool
    @Binding var thermalState: ProcessInfo.ThermalState
    var body: some View {
        if isInLowPowerMode || thermalState == .critical {
            Section(content: {
                if isInLowPowerMode {
                    Label("Settings.advanced.banners.low-power", systemImage: "battery.25percent")
                        .bold()
                        .foregroundStyle(.yellow)
                }
                if thermalState == .critical {
                    Label("Settings.advanced.banners.power-saving.high-temperature", systemImage: "thermometer.sun")
                        .bold()
                        .foregroundStyle(.yellow)
                }
            }, footer: {
                Text("Settings.advanced.banners.disabling-features.description")
            })
        } else {
            EmptyView()
        }
    }
}

struct SettingsAdvancedImageSection: View {
    @AppStorage("Adv_UseImageUpscaler") var useImageUpscaler = false
    @AppStorage("Adv_PreferSystemVisionModel") var preferSystemVisionModel = false
    var disablePowerConsumingFeatures: Bool
    var body: some View {
        Section {
            Toggle(isOn: $preferSystemVisionModel) {
                VStack(alignment: .leading) {
                    Text("Settings.advanced.image.subject-prefer-system-model")
                    Text("Settings.advanced.image.subject-prefer-system-model.description")
                        .foregroundStyle(.secondary)
                        .font(.footnote)
                }
            }
            if #available(iOS 26.0, macOS 26.0, *) {
                    Toggle(isOn: $useImageUpscaler) {
                        VStack(alignment: .leading) {
                            Text("Settings.advanced.image.use-super-resolution")
                            Text("Settings.advanced.image.use-super-resolution.description")
                                .font(.footnote)
                        }.foregroundStyle(.secondary)
                    }
                    .disabled(true)
                    .disabled(disablePowerConsumingFeatures)
            }
        } header: {
            Text("Settings.advanced.image")
        }
        
    }
}

struct SettingsAdvancedUISection: View {
    @AppStorage("showAdvancedDetails") var showAdvancedDetails = false
    var body: some View {
        Section {
            Toggle(isOn: $showAdvancedDetails, label: {
                VStack(alignment: .leading) {
                    Text("Settings.advanced.ui.advanced-character-details")
                    Text("Settings.advanced.ui.advanced-character-details.description")
                        .foregroundStyle(.secondary)
                        .font(.footnote)
                }
            })
        } header: {
            Text("Settings.advanced.ui")
        }
    }
}

struct SettingsAdvancedStorageSection: View {
    @State private var cacheSize = ""
    @State private var cacheManagementSheetIsDisplaying = false

    var body: some View {
        Section {
            HStack {
                VStack(alignment: .leading) {
                    Text("Settings.advanced.storage.clear-cache")
                    Text("Settings.advanced.storage.clear-cache.description")
                        .foregroundStyle(.secondary)
                        .font(.footnote)
                }
                Spacer()
                Text(cacheSize).foregroundStyle(.secondary)
                Button("Settings.advanced.storage.clear-cache.clear") {
                    cacheManagementSheetIsDisplaying = true
                }
            }
            .sheet(isPresented: $cacheManagementSheetIsDisplaying) {
                SettingsAdvancedCacheManagementView()
            }
            .task(id: cacheManagementSheetIsDisplaying) {
                guard !cacheManagementSheetIsDisplaying,
                      let snapshot = try? await AdvancedCacheStorage.snapshot() else { return }
                cacheSize = snapshot.formattedSize(for: Set(AdvancedCacheCategory.allCases))
            }
        } header: {
            Text("Settings.advanced.storage")
        }
    }
}

func resetAllAdvancedSettings(showBannerAtHome: Bool = true) {
    if let _data = try? Data(contentsOf: URL(filePath: NSHomeDirectory() + "/Library/Preferences/com.chorus-ace.GreatSekai.plist")),
       let serialization = try? PropertyListSerialization.propertyList(from: _data, format: nil) as? [String: Any] {
        for key in serialization.keys where key.hasPrefix("Adv_") {
            UserDefaults.standard.removeObject(forKey: key)
        }
        if showBannerAtHome {
            UserDefaults.standard.set(true, forKey: "AdvancedSettingsHaveReset")
        }
    }
}


struct SettingsAdvancedCacheManagementView: View {
    @State private var snapshot: AdvancedCacheStorage.Snapshot?
    @State private var selected: Set<AdvancedCacheCategory> = []
    @State private var isBusy = false
    @State private var errorMessage: String?
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    Text("Settings.advanced.storage.cache.management.introduction")
                }
                Section {
                    ForEach(AdvancedCacheCategory.allCases) { category in
                        CacheListItem(
                            title: category.title,
                            caption: category.caption,
                            symbol: category.symbol,
                            size: snapshot?.formattedSize(for: [category]) ?? "—",
                            isSelected: Binding(
                                get: { selected.contains(category) },
                                set: { if $0 { selected.insert(category) } else { selected.remove(category) } }
                            )
                        )
                    }
                }
                Section {
                    Button(role: .destructive) {
                        Task { await clearSelection() }
                    } label: {
                        HStack {
                            if isBusy { ProgressView().controlSize(.small) }
                            if selected.isEmpty {
                                Text("Settings.advanced.storage.cache.management.delete.no-selection")
                            } else {
                                Text("Settings.advanced.storage.cache.management.delete.\(snapshot?.formattedSize(for: selected) ?? "—")")
                            }
                        }
                    }
                    .disabled(selected.isEmpty || snapshot == nil || isBusy)
                    if let errorMessage {
                        Text(errorMessage).font(.footnote).foregroundStyle(.red)
                        Button("General.retry") { Task { await refresh() } }
                    }
                }
            }
            .formStyle(.grouped)
            .disabled(isBusy)
            .navigationTitle("Settings.advanced.storage.cache.management")
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button { dismiss() } label: {
                        Label("General.done", systemImage: "checkmark")
                            .wrapIf(true) { content in
                                #if os(macOS)
                                content.labelStyle(.titleOnly)
                                #else
                                content.labelStyle(.iconOnly)
                                #endif
                            }
                    }
                    .disabled(isBusy)
                }
            }
            .interactiveDismissDisabled(isBusy)
            .task { await refresh() }
            #if os(macOS)
            .frame(minWidth: 540, minHeight: 460)
            #endif
        }
    }

    private func refresh() async {
        isBusy = true
        defer { isBusy = false }
        do {
            snapshot = try await AdvancedCacheStorage.snapshot()
            errorMessage = nil
        } catch {
            errorMessage = String(localized: "Settings.advanced.storage.cache.management.error") + " " + error.localizedDescription
        }
    }

    private func clearSelection() async {
        isBusy = true
        defer { isBusy = false }
        do {
            try await AdvancedCacheStorage.clear(selected)
            selected.removeAll()
            errorMessage = nil
        } catch {
            errorMessage = String(localized: "Settings.advanced.storage.cache.management.error") + " " + error.localizedDescription
        }
        // Refresh even after a partial failure so the remaining size stays accurate.
        do { snapshot = try await AdvancedCacheStorage.snapshot() }
        catch { errorMessage = error.localizedDescription }
    }

    struct CacheListItem: View {
        var title: LocalizedStringResource
        var caption: LocalizedStringResource
        var symbol: String
        var size: String
        @Binding var isSelected: Bool
        var body: some View {
            HStack {
                Image(systemName: symbol)
                    .foregroundStyle(.accent)
                    .font(.title3)
                    .frame(width: 28)
                    .accessibilityHidden(true)
                VStack(alignment: .leading) {
                    Text(title)
                    Text(caption)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                .multilineTextAlignment(.leading)
                Spacer()
                Text(size).font(.callout).foregroundStyle(.secondary)
                Toggle(isOn: $isSelected) { Text(title) }.labelsHidden()
            }
        }
    }
}

@MainActor
private enum AdvancedCacheStorage {
    struct Snapshot: Sendable {
        var bytes: [AdvancedCacheCategory: Int64]

        func formattedSize(for categories: Set<AdvancedCacheCategory>) -> String {
            let total = categories.reduce(Int64(0)) { $0 + (bytes[$1] ?? 0) }
            let formatted = ByteCountFormatter.string(fromByteCount: total, countStyle: .file)
            return formatted
        }
    }

    static func snapshot() async throws -> Snapshot {
        let imageBytes = await withCheckedContinuation { continuation in
            SDImageCache.shared.calculateSize { _, bytes in
                continuation.resume(returning: Int64(bytes))
            }
        }
        var bytes = try await Task.detached(priority: .utility) {
            var result: [AdvancedCacheCategory: Int64] = [:]
            for category in AdvancedCacheCategory.allCases where category != .images {
                result[category] = try AdvancedCacheFiles.roots(for: category).reduce(0) { try $0 + AdvancedCacheFiles.size(of: $1) }
            }
            return result
        }.value
        bytes[.images] = imageBytes
        bytes[.information, default: 0] += Int64(URLCache.shared.currentDiskUsage)
        bytes[.story, default: 0] += try await StoryAssetCache.shared.diskUsage()
        return Snapshot(bytes: bytes)
    }

    static func clear(_ categories: Set<AdvancedCacheCategory>) async throws {
        if categories.contains(.images) {
            SDImageCache.shared.clearMemory()
            await withCheckedContinuation { continuation in
                SDImageCache.shared.clearDisk { continuation.resume() }
            }
        }
        if categories.contains(.story) {
            try await StoryAssetCache.shared.clear()
        }
        if categories.contains(.information) {
            URLCache.shared.removeAllCachedResponses()
            CharacterDetailCardStore.shared.invalidate()
        }
        try await Task.detached(priority: .utility) {
            try AdvancedCacheFiles.remove(categories)
        }.value
    }

}

#Preview("Cache Management") {
    SettingsAdvancedCacheManagementView()
}
