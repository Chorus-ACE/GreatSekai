import Foundation

public enum FaceModel {
    public static var url: URL {
        get throws {
            guard let url = Bundle.module.url(forResource: "face_landmarker", withExtension: "task") else {
                throw CocoaError(.fileNoSuchFile)
            }
            return url
        }
    }
}
