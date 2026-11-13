import AVFoundation

/// One native timeline keeps seeking, buffering, rate changes and audio in sync.
@MainActor enum SongMovieAsset {
    static func make(videoURL: URL, audioURL: URL?, startOffset: Double = 0) async throws -> AVAsset {
        let movie = AVURLAsset(url: videoURL)
        let videoTracks = try await movie.loadTracks(withMediaType: .video)
        guard let video = videoTracks.first else { throw URLError(.cannotDecodeContentData) }
        let embeddedAudio = try await movie.loadTracks(withMediaType: .audio).first
        let sound: AVAsset
        let audio: AVAssetTrack
        if let embeddedAudio {
            sound = movie
            audio = embeddedAudio
        } else {
            guard let audioURL else { throw URLError(.resourceUnavailable) }
            sound = AVURLAsset(url: audioURL)
            guard let soundtrack = try await sound.loadTracks(withMediaType: .audio).first else {
                throw URLError(.cannotDecodeContentData)
            }
            audio = soundtrack
        }
        let duration = try await movie.load(.duration)
        let audioDuration = try await sound.load(.duration)
        guard duration.isNumeric, audioDuration.isNumeric, CMTimeCompare(duration, .zero) > 0 else {
            throw URLError(.cannotDecodeContentData)
        }
        let offset = CMTime(seconds: startOffset.isFinite ? max(0, startOffset) : 0, preferredTimescale: 600)
        guard CMTimeCompare(duration, offset) > 0, CMTimeCompare(audioDuration, offset) > 0 else {
            throw URLError(.cannotDecodeContentData)
        }
        try Task.checkCancellation()
        let composition = AVMutableComposition()
        guard let videoTrack = composition.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid),
              let audioTrack = composition.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid) else {
            throw URLError(.cannotCreateFile)
        }
        try videoTrack.insertTimeRange(.init(start: offset, duration: duration - offset), of: video, at: .zero)
        videoTrack.preferredTransform = try await video.load(.preferredTransform)
        try audioTrack.insertTimeRange(.init(start: offset, duration: CMTimeMinimum(duration, audioDuration) - offset), of: audio, at: .zero)
        return composition
    }
}
