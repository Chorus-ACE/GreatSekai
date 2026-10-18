# GreatSekai native Live2D adapter

Based on https://github.com/KristopherGBaker/Live2DKit (MIT; see LICENSE).
Upstream revision: ffe10b853ffee2dca072b0c1d9683f31903df55f

Local changes: deployment targets match GreatSekai (iOS 17/macOS 15); a checkout
without Cubism Core builds an unavailable module, keeping the rest of the app usable.
MTKView configuration is explicitly MainActor-isolated for current Apple SDK headers.
The Swift player is typechecked against the real bridge headers on both platforms.
With SDK 5-r.5 staged locally, 23 tests pass, including evaluation of all 371 clips
in the local Miku fixture. The macOS Metal snapshot tool renders both Hiyori and
Miku with authored motion. See RESEARCH.md for validation limits.

## Setup

1. Download Cubism SDK for Native 5-r.5 or a compatible matching Core/Framework
   from https://www.live2d.com/en/sdk/download/native/ after accepting its license yourself.
2. In this directory, run `Scripts/bootstrap.sh /absolute/path/to/CubismSdkForNative`.
3. Run `Scripts/build-metallibs.sh macosx`, then repeat for `iphonesimulator` and `iphoneos`.
4. In Xcode, resolve packages again (reset package caches if the unavailable target remains
   cached), and build. The app's build phase embeds shaders for the selected platform.
5. Open Tools → Live2D Viewer and select a folder containing `.model3.json`, its `.moc3`,
   textures and optional motion/physics files. A normalized export can use this
   format, but shared motions must be included and registered in the model JSON;
   a raw game model directory alone is not necessarily self-contained.

SDK binaries, framework source, shaders and sample models stay under ignored Vendor/.
They are deliberately absent from this repository. The MIT license covers the adapter,
not Cubism or game assets. SDK license and distribution requirements remain applicable.

Rendering uses MTKView with cached textures and one in-flight frame (busy frames are
skipped without blocking the main thread). Animation stops while hidden/inactive;
physics time steps are clamped after suspension. No web renderer is used.

Imported motion allocation counts are rebuilt from validated curves in memory;
some Sekai exports incorrectly use the point count as the segment count. Original
files remain untouched and Cubism's consistency checks remain enabled. Motion
event markers are safely consumed without triggering sound or other actions.

To include a local export in the native regression suite:

```sh
SEKAI_LIVE2D_MODEL=/absolute/path/to/model.model3.json swift test
```

This checks every declared clip through completion. Without the environment
variable, the external-model test reports that it was skipped.

See [RESEARCH.md](RESEARCH.md) for verified Sekai asset-format findings and the
remaining native playback validation work.
