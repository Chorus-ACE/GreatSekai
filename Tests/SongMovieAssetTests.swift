import AVFoundation

@main @MainActor struct SongMovieAssetTests {
    static func main() async throws {
        let arguments = CommandLine.arguments
        guard arguments.count == 4 else { fatalError("Pass video URL, audio URL and output path") }
        let asset = try await SongMovieAsset.make(videoURL: URL(string: arguments[1])!, audioURL: URL(string: arguments[2])!)
        let video = try await asset.loadTracks(withMediaType: .video)
        let audio = try await asset.loadTracks(withMediaType: .audio)
        precondition(video.count == 1 && audio.count == 1)
        let duration = try await asset.load(.duration)
        precondition(duration.seconds > 0)
        guard let session = AVAssetExportSession(asset: asset, presetName: AVAssetExportPresetHighestQuality) else { fatalError("Cannot export") }
        session.timeRange = .init(start: CMTime(seconds: 60, preferredTimescale: 600), duration: CMTime(seconds: 2, preferredTimescale: 600))
        try await session.export(to: URL(filePath: arguments[3]), as: .mp4)
        print("PASS: native composition has video and audio; seek to 60s and export 2s succeeded (source: \(duration.seconds)s).")
        do {
            _ = try await SongMovieAsset.make(videoURL: URL(string: arguments[1])!, audioURL: nil)
            fatalError("Silent extracted video must report missing audio")
        } catch { print("PASS: missing soundtrack reports failure.") }
    }
}
