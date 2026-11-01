import SekaiKit
import SwiftUI
#if os(macOS)
import AppKit
#else
import UIKit
#endif

struct LyricsLineText: View {
    let line: Song.Lyrics.Line
    let colors: [String: Color]
    let showReadings: Bool
    @Environment(\.colorScheme) private var scheme
    #if os(macOS)
    @ScaledMetric(relativeTo: .body) private var fontSize: CGFloat = 13
    #else
    @ScaledMetric(relativeTo: .body) private var fontSize: CGFloat = 17
    #endif

    var body: some View {
        let spans = displaySpans
        if spans.contains(where: { !($0.reading?.isEmpty ?? true) }) {
            let renderer = LyricsRubyRenderer(
                spans: spans, fontSize: fontSize,
                textColor: scheme == .dark ? CGColor(gray: 1, alpha: 1) : CGColor(gray: 0, alpha: 1),
                readingColor: CGColor(gray: scheme == .dark ? 0.75 : 0.35, alpha: 1)
            )
            LyricsRubyLayout(renderer: renderer) {
                Canvas { context, size in
                    context.withCGContext { renderer.draw(in: $0, size: size) }
                }
            }
            .accessibilityElement(children: .ignore)
            .accessibilityLabel(Text(verbatim: line.japanese))
            .contextMenu {
                Button("Song.lyrics.copy-line", systemImage: "doc.on.doc") { copyLine() }
            }
        } else {
            Text(attributedText).font(.system(size: fontSize))
        }
    }

    private var attributedText: AttributedString {
        guard !line.segments.isEmpty else { return AttributedString(line.japanese) }
        var text = AttributedString()
        for segment in line.segments {
            var part = AttributedString(segment.text)
            part.foregroundColor = segmentColor(segment.performerIDs.map(\.value)) ?? .primary
            text += part
        }
        return text
    }

    private var displaySpans: [LyricsRubyRenderer.Span] {
        guard !line.segments.isEmpty else { return [.init(text: line.japanese)] }
        return line.segments.flatMap { segment -> [LyricsRubyRenderer.Span] in
            let color = segmentColor(segment.performerIDs.map(\.value)).map {
                LyricsPerformerPalette.cgColor($0, scheme: scheme)
            }
            guard showReadings, let ruby = segment.ruby, !ruby.isEmpty,
                  ruby.map(\.text).joined() == segment.text else {
                return [.init(text: segment.text, color: color)]
            }
            return ruby.map { .init(text: $0.text, reading: $0.reading, color: color) }
        }
    }

    private func segmentColor(_ ids: [String]) -> Color? {
        LyricsPerformerPalette.groupColor(
            ids: ids.isEmpty ? (line.trailingPerformerIDs?.map(\.value) ?? []) : ids,
            colors: colors, scheme: scheme
        )
    }

    private func copyLine() {
        #if os(macOS)
        NSPasteboard.general.clearContents()
        NSPasteboard.general.setString(line.japanese, forType: .string)
        #else
        UIPasteboard.general.string = line.japanese
        #endif
    }
}

private struct LyricsRubyLayout: Layout {
    let renderer: LyricsRubyRenderer

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let width = max(1, proposal.width ?? renderer.size(fitting: 10_000).width)
        return CGSize(width: width, height: renderer.size(fitting: width).height)
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        for subview in subviews {
            subview.place(at: bounds.origin, anchor: .topLeading, proposal: ProposedViewSize(bounds.size))
        }
    }
}
