import SwiftUI
#if os(macOS)
import AppKit
#endif

private struct DismissSelectionKey: EnvironmentKey {
    static let defaultValue: (() -> Void)? = nil
}
extension EnvironmentValues {
    var dismissSelection: (() -> Void)? {
        get { self[DismissSelectionKey.self] }
        set { self[DismissSelectionKey.self] = newValue }
    }
}

extension View {
    /// A resizable, independent picker window on Mac; a sheet on mobile.
    @ViewBuilder
    func selectionWindow<Selection: View>(
        isPresented: Binding<Bool>, title: LocalizedStringResource,
        @ViewBuilder content: @escaping () -> Selection
    ) -> some View {
#if os(macOS)
        background {
            SelectionWindowPresenter(isPresented: isPresented, title: String(localized: title), content: AnyView(
                content()
                    .navigationTitle(Text(title))
                    .environment(\.dismissSelection, { isPresented.wrappedValue = false })
            ))
            .frame(width: 0, height: 0)
        }
#else
        sheet(isPresented: isPresented) {
            content().environment(\.dismissSelection, { isPresented.wrappedValue = false })
        }
#endif
    }
}

#if os(macOS)
private struct SelectionWindowPresenter: NSViewRepresentable {
    @Binding var isPresented: Bool
    let title: String
    let content: AnyView

    func makeCoordinator() -> Coordinator { Coordinator() }
    func makeNSView(context: Context) -> NSView { NSView() }
    func updateNSView(_ nsView: NSView, context: Context) {
        let coordinator = context.coordinator
        coordinator.onClose = { isPresented = false }
        coordinator.window?.title = title
        if isPresented {
            if let host = coordinator.host {
                host.rootView = content
            } else {
                let host = NSHostingController(rootView: content)
                let window = NSWindow(contentViewController: host)
                window.styleMask = [.titled, .closable, .miniaturizable, .resizable]
                window.isReleasedWhenClosed = false
                window.isRestorable = false
                window.title = title
                window.setContentSize(NSSize(width: 850, height: 650))
                window.minSize = NSSize(width: 420, height: 400)
                window.center()
                window.delegate = coordinator
                coordinator.host = host
                coordinator.window = window
                window.makeKeyAndOrderFront(nil)
            }
        } else {
            coordinator.window?.close()
        }
    }
    static func dismantleNSView(_ nsView: NSView, coordinator: Coordinator) {
        coordinator.onClose = nil
        coordinator.window?.close()
    }
    @MainActor final class Coordinator: NSObject, NSWindowDelegate {
        var window: NSWindow?
        var host: NSHostingController<AnyView>?
        var onClose: (() -> Void)?
        func windowWillClose(_ notification: Notification) {
            host = nil
            window = nil
            // AppKit may close during updateNSView; update the binding on the next turn.
            let action = onClose
            Task { @MainActor in action?() }
        }
    }
}
#endif
