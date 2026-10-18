//
//  CubismRendererHandle.h
//  Live2DKit
//
//  Draws a loaded model through Cubism's Metal renderer.
//
//  Kept apart from CubismModelHandle so loading stays testable headlessly: this
//  half needs a real MTLDevice and a drawable, that half needs neither.
//

#pragma once

#import <Foundation/Foundation.h>
#import <Metal/Metal.h>

@class CubismModelHandle;

NS_ASSUME_NONNULL_BEGIN

/// Renders one `CubismModelHandle` into a Metal render pass.
///
/// ## Shaders come from the APP bundle, not this package, and missing ones ABORT
/// Cubism has no compiled-in shader library. It loads `.metallib` FILES at runtime
/// from `[NSBundle mainBundle]` under `FrameworkMetallibs/`, so the hosting app must
/// embed the output of `Scripts/build-metallibs.sh`.
///
/// Cubism's `GenerateShaders` *looks* like it degrades: it null-checks the library
/// and returns. That check is unreachable. With no resource the URL is nil, and
/// `-newLibraryWithURL:` asserts (`url must not be nil.`), killing the process before
/// Cubism's own guard runs. Verified by crashing a test, not by reading the source.
///
/// So this class checks for the library itself and refuses to build a renderer when
/// it is absent, leaving `-isReady` NO. Without that refusal `-isReady` could never
/// be NO, because there would be no process left to ask.
///
/// ## Ordering constraint that is easy to get wrong
/// `+prepareWithDevice:` MUST run before any model is loaded, not merely before the
/// first draw. Cubism's own sample marks this "モデルロード前に必ず呼び出す必要がある"
/// (must be called before loading models). It installs process-global constant state,
/// so it is idempotent here and safe to call on every renderer construction.
///
/// ## Threading
/// Cubism's framework, allocator and id manager are process-global and NOT
/// thread-safe. Every method here serialises on the same lock the rest of the bridge
/// uses, and drawing is expected on the thread owning the command buffer.
@interface CubismRendererHandle : NSObject

/// Install the process-global Metal constants. Call before loading any model.
///
/// Idempotent: repeated calls with the same device are harmless, which is what lets
/// callers treat it as part of renderer construction rather than app startup.
+ (void)prepareWithDevice:(id<MTLDevice>)device;

/// Create a renderer for `model`, sized for a drawable of `width` × `height` pixels.
///
/// The size is the render/mask buffer resolution, so pass the drawable size in
/// PIXELS (points × scale), not points. Returns nil if the model is already torn
/// down.
- (nullable instancetype)initWithModel:(CubismModelHandle *)model
                                 width:(NSUInteger)width
                                height:(NSUInteger)height;

- (instancetype)init NS_UNAVAILABLE;

/// Whether a usable renderer exists: NO when the shader libraries are absent from
/// the app bundle, or when Cubism refused the model. Drawing while NO is a no-op.
///
/// Worth checking rather than assuming: NO means the character will never appear,
/// and that is otherwise indistinguishable from one rendering offscreen.
@property (nonatomic, readonly) BOOL isReady;

/// Whether the model's textures are premultiplied. Cubism's own samples default
/// this to false; `MTKTextureLoader` does not premultiply, so false matches the
/// usual loading path.
@property (nonatomic) BOOL premultipliedAlpha;

/// Screen-space framing applied on top of the aspect-fit: a zoom about the
/// drawable's centre (1 = the fitted full figure; ~2 ≈ upper body). Defaults to 1.
@property (nonatomic) float framingScale;

/// Vertical shift in NDC units applied after the zoom (positive moves the model UP
/// the screen; a zoomed full-figure canvas needs a negative value to bring the head
/// down toward centre… or positive, depending on the model's canvas origin; tune
/// with the snapshot harness's FRAME_* hooks, don't derive). Defaults to 0.
@property (nonatomic) float framingOffsetY;

/// Bind a decoded texture to the model's texture slot at `index`, matching the
/// order of `FileReferences.Textures` in the `.model3.json`.
///
/// The Swift name is pinned rather than left to the importer's omit-needless-words
/// pass, which renamed this in a way that wasn't obvious from the selector.
- (void)bindTexture:(id<MTLTexture>)texture
            atIndex:(NSUInteger)index NS_SWIFT_NAME(bindTexture(_:at:));

/// Rebuild for a new drawable size. Cubism sizes its mask buffers at renderer
/// creation, so a resize genuinely means a new renderer. This hides that, but it
/// is not free, so call it on actual size changes rather than every frame.
///
/// Bound textures are re-bound automatically; callers do not repeat `bindTexture:`.
- (void)resizeToWidth:(NSUInteger)width height:(NSUInteger)height;

/// Draw the model for this frame.
///
/// Fits the model to `drawableSize` the way Cubism's sample does: scaling by the
/// canvas aspect so the model fills the shorter axis without distortion.
///
/// The caller owns the command buffer and its presentation; this only encodes the
/// model's draw into `renderPassDescriptor`. Safe to call when `isReady` is false
/// (does nothing) or when the model has been torn down.
- (void)drawWithCommandBuffer:(id<MTLCommandBuffer>)commandBuffer
         renderPassDescriptor:(MTLRenderPassDescriptor *)renderPassDescriptor
                 drawableSize:(CGSize)drawableSize;

@end

NS_ASSUME_NONNULL_END
