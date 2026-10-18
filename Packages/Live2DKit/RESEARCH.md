# Live2D integration research

Checked 2026-10-18. Native macOS rendering is verified with the SDK sample and
the local Miku export. Independent body/facial playback and iOS runtime rendering
remain unverified.

## Current verification

`Tests/typecheck-live2d-swift.sh` passes for macOS and iOS Simulator using the real
Objective-C bridge headers. It does not compile the C++ bridge, link Core, compile
Metal shaders or render a model.

After the user downloaded SDK 5-r.5, Core and the matching Framework were staged
in ignored Vendor paths. All 18 native package tests passed. Each of macOS,
iOS Simulator and iOS has 477 compiled Metal libraries. The macOS snapshot tool
successfully rendered Hiyori in a static pose and after two seconds of `Idle:0`
with physics. Static capture now initializes Pose with a zero-time update;
calling the geometry-only update had left alternate arm parts visible.
These checks do not establish iOS device rendering or Sekai dual-track playback.

### October 18 unattended follow-up

The local `21miku_normal_3.0_f_t06` export initially rendered only its static pose:
all 371 motion files were rejected because their `Meta.TotalSegmentCount` counted
points instead of segments. The bridge now validates each curve's numeric values,
segment types, lengths and increasing endpoint times before deriving allocation
counts. It retains Cubism's consistency check and leaves source files unchanged.
Normalized JSON uses line-separated decimal numbers because SDK 5-r.5's parser
rejects compact numeric array endings and scientific notation.

After that fix, motion evaluation exposed a second crash: the queue invoked a
null event callback for the export's `UserData` markers. An explicit no-op event
sink now prevents this crash; event-driven sound/actions are not implemented.
The player also initializes pose-controlled visibility when loading while paused
and clears stale motion/error state when closing or replacing a model.

All 23 tests pass with `SEKAI_LIVE2D_MODEL` pointing at this export. Its 371 clips
each load, evaluate with physics, reach completion, and leave finite parameters.
Synthetic fixtures cover all four curve types, mismatched metadata, malformed
segments, small decimal values and event-bearing clips. The snapshot harness
renders `w-adult-nod01` at two seconds in portrait and landscape, and Hiyori
`Idle:0` as a regression check. Metal API Validation reports no errors for these
captures. Images are retained locally in `.build/verification/`.

The final GreatSekai builds pass through Xcode MCP for macOS and iOS Simulator;
the native Swift player also typechecks against the iOS 17 deployment target.
These are offscreen macOS captures and build checks, not an iOS device playback
test, a sustained frame-rate measurement, or a simultaneous body/facial test.

The full GreatSekai macOS and iOS Simulator builds pass (code signing disabled
for these validation builds), with the existing iOS 17 minimum preserved.
Live2DKit's minimum was corrected from iOS 18 to iOS 17, and the header check now
uses that same target. The app bundle contains all 477 shader libraries. Shader
embedding keeps Xcode's script sandbox enabled: Vendor is a recursive input and
the generated `Scripts/FrameworkMetallibsOutputs.xcfilelist` declares each output.
The shader compiler runs at most eight jobs at once and checks every exit status.

The adapter targets Native SDK 5-r.5. The official [Framework release](https://github.com/Live2D/CubismNativeFramework/releases/tag/5-r.5)
exists; Core is distributed separately from the public Framework repository.
Use matching Core, Framework and shader sources when staging it.
The [official download page](https://www.live2d.com/en/sdk/download/native/)
explicitly requires license consent and states that downloading constitutes
consent. The user completed that download before local integration began.

## Sekai motion and facial assets

Inspected Untitled Sekai Live2D Viewer revision
`fcfb29f8197620a6e09f653f2b0da41d7a606f12`:

- [motion resolver](https://github.com/Untitled-Story/untitled-sekai-live2d-viewer/blob/fcfb29f8197620a6e09f653f2b0da41d7a606f12/src/lib/motion.ts)
  reads `BuildMotionData.json`: `motions` and `expressions` are separate lists.
  Shared motion sets and model-specific additional motions live separately.
  Its path inference includes collaboration and costume-name heuristics, so it
  should not be treated as an authoritative mapping for every model or region.
- [player](https://github.com/Untitled-Story/untitled-sekai-live2d-viewer/blob/fcfb29f8197620a6e09f653f2b0da41d7a606f12/src/components/Viewer.tsx)
  loads both body and facial clips as `.motion3.json`, registers them in distinct
  motion groups and exposes parallel playback. Its facial clips are not ordinary
  `.exp3.json` expressions. This establishes the inspected pipeline's format,
  not the format of every asset ever released by the game.
- [ZIP exporter](https://github.com/Untitled-Story/untitled-sekai-live2d-viewer/blob/fcfb29f8197620a6e09f653f2b0da41d7a606f12/src/lib/model-download.ts)
  copies shared clips into `motions/` and rewrites `FileReferences.Motions`.
  It uses each clip name as a group and does not retain the body/facial category.
  Thus this export can make file references self-contained while losing the
  information needed to select playback tracks reliably. Native compatibility
  has not been demonstrated with a downloaded ZIP.

## Consequences for this adapter

`CubismModelHandle` currently owns one `CubismMotionManager`. Starting another
clip on that manager fades out existing clips; this is confirmed in the official
[5-r.5 queue implementation](https://github.com/Live2D/CubismNativeFramework/blob/5-r.5/src/Motion/CubismMotionQueueManager.cpp).
Selecting a facial clip therefore cannot preserve continuous body playback.

The next playback implementation should have explicit body and facial tracks,
with separate managers and per-track completion/repeat state. Evaluate both
inside a single LoadParameters/SaveParameters pair, then apply procedural
effects, physics and pose before the final model update. Parameter overlap,
evaluation order, fade transitions and terminal-frame behavior need visual tests
with real assets; simply starting two clips in one manager is insufficient.

Preserve clip categories from source metadata in an import manifest. Do not
guess categories solely from exported group names or filenames. For generic
model3 imports without that metadata, preserve an unclassified clip list.
Standard `FileReferences.Expressions` support is a separate feature and does
not replace Sekai facial-motion playback.

The bridge also does not currently apply model3 `Layout` or load standard
expressions; motion sound playback is absent. These are remaining capabilities,
not evidence that the current renderer fails for every model.

## Validation sequence after SDK staging

1. Compile the bridge and all platform shaders against the matching SDK.
2. Render a bundled SDK sample using the snapshot tool; check texture alpha,
   clipping, pose and resize behavior on macOS and iOS.
3. Load a self-contained Sekai model with known body/facial metadata; verify
   independent playback, switching one track while the other continues, loops,
   terminal poses and overlapping parameters.
4. Verify background/resume and repeated model replacement, including GPU
   resource lifetime. Only then claim native Sekai playback works.
