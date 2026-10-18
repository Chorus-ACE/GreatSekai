import Foundation
@main struct ImageSaveTests {
    static func main() async throws {
        let folder = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        try FileManager.default.createDirectory(at: folder, withIntermediateDirectories: true)
        defer { try? FileManager.default.removeItem(at: folder) }
        let bytes = Data(base64Encoded: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=")!
        let info = ImageInfo(url: URL(string: "https://example.com/card.webp")!, data: bytes)
        let first = try await info.save(to: folder)
        let second = try await info.save(to: folder)
        precondition(first != second)
        let firstBytes = try Data(contentsOf: first)
        let secondBytes = try Data(contentsOf: second)
        precondition(firstBytes == bytes && secondBytes == bytes)
        let missing = folder.appendingPathComponent("missing", isDirectory: true)
        do { _ = try await info.save(to: missing); fatalError("Write error was swallowed") }
        catch { print("Write failure is surfaced:", type(of: error)) }
        print("Saved distinct files:", first.lastPathComponent, second.lastPathComponent)
        print("Existing image bytes preserved.")
    }
}
