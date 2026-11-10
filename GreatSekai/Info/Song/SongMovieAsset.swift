import AVFoundation

/// One native timeline keeps seeking, buffering, rate changes and audio in sync.
@MainActor enum SongMovieAsset {
    static func make(videoURL: URL, audioURL: URL?) async throws -> AVAsset {
        let movie = AVURLAsset(url: videoURL)
        let videoTracks = try await movie.loadTracks(withMediaType: .video)
        guard let video = videoTracks.first else { throw URLError(.cannotDecodeContentData) }
        if try await !movie.loadTracks(withMediaType: .audio).isEmpty { return movie }
        guard let audioURL else { throw URLError(.resourceUnavailable) }
        let sound = AVURLAsset(url: audioURL)
        guard let audio = try await sound.loadTracks(withMediaType: .audio).first else {
            throw URLError(.cannotDecodeContentData)
        }
        let duration = try await movie.load(.duration)
        let audioDuration = try await sound.load(.duration)
        guard duration.isNumeric, audioDuration.isNumeric, CMTimeCompare(duration, .zero) > 0 else {
            throw URLError(.cannotDecodeContentData)
        }
        try Task.checkCancellation()
        let composition = AVMutableComposition()
        guard let videoTrack = composition.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid),
              let audioTrack = composition.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid) else {
            throw URLError(.cannotCreateFile)
        }
        try videoTrack.insertTimeRange(.init(start: .zero, duration: duration), of: video, at: .zero)
        videoTrack.preferredTransform = try await video.load(.preferredTransform)
        try audioTrack.insertTimeRange(.init(start: .zero, duration: CMTimeMinimum(duration, audioDuration)), of: audio, at: .zero)
        return composition
    }
}
