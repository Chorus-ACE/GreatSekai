import SwiftUI
#if os(macOS)
import AppKit
#else
import UIKit
#endif

/// Source colors take priority; the public performer-ID contract maps 歌唱者-01…26 to game characters.
enum LyricsPerformerPalette {
    static func characterID(for sourceID: String) -> Int? {
        let value = sourceID.hasPrefix("歌唱者-") ? String(sourceID.dropFirst("歌唱者-".count)) : sourceID
        guard !value.isEmpty, value.allSatisfy({ $0.isASCII && $0.isNumber }),
              let id = Int(value), (1...26).contains(id) else { return nil }
        return id
    }

    static func color(for sourceID: String, explicitHex: String?, characterColors: [Int: Color], scheme: ColorScheme) -> Color? {
        let base = explicitHex.flatMap(RGB.init(hex:))
            ?? characterID(for: sourceID).flatMap { characterColors[$0] }.flatMap { RGB(color: $0, scheme: scheme) }
            ?? externalHex(for: sourceID).flatMap(RGB.init(hex:))
        return base?.readable(in: scheme).color
    }

    /// A shared part uses the participating singers' combined color.
    static func groupColor(ids: [String], colors: [String: Color], scheme: ColorScheme) -> Color? {
        let uniqueIDs = Array(Set(ids))
        let values = uniqueIDs.compactMap { colors[$0] }.compactMap { RGB(color: $0, scheme: scheme) }
        guard !values.isEmpty, values.count == uniqueIDs.count else { return nil }
        let count = Double(values.count)
        return RGB(red: values.reduce(0) { $0 + $1.red } / count,
                   green: values.reduce(0) { $0 + $1.green } / count,
                   blue: values.reduce(0) { $0 + $1.blue } / count,
                   alpha: values.reduce(0) { $0 + $1.alpha } / count).readable(in: scheme).color
    }

    static func cgColor(_ color: Color, scheme: ColorScheme) -> CGColor {
        (RGB(color: color, scheme: scheme) ?? RGB(red: 0.5, green: 0.5, blue: 0.5)).cgColor
    }

    // Reserved external singer IDs are separate from gameCharacters. Color values follow the public performer registry.
    private static func externalHex(for sourceID: String) -> String? {
        let id: Int?
        if sourceID.hasPrefix("外部歌唱者-") {
            id = Int(sourceID.dropFirst("外部歌唱者-".count))
        } else {
            id = Int(sourceID).flatMap { $0 >= 1000 ? $0 - 1000 : nil }
        }
        guard let id else { return nil }
        return [1: "#70B85A", 2: "#D83B67", 3: "#7B6A84", 6: "#6F73C8", 7: "#8A8A91",
                8: "#A66D87", 9: "#4A89A8", 11: "#78AF54", 12: "#4F5A4B", 13: "#E56E1B",
                14: "#563E8E", 15: "#506D87", 16: "#31A1B5", 17: "#B86D46", 18: "#4D8FCC",
                19: "#D75C58", 28: "#FFB1C4", 30: "#8EC31F", 31: "#00A3E0"][id]
    }

    private struct RGB {
        let red: Double
        let green: Double
        let blue: Double
        let alpha: Double

        init(red: Double, green: Double, blue: Double, alpha: Double = 1) {
            self.red = red; self.green = green; self.blue = blue; self.alpha = alpha
        }

        init?(hex: String) {
            var value = hex.hasPrefix("#") ? String(hex.dropFirst()) : hex
            if value.count == 3 { value = value.map { String(repeating: String($0), count: 2) }.joined() }
            guard [6, 8].contains(value.count), let number = UInt64(value, radix: 16) else { return nil }
            let rgb = value.count == 8 ? number >> 8 : number
            red = Double((rgb >> 16) & 255) / 255
            green = Double((rgb >> 8) & 255) / 255
            blue = Double(rgb & 255) / 255
            alpha = value.count == 8 ? Double(number & 255) / 255 : 1
        }

        init?(color: Color, scheme: ColorScheme) {
            #if os(macOS)
            let appearance = NSAppearance(named: scheme == .dark ? .darkAqua : .aqua)!
            var resolved: NSColor?
            appearance.performAsCurrentDrawingAppearance {
                resolved = NSColor(color).usingColorSpace(.sRGB)
            }
            guard let resolved else { return nil }
            red = resolved.redComponent; green = resolved.greenComponent; blue = resolved.blueComponent; alpha = resolved.alphaComponent
            #else
            let traits = UITraitCollection(userInterfaceStyle: scheme == .dark ? .dark : .light)
            let resolved = UIColor(color).resolvedColor(with: traits)
            var r: CGFloat = 0, g: CGFloat = 0, b: CGFloat = 0, a: CGFloat = 0
            guard resolved.getRed(&r, green: &g, blue: &b, alpha: &a) else { return nil }
            red = Double(r); green = Double(g); blue = Double(b); alpha = Double(a)
            #endif
        }

        var color: Color { Color(.sRGB, red: red, green: green, blue: blue, opacity: alpha) }
        var cgColor: CGColor { CGColor(srgbRed: red, green: green, blue: blue, alpha: alpha) }
        var luminance: Double {
            func linear(_ c: Double) -> Double { c <= 0.04045 ? c / 12.92 : pow((c + 0.055) / 1.055, 2.4) }
            return 0.2126 * linear(red) + 0.7152 * linear(green) + 0.0722 * linear(blue)
        }

        func readable(in scheme: ColorScheme) -> RGB {
            let background = scheme == .dark ? 0.015 : 0.94
            func contrast(_ color: RGB) -> Double {
                (max(color.luminance, background) + 0.05) / (min(color.luminance, background) + 0.05)
            }
            if contrast(self) >= 4.5 { return self }
            let target = scheme == .dark ? 1.0 : 0.0
            for step in 1...40 {
                let amount = Double(step) / 40
                let value = RGB(red: red + (target - red) * amount,
                                green: green + (target - green) * amount,
                                blue: blue + (target - blue) * amount, alpha: alpha)
                if contrast(value) >= 4.5 { return value }
            }
            return RGB(red: target, green: target, blue: target, alpha: alpha)
        }
    }
}
