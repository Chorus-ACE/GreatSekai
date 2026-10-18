import Foundation
import Testing
@testable import Live2DKit

extension Live2DKitSuite {
    @Suite("Imported Live2D motions", .serialized)
    struct ImportedMotionTests {
        @Test("every declared clip loads and evaluates through its events to completion")
        func importedClips() throws {
            guard let path = ProcessInfo.processInfo.environment["SEKAI_LIVE2D_MODEL"] else {
                print("ImportedMotions: SKIPPED (set SEKAI_LIVE2D_MODEL to a local model3.json)")
                return
            }
            let url = URL(fileURLWithPath: path)
            let manifest = try #require(JSONSerialization.jsonObject(with: Data(contentsOf: url)) as? [String: Any])
            let refs = try #require(manifest["FileReferences"] as? [String: Any])
            let groups = try #require(refs["Motions"] as? [String: [[String: Any]]])
            let model = try Live2DModel(contentsOf: url)
            #expect(Set(model.motionGroupNames) == Set(groups.keys))
            var tested = 0
            for group in groups.keys.sorted() {
                let clips = try #require(groups[group])
                #expect(model.motionCount(inGroup: group) == clips.count)
                for index in clips.indices {
                    try #require(model.startMotion(group: group, index: index), "\(group):\(index) did not load")
                    // Bounded to 120 simulated seconds per clip; the local Miku
                    // fixture's longest clip is 4.1 s. No wall-clock sleep needed.
                    for _ in 0..<1200 {
                        model.evaluateMotions(deltaTime: 0.1)
                        model.update(deltaTime: 0.1)
                        if model.motionsFinished { break }
                    }
                    #expect(model.motionsFinished, "\(group):\(index) did not finish")
                    #expect(model.parameterIDs.allSatisfy { model.value(for: $0).isFinite })
                    tested += 1
                }
            }
            print("ImportedMotions: EXECUTED (\(tested) clips)")
        }
    }
}
