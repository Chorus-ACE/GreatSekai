import Foundation
import Testing
@testable import Live2DKit

/// Authored-motion playback (.motion3.json) through the real Cubism stack:
/// pure parameter math, no Metal, so unlike rendering this is fully assertable
/// headlessly. Same skip-visibly policy as ModelTests when Hiyori isn't staged.
extension Live2DKitSuite {

@Suite("Live2D motions", .serialized)
struct MotionTests {

    private static var hiyoriURL: URL? {
        let root = URL(fileURLWithPath: #filePath)
            .deletingLastPathComponent()   // Live2DKitTests
            .deletingLastPathComponent()   // Tests
            .deletingLastPathComponent()   // package root
        let url = root
            .appendingPathComponent("Vendor/Models/Hiyori/Hiyori.model3.json")
        return FileManager.default.fileExists(atPath: url.path) ? url : nil
    }

    @Test("Hiyori's motion groups load: 9 Idle clips + 1 TapBody")
    func loadsMotionGroups() throws {
        guard let url = Self.hiyoriURL else {
            print("MotionGroups: SKIPPED (no Vendor/Models/Hiyori)")
            return
        }
        let model = try Live2DModel(contentsOf: url)
        #expect(model.motionGroupNames == ["Idle", "TapBody"])
        #expect(model.motionCount(inGroup: "Idle") == 9)
        #expect(model.motionCount(inGroup: "TapBody") == 1)
        #expect(model.motionCount(inGroup: "NoSuchGroup") == 0)
    }

    /// Synthetic curves exercise exported metadata without bundling game assets.
    private func withMotionFixture(segments: [Double], segmentCount: Int,
                                   pointCount: Int, events: [[String: Any]] = [],
                                   body: (Live2DModel) throws -> Void) throws {
        let source = try #require(Self.hiyoriURL, "stage the Hiyori SDK fixture first")
        let directory = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        defer { try? FileManager.default.removeItem(at: directory) }
        let settings = try #require(JSONSerialization.jsonObject(with: Data(contentsOf: source)) as? [String: Any])
        let refs = try #require(settings["FileReferences"] as? [String: Any])
        let moc = try #require(refs["Moc"] as? String)
        try FileManager.default.copyItem(at: source.deletingLastPathComponent().appendingPathComponent(moc),
                                         to: directory.appendingPathComponent("model.moc3"))
        let motion: [String: Any] = [
            "Version": 3,
            "Meta": ["Duration": 4, "Fps": 60, "Loop": false, "AreBeziersRestricted": true,
                     "CurveCount": 1, "TotalSegmentCount": segmentCount, "TotalPointCount": pointCount,
                     "UserDataCount": events.count, "TotalUserDataSize": 0],
            "Curves": [["Target": "Parameter", "Id": "ParamAngleX", "Segments": segments]],
            "UserData": events
        ]
        let manifest: [String: Any] = ["Version": 3, "FileReferences": [
            "Moc": "model.moc3", "Motions": ["Test": [["File": "test.motion3.json", "FadeInTime": 0, "FadeOutTime": 0]]]
        ]]
        try JSONSerialization.data(withJSONObject: motion).write(to: directory.appendingPathComponent("test.motion3.json"))
        let url = directory.appendingPathComponent("model.model3.json")
        try JSONSerialization.data(withJSONObject: manifest).write(to: url)
        try body(Live2DModel(contentsOf: url))
    }

    @Test("motion events are safe when the viewer has no event consumer")
    func eventWithoutConsumer() throws {
        try withMotionFixture(segments: [0, 0, 0, 4, 20], segmentCount: 1, pointCount: 2,
                              events: [["Time": 0.5, "Value": "fixture event"]]) { model in
            #expect(model.startMotion(group: "Test", index: 0))
            for _ in 0..<90 { model.evaluateMotions(deltaTime: 1.0 / 60.0) }
            #expect(model.value(for: "ParamAngleX") > 5)
        }
    }

    @Test("normalization retains small decimal curve values")
    func smallCurveValues() throws {
        try withMotionFixture(segments: [0, 0.0000001, 0, 4, 0.0000001], segmentCount: 2, pointCount: 2) { model in
            #expect(model.startMotion(group: "Test", index: 0))
            for _ in 0..<60 { model.evaluateMotions(deltaTime: 1.0 / 60.0) }
            #expect(abs(model.value(for: "ParamAngleX") - 0.0000001) < 0.000000001)
        }
    }

    @Test("exported point/segment count mismatches preserve all four curve types")
    func repairsExportedCounts() throws {
        // Initial point, linear, Bezier, stepped, inverse-stepped: 4 segments / 7 points.
        let segments: [Double] = [0, 0, 0, 1, 10, 1, 1.33, 10, 1.67, 20, 2, 20,
                                  2, 3, -10, 3, 4, 0]
        var reference: [Float] = []
        for count in [4, 7] {
            try withMotionFixture(segments: segments, segmentCount: count, pointCount: 7) { model in
                #expect(model.motionCount(inGroup: "Test") == 1)
                #expect(model.startMotion(group: "Test", index: 0))
                var values: [Float] = []
                for _ in 0..<250 {
                    model.evaluateMotions(deltaTime: 1.0 / 60.0)
                    values.append(model.value(for: "ParamAngleX"))
                }
                #expect(model.motionsFinished)
                #expect(Set(values).count > 30)
                if count == 4 { reference = values } else { #expect(values == reference) }
            }
        }
    }

    @Test("malformed curves are rejected before entering the native parser",
          arguments: [[0.0, 0], [0, 0, 1, 1, 2], [0, 0, 9, 1, 2],
                      [0, 0, 0.5, 1, 2], [0, 0, 0, 0, 2]])
    func rejectsMalformedCurves(segments: [Double]) throws {
        try withMotionFixture(segments: segments, segmentCount: 1, pointCount: 2) { model in
            #expect(model.motionGroupNames.isEmpty)
            #expect(!model.startMotion(group: "Test", index: 0))
            model.update(deltaTime: 0)
        }
    }

    @Test("a clip drives parameters over time")
    func clipAnimatesParameters() throws {
        guard let url = Self.hiyoriURL else {
            print("MotionDrives: SKIPPED (no Vendor/Models/Hiyori)")
            return
        }
        let model = try Live2DModel(contentsOf: url)
        #expect(model.motionsFinished, "nothing started yet")
        #expect(model.startMotion(group: "Idle", index: 0))
        #expect(!model.motionsFinished)

        // Step through the clip sampling a body parameter it authors. Values must
        // actually change; a queue that "plays" but writes nothing is the failure
        // this exists to catch. (Fades mean early values ramp; sample well in.)
        var samples: Set<Float> = []
        let step = 1.0 / 60.0
        for _ in 0..<120 {  // 2 s
            model.evaluateMotions(deltaTime: step)
            samples.insert(model.value(for: "ParamAngleX"))
        }
        #expect(samples.count > 10, "clip wrote \(samples.count) distinct values")
    }

    @Test("clips finish despite their authored Loop flag, so selection can rotate")
    func clipsFinish() throws {
        guard let url = Self.hiyoriURL else {
            print("MotionFinishes: SKIPPED (no Vendor/Models/Hiyori)")
            return
        }
        let model = try Live2DModel(contentsOf: url)
        model.startMotion(group: "Idle", index: 0)

        // Hiyori_m01 runs ~4.7 s and declares Loop:true; the bridge forces
        // one-shot so IsFinished can ever fire. dt is clamped at 0.1 s per call,
        // so simulate in clamped steps.
        var elapsed = 0.0
        while elapsed < 12.0 && !model.motionsFinished {
            model.evaluateMotions(deltaTime: 0.1)
            elapsed += 0.1
        }
        #expect(model.motionsFinished, "clip still playing after \(elapsed)s")
    }

    @Test("evaluate-then-write ordering: external writes survive, prior writes don't")
    func loadParametersDiscardsPriorWrites() throws {
        guard let url = Self.hiyoriURL else {
            print("MotionOrdering: SKIPPED (no Vendor/Models/Hiyori)")
            return
        }
        let model = try Live2DModel(contentsOf: url)
        model.startMotion(group: "Idle", index: 0)

        // Warm the clip past its 0.5 s fade-in. (On the very first frames the fade
        // weight is ~0, so the motion blends almost entirely from the pre-existing
        // value and a pre-evaluate write *does* survive, found by running exactly
        // this test against frame one. Steady-state is where the ownership
        // contract lives.)
        for _ in 0..<60 { model.evaluateMotions(deltaTime: 1.0 / 60.0) }

        // At dt=0 the clip's time doesn't advance, so its curve value is fixed:
        // two probes with different pre-writes must land on the SAME value:
        // proof the motion owns the parameter and pre-evaluate writes are
        // discarded, whatever they were. ParamMouthOpenY is authored by the clip.
        model.setValue(0.9, for: "ParamMouthOpenY")
        model.evaluateMotions(deltaTime: 0)
        let first = model.value(for: "ParamMouthOpenY")
        model.setValue(0.2, for: "ParamMouthOpenY")
        model.evaluateMotions(deltaTime: 0)
        let second = model.value(for: "ParamMouthOpenY")
        #expect(first == second, "pre-evaluate writes leaked into the motion result")

        // A write made AFTER evaluate is the composition seam: it must stick.
        model.setValue(0.9, for: "ParamMouthOpenY")
        #expect(model.value(for: "ParamMouthOpenY") == 0.9)
    }

    @Test("pose fade override rebuilds the pose safely (and is inert without one)")
    func poseFadeOverride() throws {
        guard let url = Self.hiyoriURL else {
            print("PoseFade: SKIPPED (no Vendor/Models/Hiyori)")
            return
        }
        let model = try Live2DModel(contentsOf: url)
        // Part opacity isn't readable through the bridge, so this is a lifecycle smoke
        // test by design: the rebuild must not crash, must survive repeated calls, and
        // the model must keep evaluating motions and updating afterwards. The VISUAL
        // effect (shorter arm-swap cross-dissolve) is verified via the snapshot
        // harness's POSE_FADE hook, not asserted here.
        model.setPoseFadeDuration(0.15)
        model.setPoseFadeDuration(0.3)
        model.setPoseFadeDuration(-1)   // ignored, not fatal
        model.startMotion(group: "Idle", index: 0)
        for _ in 0..<30 {
            model.evaluateMotions(deltaTime: 1.0 / 60.0)
            model.update(deltaTime: 1.0 / 60.0)
        }
        #expect(!model.motionsFinished)
    }

    @Test("unknown groups and indices refuse instead of trapping")
    func invalidStartsRefuse() throws {
        guard let url = Self.hiyoriURL else {
            print("MotionInvalid: SKIPPED (no Vendor/Models/Hiyori)")
            return
        }
        let model = try Live2DModel(contentsOf: url)
        #expect(!model.startMotion(group: "NoSuchGroup", index: 0))
        #expect(!model.startMotion(group: "Idle", index: -1))
        #expect(!model.startMotion(group: "Idle", index: 99))
        // And evaluating with nothing started is a safe no-op.
        #expect(!model.evaluateMotions(deltaTime: 1.0 / 60.0))
    }

    @Test("starting a new clip mid-play cross-fades rather than refusing")
    func restartMidPlay() throws {
        guard let url = Self.hiyoriURL else {
            print("MotionRestart: SKIPPED (no Vendor/Models/Hiyori)")
            return
        }
        let model = try Live2DModel(contentsOf: url)
        #expect(model.startMotion(group: "Idle", index: 0))
        for _ in 0..<30 { model.evaluateMotions(deltaTime: 1.0 / 60.0) }
        // Force-priority start while the first is mid-play must succeed.
        #expect(model.startMotion(group: "Idle", index: 1))
        #expect(!model.motionsFinished)
        for _ in 0..<30 { model.evaluateMotions(deltaTime: 1.0 / 60.0) }
    }
}
}
