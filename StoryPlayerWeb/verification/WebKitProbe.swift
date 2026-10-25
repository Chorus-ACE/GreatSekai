import AppKit
import WebKit

// Run against the generated bundle and an ignored, locally prepared configuration.
// No game data is part of this verification utility.
@MainActor final class Probe: NSObject, NSApplicationDelegate, WKURLSchemeHandler, WKScriptMessageHandler, WKNavigationDelegate {
    let bundle = URL(fileURLWithPath: CommandLine.arguments[1])
    let configuration = try! String(contentsOfFile: CommandLine.arguments[2], encoding: .utf8)
    let output = URL(fileURLWithPath: CommandLine.arguments[3])
    var web: WKWebView!
    var window: NSWindow!
    var playing = false
    var resume = false
    var verifying = false

    func applicationDidFinishLaunching(_ notification: Notification) {
        let settings = WKWebViewConfiguration()
        settings.setURLSchemeHandler(self, forURLScheme: "sekai-story")
        settings.userContentController.add(self, name: "storyPlayer")
        settings.userContentController.addUserScript(WKUserScript(source: "window.addEventListener('error', e => window.webkit.messageHandlers.storyPlayer.postMessage({type:'error', message:e.message}));", injectionTime: .atDocumentStart, forMainFrameOnly: true))
        settings.userContentController.addUserScript(WKUserScript(source: #"""
        window.__storyAudio = { contexts: [], elements: [], decoded: 0 };
        const NativeAudio = window.Audio;
        window.Audio = function(...args) { const el = new NativeAudio(...args); window.__storyAudio.elements.push(el); return el; };
        window.Audio.prototype = NativeAudio.prototype;
        const NativeContext = window.AudioContext;
        window.AudioContext = function(...args) {
          const ctx = new NativeContext(...args);
          window.__storyAudio.contexts.push(ctx);
          const decode = ctx.decodeAudioData.bind(ctx);
          ctx.decodeAudioData = (...args) => decode(...args).then(buffer => { window.__storyAudio.decoded++; return buffer; });
          return ctx;
        };
        window.AudioContext.prototype = NativeContext.prototype;
        """#, injectionTime: .atDocumentStart, forMainFrameOnly: true))
        settings.mediaTypesRequiringUserActionForPlayback = []
        web = WKWebView(frame: NSRect(x: 0, y: 0, width: 1100, height: 700), configuration: settings)
        web.navigationDelegate = self
        window = NSWindow(contentRect: web.frame, styleMask: [.titled, .closable, .resizable], backing: .buffered, defer: false)
        window.title = "GreatSekai Story WebKit Probe"
        window.contentView = web
        window.makeKeyAndOrderFront(nil)
        web.load(URLRequest(url: URL(string: "sekai-story://viewer/index.html")!))
        DispatchQueue.main.asyncAfter(deadline: .now() + 180) { print("TIMEOUT"); exit(2) }
    }

    func webView(_ webView: WKWebView, start task: any WKURLSchemeTask) {
        let url = task.request.url!
        let file = bundle.appendingPathComponent(url.path).standardizedFileURL
        do {
            guard file.path.hasPrefix(bundle.path + "/") else { throw URLError(.noPermissionsToReadFile) }
            let data = try Data(contentsOf: file)
            let mime = ["html": "text/html", "js": "text/javascript", "css": "text/css"][url.pathExtension] ?? "text/plain"
            task.didReceive(URLResponse(url: url, mimeType: mime, expectedContentLength: data.count, textEncodingName: "utf-8"))
            task.didReceive(data)
            task.didFinish()
        } catch { print("RESOURCE ERROR", url, error); task.didFailWithError(error) }
    }
    func webView(_ webView: WKWebView, stop task: any WKURLSchemeTask) {}

    func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let body = message.body as? [String: Any], let type = body["type"] as? String else { return }
        print(body)
        fflush(stdout)
        switch type {
        case "ready":
            web.evaluateJavaScript("window.storyPlayer.load(\(configuration)); null") { _, error in
                if let error { print(error); exit(1) }
            }
        case "error": exit(1)
        case "loaded":
            web.evaluateJavaScript("document.querySelector('.pjsk-start').click(); null")
        case "playing": playing = true
        case "progress":
            if playing, !resume, let index = body["index"] as? Int, index >= 5 {
                resume = true
                web.evaluateJavaScript("JSON.stringify({decoded:__storyAudio.decoded, contexts:__storyAudio.contexts.map(c=>c.state), media:__storyAudio.elements.filter(e=>e.currentTime>0).map(e=>({time:e.currentTime,paused:e.paused}))})") { value, _ in
                    print("AUDIO BEFORE SUSPEND", value as Any)
                }
                snapshot("playing") {
                    self.web.evaluateJavaScript("window.storyPlayer.setActive(false); document.querySelectorAll('canvas').length") { value, error in
                        print("SUSPENDED CANVAS COUNT", value as Any, error as Any)
                        guard let count = value as? Int, count == 0 else { exit(1) }
                        self.web.evaluateJavaScript("window.storyPlayer.setActive(true); null")
                    }
                }
            } else if resume, !verifying, playing, let index = body["index"] as? Int, index >= 5 {
                verifying = true
                snapshot("resumed") {
                    self.web.evaluateJavaScript("document.querySelector('[data-k=log]').click(); document.querySelector('#log').open") { value, error in
                        print("STORY LOG OPEN", value as Any, error as Any)
                        guard (value as? NSNumber)?.boolValue == true else { exit(1) }
                        self.web.evaluateJavaScript("window.storyPlayer.destroy(); document.querySelectorAll('canvas').length") { value, error in
                            print("DESTROYED CANVAS COUNT", value as Any, error as Any)
                            guard let count = value as? Int, count == 0 else { exit(1) }
                            self.web.evaluateJavaScript("__storyAudio.contexts.every(c=>c.state==='closed') && __storyAudio.elements.every(e=>e.paused)") { value, error in
                                print("AUDIO RELEASED", value as Any, error as Any)
                                guard (value as? NSNumber)?.boolValue == true else { exit(1) }
                                print("VERIFIED"); exit(0)
                            }
                        }
                    }
                }
            }
        default: break
        }
    }

    func snapshot(_ name: String, then completion: @escaping () -> Void) {
        web.takeSnapshot(with: nil) { image, error in
            if let image, let tiff = image.tiffRepresentation, let bitmap = NSBitmapImageRep(data: tiff),
               let png = bitmap.representation(using: .png, properties: [:]) {
                try! png.write(to: self.output.appendingPathComponent(name + ".png"))
            } else { print("SNAPSHOT ERROR", error as Any) }
            completion()
        }
    }
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) { print(error); exit(1) }
}

@main struct Main {
    @MainActor static func main() {
        let app = NSApplication.shared
        let delegate = Probe()
        app.delegate = delegate
        app.run()
    }
}
