#!/bin/sh
set -eu
project=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
output=$(mktemp -d)
trap 'rm -rf "$output"' EXIT
swiftc -module-cache-path "$output/cache" \
    "$project/GreatSekai/Methods/ImageInfo.swift" \
    "$project/Tests/ImageSaveTests.swift" -o "$output/tests"
"$output/tests"
