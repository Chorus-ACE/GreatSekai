#!/bin/sh
set -eu
project=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
output=$(mktemp -d)
trap 'rm -rf "$output"' EXIT
swiftc -swift-version 6 -module-cache-path "$output/cache" \
    "$project/GreatSekai/Info/Song/LyricsPerformerPalette.swift" \
    "$project/GreatSekai/Info/Song/LyricsRubyRenderer.swift" \
    "$project/Tests/LyricsTypographyTests.swift" -o "$output/tests"
"$output/tests"
