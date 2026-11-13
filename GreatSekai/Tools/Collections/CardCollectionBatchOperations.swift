import Foundation

/// Shared by picker rows and bulk selection. URLs include the region and art
/// variant, so normal/trained images and different servers remain independent.
actor CardCollectionImageAvailability {
    static let shared = CardCollectionImageAvailability()

    private struct Entry {
        let available: Bool
        let expires: Date
    }
    private var cached: [URL: Entry] = [:]
    private var pending: [URL: Task<Bool?, Never>] = [:]
    private let positiveLifetime: TimeInterval
    private let negativeLifetime: TimeInterval
    private let now: @Sendable () -> Date
    private let check: @Sendable (URL) async -> Bool?

    init(
        positiveLifetime: TimeInterval = 15 * 60,
        negativeLifetime: TimeInterval = 30,
        now: @escaping @Sendable () -> Date = { Date() },
        check: @escaping @Sendable (URL) async -> Bool? = { await CardCollectionImageAvailability.checkRemote($0) }
    ) {
        self.positiveLifetime = positiveLifetime
        self.negativeLifetime = negativeLifetime
        self.now = now
        self.check = check
    }

    func isAvailable(_ url: URL?) async -> Bool {
        guard let url else { return false }
        if let entry = cached[url], entry.expires > now() { return entry.available }
        if let task = pending[url] { return await task.value ?? false }

        let check = check
        // A shared request survives one row disappearing while another caller
        // still needs the result. Its network timeout bounds its lifetime.
        let task = Task { await check(url) }
        pending[url] = task
        let result = await task.value
        pending[url] = nil
        if let result {
            cached[url] = Entry(available: result, expires: now().addingTimeInterval(result ? positiveLifetime : negativeLifetime))
        } else {
            // Offline, rate-limited and server-error responses can be retried.
            cached[url] = nil
        }
        return result ?? false
    }

    nonisolated private static func checkRemote(_ url: URL) async -> Bool? {
        var request = URLRequest(url: url)
        request.httpMethod = "HEAD"
        request.timeoutInterval = 20
        guard let (_, response) = try? await URLSession.shared.data(for: request),
              let http = response as? HTTPURLResponse else { return nil }
        guard http.statusCode != 429, http.statusCode < 500 else { return nil }
        return (200..<300).contains(http.statusCode)
    }
}

/// Bounds request concurrency and publishes chunks instead of triggering a
/// collection rewrite and list re-sort for every completed request.
nonisolated enum CardCollectionBatchSelection {
    static func process(
        _ cards: [SavedCard],
        concurrency: Int = 8,
        batchSize: Int = 32,
        check: @escaping @Sendable (SavedCard) async -> Bool = { card in
            if FileManager.default.fileExists(atPath: CardCollectionStore.imageURL(for: card).path) { return true }
            return await CardCollectionImageAvailability.shared.isAvailable(card.imageURL)
        },
        onBatch: @escaping @MainActor ([SavedCard], Int) -> Void
    ) async {
        precondition(concurrency > 0 && batchSize > 0)
        guard !Task.isCancelled else { return }
        await withTaskGroup(of: (Int, Bool).self) { group in
            var nextIndex = 0
            for _ in 0..<min(concurrency, cards.count) {
                let index = nextIndex
                let card = cards[index]
                group.addTask { (index, await check(card)) }
                nextIndex += 1
            }
            var accepted: [(Int, SavedCard)] = []
            var rejected = 0
            let clock = ContinuousClock()
            var lastUpdate = clock.now
            for await (index, available) in group {
                if Task.isCancelled {
                    group.cancelAll()
                    break
                }
                if available { accepted.append((index, cards[index])) }
                else { rejected += 1 }
                if accepted.count + rejected >= batchSize || lastUpdate.duration(to: clock.now) >= .milliseconds(150) {
                    await onBatch(accepted.sorted { $0.0 < $1.0 }.map(\.1), rejected)
                    accepted.removeAll(keepingCapacity: true)
                    rejected = 0
                    lastUpdate = clock.now
                }
                if !Task.isCancelled && nextIndex < cards.count {
                    let index = nextIndex
                    let card = cards[index]
                    group.addTask { (index, await check(card)) }
                    nextIndex += 1
                }
            }
            if !accepted.isEmpty || rejected > 0 {
                await onBatch(accepted.sorted { $0.0 < $1.0 }.map(\.1), rejected)
            }
        }
    }
}
