// swift-tools-version: 6.2
import PackageDescription
import Foundation

// Live2DKit — a Swift wrapper around the Live2D Cubism SDK for Native, rendering
// through Metal.
//
// Layered deliberately, because Cubism's public API is heavyweight C++ (its own
// csmVector/csmString containers, CubismUserModel, CubismRenderer_Metal) that
// Swift's C++ interop does not consume cleanly:
//
//   Live2DCubismCore   binary  proprietary Core, staged by Scripts/bootstrap.sh
//   CubismFramework    C++     Live2D's framework sources + the Metal renderer
//   CubismBridge       ObjC++  a NARROW ObjC surface over the C++ API
//   Live2DKit          Swift   the idiomatic layer callers actually use
//
// Nothing under Vendor/ is committed — see .gitignore and Scripts/bootstrap.sh.
// Run that script once before building.
// A checkout without the separately licensed SDK still builds the app. The viewer
// reports unavailable until setup stages Core and the matching Framework.
let nativeSDKPresent = FileManager.default.fileExists(atPath:
    URL(fileURLWithPath: #filePath).deletingLastPathComponent()
        .appendingPathComponent("Vendor/Live2DCubismCore.xcframework").path)
let package = Package(
    name: "Live2DKit",
    platforms: [
        .iOS(.v17),
        .macOS(.v15)
    ],
    products: [
        .library(name: "Live2DKit", targets: ["Live2DKit"])
    ],
    targets: nativeSDKPresent ? [
        .binaryTarget(
            name: "Live2DCubismCore",
            path: "Vendor/Live2DCubismCore.xcframework"
        ),

        .target(
            name: "CubismFramework",
            dependencies: ["Live2DCubismCore"],
            path: "Vendor/CubismFramework",
            // Cubism ships every renderer backend in one tree; we build only Metal.
            // The CMakeLists files must be excluded explicitly or SwiftPM treats
            // them as unhandled resources and fails the build.
            exclude: [
                "src/CMakeLists.txt",
                "src/Effect/CMakeLists.txt",
                "src/Id/CMakeLists.txt",
                "src/Math/CMakeLists.txt",
                "src/Model/CMakeLists.txt",
                "src/Motion/CMakeLists.txt",
                "src/Physics/CMakeLists.txt",
                "src/Rendering/CMakeLists.txt",
                "src/Type/CMakeLists.txt",
                "src/Utils/CMakeLists.txt",
                "src/Rendering/Metal/CMakeLists.txt",
                "src/Rendering/D3D9",
                "src/Rendering/D3D11",
                "src/Rendering/OpenGL",
                "src/Rendering/Vulkan",

                // The .metal sources must NOT be compiled as part of this target, and
                // the reason is not obvious.
                //
                // Cubism's Metal renderer does not use a compiled-in default library.
                // `CubismShader_Metal::GenerateShaders` loads its shaders at RUNTIME
                // from `[NSBundle mainBundle] URLForResource:… subdirectory:
                // "FrameworkMetallibs"` — individual `.metallib` FILES in the hosting
                // APP's main bundle. SwiftPM, left alone, compiles every `.metal` in a
                // target into one `default.metallib` inside the *package resource
                // bundle*, which is both the wrong shape and the wrong place: Cubism
                // would never find it.
                //
                // Worse, two of these files are not standalone translation units at
                // all. `FragShaderSrcColorBlend.metal` and `FragShaderSrcAlphaBlend.metal`
                // are `#include` fragments, and the six `*Blend.metal` files only
                // compile with `CSM_COLOR_BLEND_MODE` / `CSM_ALPHA_BLEND_MODE` defined —
                // Cubism builds each of them once per blend-mode pair. Compiling them
                // bare is what broke `make ios-build`.
                //
                // `Scripts/build-metallibs.sh` reproduces Cubism's own matrix and the
                // host app embeds the output. Only the .metal files are excluded here:
                // `MetalShaderTypes.h` lives in the same directory and IS included by
                // CubismShader_Metal.hpp / CubismRenderer_Metal.mm, so the directory
                // itself must stay.
                "src/Rendering/Metal/Shaders/CMakeLists.txt",
                "src/Rendering/Metal/Shaders/MetalShaders.metal",
                "src/Rendering/Metal/Shaders/VertShaderSrcBlend.metal",
                "src/Rendering/Metal/Shaders/VertShaderSrcMaskedBlend.metal",
                "src/Rendering/Metal/Shaders/FragShaderSrcBlend.metal",
                "src/Rendering/Metal/Shaders/FragShaderSrcMaskBlend.metal",
                "src/Rendering/Metal/Shaders/FragShaderSrcMaskInvertedBlend.metal",
                "src/Rendering/Metal/Shaders/FragShaderSrcMaskInvertedPremultipliedAlphaBlend.metal",
                "src/Rendering/Metal/Shaders/FragShaderSrcMaskPremultipliedAlphaBlend.metal",
                "src/Rendering/Metal/Shaders/FragShaderSrcPremultipliedAlphaBlend.metal",
                "src/Rendering/Metal/Shaders/FragShaderSrcColorBlend.metal",
                "src/Rendering/Metal/Shaders/FragShaderSrcAlphaBlend.metal"
            ],
            publicHeadersPath: "src",
            cxxSettings: [
                .headerSearchPath("src"),
                // Cubism's Metal renderer is written against manual retain/release —
                // CubismShader_Metal.mm sends `autorelease` directly, which ARC
                // forbids outright. Live2D's own build disables ARC for these
                // sources; SwiftPM defaults it on, so it must be turned off here.
                //
                // Scoped to THIS target only: CubismBridge is our code and keeps ARC.
                //
                // `unsafeFlags` means this package can only be consumed as a path or
                // branch dependency, never a versioned one. That's fine — it is
                // consumed locally — but it is why this can't be tagged and released
                // for general use without vendoring a prebuilt renderer instead.
                .unsafeFlags(["-fno-objc-arc"])
            ],
            linkerSettings: [
                .linkedFramework("Metal"),
                .linkedFramework("MetalKit"),
                .linkedFramework("UIKit", .when(platforms: [.iOS])),
                .linkedFramework("AppKit", .when(platforms: [.macOS]))
            ]
        ),

        .target(
            name: "CubismBridge",
            dependencies: ["CubismFramework"],
            publicHeadersPath: "include",
            cxxSettings: [
                .headerSearchPath("."),
                .headerSearchPath("../../Vendor/CubismFramework/src")
            ],
            linkerSettings: [
                .linkedFramework("Metal"),
                .linkedFramework("MetalKit")
            ]
        ),

        .target(name: "Live2DKit", dependencies: ["CubismBridge"]),

        // Headless one-frame renderer (macOS only) — THE debugging loop for this
        // stack. Run via Scripts/snapshot.sh, which stages the shader libraries
        // beside the binary; see Tools/snapshot/main.swift for what it has caught.
        .executableTarget(
            name: "snapshot",
            dependencies: ["Live2DKit"],
            path: "Tools/snapshot"
        ),

        .testTarget(name: "Live2DKitTests", dependencies: ["Live2DKit"])
    ] : [.target(name: "Live2DKit", path: "Sources/Unavailable")],
    cxxLanguageStandard: .cxx17
)
