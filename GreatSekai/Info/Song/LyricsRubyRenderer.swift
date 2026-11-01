import CoreText
import Foundation

/// Core Text keeps furigana attached to its base characters, including when a line wraps.
struct LyricsRubyRenderer {
    struct Span {
        let text: String
        var reading: String? = nil
        var color: CGColor? = nil
    }

    let text: NSAttributedString
    let fontSize: CGFloat
    let hasReadings: Bool
    private let framesetter: CTFramesetter
    private let topInset: CGFloat

    init(spans: [Span], fontSize: CGFloat, textColor: CGColor, readingColor: CGColor) {
        self.fontSize = fontSize
        hasReadings = spans.contains { !($0.reading?.isEmpty ?? true) && !$0.text.isEmpty }
        topInset = hasReadings ? ceil(fontSize * 0.65) : 0
        let font = CTFontCreateUIFontForLanguage(.system, fontSize, "ja" as CFString)
            ?? CTFontCreateWithName("HiraginoSans-W3" as CFString, fontSize, nil)
        var lineSpacing: CGFloat = hasReadings ? ceil(fontSize * 0.65) + 1 : 1
        let paragraph = withUnsafePointer(to: &lineSpacing) { spacing in
            var setting = CTParagraphStyleSetting(spec: .lineSpacingAdjustment,
                                                 valueSize: MemoryLayout<CGFloat>.size, value: spacing)
            return CTParagraphStyleCreate(&setting, 1)
        }
        let result = NSMutableAttributedString(string: "")
        for span in spans {
            let start = result.length
            result.append(NSAttributedString(string: span.text, attributes: [
                NSAttributedString.Key(kCTFontAttributeName as String): font,
                NSAttributedString.Key(kCTForegroundColorAttributeName as String): span.color ?? textColor,
                NSAttributedString.Key(kCTParagraphStyleAttributeName as String): paragraph
            ]))
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
        framesetter = CTFramesetterCreateWithAttributedString(text)
    }

    func size(fitting width: CGFloat) -> CGSize {
        let width = max(1, width)
        let measured = CTFramesetterSuggestFrameSizeWithConstraints(
            framesetter, CFRange(), nil, CGSize(width: width, height: .greatestFiniteMagnitude), nil
        )
        return CGSize(width: ceil(min(width, measured.width)), height: ceil(measured.height) + topInset + 2)
    }

    func draw(in context: CGContext, size: CGSize) {
        context.saveGState()
        context.textMatrix = .identity
        context.translateBy(x: 0, y: size.height)
        context.scaleBy(x: 1, y: -1)
        CTFrameDraw(frame(in: size), context)
        context.restoreGState()
    }

    func frame(in size: CGSize) -> CTFrame {
        let bounds = CGRect(x: 0, y: 0, width: max(1, size.width), height: max(1, size.height - topInset))
        return CTFramesetterCreateFrame(framesetter, CFRange(), CGPath(rect: bounds, transform: nil), nil)
    }
}
