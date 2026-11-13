//
//  CharacterDetailView.swift
//  GreatSekai
//
//  Created by ThreeManager785 on 2026/3/10.
//

import Observation
import SDWebImageSwiftUI
import SekaiKit
import SwiftUI

/// Shares the indexed card list between character search and detail pages.
@MainActor @Observable
final class CharacterDetailCardStore {
    static let shared = CharacterDetailCardStore()

    struct Snapshot: Sendable {
        let cardsByCharacter: [Int: [Card]]
        let randomCardsByCharacter: [Int: Card]

        init(cards: [Card]) {
            cardsByCharacter = Dictionary(grouping: cards, by: \.characterID)
            randomCardsByCharacter = cardsByCharacter.compactMapValues { $0.randomElement() }
        }
    }

    private(set) var snapshot: Snapshot?
    @ObservationIgnored private var loadTask: Task<Void, Never>?
    @ObservationIgnored private var loadGeneration = UUID()
    @ObservationIgnored private var loadedAt = Date.distantPast

    func invalidate() {
        loadGeneration = UUID()
        loadTask?.cancel()
        loadTask = nil
        // Keep already displayed records usable; the next load refreshes the list.
        loadedAt = .distantPast
    }

    func load() async {
        // Keep navigation instant without retaining an outdated list indefinitely.
        if snapshot != nil, Date.now.timeIntervalSince(loadedAt) < 5 * 60 {
            return
        }
        if let loadTask {
            await loadTask.value
            return
        }
        // Search and detail pages await the same request. Leaving either page
        // must not cancel the load needed by the other.
        let generation = loadGeneration
        let task = Task {
            defer { if loadGeneration == generation { loadTask = nil } }
            guard let cards = await Card.allWithCache(), !Task.isCancelled else { return }
            snapshot = Snapshot(cards: cards)
            loadedAt = .now
        }
        loadTask = task
        await task.value
    }
}

/// Queue only artwork that has finished loading, and retain decoded images until used.
@MainActor @Observable
private final class CharacterRandomCardBuffer {
    #if os(macOS)
    typealias Artwork = NSImage
    #else
    typealias Artwork = UIImage
    #endif

    struct PreparedCard {
        let card: Card
        let normal: Artwork?
        let trained: Artwork?
    }

    private(set) var cards: [PreparedCard] = []
    private(set) var isLoading = false
    private(set) var failed = false
    private var generation = UUID()

    func prepare(from availableCards: [Card], after displayedCard: Card?) async {
        let generation = UUID()
        self.generation = generation
        let availableIDs = Set(availableCards.map(\.id))
        cards.removeAll { !availableIDs.contains($0.card.id) || $0.card.id == displayedCard?.id }
        isLoading = true
        failed = false
        defer { if self.generation == generation { isLoading = false } }

        var attempted = Set<Int>()
        while cards.count < 3, !Task.isCancelled {
            let excluded = Set(cards.map { $0.card.id }).union(attempted).union([displayedCard?.id].compactMap { $0 })
            guard let card = availableCards.filter({ !excluded.contains($0.id) }).randomElement() else { break }
            attempted.insert(card.id)
            async let normal = Self.load(card.beforeTrainingArtURL)
            async let trained = Self.load(card.afterTrainingArtURL)
            let artwork = await (normal, trained)
            guard !Task.isCancelled, self.generation == generation else { return }
            // A missing normal image is supported by CardImage's trained-only fallback.
            guard (artwork.0 != nil || artwork.1 != nil),
                  card.afterTrainingArtURL == nil || artwork.1 != nil else {
                failed = true
                // Do not download an entire character's collection when offline.
                break
            }
            cards.append(.init(card: card, normal: artwork.0, trained: artwork.1))
        }
    }

    func next() -> PreparedCard? {
        guard !cards.isEmpty else { return nil }
        let next = cards.removeFirst()
        // Pinned images may have been evicted from NSCache while waiting in the queue.
        SDImageCache.shared.storeImage(toMemory: next.normal, forKey: SDWebImageManager.shared.cacheKey(for: next.card.beforeTrainingArtURL))
        if let url = next.card.afterTrainingArtURL {
            SDImageCache.shared.storeImage(toMemory: next.trained, forKey: SDWebImageManager.shared.cacheKey(for: url))
        }
        return next
    }

    private static func load(_ url: URL?) async -> Artwork? {
        guard let url else { return nil }
        return await withCheckedContinuation { continuation in
            // The same manager/cache as WebImage; completion includes the disk write.
            SDWebImageManager.shared.loadImage(with: url, options: [.retryFailed, .waitStoreCache],
                                               progress: nil) { image, _, _, _, finished, _ in
                if finished { continuation.resume(returning: image) }
            }
        }
    }
}

struct CharacterDetailView: View {
    var id: Int
    var allCharacters: [Character]?
    
    @State private var cardStore = CharacterDetailCardStore.shared
    @State private var allEvents: [Event]?
    @State private var randomCardBuffer = CharacterRandomCardBuffer()
    @State private var randomCard: CharacterRandomCardBuffer.PreparedCard?
    @State private var preparationID = UUID()
    
    @Environment(\.horizontalSizeClass) var sizeClass
    var body: some View {
        DetailViewBase(forType: Character.self, previewList: allCharacters, initialID: id) { information in
            let characterCards = cardStore.snapshot.map { $0.cardsByCharacter[information.id] ?? [] }
            let displayedCard = randomCard?.card.characterID == information.id
                ? randomCard?.card : cardStore.snapshot?.randomCardsByCharacter[information.id]

            HStack {
                Spacer(minLength: 0)
                VStack {
                    if let displayedCard {
                        CardImage(displayedCard, isNormalImageUnavailable: randomCard?.card.id == displayedCard.id && randomCard?.normal == nil)
                            .id(displayedCard.id)
                            .frame(maxWidth: infoContentMaxWidth)
                    }
                    
                    if displayedCard != nil {
                        Button(action: {
                            if let prepared = randomCardBuffer.next() {
                                randomCard = prepared
                            } else if !randomCardBuffer.isLoading {
                                preparationID = UUID()
                            }
                        }, label: {
                            Label("Character.random-card", systemImage: "arrow.clockwise")
                        })
                        .wrapIf(true) { content in
                            if #available(iOS 26.0, macOS 26.0, *) {
                                content.buttonStyle(.glass)
                            } else {
                                content.buttonStyle(.bordered)
                            }
                        }
                        .buttonBorderShape(.capsule)
                    }
                }
                Spacer(minLength: 0)
            }
            .task(id: "\(information.id)-\(characterCards?.count ?? 0)-\(displayedCard?.id ?? 0)-\(SekaiLocale.primaryLocale.rawValue)-\(SekaiLocale.secondaryLocale.rawValue)-\(preparationID)") {
                await randomCardBuffer.prepare(from: characterCards ?? [], after: displayedCard)
            }
            
            CharacterDetailOverviewView(information: information)
            DetailsCardsSection(cards: characterCards)
            DetailsEventsSection(events: allEvents, character: information)
            
            ExternalLinksSection(links: [
                ExternalLink(.sekaiViewer,
                             url: URL(string: "https://sekai.best/chara/\(information.id)")!
                            ),
                ExternalLink(.sekaipedia,
                             url: URL(string: "https://www.sekaipedia.org/wiki/\((information.fullName.localizedData?.forLocale(.en) ?? "").replacingOccurrences(of: " ", with: "_"))")!
                            ),
                ExternalLink(.cleista,
                             url: URL(string: "https://pjsk.cleista.cc/#/characters/\(information.givenNameEnglish.lowercased())")!
                            ),
                ExternalLink(.moeSekai,
                             url: URL(string: "https://pjsk.moe/character/\(information.id)/")!
                            )
            ])
        } switcherDestination: {
            CharacterSearchView()
        }
        .task {
            await cardStore.load()
        }
        .task {
            if allEvents == nil {
                let fetchedEvents = await Event.allWithCache()
                guard !Task.isCancelled else { return }
                allEvents = fetchedEvents ?? []
            }
        }
    }

}
