import CoreText
import Foundation

/// Core Text keeps furigana attached to its base characters, including when a line wraps.
struct LyricsRubyRenderer {
    struct Span {
        let text: String
        var reading: String? = nil
        var color: CGColor? = nil
        var gradient: [CGColor] = []
        var gradientID: Int? = nil
    }

    struct GradientSpan {
        var range: NSRange
        let colors: [CGColor]
    }

    let text: NSAttributedString
    let fontSize: CGFloat
    let hasReadings: Bool
    let gradients: [GradientSpan]
    private let framesetter: CTFramesetter

    init(spans: [Span], fontSize: CGFloat, textColor: CGColor, readingColor: CGColor) {
        self.fontSize = fontSize
        hasReadings = spans.contains { !($0.reading?.isEmpty ?? true) && !$0.text.isEmpty }
        let font = CTFontCreateUIFontForLanguage(.system, fontSize, "ja" as CFString)
            ?? CTFontCreateWithName("HiraginoSans-W3" as CFString, fontSize, nil)
        // Core Text includes ruby ascent in its line metrics.
        var lineSpacing: CGFloat = 1
        let paragraph = withUnsafePointer(to: &lineSpacing) { spacing in
            var setting = CTParagraphStyleSetting(spec: .lineSpacingAdjustment,
                                                 valueSize: MemoryLayout<CGFloat>.size, value: spacing)
            return CTParagraphStyleCreate(&setting, 1)
        }
        let result = NSMutableAttributedString(string: "")
        var gradientGroups: [Int: GradientSpan] = [:]
        for (index, span) in spans.enumerated() {
            let start = result.length
            result.append(NSAttributedString(string: span.text, attributes: [
                NSAttributedString.Key(kCTFontAttributeName as String): font,
                NSAttributedString.Key(kCTForegroundColorAttributeName as String): span.color ?? textColor,
                NSAttributedString.Key(kCTParagraphStyleAttributeName as String): paragraph
            ]))
            if span.gradient.count > 1, !span.text.isEmpty {
                let id = span.gradientID ?? index
                let range = NSRange(location: start, length: (span.text as NSString).length)
                if let previous = gradientGroups[id] {
                    gradientGroups[id]?.range = NSUnionRange(previous.range, range)
                } else {
                    gradientGroups[id] = .init(range: range, colors: span.gradient)
                }
                // Keep singer boundaries in Core Text's runs even when adjacent
                // segments share the same first singer's solid fallback color.
                result.addAttribute(.init("GreatSekai.Lyrics.gradient"), value: id, range: range)
            }
            if let reading = span.reading, !reading.isEmpty, !span.text.isEmpty {
                let annotation = CTRubyAnnotationCreateWithAttributes(
                    .center, .auto, .before, reading as CFString,
                    [kCTRubyAnnotationSizeFactorAttributeName as String: 0.55,
                     kCTForegroundColorAttributeName as String: readingColor] as CFDictionary
                )
                result.addAttribute(NSAttributedString.Key(kCTRubyAnnotationAttributeName as String),
                                    value: annotation, range: NSRange(location: start, length: (span.text as NSString).length))
            }
        }
        text = NSAttributedString(attributedString: result)
        gradients = gradientGroups.values.sorted { $0.range.location < $1.range.location }
        framesetter = CTFramesetterCreateWithAttributedString(text)
    }

    func size(fitting width: CGFloat) -> CGSize {
        let width = max(1, width)
        let measured = CTFramesetterSuggestFrameSizeWithConstraints(
            framesetter, CFRange(), nil, CGSize(width: width, height: .greatestFiniteMagnitude), nil
        )
        return CGSize(width: ceil(min(width, measured.width)), height: ceil(measured.height) + 2)
    }

    func draw(in context: CGContext, size: CGSize) {
        context.saveGState()
        context.textMatrix = .identity
        context.translateBy(x: 0, y: size.height)
        context.scaleBy(x: 1, y: -1)
        let frame = frame(in: size)
        // Draw annotations before inspecting glyph runs. Core Text can shift
        // ruby positions when the same frame's runs are queried before drawing.
        // An isolated layer lets gradients replace base glyph colors (including
        // their alpha) without replacing the background or ruby annotations.
        context.beginTransparencyLayer(auxiliaryInfo: nil)
        CTFrameDraw(frame, context)
        let fragments = gradientFragments(in: frame)
        if !fragments.isEmpty {
            for fragment in fragments {
                guard let gradient = CGGradient(colorsSpace: CGColorSpace(name: CGColorSpace.sRGB),
                                                colors: fragment.colors as CFArray, locations: nil) else { continue }
                let bounds = fragment.path.boundingBoxOfPath
                context.saveGState()
                context.addPath(fragment.path)
                context.clip()
                context.setBlendMode(.copy)
                context.drawLinearGradient(gradient, start: .init(x: bounds.minX, y: bounds.midY),
                                           end: .init(x: bounds.maxX, y: bounds.midY),
                                           options: [.drawsBeforeStartLocation, .drawsAfterEndLocation])
                context.restoreGState()
            }
        }
        context.endTransparencyLayer()
        context.restoreGState()
    }

    private struct GradientFragment {
        let path: CGPath
        let colors: [CGColor]
    }

    /// One gradient per singer group and wrapped line. Ruby chunks in the same
    /// source segment share a gradient rather than restarting at each annotation.
    private func gradientFragments(in frame: CTFrame) -> [GradientFragment] {
        guard !gradients.isEmpty else { return [] }
        let lines = CTFrameGetLines(frame) as! [CTLine]
        var origins = [CGPoint](repeating: .zero, count: lines.count)
        CTFrameGetLineOrigins(frame, CFRange(), &origins)
        var fragments: [GradientFragment] = []
        for (lineIndex, line) in lines.enumerated() {
            let lineRange = CTLineGetStringRange(line)
            for span in gradients where NSIntersectionRange(span.range, NSRange(location: lineRange.location, length: lineRange.length)).length > 0 {
                let path = CGMutablePath()
                for run in CTLineGetGlyphRuns(line) as! [CTRun] {
                    let count = CTRunGetGlyphCount(run)
                    let attributes = CTRunGetAttributes(run) as NSDictionary
                    guard let font = attributes[kCTFontAttributeName] else { continue }
                    let runFont = font as! CTFont
                    var glyphs = [CGGlyph](repeating: 0, count: count)
                    var positions = [CGPoint](repeating: .zero, count: count)
                    var indices = [CFIndex](repeating: 0, count: count)
                    CTRunGetGlyphs(run, CFRange(), &glyphs)
                    CTRunGetPositions(run, CFRange(), &positions)
                    CTRunGetStringIndices(run, CFRange(), &indices)
                    for index in 0..<count where NSLocationInRange(indices[index], span.range) {
                        guard let glyph = CTFontCreatePathForGlyph(runFont, glyphs[index], nil) else { continue }
                        path.addPath(glyph, transform: .init(translationX: origins[lineIndex].x + positions[index].x,
                                                            y: origins[lineIndex].y + positions[index].y))
                    }
                }
                if !path.isEmpty { fragments.append(.init(path: path, colors: span.colors)) }
            }
        }
        return fragments
    }

    func frame(in size: CGSize) -> CTFrame {
        let bounds = CGRect(x: 0, y: 0, width: max(1, size.width), height: max(1, size.height))
        // Glyph inspection can also change the framesetter's cached ruby layout.
        // Keep that cache local to each draw so Canvas redraws remain identical.
        let drawingFramesetter = CTFramesetterCreateWithAttributedString(text)
        return CTFramesetterCreateFrame(drawingFramesetter, CFRange(), CGPath(rect: bounds, transform: nil), nil)
    }
}
