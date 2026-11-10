import Astray
import Foundation
import Observation
import ImageIO
import simd

@MainActor @Observable final class NativeLive2DPlayer {
    let player = Astray.StoryPlayer()
    private(set) var renderer: StoryRenderer?
    private(set) var loading = false
    private(set) var progress = 0.0
    private(set) var error: String?
    private(set) var motions: [String] = []
    private(set) var initialMotion = ""
    private(set) var expressions: [String] = []
    private(set) var parameters: [ModelParameter] = []
    private(set) var optionsFailed = false
    private var optionsModelID: String?
    private(set) var backgroundLoading = false
    private(set) var backgroundError: String?
    private var backgroundData: Data?
    private var backgroundGeneration = 0
    private var resolver: HarukiAssetResolver?
    private(set) var animationError: String?
    private var animationRequest = 0

    init() {
        player.isModelBreathSwayEnabled = true
    }

    func refreshParameters() {
        guard !loading, error == nil, let values = try? renderer?.modelParameters() else { return }
        parameters = values
    }

    func updateAnimations(motion: String, expression: String) async {
        guard !loading, let resolver, error == nil else { return }
        animationRequest += 1
        let request = animationRequest
        animationError = nil
        do {
            try await player.setModelAnimation(motion: motion, facial: expression, resolver: resolver)
        } catch is CancellationError {
        } catch {
            if !Task.isCancelled, request == animationRequest { animationError = error.localizedDescription }
        }
    }

    func loadBackground(_ background: Live2DBackgroundCatalog.Background?) async {
        await loadBackground(url: background?.url)
    }

    func loadBackground(url: URL?) async {
        backgroundGeneration += 1
        let generation = backgroundGeneration
        backgroundLoading = true
        backgroundError = nil
        defer { if generation == backgroundGeneration { backgroundLoading = false } }
        do {
            let data: Data?
            if let url {
                data = try await StoryAssetCache.shared.data(at: url)
            } else {
                data = nil
            }
            try Task.checkCancellation()
            guard generation == backgroundGeneration else { return }
            if let data {
                guard let source = CGImageSourceCreateWithData(data as CFData, nil),
                      CGImageSourceCreateImageAtIndex(source, 0, nil) != nil else {
                    throw URLError(.cannotDecodeContentData)
                }
            }
            try renderer?.setBackdrop(data)
            backgroundData = data
        } catch {
            if !Task.isCancelled, generation == backgroundGeneration { backgroundError = error.localizedDescription }
        }
    }

    func load(_ model: Live2DCatalog.Model, catalog: Live2DCatalog, motion: String = "", expression: String = "") async {
        loading = true; progress = 0; error = nil
        parameters = []
        initialMotion = ""
        player.usesFixedModelFraming = true
        resolver = nil
        animationRequest += 1
        animationError = nil
        // Keep the old viewer pose and scale while replacement assets load.
        // stop() restores the story layout at scale 1 before the next await.
        player.pause()
        do {
            if renderer == nil {
                renderer = try StoryRenderer(player: player)
                renderer?.anchorsModelToBottom = true
                try renderer?.setBackdrop(backgroundData)
            }
            if optionsModelID != model.id {
                optionsFailed = false
                motions = model.motions; expressions = []
                do {
                    let animations = try await catalog.animations(for: model)
                    try Task.checkCancellation()
                    motions = animations.motions; expressions = animations.expressions
                    optionsModelID = model.id
                } catch {
                    try Task.checkCancellation()
                    optionsFailed = true
                }
            }
            progress = 0.05
            let resolver = try await HarukiAssetResolver(baseURL: catalog.root, scenario: .init())
            try Task.checkCancellation()
            player.onEvent = { [weak self] event in
                guard let self else { return }
                switch event {
                case .loadProgress(let count, let total) where total > 0:
                    self.progress = max(self.progress, Double(count) / Double(total))
                case .warning(let warning):
                    switch warning {
                    case .renderingFailed, .metalUnavailable, .shaderLibraryUnavailable:
                        self.error = warning.localizedDescription
                    default: break
                    }
                default: break
                }
            }
            initialMotion = motion.isEmpty
                ? ["w-normal-default01", "m-normal-default01", "w-normal-default", "m-normal-default", "normal-default01", "Idle_0"].first(where: motions.contains)
                    ?? motions.first { $0.contains("normal") && $0.contains("default") } ?? ""
                : motion
            try await player.loadModel(costume: model.id, characterID: model.character2DID ?? 1,
                                       motion: initialMotion, facial: expression, resolver: resolver)
            try Task.checkCancellation()
            self.resolver = resolver
            let modelParameters = try renderer?.modelParameters() ?? []
            // SEKAI's arm-1 angle is -38° in the neutral standing motion.
            // Models without a bundled idle clip otherwise retain their raised rig pose.
            player.modelRestingParameterValues = Dictionary(uniqueKeysWithValues: modelParameters.compactMap { parameter in
                let key = parameter.id.replacingOccurrences(of: "_", with: "").lowercased()
                guard key == "paramarml1" || key == "paramarmr1",
                      parameter.minimum <= -38, parameter.maximum >= 0 else { return nil }
                return (parameter.id, Float(-38))
            })
            try await renderer?.prepareModelPresentation()
            try Task.checkCancellation()
            parameters = try renderer?.modelParameters() ?? []
            progress = 1; loading = false
        } catch {
            guard !Task.isCancelled else { return }
            self.error = error.localizedDescription
            loading = false
        }
    }
    func activity(paused: Bool, active: Bool, repeats: Bool = false) {
        player.isModelMotionLooping = repeats
        if !loading, error == nil, active, !paused { player.play() } else { player.pause() }
    }
    func close() {
        resolver = nil
        animationRequest += 1
        player.onEvent = nil
        player.modelFaceTrackingValues = [:]
        player.modelRestingParameterValues = [:]
        player.stop()
    }
}

/// A display-rate follower decouples camera measurements from the rendered pose.
nonisolated struct Live2DFacePoseFilter {
    private(set) var values: [String: Float] = [:]
    private var target: [String: Float] = [:]
    private var lastTime: TimeInterval?
    private var returningToNeutral = false

    static func isNearEdge(_ box: CGRect, wasNearEdge: Bool = false) -> Bool {
        let inset: CGFloat = wasNearEdge ? 0.03 : 0
        return box.minX < 0.08 + inset || box.maxX > 0.92 - inset
            || box.minY < 0.07 + inset || box.maxY > 0.88 - inset
    }

    mutating func follow(_ parameters: [String: Float]) {
        returningToNeutral = false
        target = Dictionary(uniqueKeysWithValues: values.keys.map { ($0, Self.neutralValue(for: $0)) })
        target.merge(parameters.filter { $0.value.isFinite }) { _, new in new }
    }

    mutating func returnToNeutral() {
        returningToNeutral = true
        let keys = Set(values.keys).union(target.keys)
        target = Dictionary(uniqueKeysWithValues: keys.map { ($0, Self.neutralValue(for: $0)) })
    }

    mutating func reset() { self = Self() }

    mutating func sample(at time: TimeInterval) -> [String: Float] {
        let delta = min(0.1, max(0, lastTime.map { time - $0 } ?? 1.0 / 60))
        lastTime = time
        for (key, goal) in target {
            let old = values[key] ?? Self.neutralValue(for: key)
            // Head movement gets more damping near rest; eyes and lips stay responsive.
            let head = key.contains("Angle")
            let rate: Float = returningToNeutral ? 6 : head ? min(20, 9 + abs(goal - old) * 0.4) : 24
            let weight = Float(1 - exp(-delta * Double(rate)))
            let value = old + (goal - old) * weight
            values[key] = abs(value - goal) < 0.001 ? goal : value
        }
        return values
    }

    private static func neutralValue(for key: String) -> Float {
        key == "ParamEyeLOpen" || key == "ParamEyeROpen" ? 1 : 0
    }
}

/// Platform-independent face coefficients, mapped only to standard model parameters.
struct Live2DFaceSample: Sendable {
    var pitch: Float = 0
    var yaw: Float = 0
    var roll: Float = 0
    var blendShapes: [String: Float] = [:]

    static func arKit(relativeRotation rotation: simd_float3x3, blendShapes: [String: Float]) -> Self {
        let degrees: Float = 180 / .pi
        return Self(
            pitch: atan2(rotation.columns.2.y, hypot(rotation.columns.2.x, rotation.columns.2.z)) * degrees,
            yaw: atan2(rotation.columns.2.x, rotation.columns.2.z) * degrees,
            roll: atan2(rotation.columns.0.y, rotation.columns.1.y) * degrees,
            blendShapes: blendShapes)
    }

    var parameters: [String: Float] {
        func finite(_ value: Float) -> Float { value.isFinite ? value : 0 }
        func shape(_ key: String) -> Float { min(1, max(0, finite(blendShapes[key] ?? 0))) }
        func signed(_ value: Float) -> Float { min(1, max(-1, value)) }
        let smile = (shape("mouthSmileLeft") + shape("mouthSmileRight")) / 2
        let frown = (shape("mouthFrownLeft") + shape("mouthFrownRight")) / 2
        return [
            "ParamAngleX": min(30, max(-30, finite(yaw))),
            "ParamAngleY": min(30, max(-30, finite(pitch))),
            "ParamAngleZ": min(30, max(-30, finite(roll))),
            "ParamBodyAngleX": min(5, max(-5, finite(yaw) * 0.15)),
            "ParamEyeLOpen": 1 - shape("eyeBlinkLeft"),
            "ParamEyeROpen": 1 - shape("eyeBlinkRight"),
            "ParamEyeLSmile": shape("eyeSquintLeft"),
            "ParamEyeRSmile": shape("eyeSquintRight"),
            "ParamEyeballX": signed((shape("eyeLookInLeft") - shape("eyeLookOutLeft") + shape("eyeLookOutRight") - shape("eyeLookInRight")) / 2),
            "ParamEyeballY": signed((shape("eyeLookUpLeft") + shape("eyeLookUpRight") - shape("eyeLookDownLeft") - shape("eyeLookDownRight")) / 2),
            "ParamBrowLY": signed(shape("browInnerUp") * 0.5 + shape("browOuterUpLeft") - shape("browDownLeft")),
            "ParamBrowRY": signed(shape("browInnerUp") * 0.5 + shape("browOuterUpRight") - shape("browDownRight")),
            "ParamBrowLAngle": signed(shape("browInnerUp") - shape("browDownLeft")),
            "ParamBrowRAngle": signed(shape("browInnerUp") - shape("browDownRight")),
            "ParamMouthOpenY": shape("jawOpen"),
            "ParamMouthForm": signed(smile - frown - shape("mouthPucker") * 0.35),
            "ParamMouthScaleX": signed((shape("mouthStretchLeft") + shape("mouthStretchRight")) / 2 - shape("mouthPucker")),
            "ParamCheek": min(1, smile * 0.6 + shape("cheekPuff") * 0.4)
        ]
    }
}

#if os(iOS) && !targetEnvironment(macCatalyst)
import ARKit
import AVFoundation
import UIKit
import SwiftUI

@MainActor @Observable final class Live2DFaceCapture: NSObject, @preconcurrency ARSessionDelegate {
    enum Phase: Equatable {
        case waiting, tracking, nearEdge, lost, interrupted
        var title: LocalizedStringResource {
            switch self {
            case .waiting: "Live2D.face-tracking.phase.waiting"
            case .tracking: "Live2D.face-tracking.phase.tracking"
            case .nearEdge: "Live2D.face-tracking.phase.near-edge"
            case .lost: "Live2D.face-tracking.phase.lost"
            case .interrupted: "Live2D.face-tracking.phase.interrupted"
            }
        }
        var color: Color {
            switch self {
            case .waiting: .gray
            case .tracking: .green
            case .nearEdge: .yellow
            case .lost: .gray
            case .interrupted: .red
            }
        }
        var label: LocalizedStringResource {
            switch self {
            case .waiting: "Live2D.face-tracking.phase.waiting.label"
            case .tracking: "Live2D.face-tracking.phase.tracking.label"
            case .nearEdge: "Live2D.face-tracking.phase.near-edge.label"
            case .lost: "Live2D.face-tracking.phase.lost.label"
            case .interrupted: "Live2D.face-tracking.phase.interrupted.label"
            }
        }
    }

    static var isSupported: Bool { ARFaceTrackingConfiguration.isSupported }
    private static let blendShapeKeys: [(String, ARFaceAnchor.BlendShapeLocation)] = [
        ("eyeBlinkLeft", .eyeBlinkLeft),
        ("eyeBlinkRight", .eyeBlinkRight),
        ("eyeSquintLeft", .eyeSquintLeft),
        ("eyeSquintRight", .eyeSquintRight),
        ("eyeLookInLeft", .eyeLookInLeft),
        ("eyeLookOutLeft", .eyeLookOutLeft),
        ("eyeLookOutRight", .eyeLookOutRight),
        ("eyeLookInRight", .eyeLookInRight),
        ("eyeLookUpLeft", .eyeLookUpLeft),
        ("eyeLookUpRight", .eyeLookUpRight),
        ("eyeLookDownLeft", .eyeLookDownLeft),
        ("eyeLookDownRight", .eyeLookDownRight),
        ("browInnerUp", .browInnerUp),
        ("browOuterUpLeft", .browOuterUpLeft),
        ("browOuterUpRight", .browOuterUpRight),
        ("browDownLeft", .browDownLeft),
        ("browDownRight", .browDownRight),
        ("jawOpen", .jawOpen),
        ("mouthSmileLeft", .mouthSmileLeft),
        ("mouthSmileRight", .mouthSmileRight),
        ("mouthFrownLeft", .mouthFrownLeft),
        ("mouthFrownRight", .mouthFrownRight),
        ("mouthPucker", .mouthPucker),
        ("mouthStretchLeft", .mouthStretchLeft),
        ("mouthStretchRight", .mouthStretchRight),
        ("cheekPuff", .cheekPuff)
    ]
    private(set) var isEnabled = false
    private(set) var phase: Phase = .waiting
    private(set) var error: String?
    var subtitle: LocalizedStringResource? { isEnabled && phase != .tracking ? phase.title : nil }
    @ObservationIgnored var onParameters: (@MainActor ([String: Float]) -> Void)?
    @ObservationIgnored private var session: ARSession?
    @ObservationIgnored private var generation = 0
    @ObservationIgnored private var neutral: simd_quatf?
    @ObservationIgnored private var anchorID: UUID?
    @ObservationIgnored private var lastSampleTime: TimeInterval = 0
    @ObservationIgnored private var pose = Live2DFacePoseFilter()
    @ObservationIgnored private var interpolationTask: Task<Void, Never>?

    func start() async {
        guard !isEnabled else { return }
        guard Self.isSupported else {
            error = String(localized: "Live2D.face-tracking.unsupported")
            return
        }
        generation += 1
        let request = generation
        isEnabled = true
        phase = .waiting
        error = nil
        let authorized: Bool
        switch AVCaptureDevice.authorizationStatus(for: .video) {
        case .authorized: authorized = true
        case .notDetermined: authorized = await AVCaptureDevice.requestAccess(for: .video)
        default: authorized = false
        }
        guard request == generation, isEnabled else { return }
        guard authorized else {
            isEnabled = false
            error = String(localized: "Live2D.face-tracking.camera-denied")
            return
        }
        let session = ARSession()
        session.delegateQueue = .main
        session.delegate = self
        self.session = session
        interpolationTask = Task { [weak self] in
            while !Task.isCancelled {
                self?.updatePose()
                do { try await Task.sleep(for: .milliseconds(16)) } catch { return }
            }
        }
        run(session)
    }

    func stop() {
        generation += 1
        isEnabled = false
        session?.pause()
        session?.delegate = nil
        session = nil
        interpolationTask?.cancel()
        interpolationTask = nil
        neutral = nil
        anchorID = nil
        lastSampleTime = 0
        pose.reset()
        phase = .waiting
        onParameters?([:])
        error = nil
    }

    func recalibrate() {
        neutral = nil
        anchorID = nil
        lastSampleTime = 0
        pose.returnToNeutral()
        phase = .waiting
    }

    private func updatePose() { onParameters?(pose.sample(at: ProcessInfo.processInfo.systemUptime)) }

    private func loseFace() {
        pose.returnToNeutral()
        phase = .lost
    }

    private func run(_ session: ARSession) {
        recalibrate()
        let configuration = ARFaceTrackingConfiguration()
        configuration.maximumNumberOfTrackedFaces = 1
        configuration.isLightEstimationEnabled = false
        session.run(configuration, options: [.resetTracking, .removeExistingAnchors])
    }

    func session(_ session: ARSession, didUpdate anchors: [ARAnchor]) {
        guard isEnabled, session === self.session,
              let anchor = anchors.compactMap({ $0 as? ARFaceAnchor }).first,
              let frame = session.currentFrame else { return }
        guard anchor.isTracked else {
            loseFace()
            return
        }
        let timestamp = frame.timestamp
        guard timestamp - lastSampleTime >= 1.0 / 30 - 0.0005 else { return }
        lastSampleTime = timestamp
        let relative = simd_inverse(frame.camera.transform) * anchor.transform
        let orientation = simd_quatf(relative)
        if neutral == nil || anchorID != anchor.identifier {
            neutral = orientation
            anchorID = anchor.identifier
        }
        let rotation = simd_float3x3(neutral!.inverse * orientation)
        let sample = Live2DFaceSample.arKit(relativeRotation: rotation,
            blendShapes: Dictionary(uniqueKeysWithValues: Self.blendShapeKeys.map { ($0.0, anchor.blendShapes[$0.1]?.floatValue ?? 0) })
        )
        pose.follow(sample.parameters)
        let size = frame.camera.imageResolution
        let points = stride(from: 0, to: anchor.geometry.vertices.count, by: 20).map { index in
            let vertex = anchor.geometry.vertices[index]
            let world = anchor.transform * SIMD4<Float>(vertex, 1)
            return frame.camera.projectPoint(.init(world.x, world.y, world.z), orientation: .landscapeRight, viewportSize: size)
        }
        let box = CGRect(x: (points.map(\.x).min() ?? 0) / size.width,
                         y: 1 - (points.map(\.y).max() ?? size.height) / size.height,
                         width: ((points.map(\.x).max() ?? 0) - (points.map(\.x).min() ?? 0)) / size.width,
                         height: ((points.map(\.y).max() ?? 0) - (points.map(\.y).min() ?? 0)) / size.height)
        let phase: Phase = Live2DFacePoseFilter.isNearEdge(box, wasNearEdge: self.phase == .nearEdge) ? .nearEdge : .tracking
        if self.phase != phase { self.phase = phase }
    }

    func session(_ session: ARSession, didRemove anchors: [ARAnchor]) {
        guard session === self.session, anchors.contains(where: { $0 is ARFaceAnchor }) else { return }
        loseFace()
    }

    func sessionWasInterrupted(_ session: ARSession) {
        guard session === self.session else { return }
        pose.returnToNeutral()
        phase = .interrupted
    }

    func sessionInterruptionEnded(_ session: ARSession) {
        if isEnabled, session === self.session { run(session) }
    }

    func session(_ session: ARSession, didFailWithError error: any Error) {
        guard session === self.session else { return }
        stop()
        self.error = error.localizedDescription
    }
}
#endif
