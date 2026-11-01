import SwiftUI

/// A localized Text with inline URL links and optional in-app link actions.
/// Interpolate attributed link labels into Text, rather than Link or Button views.
struct LocalizedLinkText: View {
    private let text: Text
    private let actions: [URL: @MainActor () -> Void]
    @Environment(\.openURL) private var openURL

    init(_ text: Text, actions: [URL: @MainActor () -> Void] = [:]) {
        self.text = text
        self.actions = actions
    }

    var body: some View {
        text.environment(\.openURL, OpenURLAction { url in
            if let action = actions[url] {
                action()
            } else {
                // Preserve URL handling supplied by the enclosing view.
                openURL(url)
            }
            return .handled
        })
    }

    /// Labels are literal text, so punctuation and Markdown in source titles stay intact.
    static func link(_ title: String, destination: URL) -> AttributedString {
        var text = AttributedString(title)
        text.link = destination
        text.foregroundColor = .accentColor
        return text
    }
}
