import AVKit
import SekaiKit
import SwiftUI

struct SongDetailMusicVideoView: View {
    let song: Song
    @State private var content: LocalizedData<Song.VideoContent>?
    @State private var locale = SekaiLocale.primaryLocale
    @State private var selectedID: String?
    private var locales: [SekaiLocale] {
        SekaiLocale.allCases.filter { !(content?[$0]?.videos.isEmpty ?? true) }
    }
    private var videos: [Song.MusicVideo] { content?[locale]?.videos ?? [] }
    private var selectedVideo: Song.MusicVideo? {
        videos.first { $0.id == selectedID } ?? videos.first
    }

    var body: some View {
        Group {
            if !locales.isEmpty {
                Section {
                    VStack {
                        if videos.count > 1 {
                            Picker("Song.music-video.version", selection: Binding(
                                get: { selectedVideo?.id }, set: { selectedID = $0 }
                            )) {
                                ForEach(videos) { video in
                                    Text(video.caption.map { video.mediaType.localizedName + " · " + $0 } ?? video.mediaType.localizedName)
                                        .tag(Optional(video.id))
                                }
                            }
                            .pickerStyle(.menu)
                        }
                        if let selectedVideo {
                            SongMoviePlayer(video: selectedVideo).id(selectedVideo.id)
                        }
                    }
                    .frame(maxWidth: infoContentMaxWidth)
                } header: {
                    HStack {
                        Text("Song.music-video").font(.title2).bold()
                        if locales.count > 1 {
                            DetailSectionOptionPicker(selection: $locale, options: locales)
                        }
                        Spacer()
                    }
                    .frame(maxWidth: infoContentMaxWidth)
                    .detailSectionHeader()
                }
            }
        }
        .task(id: song.id) {
            content = await song.videoContent()
            guard !Task.isCancelled else { return }
            if !locales.contains(locale) {
                locale = locales.contains(.secondaryLocale) ? .secondaryLocale : (locales.first ?? .primaryLocale)
            }
        }
    }
}

private struct SongMoviePlayer: View {
    let video: Song.MusicVideo
    @State private var player = AVPlayer()
    @State private var loading = true
    @State private var failed = false
    @State private var retry = 0

    var body: some View {
        Group {
            if loading {
                ProgressView().frame(maxWidth: .infinity).aspectRatio(16.0 / 9.0, contentMode: .fit)
            } else if failed {
                ContentUnavailableView {
                    Label("Song.music-video.unavailable", systemImage: "film")
                } actions: {
                    Button("General.retry") { retry += 1 }
                }
            } else {
                VideoPlayer(player: player)
                    .aspectRatio(16.0 / 9.0, contentMode: .fit)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
            }
        }
        .task(id: retry) {
            loading = true
            failed = false
            let url = await video.videoURL()
            guard !Task.isCancelled else { return }
            if let url { player.replaceCurrentItem(with: AVPlayerItem(url: url)) }
            failed = url == nil
            loading = false
        }
        .onDisappear {
            player.pause()
            player.replaceCurrentItem(with: nil)
        }
    }
}
