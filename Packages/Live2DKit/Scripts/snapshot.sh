#!/bin/bash
#
# Render one headless frame of a Live2D model to PNG: the fast eyeball loop.
#
#   Scripts/snapshot.sh [out.png] [path/to/Model.model3.json]
#
# Defaults: frame.png, the staged Hiyori. Needs bootstrap.sh (model + framework)
# and build-metallibs.sh macosx (shaders) to have run.
#
# Why the copy dance: Cubism loads its shaders from Bundle.main, which for a CLI
# binary is the directory beside the executable, so the metallibs are staged
# there, standing in for the app bundle.

set -euo pipefail
cd "$(dirname "$0")/.."

LIBS=Vendor/FrameworkMetallibs-macosx
if [ ! -d "$LIBS" ]; then
  echo "error: $LIBS missing; run Scripts/build-metallibs.sh macosx first" >&2
  exit 1
fi

swift build --product snapshot
BIN=$(swift build --show-bin-path)
rm -rf "$BIN/FrameworkMetallibs"
cp -R "$LIBS" "$BIN/FrameworkMetallibs"
exec "$BIN/snapshot" "$@"
