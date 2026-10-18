import Foundation
import Testing
@testable import Live2DKit

/// Loading a real `.moc3` through the whole stack. Skips cleanly when the sample
/// hasn't been staged, so a fresh clone without `Scripts/bootstrap.sh` doesn't
/// fail, but prints which happened, because a permanently-skipped test proves
/// nothing and should be visible rather than quietly green.
// `.serialized`: Cubism is process-global and not thread-safe. The bridge now
// locks around load and teardown, but running these in parallel would still have
// several models contending for one global id manager for no benefit.
extension Live2DKitSuite {

@Suite("Live2D model", .serialized)
struct ModelTests {

    /// Hiyori, staged by `Scripts/bootstrap.sh` from the SDK's own samples.
    private static var hiyoriURL: URL? {
        let root = URL(fileURLWithPath: #filePath)
            .deletingLastPathComponent()   // Live2DKitTests
            .deletingLastPathComponent()   // Tests
            .deletingLastPathComponent()   // package root
        let url = root
            .appendingPathComponent("Vendor/Models/Hiyori/Hiyori.model3.json")
        return FileManager.default.fileExists(atPath: url.path) ? url : nil
    }

    @Test("loads a real model and reports the parameters it drives")
    func loadsHiyori() throws {
        guard let url = Self.hiyoriURL else {
            print("ModelLoad: SKIPPED (no Vendor/Models/Hiyori; run Scripts/bootstrap.sh)")
            return
        }

        let model = try Live2DModel(contentsOf: url)
        print("ModelLoad: EXECUTED (\(model.parameterIDs.count) parameters)")

        // Hiyori exposes ~70 parameters; the exact count is the model's business,
        // but "loaded something with a real rig" is ours.
        #expect(model.parameterIDs.count > 10)

        // The groups are the whole point of reading them from the model: names
        // differ per model (Hiyori/Haru use ParamMouthOpenY, Mao uses ParamA), so
        // assert the group is POPULATED rather than pinning an ID.
        #expect(!model.lipSyncParameterIDs.isEmpty, "model declares no LipSync group")
        #expect(!model.eyeBlinkParameterIDs.isEmpty, "model declares no EyeBlink group")

        // Whatever they're called, they must be real parameters on this rig.
        for identifier in model.lipSyncParameterIDs + model.eyeBlinkParameterIDs {
            #expect(model.parameterIDs.contains(identifier),
                    "group names \(identifier), which the model doesn't expose")
        }
    }

    @Test("parameters round-trip through the bridge")
    func setsAndReadsParameters() throws {
        guard let url = Self.hiyoriURL else {
            print("ParamRoundTrip: SKIPPED (no Vendor/Models/Hiyori)")
            return
        }

        let model = try Live2DModel(contentsOf: url)
        let mouth = try #require(model.lipSyncParameterIDs.first)

        model.setValue(1.0, for: mouth)
        model.update()
        #expect(model.value(for: mouth) == 1.0)

        model.setValue(0.0, for: mouth)
        model.update()
        #expect(model.value(for: mouth) == 0.0)
    }

    @Test("an unknown parameter is ignored, not fatal")
    func unknownParameterDegrades() throws {
        guard let url = Self.hiyoriURL else {
            print("UnknownParam: SKIPPED (no Vendor/Models/Hiyori)")
            return
        }

        // A projection written for one model will name parameters another lacks.
        // That must degrade silently rather than trap, or swapping models crashes.
        let model = try Live2DModel(contentsOf: url)
        model.setValue(1.0, for: "ParamThatDoesNotExistOnThisRig")
        model.update()
        #expect(model.value(for: "ParamThatDoesNotExistOnThisRig") == 0)
    }

    @Test("a missing model reports an error rather than trapping")
    func missingModelThrows() {
        let missing = URL(fileURLWithPath: "/nonexistent/Nope.model3.json")
        #expect(throws: (any Error).self) {
            _ = try Live2DModel(contentsOf: missing)
        }
    }
}
}
