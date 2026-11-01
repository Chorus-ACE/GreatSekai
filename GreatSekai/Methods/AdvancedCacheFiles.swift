import Foundation

enum AdvancedCacheCategory: CaseIterable, Identifiable, Sendable {
    case information, images, story, models
    var id: Self { self }
    var title: LocalizedStringResource {
        switch self {
        case .information: "Settings.advanced.storage.cache.management.information"
        case .images: "Settings.advanced.storage.cache.management.images"
        case .story: "Settings.advanced.storage.cache.management.story"
        case .models: "Settings.advanced.storage.cache.management.models"
        }
    }
    var caption: LocalizedStringResource {
        switch self {
        case .information: "Settings.advanced.storage.cache.management.information.description"
        case .images: "Settings.advanced.storage.cache.management.images.description"
        case .story: "Settings.advanced.storage.cache.management.story.description"
        case .models: "Settings.advanced.storage.cache.management.models.description"
        }
    }
    var symbol: String {
        switch self {
        case .information: "info.circle"
        case .images: "photo"
        case .story: "book"
        case .models: "cube.transparent"
        }
    }
}

/// Disk paths shared by cache measurement and deletion.
enum AdvancedCacheFiles {
    nonisolated static func remove(_ categories: Set<AdvancedCacheCategory>, informationRoot: URL? = nil, modelRoot: URL? = nil) throws {
        for category in categories where category != .images {
            for url in try roots(for: category, informationRoot: informationRoot, modelRoot: modelRoot) {
                do { try FileManager.default.removeItem(at: url) }
                catch CocoaError.fileNoSuchFile { continue }
            }
        }
    }

    nonisolated static func roots(for category: AdvancedCacheCategory, informationRoot: URL? = nil, modelRoot: URL? = nil) throws -> [URL] {
        let manager = FileManager.default
        // SekaiCache currently writes its plist files directly under Library/Caches.
        let root = informationRoot ?? URL(filePath: NSHomeDirectory()).appending(path: "Library/Caches")
        let modelRoot = modelRoot ?? manager.urls(for: .cachesDirectory, in: .userDomainMask)[0].appending(path: "SekaiKit")
        switch category {
        case .images: return [] // Use SDImageCache's API rather than assuming its directory.
        case .models:
            return ["Models3D", "DeviceModels", "DeviceSourceMetadata", "LocalViewer"].map { modelRoot.appending(path: $0) }
                .filter { manager.fileExists(atPath: $0.path) }
        case .information, .story:
            guard manager.fileExists(atPath: root.path) else { return [] }
            return try manager.contentsOfDirectory(at: root, includingPropertiesForKeys: nil).filter { url in
                let name = url.lastPathComponent
                let isTranscript = name.hasPrefix("SekaiKit_") && name.hasSuffix(".cache") && name.contains("_Transcript-")
                if category == .story { return isTranscript }
                return name == "SekaiCacheInfo.plist" || (name.hasPrefix("SekaiKit_") && name.hasSuffix(".cache") && !isTranscript)
            }
        }
    }

    nonisolated static func size(of url: URL) throws -> Int64 {
        let keys: Set<URLResourceKey> = [.isRegularFileKey, .isSymbolicLinkKey, .fileSizeKey]
        let values = try url.resourceValues(forKeys: keys)
        guard values.isSymbolicLink != true else { return 0 }
        if values.isRegularFile == true { return Int64(values.fileSize ?? 0) }
        var failure: Error?
        guard let files = FileManager.default.enumerator(at: url, includingPropertiesForKeys: Array(keys),
                                                         errorHandler: { _, error in failure = error; return false }) else { return 0 }
        var total: Int64 = 0
        for case let file as URL in files {
            let values = try file.resourceValues(forKeys: keys)
            if values.isRegularFile == true, values.isSymbolicLink != true { total += Int64(values.fileSize ?? 0) }
        }
        if let failure { throw failure }
        return total
    }
}
