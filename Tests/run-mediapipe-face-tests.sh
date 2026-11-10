#!/bin/bash
set -euo pipefail
repo="$(cd "$(dirname "$0")/.." && pwd)"
products_dir="${1:?Pass the Xcode Debug products directory}"
sample_image="${2:?Pass a local public face fixture image}"
check_dir=$(mktemp -d /tmp/sekai-mediapipe-test.XXXXXX)
trap 'rm -rf "$check_dir"' EXIT
cp -R "$products_dir/SekaiMediaPipe_SekaiMediaPipeModels.bundle" "$check_dir/"
xcrun swiftc -swift-version 6 -parse-as-library -I "$products_dir" \
    -I "$repo/Packages/Astray/Astray/Live2D/Bridge" -F "$products_dir" -framework Astray \
    -Xlinker -rpath -Xlinker "$products_dir" \
    "$products_dir/SekaiMediaPipe.o" "$products_dir/SekaiMediaPipeModels.o" \
    "$repo/GreatSekai/Tools/Live2DViewer/Live2DCatalog.swift" \
    "$repo/GreatSekai/Tools/Live2DViewer/NativeLive2DPlayer.swift" \
    "$repo/GreatSekai/Tools/Live2DViewer/Live2DFaceCaptureMac.swift" \
    "$repo/Tests/MediaPipeFaceTrackingTests.swift" -o "$check_dir/check"
"$check_dir/check" "$sample_image"
