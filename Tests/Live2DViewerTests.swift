import Astray
import Foundation
import Metal

@main @MainActor struct Live2DViewerTests {
    private static func complete(_ command: any MTLCommandBuffer) { command.waitUntilCompleted() }
    static func main() async throws {
        let arguments = CommandLine.arguments
        let root = URL(string: "https://sekai-assets-haruki.seiunx.net/jp-assets/")!
        let catalog = try Live2DCatalog.decode(index: Data(contentsOf: URL(filePath: arguments[1])),
                                              characters: Data(contentsOf: URL(filePath: arguments[2])), root: root)
        precondition(catalog.models.count > 500)
        precondition(catalog.models.first { $0.id == "21miku_band" }?.unit == "light_sound")
        precondition(catalog.models.first { $0.id == "v2_21miku_night" }?.unit == "school_refusal")
        let model = catalog.models.first { $0.id == "01ichika_cloth001" }!
        precondition(model.characterID == 1 && model.character2DID == 1)
        let options = try await catalog.animations(for: model)
        precondition(options.motions.count > 100 && options.expressions.count > 20)
        let motion = options.motions.first { $0 == "w-normal-default01" } ?? options.motions.first { $0.contains("normal") }!
        let expression = options.expressions.first { $0 == "face_normal" } ?? options.expressions.first!
        let native = NativeLive2DPlayer()
        await native.load(model, catalog: catalog, motion: motion, expression: expression)
        precondition(native.error == nil && !native.loading, "Model load failed: \(native.error ?? "loading")")
        let pose = try native.renderer!.modelParameters()
        precondition((pose.first { $0.id == "ParamArmL1" }?.value ?? 0) < -30)
        precondition((pose.first { $0.id == "ParamArmR1" }?.value ?? 0) < -30, "Legacy motion IDs must animate the actual arms")
        let renderer = native.renderer!
        let descriptor = MTLTextureDescriptor.texture2DDescriptor(pixelFormat: .bgra8Unorm, width: 800, height: 800, mipmapped: false)
        descriptor.usage = [.shaderRead, .renderTarget]; descriptor.storageMode = .shared
        let target = renderer.device.makeTexture(descriptor: descriptor)!
        native.activity(paused: false, active: true, repeats: true)
        var previous: [UInt8] = []; var changes = 0
        for _ in 0..<4 {
            native.player.advance(by: 0.3)
            let command = try renderer.render(to: target); complete(command)
            precondition(command.status == .completed)
            var pixels = [UInt8](repeating: 0, count: 800 * 800 * 4)
            target.getBytes(&pixels, bytesPerRow: 3200, from: .init(origin: .init(x: 0,y: 0,z: 0), size: .init(width: 800,height: 800,depth: 1)), mipmapLevel: 0)
            let visible = stride(from: 0, to: pixels.count, by: 4).filter { pixels[$0] > 40 || pixels[$0 + 1] > 40 || pixels[$0 + 2] > 40 }.count
            precondition(visible > 10000, "The model must render on a square canvas")
            if !previous.isEmpty { changes += zip(previous, pixels).filter { $0 != $1 }.count }
            previous = pixels
        }
        precondition(changes > 1000, "The selected motion must animate")
        precondition(native.player.status == .playing, "Viewer must not finish like a story")
        native.activity(paused: true, active: true, repeats: true)
        let paused = native.player.visualTime
        native.player.advance(by: 1)
        precondition(native.player.visualTime == paused)
        native.player.setModelFraming(zoom: 1.5, x: 0.1, y: -0.1)
        precondition(native.player.stage.camera == .init(-0.1, 0.1, 1.5))
        let revision = native.player.assetRevision
        let camera = native.player.stage.camera
        let originalMotion = native.player.stage.characters[1]!.motion
        let anotherMotion = options.motions.first { $0 != originalMotion }!
        let anotherExpression = options.expressions.first { $0 != expression }!
        await native.updateAnimations(motion: anotherMotion, expression: expression)
        precondition(native.animationError == nil && !native.loading)
        precondition(native.player.stage.characters[1]!.facial == expression)
        precondition(native.player.stage.characters[1]!.motion == anotherMotion)
        let motionRevision = native.player.stage.characters[1]!.motionRevision
        await native.updateAnimations(motion: anotherMotion, expression: anotherExpression)
        precondition(native.animationError == nil && !native.loading)
        precondition(native.player.stage.characters[1]!.motionRevision == motionRevision, "Changing expression must not restart the body motion")
        precondition(native.player.stage.characters[1]!.facial == anotherExpression)
        precondition(native.renderer === renderer && native.player.assetRevision == revision)
        precondition(native.player.visualTime == paused && native.player.status == .paused)
        precondition(native.player.stage.camera == camera)
        complete(try renderer.render(to: target))
        await native.updateAnimations(motion: "", expression: "")
        precondition(native.animationError == nil)
        precondition(native.player.stage.characters[1]!.motion.isEmpty && native.player.stage.characters[1]!.facial.isEmpty)
        complete(try renderer.render(to: target))
        precondition(native.player.assetRevision == revision && native.player.visualTime == paused)

        // A slow older selection must not replace a more recent choice.
        let resolver = try await HarukiAssetResolver(baseURL: root, scenario: .init())
        let gate = AnimationGate()
        let clipData = try await resolver.data(for: .motion(directory: model.directory, base: model.motionBase ?? "", kind: "motion", name: anotherMotion))!
        let delayedResolver = DelayedAnimationResolver(base: resolver, gate: gate, clipData: clipData)
        let delayed = Task {
            do {
                try await native.player.setModelAnimation(motion: "delayed_fixture", resolver: delayedResolver)
                return false
            } catch is CancellationError { return true }
            catch { return false }
        }
        await gate.waitUntilEntered()
        try await native.player.setModelAnimation(motion: "", resolver: resolver)
        await gate.release()
        let cancelledOlderSelection = await delayed.value
        precondition(cancelledOlderSelection && native.player.stage.characters[1]!.motion.isEmpty)

        let beforeFailure = native.player.stage
        do {
            try await native.player.setModelAnimation(motion: "invalid_fixture", resolver: InvalidAnimationResolver(base: resolver))
            preconditionFailure("Malformed animation must fail")
        } catch {}
        precondition(native.player.stage == beforeFailure && native.player.assetRevision == revision)
        let size = native.parameters.first { $0.id == "ParamSize" }!
        try await native.player.setModelAnimation(motion: anotherMotion, resolver: resolver)
        complete(try renderer.render(to: target))
        let lockedSize = try renderer.modelParameters().first { $0.id == "ParamSize" }!.value
        precondition(abs(lockedSize - size.defaultValue) < 0.001, "Motion changes must not change the viewer's model scale")
        native.player.replayModelMotion()
        native.close()
        print("PASS: \(catalog.models.count) models; \(options.motions.count) motions and \(options.expressions.count) expressions; real native rendering, in-place animation/expression switching, clearing, stale requests, failed replacements, pause, loop and framing.")
    }
}


private actor AnimationGate {
    private var entered = false
    private var waiter: CheckedContinuation<Void, Never>?
    private var continuation: CheckedContinuation<Void, Never>?
    func suspend() async {
        entered = true
        waiter?.resume(); waiter = nil
        await withCheckedContinuation { continuation = $0 }
    }
    func waitUntilEntered() async {
        if entered { return }
        await withCheckedContinuation { waiter = $0 }
    }
    func release() { continuation?.resume(); continuation = nil }
}

private struct DelayedAnimationResolver: AssetResolving {
    let base: HarukiAssetResolver
    let gate: AnimationGate
    let clipData: Data
    func url(for request: AssetRequest) -> URL? { base.url(for: request) }
    func data(for request: AssetRequest) async throws -> Data? {
        if case .motion(_, _, _, "delayed_fixture") = request {
            await gate.suspend()
            return clipData
        }
        return try await base.data(for: request)
    }
}

private struct InvalidAnimationResolver: AssetResolving {
    let base: HarukiAssetResolver
    func url(for request: AssetRequest) -> URL? { base.url(for: request) }
    func data(for request: AssetRequest) async throws -> Data? {
        if case .motion = request { return Data("<html>Unavailable</html>".utf8) }
        return try await base.data(for: request)
    }
}
