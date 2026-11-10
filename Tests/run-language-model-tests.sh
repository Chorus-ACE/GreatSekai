#!/bin/sh
set -eu
project=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
output=$(mktemp -d)
trap 'rm -rf "$output"' EXIT
xcrun swiftc -swift-version 6 -default-isolation MainActor \
    -module-cache-path "$output/cache" \
    "$project/GreatSekai/Settings/Intelligence/LanguageModelManager.swift" \
    "$project/GreatSekai/Settings/Intelligence/OpenAICompatibleModel.swift" \
    "$project/GreatSekai/Settings/Intelligence/ChatGPTConnection.swift" \
    "$project/GreatSekai/Settings/Intelligence/ChatGPTModel.swift" \
    "$project/Tests/ChatGPTTests.swift" \
    "$project/Tests/LanguageModelTests.swift" -o "$output/tests"
"$output/tests"
