//
//  CubismRendererHandle.mm
//  Live2DKit
//

#import "include/CubismRendererHandle.h"
#import "include/CubismBridge.h"
#import "CubismModelHandle+Internal.h"

#import <algorithm>

#import <CubismFramework.hpp>
#import <Math/CubismMatrix44.hpp>
#import <Math/CubismModelMatrix.hpp>
#import <Model/CubismModel.hpp>
#import <Rendering/CubismRenderer.hpp>
#import <Rendering/Metal/CubismRenderer_Metal.hpp>

using namespace Csm;

@implementation CubismRendererHandle {
    CubismModelHandle *_modelHandle;   // strong: the renderer borrows its CubismModel
    Rendering::CubismRenderer *_renderer;
    NSMutableDictionary<NSNumber *, id<MTLTexture>> *_textures;
    NSUInteger _width;
    NSUInteger _height;
}

#pragma mark - Process-global setup

+ (void)prepareWithDevice:(id<MTLDevice>)device {
    if (device == nil) { return; }
    // Under the same lock as everything else touching Cubism's globals. Cheap and
    // idempotent, so construction can call it rather than relying on the app to
    // sequence a separate startup step correctly.
    @synchronized (CubismRuntime.shared) {
        Rendering::CubismRenderer_Metal::SetConstantSettings(device);
    }
}

#pragma mark - Lifecycle

- (nullable instancetype)initWithModel:(CubismModelHandle *)model
                                 width:(NSUInteger)width
                                height:(NSUInteger)height {
    self = [super init];
    if (self == nil) { return nil; }

    if (model == nil || [model cubismModel] == nullptr) { return nil; }

    _modelHandle = model;
    _textures = [NSMutableDictionary dictionary];
    _width = std::max<NSUInteger>(width, 1);
    _height = std::max<NSUInteger>(height, 1);
    _premultipliedAlpha = NO;
    _framingScale = 1.0f;
    _framingOffsetY = 0.0f;

    [self buildRenderer];
    return self;
}

// Creating the renderer mirrors CubismUserModel::CreateRenderer, which this bridge
// cannot use: CubismModelHandle owns a bare CubismMoc/CubismModel rather than a
// CubismUserModel, so there is no GetRenderer<>() to call and the two steps are
// spelled out here instead.
// Whether the app bundle actually carries Cubism's shader library.
//
// VERIFIED BY CRASH, not by reading: Cubism's GenerateShaders does
//
//     NSURL *url = [[NSBundle mainBundle] URLForResource:@"MetalShaders" ...];
//     id<MTLLibrary> lib = [device newLibraryWithURL:url error:nil];
//     if (!lib) { NSLog(...); return; }
//
// and that `if (!lib)` guard reads like a graceful degrade. It is not reachable.
// When the resource is absent `url` is nil, and -newLibraryWithURL: ASSERTS:
//
//     -[_MTLDevice newLibraryWithURL:error:]:1948:
//         failed assertion `url must not be nil.'
//
// The assertion aborts the process before Cubism's own check ever runs. So a missing library
// is a hard crash on launch, not a blank character, and the only way to degrade is
// to refuse before handing Cubism the device at all.
static BOOL ShaderLibraryIsPresent(void) {
    // Must match GenerateShaders: resource "MetalShaders", subdirectory
    // "FrameworkMetallibs" (its ShaderLibsDir constant).
    return [[NSBundle mainBundle] URLForResource:@"MetalShaders"
                                   withExtension:@"metallib"
                                    subdirectory:@"FrameworkMetallibs"] != nil;
}

- (void)buildRenderer {
    @synchronized (CubismRuntime.shared) {
        CubismModel *model = [_modelHandle cubismModel];
        if (model == nullptr) { return; }

        // Refuse BEFORE Initialize, which is what reaches GenerateShaders. Leaving
        // _renderer null makes isReady false, which is the whole reason that property
        // exists; without this guard it could never be false, because the process
        // would already be gone.
        if (!ShaderLibraryIsPresent()) {
            NSLog(@"[Live2DKit] FrameworkMetallibs/MetalShaders.metallib is not in the app "
                  @"bundle. Refusing to build a renderer; handing Cubism a nil shader URL "
                  @"aborts the process. Embed the output of Scripts/build-metallibs.sh.");
            return;
        }

        _renderer = Rendering::CubismRenderer::Create(static_cast<csmUint32>(_width),
                                                      static_cast<csmUint32>(_height));
        if (_renderer == nullptr) { return; }

        // maskBufferCount 1 matches CubismUserModel's default.
        _renderer->Initialize(model, 1);
        _renderer->IsPremultipliedAlpha(_premultipliedAlpha ? true : false);
    }
}

- (void)dealloc {
    @synchronized (CubismRuntime.shared) {
        if (_renderer != nullptr) {
            Rendering::CubismRenderer::Delete(_renderer);
            _renderer = nullptr;
        }
    }
}

#pragma mark - Configuration

- (BOOL)isReady {
    // A null renderer means Create/Initialize failed. The overwhelmingly common
    // cause is the shader libraries missing from the app bundle; see the header.
    @synchronized (CubismRuntime.shared) {
        return _renderer != nullptr;
    }
}

- (void)setPremultipliedAlpha:(BOOL)premultipliedAlpha {
    _premultipliedAlpha = premultipliedAlpha;
    @synchronized (CubismRuntime.shared) {
        if (_renderer == nullptr) { return; }
        _renderer->IsPremultipliedAlpha(premultipliedAlpha ? true : false);
    }
}

- (void)bindTexture:(id<MTLTexture>)texture atIndex:(NSUInteger)index {
    if (texture == nil) { return; }
    // Retained so a resize (which necessarily rebuilds the renderer) can re-bind
    // without the caller having to know that a resize discards bindings.
    _textures[@(index)] = texture;
    [self applyTexture:texture atIndex:index];
}

// The bind itself, WITHOUT recording it. Split out because the re-bind after a
// resize enumerates _textures, and routing that through the public method wrote
// back into the dictionary mid-enumeration: a mutation-during-enumeration abort.
- (void)applyTexture:(id<MTLTexture>)texture atIndex:(NSUInteger)index {
    @synchronized (CubismRuntime.shared) {
        if (_renderer == nullptr) { return; }
        static_cast<Rendering::CubismRenderer_Metal *>(_renderer)
            ->BindTexture(static_cast<csmUint32>(index), texture);
    }
}

- (void)resizeToWidth:(NSUInteger)width height:(NSUInteger)height {
    NSUInteger newWidth = std::max<NSUInteger>(width, 1);
    NSUInteger newHeight = std::max<NSUInteger>(height, 1);
    if (newWidth == _width && newHeight == _height) { return; }

    _width = newWidth;
    _height = newHeight;

    @synchronized (CubismRuntime.shared) {
        if (_renderer != nullptr) {
            Rendering::CubismRenderer::Delete(_renderer);
            _renderer = nullptr;
        }
    }
    [self buildRenderer];

    // Re-bind everything the caller bound before the rebuild. Enumerate a snapshot
    // and use the non-recording applyTexture: (see its note).
    NSDictionary<NSNumber *, id<MTLTexture>> *bound = [_textures copy];
    for (NSNumber *index in bound) {
        [self applyTexture:bound[index] atIndex:index.unsignedIntegerValue];
    }
}

#pragma mark - Drawing

- (void)drawWithCommandBuffer:(id<MTLCommandBuffer>)commandBuffer
         renderPassDescriptor:(MTLRenderPassDescriptor *)renderPassDescriptor
                 drawableSize:(CGSize)drawableSize {
    if (commandBuffer == nil || renderPassDescriptor == nil) { return; }
    if (drawableSize.width <= 0 || drawableSize.height <= 0) { return; }

    @synchronized (CubismRuntime.shared) {
        if (_renderer == nullptr) { return; }
        CubismModel *model = [_modelHandle cubismModel];
        if (model == nullptr) { return; }

        Rendering::CubismRenderer_Metal *metal =
            static_cast<Rendering::CubismRenderer_Metal *>(_renderer);

        // Clear ONCE, then switch the pass to LOAD before Cubism touches it.
        //
        // CORRECTED: an earlier version of this comment claimed Cubism opens an encoder
        // per drawable and that .clear therefore wiped each drawable. That is false:
        // PreDraw creates ONE encoder lazily and reuses it for the whole model, so a
        // .clear pass would clear exactly once either way. (The shredded-model bug this
        // was written against turned out to be a vertically flipped texture atlas in the
        // consumer, nothing to do with load actions.)
        //
        // The dance is kept because it is what Cubism's own sample does, and it is what
        // makes MULTIPLE StartFrame passes into one drawable compose (each StartFrame's
        // encoder re-applies the descriptor's loadAction; with .clear, a second model
        // drawn into the same drawable would erase the first). For a single model it is
        // equivalent to letting the main pass clear.
        const MTLLoadAction colorLoad = renderPassDescriptor.colorAttachments[0].loadAction;
        const MTLLoadAction depthLoad = renderPassDescriptor.depthAttachment.loadAction;
        if (colorLoad == MTLLoadActionClear || depthLoad == MTLLoadActionClear) {
            id<MTLRenderCommandEncoder> clearPass =
                [commandBuffer renderCommandEncoderWithDescriptor:renderPassDescriptor];
            [clearPass endEncoding];
        }
        renderPassDescriptor.colorAttachments[0].loadAction = MTLLoadActionLoad;
        renderPassDescriptor.depthAttachment.loadAction = MTLLoadActionLoad;

        metal->StartFrame(commandBuffer, renderPassDescriptor);

        MTLViewport viewport = {
            0, 0,
            static_cast<double>(drawableSize.width),
            static_cast<double>(drawableSize.height),
            0.0, 1.0
        };
        metal->SetRenderViewport(viewport);

        // Fit the model to the drawable, following the sample's logic: normalise the
        // model to 2.0 units on its dominant axis, then squash the projection by the
        // aspect ratio of the other. Getting this wrong stretches the character
        // rather than failing, which is why it mirrors the sample rather than being
        // derived fresh.
        csmFloat32 canvasWidth = model->GetCanvasWidth();
        csmFloat32 canvasHeight = model->GetCanvasHeight();
        if (canvasWidth <= 0 || canvasHeight <= 0) { return; }

        CubismModelMatrix modelMatrix(canvasWidth, canvasHeight);
        CubismMatrix44 projection;

        csmFloat32 displayRatio = static_cast<csmFloat32>(drawableSize.height / drawableSize.width);
        csmFloat32 canvasRatio = canvasHeight / canvasWidth;
        csmFloat32 aspectRatio = static_cast<csmFloat32>(drawableSize.width / drawableSize.height);

        if (canvasRatio < displayRatio) {
            // Wide model: fit to width, scale vertically.
            modelMatrix.SetWidth(2.0f);
            projection.Scale(1.0f, aspectRatio);
        } else {
            // Tall model: fit to height, scale horizontally.
            modelMatrix.SetHeight(2.0f);
            projection.Scale(1.0f / aspectRatio, 1.0f);
        }

        projection.MultiplyByMatrix(&modelMatrix);

        // Optional framing on top of the fit: zoom about the screen centre, then shift
        // vertically. This is how a full-figure canvas becomes an upper-body portrait without
        // touching the model. Screen-space (NDC), so it composes with any fit branch:
        // v' = F · (P·M) · v with F = translate(0, offsetY) · scale(s, s).
        if (_framingScale != 1.0f || _framingOffsetY != 0.0f) {
            CubismMatrix44 framing;
            framing.Scale(_framingScale <= 0 ? 1.0f : _framingScale,
                          _framingScale <= 0 ? 1.0f : _framingScale);
            framing.TranslateY(_framingOffsetY);
            // CubismMatrix44::MultiplyByMatrix(m) computes this = this · m, so start
            // from the framing matrix and append the fitted MVP to get F · (P·M).
            framing.MultiplyByMatrix(&projection);
            metal->SetMvpMatrix(&framing);
        } else {
            metal->SetMvpMatrix(&projection);
        }

        metal->DrawModel();
    }
}

@end
