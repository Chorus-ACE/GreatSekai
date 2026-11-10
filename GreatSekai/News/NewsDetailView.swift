// Reading layout adapted from Greatdori's NewsDetailView (Apache-2.0).
// https://greatdori.com/LICENSE.txt
import MarkdownUI
import SekaiKit
import SwiftUI
import WebKit

struct NewsDetailView: View {
    let item: NewsItem
    @State private var markdown: String?
    @State private var failed = false
    @State private var retry = 0

    var body: some View {
        Group {
            if let url = item.contentURL {
                ZStack {
                    if let markdown {
                        ScrollView {
                            VStack(alignment: .leading) {
                                HStack {
                                    Markdown(article(markdown)).frame(maxWidth: .infinity, alignment: .leading)
                                    Spacer(minLength: 0)
                                }
                            }
                            .padding()
                            .textSelection(.enabled)
                        }
                    } else if failed {
                        ExtendedConstraints {
                            ContentUnavailableView {
                                Label("News.unavailable", systemImage: "newspaper")
                            } description: { Text("News.unavailable.description") } actions: {
                                Button("General.retry") { failed = false; retry += 1 }
                                Link("News.open-source", destination: url)
                            }
                        }
                    } else {
                        ExtendedConstraints { ProgressView() }
                    }
                    // The original page may populate its article asynchronously. Only
                    // its rendered content enters the native reader, never its layout.
                    NewsArticleLoader(url: url, markdown: $markdown, failed: $failed)
                        .id(retry)
                        .frame(width: 1, height: 1)
                        .opacity(0)
                        .accessibilityHidden(true)
                }
                .toolbar { ToolbarItem { ShareLink(item: url) } }
            } else {
                ContentUnavailableView("News.unavailable", systemImage: "newspaper", description: Text("News.unavailable.description"))
            }
        }
        .navigationTitle(item.displayTitle)
        .withSystemBackground()
    }

    private func article(_ markdown: String) -> String {
        #if os(macOS)
        "# " + item.displayTitle + "\n\n" + markdown
        #else
        markdown
        #endif
    }
}

private struct NewsArticleLoader {
    let url: URL
    @Binding var markdown: String?
    @Binding var failed: Bool

    func makeCoordinator() -> Coordinator { Coordinator(markdown: $markdown, failed: $failed) }
    private func makeView(_ coordinator: Coordinator) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.websiteDataStore = .nonPersistent()
        let controller = configuration.userContentController
        controller.add(coordinator, name: "sekaiNews")
        let source = """
        (() => {
          let timer;
          const publish = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
              const content = \(NewsArticleHTML.conversionScript);
              if (content) window.webkit.messageHandlers.sekaiNews.postMessage(content);
            }, 150);
          };
          new MutationObserver(publish).observe(document.documentElement, {childList: true, subtree: true, characterData: true});
          publish();
        })();
        """
        controller.addUserScript(WKUserScript(source: source, injectionTime: .atDocumentEnd, forMainFrameOnly: true))
        let view = WKWebView(frame: .zero, configuration: configuration)
        view.navigationDelegate = coordinator
        coordinator.startTimeout()
        view.load(URLRequest(url: url, timeoutInterval: 30))
        return view
    }

    @MainActor final class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        @Binding var markdown: String?
        @Binding var failed: Bool
        private var timeout: Task<Void, Never>?
        init(markdown: Binding<String?>, failed: Binding<Bool>) { _markdown = markdown; _failed = failed }
        func startTimeout() {
            timeout = Task { [weak self] in
                do { try await Task.sleep(for: .seconds(35)) } catch { return }
                guard let self, self.markdown == nil else { return }
                self.failed = true
            }
        }
        func stop() { timeout?.cancel(); timeout = nil }
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            guard message.frameInfo.isMainFrame, let content = message.body as? String, !content.isEmpty else { return }
            markdown = content
            failed = false
            stop()
        }
        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) { fail(error) }
        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) { fail(error) }
        func webView(_ webView: WKWebView, decidePolicyFor navigationResponse: WKNavigationResponse,
                     decisionHandler: @escaping (WKNavigationResponsePolicy) -> Void) {
            if navigationResponse.isForMainFrame,
               let response = navigationResponse.response as? HTTPURLResponse, response.statusCode >= 400 {
                failed = true; stop(); decisionHandler(.cancel)
            } else { decisionHandler(.allow) }
        }
        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction,
                     decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            guard let url = navigationAction.request.url,
                  ["http", "https", "about"].contains(url.scheme?.lowercased() ?? "") else {
                decisionHandler(.cancel); return
            }
            decisionHandler(.allow)
        }
        private func fail(_ error: Error) {
            guard (error as NSError).code != NSURLErrorCancelled else { return }
            failed = true; stop()
        }
    }

    static func dismantle(_ view: WKWebView, coordinator: Coordinator) {
        coordinator.stop()
        view.stopLoading()
        view.navigationDelegate = nil
        view.configuration.userContentController.removeScriptMessageHandler(forName: "sekaiNews")
        view.configuration.userContentController.removeAllUserScripts()
    }
}

#if os(macOS)
extension NewsArticleLoader: NSViewRepresentable {
    func makeNSView(context: Context) -> WKWebView { makeView(context.coordinator) }
    func updateNSView(_ view: WKWebView, context: Context) {}
    static func dismantleNSView(_ view: WKWebView, coordinator: Coordinator) { dismantle(view, coordinator: coordinator) }
}
#else
extension NewsArticleLoader: UIViewRepresentable {
    func makeUIView(context: Context) -> WKWebView { makeView(context.coordinator) }
    func updateUIView(_ view: WKWebView, context: Context) {}
    static func dismantleUIView(_ view: WKWebView, coordinator: Coordinator) { dismantle(view, coordinator: coordinator) }
}
#endif
