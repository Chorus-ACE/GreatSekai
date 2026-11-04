#!/bin/bash
set -euo pipefail
repo="$(cd "$(dirname "$0")/.." && pwd)"
check_dir=$(mktemp -d /tmp/sekai-story-playback.XXXXXX)
trap 'rm -rf "$check_dir"' EXIT
xcodebuild -project "$repo/Packages/Astray/Astray.xcodeproj" -scheme Astray \
    -configuration Debug -destination 'generic/platform=macOS' \
    -derivedDataPath "$check_dir/build" CODE_SIGNING_ALLOWED=NO > "$check_dir/build.log" 2>&1 || {
    cat "$check_dir/build.log"
    exit 1
}
framework=$(find "$check_dir/build/Build" -path '*/Products/Debug/Astray.framework' -print -quit)
products=$(dirname "$framework")
xcrun swiftc -swift-version 5 -default-isolation MainActor -parse-as-library \
    -module-cache-path "$check_dir/module-cache" \
    -F "$products" -framework Astray -Xlinker -rpath -Xlinker "$products" \
    "$repo/GreatSekai/Tools/StoryViewer/StoryPlaybackDocument.swift" \
    "$repo/Tests/StoryPlaybackDocumentTests.swift" -o "$check_dir/tests"
"$check_dir/tests"
