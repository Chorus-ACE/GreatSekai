// Headless Live2D frame snapshot: renders one frame through the REAL
// Live2DKit/Cubism stack (real shaders, real model, real Metal device) into an
// offscreen texture and writes it as PNG. Run via Scripts/snapshot.sh.
//
// This exists because rendering defects on this stack are otherwise visible only
// on a phone, one build-install-look cycle at a time. Two device-visible bugs were
// diagnosed with it in minutes: the flipped texture atlas, and the premultiplied
// flag that composited a solid white rectangle over the torso. It also DISPROVED
// two plausible theories (per-drawable clearing; offscreen composites) before
// they cost a fix. Measurement over inference.
//
// Bundle.main for a CLI binary is the directory beside the executable, which is
// how Cubism's FrameworkMetallibs lookup is satisfied without an app bundle:
// the run script copies the .metallibs next to the built binary.
//
// Usage: snapshot [out.png] [path/to/Model.model3.json]

import CoreGraphics
import Foundation
import ImageIO
import Live2DKit
import Metal
import MetalKit
import UniformTypeIdentifiers

let packageRoot = URL(fileURLWithPath: #filePath)  // Tools/snapshot/main.swift
    .deletingLastPathComponent()
    .deletingLastPathComponent()
    .deletingLastPathComponent()
let outPath = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "frame.png"
let modelURL = CommandLine.arguments.count > 2
    ? URL(fileURLWithPath: CommandLine.arguments[2])
    : packageRoot.appendingPathComponent("Vendor/Models/Hiyori/Hiyori.model3.json")
let width = Int(ProcessInfo.processInfo.environment["W"] ?? "600")!, height = Int(ProcessInfo.processInfo.environment["H"] ?? "900")!

guard let device = MTLCreateSystemDefaultDevice() else { fatalError("no Metal device") }

Live2DRuntime.start()
let model = try Live2DModel(contentsOf: modelURL)
print("params:", model.parameterIDs.count,
      "lipSync:", model.lipSyncParameterIDs,
      "eyeBlink:", model.eyeBlinkParameterIDs)

// POSE_FADE=<seconds> overrides the pose3.json part-swap fade through the real
// bridge path: the A/B lever for the arm-set ghost at idle-clip transitions.
if let fade = ProcessInfo.processInfo.environment["POSE_FADE"].flatMap(Double.init) {
    model.setPoseFadeDuration(fade)
    print("pose fade override:", fade)
}

guard let renderer = Live2DRenderer(model: model, device: device, width: width, height: height) else {
    fatalError("renderer refused")
}
print("isReady:", renderer.isReady)
renderer.premultipliedAlpha = false

// FRAME_SCALE / FRAME_OFFSET_Y tune the upper-body framing (screen-space zoom +
// vertical shift on top of the fit); they are the levers behind the portrait crop.
let env = ProcessInfo.processInfo.environment
if let scale = env["FRAME_SCALE"].flatMap(Float.init) {
    renderer.framingScale = scale
}
if let offset = env["FRAME_OFFSET_Y"].flatMap(Float.init) {
    renderer.framingOffsetY = offset
}
if renderer.framingScale != 1 || renderer.framingOffsetY != 0 {
    print("framing:", renderer.framingScale, renderer.framingOffsetY)
}

// Textures, exactly as the app loads them: MTKTextureLoader, no flip (Cubism's UVs
// are authored against the atlas as stored; flipping was the shredded-model bug),
// straight alpha (premultiplied was the white-rectangle bug). Names come from the
// model's own FileReferences.Textures, in order.
let loader = MTKTextureLoader(device: device)
let modelDir = modelURL.deletingLastPathComponent()
let model3 = try JSONSerialization.jsonObject(with: Data(contentsOf: modelURL)) as! [String: Any]
let textureNames = ((model3["FileReferences"] as? [String: Any])?["Textures"] as? [String]) ?? []
for (i, name) in textureNames.enumerated() {
    let tex = try loader.newTexture(URL: modelDir.appendingPathComponent(name), options: [:])
    renderer.bindTexture(tex, at: i)
    print("bound", name, tex.width, "x", tex.height, "format", tex.pixelFormat.rawValue)
}

// Neutral pose, mouth open a little so the lipsync channel is visibly live.
model.setValue(0.6, for: "ParamMouthOpenY")

// Optional idle simulation: `snapshot out.png [model] [seconds] [motion]` steps at
// 60 fps for `seconds` with physics evaluated per step. Without `motion` the drive
// is the standard Cubism sway table; with `motion` (e.g. "Idle:0") the named
// authored clip plays through the motion queue instead, so the frame shows where
// the CLIP put the body at that instant, the thing device eyes would otherwise be
// the only way to check.
let simulateSeconds = CommandLine.arguments.count > 3 ? Double(CommandLine.arguments[3]) ?? 0 : 0
let motionSpec = CommandLine.arguments.count > 4 ? CommandLine.arguments[4] : nil
if simulateSeconds > 0 {
    print("hasPhysics:", model.hasPhysics, "motionGroups:", model.motionGroupNames)
    let step = 1.0 / 60.0
    if let motionSpec {
        // "Idle:0" plays one clip. "Idle:0+Idle:5" plays the first to completion, then
        // starts the second: the harness view of a CLIP TRANSITION (the app's random
        // idle rotation), which is where arm-set swaps ghost.
        let clips: [(group: String, index: Int)] = motionSpec.split(separator: "+").map {
            let parts = $0.split(separator: ":")
            return (String(parts[0]), parts.count > 1 ? Int(parts[1]) ?? 0 : 0)
        }
        var queue = clips
        let first = queue.removeFirst()
        guard model.startMotion(group: first.group, index: first.index) else {
            fatalError("no motion \(first); groups: \(model.motionGroupNames)")
        }
        var t = 0.0
        while t < simulateSeconds {
            t += step
            if model.motionsFinished, let next = queue.first {
                queue.removeFirst()
                model.startMotion(group: next.group, index: next.index)
                print("transition -> \(next.group):\(next.index) at t=\(String(format: "%.2f", t))")
            }
            model.evaluateMotions(deltaTime: step)
            model.update(deltaTime: step)
        }
        print("motion \(motionSpec) at t=\(simulateSeconds) finished:", model.motionsFinished)
    } else {
        let sway: [(id: String, offset: Double, peak: Double, cycle: Double)] = [
            ("ParamAngleX", 0, 15, 6.5345),
            ("ParamAngleY", 0, 8, 3.5345),
            ("ParamAngleZ", 0, 10, 5.5345),
            ("ParamBodyAngleX", 0, 4, 15.5345),
            ("ParamBreath", 0.5, 0.5, 3.2345),
        ]
        var t = 0.0
        while t < simulateSeconds {
            t += step
            for p in sway {
                model.setValue(Float(p.offset + p.peak * sin(2 * .pi * t / p.cycle)), for: p.id)
            }
            model.update(deltaTime: step)
        }
    }
} else {
    // Initialize pose-controlled part visibility even without advancing time.
    // The raw update() only updates Core geometry and leaves alternate parts visible.
    model.update(deltaTime: 0)
}

// Offscreen render target matching what Live2DRenderer.configure gives an MTKView.
let colorDesc = MTLTextureDescriptor.texture2DDescriptor(
    pixelFormat: .bgra8Unorm, width: width, height: height, mipmapped: false)
colorDesc.usage = [.renderTarget, .shaderRead]
let color = device.makeTexture(descriptor: colorDesc)!

let depthDesc = MTLTextureDescriptor.texture2DDescriptor(
    pixelFormat: .depth32Float, width: width, height: height, mipmapped: false)
depthDesc.usage = [.renderTarget]
depthDesc.storageMode = .private
let depth = device.makeTexture(descriptor: depthDesc)!

let pass = MTLRenderPassDescriptor()
pass.colorAttachments[0].texture = color
pass.colorAttachments[0].loadAction = .clear
pass.colorAttachments[0].clearColor = MTLClearColorMake(0.15, 0.13, 0.11, 1)  // page-ish
pass.colorAttachments[0].storeAction = .store
pass.depthAttachment.texture = depth
pass.depthAttachment.loadAction = .clear
pass.depthAttachment.clearDepth = 1.0
pass.depthAttachment.storeAction = .dontCare

let queue = device.makeCommandQueue()!
let cb = queue.makeCommandBuffer()!
renderer.draw(commandBuffer: cb, renderPassDescriptor: pass,
              drawableSize: CGSize(width: width, height: height))
cb.commit()
cb.waitUntilCompleted()
if let err = cb.error { fatalError("command buffer error: \(err)") }

// Read back and write PNG.
var bytes = [UInt8](repeating: 0, count: width * height * 4)
color.getBytes(&bytes, bytesPerRow: width * 4,
               from: MTLRegionMake2D(0, 0, width, height), mipmapLevel: 0)
// BGRA → RGBA
for i in stride(from: 0, to: bytes.count, by: 4) { bytes.swapAt(i, i + 2) }

let cs = CGColorSpace(name: CGColorSpace.sRGB)!
let ctx = CGContext(data: &bytes, width: width, height: height, bitsPerComponent: 8,
                    bytesPerRow: width * 4, space: cs,
                    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
let image = ctx.makeImage()!
let dest = CGImageDestinationCreateWithURL(
    URL(fileURLWithPath: outPath) as CFURL, UTType.png.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dest, image, nil)
CGImageDestinationFinalize(dest)
print("wrote", outPath)
