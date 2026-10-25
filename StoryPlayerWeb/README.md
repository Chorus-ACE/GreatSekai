# GreatSekai story player

GreatSekai embeds [PJSK Scenario Player 0.5.2](https://github.com/Team-Haruki/sekai-scenario-player/tree/v0.5.2) in WKWebView. The engine, PixiJS and the integration are bundled with the app; this does not open the Haruki Toolbox website. The existing transcript remains available. Open a chapter in Tools → Story Viewer, then choose Play Story in its toolbar.

## Sources and regional behavior

- `Episode` from SekaiKit's published `episode.aar` supplies each region's own scenario record and URL. `StoryPlaybackDocument` resolves the JP episode by kind, parent ID and episode ID. It reads the original scenario JSON from that episode's `scenarioURL`, preserving staging, voices and timing.
- Visuals and audio use JP assets, explicitly identified in the native header. A text-region selection resolves that region's own episode record and URL. The integration checks dialogue count, dialogue reference order, speaking model IDs and effect types before overlaying official text. A mismatch or missing regional record is an error; no silent JP substitution or AI translation is performed.
- Haruki's public JP `story-player/index.json` supplies Live2D models, costume motions, SEs and movies. Converted effects and UI sprites are under `jp-assets/story-player/v1/`. Both the global and China asset hosts are supported. Requests remain scoped to the JP tree; the regional text never changes model or audio paths.
- Episodes with part voices additionally read JP `character2ds.json` from Haruki's public master registry for the model asset/unit mapping. This is a direct client JSON dependency, not a new JSON2Proto input.
- The resource resolver is adapted from [Haruki Toolbox revision 6027fc8](https://github.com/Team-Haruki/Haruki-Toolbox/blob/6027fc8f9789df7b94fbd1fc7e7dd1bcfb45d4f6/src/modules/story/engine/urls.ts). Its original MIT notice is retained.

No Protobuf schemas or published archives are changed. Asset regeneration/publication is not needed for this integration. Playback requires the external asset service; it is not an offline asset distribution pipeline.

## Build

From this directory, with Node 22.18 or later:

```sh
npm ci --ignore-scripts
npm test
npm run build
```

The lockfile fixes dependency versions and integrity hashes. The build writes `../GreatSekai/Resources/StoryPlayerWeb.bundle`, already included in the app's Copy Bundle Resources phase. Commit the generated bundle together with integration source changes. No Node installation is needed to build the app from the committed bundle in Xcode.

`THIRD_PARTY_NOTICES.txt` is regenerated from the dependencies actually included in the JS chunks and displayed in Settings → About → Acknowledgements. Pixi's colord package omits its license file; `licenses/colord-LICENSE` preserves the upstream MIT text. The adapter bundles no game assets, commercial fonts or Cubism Core. Cubism Core is loaded separately from the resource host under Live2D's own license.

The pinned player also prebundles `@sekai-world/pixi-live2d-display-mulmotion` v0.5.1 and the Cubism Web Framework into its Cubism chunk. Their MIT and Live2D Open Software license texts are preserved in `licenses/` and included explicitly, since the outer build's module list cannot identify dependencies inside a prebuilt chunk. Recheck these notices when updating the player version. Fonts are disabled in the native adapter and are not included in its bundle.

## Playback lifecycle

Every episode is preloaded using the engine's progress, retry and continue controls. Starting playback requires the player's Start button. On suspension the adapter destroys the player, closes its audio and releases the stage; returning reconstructs the scene at the last snippet and waits for Start again. A microtask defers restoration until the engine's jump continuation exists. Auto, mute, voice, fast-forward and dialogue visibility survive suspension. Leaving the page cancels loads and destroys the player. A terminated WebKit process produces a retryable error.

## Verification

`npm test` covers regional alignment and preservation of JP audio/effect data, rejection of structurally different scripts, costume-specific motion lookup, event-only sounds and asset-host fallback.

`verification/WebKitProbe.swift` runs the actual generated bundle in macOS WebKit. It expects three arguments: the absolute bundle path, a local JSON configuration matching `StoryPlaybackDocument`, and an output directory. Store downloaded scenarios/configurations and screenshots under ignored `.verification/`; never commit game data. Compile with:

```sh
swiftc -parse-as-library -module-cache-path .verification/ModuleCache \
  verification/WebKitProbe.swift -o .verification/WebKitProbe
```

The probe checks initial playback, scene reconstruction at snippet 5, opening the story log, removal of canvases, and audio cleanup. It saves initial/resumed screenshots for visual inspection. Its automatic click bypasses the need for a human gesture in the probe only; the app retains WebKit's normal gesture policy.

Verified with `event_13_02` using the JP scenario and the CN region's official text: both render the scene and pass the resume/log/canvas checks. Audio instrumentation confirms decoded clips, a running audio context and advancing BGM time; teardown closes the contexts and pauses every captured media element. macOS and iOS Simulator app builds and string-catalog compilation pass. App navigation to Play Story and its loading/start controls have also been checked in the current macOS Xcode build. These checks do not establish physical iOS device playback, exhaustive episode coverage or sustained performance.

Upstream 0.5.2 does not yet implement every game feature; its README lists branching/name input, music-video playback, some sound modes and character depth order as remaining limitations.
