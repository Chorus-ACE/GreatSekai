// List and preview layout adapted from Greatdori's NewsView (Apache-2.0).
// https://greatdori.com/LICENSE.txt
import SekaiKit
import SwiftUI

struct NewsView: View {
    @Environment(\.colorScheme) private var colorScheme
    @State private var locale: SekaiLocale? = nil
    @State private var tag: NewsItem.Tag? = nil
    @State private var news: [NewsItem]?
    @State private var failedLocales: [SekaiLocale] = []
    @State private var retry = 0
    @State private var showFuture = false
    @State private var loadID = UUID()

    private var filteredNews: [NewsItem] {
        (news ?? []).filter { (tag == nil || $0.tag == tag) && (showFuture || $0.startDate <= .now) }
    }
    private var filterIsActive: Bool { locale != nil || tag != nil || showFuture }

    var body: some View {
        Group {
            if let _ = news {
                ScrollView {
                    LazyVStack {
                        if !failedLocales.isEmpty {
                            CustomGroupBox {
                                VStack(alignment: .leading, spacing: 8) {
                                    Text("News.regions-unavailable.\(failedLocales.map { $0.rawValue.uppercased() }.joined(separator: ", "))")
                                    Button("General.retry") { retry += 1 }
                                }.frame(maxWidth: .infinity, alignment: .leading)
                            }
                        }
                        ForEach(filteredNews) { item in
                            NewsEntryLink(item: item) {
                                CustomGroupBox { NewsPreview(item: item, showLocale: locale == nil, showDetails: true) }
                            }
                        }
                        if filteredNews.isEmpty && failedLocales.isEmpty {
                            ContentUnavailableView("News.empty", systemImage: "newspaper")
                        }
                    }
                    .padding()
                    .frame(maxWidth: infoContentMaxWidth)
                    .frame(maxWidth: .infinity)
                }
            } else {
                ExtendedConstraints { ProgressView() }
            }
        }
        .withSystemBackground()
        .navigationTitle("Home.news")
        .toolbar {
            ToolbarItem {
                Menu {
                    Picker("Content.locale", selection: $locale) {
                        Text("News.filter.all").tag(Optional<SekaiLocale>.none)
                        ForEach(SekaiLocale.allCases, id: \.self) { Text($0.rawValue.uppercased()).tag(Optional($0)) }
                    }.pickerStyle(.inline)
                    Picker("News.type", selection: $tag) {
                        Text("News.filter.all").tag(Optional<NewsItem.Tag>.none)
                        ForEach(NewsItem.Tag.allCases.filter { $0 != .unknown }, id: \.self) {
                            Text($0.localizedName).tag(Optional($0))
                        }
                    }.pickerStyle(.inline)
                    Toggle("News.show-future", isOn: $showFuture)
                } label: {
                    Image(systemName: "line.3.horizontal.decrease")
                        .foregroundStyle(filterIsActive ? (colorScheme == .dark ? Color.white : Color.black) : Color.primary)
                        .background {
                            if filterIsActive { Capsule().fill(Color.accentColor).scaledToFill().scaleEffect(1.3) }
                        }
                }
            }
        }
        .task(id: "\(locale?.rawValue ?? "all")-\(retry)") { await load() }
        .refreshable { await load() }
    }

    private func load() async {
        let requestID = UUID()
        loadID = requestID
        news = nil
        failedLocales = []
        let locales = locale.map { [$0] } ?? SekaiLocale.allCases
        let result = await withTaskGroup(of: (SekaiLocale, [NewsItem]?).self) { group in
            for locale in locales { group.addTask { (locale, try? await NewsItem.all(in: locale)) } }
            var rows: [NewsItem] = []
            var failed: [SekaiLocale] = []
            for await (locale, items) in group {
                if let items { rows += items } else { failed.append(locale) }
            }
            return (rows, failed)
        }
        guard !Task.isCancelled, loadID == requestID else { return }
        failedLocales = result.1.sorted { $0.rawValue < $1.rawValue }
        news = result.0.sorted { $0.startDate == $1.startDate ? $0.id < $1.id : $0.startDate > $1.startDate }
    }
}

private struct NewsEntryLink<Content: View>: View {
    let item: NewsItem
    @ViewBuilder var content: () -> Content
    var body: some View {
        Group {
            if item.browseType == "external", let url = item.contentURL {
                Link(destination: url, label: content)
            } else {
                NavigationLink { NewsDetailView(item: item) } label: { content() }
            }
        }.buttonStyle(.plain)
    }
}

struct NewsPreview: View {
    let item: NewsItem
    var showLocale = true
    var showDetails = false
    private var color: Color {
        switch item.tag {
        case .event: .green
        case .gacha: .blue
        case .music: .purple
        case .campaign: .red
        case .bug: .orange
        default: .yellow
        }
    }
    private var symbol: String {
        switch item.tag {
        case .event: "star.hexagon"
        case .gacha: "dice"
        case .music: "music.microphone"
        case .campaign: "calendar"
        case .bug: "exclamationmark.triangle"
        default: "text.page"
        }
    }
    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 5) {
                HStack {
                    Image(systemName: symbol)
                    Text(item.tag.localizedName + (showLocale ? " (\(item.locale.rawValue.uppercased()))" : ""))
                    Text(item.startDate, format: .dateTime.year().month().day().hour().minute()).foregroundStyle(.secondary)
                }.foregroundStyle(color).font(.footnote).bold()
                Text(item.displayTitle).font(.body).bold().lineLimit(2).foregroundStyle(.primary)
                    .typesettingLanguage(item.locale.nsLocale.language)
                if showDetails {
                    Text(item.startDate > .now ? "News.scheduled" : "News.published")
                        .font(.body).fontWeight(.light).foregroundStyle(.primary)
                }
            }
            Spacer(minLength: 0)
        }
        .accessibilityElement(children: .combine)
    }
}

struct HomeNewsView: View {
    @State private var items: [NewsItem]?
    @State private var failed = false
    @State private var retry = 0
    private let locale = SekaiLocale.primaryLocale

    var body: some View {
        CustomGroupBox {
            VStack(alignment: .leading, spacing: 12) {
                HStack {
                    Text("Home.news").font(.title2).bold()
                    Spacer()
                    NavigationLink { NewsView() } label: { Text("Details.more") }
                }
                if let items {
                    ForEach(items) { item in
                        NewsEntryLink(item: item) { NewsPreview(item: item) }
                        if item.id != items.last?.id { Divider() }
                    }
                    if items.isEmpty { Text("News.empty").foregroundStyle(.secondary) }
                } else if failed {
                    Button("General.retry") { retry += 1 }
                } else {
                    HStack { Spacer(); ProgressView(); Spacer() }
                }
            }
        }
        .task(id: retry) {
            failed = false
            do {
                let news = try await NewsItem.all(in: locale)
                guard !Task.isCancelled else { return }
                items = Array(news.filter { $0.startDate <= .now }.prefix(5))
            } catch { if !Task.isCancelled { failed = true } }
        }
    }
}
