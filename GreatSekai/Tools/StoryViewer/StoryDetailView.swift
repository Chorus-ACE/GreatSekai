// Transcript presentation adapted from Greatdori's StoryDetailView
// (Apache-2.0, Greatdori project authors). https://greatdori.com/LICENSE.txt
import AVKit
import SekaiKit
import SwiftUI
import SDWebImageSwiftUI

struct StoryDetailView: View {
    let episode: Episode
    @State private var locale: SekaiLocale
    @State private var currentEpisode: Episode?
    @State private var transcript: StoryTranscript?
    @State private var failed = false
    @State private var query = ""
    @State private var retryID = 0
    @State private var player = AVPlayer()
    @AppStorage("StoryViewerFontSize") private var fontSize = 16.0
    @ScaledMetric(relativeTo: .body) private var baseFontSize = 16.0

    init(episode: Episode) {
        self.episode = episode
        self._locale = .init(initialValue: episode.locale)
        self._currentEpisode = .init(initialValue: episode)
    }

    private var displayedLines: [StoryTranscript.Line] {
        transcript?.lines.filter {
            query.isEmpty || $0.text.localizedCaseInsensitiveContains(query)
                || $0.speaker.localizedCaseInsensitiveContains(query)
        } ?? []
    }

    var body: some View {
        Group {
            if let transcript {
                if transcript.lines.isEmpty {
                    ContentUnavailableView("Story.no-dialogue", systemImage: "text.bubble")
                } else if displayedLines.isEmpty {
                    ContentUnavailableView.search(text: query)
                } else {
                    ScrollView {
                        LazyVStack(alignment: .leading) {
                            let lines = displayedLines
                            ForEach(Array(lines.enumerated()), id: \.element.id) { index, line in
                                if line.characterIDs == nil {
                                    Text(line.text)
                                        .font(.system(size: baseFontSize * fontSize / 16))
                                        .underline()
                                        .multilineTextAlignment(.center)
                                        .textSelection(.enabled)
                                        .frame(maxWidth: .infinity)
                                        .padding(index > 0 && lines[index - 1].characterIDs == nil ? .bottom : .vertical)
                                } else {
                                    StoryDialogueRow(line: line, fontSize: baseFontSize * fontSize / 16) {
                                        guard let url = line.voiceURL else { return }
                                        player.replaceCurrentItem(with: AVPlayerItem(url: url))
                                        player.play()
                                    }
                                }
                            }
                        }
                        .typesettingLanguage(.explicit(.init(identifier: locale.nsLocale.language.minimalIdentifier)))
                        .frame(maxWidth: infoContentMaxWidth)
                        .padding()
                        .frame(maxWidth: .infinity)
                    }
                    .id("\(episode.id)-\(locale.rawValue)")
                }
            } else {
                ExtendedConstraints {
                    if failed {
                        ContentUnavailableView {
                            Label("Story.unavailable", systemImage: "books.vertical")
                        } actions: {
                            Button("General.retry") { retryID += 1 }
                        }
                    } else {
                        ProgressView().controlSize(.large)
                    }
                }
            }
        }
        .navigationTitle(currentEpisode?.title ?? String(localized: "App.tools.story-viewer"))
        .withSystemBackground()
        .searchable(text: $query)
        .toolbar {
            ToolbarItem {
                Menu {
                    LocalePicker($locale) { Text("Story.region") }
                        .pickerStyle(.inline)
                } label: {
                    Label("Story.region", systemImage: "globe")
                }
                .buttonBorderShape(.circle)
            }
            ToolbarItem {
                Menu("Story.text-size", systemImage: "textformat.size") {
                    Button("Story.text-larger") { fontSize = min(fontSize + 2, 32) }
                        .disabled(fontSize >= 32)
                    Button("Story.text-smaller") { fontSize = max(fontSize - 2, 12) }
                        .disabled(fontSize <= 12)
                }
                .buttonBorderShape(.circle)
            }
        }
        .task(id: "\(episode.id)-\(locale.rawValue)-\(retryID)") { await load() }
        .onDisappear { stopVoice() }
    }

    private func stopVoice() {
        player.pause()
        player.replaceCurrentItem(with: nil)
    }

    private func load() async {
        stopVoice()
        transcript = nil
        currentEpisode = nil
        failed = false
        let resolvedEpisode: Episode
        if locale == episode.locale {
            resolvedEpisode = episode
        } else {
            // Resolve the target region's own record; asset paths and availability
            // cannot be inferred by substituting a locale into the original URL.
            let regionalEpisodes = await Episode.all(in: locale, kind: episode.kind)
            guard !Task.isCancelled else { return }
            guard let matchingEpisode = regionalEpisodes?.first(where: {
                $0.episodeID == episode.episodeID && $0.parentID == episode.parentID
            }) else {
                failed = true
                return
            }
            resolvedEpisode = matchingEpisode
        }
        currentEpisode = resolvedEpisode
        let result = await SekaiCache.withDirectCache(id: "Transcript-v2-\(resolvedEpisode.id)", trait: .invocationElidable) {
            await StoryTranscript.load(resolvedEpisode)
        }
        guard !Task.isCancelled else { return }
        transcript = result
        failed = result == nil
    }
}

private struct StoryDialogueRow: View {
    let line: StoryTranscript.Line
    let fontSize: Double
    var playVoice: () -> Void

    private var speaker: String {
        line.speaker.isEmpty ? String(localized: "Info.unknown") : line.speaker
    }

    var body: some View {
        CustomGroupBox(cornerRadius: 20) {
            if line.voiceURL != nil {
                Button(action: playVoice) {
                    dialogue
                        .contentShape(Rectangle())
                }
                .buttonStyle(.borderless)
                .accessibilityHint(Text("Story.play-voice"))
            } else {
                dialogue
                    .textSelection(.enabled)
            }
        }
        .contextMenu {
            Button("Story.copy-dialogue", systemImage: "doc.on.doc") {
                copyStringToClipboard(line.text)
            }
        }
        #if os(macOS)
        .wrapIf(line.voiceURL != nil) { content in
            if #available(macOS 15.0, *) {
                content.pointerStyle(.link)
            } else {
                content
            }
        }
        #endif
    }

    private var dialogue: some View {
        VStack(alignment: .leading) {
            HStack {
                characterIcon
                Text(speaker).font(.headline)
                Spacer(minLength: 0)
            }
            .accessibilityElement(children: .combine)
            .accessibilityLabel(speaker)
            Text(line.text)
                .font(.system(size: fontSize))
                .multilineTextAlignment(.leading)
                .fixedSize(horizontal: false, vertical: true)
        }
        .foregroundStyle(Color.primary)
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    @ViewBuilder
    private var characterIcon: some View {
        if let ids = line.characterIDs, ids.count == 1, let id = ids.first,
           let url = SekaiKit.Character.iconImageURL(forID: id) {
            WebImage(url: url) { image in
                image.resizable().scaledToFit()
            } placeholder: {
                Image(systemName: "person.crop.circle").bold()
            }
            .frame(width: 20, height: 20)
            .accessibilityHidden(true)
        } else {
            Image(systemName: (line.characterIDs?.count ?? 0) > 1 ? "person.3.fill" : "person.crop.circle.badge.questionmark")
                .bold()
                .frame(width: 20, height: 20)
                .accessibilityHidden(true)
        }
    }
}
