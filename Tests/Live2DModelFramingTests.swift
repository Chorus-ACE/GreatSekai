import Astray
import CoreGraphics
import Foundation
import ImageIO
import Metal
import UniformTypeIdentifiers

@main @MainActor struct Live2DModelFramingTests {
    private static func complete(_ command: any MTLCommandBuffer) { command.waitUntilCompleted() }
    static func main() async throws {
        let catalog = try await Live2DCatalog.load()
        let model = catalog.models.first { $0.id == "v2_21miku_normal" }!
        let native = NativeLive2DPlayer()
        await native.load(model, catalog: catalog)
        precondition(native.error == nil, native.error ?? "")
        let initialPose = try native.renderer!.modelParameters()
        for id in ["ParamArmL1", "ParamArmR1"] {
            precondition(abs(initialPose.first { $0.id == id }!.value + 38) < 0.001,
                         "Models without idle clips must start with relaxed arms")
        }
        native.activity(paused: false, active: true)
        let renderer = native.renderer!
        // A distinct solid backdrop lets us measure visible pixels, including black shoes.
        let data = NSMutableData()
        let context = CGContext(data: nil, width: 1, height: 1, bitsPerComponent: 8, bytesPerRow: 4,
            space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
        context.setFillColor(CGColor(red: 0, green: 1, blue: 0, alpha: 1))
        context.fill(CGRect(x: 0, y: 0, width: 1, height: 1))
        let destination = CGImageDestinationCreateWithData(data, UTType.png.identifier as CFString, 1, nil)!
        CGImageDestinationAddImage(destination, context.makeImage()!, nil)
        precondition(CGImageDestinationFinalize(destination))
        try renderer.setBackdrop(data as Data)
        for (width, height) in [(1280, 720), (800, 800), (600, 1000)] {
            let descriptor = MTLTextureDescriptor.texture2DDescriptor(pixelFormat: .bgra8Unorm, width: width, height: height, mipmapped: false)
            descriptor.usage = [.renderTarget, .shaderRead]; descriptor.storageMode = .shared
            let target = renderer.device.makeTexture(descriptor: descriptor)!
            var previousTime = 0.0
            for time in [0.0, 0.3, 1.5, 3.0] {
                native.player.advance(by: time - previousTime)
                previousTime = time
                let command = try renderer.render(to: target)
                complete(command)
                var bytes = [UInt8](repeating: 0, count: width * height * 4)
                target.getBytes(&bytes, bytesPerRow: width * 4, from: .init(origin: .init(), size: .init(width: width, height: height, depth: 1)), mipmapLevel: 0)
                if width == 1280, time == 0, let path = ProcessInfo.processInfo.environment["SEKAI_FRAMING_IMAGE"] {
                    let provider = CGDataProvider(data: Data(bytes) as CFData)!
                    let image = CGImage(width: width, height: height, bitsPerComponent: 8, bitsPerPixel: 32, bytesPerRow: width * 4,
                        space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGBitmapInfo(rawValue: CGImageAlphaInfo.premultipliedFirst.rawValue).union(.byteOrder32Little),
                        provider: provider, decode: nil, shouldInterpolate: false, intent: .defaultIntent)!
                    let png = CGImageDestinationCreateWithURL(URL(filePath: path) as CFURL, UTType.png.identifier as CFString, 1, nil)!
                    CGImageDestinationAddImage(png, image, nil); precondition(CGImageDestinationFinalize(png))
                    print("Background pixel:", Array(bytes[0..<4]))
                }
                let lastRow = (0..<height).reversed().first { y in
                    let halfBody = Int(Double(height) * 0.08)
                    return (max(0, width / 2 - halfBody)..<min(width, width / 2 + halfBody)).contains { x in
                        let p = (y * width + x) * 4
                        return bytes[p + 1] < 230 || bytes[p] > 20 || bytes[p + 2] > 20
                    }
                } ?? -1
                print("Miku \(width)x\(height) time \(time): bottom gap \(height - 1 - lastRow) px")
                precondition(lastRow >= height - 3, "Miku's visible feet must reach the canvas bottom")
            }
        }
        native.close()
        print("PASS: default Miku's visible feet stay on the bottom across viewport sizes and animation")
    }
}
