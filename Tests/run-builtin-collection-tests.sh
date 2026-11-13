#!/bin/sh
set -eu
project=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
products=${1:?Pass the macOS Xcode Build/Products/Debug directory after building GreatSekai}
output=$(mktemp -d)
trap 'rm -rf "$output"' EXIT
xcrun swiftc -D DEBUG -module-cache-path "$output/cache" -I "$products" \
    -Xcc "-fmodule-map-file=$products/../../Intermediates.noindex/GeneratedModuleMaps/CTextureDecoder.modulemap" \
    "$project/AppShared/CardCollectionStore.swift" \
    "$project/GreatSekai/Tools/Collections/BuiltinCardCollections.swift" \
    "$project/GreatSekai/Tools/Collections/CardCollectionMetadataCache.swift" \
    "$project/Tests/BuiltinCardCollectionTests.swift" \
    "$products/SekaiKit.o" "$products/SekaiModelImporter.o" \
    "$products/CTextureDecoder.o" "$products/Alamofire.o" \
    "$products/SwiftyJSON.o" "$products/SwiftProtobuf.o" \
    -o "$output/tests"
PACKAGE_RESOURCE_BUNDLE_PATH="$products" "$output/tests"
