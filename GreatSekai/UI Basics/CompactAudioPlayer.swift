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
        self._player = .init(initialValue: .init(url: url))
    }
    
    @State private var isPlaying = false
    @State private var currentTime = 0.0
    @State private var duration = 0.0
    @State private var timeUpdateTimer: Timer?
    @State private var isTimeEditing = false
    var body: some View {
        HStack {
            Button(action: {
                #if !os(macOS)
                try? AVAudioSession.sharedInstance().setActive(!isPlaying)
                #endif
                if let mediaInfo {
                    configureNowPlaying(title: mediaInfo.title, artist: mediaInfo.artist, player: player, artworkURL: mediaInfo.artwork, startOffset: startOffset)
                }
                if isPlaying {
                    player.pause()
                } else {
                    if duration > 0 && duration - currentTime < 0.1 {
                        seek(to: 0)
                    }
                    player.play()
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
        }
        .onChange(of: url) {
            reloadAudio()
        }
        .onChange(of: startOffset) {
            reloadAudio()
        }
        .onReceive(player.publisher(for: \.timeControlStatus)) { status in
            isPlaying = status == .playing
        }
        .onReceive(player.publisher(for: \.currentItem?.duration)) { duration in
            if let duration, duration.seconds.isFinite {
                self.duration = max(0, duration.seconds - startOffset)
                currentTime = min(currentTime, self.duration)
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
                    }
                }
            }
        }
    }

    private func reloadAudio() {
        player.pause()
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

func configureNowPlaying(
    title: String?,
    artist: String?,
    player: AVPlayer,
    artworkURL: URL?,
    startOffset: Double = 0,
    skipForwardSeconds: Double = 10,
    skipBackwardSeconds: Double = 10
) {

    // MARK: - 基础 Now Playing 信息
    var info: [String: Any] = [:]

    if let title = title {
        info[MPMediaItemPropertyTitle] = title
    }
    if let artist = artist {
        info[MPMediaItemPropertyArtist] = artist
    }

    // 进度条 (duration / elapsedTime)
    if let item = player.currentItem {
        let duration = item.duration
        let durationSeconds = CMTimeGetSeconds(duration)

        if durationSeconds.isFinite {
            info[MPMediaItemPropertyPlaybackDuration] = max(0, durationSeconds - startOffset)
        }

        let currentTime = CMTimeGetSeconds(player.currentTime())
        info[MPNowPlayingInfoPropertyElapsedPlaybackTime] = max(0, currentTime - startOffset)

        info[MPNowPlayingInfoPropertyPlaybackRate] =
            (player.timeControlStatus == .playing) ? 1.0 : 0.0
    }

    MPNowPlayingInfoCenter.default().nowPlayingInfo = info


    // MARK: - 注册远程控制
    let command = MPRemoteCommandCenter.shared()

    // 播放 / 暂停
    command.playCommand.addTarget { _ in
        player.play()
        updateNowPlayingProgress(player: player, startOffset: startOffset)
        return .success
    }

    command.pauseCommand.addTarget { _ in
        player.pause()
        updateNowPlayingProgress(player: player, startOffset: startOffset)
        return .success
    }

    command.togglePlayPauseCommand.addTarget { _ in
        if player.timeControlStatus == .playing {
            player.pause()
        } else {
            player.play()
        }
        updateNowPlayingProgress(player: player, startOffset: startOffset)
        return .success
    }


    // MARK: - 将上一首 / 下一首变成 快退 / 快进
    // 快退
    command.skipBackwardCommand.isEnabled = true
    command.skipBackwardCommand.preferredIntervals = [NSNumber(value: skipBackwardSeconds)]
    command.skipBackwardCommand.addTarget { event in
        guard let e = event as? MPSkipIntervalCommandEvent else { return .commandFailed }
        let new = max(CMTimeGetSeconds(player.currentTime()) - e.interval, startOffset)
        player.seek(to: CMTime(seconds: new, preferredTimescale: 600))
        updateNowPlayingProgress(player: player, startOffset: startOffset)
        return .success
    }

    // 快进
    command.skipForwardCommand.isEnabled = true
    command.skipForwardCommand.preferredIntervals = [NSNumber(value: skipForwardSeconds)]
    command.skipForwardCommand.addTarget { event in
        guard let e = event as? MPSkipIntervalCommandEvent else { return .commandFailed }
        let current = CMTimeGetSeconds(player.currentTime())
        let duration = CMTimeGetSeconds(player.currentItem?.duration ?? .zero)
        let new = min(current + e.interval, duration)
        player.seek(to: CMTime(seconds: new, preferredTimescale: 600))
        updateNowPlayingProgress(player: player, startOffset: startOffset)
        return .success
    }


    // MARK: - 支持控制中心拖动进度条
    command.changePlaybackPositionCommand.isEnabled = true
    command.changePlaybackPositionCommand.addTarget { event in
        guard let e = event as? MPChangePlaybackPositionCommandEvent else { return .commandFailed }
        let time = CMTime(seconds: e.positionTime + startOffset, preferredTimescale: 600)
        player.seek(to: time) { _ in
            updateNowPlayingProgress(player: player, startOffset: startOffset)
        }
        return .success
    }


    // MARK: - 下载封面（可选）
    guard let artworkURL else { return }

    URLSession.shared.dataTask(with: artworkURL) { data, _, _ in
        guard let data,
              let image = PlatformImage(data: data)
        else { return }

        let artwork = MPMediaItemArtwork(boundsSize: image.size) { _ in image }

        DispatchQueue.main.async {
            var now = MPNowPlayingInfoCenter.default().nowPlayingInfo ?? [:]
            now[MPMediaItemPropertyArtwork] = artwork
            MPNowPlayingInfoCenter.default().nowPlayingInfo = now
        }

    }.resume()
}


// MARK: - 更新 Now Playing 进度
private func updateNowPlayingProgress(player: AVPlayer, startOffset: Double) {
    guard var now = MPNowPlayingInfoCenter.default().nowPlayingInfo else { return }

    now[MPNowPlayingInfoPropertyElapsedPlaybackTime] =
        max(0, CMTimeGetSeconds(player.currentTime()) - startOffset)

    now[MPNowPlayingInfoPropertyPlaybackRate] =
        (player.timeControlStatus == .playing) ? 1.0 : 0.0

    if let item = player.currentItem {
        let duration = CMTimeGetSeconds(item.duration)
        if duration.isFinite {
            now[MPMediaItemPropertyPlaybackDuration] = max(0, duration - startOffset)
        }
    }

    MPNowPlayingInfoCenter.default().nowPlayingInfo = now
}

