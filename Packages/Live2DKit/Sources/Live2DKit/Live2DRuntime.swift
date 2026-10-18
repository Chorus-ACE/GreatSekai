import CubismBridge
import Foundation

/// The Cubism runtime, as Swift sees it.
///
/// Cubism installs a process-wide allocator that must be set up before any other
/// call and torn down after every model is gone, so this wraps a singleton rather
/// than pretending each caller can own an instance.
public enum Live2DRuntime {

    /// Start the runtime if it isn't already. Idempotent.
    public static func start() {
        CubismRuntime.shared.start()
    }

    /// Tear the runtime down. Safe when not running.
    public static func stop() {
        CubismRuntime.shared.stop()
    }

    public static var isRunning: Bool {
        CubismRuntime.shared.isRunning
    }

    /// The version reported by the linked Cubism Core binary.
    ///
    /// Read from the binary rather than hard-coded, so it reflects whatever
    /// `Scripts/bootstrap.sh` actually staged; a mismatch between the Core and
    /// the Framework sources is otherwise a confusing failure at load time.
    public static var coreVersion: String {
        CubismRuntime.shared.coreVersion
    }
}
