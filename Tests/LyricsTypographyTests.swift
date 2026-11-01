import AppKit
import CoreText
import ImageIO
import SwiftUI

@main
struct LyricsTypographyTests {
    @MainActor
    static func main() throws {
        precondition(LyricsPerformerPalette.characterID(for: "歌唱者-05") == 5)
        precondition(LyricsPerformerPalette.characterID(for: "21") == 21)
        for id in ["外部歌唱者-01", "unknown", "歌唱者-27", "歌唱者-+5"] {
            precondition(LyricsPerformerPalette.characterID(for: id) == nil)
        }
        let masters: [Int: Color] = [5: .orange, 7: .pink, 8: .green, 21: .mint]
        let pink = LyricsPerformerPalette.color(for: "歌唱者-07", explicitHex: nil, characterColors: masters, scheme: .light)!
        let green = LyricsPerformerPalette.color(for: "歌唱者-08", explicitHex: nil, characterColors: masters, scheme: .light)!
        let pinkCG = LyricsPerformerPalette.cgColor(pink, scheme: .light)
        let greenCG = LyricsPerformerPalette.cgColor(green, scheme: .light)
        precondition(pinkCG.components != greenCG.components)
        let explicit = LyricsPerformerPalette.color(for: "歌唱者-07", explicitHex: "#336699", characterColors: masters, scheme: .light)!
        let explicitWithoutMaster = LyricsPerformerPalette.color(for: "歌唱者-07", explicitHex: "#336699", characterColors: [:], scheme: .light)!
        precondition(LyricsPerformerPalette.cgColor(explicit, scheme: .light).components == LyricsPerformerPalette.cgColor(explicitWithoutMaster, scheme: .light).components)
        precondition(LyricsPerformerPalette.color(for: "外部歌唱者-01", explicitHex: nil, characterColors: [:], scheme: .light) != nil)
        precondition(LyricsPerformerPalette.color(for: "unknown", explicitHex: "invalid", characterColors: [:], scheme: .light) == nil)
        let transparent = LyricsPerformerPalette.color(for: "custom", explicitHex: "#33669900", characterColors: [:], scheme: .light)!
        precondition(LyricsPerformerPalette.cgColor(transparent, scheme: .light).alpha == 0)
        let group = LyricsPerformerPalette.groupColor(ids: ["a", "b", "a"], colors: ["a": .red, "b": .blue], scheme: .light)!
        let mixed = LyricsPerformerPalette.cgColor(group, scheme: .light).components!
        precondition(mixed[0] > 0 && mixed[2] > 0)
        precondition(LyricsPerformerPalette.groupColor(ids: ["a", "missing"], colors: ["a": .red], scheme: .light) == nil)
        for scheme: ColorScheme in [.light, .dark] {
            let extreme = scheme == .light ? "#FFFFFF" : "#000000"
            let adjusted = LyricsPerformerPalette.color(for: "custom", explicitHex: extreme, characterColors: [:], scheme: scheme)!
            let components = LyricsPerformerPalette.cgColor(adjusted, scheme: scheme).components!
            precondition(scheme == .light ? components[0] < 0.7 : components[0] > 0.4)
        }

        let spans: [LyricsRubyRenderer.Span] = [
            .init(text: "🎵 "), .init(text: "人生", reading: "じんせい", color: pinkCG),
            .init(text: "は", color: pinkCG), .init(text: "甘", reading: "あま", color: greenCG),
            .init(text: "い", color: greenCG), .init(text: "味", reading: "あじ", color: greenCG)
        ]
        let renderer = LyricsRubyRenderer(spans: spans, fontSize: 26, textColor: CGColor(gray: 0, alpha: 1), readingColor: CGColor(gray: 0.35, alpha: 1))
        precondition(renderer.text.string == "🎵 人生は甘い味")
        let rubyKey = NSAttributedString.Key(kCTRubyAnnotationAttributeName as String)
        var range = NSRange()
        let ruby = renderer.text.attribute(rubyKey, at: 3, effectiveRange: &range) as! CTRubyAnnotation
        precondition(range == NSRange(location: 3, length: 2))
        precondition(CTRubyAnnotationGetTextForPosition(ruby, .before) as String? == "じんせい")
        precondition(renderer.text.attribute(rubyKey, at: 0, effectiveRange: nil) == nil)
        let wide = renderer.size(fitting: 600)
        let narrow = renderer.size(fitting: 80)
        precondition(narrow.height > wide.height)
        for width: CGFloat in [80, 140, 600] {
            let size = CGSize(width: width, height: renderer.size(fitting: width).height)
            let visible = CTFrameGetVisibleStringRange(renderer.frame(in: size))
            precondition(visible.location == 0 && visible.length == renderer.text.length, "Ruby layout clipped at width \(width)")
        }

        let size = CGSize(width: 380, height: wide.height + 12)
        let scale: CGFloat = 2
        let context = CGContext(data: nil, width: Int(size.width * scale), height: Int(size.height * scale), bitsPerComponent: 8,
                                bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
        context.scaleBy(x: scale, y: scale)
        context.setFillColor(CGColor(gray: 1, alpha: 1)); context.fill(CGRect(origin: .zero, size: size))
        // Match Canvas's top-left coordinate system.
        context.translateBy(x: 0, y: size.height); context.scaleBy(x: 1, y: -1)
        renderer.draw(in: context, size: size)
        if let image = context.makeImage(), let path = ProcessInfo.processInfo.environment["SEKAI_RUBY_PREVIEW"] {
            let destination = CGImageDestinationCreateWithURL(URL(filePath: path) as CFURL, "public.png" as CFString, 1, nil)!
            CGImageDestinationAddImage(destination, image, nil); precondition(CGImageDestinationFinalize(destination))
        }
        print("Lyrics typography checks passed: performer mapping, source colors, group colors, contrast, ruby ranges, Unicode, and wrapping without clipping.")
    }
}
