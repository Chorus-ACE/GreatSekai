//
//  Sekaipedia.swift
//  GreatSekai
//

// IMPORTANT: These link fetching feature from Sekaipedia is not approved by Sekaipedia yet. This is only for test purpose and shall not be shipped before approval by Sekaipedia.

import Foundation

@MainActor
enum Sekaipedia {
    enum Content: String {
        case card = "cards"
        case event = "events"
        case music = "songs"

        var idField: String {
            switch self {
            case .card: "card_id"
            case .event: "event_id"
            case .music: "song_id"
            }
        }
    }

    private static var cachedURLs: [Content: [Int: URL]] = [:]

    static func url(for content: Content, id: Int) async -> URL {
        if let cachedURL = cachedURLs[content]?[id] {
            return cachedURL
        }

        let query = [
            URLQueryItem(name: "tables", value: content.rawValue),
            URLQueryItem(name: "fields", value: "_pageID=pageID"),
            URLQueryItem(name: "where", value: "\(content.idField)=\(id)"),
            URLQueryItem(name: "limit", value: "1")
        ]
        // Keep the ID query available in the browser if the API cannot resolve it.
        var fallback = URLComponents(string: "https://www.sekaipedia.org/wiki/Special:CargoQuery")!
        fallback.queryItems = query.map {
            $0.name == "fields" ? URLQueryItem(name: "fields", value: "_pageName") : $0
        }

        var requestURL = URLComponents(string: "https://www.sekaipedia.org/w/api.php")!
        requestURL.queryItems = [
            URLQueryItem(name: "action", value: "cargoquery"),
            URLQueryItem(name: "format", value: "json")
        ] + query

        do {
            var request = URLRequest(url: requestURL.url!)
            request.timeoutInterval = 15
            let (data, response) = try await URLSession.shared.data(for: request)
            guard let response = response as? HTTPURLResponse,
                  (200..<300).contains(response.statusCode) else {
                return fallback.url!
            }
            let result = try JSONDecoder().decode(QueryResponse.self, from: data)
            guard let value = result.cargoquery.first?.title.pageID,
                  let pageID = Int(value), pageID > 0 else {
                return fallback.url!
            }

            // Wiki page IDs differ from game IDs and survive article renames.
            let url = URL(string: "https://www.sekaipedia.org/w/index.php?curid=\(pageID)")!
            cachedURLs[content, default: [:]][id] = url
            return url
        } catch {
            return fallback.url!
        }
    }

    private struct QueryResponse: Decodable {
        var cargoquery: [Entry]

        struct Entry: Decodable {
            var title: Page
        }

        struct Page: Decodable {
            var pageID: String
        }
    }
}
