# Content and collection validation

After a macOS Xcode build, run
`sh GreatSekai/Tests/run-story-translation-tests.sh /path/to/Build/Products/Debug`
to validate official transcript alignment across differing snippet offsets,
unique voice matching, ambiguous/missing matches, and model JSON validation
(including missing, duplicate, and unexpected IDs or empty translations). It also
checks all 26 bundled names, speaker overrides, SEKAI terminology, neighboring context,
malformed-output retries, persistent translation/summary caches, source/language/model
invalidation, continued translation after provider/format errors, retrying only failed
batches (including after reopening), all-batch failures, explicit cancellation, cache
clearing, stale requests, and translation
through a registered LanguageModelSession provider. The runner supplies the SekaiKit
resource bundle so the real PreCache is exercised. These fixtures make no network requests.
Set `SEKAI_VERIFY_SYSTEM_MODEL=1` to additionally translate a small fixture through the
real on-device model when it is available. Remote API/ChatGPT accounts still need a live
check with the user's configured provider.

On macOS 27 or later, run `sh GreatSekai/Tests/run-language-model-tests.sh` to
validate model CRUD, default selection, persistence, protected system entries,
credential failures, direct `LanguageModelSession` initialization, and a complete
function-tool round-trip. Network requests are intercepted with `URLProtocol`;
the suite uses isolated preferences and in-memory credentials, with no real API calls.

Run `sh GreatSekai/Tests/run-lyrics-typography-tests.sh` from the Sekai workspace to
check performer ID/color resolution, ordered performer gradients, contrast in light and
dark appearances, and native ruby annotation ranges and wrapping. The renderer uses
UTF-16 ranges, including emoji before annotated words. Set `SEKAI_RUBY_PREVIEW` to a
PNG path to inspect the offscreen rendering. Lyrics without readings or shared-performer gradients retain native
selectable text; annotated and gradient lines expose a copy-line context-menu action and a plain
Japanese accessibility label.

From the Sekai workspace:

```sh
SEKAI_MASTER_TEST_DATA=/path/to/regional-fixtures \
SEKAI_ADDITIONAL_TEST_DATA=/path/to/content-fixtures \
swift test --package-path SekaiKit --filter 'GachaStickerTests|AdditionalContentTests'
sh GreatSekai/Tests/run-collection-tests.sh
sh GreatSekai/Tests/run-collection-batch-tests.sh
sh GreatSekai/Tests/run-sekaipedia-tests.sh
```

AdditionalContentTests expects the original `tips`, `mysekaiFixtures`, `eventStories`,
`unitStories`, `cardEpisodes`, `music_metas` and `scenario` JSON files in the additional fixture directory. Without
that environment variable, only the external-fixture test is skipped. The collection
runner compiles the production codec and shared storage directly and uses a temporary
directory. It checks persistence, corruption reporting, Unicode names, trained and
normal variants, empty collections and malformed import codes.
It also checks legacy archive compatibility, stable built-in collection IDs,
24-hour refresh boundaries, snapshot replacement and preservation of user collections.

After a macOS build, run
`SEKAI_PROTOBUF_TEST_DATA=/path/to/Sekai-Protobuf-Assets sh GreatSekai/Tests/run-builtin-collection-tests.sh /path/to/Build/Products/Debug`
to verify built-in classification and the normal/trained artwork variants against
the local `card.aar` archive, without making network requests. It also verifies
that 200 collection-row metadata requests share one decoded table, with separate
source/locale caches, expiry, missing-ID refresh, retry and protection against
an older in-flight load overwriting a newer daily refresh.

The collection batch runner checks shared in-flight availability requests, separate
URL entries for regional/normal/trained art, positive and negative cache expiry,
retrying transport failures, bounded parallel checks, batched updates and cancellation.
It also compares serial and parallel processing with simulated 20 ms requests;
no network access or changes to the user's collections are needed.

The Sekaipedia runner compiles the production resolver and intercepts its HTTP requests
locally. It checks card/event/music ID mappings, separate caches, missing and malformed
results, HTTP failures, timeouts, and successful retries without network access.

The app target embeds GreatSekaiWidgets on macOS and iOS. Both targets use
`group.com.qastor.GreatSekai.Widgets`; device signing must provision that App Group
for both bundle IDs. Unsigned builds verify compilation and embedding, but cannot
verify shared-container access or WidgetKit gallery registration. Widget card art is
cached as downsampled JPEGs by the app and used offline by the extension. Four timeline
entries request rotation every 15 minutes; WidgetKit controls actual refresh timing.

References: the local Greatdori Comic, SongMeta, StoryViewer and card collection
implementations, and Sekai Viewer's `ComicList.tsx`, `MusicMeta.tsx`,
`MysekaiFixtureDetail.tsx`, `mysekaiFixtureUtils.ts`, and `storyLoader.ts` on its `dev`
branch. Music Meta preserves Sekai Viewer's source coefficients; it does not invent
team score or efficiency calculations.


## October 4 refinement checks

- 19 SekaiKit tests passed against the downloaded fixtures, including transcript
  order, regional voice paths, avatar mapping, collaboration voice aliases and chapter images.
- Collection persistence/codec checks passed, including 1,500 malformed imports.
- macOS and iOS Simulator builds pass with the native SDK absent. These builds exercise
  Live2D's unavailable state, not the native Cubism implementation.
- Music Meta column ordering uses `Table`'s comparator binding; compact layouts expose
  the same numeric sort fields. Difficulty cells use the existing SongDifficultyIndicator.
- Comic images retain their natural aspect ratio (sample: 644 × 478); the overview
  includes a thumbnail, title, player-rank bounds and ID from `tips.json`.
- Interactive macOS checks completed: Music Meta duration ascending/descending,
  Notes sorting and search after sorting; existing difficulty indicators; Comic list
  aspect ratio and detail thumbnail/rank bounds; Story Viewer avatars and dialogue;
  Event episode navigation; Gacha banners. The user confirmed story voice playback.
- Runtime testing found an AppKit stall while diffing thousands of reordered Music Meta
  rows. Replacing table identity when sorting/searching avoids that stall; the same
  interactions passed after the fix.
- Runtime testing also found that an unsigned macOS app can receive an App Group URL
  without write access. Debug builds now fall back to local Application Support when
  the shared directory cannot be used. Regression checks cover a missing group, a
  writable group, and an unusable group followed by fallback save/load.
- Remaining interactive checks: collection creation/card addition/relaunch persistence,
  editing/import/export, and Widget registration/rotation. The UI automation connection
  is currently unavailable. The existing Mac provisioning profile lacks App Groups;
  updating the project's signing configuration is awaiting user confirmation.
- `bash Tests/typecheck-live2d-swift.sh` checks the native player against actual bridge
  headers and Swift wrappers for both Apple platforms without linking Cubism. It does
  not substitute for building the C++ bridge or exercising the GPU.
- Live2D setup and remaining native validation are documented in
  [Packages/Live2DKit/README.md](../Packages/Live2DKit/README.md). Test the user's local
  Miku model plus the SDK sample on macOS and iOS after SDK setup; inspect Metal validation
  output, texture orientation, motion playback, resize, pause/resume and resource release.
  This records the October state. The November online viewer and native rendering
  validation are described below.

## Cache management checks

Run `sh GreatSekai/Tests/run-advanced-cache-tests.sh` to verify byte totals and
selective removal for information, story transcripts, all four 3D cache roots, and
the separate AI outputs directory (translations, summaries, and intermediate results).
Fixtures also check empty selections, repeated clearing, symlinks, missing directories,
and preservation of unrelated files. SDWebImage caches use the framework's APIs.

After a macOS build, run
`sh GreatSekai/Tests/run-story-resource-cache-tests.sh /path/to/Build/Products/Debug`
for Astray's dedicated resource store. Story Resources reports transcript file sizes
plus `StoryAssetCache.diskUsage()` (downloaded payloads and metadata). It no longer
counts or deletes WebKit data. Astray downloads, playback scripts, and transcript
voice playback share this store; native movie playback reads its cached local files.
The store uses a private ephemeral URLSession without URLCache, keeping new Astray
resources out of the Information category. Scripts, the Haruki index, and resolver
master tables are conditionally revalidated when opened. Other resources are
revalidated daily with ETag/Last-Modified; validated cached data can be used offline. Existing shared HTTP/WebKit caches are
not migrated or removed automatically.

The resource-cache fixtures check exact byte totals, persistence, conditional HTTP
refresh, changed content, regional/host isolation, corrupt/truncated entries, offline
reads, concurrent reuse, and clearing during downloads. They also exercise URLSession's
actual download-to-file path with an intercepted HTTP response. No requests leave the
process. `StoryAssetCache.clear()` cancels pending downloads and invalidates their
writes; active decoded GPU/audio resources are not counted as disk cache.

## ChatGPT connections

`sh GreatSekai/Tests/run-language-model-tests.sh` also runs the ChatGPT tests.
They verify signed RSA identities (including forged tokens and incorrect claims),
callback state and registration isolation, identity-only grants, SSE completion and
late failures, serialized token rotation, sign-out during refresh, and an actual
loopback callback exchange. The real ChatGPT executor is also exercised through an
intercepted URLSession byte stream and LanguageModelSession, covering CR/LF/CRLF,
fragmented UTF-8, BOMs, multi-line data, completion without connection closure,
interrupted/malformed streams, safe HTTP error codes, account model ordering, and
inference after token renewal. SSE event boundaries must be read from bytes:
Foundation's `AsyncBytes.lines` drops the empty lines separating events. The tests use generated keys and in-memory credentials;
no OpenAI account or live inference is needed.

The ChatGPT provider supports text sessions, including story translation, on iOS 27
and macOS 27. Tools, guided generation, and unsupported sampling controls fail
explicitly. OAuth tokens stay in device-only Keychain entries; only account labels,
registration IDs, model choices, and the installation host ID are in UserDefaults.
The listener binds only to `127.0.0.1` and is closed on completion, cancellation, or
a five-minute timeout. macOS requires the incoming-network sandbox capability.
iOS presents SFSafariViewController to keep the app's callback listener running.

On 2026-11-04, a macOS app check with an existing ChatGPT connection returned English
story translations using the account's selected GPT-6-Luna model after the byte-stream
fix. The test was stopped after observing translated dialogue. This validates live
inference, not a fresh OAuth flow. Reauthorization, account switching, revocation,
and Safari callbacks on iPhone/iPad still need manual checks. The macOS app currently
has no network-server entitlement, which is needed for the sandboxed loopback login
listener. The CLI loopback fixture is unsandboxed and does not validate that app
entitlement.

## Default model picker and Private Cloud Compute

Use `ModelPicker()` in a Form to change the persisted default model, or
`ModelPicker { Text("Your.semantic.label") }` for a custom label. The picker lists
built-in, configured API, registered, and connected ChatGPT models. Unavailable
Apple models are disabled. Translation and summary requests observe the shared
selection, cancel the previous request, and use the selected model's cache entries.

Private Cloud Compute is a protected built-in provider on iOS/macOS 27 and later.
The app target includes `com.apple.developer.private-cloud-compute`; using the
service requires [Apple's managed entitlement approval](https://developer.apple.com/private-cloud-compute/)
and an eligible signing profile/device. Availability and inference errors come from
FoundationModels. PCC is not silently replaced with another provider.

The language model regression runner verifies PCC selection persistence, reserved
IDs, deletion/overwrite protection, the provider type, and session construction.
It does not make live PCC requests or establish entitlement eligibility.

## News, episode headings, MV audio and flexible story stages

- `swift test --package-path SekaiKit --filter 'NewsTests|EpisodeHeadingTests|SongVideoTests|LiveTitleTests|AdditionalContentTests'`
  checks regional news targets (including title-less TW banners), optional heading
  fields, World Link character parts, old archives, soundtrack selection and existing
  content. Set `SEKAI_NEWS_FIXTURES` to a directory containing `news-jp.json`,
  `news-en.json`, `news-tw.json` and `news-kr.json` for full source snapshots.
- `swift test --package-path JSON2Proto --filter 'AdditionalConversionTests|LiveTitleConversionTests'`
  checks episode label/character wire round trips and Virtual Live conversion.
- `SongMovieAssetTests.swift` compiles with the production `SongMovieAsset.swift`.
  Pass a video URL, soundtrack URL and unused temporary output filename. The runner
  builds the native composition and exports two seconds after a seek to 60 seconds.
  Real song 8 assets passed both from local files and directly from storage.sekai.best;
  both output tracks are two seconds long. Extracted MV files contain no audio;
  the regional vocal's `music/long/<bundle>/<bundle>.mp3` supplies it. The runner
  also checks matching audio/video source offsets, a zero-based trimmed timeline,
  embedded-audio movies, and padding beyond the media duration. MV padding comes
  from each region's own `fillerSec`, already present in the archives.
- `NewsArticleHTMLTests.swift` compiles with `NewsArticleHTML.swift` and runs without
  a window. It checks Markdown conversion of headings, emphasis, lists, images,
  relative links and tables, and excludes scripts and unsafe link schemes. Optional
  arguments supply an actual TW HTML snapshot and a dynamic JP announcement URL.
- Existing Astray `ViewportTests.swift` and `PlaybackTests.swift` passed with the
  Xcode-built framework, checking Metal rendering at several aspect ratios, safe
  dialogue/choice hit testing and cancelled loading (46 playback assertions).

News uses each edition's `userInformations.json`, as in Sekai Viewer's
`src/components/blocks/SekaiGameNews.tsx`. CN currently has no published table at
that path and is reported unavailable. Absolute TW/KR targets are preserved;
relative JP/EN targets resolve to their own official web origins. Article content
is rendered with MarkdownUI using Greatdori's list/preview/detail layouts.

Main story headings use the source's `episodeNoLabel` (including TW's “第1章” and
CN's “第1话”). World Link headings use optional `gameCharacterId` associations;
opening, ending and character-part names are derived only where the source has no
explicit heading, including single-part chapters and two-part endings. New fields
are optional and older archives are enriched from regional JSON. Schemas and all 13 archives were regenerated, verified, and published in asset
commit `46f186c37bba4cd69755e1ef77c092699975f32e`; the corresponding generator is
`7053b2ea06fce2a2975d634b2db7079d2d3f300c`.

Titles/Honors are supported by app navigation, regional models and asset generation.
Existing Protobuf message field numbers remain unchanged.
All current app and SekaiKit catalog entries are translated into English, Japanese,
Korean, Simplified Chinese and Traditional Chinese. Live dynamic enum/filter keys
now use extractable literals; unused stale keys were removed. No manual extraction
state is used. Catalogs compile with `xcrun xcstringstool compile`.

Title artwork joins each regional `honorGroups` record for the correct event/ranked
background, ranking overlay and custom frame. Live-master titles select the first
level bundle when the root bundle is absent. Common frames and level icons are
bundled from Sekai Viewer's `src/assets/frame` game assets; WebP layers have PNG
fallbacks and failed image requests can be retried. Nine actual layer URLs across
ordinary, event, ranked, achievement and birthday titles returned valid images.

## November 5: online Live2D viewer and faster summaries

Tools → Live2D Viewer now uses Astray's native Cubism renderer with the online JP
model catalog. It supports character/model filtering, motion/expression selection,
pause, replay, looping and framing on an unrestricted canvas. The inspector becomes
a sheet on compact layouts. Catalog and animation-list failures can be retried.
The source note identifies the JP assets explicitly.

After a macOS Xcode build, compile `Live2DViewerTests.swift` with the production
`Live2DCatalog.swift` and `NativeLive2DPlayer.swift`, linking the built Astray framework
and adding `Packages/Astray/Astray/Live2D/Bridge` to the import search path. Run it with
the downloaded `story-player/index.json` and JP `character2ds.json` paths. This test
makes asset requests and needs Metal access, but creates no window. The actual catalog
contained 670 models; Ichika's first model exposed 246 motions and 60 expressions.
A real model rendered on an 800 × 800 texture, visibly animated, stayed in viewer
playback, paused correctly and accepted camera framing. Cubism Core reported 5.1.0.

The story translation runner also checks summary request count and full source
coverage: 35 short dialogue lines now use one request instead of five. A 600-line
remote-model fixture uses six requests including the final merge; all 600 unique
line markers occur in the supplied prompts. No lines are discarded. Existing final
summary caches remain usable. Compact ordered source records and wider consecutive
merges reduce repeated model calls. The final generation uses Foundation Models'
streaming API; incremental delivery depends on the SDK and provider (the current
custom-executor implementation may coalesce snapshots until completion). Tests
verify final streamed assembly, terminology normalization and cache reuse without
calling a real model account. These are request-count results, not a wall-clock
benchmark of an external model.

## Live2D backgrounds and inspector forms

The inspector uses grouped Forms with panel padding. Backgrounds are enumerated
from all pages of Sekai Viewer's JP `scenario/background/` object listing. Image
variants sharing a path are combined, preferring PNG, then JPEG, then WebP. This
covers the published JP scenario directory, not unpublished assets or other regions.
The background panel searches the catalog and previews the selected image; it does
not download the entire image collection. Background changes use a separate Astray
backdrop texture and retain the model's animation and camera state.

`Live2DBackgroundTests.swift` compiles with `Live2DCatalog.swift`, linking the
Xcode-built Astray framework as in `Live2DViewerTests.swift`. Pass any valid PNG
path followed optionally by saved S3 XML listing pages. It checks pagination and
continuation-token escaping, duplicate formats, noncanonical filenames, malformed
and cyclic listings, cancellation, and Metal rendering/replacement/clearing of the
backdrop. The current published listing returned 1,581 backgrounds across four pages.

Live2D motion/expression changes now register only missing clips on the existing
Cubism instance. They retain model textures, physics, backdrop, camera, playback
time and pause state. Animation failures appear in the inspector while the current
scene remains visible; newer choices supersede pending older requests. Selecting
None clears only that animation channel. Replay and framing also retain the runtime.
`Live2DViewerTests.swift` covers these transitions with a real model, including
expression-only changes preserving the motion revision, paused rendering, clearing,
malformed replacements and an intentionally delayed superseded request.

## Live2D viewer controls and automatic backgrounds

The character Form contains the background Picker, custom image URL/background ID
alert, and independent Breathe/Breathe Sway switches. Camera controls and motion
looping are removed from the viewer. The model uses its initial drawable bottom as
its fixed screen baseline; loading a replacement model retains the backdrop.
The parameter Form shows all model-authored ranges, with twelve controls per
page. Manual values override animation and physics until reset, including when paused.

After a macOS Xcode build, run `Tests/run-live2d-controls-tests.sh` with the Debug
products directory containing `Astray.framework`. Its local Haru fixture needs no
network or window and checks real Metal bottom alignment, paused parameter changes,
range clamping/reset, breath/sway, looping off, backdrop retention across models,
failed custom images and custom URL/ID validation.

`Live2DBackgroundPickerTests.swift` also checks Original/Brand New World SEKAI maps,
light/dark day/night selection, all twenty main-character bedrooms, and distant-tree
fallbacks. Virtual Singer model variants retain their SEKAI unit during catalog
decoding; `Live2DViewerTests.swift` verifies band Miku and Brand New World night Miku
against the supplied real catalog and character2ds data.

The viewer now uses a model menu grouped by character (with Other last), plus
motion/expression Pickers in the first inspector tab. Sway, Breathe and Blink have
independent switches. Parameter values are snapshots taken only when that panel
opens or is paused; there is no per-frame UI tracking. A local Haru benchmark took
about 14 ms for 1,000 parameter snapshots.

Viewer framing reserves a fixed model canvas, locks authored root position/size
tracks, and measures the initial rendered alpha baseline once during loading.
The neutral default motion lowers the arms. Models without a neutral clip
(such as v2_21miku_normal) instead use -38 degrees for their standard
ParamArmL1/ParamArmR1 resting angles, matching the game's neutral stance.
Resting values apply only without a body motion; face capture and manual
sliders retain priority. Clearing a motion restores the resting pose. Legacy PARAM_ARM_R_1-style motion IDs
are matched to actual MOC parameter IDs without rewriting the clip's numeric text.
Real-model tests assert lowered arms and a fixed ParamSize when switching actual
clips. Bedroom defaults now cover all twenty main characters;
150 curated variants are validated against the published catalog.

## Live2D selection, iOS menus and face capture

Model menus have localized Unit section headers, with untitled current-selection
and Other sections. v2 models precede older models within each character. Model
and background selection use persistent app preferences; startup also waits for
the model catalog when restoring an existing selection. Replacement loading pauses
the old viewer instead of restoring the story's scale-1 layout. The local render
suite samples this asynchronous interval to detect the previous temporary enlargement.
With no stored selection, the viewer defaults to v2_21miku_normal.

iOS model/background leaf menus contain inline Pickers. Paging buttons use an
explicit borderless style to keep Form row actions separate. The iOS model canvas
stays inside safe areas with 12-point padding and 0.95 camera zoom; the iOS controls
button uses the slider icon. macOS keeps its existing model framing.

On supported iOS devices, Face Tracking starts an ARKit face session after camera
authorization, maps typed ARKit coefficients and relative head orientation to
standard Cubism parameters, and samples at up to 30 Hz and interpolates the displayed pose at 60 Hz. Manual sliders
have priority. Recenter resets head orientation; losing a face eases the pose back to
neutral while preserving calibration for reacquisition. Leaving the viewer or entering the background stops the session.
Model controls invalidate paused Metal frames without continuously refreshing
parameter UI snapshots. Camera purpose text and capture UI have five translations.

On Apple Silicon macOS, the same controls use AVFoundation with MediaPipe Face
Landmarker, pinned to VCam's 0.0.15 native runtime. Apple Vision capture has been
removed. Intel/Rosetta builds hide the capture section and never construct the
unsupported runtime. iOS keeps ARKit: the local package's binary and model target
are both conditional macOS dependencies. The built iOS Simulator app has neither
the MediaPipe framework nor its resource bundle/model.

A serial capture queue analyzes at most 30 BGRA frames per second, preferring
640 × 480 and discarding late frames. MediaPipe outputs 52 expression scores and
a canonical-to-observed 4×4 transform. The viewer normalizes its rotation columns,
calibrates relative orientation with quaternions and maps the scores through
the existing Cubism parameter adapter. macOS yaw follows the model directly;
iOS ARKit pitch is inverted to match its up/down convention. Invalid transforms are
rejected. Calibration, edge warnings, smooth loss/reacquisition and manual-slider
priority remain shared with ARKit. Camera frames stay local and are not saved.
The model resource bundle includes Apache LICENSE, upstream NOTICE and the locked
runtime's third-party license texts.

Run `bash Tests/run-mediapipe-face-tests.sh /path/to/Build/Products/Debug /path/to/public-face.png`
after a macOS build. Google's public fixture is available from
https://storage.googleapis.com/mediapipe-assets/business-person.png . The suite
runs actual inference over five small rotations (five frames each), checks all
52 scores/transform/calibrated mapping and tests face loss using blank frames.
On the local M4 Pro, the 25 warmed tracking frames took approximately 0.13 seconds
including fixture conversion. This is not a live camera latency measurement.
The controls suite also tests quaternion axis directions, recentering, invalid
transforms, smooth return/reacquisition, arm resting values and override priority.
macOS always tracks the eyes independently and swaps the webcam's left/right
blink and eye-smile channels for the model. Blink scores up to 0.05 leave the eye
open; scores from 0.05 to 0.65 interpolate to full closure. Closing eyes use faster
pose interpolation so brief blinks can reach zero. No advanced setting is needed.
iOS retains its ARKit eye coefficients and uses its corrected projected horizontal
face direction; macOS uses mirrored webcam position. Both map horizontal face
position to body yaw and lean, independently of head rotation; face loss and
recalibration return these body parameters to neutral as well.
The controls suite checks independent winks, partial/full closure, short blinks,
body direction, invalid inputs, and actual Cubism parameter overrides.
Platform-specific head direction fixes remain:
ARKit pitch is inverted, while macOS yaw follows the model directly. Live tracking
quality still needs a camera/device check.

Face pose interpolation is independent of camera callbacks. Head motion receives
more damping near rest, expressions respond faster, and a lost face returns to
neutral with a slower blend. Edge and missing-face warnings appear in the
navigation subtitle (or a compact overlay on older systems); edge warnings have
hysteresis to avoid flicker. Pose axes use explicit platform-specific sign conventions.

Run `bash Tests/run-live2d-framing-tests.sh /path/to/Build/Products/Debug` to load
the actual v2_21miku_normal model and measure leg contact at 16:9, square and
portrait viewport sizes through animation. Set SEKAI_FRAMING_IMAGE to export the
first frame. The baseline uses a narrow central body strip so Miku's longer
twintails do not leave her legs above the bottom of the screen.
It also renders the complete model against a solid backdrop at phone portrait,
phone landscape and iPad sizes. iOS uses 80% of the original full-canvas model
framing, without an additional safe-area reduction; the backdrop still fills the screen.

The render suite checks neutral/expressive face mapping, invalid input clamping,
actual face-driven Cubism values, manual precedence and return to animation after
capture stops. It also checks calibrated MediaPipe pose axes and expression mapping without
requiring camera access. ARKit session/camera behavior and visual tracking quality still
require a supported physical iPhone or iPad; Simulator builds validate compilation only, not the camera session or tracking quality.


## Ruby placement with performer gradients

`bash Tests/run-lyrics-typography-tests.sh` compares the gray ruby pixels with
performer gradients on and off for Song 761's reported line at 13/17/26-point
fonts and 90/140/600-point widths, including three redraws of the same renderer.
Draw the Core Text frame before inspecting its glyph runs, and use a fresh drawing
framesetter for each draw: inspecting runs can change cached ruby positions.
An isolated transparency layer lets gradient colors replace the base glyphs while
preserving ruby placement, color-font glyphs, and the surrounding background.


## MV wheel behavior

On macOS, the MV's AVPlayerView routes wheel events to its next responder,
including events over native controls. A running #810 check held the paused
position at 30 seconds while the containing page scrolled. This leaves pointer
scrubbing and playback buttons available. Horizontal wheel seeking was also
checked against AVKit's native controls and did not change the timeline; no custom
horizontal seek implementation was added.
