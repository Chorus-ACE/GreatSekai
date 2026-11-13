import Foundation

private final class TestClock: @unchecked Sendable {
    private let lock = NSLock()
    private var date = Date(timeIntervalSince1970: 1000)
    func now() -> Date { lock.lock(); defer { lock.unlock() }; return date }
    func advance(_ seconds: TimeInterval) { lock.lock(); defer { lock.unlock() }; date.addTimeInterval(seconds) }
}

private actor Probe {
    private let response: Bool?
    private let delay: Duration
    private var calls = 0
    private var active = 0
    private var peak = 0
    init(response: Bool? = true, delay: Duration = .milliseconds(20)) {
        self.response = response; self.delay = delay
    }
    func check(_ url: URL) async -> Bool? {
        calls += 1; active += 1; peak = max(peak, active)
        try? await Task.sleep(for: delay)
        active -= 1
        return response
    }
    func snapshot() -> (calls: Int, peak: Int) { (calls, peak) }
}

private actor Gate {
    private var started = 0
    private var ready: CheckedContinuation<Void, Never>?
    private var waiting: [CheckedContinuation<Bool, Never>] = []
    func check() async -> Bool {
        started += 1
        if started == 8 { ready?.resume(); ready = nil }
        return await withCheckedContinuation { waiting.append($0) }
    }
    func waitUntilFull() async {
        if started >= 8 { return }
        await withCheckedContinuation { ready = $0 }
    }
    func release() {
        for continuation in waiting { continuation.resume(returning: true) }
        waiting.removeAll()
    }
    func count() -> Int { started }
}

@main
struct CollectionBatchTests {
    @MainActor static func main() async {
        let normal = URL(string: "https://example.com/jp/1/normal.jpg")!
        let trained = URL(string: "https://example.com/jp/1/trained.jpg")!
        let otherRegion = URL(string: "https://example.com/en/1/normal.jpg")!
        let clock = TestClock()
        let probe = Probe()
        let cache = CardCollectionImageAvailability(now: { clock.now() }, check: { await probe.check($0) })
        await withTaskGroup(of: Bool.self) { group in
            for _ in 0..<40 { group.addTask { await cache.isAvailable(normal) } }
            for await available in group { assert(available) }
        }
        var snapshot = await probe.snapshot()
        assert(snapshot.calls == 1, "Simultaneous checks must share one request")
        var available = await cache.isAvailable(normal)
        assert(available)
        snapshot = await probe.snapshot(); assert(snapshot.calls == 1)
        available = await cache.isAvailable(trained); assert(available)
        available = await cache.isAvailable(otherRegion); assert(available)
        snapshot = await probe.snapshot(); assert(snapshot.calls == 3, "Variants and regions need independent cache entries")
        clock.advance(901)
        available = await cache.isAvailable(normal); assert(available)
        snapshot = await probe.snapshot(); assert(snapshot.calls == 4, "Positive cache entries must expire")

        let missingProbe = Probe(response: false, delay: .milliseconds(1))
        let missingCache = CardCollectionImageAvailability(now: { clock.now() }, check: { await missingProbe.check($0) })
        available = await missingCache.isAvailable(normal); assert(!available)
        available = await missingCache.isAvailable(normal); assert(!available)
        snapshot = await missingProbe.snapshot(); assert(snapshot.calls == 1)
        clock.advance(31)
        available = await missingCache.isAvailable(normal); assert(!available)
        snapshot = await missingProbe.snapshot(); assert(snapshot.calls == 2, "Negative entries must allow retry after expiry")
        let offlineProbe = Probe(response: nil, delay: .milliseconds(1))
        let offlineCache = CardCollectionImageAvailability(check: { await offlineProbe.check($0) })
        available = await offlineCache.isAvailable(normal); assert(!available)
        available = await offlineCache.isAvailable(normal); assert(!available)
        available = await offlineCache.isAvailable(nil); assert(!available)
        snapshot = await offlineProbe.snapshot(); assert(snapshot.calls == 2, "Transport failures must not be cached")

        let cards = (1...64).map {
            SavedCard(cardID: $0, trained: false, title: "#\($0)", imageURL: URL(string: "https://example.com/\($0).jpg")!)
        }
        let sequential = await runBatch(cards, concurrency: 1)
        let parallel = await runBatch(cards, concurrency: 8)
        assert(sequential.peak == 1)
        assert(parallel.peak > 1 && parallel.peak <= 8, "Bulk checks must overlap without exceeding the limit")
        print("64 simulated 20 ms checks: serial \(sequential.elapsed), parallel \(parallel.elapsed); peak \(parallel.peak) requests")

        let gate = Gate()
        var cancelledUpdates = 0
        let task = Task {
            await CardCollectionBatchSelection.process(cards, check: { _ in await gate.check() }) { _, _ in
                cancelledUpdates += 1
            }
        }
        await gate.waitUntilFull()
        task.cancel()
        await gate.release()
        await task.value
        let started = await gate.count()
        assert(started == 8 && cancelledUpdates == 0, "Cancelling must stop scheduling new checks")
        var emptyUpdates = 0
        await CardCollectionBatchSelection.process([], check: { _ in fatalError("Empty selection issued a request") }) { _, _ in emptyUpdates += 1 }
        assert(emptyUpdates == 0)
        print("Shared availability checks, cache expiry, transient failures, bounded concurrency, batching and cancellation passed.")
    }

    @MainActor private static func runBatch(_ cards: [SavedCard], concurrency: Int) async -> (elapsed: Duration, peak: Int) {
        let probe = Probe()
        var added: [SavedCard] = []
        var rejected = 0
        var writes = 0
        let clock = ContinuousClock()
        let start = clock.now
        await CardCollectionBatchSelection.process(cards, concurrency: concurrency, check: { card in
            _ = await probe.check(card.imageURL)
            return card.cardID % 7 != 0
        }) { accepted, failures in
            added.append(contentsOf: accepted); rejected += failures; writes += 1
            assert(accepted.count + failures <= 32)
        }
        let elapsed = start.duration(to: clock.now)
        let expected = Set(cards.filter { $0.cardID % 7 != 0 }.map(\.id))
        assert(Set(added.map(\.id)) == expected && added.count == expected.count)
        assert(rejected == cards.count - expected.count)
        assert(writes < cards.count, "Batching must reduce persistence and UI updates")
        let snapshot = await probe.snapshot()
        assert(snapshot.calls == cards.count)
        return (elapsed, snapshot.peak)
    }
}
