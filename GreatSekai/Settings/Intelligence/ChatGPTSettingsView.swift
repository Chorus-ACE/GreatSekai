import SwiftUI
#if os(iOS)
import SafariServices
#endif

#if os(iOS)
/// Safari stays over the app so iOS doesn't suspend its loopback callback listener.
struct ChatGPTSafariView: UIViewControllerRepresentable {
    let url: URL
    func makeUIViewController(context: Context) -> SFSafariViewController { SFSafariViewController(url: url) }
    func updateUIViewController(_ controller: SFSafariViewController, context: Context) {}
}
#endif
