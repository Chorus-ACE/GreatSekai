import CubismBridge
import Foundation

/// A loaded Live2D model, as Swift sees it.
///
/// Parameter access is by ID rather than index because indices differ per model
/// and carry no meaning across them.
public final class Live2DModel {

    /// Internal, not private: `Live2DRenderer` needs the same handle to build a
    /// renderer against this model. Still not public; callers never see the bridge.
    let handle: CubismModelHandle

    /// Load from a `.model3.json`. Textures, physics and pose resolve relative to
    /// its directory, per the Cubism convention.
    ///
    /// The ObjC initialiser returns `nullable instancetype` with an `NSError **`,
    /// which Swift imports as `throws`, so no manual bridging is needed. Note it also
    /// drops the redundant `URL` suffix, so `initWithContentsOfURL:error:` arrives
    /// as `init(contentsOf:)`.
    public init(contentsOf url: URL) throws {
        self.handle = try CubismModelHandle(contentsOf: url)
    }

    /// Every parameter the model exposes, in index order.
    public var parameterIDs: [String] { handle.parameterIDs }

    /// Parameters the model nominates for lipsync, from its `LipSync` group.
    ///
    /// Read from the model rather than assumed: models disagree on names
    /// (Hiyori and Haru use `ParamMouthOpenY`, Mao uses `ParamA`), so a hard-coded
    /// ID animates one model and silently does nothing on the next.
    public var lipSyncParameterIDs: [String] { handle.lipSyncParameterIDs }

    /// Parameters the model nominates for blinking, from its `EyeBlink` group.
    public var eyeBlinkParameterIDs: [String] { handle.eyeBlinkParameterIDs }

    public func setValue(_ value: Float, for parameterID: String) {
        handle.setValue(value, forParameterID: parameterID)
    }

    public func value(for parameterID: String) -> Float {
        handle.value(forParameterID: parameterID)
    }

    /// Push queued parameter changes into the model's vertex state. Once per frame,
    /// after setting parameters and before drawing.
    public func update() {
        handle.update()
    }

    /// Whether the model shipped a physics3.json that parsed: hair/clothes
    /// secondary motion. Optional flavour: without it the model just holds stiller.
    public var hasPhysics: Bool { handle.hasPhysics }

    /// Per-frame update WITH physics: evaluates the simulation over `deltaTime`
    /// seconds (clamped to 0.1 s so a background-resume hitch can't slingshot the
    /// pendulums), then pushes parameters. Identical to `update()` when the model
    /// has no physics.
    ///
    /// Order matters: set your parameters first, then call this; physics reads the
    /// body-sway inputs (angle/breath) and turns them into the secondary motion.
    public func update(deltaTime: TimeInterval) {
        handle.update(withDeltaTime: deltaTime)
    }

    /// Override the pose3.json part-swap fade (seconds). This is the cross-dissolve
    /// between swappable part groups (Hiyori's arm set A ↔ B); the authored 0.5 s reads
    /// as a lingering double-arm ghost when a rotating idle crosses sets, and a short
    /// fade (~0.15 s) reads as a quick, intentional arm shift instead. Opt-in; the
    /// artist's file is untouched. Ignored for models without a pose.
    public func setPoseFadeDuration(_ seconds: TimeInterval) {
        handle.setPoseFadeDuration(seconds)
    }

    // MARK: - Authored motions (.motion3.json)

    /// Motion groups the model ships (e.g. "Idle", "TapBody"), sorted; only groups
    /// with at least one clip that parsed. Empty when the model has no motions;
    /// like physics, motion is flavour and its absence never fails a load.
    public var motionGroupNames: [String] { handle.motionGroupNames }

    /// Number of clips loaded in `group`; 0 for an unknown group.
    public func motionCount(inGroup group: String) -> Int {
        handle.motionCount(inGroup: group)
    }

    /// True when no motion is playing, including before any was started. The
    /// caller owns the policy (which clip, when, randomness); this is the signal
    /// that the current clip ended and the next can start.
    public var motionsFinished: Bool { handle.motionsFinished }

    /// Begin playing a clip. A playing clip cross-fades out over its FadeOutTime
    /// while the new one fades in (fade times from `model3.json`'s Motions entries).
    /// Returns false for an unknown group/index.
    @discardableResult
    public func startMotion(group: String, index: Int) -> Bool {
        handle.startMotion(group: group, index: index)
    }

    /// Evaluate the active motions over `deltaTime` seconds, writing their curve
    /// values into the model's parameters. Returns true if a motion wrote anything.
    ///
    /// Per-frame call order is a contract: `evaluateMotions(deltaTime:)` FIRST,
    /// then external parameter writes (lipsync, blink, gaze: read the motion's
    /// value via `value(for:)` and compose), then `update(deltaTime:)`. Anything
    /// written *before* this call is discarded: internally it wraps the motion in
    /// Cubism's LoadParameters/SaveParameters sandwich, which is what makes clip
    /// cross-fades blend from the saved base pose.
    @discardableResult
    public func evaluateMotions(deltaTime: TimeInterval) -> Bool {
        handle.evaluateMotions(deltaTime: deltaTime)
    }
}

public enum Live2DModelError: Error {
    case unreadable(URL)
}
