#if os(macOS)
import AVFoundation
import Foundation
import Observation
import SwiftUI
import simd
#if arch(arm64)
import SekaiMediaPipe
#endif

/// A calibrated, continuous pose from MediaPipe's face transform and expression scores.
nonisolated struct Live2DTrackedFace: Sendable {
    let orientation: simd_quatf
    let blendShapes: [String: Float]
    let isNearEdge: Bool
    let horizontalPosition: Float

    init?(transform: [Float], blendShapes: [String: Float], isNearEdge: Bool, horizontalPosition: Float = 0) {
        guard transform.count == 16, transform.allSatisfy(\.isFinite) else { return nil }
        var columns = (0..<3).map { column in SIMD3<Float>(transform[column], transform[4 + column], transform[8 + column]) }
        guard columns.allSatisfy({ simd_length($0) > 0.0001 }) else { return nil }
        for index in columns.indices { columns[index] = simd_normalize(columns[index]) }
        let rotation = simd_float3x3(columns: (columns[0], columns[1], columns[2]))
        guard simd_determinant(rotation) > 0.5 else { return nil }
        orientation = simd_quatf(rotation)
        self.blendShapes = blendShapes
        self.isNearEdge = isNearEdge
        self.horizontalPosition = horizontalPosition
    }

    func parameters(relativeTo neutral: simd_quatf) -> [String: Float] {
        let rotation = simd_float3x3(neutral.inverse * orientation)
        let degrees: Float = 180 / .pi
        var parameters = Live2DFaceSample(
            pitch: atan2(-rotation.columns.2.y, hypot(rotation.columns.2.x, rotation.columns.2.z)) * degrees,
            yaw: atan2(rotation.columns.2.x, rotation.columns.2.z) * degrees,
            roll: -atan2(rotation.columns.0.y, rotation.columns.1.y) * degrees,
            blendShapes: blendShapes,
            horizontalPosition: horizontalPosition
        ).parameters
        func opening(_ key: String) -> Float {
            let score = blendShapes[key] ?? 0
            guard score.isFinite else { return 1 }
            if score >= 0.65 { return 0 }
            // MediaPipe's expression coefficient need not reach 1 for a shut eye.
            // Retain partial closure, with a small open-eye dead zone and a reachable shut pose.
            return 1 - min(1, max(0, (score - 0.05) / 0.6))
        }
        // The unmirrored webcam's anatomical sides map to the opposite model eyes.
        parameters["ParamEyeLOpen"] = opening("eyeBlinkRight")
        parameters["ParamEyeROpen"] = opening("eyeBlinkLeft")
        let leftSmile = parameters["ParamEyeLSmile"]
        parameters["ParamEyeLSmile"] = parameters["ParamEyeRSmile"]
        parameters["ParamEyeRSmile"] = leftSmile
        return parameters
    }
}

@MainActor @Observable final class Live2DFaceCapture {
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

    // Camera discovery happens on enable, so connecting a webcam does not require reopening the viewer.
    static var isSupported: Bool {
        #if arch(arm64)
        true
        #else
        false
        #endif
    }
    private(set) var isEnabled = false
    private(set) var phase: Phase = .waiting
    private(set) var error: String?
    var subtitle: LocalizedStringResource? { isEnabled && phase != .tracking ? phase.title : nil }
    @ObservationIgnored var onParameters: (@MainActor ([String: Float]) -> Void)?
    @ObservationIgnored private var worker: Live2DWebcamWorker?
    @ObservationIgnored private var generation = 0
    @ObservationIgnored private var neutral: simd_quatf?
    @ObservationIgnored private var pose = Live2DFacePoseFilter()
    @ObservationIgnored private var interpolationTask: Task<Void, Never>?

    func start() async {
        guard !isEnabled, Self.isSupported else { return }
        generation += 1
        let request = generation
        isEnabled = true
        error = nil
        recalibrate()
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
        let worker = Live2DWebcamWorker { [weak self] event in
            Task { @MainActor [weak self] in
                guard let self, self.generation == request, self.isEnabled else { return }
                self.receive(event)
            }
        }
        self.worker = worker
        interpolationTask = Task { [weak self] in
            while !Task.isCancelled {
                self?.updatePose()
                do { try await Task.sleep(for: .milliseconds(16)) } catch { return }
            }
        }
        worker.start()
    }

    func stop() {
        generation += 1
        isEnabled = false
        worker?.stop()
        worker = nil
        interpolationTask?.cancel()
        interpolationTask = nil
        neutral = nil
        pose.reset()
        phase = .waiting
        onParameters?([:])
        error = nil
    }

    func recalibrate() {
        neutral = nil
        pose.returnToNeutral()
        phase = .waiting
    }

    private func updatePose() { onParameters?(pose.sample(at: ProcessInfo.processInfo.systemUptime)) }

    private func receive(_ event: Live2DWebcamWorker.Event) {
        switch event {
        case .face(let sample):
            if neutral == nil { neutral = sample.orientation }
            pose.follow(sample.parameters(relativeTo: neutral!))
            let phase: Phase = sample.isNearEdge ? .nearEdge : .tracking
            if self.phase != phase { self.phase = phase }
        case .lost:
            pose.returnToNeutral()
            phase = .lost
        case .interrupted:
            pose.returnToNeutral()
            phase = .interrupted
        case .failed(let message):
            stop()
            error = message
        case .noCamera:
            stop()
            error = String(localized: "Live2D.face-tracking.no-camera")
        }
    }
}

/// All camera configuration and MediaPipe inference stays on one serial queue.
/// Only small, Sendable measurements leave that queue; video frames stay local.
nonisolated private final class Live2DWebcamWorker: NSObject, AVCaptureVideoDataOutputSampleBufferDelegate, @unchecked Sendable {
    enum Event: Sendable {
        case face(Live2DTrackedFace)
        case lost
        case interrupted
        case noCamera
        case failed(String)
    }
    private let queue = DispatchQueue(label: "com.chorus-ace.GreatSekai.FaceCapture", qos: .userInitiated)
    private let onEvent: @Sendable (Event) -> Void
    private let session = AVCaptureSession()
    private let output = AVCaptureVideoDataOutput()
    private var observers: [any NSObjectProtocol] = []
    private var running = false
    private var lastTimestamp: TimeInterval = -.infinity
    private var missingFrames = 0
    private var isNearEdge = false
    #if arch(arm64)
    private var landmarker: MediaPipeFaceLandmarker?
    #endif

    init(onEvent: @escaping @Sendable (Event) -> Void) { self.onEvent = onEvent }

    func start() {
        queue.async { [self] in
            guard let camera = AVCaptureDevice.default(for: .video) else { onEvent(.noCamera); return }
            do {
                #if arch(arm64)
                landmarker = try MediaPipeFaceLandmarker()
                #endif
                let input = try AVCaptureDeviceInput(device: camera)
                session.beginConfiguration()
                guard session.canAddInput(input), session.canAddOutput(output) else {
                    session.commitConfiguration()
                    onEvent(.noCamera)
                    return
                }
                session.addInput(input)
                if session.canSetSessionPreset(.vga640x480) { session.sessionPreset = .vga640x480 }
                else if session.canSetSessionPreset(.medium) { session.sessionPreset = .medium }
                output.alwaysDiscardsLateVideoFrames = true
                output.videoSettings = [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA]
                output.setSampleBufferDelegate(self, queue: queue)
                session.addOutput(output)
                if let connection = output.connection(with: .video), connection.isVideoMirroringSupported {
                    connection.automaticallyAdjustsVideoMirroring = false
                    connection.isVideoMirrored = false
                }
                session.commitConfiguration()
                observers.append(NotificationCenter.default.addObserver(forName: AVCaptureSession.runtimeErrorNotification, object: session, queue: nil) { [weak self] notification in
                    let message = (notification.userInfo?[AVCaptureSessionErrorKey] as? NSError)?.localizedDescription
                        ?? String(localized: "Live2D.face-tracking.capture-failed")
                    self?.onEvent(.failed(message))
                })
                observers.append(NotificationCenter.default.addObserver(forName: AVCaptureSession.wasInterruptedNotification, object: session, queue: nil) { [weak self] _ in
                    self?.onEvent(.interrupted)
                })
                observers.append(NotificationCenter.default.addObserver(forName: AVCaptureSession.interruptionEndedNotification, object: session, queue: nil) { [weak self] _ in
                    self?.onEvent(.lost)
                })
                running = true
                session.startRunning()
            } catch { onEvent(.failed(error.localizedDescription)) }
        }
    }

    func stop() {
        queue.async { [self] in
            running = false
            output.setSampleBufferDelegate(nil, queue: nil)
            session.stopRunning()
            #if arch(arm64)
            landmarker = nil
            #endif
            for observer in observers { NotificationCenter.default.removeObserver(observer) }
            observers = []
        }
    }

    func captureOutput(_ output: AVCaptureOutput, didOutput sampleBuffer: CMSampleBuffer, from connection: AVCaptureConnection) {
        guard running else { return }
        let timestamp = CMSampleBufferGetPresentationTimeStamp(sampleBuffer).seconds
        guard timestamp.isFinite, timestamp - lastTimestamp >= 1.0 / 30 - 0.0005,
              let image = CMSampleBufferGetImageBuffer(sampleBuffer) else { return }
        lastTimestamp = timestamp
        #if arch(arm64)
        autoreleasepool {
            do {
                guard let face = try landmarker?.detect(image, timestampMilliseconds: Int(timestamp * 1000)) else {
                    missingFrames += 1
                    if missingFrames == 3 { onEvent(.lost) }
                    return
                }
                missingFrames = 0
                isNearEdge = Live2DFacePoseFilter.isNearEdge(face.bounds, wasNearEdge: isNearEdge)
                guard let sample = Live2DTrackedFace(transform: face.transform, blendShapes: face.blendShapes,
                    isNearEdge: isNearEdge, horizontalPosition: Float(1 - 2 * face.bounds.midX)) else {
                    onEvent(.lost)
                    return
                }
                onEvent(.face(sample))
            } catch { onEvent(.failed(error.localizedDescription)) }
        }
        #endif
    }
}
#endif
