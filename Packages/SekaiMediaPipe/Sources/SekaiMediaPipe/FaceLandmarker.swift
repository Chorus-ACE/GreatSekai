// macOS-only dependencies keep the SDK and all model resources out of iOS products.
#if os(macOS) && arch(arm64)
import CoreVideo
import Foundation
import MediaPipeTasksVision
import SekaiMediaPipeModels

public struct MediaPipeFace: Sendable {
    /// Row-major canonical-to-observed face transform.
    public let transform: [Float]
    public let blendShapes: [String: Float]
    public let bounds: CGRect
}

/// Confine an instance and its video frames to the same serial capture queue.
public final class MediaPipeFaceLandmarker {
    private let landmarker: FaceLandmarker

    public init() throws {
        let options = FaceLandmarkerOptions()
        options.baseOptions.modelAssetPath = try FaceModel.url.path
        options.runningMode = .video
        options.numFaces = 1
        options.outputFaceBlendshapes = true
        options.outputFacialTransformationMatrixes = true
        landmarker = try FaceLandmarker(options: options)
    }

    public func detect(_ pixelBuffer: CVPixelBuffer, timestampMilliseconds: Int) throws -> MediaPipeFace? {
        let image = try MPImage(pixelBuffer: pixelBuffer)
        let result = try landmarker.detect(videoFrame: image, timestampInMilliseconds: timestampMilliseconds)
        guard let landmarks = result.faceLandmarks.first, !landmarks.isEmpty,
              let matrix = result.facialTransformationMatrixes.first,
              matrix.rows == 4, matrix.columns == 4 else { return nil }
        let values = (0..<4).flatMap { row in (0..<4).map { matrix.value(atRow: UInt(row), column: UInt($0)) } }
        let shapes = Dictionary((result.faceBlendshapes.first?.categories ?? []).compactMap { category -> (String, Float)? in
            guard let name = category.categoryName else { return nil }
            return (name, category.score)
        }, uniquingKeysWith: { _, new in new })
        let minX = landmarks.map(\.x).min()!, maxX = landmarks.map(\.x).max()!
        let minY = landmarks.map(\.y).min()!, maxY = landmarks.map(\.y).max()!
        let bounds = CGRect(x: CGFloat(minX), y: CGFloat(1 - maxY), width: CGFloat(maxX - minX), height: CGFloat(maxY - minY))
        return MediaPipeFace(transform: values, blendShapes: shapes, bounds: bounds)
    }
}
#endif
