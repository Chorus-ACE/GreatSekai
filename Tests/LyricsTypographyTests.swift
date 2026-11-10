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
        let group = LyricsPerformerPalette.groupColors(ids: ["a", "b", "a"], colors: ["a": .red, "b": .blue], scheme: .light)
        precondition(group.count == 2)
        let reverse = LyricsPerformerPalette.groupColors(ids: ["b", "a"], colors: ["a": .red, "b": .blue], scheme: .light)
        precondition(LyricsPerformerPalette.cgColor(group[0], scheme: .light).components == LyricsPerformerPalette.cgColor(reverse[1], scheme: .light).components)
        precondition(LyricsPerformerPalette.cgColor(group[1], scheme: .light).components == LyricsPerformerPalette.cgColor(reverse[0], scheme: .light).components)
        precondition(LyricsPerformerPalette.groupColors(ids: ["a", "missing"], colors: ["a": .red], scheme: .light).isEmpty)
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

        let red = CGColor(srgbRed: 1, green: 0, blue: 0, alpha: 1)
        let blue = CGColor(srgbRed: 0, green: 0, blue: 1, alpha: 1)
        let shared = LyricsRubyRenderer(spans: [
            .init(text: "🎵 "),
            .init(text: "一緒", reading: "いっしょ", color: red, gradient: [red, blue], gradientID: 0),
            .init(text: "に", color: red, gradient: [red, blue], gradientID: 0),
            .init(text: "歌", reading: "うた", color: red, gradient: [red, blue], gradientID: 0),
            .init(text: "おう", color: red, gradient: [red, blue], gradientID: 0),
            .init(text: "　独唱", color: greenCG)
        ], fontSize: 26, textColor: CGColor(gray: 0, alpha: 1), readingColor: CGColor(gray: 0.35, alpha: 1))
        precondition(shared.gradients.count == 1)
        precondition(shared.gradients[0].range == NSRange(location: 3, length: 6), "Ruby chunks share one UTF-16 gradient range")
        precondition(shared.text.string == "🎵 一緒に歌おう　独唱")
        for width: CGFloat in [80, 140, 600] {
            let size = CGSize(width: width, height: shared.size(fitting: width).height)
            let visible = CTFrameGetVisibleStringRange(shared.frame(in: size))
            precondition(visible.location == 0 && visible.length == shared.text.length, "Gradient/ruby wrapping clipped")
        }

        let rainbow = LyricsRubyRenderer(spans: [.init(text: "MMMMMMMMMMMMMMMM", color: red,
            gradient: [red, CGColor(srgbRed: 0, green: 1, blue: 0, alpha: 1), blue])], fontSize: 26,
            textColor: CGColor(gray: 0, alpha: 1), readingColor: CGColor(gray: 0.35, alpha: 1))
        let bitmap = CGContext(data: nil, width: 400, height: 80, bitsPerComponent: 8, bytesPerRow: 1600,
            space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
        bitmap.setFillColor(CGColor(gray: 1, alpha: 1)); bitmap.fill(CGRect(x: 0, y: 0, width: 400, height: 80))
        bitmap.translateBy(x: 0, y: 80); bitmap.scaleBy(x: 1, y: -1)
        rainbow.draw(in: bitmap, size: CGSize(width: 400, height: 80))
        let pixels = bitmap.data!.assumingMemoryBound(to: UInt8.self)
        var dominant = [0, 0, 0]
        var positions = [0, 0, 0]
        for y in 0..<80 { for x in 0..<400 {
            let offset = y * 1600 + x * 4
            let rgb = (0..<3).map { Int(pixels[offset + $0]) }
            for channel in 0..<3 where rgb[channel] > 80 && (0..<3).filter({ $0 != channel }).allSatisfy({ rgb[channel] > rgb[$0] * 2 }) {
                dominant[channel] += 1; positions[channel] += x
            }
        } }
        precondition(dominant.allSatisfy { $0 > 50 }, "Render all singers' colors rather than a mixed solid")
        precondition(positions[0] / dominant[0] < positions[1] / dominant[1] && positions[1] / dominant[1] < positions[2] / dominant[2], "Gradient runs left to right in singer order")

        let size = CGSize(width: 380, height: shared.size(fitting: 380).height + 12)
        let scale: CGFloat = 2
        let context = CGContext(data: nil, width: Int(size.width * scale), height: Int(size.height * scale), bitsPerComponent: 8,
                                bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
        context.scaleBy(x: scale, y: scale)
        context.setFillColor(CGColor(gray: 1, alpha: 1)); context.fill(CGRect(origin: .zero, size: size))
        // Match Canvas's top-left coordinate system.
        context.translateBy(x: 0, y: size.height); context.scaleBy(x: 1, y: -1)
        shared.draw(in: context, size: size)
        if let image = context.makeImage(), let path = ProcessInfo.processInfo.environment["SEKAI_RUBY_PREVIEW"] {
            let destination = CGImageDestinationCreateWithURL(URL(filePath: path) as CFURL, "public.png" as CFString, 1, nil)!
            CGImageDestinationAddImage(destination, image, nil); precondition(CGImageDestinationFinalize(destination))
        }
        print("Lyrics typography checks passed: performer mapping, source colors, ordered singer gradients, contrast, ruby ranges, Unicode, gradient pixels and wrapping without clipping.")
    }
}
