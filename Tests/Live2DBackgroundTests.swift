import Astray
import Foundation
import Metal

private actor ListingFixture {
    var requests: [URL] = []
    let pages: [Data]
    init(_ pages: [String]) { self.pages = pages.map { Data($0.utf8) } }
    func fetch(_ url: URL) throws -> Data {
        requests.append(url)
        guard requests.count <= pages.count else { throw URLError(.badServerResponse) }
        return pages[requests.count - 1]
    }
}

@main @MainActor struct Live2DBackgroundTests {
    private static func listing(_ body: String, truncated: Bool = false, token: String? = nil) -> String {
        "<ListBucketResult><IsTruncated>\(truncated)</IsTruncated>\(body)\(token.map { "<NextContinuationToken>\($0)</NextContinuationToken>" } ?? "")</ListBucketResult>"
    }
    private static func key(_ path: String) -> String { "<Contents><Key>\(path)</Key></Contents>" }
    private static func complete(_ command: any MTLCommandBuffer) { command.waitUntilCompleted() }

    static func main() async throws {
        let prefix = "scenario/background/"
        let fixture = ListingFixture([
            listing(key(prefix + "room/room.webp") + key(prefix + "room/room.png") + key("elsewhere/image.png"), truncated: true, token: "next&amp;page"),
            listing(key(prefix + "special/extra.jpg") + key(prefix + "../escape.png") + key(prefix + "room/readme.json"))
        ])
        let catalog = try await Live2DBackgroundCatalog.load { try await fixture.fetch($0) }
        precondition(catalog.backgrounds.count == 2)
        precondition(catalog.backgrounds[0].path == prefix + "room/room.png", "Prefer PNG to duplicate WebP")
        precondition(catalog.backgrounds[1].name == "extra", "Keep noncanonical image names and formats")
        let requests = await fixture.requests
        precondition(requests.count == 2)
        precondition(URLComponents(url: requests[1], resolvingAgainstBaseURL: false)?.queryItems?.first { $0.name == "continuation-token" }?.value == "next&page")
        precondition(catalog.backgrounds[0].url.path == "/sekai-jp-assets/" + prefix + "room/room.png")
        for pages in [["<html>Unavailable</html>"], ["<ListBucketResult>"],
                      ["<ListBucketResult></ListBucketResult>"],
                      [listing("", truncated: true)],
                      [listing("", truncated: true, token: "same"), listing("", truncated: true, token: "same")]] {
            let invalid = ListingFixture(pages)
            do {
                _ = try await Live2DBackgroundCatalog.load { try await invalid.fetch($0) }
                preconditionFailure("Invalid or cyclic listings must fail, not return a partial catalog")
            } catch {}
        }
        let empty = ListingFixture([listing("")])
        let emptyResult = try await Live2DBackgroundCatalog.load { try await empty.fetch($0) }
        precondition(emptyResult.backgrounds.isEmpty)
        let cancelled = Task {
            try await Live2DBackgroundCatalog.load { _ in throw CancellationError() }
        }
        do { _ = try await cancelled.value; preconditionFailure("Cancellation must propagate") } catch is CancellationError {}

        // Validate the actual published directory pages, including the final page.
        let paths = Array(CommandLine.arguments.dropFirst(2))
        if !paths.isEmpty {
            let actual = ListingFixture(try paths.map { try String(contentsOfFile: $0, encoding: .utf8) })
            let result = try await Live2DBackgroundCatalog.load { try await actual.fetch($0) }
            precondition(result.backgrounds.count > 1000)
            print("Published catalog: \(result.backgrounds.count) backgrounds in \(paths.count) pages")
        }
        let player = StoryPlayer()
        try await player.load(.init())
        let renderer = try StoryRenderer(player: player)
        let png = try Data(contentsOf: URL(filePath: CommandLine.arguments[1]))
        let descriptor = MTLTextureDescriptor.texture2DDescriptor(pixelFormat: .bgra8Unorm, width: 320, height: 320, mipmapped: false)
        descriptor.usage = [.renderTarget, .shaderRead]; descriptor.storageMode = .shared
        let target = renderer.device.makeTexture(descriptor: descriptor)!
        func pixels() throws -> [UInt8] {
            let command = try renderer.render(to: target)
            complete(command)
            precondition(command.status == .completed)
            var bytes = [UInt8](repeating: 0, count: 320 * 320 * 4)
            target.getBytes(&bytes, bytesPerRow: 1280, from: .init(origin: .init(x: 0, y: 0, z: 0), size: .init(width: 320, height: 320, depth: 1)), mipmapLevel: 0)
            return bytes
        }
        let blank = try pixels()
        let revision = player.assetRevision
        try renderer.setBackdrop(png)
        let background = try pixels()
        precondition(zip(blank, background).filter { $0 != $1 }.count > blank.count / 2)
        precondition(player.assetRevision == revision, "Backdrop must not reload model resources")
        do { try renderer.setBackdrop(Data("invalid".utf8)); preconditionFailure("Reject malformed images") } catch {}
        let afterFailure = try pixels()
        precondition(afterFailure == background, "A failed replacement must preserve the previous backdrop")
        try renderer.setBackdrop(nil)
        let cleared = try pixels()
        precondition(cleared == blank, "None clears the backdrop")
        print("PASS: pagination, formats, duplicates, malformed/cyclic listings, cancellation, real Metal backdrop rendering and clearing")
    }
}
