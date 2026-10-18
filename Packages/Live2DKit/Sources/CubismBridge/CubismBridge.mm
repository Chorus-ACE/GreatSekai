//
//  CubismBridge.mm
//  Live2DKit
//

#import "include/CubismBridge.h"

#import <CubismFramework.hpp>
#import <Live2DCubismCore.h>

#import <cstdlib>

namespace {

/// Cubism allocates through a caller-supplied allocator rather than global new,
/// so one must exist before `CubismFramework::StartUp` and outlive every model.
///
/// `AllocateAligned` is not optional: the Core reads model data through aligned
/// vector loads, so a plain `malloc` will fault on some payloads rather than
/// merely being slower. The over-allocate-and-store-the-original-pointer dance is
/// the standard way to make an aligned block freeable.
class BridgeAllocator final : public Csm::ICubismAllocator {
    void *Allocate(const Csm::csmSizeType size) override {
        return std::malloc(size);
    }

    void Deallocate(void *memory) override {
        std::free(memory);
    }

    void *AllocateAligned(const Csm::csmSizeType size, const Csm::csmUint32 alignment) override {
        // Room for the payload, the alignment slack, and the original pointer we
        // must hand back to free().
        const size_t offset = alignment + sizeof(void *);
        void *const block = std::malloc(size + offset);
        if (block == nullptr) { return nullptr; }

        const uintptr_t raw = reinterpret_cast<uintptr_t>(block) + sizeof(void *);
        const uintptr_t aligned = (raw + alignment - 1) & ~static_cast<uintptr_t>(alignment - 1);
        reinterpret_cast<void **>(aligned)[-1] = block;
        return reinterpret_cast<void *>(aligned);
    }

    void DeallocateAligned(void *alignedMemory) override {
        if (alignedMemory == nullptr) { return; }
        std::free(reinterpret_cast<void **>(alignedMemory)[-1]);
    }
};

BridgeAllocator gAllocator;
Csm::CubismFramework::Option gOption;

}  // namespace

@implementation CubismRuntime {
    BOOL _running;
}

+ (CubismRuntime *)shared {
    static CubismRuntime *shared = nil;
    static dispatch_once_t once;
    dispatch_once(&once, ^{ shared = [[CubismRuntime alloc] init]; });
    return shared;
}

- (BOOL)isRunning {
    return _running;
}

- (void)start {
    if (_running) { return; }

    gOption.LogFunction = nullptr;
    gOption.LoggingLevel = Csm::CubismFramework::Option::LogLevel_Warning;

    Csm::CubismFramework::StartUp(&gAllocator, &gOption);
    Csm::CubismFramework::Initialize();
    _running = YES;
}

- (void)stop {
    if (!_running) { return; }
    Csm::CubismFramework::Dispose();
    _running = NO;
}

- (NSString *)coreVersion {
    // Reported by the Core binary itself, so it reflects what bootstrap.sh staged
    // rather than what this source expects. `csmGetVersion` lives in the
    // Live2D::Cubism::Core namespace; the bare name doesn't resolve.
    const unsigned int version = Live2D::Cubism::Core::csmGetVersion();
    const unsigned int major = (version & 0xFF000000) >> 24;
    const unsigned int minor = (version & 0x00FF0000) >> 16;
    const unsigned int patch = (version & 0x0000FFFF);
    return [NSString stringWithFormat:@"%u.%u.%u", major, minor, patch];
}

@end
