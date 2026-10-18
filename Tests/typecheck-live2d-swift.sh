#!/bin/bash
set -euo pipefail
repo="$(cd "$(dirname "$0")/.." && pwd)"
check_dir=$(mktemp -d /tmp/sekai-live2d-typecheck.XXXXXX)
trap 'rm -rf "$check_dir"' EXIT
mkdir -p "$check_dir/CubismBridge"
cat > "$check_dir/CubismBridge/module.modulemap" <<EOF
module CubismBridge {
  umbrella header "$repo/Packages/Live2DKit/Sources/CubismBridge/include/CubismBridge.h"
  export *
}
EOF
python3 - "$repo" "$check_dir" <<'PY'
import sys
from pathlib import Path
source=(Path(sys.argv[1])/'GreatSekai/Tools/Live2DViewer/Live2DViewerView.swift').read_text()
start=source.index('enum Live2DViewerError:')
end=source.index('\nstruct NativeLive2DDetailView:',start)
(Path(sys.argv[2])/'Live2DViewerError.swift').write_text('import Foundation\n'+source[start:end])
PY
for sdk in macosx iphonesimulator; do
  sdk_path=$(xcrun --sdk "$sdk" --show-sdk-path)
  target=arm64-apple-macos15.0
  if [ "$sdk" = iphonesimulator ]; then target=arm64-apple-ios17.0-simulator; fi
  mkdir -p "$check_dir/$sdk"
  xcrun swiftc -emit-module -module-name Live2DKit -swift-version 6 -target "$target" -sdk "$sdk_path" -I "$check_dir/CubismBridge" "$repo"/Packages/Live2DKit/Sources/Live2DKit/*.swift -emit-module-path "$check_dir/$sdk/Live2DKit.swiftmodule"
  xcrun swiftc -typecheck -swift-version 5 -default-isolation MainActor -target "$target" -sdk "$sdk_path" -I "$check_dir/CubismBridge" -I "$check_dir/$sdk" "$check_dir/Live2DViewerError.swift" "$repo/GreatSekai/Tools/Live2DViewer/NativeLive2DPlayer.swift"
  echo "$sdk native Swift player typecheck passed (headers only; Core/Metal execution not tested)."
done
