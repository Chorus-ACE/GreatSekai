import Testing
@testable import Live2DKit

/// Proves the whole stack links and runs: Swift → ObjC++ bridge → Cubism C++
/// framework → the proprietary Core binary. If these pass, the packaging works
/// and everything after this is ordinary integration work.
// `.serialized`, and for a sharper reason than ModelTests: `stop()` disposes the
// framework GLOBALLY, so running it beside a suite holding live models tears the
// framework out from under them.
extension Live2DKitSuite {

@Suite("Cubism runtime", .serialized)
struct RuntimeTests {

    @Test("the runtime starts, reports a Core version, and stops")
    func startsAndStops() {
        Live2DRuntime.start()
        #expect(Live2DRuntime.isRunning)

        // Read from the linked binary, so this also catches a Vendor/ staged from
        // a different SDK than the Framework sources expect.
        let version = Live2DRuntime.coreVersion
        #expect(!version.isEmpty)
        #expect(version.split(separator: ".").count == 3, "unexpected Core version: \(version)")

        Live2DRuntime.stop()
        #expect(!Live2DRuntime.isRunning)
    }

    @Test("start and stop are idempotent")
    func idempotent() {
        Live2DRuntime.start()
        Live2DRuntime.start()
        #expect(Live2DRuntime.isRunning)

        Live2DRuntime.stop()
        Live2DRuntime.stop()
        #expect(!Live2DRuntime.isRunning)
    }
}
}
