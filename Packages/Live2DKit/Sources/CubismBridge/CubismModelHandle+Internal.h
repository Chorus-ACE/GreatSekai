//
//  CubismModelHandle+Internal.h
//  Live2DKit
//
//  The C++ model behind CubismModelHandle, for other bridge files only.
//
//  NOT in include/, so it is not part of the umbrella header and never reaches
//  Swift. Cubism's CubismModel is a heavyweight C++ type; exposing it publicly
//  would drag the whole SDK across the bridge, which is the thing this bridge
//  exists to prevent. The renderer needs the pointer, so it gets it here.
//

#pragma once

#import "include/CubismModelHandle.h"

#import <CubismFramework.hpp>
#import <Model/CubismModel.hpp>

NS_ASSUME_NONNULL_BEGIN

@interface CubismModelHandle (Internal)

/// The underlying model, or `nullptr` once torn down.
///
/// Borrowed, never owned: `CubismModelHandle` created it and deletes it in its own
/// `dealloc`. A renderer holding this must not outlive the handle, which is why
/// `CubismRendererHandle` keeps a strong reference to the handle itself rather than
/// caching this pointer across frames.
- (nullable Csm::CubismModel *)cubismModel;

@end

NS_ASSUME_NONNULL_END
