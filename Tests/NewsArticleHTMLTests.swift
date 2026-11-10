import AppKit
import WebKit

@main @MainActor struct NewsArticleHTMLTests {
    static func main() async throws {
        _ = NSApplication.shared
        let view = WKWebView()
        let fixture = #"<html><body><nav>Ignore navigation</nav><article><h2>News</h2><p>Hello <strong>World</strong> &amp; [literal].<br>Next line</p><ul><li>One</li><li>Two</li></ul><a href='/details'>Read more</a><img src='image.png' alt='Banner'><a href='javascript:alert(1)'>Unsafe link</a><table><tr><th>Name</th><th>Value</th></tr><tr><td>A</td><td>1</td></tr></table><script>window.example = 1</script></article></body></html>"#
        view.loadHTMLString(fixture, baseURL: URL(string: "https://regional.example/news/index.html")!)
        for _ in 0..<100 {
            try await Task.sleep(for: .milliseconds(50))
            if !view.isLoading { break }
        }
        let value = try await view.evaluateJavaScript(NewsArticleHTML.conversionScript) as! String
        precondition(value.contains("## News"))
        precondition(value.contains("**World**"))
        precondition(value.contains("\\[literal\\]"))
        precondition(value.contains("- One\n- Two"))
        precondition(value.contains("[Read more](https://regional.example/details)"))
        precondition(value.contains("![Banner](https://regional.example/news/image.png)"))
        precondition(value.contains("| Name | Value |\n| --- | --- |\n| A | 1 |"))
        precondition(!value.contains("javascript:") && !value.contains("Ignore navigation") && !value.contains("window.example"))
        print("PASS: headings, emphasis, escaped text, lists, links, images, tables and script exclusion.")
        if CommandLine.arguments.count > 1 {
            let html = try String(contentsOfFile: CommandLine.arguments[1], encoding: .utf8)
            view.loadHTMLString(html, baseURL: URL(string: "https://regional.example/")!)
            for _ in 0..<200 {
                try await Task.sleep(for: .milliseconds(50))
                if !view.isLoading { break }
            }
            let article = try await view.evaluateJavaScript(NewsArticleHTML.conversionScript) as! String
            precondition(article.contains("Ruma") && article.contains("感謝各位"))
            print("PASS: actual TW announcement converts to native Markdown (\(article.count) characters).")
        }
        if CommandLine.arguments.count > 2 {
            let dynamicView = WKWebView()
            dynamicView.load(URLRequest(url: URL(string: CommandLine.arguments[2])!))
            var article = ""
            for _ in 0..<120 {
                try await Task.sleep(for: .milliseconds(250))
                article = (try? await dynamicView.evaluateJavaScript(NewsArticleHTML.conversionScript) as? String) ?? ""
                if article.contains("MEIKO") { break }
            }
            precondition(article.contains("MEIKO"), "Dynamic announcement did not yield the expected article: \(article)")
            dynamicView.stopLoading()
            print("PASS: online JavaScript announcement converts to Markdown (\(article.count) characters).")
        }
        view.stopLoading()
    }
}
