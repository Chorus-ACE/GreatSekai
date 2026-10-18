#!/usr/bin/env bash
#
# Populate Vendor/ from a local Cubism SDK for Native download.
#
# Nothing Live2D ships is committed to this repo. Cubism Core is under the Live2D
# Proprietary Software License and the Framework under the Cubism SDK licence;
# neither is ours to redistribute, so both are gitignored and reproduced here from
# the SDK you downloaded yourself. Run this once after cloning.
#
# Usage:
#   Scripts/bootstrap.sh [/path/to/CubismSdkForNative-5-r.5]
#
# Defaults to ~/Downloads/CubismSdkForNative-5-r.5.

set -euo pipefail

SDK="${1:-$HOME/Downloads/CubismSdkForNative-5-r.5}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENDOR="$ROOT/Vendor"

if [[ ! -d "$SDK/Core" || ! -d "$SDK/Framework" ]]; then
  echo "error: no Cubism SDK at $SDK" >&2
  echo "       expected Core/ and Framework/ inside it." >&2
  echo "       pass the path explicitly: Scripts/bootstrap.sh /path/to/CubismSdkForNative-5-r.X" >&2
  exit 1
fi

VERSION="$(sed -n 's/^version: *//p' "$SDK/cubism-info.yml" 2>/dev/null || echo unknown)"
echo "==> Cubism SDK $VERSION at $SDK"

# ---------------------------------------------------------------------------
# 1. Core -> XCFramework
# ---------------------------------------------------------------------------
# SwiftPM can't consume raw .a files per platform/configuration, so the Release
# slices are assembled into one XCFramework. Device and simulator can't share a
# slice (same arm64 arch, different platform), hence separate -library entries;
# the two macOS arches DO share one, so they're lipo'd into a universal first.

CORE="$SDK/Core/lib"
HEADERS="$SDK/Core/include"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

echo "==> assembling Live2DCubismCore.xcframework"

# iOS simulator: fold arm64 + x86_64 into one universal slice so the framework
# works on both Apple Silicon and Intel Macs.
mkdir -p "$STAGE/sim"
lipo -create \
  "$CORE/ios/Release-iphonesimulator-arm64/libLive2DCubismCore.a" \
  "$CORE/ios/Release-iphonesimulator-x86_64/libLive2DCubismCore.a" \
  -output "$STAGE/sim/libLive2DCubismCore.a"

# macOS: same, arm64 + x86_64 universal.
mkdir -p "$STAGE/mac"
lipo -create \
  "$CORE/macos/arm64/libLive2DCubismCore.a" \
  "$CORE/macos/x86_64/libLive2DCubismCore.a" \
  -output "$STAGE/mac/libLive2DCubismCore.a"

rm -rf "$VENDOR/Live2DCubismCore.xcframework"
mkdir -p "$VENDOR"
xcodebuild -create-xcframework \
  -library "$CORE/ios/Release-iphoneos/libLive2DCubismCore.a" -headers "$HEADERS" \
  -library "$STAGE/sim/libLive2DCubismCore.a"                 -headers "$HEADERS" \
  -library "$STAGE/mac/libLive2DCubismCore.a"                 -headers "$HEADERS" \
  -output "$VENDOR/Live2DCubismCore.xcframework" >/dev/null

# ---------------------------------------------------------------------------
# 2. Framework source
# ---------------------------------------------------------------------------
# Copied rather than submoduled so the Framework always matches the Core binary
# it was released with; a version skew between them is a miserable class of bug.

echo "==> copying Framework source"
rm -rf "$VENDOR/CubismFramework"
mkdir -p "$VENDOR/CubismFramework"
cp -R "$SDK/Framework/src" "$VENDOR/CubismFramework/src"

# Record what this tree was built from, so a stale Vendor/ is diagnosable.
cat > "$VENDOR/CUBISM_VERSION" <<EOF
version: $VERSION
source:  $SDK
staged:  $(date -u +%Y-%m-%dT%H:%M:%SZ)
EOF

# ---------------------------------------------------------------------------
# 3. A sample model, for tests
# ---------------------------------------------------------------------------
# Hiyori is the same character proj-airi ships, and comes with the SDK already
# extracted. Staged (not committed) so the load tests have something real to open
# rather than only exercising failure paths.

if [[ -d "$SDK/Samples/Resources/Hiyori" ]]; then
  echo "==> copying Hiyori sample model"
  rm -rf "$VENDOR/Models/Hiyori"
  mkdir -p "$VENDOR/Models"
  cp -R "$SDK/Samples/Resources/Hiyori" "$VENDOR/Models/Hiyori"
fi

echo "==> done"
echo "    Vendor/Live2DCubismCore.xcframework  ($(find "$VENDOR/Live2DCubismCore.xcframework" -name '*.a' | wc -l | tr -d ' ') slices)"
echo "    Vendor/CubismFramework/src           ($(find "$VENDOR/CubismFramework/src" -name '*.cpp' | wc -l | tr -d ' ') .cpp files)"
echo
echo "Now: swift build"
