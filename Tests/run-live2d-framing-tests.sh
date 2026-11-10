#!/bin/bash
set -euo pipefail
repo="$(cd "$(dirname "$0")/.." && pwd)"
products_dir="${1:?Pass the Xcode Debug products directory containing Astray.framework}"
check_dir=$(mktemp -d /tmp/sekai-live2d-framing.XXXXXX)
trap 'rm -rf "$check_dir"' EXIT
xcrun swiftc -swift-version 6 -parse-as-library -module-cache-path "$check_dir/modules" \
    -I "$repo/Packages/Astray/Astray/Live2D/Bridge" -F "$products_dir" -framework Astray \
    -Xlinker -rpath -Xlinker "$products_dir" \
    "$repo/GreatSekai/Tools/Live2DViewer/Live2DCatalog.swift" \
    "$repo/GreatSekai/Tools/Live2DViewer/NativeLive2DPlayer.swift" \
    "$repo/Tests/Live2DModelFramingTests.swift" -o "$check_dir/framing"
"$check_dir/framing"
