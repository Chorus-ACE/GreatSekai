import Foundation

@main
struct AdvancedCacheTests {
    static func main() throws {
        func check(_ condition: Bool) { precondition(condition) }
        let manager = FileManager.default
        let temporary = manager.temporaryDirectory.appending(path: UUID().uuidString)
        let information = temporary.appending(path: "Caches")
        let models = temporary.appending(path: "SekaiKit")
        try manager.createDirectory(at: information, withIntermediateDirectories: true)
        defer { try? manager.removeItem(at: temporary) }

        let entries = ["SekaiKit_Array<Card>_AllCards.cache": 11,
                       "SekaiKit_StoryTranscript_Transcript-v3-42.cache": 17,
                       "SekaiCacheInfo.plist": 7,
                       "unrelated.cache": 23,
                       "SekaiKit_unrelated.txt": 29]
        for (name, bytes) in entries {
            try Data(repeating: 1, count: bytes).write(to: information.appending(path: name))
        }
        for directory in ["Models3D", "DeviceModels", "DeviceSourceMetadata", "LocalViewer", "Unrelated"] {
            let path = models.appending(path: directory + "/nested")
            try manager.createDirectory(at: path, withIntermediateDirectories: true)
            try Data(repeating: 2, count: 31).write(to: path.appending(path: "asset"))
        }
        let ai = information.appending(path: "AIOutputs")
        try manager.createDirectory(at: ai, withIntermediateDirectories: true)
        try Data(repeating: 3, count: 41).write(to: ai.appending(path: "translation.json"))
        try Data(repeating: 4, count: 43).write(to: ai.appending(path: "summary.json"))
        // A linked external file must not be counted or removed as model data.
        try manager.createSymbolicLink(at: models.appending(path: "LocalViewer/external"),
                                       withDestinationURL: information.appending(path: "unrelated.cache"))

        func roots(_ category: AdvancedCacheCategory) throws -> [URL] {
            try AdvancedCacheFiles.roots(for: category, informationRoot: information, modelRoot: models)
        }
        let infoBytes = try roots(.information).reduce(Int64(0)) { try $0 + AdvancedCacheFiles.size(of: $1) }
        let storyBytes = try roots(.story).reduce(Int64(0)) { try $0 + AdvancedCacheFiles.size(of: $1) }
        let modelBytes = try roots(.models).reduce(Int64(0)) { try $0 + AdvancedCacheFiles.size(of: $1) }
        precondition(infoBytes == 18 && storyBytes == 17 && modelBytes == 124)
        check(try roots(.images).isEmpty)
        let aiBytes = try roots(.aiOutputs).reduce(Int64(0)) { try $0 + AdvancedCacheFiles.size(of: $1) }
        check(aiBytes == 84)
        try AdvancedCacheFiles.remove([], informationRoot: information, modelRoot: models)
        check(try roots(.information).count == 2)
        try AdvancedCacheFiles.remove([.story], informationRoot: information, modelRoot: models)
        check(try roots(.story).isEmpty)
        check(try roots(.aiOutputs).count == 1)
        try AdvancedCacheFiles.remove([.aiOutputs], informationRoot: information, modelRoot: models)
        check(try roots(.aiOutputs).isEmpty)
        check(try roots(.information).count == 2)
        try AdvancedCacheFiles.remove([.information, .models], informationRoot: information, modelRoot: models)
        check(try roots(.information).isEmpty)
        check(try roots(.models).isEmpty)
        for name in ["unrelated.cache", "SekaiKit_unrelated.txt"] {
            precondition(manager.fileExists(atPath: information.appending(path: name).path))
        }
        precondition(manager.fileExists(atPath: models.appending(path: "Unrelated/nested/asset").path))
        // Repeating a clear is harmless and an absent directory has no cached data.
        try AdvancedCacheFiles.remove([.information, .story, .models], informationRoot: information, modelRoot: models)
        let absent = try AdvancedCacheFiles.roots(for: .information, informationRoot: temporary.appending(path: "absent"))
        precondition(absent.isEmpty)
        print("Cache category sizes, selective deletion, symlinks, unrelated files, empty selection, and repeated clearing passed.")
    }
}
