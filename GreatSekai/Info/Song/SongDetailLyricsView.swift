import SekaiKit
import SwiftUI

struct SongDetailLyricsView: View {
    let lyrics: Song.Lyrics
    @Environment(\.locale) private var locale
    @Environment(\.colorScheme) private var colorScheme
    @State private var characterColors: [Int: Color] = [:]
    @State private var renditionKey: String?
    @State private var length: Song.Lyrics.Length = .full
    @State private var editionKey: String?
    @State private var language = TranslationLanguage.preferred
    @State private var showReadings = false
    @State private var showPerformers = true
    @State private var expanded = false
    @State private var attributionSheetIsDisplaying = false
    
    private enum TranslationLanguage: String, CaseIterable {
        case original, chinese, english
        static var preferred: Self {
            switch Locale.current.language.languageCode?.identifier {
            case "zh": .chinese
            case "en": .english
            default: .original
            }
        }
        var localizedName: String {
            switch self {
            case .original: String(localized: "Song.lyrics.original")
            case .chinese: String(localized: "Song.lyrics.chinese")
            case .english: String(localized: "Song.lyrics.english")
            }
        }
        func translation(of line: Song.Lyrics.Line) -> String? {
            switch self { case .original: nil; case .chinese: line.chinese; case .english: line.english }
        }
    }
    
    private var rendition: Song.Lyrics.Rendition? {
        lyrics.renditions.first { $0.key == renditionKey }
        ?? lyrics.renditions.first { $0.kind == .sekai }
        ?? lyrics.renditions.first
    }
    private var selectedLength: Song.Lyrics.Length {
        rendition?.lengths.contains(length) == true ? length : (rendition?.lengths.first ?? .full)
    }
    private var lines: [Song.Lyrics.Line] {
        guard let rendition else { return [] }
        return lyrics.lines(for: rendition, length: selectedLength, editionKey: selectedEditionKey)
    }
    private var displayedLines: [Song.Lyrics.Line] {
        guard !expanded else { return lines }
        var stanzaCount = 1
        for (index, line) in lines.enumerated() where index > 0 && line.stanzaBreakBefore == true {
            if stanzaCount == 2 {
                return Array(lines.prefix(index))
            }
            stanzaCount += 1
        }
        return lines
    }
    
    private var credits: Song.Lyrics.TranslationCredits? {
        guard let rendition else { return nil }
        return lyrics.credits(for: rendition, editionKey: selectedEditionKey)
    }
    private var availableLanguages: [TranslationLanguage] {
        TranslationLanguage.allCases.filter { language in
            language == .original || lines.contains {
                !(language.translation(of: $0)?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ?? true)
            }
        }
    }

    private var performerColors: [String: Color] {
        let performers = rendition?.performers ?? []
        let ids = Set(performers.map(\.performerID) + lines.flatMap { line in
            line.segments.flatMap { $0.performerIDs.map(\.value) } + (line.trailingPerformerIDs?.map(\.value) ?? [])
        })
        return Dictionary(uniqueKeysWithValues: ids.compactMap { id in
            LyricsPerformerPalette.color(for: id, explicitHex: performers.first { $0.performerID == id }?.color,
                                        characterColors: characterColors, scheme: colorScheme).map { (id, $0) }
        })
    }
    
    var body: some View {
        Section {
            content
                .frame(maxWidth: infoContentMaxWidth)
        } header: {
            HStack {
                Text("Song.lyrics")
                    .font(.title2)
                    .bold()
                //                Spacer()
                Menu {
                    if lyrics.renditions.count > 1 {
                        Picker("Song.lyrics.rendition", selection: Binding(
                            get: { rendition?.key ?? "" },
                            set: { renditionKey = $0 }
                        )) {
                            ForEach(lyrics.renditions) { item in
                                Text(item.label).tag(item.key)
                            }
                        }
                    }
                    if let rendition, rendition.lengths.count > 1 {
                        Picker("Song.lyrics.length", selection: Binding(
                            get: { selectedLength },
                            set: { length = $0 }
                        )) {
                            ForEach(rendition.lengths, id: \.self) { item in
                                Text(item.localizedName).tag(item)
                            }
                        }
                    }
                    Menu("Song.lyrics.language") {
                        ForEach(TranslationLanguage.allCases, id: \.self) { item in
                            Toggle(item.localizedName, isOn: Binding(
                                get: { language == item },
                                set: { isSelected in
                                    if isSelected { language = item }
                                }
                            ))
                            .disabled(!availableLanguages.contains(item))
                        }
                    }
                    if language == .chinese, lyrics.translationEditions.count > 1 {
                        Picker("Song.lyrics.edition", selection: Binding(
                            get: { selectedEditionKey },
                            set: { editionKey = $0 }
                        )) {
                            ForEach(lyrics.translationEditions) { item in
                                Text(item.label).tag(item.key)
                            }
                        }
                    }
                    Toggle("Song.lyrics.performers", isOn: $showPerformers)
                    Toggle("Song.lyrics.readings", isOn: $showReadings)
                } label: {
                    Text(getAttributedString(rendition?.label ?? "Song.lyrics.options", fontSize: .title2, fontWeight: .semibold, foregroundColor: .accentColor))
                }
                .menuIndicator(.hidden)
                .menuStyle(.borderlessButton)
                .buttonStyle(.plain)
                
                Spacer()
                Button(expanded ? "Details.collapse" : "Details.expand") {
                    withAnimation(.easeInOut(duration: 0.2)) {
                        expanded.toggle()
                    }
                }
                .foregroundStyle(.secondary)
                .buttonStyle(.plain)
            }
            .frame(maxWidth: infoContentMaxWidth)
            .detailSectionHeader()
        }
        .onChange(of: availableLanguages, initial: true) { _, available in
            if !available.contains(language) {
                language = .original
            }
        }
        .task {
            guard let characters = await SekaiKit.Character.allWithCache(), !Task.isCancelled else { return }
            characterColors = Dictionary(characters.compactMap { character in
                character.color.map { (character.id, $0) }
            }, uniquingKeysWith: { first, _ in first })
        }
    }
    
    private var selectedEditionKey: String {
        lyrics.translationEditions.first { $0.key == editionKey }?.key
        ?? lyrics.translationEditions.first { $0.key == lyrics.defaultTranslationEditionKey }?.key
        ?? lyrics.translationEditions.first?.key
        ?? ""
    }
    
    private var content: some View {
        let colors = performerColors
        return VStack {
            CustomGroupBox {
                VStack(alignment: .leading, spacing: 4) {
                    ForEach(displayedLines) { line in
                        VStack(alignment: .leading, spacing: 1) {
                            LyricsLineText(line: line, colors: showPerformers ? colors : [:], showReadings: showReadings)
                            if let translation = language.translation(of: line), !translation.isEmpty {
                                Text(translation).font(.callout).foregroundStyle(.secondary)
                            }
                        }
                        .padding(.top, line.stanzaBreakBefore == true ? 8 : 0)
                        .frame(maxWidth: .infinity, alignment: .leading)
                    }
                }
                .textSelection(.enabled)
            }
            if showPerformers, let rendition, !rendition.performers.isEmpty {
                CustomGroupBox {
                    HStack {
                        VStack(alignment: .leading) {
                            Text("Song.lyrics.performers").font(.caption).bold()
                            ForEach(rendition.performers) { performer in
                                Label {
                                    Text(performer.name)
                                } icon: {
                                    Circle().fill(colors[performer.performerID] ?? .secondary)
                                        .frame(width: 8, height: 8)
                                }
                                .font(.caption)
                            }
                        }
                        Spacer()
                    }
                }
            }
            //            if language == .chinese || (language == .english && lyrics.version < 4) {
            //                if let translator = credits?.translation {
            //                    LabeledContent("Song.lyrics.translator") { Text(translator) }.font(.caption)
            //                }
            //                if let proofreader = credits?.proofreading {
            //                    LabeledContent("Song.lyrics.proofreader") { Text(proofreader) }.font(.caption)
            //                }
            //            }
            //            if let rendition {
            //                LyricsSources(songID: lyrics.songID, attribution: lyrics.attribution, sources: rendition.provenance)
            //            }
            HStack {
                VStack(alignment: .leading) {
                    footerSourceText()
                    
                    let translator = credits?.translation
                    let proofreader = credits?.proofreading

                    if let translator, let proofreader {
                        Text("Song.lyrics.footer.translator.\(translator).proofreader.\(proofreader)")
                    } else if let translator {
                        Text("Song.lyrics.footer.translator.\(translator)")
                    } else  if let proofreader {
                        Text("Song.lyrics.footer.proofreader.\(proofreader)")
                    }
                }
                .foregroundStyle(.secondary)
                .font(.caption)
                .multilineTextAlignment(.leading)
                Spacer()
            }
            .padding(.vertical, 1)
        }
        .frame(maxWidth: infoContentMaxWidth)
        .sheet(isPresented: $attributionSheetIsDisplaying, content: {
            LyricsAttributionView(lyrics: lyrics)
        })
    }
    
    private func footerSourceText() -> some View {
        let attributionURL = URL(string: "greatsekai-action://lyrics-attribution")!
        let moeSekaiLink = LocalizedLinkText.link("MoeSekai", destination: URL(string: "https://pjsk.moe/lyrics/\(lyrics.songID)/")!)
        let attributionLink = LocalizedLinkText.link(
            String(localized: "Song.lyrics.footer.check-attribution", locale: locale), destination: attributionURL
        )
        let sources = rendition?.provenance ?? lyrics.attributions ?? []
        let message: Text
        if let firstSource = sources.first {
            let sourceLink = LocalizedLinkText.link(firstSource.provider.localizedName, destination: firstSource.revisionURL)
            let licenseLink = LocalizedLinkText.link(firstSource.licenseName, destination: firstSource.licenseURL)
            if sources.count > 1 {
                message = Text("Song.lyrics.footer.\(moeSekaiLink).source.\(sourceLink).license.\(licenseLink).more.attribution.\(attributionLink)")
            } else {
                message = Text("Song.lyrics.footer.\(moeSekaiLink).source.\(sourceLink).license.\(licenseLink).attribution.\(attributionLink)")
            }
        } else {
            message = Text("Song.lyrics.footer.\(moeSekaiLink).attribution.\(attributionLink)")
        }
        return LocalizedLinkText(message, actions: [attributionURL: { attributionSheetIsDisplaying = true }])
    }

}

private struct LyricsSources: View {
    let songID: Int
    let attribution: String?
    let sources: [Song.Lyrics.Attribution]

    var body: some View {
        DisclosureGroup("Song.lyrics.sources") {
            VStack(alignment: .leading, spacing: 12) {
                Link("Moesekai", destination: URL(string: "https://pjsk.moe/zh-cn/lyrics/\(songID)/")!)
                if let attribution { Text(attribution) }
                ForEach(Array(sources.enumerated()), id: \.offset) { _, source in
                    VStack(alignment: .leading, spacing: 3) {
                        if let url = webURL(source.revisionURL) {
                            Link(source.title, destination: url)
                        } else {
                            Text(source.title)
                        }
                        Text(source.provider.localizedName).foregroundStyle(.secondary)
                        ForEach(source.component, id: \.self) { component in
                            Text(component.localizedName).foregroundStyle(.secondary)
                        }
                        if let url = webURL(source.licenseURL) {
                            Link(source.licenseName, destination: url)
                        } else {
                            Text(source.licenseName)
                        }
                    }
                }
            }
            .font(.caption)
            .textSelection(.enabled)
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(.top, 8)
        }
    }

    private func webURL(_ url: URL) -> URL? {
        ["http", "https"].contains(url.scheme?.lowercased() ?? "") ? url : nil
    }

}

