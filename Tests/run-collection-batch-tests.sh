#!/bin/sh
set -eu
project=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
output=$(mktemp -d)
trap 'rm -rf "$output"' EXIT
swiftc -D DEBUG -module-cache-path "$output/cache" \
    "$project/AppShared/CardCollectionStore.swift" \
    "$project/GreatSekai/Tools/Collections/CardCollectionBatchOperations.swift" \
    "$project/Tests/CollectionBatchTests.swift" -o "$output/tests"
"$output/tests"
