// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "SekaiMediaPipe",
    platforms: [.macOS(.v14), .iOS(.v17)],
    products: [.library(name: "SekaiMediaPipe", type: .static, targets: ["SekaiMediaPipe"])],
    targets: [
        .binaryTarget(name: "MediaPipeTasksVision",
            url: "https://github.com/vcamapp/mediapipe/releases/download/0.0.15/MediaPipeTasksVision.xcframework.zip",
            checksum: "5aa2bb44074e6d2f9d9277bda535173beedb4b138ea91bf8ad331fb43297aa2c"),
        .target(name: "SekaiMediaPipeModels", resources: [.process("Resources")]),
        .target(name: "SekaiMediaPipe", dependencies: [
            .target(name: "MediaPipeTasksVision", condition: .when(platforms: [.macOS])),
            .target(name: "SekaiMediaPipeModels", condition: .when(platforms: [.macOS]))
        ])
    ]
)
