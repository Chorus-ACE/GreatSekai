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
        let offset = 1.25
        let trimmed = try await SongMovieAsset.make(videoURL: URL(string: arguments[1])!, audioURL: URL(string: arguments[2])!, startOffset: offset)
        let trimmedDuration = try await trimmed.load(.duration)
        precondition(abs(trimmedDuration.seconds - (duration.seconds - offset)) < 0.01)
        for type in [AVMediaType.video, .audio] {
            let track = try await trimmed.loadTracks(withMediaType: type).first as! AVCompositionTrack
            let segments = try await track.load(.segments)
            precondition(abs(segments.first!.timeMapping.source.start.seconds - offset) < 0.01,
                         "Both video and soundtrack must remove the same leading padding")
            precondition(segments.first!.timeMapping.target.start == .zero)
        }
        // Exported movies have embedded audio; exercise that branch without a separate soundtrack.
        let embedded = try await SongMovieAsset.make(videoURL: URL(filePath: arguments[3]), audioURL: nil, startOffset: 0.25)
        let embeddedDuration = try await embedded.load(.duration)
        precondition(abs(embeddedDuration.seconds - 1.75) < 0.05)
        do {
            _ = try await SongMovieAsset.make(videoURL: URL(string: arguments[1])!, audioURL: URL(string: arguments[2])!, startOffset: duration.seconds + 1)
            fatalError("Padding beyond the source duration must fail")
        } catch { print("PASS: synchronized trimming, embedded soundtrack and invalid padding.") }
        do {
            _ = try await SongMovieAsset.make(videoURL: URL(string: arguments[1])!, audioURL: nil)
            fatalError("Silent extracted video must report missing audio")
        } catch { print("PASS: missing soundtrack reports failure.") }
    }
}
