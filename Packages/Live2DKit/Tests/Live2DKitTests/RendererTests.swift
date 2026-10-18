import CoreGraphics
import Foundation
import Metal
import MetalKit
import Testing
@testable import Live2DKit

/// The renderer half, against a real Metal device and the real Hiyori model.
///
/// ## What these can and cannot prove
/// They prove the SDK-facing contract: a renderer is constructible, textures bind,
/// resize survives, and none of it traps. They prove **nothing about pixels**;
/// there is no headless equivalent for "the character looks right", and inventing a
/// pixel proxy here would assert a shape rather than an appearance.
///
/// That boundary is honest rather than convenient. The failure mode this codebase
/// has hit repeatedly is a framework behaving differently than assumed, and the way
/// these tests earn their keep is by driving the REAL Cubism renderer rather than a
/// stand-in for it. A mock here would have proved only that my model of Cubism is
/// self-consistent, which is exactly the mistake that shipped a crash earlier.
///
/// `.serialized` for the same reason as `ModelTests`: Cubism's framework, allocator
/// and id manager are process-global and not thread-safe.
extension Live2DKitSuite {

@Suite("Live2D renderer", .serialized)
struct RendererTests {

    private static var hiyoriURL: URL? {
        let root = URL(fileURLWithPath: #filePath)
            .deletingLastPathComponent()   // Live2DKitTests
            .deletingLastPathComponent()   // Tests
            .deletingLastPathComponent()   // package root
        let url = root.appendingPathComponent("Vendor/Models/Hiyori/Hiyori.model3.json")
        return FileManager.default.fileExists(atPath: url.path) ? url : nil
    }

    /// Both a staged model and a working Metal device, or the reason there isn't one.
    /// Reported rather than silently skipped: a permanently green test that never ran
    /// is worse than a visible skip.
    private static func fixture(_ label: String) -> (URL, MTLDevice)? {
        guard let url = hiyoriURL else {
            print("\(label): SKIPPED (no Vendor/Models/Hiyori; run Scripts/bootstrap.sh)")
            return nil
        }
        guard let device = MTLCreateSystemDefaultDevice() else {
            print("\(label): SKIPPED (no Metal device on this machine)")
            return nil
        }
        return (url, device)
    }

    @Test("builds a renderer against a real model and a real device")
    func buildsRenderer() throws {
        guard let (url, device) = Self.fixture("BuildRenderer") else { return }

        Live2DRuntime.start()
        let model = try Live2DModel(contentsOf: url)
        let renderer = Live2DRenderer(model: model, device: device, width: 750, height: 1334)

        // Non-nil is the assertion. `isReady` is deliberately NOT asserted true: it
        // depends on the shader libraries being present in the *test host's* bundle,
        // which they are not; swift-test has no app bundle to embed them into. That
        // is a real limitation of this boundary, not a bug, and pretending otherwise
        // would make the test lie about what it verified.
        let built = try #require(renderer, "Cubism produced no renderer for a valid model")
        print("BuildRenderer: EXECUTED (isReady=\(built.isReady))")
    }

    @Test("binding textures and resizing never trap, ready or not")
    func bindingAndResizingAreSafe() throws {
        guard let (url, device) = Self.fixture("BindResize") else { return }

        Live2DRuntime.start()
        let model = try Live2DModel(contentsOf: url)
        let renderer = try #require(
            Live2DRenderer(model: model, device: device, width: 640, height: 480))

        let descriptor = MTLTextureDescriptor.texture2DDescriptor(
            pixelFormat: .rgba8Unorm, width: 8, height: 8, mipmapped: false)
        let texture = try #require(device.makeTexture(descriptor: descriptor))

        // Hiyori references two textures; binding both mirrors the real path.
        renderer.bindTexture(texture, at: 0)
        renderer.bindTexture(texture, at: 1)

        // A resize rebuilds the underlying renderer and re-binds. The point of the
        // test is that the caller does not have to know that.
        renderer.resize(width: 1000, height: 800)
        renderer.resize(width: 1000, height: 800)   // no-op path
        renderer.bindTexture(texture, at: 0)

        renderer.premultipliedAlpha = true
        renderer.premultipliedAlpha = false

        print("BindResize: EXECUTED")
    }

    @Test("drawing degrades instead of trapping when shaders are absent")
    func drawWithoutShadersDegrades() throws {
        guard let (url, device) = Self.fixture("DrawDegrades") else { return }

        Live2DRuntime.start()
        let model = try Live2DModel(contentsOf: url)
        let renderer = try #require(
            Live2DRenderer(model: model, device: device, width: 320, height: 480))

        let queue = try #require(device.makeCommandQueue())
        let commandBuffer = try #require(queue.makeCommandBuffer())

        let descriptor = MTLTextureDescriptor.texture2DDescriptor(
            pixelFormat: .bgra8Unorm, width: 320, height: 480, mipmapped: false)
        descriptor.usage = [.renderTarget, .shaderRead]
        let target = try #require(device.makeTexture(descriptor: descriptor))

        let pass = MTLRenderPassDescriptor()
        pass.colorAttachments[0].texture = target
        pass.colorAttachments[0].loadAction = .clear
        pass.colorAttachments[0].storeAction = .store

        model.update()

        // This is the case that actually matters for the app: under `swift test`
        // there is no main bundle carrying FrameworkMetallibs, so Cubism cannot load
        // its shaders. It logs and returns rather than crashing, which is precisely
        // why `isReady` exists, and why a blank character must never be mistaken for
        // a working one. Reaching the end of this test IS the assertion.
        renderer.draw(
            commandBuffer: commandBuffer,
            renderPassDescriptor: pass,
            drawableSize: CGSize(width: 320, height: 480))

        commandBuffer.commit()
        commandBuffer.waitUntilCompleted()

        #expect(commandBuffer.error == nil, "the command buffer failed: \(String(describing: commandBuffer.error))")
        print("DrawDegrades: EXECUTED (isReady=\(renderer.isReady))")
    }

    @Test("configure() sets the formats Cubism's pipeline hard-codes")
    @MainActor
    func configureSetsRequiredFormats() throws {
        guard let device = MTLCreateSystemDefaultDevice() else {
            print("ConfigureFormats: SKIPPED (no Metal device)")
            return
        }

        let view = MTKView(frame: .zero, device: device)
        // MTKView's default: no depth texture at all. This is the state that crashes,
        // so assert it first; if MTKView ever changed the default, the fix below would
        // be silently unnecessary and this test would say so.
        #expect(view.depthStencilPixelFormat == .invalid, "MTKView's depth default changed")

        Live2DRenderer.configure(view)

        // Cubism's MakeRenderPipelineState hard-codes both. A pipeline declaring a
        // depth attachment against a pass without one aborts on setRenderPipelineState,
        // which is a crash rather than a blank view, so these are load-bearing.
        #expect(view.colorPixelFormat == Live2DRenderer.requiredColorPixelFormat)
        #expect(view.depthStencilPixelFormat == Live2DRenderer.requiredDepthStencilPixelFormat)
        #expect(Live2DRenderer.requiredDepthStencilPixelFormat == .depth32Float)
        #expect(Live2DRenderer.requiredColorPixelFormat == .bgra8Unorm)

        print("ConfigureFormats: EXECUTED")
    }

    @Test("a zero-sized drawable is ignored rather than dividing by zero")
    func zeroDrawableIsIgnored() throws {
        guard let (url, device) = Self.fixture("ZeroDrawable") else { return }

        Live2DRuntime.start()
        let model = try Live2DModel(contentsOf: url)
        let renderer = try #require(
            Live2DRenderer(model: model, device: device, width: 100, height: 100))

        let queue = try #require(device.makeCommandQueue())
        let commandBuffer = try #require(queue.makeCommandBuffer())

        // The aspect-ratio fit divides by both drawable dimensions. A view reports
        // .zero before layout, so this path is reached in practice, not theoretically.
        renderer.draw(
            commandBuffer: commandBuffer,
            renderPassDescriptor: MTLRenderPassDescriptor(),
            drawableSize: .zero)

        print("ZeroDrawable: EXECUTED")
    }
}
}
