#!/bin/bash
#
# Compile Cubism's Metal shaders into the individual .metallib files its renderer
# loads at runtime.
#
# WHY THIS EXISTS
#
# Cubism does not use a compiled-in default Metal library. At init,
# `CubismShader_Metal::GenerateShaders` does:
#
#     [[NSBundle mainBundle] URLForResource:@"MetalShaders"
#                             withExtension:@"metallib"
#                              subdirectory:@"FrameworkMetallibs"]
#
# That is, it looks for separate .metallib FILES inside the HOSTING APP's main bundle.
# SwiftPM cannot produce that: it compiles a target's .metal sources into a single
# `default.metallib` inside the package's own resource bundle. So the shaders are
# excluded from the SwiftPM target (see Package.swift) and built here instead.
#
# The blend shaders additionally cannot be compiled bare: Cubism compiles each of
# them once per (color, alpha) blend-mode pair with CSM_COLOR_BLEND_MODE /
# CSM_ALPHA_BLEND_MODE defined. This mirrors that matrix from the vendored
# Shaders/CMakeLists.txt. If Live2D changes the matrix, that file is the source of
# truth and this script must be updated to match.
#
# OUTPUT
#
#   Vendor/FrameworkMetallibs-<sdk>/*.metallib
#
# The host app must embed the contents into its main bundle under a
# `FrameworkMetallibs` directory (a folder reference, not a group), or Cubism finds
# nothing and renders nothing; see README.
#
# Usage: Scripts/build-metallibs.sh [iphoneos|iphonesimulator|macosx] ...
#        defaults to iphoneos + iphonesimulator

set -euo pipefail

cd "$(dirname "$0")/.."
ROOT="$PWD"
SHADER_DIR="$ROOT/Vendor/CubismFramework/src/Rendering/Metal/Shaders"

if [ ! -d "$SHADER_DIR" ]; then
  echo "error: $SHADER_DIR missing; run Scripts/bootstrap.sh first." >&2
  exit 1
fi

SDKS=("$@")
if [ ${#SDKS[@]} -eq 0 ]; then
  SDKS=(iphoneos iphonesimulator)
fi

# Mirrors Shaders/CMakeLists.txt. Order matters only in that the NAME is the mode
# label and the VALUE is the macro integer; both come from that file.
COLOR_MODES=(Normal:0 Add:1 AddGlow:2 Darken:3 Multiply:4 ColorBurn:5 LinearBurn:6
             Lighten:7 Screen:8 ColorDodge:9 Overlay:10 SoftLight:11 HardLight:12
             LinearLight:13 Hue:14 Color:15)
ALPHA_MODES=(Over:0 Atop:1 Out:2 ConjointOver:3 DisjointOver:4)

# Compiled plain, no macros, keeping their own names.
NORMAL_SHADERS=(MetalShaders VertShaderSrcBlend VertShaderSrcMaskedBlend)

# Compiled once per blend-mode pair, output named <base><Color><Alpha>.
BLEND_SHADERS=(FragShaderSrcBlend
               FragShaderSrcMaskBlend
               FragShaderSrcMaskInvertedBlend
               FragShaderSrcMaskInvertedPremultipliedAlphaBlend
               FragShaderSrcMaskPremultipliedAlphaBlend
               FragShaderSrcPremultipliedAlphaBlend)

# NOT compiled standalone: FragShaderSrcColorBlend.metal and
# FragShaderSrcAlphaBlend.metal are #include fragments pulled in by the blend
# shaders. Compiling them directly is an error, not an oversight.

for SDK in "${SDKS[@]}"; do
  OUT="$ROOT/Vendor/FrameworkMetallibs-$SDK"
  TMP="$(mktemp -d)"
  trap 'rm -rf "$TMP"' EXIT
  rm -rf "$OUT"
  mkdir -p "$OUT"

  echo "==> $SDK"

  compile() { # <out-name> <source> [extra metal flags...]
    local name="$1" src="$2"; shift 2
    xcrun -sdk "$SDK" metal "$@" -I "$SHADER_DIR" -o "$TMP/$name.air" -c "$SHADER_DIR/$src.metal"
    xcrun -sdk "$SDK" metallib -o "$OUT/$name.metallib" "$TMP/$name.air"
  }

  # Each variant has independent inputs and outputs. Bound concurrency to avoid
  # launching hundreds of compiler processes, and collect every exit status.
  pending=()
  wait_batch() {
    local result=0 pid
    for pid in "${pending[@]}"; do
      wait "$pid" || result=1
    done
    pending=()
    return "$result"
  }
  enqueue() {
    compile "$@" &
    pending+=("$!")
    if [ "${#pending[@]}" -ge 8 ]; then wait_batch; fi
  }

  for s in "${NORMAL_SHADERS[@]}"; do
    enqueue "$s" "$s"
  done
  wait_batch
  echo "    ${#NORMAL_SHADERS[@]} base libraries"

  count=0
  for s in "${BLEND_SHADERS[@]}"; do
    for c in "${COLOR_MODES[@]}"; do
      for a in "${ALPHA_MODES[@]}"; do
        cname="${c%%:*}"; cval="${c##*:}"
        aname="${a%%:*}"; aval="${a##*:}"
        # Cubism skips the default pair; that combination is served by the base
        # (non-blend) shader set, so emitting it here would be dead weight.
        if [ "$cname" = "Normal" ] && [ "$aname" = "Over" ]; then continue; fi
        enqueue "$s$cname$aname" "$s" \
          -D "CSM_COLOR_BLEND_MODE=$cval" -D "CSM_ALPHA_BLEND_MODE=$aval"
        count=$((count + 1))
      done
    done
  done
  wait_batch
  echo "    $count blend variants"

  # Xcode's script sandbox requires every output file to be declared explicitly.
  # Names are identical on all three platforms; no SDK contents enter this list.
  {
    echo '// Cubism Native 5-r.5 shader outputs; regenerate with build-metallibs.sh.'
    for library in "$OUT"/*.metallib; do
      printf '%s/%s\n' '$(TARGET_BUILD_DIR)/$(UNLOCALIZED_RESOURCES_FOLDER_PATH)/FrameworkMetallibs' "${library##*/}"
    done
  } > "$ROOT/Scripts/FrameworkMetallibsOutputs.xcfilelist"

  rm -rf "$TMP"; trap - EXIT
  echo "    → $OUT ($(ls "$OUT" | wc -l | tr -d ' ') metallibs)"
done
