import Testing

/// The parent every suite in this target nests under, so they run **one at a time**.
///
/// `.serialized` on an individual suite orders only the tests inside it; separate
/// top-level suites still run concurrently with each other. That is not survivable
/// here: Cubism's framework, allocator and id manager are process-global and not
/// thread-safe, and `Live2DRuntime.stop()` disposes the framework for the whole
/// process, so a suite tearing it down while another holds a live model pulls the
/// ground out from under it.
///
/// This was latent while only two suites existed and became a hard trap the moment a
/// third was added: every test passed in isolation and the full run died in a
/// different place each time. Nesting them here is what makes plain `swift test`
/// correct, rather than relying on someone remembering `--no-parallel`.
@Suite("Live2DKit", .serialized)
struct Live2DKitSuite {}
