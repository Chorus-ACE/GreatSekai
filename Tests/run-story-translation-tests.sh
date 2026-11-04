#!/bin/sh
set -eu
project=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
products=${1:?Pass the macOS Xcode Build/Products/Debug directory after building GreatSekai}
output=$(mktemp -d)
trap 'rm -rf "$output"' EXIT
xcrun swiftc -swift-version 6 -default-isolation MainActor \
    -module-cache-path "$output/cache" -I "$products" \
    -Xcc "-fmodule-map-file=$products/../../Intermediates.noindex/GeneratedModuleMaps/CTextureDecoder.modulemap" \
    "$project/GreatSekai/Settings/LanguageModelManager.swift" \
    "$project/GreatSekai/Settings/OpenAICompatibleModel.swift" \
    "$project/GreatSekai/Settings/ChatGPTConnection.swift" \
    "$project/GreatSekai/Settings/ChatGPTModel.swift" \
    "$project/GreatSekai/Tools/StoryViewer/StoryTranslation.swift" \
    "$project/Tests/StoryTranslationTests.swift" \
    "$products/SekaiKit.o" "$products/SekaiModelImporter.o" \
    "$products/CTextureDecoder.o" "$products/Alamofire.o" \
    "$products/SwiftyJSON.o" "$products/SwiftProtobuf.o" \
    -o "$output/tests"
"$output/tests"
