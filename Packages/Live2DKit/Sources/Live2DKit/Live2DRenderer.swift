import CubismBridge
import Foundation
import Metal
import MetalKit

/// Draws a `Live2DModel` through Cubism's Metal renderer.
///
/// Split from `Live2DModel` on purpose: loading a model and reading its parameters
/// needs no GPU and stays testable headlessly, while everything here needs a real
/// `MTLDevice` and a live drawable.
///
/// ## The shaders are the app's responsibility
/// Cubism has no compiled-in shader library; it loads `.metallib` files at runtime
/// from `Bundle.main` under `FrameworkMetallibs/`. The hosting app must embed the
/// output of `Scripts/build-metallibs.sh`.
///
/// Missing shaders are **fatal in Cubism, not graceful**. Its `GenerateShaders`
/// null-checks the library and returns, which reads like a degrade, but that check
/// is unreachable: with no resource the URL is nil and `newLibraryWithURL(_:)`
/// asserts, aborting the process first. Live2DKit checks for the library itself and
/// refuses to build a renderer instead, so `isReady` becomes false rather than the
/// app dying.
///
/// Check `isReady`. False means the character will never appear, which is otherwise
/// indistinguishable from one rendering offscreen.
public final class Live2DRenderer {

    private let handle: CubismRendererHandle

    /// The model this renderer draws. Held so the model outlives the renderer, which
    /// borrows its underlying Cubism model.
    public let model: Live2DModel

    /// Create a renderer for `model` at a drawable size in **pixels** (points × scale,
    /// not points; Cubism sizes its mask buffers from this).
    ///
    /// Returns nil when Cubism cannot produce a renderer at all, which in practice
    /// means the model was already torn down.
    ///
    /// `device` installs Cubism's process-global Metal constants as a side effect.
    /// That must happen before models load; it is idempotent, so doing it here rather
    /// than demanding a separate app-startup call removes an ordering trap without
    /// costing anything.
    public init?(model: Live2DModel, device: MTLDevice, width: Int, height: Int) {
        CubismRendererHandle.prepare(with: device)
        guard let handle = CubismRendererHandle(
            model: model.handle, width: UInt(max(width, 1)), height: UInt(max(height, 1))
        ) else { return nil }
        self.handle = handle
        self.model = model
    }

    /// Whether Cubism produced a usable renderer. False almost always means the
    /// shader libraries are absent from the app bundle; see the type's note.
    public var isReady: Bool { handle.isReady }

    // MARK: - What Cubism's pipeline demands of your render target

    /// The colour format Cubism's render pipeline is built for.
    ///
    /// Hard-coded inside `CubismShader_Metal::MakeRenderPipelineState`, not derived
    /// from the target, so the render pass has to match rather than the other way
    /// round. Happens to be `MTKView`'s default.
    public static let requiredColorPixelFormat: MTLPixelFormat = .bgra8Unorm

    /// The depth format Cubism's render pipeline is built for.
    ///
    /// **This one bites.** `MakeRenderPipelineState` unconditionally sets
    /// `depthAttachmentPixelFormat = MTLPixelFormatDepth32Float`, while `MTKView`
    /// defaults `depthStencilPixelFormat` to `.invalid`, meaning no depth texture at all. A
    /// pipeline declaring a depth attachment against a pass that has none fails
    /// validation and aborts:
    ///
    ///     For depth attachment, the renderPipelineState pixelFormat must be
    ///     MTLPixelFormatInvalid, as no texture is set.
    ///
    /// Cubism's own sample never hits this because it does not use `MTKView`. Set this
    /// on the view, or call `configure(_:)`.
    public static let requiredDepthStencilPixelFormat: MTLPixelFormat = .depth32Float

    /// Point an `MTKView` at the formats Cubism's pipeline requires.
    ///
    /// Cheaper than reading the two notes above and remembering both. Call before the
    /// first frame; changing `depthStencilPixelFormat` makes `MTKView` allocate the
    /// depth texture Cubism's pipeline expects to find.
    @MainActor public static func configure(_ view: MTKView) {
        view.colorPixelFormat = requiredColorPixelFormat
        view.depthStencilPixelFormat = requiredDepthStencilPixelFormat
    }

    /// Whether the model's textures carry premultiplied alpha.
    ///
    /// Defaults to false, matching `MTKTextureLoader`'s behaviour, which does not
    /// premultiply. Set true only if you premultiply during decode; getting it wrong
    /// shows up as dark fringing on the model's edges rather than as an error.
    public var premultipliedAlpha: Bool {
        get { handle.premultipliedAlpha }
        set { handle.premultipliedAlpha = newValue }
    }

    /// Screen-space framing on top of the aspect-fit: zoom about the drawable's
    /// centre (1 = fitted full figure, ~2 ≈ upper body), then shift vertically in
    /// NDC units. This is how a full-figure canvas becomes an upper-body portrait
    /// without touching the model. Tune with the snapshot harness's
    /// `FRAME_SCALE`/`FRAME_OFFSET_Y` hooks rather than deriving.
    public var framingScale: Float {
        get { handle.framingScale }
        set { handle.framingScale = newValue }
    }

    /// Vertical shift applied after the zoom (NDC units). Defaults to 0.
    public var framingOffsetY: Float {
        get { handle.framingOffsetY }
        set { handle.framingOffsetY = newValue }
    }

    /// Bind a decoded texture to the model's slot at `index`, matching the order of
    /// `FileReferences.Textures` in the `.model3.json`.
    ///
    /// Bindings survive `resize(width:height:)`; the renderer re-binds them itself.
    public func bindTexture(_ texture: MTLTexture, at index: Int) {
        handle.bindTexture(texture, at: UInt(max(index, 0)))
    }

    /// Adopt a new drawable size.
    ///
    /// Cubism fixes its mask-buffer size at renderer creation, so this rebuilds the
    /// underlying renderer. Cheap enough for genuine size changes, wasteful per
    /// frame; it no-ops when the size is unchanged, so calling it from a
    /// `drawableSizeWillChange` callback is fine.
    public func resize(width: Int, height: Int) {
        handle.resize(toWidth: UInt(max(width, 1)), height: UInt(max(height, 1)))
    }

    /// Encode this frame's draw.
    ///
    /// Call `model.update()` first so parameter writes reach the vertex state; this
    /// draws whatever the model currently holds. The caller owns the command buffer
    /// and its presentation; this only encodes into `renderPassDescriptor`.
    ///
    /// The model is fitted to `drawableSize` by canvas aspect, so it fills the shorter
    /// axis without distortion.
    public func draw(
        commandBuffer: MTLCommandBuffer,
        renderPassDescriptor: MTLRenderPassDescriptor,
        drawableSize: CGSize
    ) {
        handle.draw(
            with: commandBuffer,
            renderPassDescriptor: renderPassDescriptor,
            drawableSize: drawableSize
        )
    }
}
