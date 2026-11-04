// Transcript presentation adapted from Greatdori (Apache-2.0).
// https://greatdori.com/LICENSE.txt
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
    @State private var currentLineID: Int?
    @State private var voiceLineID: Int?
    @State private var requestedVoiceLineID: Int?
    @State private var playing = false
    @State private var fullscreen = false
    @State private var jump: StoryPlayerCommand?
    @State private var searchSelection: Int?
    @State private var searchNavigationID = UUID()
    @AccessibilityFocusState private var accessibilityLine: Int?
    @FocusState private var focusedLine: Int?
    @FocusState private var searchFieldFocused: Bool

    init(episode: Episode) {
        self.episode = episode
        _locale = .init(initialValue: episode.locale)
        _currentEpisode = .init(initialValue: episode)
    }

    private var matches: [Int] {
        guard !query.isEmpty else { return [] }
        return transcript?.lines.filter {
            $0.text.localizedCaseInsensitiveContains(query) || $0.speaker.localizedCaseInsensitiveContains(query)
        }.map(\.id) ?? []
    }

    private var searchSubtitle: String {
        guard !query.isEmpty else { return "" }
        guard !matches.isEmpty else { return String(localized: "Story.search.no-results") }
        let position = matches.firstIndex(of: searchSelection ?? -1).map { $0 + 1 } ?? 1
        return String(localized: "Story.search.results.\(matches.count).\(position).\(matches.count)")
    }

    private var storyExternalLinks: [ExternalLink?] {
        let selectedEpisode = currentEpisode ?? episode
        var haruki = URLComponents(string: "https://haruki.seiunx.com/story")!
        haruki.queryItems = [URLQueryItem(name: "scenario", value: selectedEpisode.scenarioID)]

        // Use the selected region's actual bundle path, including card resource
        // bundles; never derive the bundle name from the scenario ID.
        let path = selectedEpisode.scenarioPath.split(separator: "/")
        let bundleIndex = selectedEpisode.kind == .event ? 1 : 2
        var cleista = URLComponents(string: "https://pjsk.cleista.cc/")!
        let cleistaURL: URL?
        if path.indices.contains(bundleIndex) {
            let bundle = path[bundleIndex]
            cleista.fragment = "/read/\(selectedEpisode.kind.rawValue)/\(bundle)/\(selectedEpisode.scenarioID)"
            cleistaURL = cleista.url
        } else {
            cleistaURL = nil
        }
        return [
            haruki.url.map { ExternalLink(.haruki, url: $0) },
            cleistaURL.map { ExternalLink(.cleista, url: $0) }
        ]
    }

    var body: some View {
        GeometryReader { container in
            #if os(iOS)
            let fillsScreen = fullscreen && container.size.width > container.size.height
            #else
            let fillsScreen = false
            #endif
            GeometryReader { geometry in
                ScrollViewReader { proxy in
                    ScrollView {
                        VStack(spacing: fullscreen ? 0 : 20) {
                            if let transcript {
                                StoryPlayerView(
                                    episode: currentEpisode ?? episode,
                                    locale: locale,
                                    currentLineID: $currentLineID,
                                    playing: $playing,
                                    fullscreen: $fullscreen,
                                    fillsScreen: fillsScreen,
                                    safeAreaInsets: fillsScreen ? container.safeAreaInsets : .init(),
                                    jump: jump,
                                    transcript: transcript.lines,
                                    stopTranscriptVoice: stopVoice
                                )
                                    .frame(height: fullscreen ? geometry.size.height : nil)
                                    .id("story-player")
                                if !fullscreen {
                                    DetailSectionsSpacer(height: 15)
                                    LazyVStack(alignment: .leading) {
                                        if transcript.lines.isEmpty {
                                            ContentUnavailableView("Story.no-dialogue", systemImage: "text.bubble")
                                        }
                                        ForEach(Array(transcript.lines.enumerated()), id: \.element.id) { index, line in
                                            transcriptRow(line,
                                                          previous: index > 0 ? transcript.lines[index - 1] : nil,
                                                          next: index + 1 < transcript.lines.count ? transcript.lines[index + 1] : nil)
                                                .id(line.id)
                                                #if os(macOS)
                                                .contentShape(.focusEffect, RoundedRectangle(cornerRadius: 20))
                                                #endif
                                                .focusable(interactions: .activate)
                                                .focused($focusedLine, equals: line.id)
                                                .accessibilityFocused($accessibilityLine, equals: line.id)
                                        }
                                    }
                                    .environment(\.searchedKeyword, $query)
                                    .typesettingLanguage(.explicit(.init(identifier: locale.nsLocale.language.minimalIdentifier)))
                                    ExternalLinksSection(links: storyExternalLinks)
                                }
                            } else if failed {
                                ContentUnavailableView {
                                    Label("Story.unavailable", systemImage: "books.vertical")
                                } actions: {
                                    Button("General.retry") { retryID += 1 }
                                }
                            } else {
                                ProgressView().controlSize(.large)
                                    .frame(maxWidth: .infinity, minHeight: 200)
                            }
                        }
                        .frame(maxWidth: fullscreen ? .infinity : infoContentMaxWidth)
                        .padding(fullscreen ? 0 : 16)
                        .frame(maxWidth: .infinity)
                    }
                    .scrollDisabled(fullscreen)
                    // Resizing must not replace the subtree that owns playback state.
                    .contentMargins(.all, fillsScreen ? 0 : nil, for: .scrollContent)
                    .onChange(of: fullscreen) {
                        if fullscreen { proxy.scrollTo("story-player", anchor: .top) }
                    }
                    .onChange(of: query) {
                        searchSelection = matches.first
                        if let first = matches.first {
                            withAnimation { proxy.scrollTo(first, anchor: .center) }
                            accessibilityLine = first
                        }
                    }
                    .onChange(of: searchNavigationID) {
                        guard let searchSelection else { return }
                        let navigationID = searchNavigationID
                        focusedLine = nil
                        withAnimation(.default) {
                            proxy.scrollTo(searchSelection, anchor: .center)
                        } completion: {
                            guard searchNavigationID == navigationID, self.searchSelection == searchSelection else { return }
                            focusedLine = searchSelection
                            accessibilityLine = searchSelection
                        }
                    }
                    .onChange(of: searchSelection) {
                        guard let searchSelection else { focusedLine = nil; accessibilityLine = nil; return }
                        withAnimation { proxy.scrollTo(searchSelection, anchor: .center) }
                        accessibilityLine = searchSelection
                    }
                }
            }
            .ignoresSafeArea(.container, edges: fillsScreen ? .all : [])
        }
        .navigationTitle(currentEpisode?.title ?? String(localized: "App.tools.story-viewer"))
        .wrapIf(true) { content in
            if #available(iOS 26.0, macOS 26.0, *) {
                content.navigationSubtitle(searchSubtitle)
            } else { content }
        }
        .withSystemBackground()
        .searchFocused($searchFieldFocused)
        .searchable(text: $query, prompt: "Story.search.prompt")
        .background {
            Button("Story.search.prompt") {
                focusedLine = nil
                searchFieldFocused = true
            }
            .keyboardShortcut("f", modifiers: .command)
            .focusable(false)
            .frame(width: 0, height: 0)
            .opacity(0)
            .accessibilityHidden(true)
        }
        .toolbar {
            if !fullscreen {
                ToolbarItem {
                    Menu {
                        LocalePicker($locale) { Text("Story.region") }.pickerStyle(.inline)
                    } label: { Label("Story.region", systemImage: "globe") }
                }
                if !query.isEmpty {
                    ToolbarItem {
                        Button("Story.search.previous", systemImage: "chevron.up") { moveSearch(-1) }
                            .keyboardShortcut("g", modifiers: [.command, .shift])
                            .disabled(matches.isEmpty)
                    }
                    ToolbarItem {
                        Button("Story.search.next", systemImage: "chevron.down") { moveSearch(1) }
                            .keyboardShortcut("g", modifiers: .command)
                            .disabled(matches.isEmpty)
                    }
                }
            }
        }
        #if os(iOS)
        .toolbar(fullscreen ? .hidden : .visible, for: .navigationBar, .tabBar)
        .statusBarHidden(fullscreen)
        #endif
        .navigationBarBackButtonHidden(fullscreen)
        .task(id: "\(episode.id)-\(locale.rawValue)-\(retryID)") { await load() }
        .onReceive(player.publisher(for: \.timeControlStatus)) { status in
            voiceLineID = status == .playing ? requestedVoiceLineID : nil
        }
        .onReceive(NotificationCenter.default.publisher(for: .AVPlayerItemDidPlayToEndTime)) { notification in
            if let item = notification.object as? AVPlayerItem, item === player.currentItem { stopVoice() }
        }
        .onDisappear { stopVoice() }
    }

    private func isSceneCaption(_ line: StoryTranscript.Line) -> Bool {
        line.characterIDs == nil && !(episode.kind == .unit && line.textKind == .narration)
    }

    @ViewBuilder private func transcriptRow(_ line: StoryTranscript.Line,
                                            previous: StoryTranscript.Line?, next: StoryTranscript.Line?) -> some View {
        let dimmed = !query.isEmpty && !matches.contains(line.id)
        Group {
            if isSceneCaption(line) {
                HighlightableText(line.text)
                    .font(.body).underline()
                    .foregroundStyle(currentLineID == line.id ? Color.accentColor : Color.primary)
                    .multilineTextAlignment(.center)
                    .frame(maxWidth: .infinity)
                    .padding(.top, previous.map(isSceneCaption) == true ? 4 : 16)
                    .padding(.bottom, next.map(isSceneCaption) == true ? 4 : 16)
                    .contentShape(Rectangle())
                    .onTapGesture { jumpTo(line) }
            } else {
                StoryDialogueRow(line: line, isCurrent: currentLineID == line.id,
                                 voicePlaying: voiceLineID == line.id,
                                 playVoice: { playVoice(line) }, jump: { jumpTo(line) })
            }
        }
        .opacity(dimmed ? 0.4 : 1)
    }

    private func moveSearch(_ offset: Int) {
        guard !matches.isEmpty else { return }
        let index = matches.firstIndex(of: searchSelection ?? -1) ?? 0
        searchFieldFocused = false
        searchSelection = matches[(index + offset + matches.count) % matches.count]
        searchNavigationID = UUID()
    }

    private func jumpTo(_ line: StoryTranscript.Line) {
        guard playing else { return }
        stopVoice()
        jump = StoryPlayerCommand(lineID: line.id)
    }

    private func playVoice(_ line: StoryTranscript.Line) {
        if requestedVoiceLineID == line.id {
            stopVoice()
            return
        }
        guard let url = line.voiceURL else { return }
        stopVoice()
        requestedVoiceLineID = line.id
        player.replaceCurrentItem(with: AVPlayerItem(url: url))
        player.play()
    }

    private func stopVoice() {
        player.pause()
        player.replaceCurrentItem(with: nil)
        voiceLineID = nil
        requestedVoiceLineID = nil
    }

    private func load() async {
        stopVoice()
        currentLineID = nil
        playing = false
        fullscreen = false
        jump = nil
        searchSelection = nil
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
        let result = await SekaiCache.withDirectCache(id: "Transcript-v3-\(resolvedEpisode.id)", trait: .invocationElidable) {
            await StoryTranscript.load(resolvedEpisode)
        }
        guard !Task.isCancelled else { return }
        transcript = result
        searchSelection = matches.first
        failed = result == nil
    }
}

private struct StoryDialogueRow: View {
    let line: StoryTranscript.Line
    let isCurrent: Bool
    let voicePlaying: Bool
    var playVoice: () -> Void
    var jump: () -> Void

    private var isNarrator: Bool {
        line.textKind == .narration || line.speaker.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    private var speaker: String { isNarrator ? String(localized: "Story.narrator") : line.speaker }

    private var displayedText: String {
        guard line.textKind == .narration else { return line.text }
        return line.text.split(separator: "\n", omittingEmptySubsequences: false)
            .map { String($0.drop(while: { $0.isWhitespace })) }
            .joined(separator: "\n")
    }
    private var multiple: Bool {
        ["一同", "全员", "全員", "All"].contains(speaker) || ["・", "と", "&"].contains { separator in
            let parts = speaker.components(separatedBy: separator)
            return parts.count > 1 && !(parts.first?.isEmpty ?? true) && !(parts.last?.isEmpty ?? true)
        }
    }
    private var unknown: Bool { ["???", "？？？"].contains(speaker) }

    var body: some View {
        CustomGroupBox(cornerRadius: 20) {
            VStack(alignment: .leading) {
                HStack {
                    HStack {
                        characterIcon
                            HighlightableText(speaker).font(.headline)
                    }
                    .accessibilityElement(children: .combine)
                    .contentShape(Rectangle())
                    .onTapGesture(perform: jump)
                    .opacity(isNarrator ? 0.5 : 1)
                    Spacer(minLength: 0)
                        .contentShape(Rectangle())
                        .onTapGesture(perform: jump)
                    if line.voiceURL != nil {
                        Button(action: playVoice) {
                            Image(systemName: voicePlaying ? "speaker.wave.2.fill" : "speaker.wave.2")
                                .foregroundStyle(voicePlaying ? Color.accentColor : Color.primary)
                        }
                        .buttonStyle(.borderless)
                        .accessibilityLabel(Text("Story.play-voice"))
                    }
                }
                HighlightableText(displayedText)
                    .font(.body)
                    .multilineTextAlignment(.leading)
                    .fixedSize(horizontal: false, vertical: true)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .contentShape(Rectangle())
                    .onTapGesture(perform: jump)
            }
            .background {
                Color.clear.contentShape(Rectangle()).onTapGesture(perform: jump)
            }
            .foregroundStyle(Color.primary)
        }
        .groupBoxStrokeLineWidth(isCurrent ? 3 : 0)
        .contextMenu {
            Button("Story.copy-dialogue", systemImage: "doc.on.doc") { copyStringToClipboard(line.text) }
        }
    }

    @ViewBuilder private var characterIcon: some View {
        Group {
            if isNarrator {
                Image(systemName: "person.crop.circle").bold()
            } else if multiple {
                Image(systemName: "person.3.fill").bold()
            } else if unknown {
                Image(systemName: "person.crop.circle.badge.questionmark").bold()
            } else if let id = line.characterIDs?.first, id > 0, let url = SekaiKit.Character.iconImageURL(forID: id) {
                WebImage(url: url) { $0.resizable().scaledToFit() } placeholder: {
                    Image(systemName: "person.crop.circle").bold()
                }
            } else {
                Image(systemName: "person.crop.circle").bold()
            }
        }
        .frame(width: 20, height: 20)
        .accessibilityHidden(true)
    }
}
