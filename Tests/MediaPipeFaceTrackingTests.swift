import CoreGraphics
import CoreVideo
import Foundation
import ImageIO
import SekaiMediaPipe
import simd

@main struct MediaPipeFaceTrackingTests {
    static func main() throws {
        let url = URL(filePath: CommandLine.arguments[1])
        let source = CGImageSourceCreateWithURL(url as CFURL, nil)!
        let image = CGImageSourceCreateImageAtIndex(source, 0, nil)!
        let tracker = try MediaPipeFaceLandmarker()
        var rotations = Set<Int>()
        var timestamp = 0
        let started = ContinuousClock.now
        for angle in [0.0, 3, 6, 9, 12] {
            let buffer = pixels(image, angle: angle)
            var face: MediaPipeFace?
            for _ in 0..<5 {
                timestamp += 34
                face = try tracker.detect(buffer, timestampMilliseconds: timestamp)
            }
            guard let face else { preconditionFailure("MediaPipe must detect the public sample face") }
            precondition(face.transform.count == 16 && face.transform.allSatisfy(\.isFinite))
            precondition(face.blendShapes.count >= 50)
            precondition(face.blendShapes["eyeBlinkLeft"] != nil && face.blendShapes["jawOpen"] != nil)
            precondition(face.blendShapes.values.allSatisfy { $0.isFinite && (0...1).contains($0) })
            precondition(face.bounds.width > 0 && face.bounds.height > 0)
            let pose = Live2DTrackedFace(transform: face.transform, blendShapes: face.blendShapes, isNearEdge: false)!
            let identity = simd_quatf(angle: 0, axis: SIMD3<Float>(0, 1, 0))
            let roll = pose.parameters(relativeTo: identity)["ParamAngleZ"]!
            rotations.insert(Int((roll * 10).rounded()))
            print("Input roll \(angle)°, output \(roll)°, \(face.blendShapes.count) expressions")
        }
        print("25 tracking frames:", started.duration(to: .now))
        precondition(rotations.count >= 4, "Small rotations must produce continuous pose measurements")
        let black = pixels(nil, angle: 0)
        var missing: MediaPipeFace?
        for _ in 0..<5 {
            timestamp += 34
            missing = try tracker.detect(black, timestampMilliseconds: timestamp)
        }
        precondition(missing == nil, "Lost faces must be reported so the viewer can ease to neutral")
        print("PASS: actual MediaPipe inference, continuous pose, expression scores, calibrated parameter mapping and face loss")
    }

    private static func pixels(_ image: CGImage?, angle: Double) -> CVPixelBuffer {
        let width = 640, height = 480
        var buffer: CVPixelBuffer?
        precondition(CVPixelBufferCreate(kCFAllocatorDefault, width, height, kCVPixelFormatType_32BGRA,
            [kCVPixelBufferCGImageCompatibilityKey: true, kCVPixelBufferCGBitmapContextCompatibilityKey: true] as CFDictionary, &buffer) == kCVReturnSuccess)
        CVPixelBufferLockBaseAddress(buffer!, [])
        defer { CVPixelBufferUnlockBaseAddress(buffer!, []) }
        let context = CGContext(data: CVPixelBufferGetBaseAddress(buffer!), width: width, height: height,
            bitsPerComponent: 8, bytesPerRow: CVPixelBufferGetBytesPerRow(buffer!), space: CGColorSpaceCreateDeviceRGB(),
            bitmapInfo: CGBitmapInfo.byteOrder32Little.rawValue | CGImageAlphaInfo.premultipliedFirst.rawValue)!
        context.setFillColor(CGColor(gray: image == nil ? 0 : 1, alpha: 1))
        context.fill(CGRect(x: 0, y: 0, width: width, height: height))
        if let image {
            let scale = min(CGFloat(width) / CGFloat(image.width), CGFloat(height) / CGFloat(image.height))
            context.translateBy(x: CGFloat(width) / 2, y: CGFloat(height) / 2)
            context.rotate(by: angle * .pi / 180)
            let w = CGFloat(image.width) * scale, h = CGFloat(image.height) * scale
            context.draw(image, in: CGRect(x: -w / 2, y: -h / 2, width: w, height: h))
        }
        return buffer!
    }
}
