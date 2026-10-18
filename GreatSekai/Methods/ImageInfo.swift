import Foundation

struct ImageInfo: Hashable, Sendable {
    var url: URL
    var data: Data?
    var description: LocalizedStringResource?
    
    func hash(into hasher: inout Hasher) {
        hasher.combine(url)
        hasher.combine(data)
        if let description {
            hasher.combine(String(localized: description))
        }
    }
    
    func resolvedData() async -> Data? { try? await loadData() }

    func loadData() async throws -> Data {
        if let data, !data.isEmpty { return data }
        if url.isFileURL { return try Data(contentsOf: url) }
        let (data, response) = try await URLSession.shared.data(from: url)
        guard let response = response as? HTTPURLResponse,
              (200..<300).contains(response.statusCode), !data.isEmpty else {
            throw URLError(.badServerResponse)
        }
        return data
    }

    /// Preserve existing downloads, including other cards that share a generic asset filename.
    func saveToDownloads() async throws -> URL {
        let folder = try FileManager.default.url(for: .downloadsDirectory, in: .userDomainMask,
                                                appropriateFor: nil, create: true)
        return try await save(to: folder)
    }

    func save(to folder: URL) async throws -> URL {
        let data = try await loadData()
        let filename = url.lastPathComponent.isEmpty ? "image" : url.lastPathComponent
        let original = folder.appendingPathComponent(filename)
        var destination = original
        var suffix = 1
        while true {
            do {
                try data.write(to: destination, options: .withoutOverwriting)
                return destination
            } catch CocoaError.fileWriteFileExists {
                let stem = original.deletingPathExtension().lastPathComponent
                let ext = original.pathExtension
                destination = folder.appendingPathComponent("\(stem) (\(suffix))" + (ext.isEmpty ? "" : ".\(ext)"))
                suffix += 1
            }
        }
    }
}

