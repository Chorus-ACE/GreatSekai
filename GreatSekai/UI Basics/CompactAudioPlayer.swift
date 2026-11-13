//===---*- Greatdori! -*---------------------------------------------------===//
//
// CompactAudioPlayer.swift
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

import AVFoundation
import AVKit
import Combine
import Foundation
import MediaPlayer
import SekaiKit
import SwiftUI

#if canImport(UIKit)
import UIKit
public typealias PlatformImage = UIImage
#elseif canImport(AppKit)
import AppKit
public typealias PlatformImage = NSImage
#endif

struct CompactAudioPlayer: View {
    @State private var player: AVPlayer
    var url: URL
    let startOffset: Double
    var showPlayButtonOnly: Bool
    var mediaInfo: (title: String?, artist: String?, artwork: URL?)?
    
    init(url: URL, mediaInfo: (title: String?, artist: String?, artwork: URL?)? = nil, showPlayButtonOnly: Bool = false, startOffset: Double = 0) {
        self.url = url
        self.startOffset = startOffset.isFinite ? max(0, startOffset) : 0
        self.mediaInfo = mediaInfo
        self.showPlayButtonOnly = showPlayButtonOnly
        let player = AVPlayer(url: url)
        player.audiovisualBackgroundPlaybackPolicy = .continuesIfPossible
        self._player = .init(initialValue: player)
    }
    
    @State private var nowPlaying = CompactNowPlayingSession()
    @State private var isPlaying = false
    @State private var currentTime = 0.0
    @State private var duration = 0.0
    @State private var timeUpdateTimer: Timer?
    @State private var isTimeEditing = false
    var body: some View {
        HStack {
            Button(action: {
                if let mediaInfo {
                    nowPlaying.activate(title: mediaInfo.title, artist: mediaInfo.artist, player: player,
                                        artworkURL: mediaInfo.artwork, startOffset: startOffset)
                }
                if isPlaying {
                    player.pause()
                } else {
                    if duration > 0 && duration - currentTime < 0.1 {
                        seek(to: 0)
                    }
                    playCompactAudio(player)
                }
            }, label: {
                Image(systemName: isPlaying ? "pause.fill" : "play.fill")
            })
            .buttonStyle(.plain)
            if !showPlayButtonOnly {
                Text(verbatim: "\(formatTime(currentTime)) / \(formatTime(duration))")
                    .wrapIf(duration == 0) {
                        $0.redacted(reason: .placeholder)
                    }
                Slider(value: $currentTime, in: 0...duration) { isEditing in
                    if !isEditing {
                        seek(to: currentTime)
                    }
                    isTimeEditing = isEditing
                }
                .wrapIf(true, in: {
                    if #available(iOS 26.0, macOS 26.0, visionOS 26.0, *) {
                        $0.sliderThumbVisibility(.hidden)
                    } else {
                        $0
                    }
                })
            }
        }
        .onAppear {
            seek(to: 0)
            startTimeUpdates()
        }
        .onDisappear {
            timeUpdateTimer?.invalidate()
            timeUpdateTimer = nil
            player.pause()
            nowPlaying.deactivate()
        }
        .onChange(of: url) {
            reloadAudio()
        }
        .onChange(of: startOffset) {
            reloadAudio()
        }
        .onReceive(player.publisher(for: \.timeControlStatus).receive(on: DispatchQueue.main)) { status in
            isPlaying = status == .playing
            nowPlaying.update()
        }
        .onReceive(player.publisher(for: \.currentItem?.duration).receive(on: DispatchQueue.main)) { duration in
            if let duration, duration.seconds.isFinite {
                self.duration = max(0, duration.seconds - startOffset)
                currentTime = min(currentTime, self.duration)
                nowPlaying.update()
            }
        }
    }
    
    private func startTimeUpdates() {
        timeUpdateTimer?.invalidate()
        timeUpdateTimer = .scheduledTimer(withTimeInterval: 0.1, repeats: true) { _ in
            DispatchQueue.main.async {
                if !isTimeEditing {
                    let seconds = player.currentTime().seconds
                    if seconds.isFinite {
                        currentTime = min(max(0, seconds - startOffset), duration)
                        nowPlaying.update()
                    }
                }
            }
        }
    }

    private func reloadAudio() {
        player.pause()
        nowPlaying.deactivate()
        isPlaying = false
        isTimeEditing = false
        currentTime = 0
        duration = 0
        player.replaceCurrentItem(with: AVPlayerItem(url: url))
        seek(to: 0)
        startTimeUpdates()
    }

    private func seek(to time: Double) {
        player.seek(
            to: CMTime(seconds: time + startOffset, preferredTimescale: CMTimeScale(NSEC_PER_SEC)),
            toleranceBefore: .zero,
            toleranceAfter: .zero
        )
    }

    private func formatTime(_ time: Double) -> String {
        var minutes = String(Int(time) / 60)
        var seconds = String(Int(time.truncatingRemainder(dividingBy: 60)))
        if minutes.count == 1 {
            minutes = "0" + minutes
        }
        if seconds.count == 1 {
            seconds = "0" + seconds
        }
        return "\(minutes):\(seconds)"
    }
}

private func playCompactAudio(_ player: AVPlayer) {
    #if !os(macOS)
    let session = AVAudioSession.sharedInstance()
    try? session.setCategory(.playback, mode: .default)
    try? session.setActive(true)
    #endif
    player.play()
}

/// Owns exactly one set of remote commands for the currently selected compact player.
@MainActor
private final class CompactNowPlayingSession {
    private static weak var current: CompactNowPlayingSession?
    private weak var player: AVPlayer?
    private var startOffset = 0.0
    private var targets: [(MPRemoteCommand, Any)] = []
    private var artworkTask: URLSessionDataTask?
    private var generation = UUID()

    func activate(title: String?, artist: String?, player: AVPlayer, artworkURL: URL?, startOffset: Double) {
        if Self.current === self, self.player === player { update(); return }
        Self.current?.player?.pause()
        Self.current?.deactivate()
        Self.current = self
        self.player = player
        self.startOffset = startOffset
        var info: [String: Any] = [MPNowPlayingInfoPropertyMediaType: MPNowPlayingInfoMediaType.audio.rawValue]
        info[MPMediaItemPropertyTitle] = title
        info[MPMediaItemPropertyArtist] = artist
        MPNowPlayingInfoCenter.default().nowPlayingInfo = info
        update()

        let commands = MPRemoteCommandCenter.shared()
        register(commands.playCommand) { player in playCompactAudio(player) }
        register(commands.pauseCommand) { player in player.pause() }
        register(commands.togglePlayPauseCommand) { player in
            if player.rate != 0 { player.pause() } else { playCompactAudio(player) }
        }
        commands.skipBackwardCommand.preferredIntervals = [10]
        commands.skipForwardCommand.preferredIntervals = [10]
        registerSeek(commands.skipBackwardCommand, direction: -1)
        registerSeek(commands.skipForwardCommand, direction: 1)
        commands.changePlaybackPositionCommand.isEnabled = true
        targets.append((commands.changePlaybackPositionCommand, commands.changePlaybackPositionCommand.addTarget { [weak self] event in
            guard let event = event as? MPChangePlaybackPositionCommandEvent else { return .commandFailed }
            let position = event.positionTime
            Task { @MainActor [weak self] in
                guard let self, Self.current === self, let player = self.player else { return }
                self.seek(player, to: position + self.startOffset)
            }
            return .success
        }))

        guard let artworkURL else { return }
        let generation = self.generation
        artworkTask = URLSession.shared.dataTask(with: artworkURL) { [weak self] data, _, _ in
            guard let data, let image = PlatformImage(data: data) else { return }
            DispatchQueue.main.async {
                guard let self, Self.current === self, self.generation == generation else { return }
                var info = MPNowPlayingInfoCenter.default().nowPlayingInfo ?? [:]
                info[MPMediaItemPropertyArtwork] = MPMediaItemArtwork(boundsSize: image.size) { _ in image }
                MPNowPlayingInfoCenter.default().nowPlayingInfo = info
            }
        }
        artworkTask?.resume()
    }

    func deactivate() {
        for (command, target) in targets { command.removeTarget(target) }
        targets.removeAll()
        artworkTask?.cancel()
        artworkTask = nil
        generation = UUID()
        player = nil
        if Self.current === self {
            Self.current = nil
            MPNowPlayingInfoCenter.default().nowPlayingInfo = nil
            #if os(macOS)
            MPNowPlayingInfoCenter.default().playbackState = .stopped
            #endif
        }
    }

    func update() {
        guard Self.current === self, let player,
              var info = MPNowPlayingInfoCenter.default().nowPlayingInfo else { return }
        let elapsed = player.currentTime().seconds
        if elapsed.isFinite { info[MPNowPlayingInfoPropertyElapsedPlaybackTime] = max(0, elapsed - startOffset) }
        info[MPNowPlayingInfoPropertyPlaybackRate] = player.rate
        info[MPNowPlayingInfoPropertyDefaultPlaybackRate] = 1.0
        if let duration = player.currentItem?.duration.seconds, duration.isFinite {
            info[MPMediaItemPropertyPlaybackDuration] = max(0, duration - startOffset)
        }
        MPNowPlayingInfoCenter.default().nowPlayingInfo = info
        #if os(macOS)
        MPNowPlayingInfoCenter.default().playbackState = player.rate != 0 ? .playing : .paused
        #endif
    }

    private func register(_ command: MPRemoteCommand, action: @escaping (AVPlayer) -> Void) {
        command.isEnabled = true
        targets.append((command, command.addTarget { [weak self] _ in
            Task { @MainActor [weak self] in
                guard let self, Self.current === self, let player = self.player else { return }
                action(player)
                self.update()
            }
            return .success
        }))
    }

    private func registerSeek(_ command: MPSkipIntervalCommand, direction: Double) {
        command.isEnabled = true
        targets.append((command, command.addTarget { [weak self] event in
            guard let event = event as? MPSkipIntervalCommandEvent else { return .commandFailed }
            let interval = event.interval
            Task { @MainActor [weak self] in
                guard let self, Self.current === self, let player = self.player else { return }
                self.seek(player, to: player.currentTime().seconds + direction * interval)
            }
            return .success
        }))
    }

    private func seek(_ player: AVPlayer, to seconds: Double) {
        guard seconds.isFinite else { return }
        let duration = player.currentItem?.duration.seconds ?? .infinity
        let end = duration.isFinite ? duration : .infinity
        let target = min(max(startOffset, seconds), end)
        player.seek(to: CMTime(seconds: target, preferredTimescale: 600)) { [weak self] _ in
            Task { @MainActor in self?.update() }
        }
    }
}
