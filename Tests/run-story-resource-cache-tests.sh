#!/bin/sh
set -eu
project=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
products=${1:?Pass the macOS Xcode Build/Products/Debug directory after building GreatSekai}
output=$(mktemp -d)
trap 'rm -rf "$output"' EXIT
xcrun swiftc -swift-version 6 -parse-as-library \
    -module-cache-path "$output/modules" -I "$project/Packages/Astray/Astray/Live2D/Bridge" \
    -F "$products" -framework Astray -Xlinker -rpath -Xlinker "$products" \
    "$project/Packages/Astray/Tests/AssetCacheTests.swift" -o "$output/tests"
"$output/tests"
