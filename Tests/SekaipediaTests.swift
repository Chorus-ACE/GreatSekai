import Foundation

private final class SekaipediaProtocol: URLProtocol {
    static var body = ""
    static var status = 200
    static var error: URLError?
    static var requests: [URLRequest] = []

    override class func canInit(with request: URLRequest) -> Bool {
        request.url?.host == "www.sekaipedia.org"
    }

    override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }

    override func startLoading() {
        Self.requests.append(request)
        if let error = Self.error {
            client?.urlProtocol(self, didFailWithError: error)
            return
        }
        let response = HTTPURLResponse(url: request.url!, statusCode: Self.status,
                                       httpVersion: nil, headerFields: nil)!
        client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
        client?.urlProtocol(self, didLoad: Data(Self.body.utf8))
        client?.urlProtocolDidFinishLoading(self)
    }

    override func stopLoading() {}
}

@main
struct SekaipediaTests {
    @MainActor
    static func main() async {
        precondition(URLProtocol.registerClass(SekaipediaProtocol.self))
        defer { URLProtocol.unregisterClass(SekaipediaProtocol.self) }

        // The same game ID belongs to different articles in each content table.
        for (content, field, pageID) in [(Sekaipedia.Content.card, "card_id", 2697),
                                         (.event, "event_id", 1347),
                                         (.music, "song_id", 432)] {
            SekaipediaProtocol.body = "{\"cargoquery\":[{\"title\":{\"pageID\":\"\(pageID)\"}}]}"
            let url = await Sekaipedia.url(for: content, id: 1)
            precondition(url.absoluteString == "https://www.sekaipedia.org/w/index.php?curid=\(pageID)")
            let query = parameters(SekaipediaProtocol.requests.last!.url!)
            precondition(query["tables"] == content.rawValue)
            precondition(query["where"] == "\(field)=1")

            let requestCount = SekaipediaProtocol.requests.count
            let cachedURL = await Sekaipedia.url(for: content, id: 1)
            precondition(cachedURL == url && SekaipediaProtocol.requests.count == requestCount)
        }

        for (offset, body) in ["{\"cargoquery\":[]}", "not JSON",
                               "{\"error\":{\"code\":\"internal_api_error\"}}",
                               "{\"cargoquery\":[{\"title\":{\"pageID\":\"invalid\"}}]}",
                               "{\"cargoquery\":[{\"title\":{\"pageID\":\"0\"}}]}"].enumerated() {
            SekaipediaProtocol.body = body
            await checkFallback(id: 10 + offset)
        }
        SekaipediaProtocol.body = "{\"cargoquery\":[{\"title\":{\"pageID\":\"999\"}}]}"
        SekaipediaProtocol.status = 503
        await checkFallback(id: 20)
        SekaipediaProtocol.status = 200
        SekaipediaProtocol.error = URLError(.timedOut)
        await checkFallback(id: 21)
        SekaipediaProtocol.error = nil

        // A failed lookup must be retried rather than cached permanently.
        let recovered = await Sekaipedia.url(for: .card, id: 21)
        precondition(parameters(recovered)["curid"] == "999")
        print("Sekaipedia: three ID mappings, cache isolation, missing/invalid data, HTTP errors, timeout and retry passed.")
    }

    @MainActor
    private static func checkFallback(id: Int) async {
        let url = await Sekaipedia.url(for: .card, id: id)
        precondition(url.path == "/wiki/Special:CargoQuery")
        let query = parameters(url)
        precondition(query["tables"] == "cards" && query["where"] == "card_id=\(id)")
        precondition(query["fields"] == "_pageName")
    }

    private static func parameters(_ url: URL) -> [String: String] {
        Dictionary(uniqueKeysWithValues: URLComponents(url: url, resolvingAgainstBaseURL: false)!
            .queryItems!.map { ($0.name, $0.value!) })
    }
}
