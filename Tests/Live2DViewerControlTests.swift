import Astray
import CoreGraphics
import Foundation
import ImageIO
import Metal
import UniformTypeIdentifiers
import simd

/// Local Cubism fixture: no network or app window is needed.
@main @MainActor struct Live2DViewerControlTests {
    private static func complete(_ command: any MTLCommandBuffer) {
        command.waitUntilCompleted()
        precondition(command.status == .completed)
    }

    static func main() async throws {
        let neutralFace = Live2DFaceSample().parameters
        precondition(neutralFace["ParamEyeLOpen"] == 1 && neutralFace["ParamMouthOpenY"] == 0)
        let expressiveFace = Live2DFaceSample(pitch: .nan, yaw: 90, roll: -45,
            blendShapes: ["eyeBlinkLeft": 0.75, "jawOpen": 0.8, "mouthSmileLeft": 1, "mouthSmileRight": 1]).parameters
        precondition(expressiveFace["ParamAngleX"] == 30 && expressiveFace["ParamAngleY"] == 0)
        precondition(expressiveFace["ParamAngleZ"] == -30 && expressiveFace["ParamEyeLOpen"] == 0.25)
        precondition(expressiveFace["ParamMouthOpenY"] == 0.8 && expressiveFace["ParamMouthForm"] == 1)
        precondition(expressiveFace.values.allSatisfy(\.isFinite))
        let arPitch = simd_float3x3(simd_quatf(angle: 10 * .pi / 180, axis: SIMD3<Float>(1, 0, 0)))
        let arYaw = simd_float3x3(simd_quatf(angle: 12 * .pi / 180, axis: SIMD3<Float>(0, 1, 0)))
        precondition(abs(Live2DFaceSample.arKit(relativeRotation: arPitch, blendShapes: [:]).parameters["ParamAngleY"]! + 10) < 0.001,
                     "ARKit pitch must use the corrected up/down direction")
        precondition(abs(Live2DFaceSample.arKit(relativeRotation: arYaw, blendShapes: [:]).parameters["ParamAngleX"]! - 12) < 0.001)
        let arLeft = Live2DFaceSample.arKit(relativeRotation: matrix_identity_float3x3, blendShapes: [:], facePositionX: 0.25).parameters
        let arRight = Live2DFaceSample.arKit(relativeRotation: matrix_identity_float3x3, blendShapes: [:], facePositionX: 0.75).parameters
        precondition(arLeft["ParamBodyAngleZ"]! < 0 && arRight["ParamBodyAngleZ"]! > 0,
                     "ARKit projected positions must use the corrected iOS body direction")
        let leftBody = Live2DFaceSample(horizontalPosition: -0.5).parameters
        let rightBody = Live2DFaceSample(horizontalPosition: 0.5).parameters
        precondition(leftBody["ParamBodyAngleX"]! < 0 && leftBody["ParamBodyAngleZ"]! < 0)
        precondition(rightBody["ParamBodyAngleX"]! > 0 && rightBody["ParamBodyAngleZ"]! > 0,
                     "Moving across the camera must lean the body even without turning the head")
        precondition(Live2DFaceSample(horizontalPosition: .nan).parameters.values.allSatisfy(\.isFinite))
        var blink = Live2DFacePoseFilter()
        blink.follow(["ParamEyeLOpen": 0, "ParamEyeROpen": 1])
        for frame in 0..<4 { _ = blink.sample(at: Double(frame) / 60) }
        precondition(blink.values["ParamEyeLOpen"] == 0 && blink.values["ParamEyeROpen"] == 1,
                     "Short blinks must reach the fully closed pose without closing the other eye")
        var pose = Live2DFacePoseFilter()
        pose.follow(["ParamAngleX": 20, "ParamEyeLOpen": 0])
        let firstPose = pose.sample(at: 0)
        precondition(firstPose["ParamAngleX"]! > 0 && firstPose["ParamAngleX"]! < 20,
                     "Camera samples must blend into the displayed pose")
        for frame in 1...60 { _ = pose.sample(at: Double(frame) / 60) }
        let trackedPose = pose.values
        pose.returnToNeutral()
        let firstLostPose = pose.sample(at: 61.0 / 60)
        precondition(firstLostPose["ParamAngleX"]! > 0 && firstLostPose["ParamAngleX"]! < trackedPose["ParamAngleX"]!)
        precondition(firstLostPose["ParamEyeLOpen"]! > trackedPose["ParamEyeLOpen"]! && firstLostPose["ParamEyeLOpen"]! < 1,
                     "Losing a face must ease back to an open-eyed neutral pose, not snap")
        var previousAngle = firstLostPose["ParamAngleX"]!
        for frame in 62...150 {
            let values = pose.sample(at: Double(frame) / 60)
            precondition(values["ParamAngleX"]! <= previousAngle)
            previousAngle = values["ParamAngleX"]!
        }
        precondition(previousAngle < 0.01 && pose.values["ParamEyeLOpen"]! > 0.999)
        pose.follow(["ParamAngleX": -15])
        let reacquiredPose = pose.sample(at: 151.0 / 60)
        precondition(reacquiredPose["ParamAngleX"]! < 0 && reacquiredPose["ParamAngleX"]! > -15,
                     "Reacquiring a face must blend in rather than jump")
        pose.reset()
        precondition(pose.sample(at: 3).isEmpty)
        precondition(!Live2DFacePoseFilter.isNearEdge(CGRect(x: 0.3, y: 0.25, width: 0.4, height: 0.5)))
        precondition(Live2DFacePoseFilter.isNearEdge(CGRect(x: 0.02, y: 0.25, width: 0.4, height: 0.5)))
        precondition(Live2DFacePoseFilter.isNearEdge(CGRect(x: 0.3, y: 0.5, width: 0.4, height: 0.45)))
        let edgeRecovery = CGRect(x: 0.1, y: 0.25, width: 0.4, height: 0.5)
        precondition(!Live2DFacePoseFilter.isNearEdge(edgeRecovery) && Live2DFacePoseFilter.isNearEdge(edgeRecovery, wasNearEdge: true),
                     "Edge warnings need hysteresis to avoid flickering")
        #if os(macOS)
        func trackedFace(_ rotation: simd_quatf) -> Live2DTrackedFace {
            let matrix = simd_float4x4(rotation)
            let transform = (0..<4).flatMap { row in (0..<4).map { matrix[$0][row] } }
            return Live2DTrackedFace(transform: transform,
                blendShapes: ["eyeBlinkLeft": 0.75, "jawOpen": 0.8], isNearEdge: false)!
        }
        let identity = simd_quatf(angle: 0, axis: SIMD3<Float>(0, 1, 0))
        let pitchPose = trackedFace(simd_quatf(angle: 10 * .pi / 180, axis: SIMD3<Float>(1, 0, 0)))
        let yawPose = trackedFace(simd_quatf(angle: 12 * .pi / 180, axis: SIMD3<Float>(0, 1, 0)))
        let rollPose = trackedFace(simd_quatf(angle: 8 * .pi / 180, axis: SIMD3<Float>(0, 0, 1)))
        precondition(abs(pitchPose.parameters(relativeTo: identity)["ParamAngleY"]! - 10) < 0.001)
        precondition(abs(yawPose.parameters(relativeTo: identity)["ParamAngleX"]! - 12) < 0.001,
                     "MediaPipe yaw must use the corrected left/right direction")
        precondition(abs(rollPose.parameters(relativeTo: identity)["ParamAngleZ"]! + 8) < 0.001)
        precondition(abs(pitchPose.parameters(relativeTo: pitchPose.orientation)["ParamAngleY"]!) < 0.001,
                     "Recalibration must reset the head center")
        let independentEyes = yawPose.parameters(relativeTo: identity)
        precondition(independentEyes["ParamEyeLOpen"] == 1 && independentEyes["ParamEyeROpen"] == 0,
                     "macOS winks must use the corrected model eye and reach full closure")
        for (score, expected) in [(Float(0.02), Float(1)), (0.35, 0.5), (0.65, 0), (1, 0)] {
            let matrix = matrix_identity_float4x4
            let transform = (0..<4).flatMap { row in (0..<4).map { matrix[$0][row] } }
            let face = Live2DTrackedFace(transform: transform, blendShapes: ["eyeBlinkRight": score],
                                       isNearEdge: false, horizontalPosition: -0.5)!
            let parameters = face.parameters(relativeTo: identity)
            precondition(abs(parameters["ParamEyeLOpen"]! - expected) < 0.001)
            precondition(parameters["ParamEyeROpen"] == 1)
            precondition(parameters["ParamBodyAngleZ"]! < 0)
        }
        precondition(yawPose.parameters(relativeTo: identity)["ParamMouthOpenY"] == 0.8)
        precondition(Live2DTrackedFace(transform: [Float](repeating: .nan, count: 16), blendShapes: [:], isNearEdge: false) == nil)
        precondition(Live2DTrackedFace(transform: [Float](repeating: 0, count: 16), blendShapes: [:], isNearEdge: false) == nil)
        let capture = Live2DFaceCapture()
        var released = false
        capture.onParameters = { released = $0.isEmpty }
        capture.stop()
        precondition(released && !capture.isEnabled, "Stopping capture must release animation parameters")
        #endif
        let repository = URL(filePath: CommandLine.arguments[1])
        let fixture = FileManager.default.temporaryDirectory.appending(path: "Live2DControls-\(UUID().uuidString)")
        defer { try? FileManager.default.removeItem(at: fixture) }
        let root = fixture.appending(path: "jp-assets")
        try FileManager.default.createDirectory(at: root.appending(path: "story-player"), withIntermediateDirectories: true)
        try FileManager.default.createSymbolicLink(at: root.appending(path: "Haru"),
            withDestinationURL: repository.appending(path: "Packages/Astray/Vendor/CubismNativeSamples/Samples/Resources/Haru"))
        let entry: [String: Any] = ["dir": "Haru", "model3": "Haru.model3.json", "physics": "Haru.physics3.json", "motions": ["Idle_0"]]
        let index = try JSONSerialization.data(withJSONObject: ["models": ["HaruA": entry, "HaruB": entry], "movies": [:], "se": [:]])
        try index.write(to: root.appending(path: "story-player/index.json"))
        let catalog = try Live2DCatalog.decode(index: index, characters: Data("[]".utf8), root: root)
        let native = NativeLive2DPlayer()
        precondition(native.player.isModelBreathSwayEnabled, "Sway starts enabled in the viewer")
        await native.load(catalog.models[0], catalog: catalog)
        precondition(native.error == nil && !native.loading, native.error ?? "loading")
        precondition(!native.parameters.isEmpty && native.parameters.allSatisfy { $0.minimum <= $0.maximum })
        precondition(native.initialMotion == "Idle_0")
        precondition(abs(native.player.stage.characters.values.first!.scale - 0.58) < 0.001, "Viewer scale: \(native.player.stage.characters.values.first!.scale)")
        let renderer = native.renderer!
        let start = ContinuousClock.now
        for _ in 0..<1000 { _ = try renderer.modelParameters() }
        print("Parameter snapshots (1000):", start.duration(to: .now))
        precondition(renderer.anchorsModelToBottom)
        native.player.isModelBreathEnabled = false
        native.player.isModelBreathSwayEnabled = false
        native.activity(paused: true, active: true)
        precondition(!native.player.isModelMotionLooping, "Viewer motion looping defaults to off")
        let descriptor = MTLTextureDescriptor.texture2DDescriptor(pixelFormat: .bgra8Unorm, width: 800, height: 800, mipmapped: false)
        descriptor.usage = [.renderTarget, .shaderRead]; descriptor.storageMode = .shared
        let target = renderer.device.makeTexture(descriptor: descriptor)!
        func pixels() throws -> [UInt8] {
            complete(try renderer.render(to: target))
            var bytes = [UInt8](repeating: 0, count: 800 * 800 * 4)
            target.getBytes(&bytes, bytesPerRow: 3200, from: .init(origin: .init(x: 0, y: 0, z: 0), size: .init(width: 800, height: 800, depth: 1)), mipmapLevel: 0)
            return bytes
        }
        let initial = try pixels()
        let bottomPixels = stride(from: 797 * 3200, to: initial.count, by: 4).filter {
            initial[$0] > 10 || initial[$0 + 1] > 10 || initial[$0 + 2] > 10
        }.count
        precondition(bottomPixels > 5, "The model must reach the canvas bottom: \(bottomPixels)")
        let angle = native.parameters.first { $0.id == "ParamAngleX" }!
        native.player.modelParameterOverrides[angle.id] = angle.maximum + 100
        let overridden = try pixels()
        precondition(zip(initial, overridden).contains { $0 != $1 }, "Paused slider edits must redraw immediately")
        let clamped = try renderer.modelParameters().first { $0.id == angle.id }!.value
        precondition(abs(clamped - angle.maximum) < 0.001, "Respect the model-authored range")
        native.player.modelParameterOverrides = [:]
        _ = try pixels()
        let reset = try renderer.modelParameters().first { $0.id == angle.id }!.value
        precondition(abs(reset - angle.maximum) > 1, "Reset must release the animation override")
        native.player.modelFaceTrackingValues = [angle.id: 7, "ParamMouthOpenY": 0.8]
        _ = try pixels()
        let tracked = try renderer.modelParameters()
        precondition(abs(tracked.first { $0.id == angle.id }!.value - 7) < 0.001)
        precondition(abs(tracked.first { $0.id == "ParamMouthOpenY" }!.value - 0.8) < 0.001)
        for (left, right) in [(Float(0), Float(1)), (Float(1), Float(0))] {
            native.player.modelFaceTrackingValues = ["ParamEyeLOpen": left, "ParamEyeROpen": right]
            _ = try pixels()
            let eyes = try renderer.modelParameters()
            precondition(abs(eyes.first { $0.id == "ParamEyeLOpen" }!.value - left) < 0.001)
            precondition(abs(eyes.first { $0.id == "ParamEyeROpen" }!.value - right) < 0.001,
                         "Independent eye overrides must survive motion, automatic blink and physics")
        }
        native.player.modelFaceTrackingValues = [angle.id: 7, "ParamMouthOpenY": 0.8]
        native.player.modelParameterOverrides[angle.id] = angle.maximum
        _ = try pixels()
        let manualDuringCapture = try renderer.modelParameters().first { $0.id == angle.id }!.value
        precondition(abs(manualDuringCapture - angle.maximum) < 0.001,
                     "Manual sliders take precedence over face capture")
        native.player.modelParameterOverrides = [:]
        native.player.modelFaceTrackingValues = [:]
        _ = try pixels()
        let afterCapture = try renderer.modelParameters().first { $0.id == angle.id }!.value
        precondition(abs(afterCapture - reset) < 0.001,
                     "Stopping capture returns parameters to animation")
        native.player.modelRestingParameterValues = [angle.id: -9]
        _ = try pixels()
        let animatedRestValue = try renderer.modelParameters().first { $0.id == angle.id }!.value
        precondition(abs(animatedRestValue - reset) < 0.001,
                     "A selected motion must take precedence over the fallback resting pose")
        await native.updateAnimations(motion: "", expression: "")
        _ = try pixels()
        let restingValue = try renderer.modelParameters().first { $0.id == angle.id }!.value
        precondition(abs(restingValue + 9) < 0.001)
        native.player.modelParameterOverrides[angle.id] = 7
        _ = try pixels()
        let manualRestValue = try renderer.modelParameters().first { $0.id == angle.id }!.value
        precondition(abs(manualRestValue - 7) < 0.001,
                     "Manual controls must take precedence over the fallback resting pose")
        native.player.modelParameterOverrides = [:]
        native.player.modelRestingParameterValues = [:]
        await native.updateAnimations(motion: "Idle_0", expression: "")
        _ = try pixels()
        native.activity(paused: false, active: true)
        native.player.advance(by: 1)
        native.activity(paused: true, active: true)
        _ = try pixels()
        let breathBefore = try renderer.modelParameters().first { $0.id == "ParamBreath" }!.value
        native.player.isModelBreathEnabled = true
        _ = try pixels()
        let breathAfter = try renderer.modelParameters().first { $0.id == "ParamBreath" }!.value
        precondition(abs(breathBefore - breathAfter) > 0.1)
        let still = try renderer.modelParameters().first { $0.id == angle.id }!.value
        native.player.isModelBreathSwayEnabled = true
        _ = try pixels()
        let swaying = try renderer.modelParameters().first { $0.id == angle.id }!.value
        let expectedSway = still * 0.5 + Float(sin(native.player.visualTime * .pi * 2 / 6.5345)) * 3.75
        precondition(abs(swaying - expectedSway) < 0.001, "Match Greatdori's half-weight sway blend")
        _ = try pixels()
        let repeatedSway = try renderer.modelParameters().first { $0.id == angle.id }!.value
        precondition(abs(repeatedSway - swaying) < 0.001, "Paused redraws must not accumulate sway")

        await native.updateAnimations(motion: "", expression: "")
        native.player.isModelBlinkEnabled = false
        native.player.isModelBreathSwayEnabled = false
        _ = try pixels()
        let openEye = try renderer.modelParameters().first { $0.id == "ParamEyeLOpen" }!.value
        native.activity(paused: false, active: true)
        for _ in 0..<20 {
            native.player.advance(by: 0.1)
            _ = try pixels()
            let eye = try renderer.modelParameters().first { $0.id == "ParamEyeLOpen" }!.value
            precondition(abs(eye - openEye) < 0.001, "Blink off must retain the authored eye pose")
        }
        native.player.isModelBlinkEnabled = true
        var blinked = false
        for _ in 0..<80 {
            native.player.advance(by: 0.1)
            _ = try pixels()
            let eye = try renderer.modelParameters().first { $0.id == "ParamEyeLOpen" }!.value
            blinked = blinked || eye < openEye * 0.8
        }
        precondition(blinked, "Blink on must animate the eyes")
        native.activity(paused: true, active: true)
        let background = fixture.appending(path: "red.png")
        try redPNG().write(to: background)
        await native.loadBackground(url: background)
        precondition(native.backgroundError == nil)
        let withBackground = try pixels()
        precondition(withBackground[2] > 200, "Background renders outside the model")
        native.player.modelParameterOverrides[angle.id] = angle.maximum
        let previousScale = native.player.stage.characters.values.first!.scale
        var replacementFinished = false
        var loadingSamples = 0
        let replacement = Task {
            await native.load(catalog.models[1], catalog: catalog)
            replacementFinished = true
        }
        while !replacementFinished {
            if native.loading,
               let oldCharacter = native.player.stage.characters.values.first(where: { $0.costume == catalog.models[0].id }) {
                loadingSamples += 1
                precondition(abs(oldCharacter.scale - previousScale) < 0.001,
                             "Replacement loading must not enlarge the old model: \(oldCharacter.scale)")
            }
            await Task.yield()
        }
        await replacement.value
        precondition(loadingSamples > 0, "Observe the asynchronous replacement, not just its final state")
        precondition(native.error == nil && native.renderer === renderer && native.player.modelParameterOverrides.isEmpty)
        precondition(!native.player.isModelBreathSwayEnabled, "Model changes preserve the user's Sway switch")
        let afterSwitch = try pixels()
        precondition(afterSwitch[2] > 200, "Model changes retain the background")
        await native.loadBackground(url: fixture.appending(path: "missing.png"))
        precondition(native.backgroundError != nil)
        let afterFailure = try pixels()
        precondition(afterFailure[2] > 200, "Failed custom backgrounds retain the last image")

        precondition(Live2DBackgroundCatalog.backgroundURL(for: " bg_f000904 ")?.path == "/sekai-jp-assets/scenario/background/bg_f000904/bg_f000904.webp")
        precondition(Live2DBackgroundCatalog.backgroundURL(for: "https://example.com/custom.png")?.host == "example.com")
        for invalid in ["", "file:///private/tmp/test.png", "javascript:alert(1)", "scenario/background/../file.png"] {
            precondition(Live2DBackgroundCatalog.backgroundURL(for: invalid) == nil)
        }
        native.close()
        print("PASS: native bottom alignment, paused parameter edits, bounds and reset, independent breath/sway, looping off, stable scale throughout replacement loading (\(loadingSamples) samples), backdrop retention, failed custom backgrounds and URL/ID validation")
    }

    private static func redPNG() throws -> Data {
        let bytes = Data([255, 0, 0, 255])
        let provider = CGDataProvider(data: bytes as CFData)!
        let image = CGImage(width: 1, height: 1, bitsPerComponent: 8, bitsPerPixel: 32, bytesPerRow: 4,
                            space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: .init(rawValue: CGImageAlphaInfo.last.rawValue),
                            provider: provider, decode: nil, shouldInterpolate: false, intent: .defaultIntent)!
        let result = NSMutableData()
        let destination = CGImageDestinationCreateWithData(result, UTType.png.identifier as CFString, 1, nil)!
        CGImageDestinationAddImage(destination, image, nil)
        precondition(CGImageDestinationFinalize(destination))
        return result as Data
    }
}
