//
//  CubismBridge.h
//  Live2DKit
//
//  The ObjC surface over Cubism's C++ API. Deliberately NARROW: it exposes only
//  what a lipsync-driven reading character needs (start the runtime, load a
//  model, set parameters, draw) rather than mirroring the SDK.
//
//  A wide bridge would be a second SDK to maintain, and every symbol crossing
//  the boundary is one Swift can't see through. Keep additions justified by a
//  caller that needs them.
//

#pragma once

#import <Foundation/Foundation.h>

// SwiftPM treats `include/<ModuleName>.h` as the module's UMBRELLA header, so only
// what this file imports reaches Swift. A header sitting beside it in `include/`
// is invisible until it's imported here: silently, as a "cannot find type in
// scope" at the Swift call site rather than anything pointing at the modulemap.
//
// Every public bridge header therefore belongs in this list.
#import "CubismModelHandle.h"
#import "CubismRendererHandle.h"

NS_ASSUME_NONNULL_BEGIN

/// Errors the bridge reports back to Swift. Cubism signals failure through return
/// codes and its own logging rather than exceptions, so these are mapped at the
/// boundary rather than propagated.
typedef NS_ENUM(NSInteger, CubismBridgeError) {
    CubismBridgeErrorRuntimeUnavailable = 1,
    CubismBridgeErrorModelUnreadable,
    CubismBridgeErrorModelInvalid
};

/// Process-wide Cubism runtime.
///
/// Cubism requires a custom allocator installed before any other call and torn
/// down last, so this is a singleton rather than a value type; the lifetime is
/// genuinely global, and pretending otherwise would invite use-after-free.
@interface CubismRuntime : NSObject

@property (class, readonly) CubismRuntime *shared;

/// Whether `start` has run and the allocator is installed.
@property (nonatomic, readonly, getter=isRunning) BOOL running;

/// Install the allocator and initialise Cubism. Idempotent.
- (void)start;

/// Tear the runtime down. Safe to call when not running.
- (void)stop;

/// The linked Cubism Core version, as reported by the binary itself; useful for
/// confirming which SDK `Scripts/bootstrap.sh` actually staged.
@property (nonatomic, readonly) NSString *coreVersion;

@end

NS_ASSUME_NONNULL_END
