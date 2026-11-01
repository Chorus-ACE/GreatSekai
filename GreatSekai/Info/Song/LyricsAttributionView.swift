import SekaiKit
import SwiftUI

struct LyricsAttributionView: View {
    let lyrics: Song.Lyrics
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Form {
                Section("Song.lyrics.attribution.provider") {
                    Link(destination: URL(string: "https://pjsk.moe/lyrics/\(lyrics.songID)/")!) {
                        Text(verbatim: "MoeSekai")
                    }
                    if let attribution = lyrics.attribution, !attribution.isEmpty {
                        Text(attribution).textSelection(.enabled)
                    }
                }

                ForEach(lyrics.renditions) { rendition in
                    Section(rendition.label.isEmpty ? rendition.kind.localizedName : rendition.label) {
                        if rendition.provenance.isEmpty {
                            Text("Song.lyrics.attribution.sources.unavailable")
                                .foregroundStyle(.secondary)
                        } else {
                            ForEach(rendition.provenance, id: \.self) { source in
                                LyricsAttributionSourceRow(source: source)
                            }
                        }

                        if lyrics.version == 4 {
                            ForEach(lyrics.translationEditions) { edition in
                                if let entry = edition.renditions.first(where: { $0.renditionKey == rendition.key }) {
                                    VStack(alignment: .leading, spacing: 10) {
                                        Text("Song.lyrics.attribution.edition.\(edition.label)")
                                            .font(.headline)
                                        LyricsTranslationCreditsView(credits: entry.translationCredits)
                                    }
                                    .padding(.vertical, 4)
                                }
                            }
                        } else if rendition.translationCredits != nil || hasTranslations(rendition) {
                            VStack(alignment: .leading, spacing: 10) {
                                Text("Song.lyrics.attribution.translation-credits").font(.headline)
                                LyricsTranslationCreditsView(credits: rendition.translationCredits)
                            }
                            .padding(.vertical, 4)
                        }
                    }
                }
            }
            .formStyle(.grouped)
            .navigationTitle("Song.lyrics.attribution.sheet.title")
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button { dismiss() } label: {
                        Label("General.done", systemImage: "checkmark")
                            #if os(macOS)
                            .labelStyle(.titleOnly)
                            #else
                            .labelStyle(.iconOnly)
                            #endif
                    }
                }
            }
        }
        #if os(macOS)
        .frame(minWidth: 520, idealWidth: 600, minHeight: 460, idealHeight: 640)
        #endif
    }

    private func hasTranslations(_ rendition: Song.Lyrics.Rendition) -> Bool {
        [rendition.full, rendition.game].compactMap { $0 }.contains { side in
            side.lines.contains {
                !($0.chinese?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ?? true)
                    || !($0.english?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ?? true)
            }
        }
    }
}

private struct LyricsAttributionSourceRow: View {
    let source: Song.Lyrics.Attribution

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(source.provider.localizedName).font(.headline)
            LabeledContent("Song.lyrics.attribution.source") {
                LyricsAttributionLink(title: source.title, url: source.revisionURL)
            }
            LabeledContent("Song.lyrics.attribution.license") {
                LyricsAttributionLink(title: source.licenseName, url: source.licenseURL)
            }
            LabeledContent("Song.lyrics.attribution.revision") {
                Text(verbatim: String(source.revisionID))
            }
            if !source.component.isEmpty {
                LabeledContent("Song.lyrics.attribution.components") {
                    VStack(alignment: .trailing, spacing: 4) {
                        ForEach(source.component, id: \.self) { component in
                            Text(component.localizedName)
                        }
                    }
                }
            }
        }
        .padding(.vertical, 4)
        .textSelection(.enabled)
    }
}

private struct LyricsAttributionLink: View {
    let title: String
    let url: URL

    var body: some View {
        Group {
            if ["https", "http"].contains(url.scheme?.lowercased() ?? "") {
                Link(destination: url) { Text(verbatim: title) }
            } else {
                Text(verbatim: title)
            }
        }
        .multilineTextAlignment(.trailing)
        .fixedSize(horizontal: false, vertical: true)
    }
}

private struct LyricsTranslationCreditsView: View {
    let credits: Song.Lyrics.TranslationCredits?

    private var translator: String? { nonempty(credits?.translation) }
    private var proofreader: String? { nonempty(credits?.proofreading) }

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            if let translator {
                LabeledContent("Song.lyrics.translator") { Text(translator) }
            }
            if let proofreader {
                LabeledContent("Song.lyrics.proofreader") { Text(proofreader) }
            }
            if translator == nil && proofreader == nil {
                Text("Song.lyrics.attribution.translation-credits.unavailable")
                    .foregroundStyle(.secondary)
            }
        }
        .textSelection(.enabled)
    }

    private func nonempty(_ value: String?) -> String? {
        guard let value, !value.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return nil }
        return value
    }
}
