# Content and collection validation

From the Sekai workspace:

```sh
SEKAI_MASTER_TEST_DATA=/path/to/regional-fixtures \
SEKAI_ADDITIONAL_TEST_DATA=/path/to/content-fixtures \
swift test --package-path SekaiKit --filter 'GachaStickerTests|AdditionalContentTests'
sh GreatSekai/Tests/run-collection-tests.sh
sh GreatSekai/Tests/run-sekaipedia-tests.sh
```

AdditionalContentTests expects the original `tips`, `mysekaiFixtures`, `eventStories`,
`unitStories`, `cardEpisodes`, `music_metas` and `scenario` JSON files in the additional fixture directory. Without
that environment variable, only the external-fixture test is skipped. The collection
runner compiles the production codec and shared storage directly and uses a temporary
directory. It checks persistence, corruption reporting, Unicode names, trained and
normal variants, empty collections and malformed import codes.

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
  Performance has not been measured. The model importer currently accepts local folders;
  an in-app online model catalog is not implemented.
