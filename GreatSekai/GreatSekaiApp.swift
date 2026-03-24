//
//  GreatSekaiApp.swift
//  GreatSekai
//
//  Created by ThreeManager785 on 2026/3/1.
//
import AVFoundation
import Combine
import SDWebImage
import SDWebImageSVGCoder
import SekaiKit
import SwiftUI
import UserNotifications

#if canImport(SwiftUIIntrospect)
@_spi(Advanced) import SwiftUIIntrospect
#endif

#if !os(macOS)
import UIKit
import BackgroundTasks
#else
import AppKit
#endif


@const let isSayuruVersion = true

// MARK: GreatSekaiApp (@main)
@main
struct GreatSekaiApp: App {
    @Environment(\.openWindow) var openWindow
    @Environment(\.scenePhase) var scenePhase
    var body: some Scene {
        WindowGroup {
            ZStack {
                ContentView()
                    .wrapIf(platform == .macOS) { content in
                        content
                            .frame(minWidth: 400)
                    }
            }
        }
        .commands {
            CommandGroup(replacing: .appSettings) {
                Button(action: {
                    openWindow(id: "Settei")
                }, label: {
                    Label("Settings.prompt", systemImage: "gear")
                })
                .keyboardShortcut(",", modifiers: .command)
            }
        }
        
        #if os(macOS)
        Window("Settings", id: "Settei") {
            SettingsView()
        }
        #endif
        
        #if os(visionOS)
        .windowStyle(.plain)
        #endif
    }
}

/*
private struct _AnyWindowView: View {
    var data: AnyWindowData
    @Environment(\.dismissWindow) private var dismissWindow
    @State private var dismissTimer: Timer?
    @State private var isRemovingWindowBackground = false
    var body: some View {
        unsafe UnsafePointer<() -> AnyView>(bitPattern: data.content)!.pointee()
            .onAppear {
                dismissTimer = Timer.scheduledTimer(withTimeInterval: 0.1, repeats: true) { _ in
                    if unsafe !UnsafePointer<Binding<Bool>>(bitPattern: data.isPresented)!.pointee.wrappedValue {
                        dismissWindow()
                        dismissTimer?.invalidate()
                    }
                }
            }
            .onDisappear {
                dismissTimer?.invalidate()
                unsafe UnsafePointer<Binding<Bool>>(bitPattern: data.isPresented)!.pointee.wrappedValue = false
                if let ptrOnDismiss = unsafe data.onDismiss {
                    unsafe UnsafePointer<() -> Void>(bitPattern: ptrOnDismiss)!.pointee()
                }
            }
#if os(visionOS)
            .glassBackgroundEffect(displayMode: isRemovingWindowBackground ? .never : .always)
            .onPreferenceChange(RemoveWindowBackgroundPreference.self) { value in
                isRemovingWindowBackground = value
            }
#endif
#if os(macOS)
#if canImport(SwiftUIIntrospect)
            .introspect(.window, on: .macOS(.v14...)) { window in
                window.isRestorable = false
            }
#endif
#endif
    }
}
 */

//MARK: AppDelegate
#if os(macOS)
class AppDelegate: NSObject, NSApplicationDelegate {
    @Environment(\.locale) var locale
    @AppStorage("IsFirstLaunch") var isFirstLaunch = true
    
    func applicationDidFinishLaunching(_ notification: Notification) {
        SDImageCodersManager.shared.addCoder(SDImageSVGCoder.shared)
        
        // Don't say lazy
        _ = NetworkMonitor.shared
    }
    
//    func application(_ application: NSApplication, open urls: [URL]) {
//        if let url = urls.first {
//            _handleURL(url)
//        }
//    }
    
    func application(_ application: NSApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        UserDefaults.standard.set(deviceToken, forKey: "RemoteNotifDeviceToken")
    }
}
#else
class AppDelegate: NSObject, UIApplicationDelegate {
    @Environment(\.locale) var locale
    @AppStorage("IsFirstLaunch") var isFirstLaunch = true
    
    static var orientationLock = UIInterfaceOrientationMask.portrait
    
    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil
    ) -> Bool {
        SDImageCodersManager.shared.addCoder(SDImageSVGCoder.shared)
        
        // Don't say lazy
        _ = NetworkMonitor.shared
        
//        initializeISV_ABTest()
        
        try? AVAudioSession.sharedInstance().setCategory(
            .playback,
            mode: .default,
            options: []
        )
        
        return true
    }
    
    func application(
        _ app: UIApplication,
        open url: URL,
        options: [UIApplication.OpenURLOptionsKey : Any] = [:]
    ) -> Bool {
//        _handleURL(url)
        return true
    }
    
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        UserDefaults.standard.set(deviceToken, forKey: "RemoteNotifDeviceToken")
    }
    
    func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
        return AppDelegate.orientationLock
    }
    
    func application(
        _ application: UIApplication,
        configurationForConnecting connectingSceneSession: UISceneSession,
        options: UIScene.ConnectionOptions
    ) -> UISceneConfiguration {
        let configuration = UISceneConfiguration(name: nil, sessionRole: connectingSceneSession.role)
        if connectingSceneSession.role == .windowApplication {
            configuration.delegateClass = SceneDelegate.self
        }
        return configuration
    }
}

@Observable
class SceneDelegate: NSObject, UIWindowSceneDelegate {
    weak var windowScene: UIWindowScene?
    
    func scene(
        _ scene: UIScene,
        willConnectTo session: UISceneSession,
        options connectionOptions: UIScene.ConnectionOptions
    ) {
        guard let windowScene = scene as? UIWindowScene else {
            return
        }
        self.windowScene = windowScene
    }
}
#endif

/*
@MainActor let _showRootViewSubject = PassthroughSubject<(AnyView, Bool), Never>()
func rootShowView(modal: Bool = false, @ViewBuilder content: () -> some View) {
    let view = AnyView(content())
    DispatchQueue.main.async {
        _showRootViewSubject.send((view, modal))
    }
}
extension View {
    func handlesExternalView() -> some View {
        modifier(_ExternalViewHandlerModifier())
    }
}
private struct _ExternalViewHandlerModifier: ViewModifier {
    @State private var presentingView: AnyView?
    @State private var isViewPresented = false
    @State private var isModalViewPresented = false
    @State private var isVisible = false
    func body(content: Content) -> some View {
        content
            .navigationDestination(isPresented: $isViewPresented) {
                presentingView
            }
            .sheet(isPresented: $isModalViewPresented) {
                presentingView
            }
            .onAppear {
                isVisible = true
            }
            .onDisappear {
                isVisible = false
            }
            .onReceive(_showRootViewSubject) { input in
                if isVisible {
                    presentingView = input.0
                    if input.1 {
                        isModalViewPresented = true
                    } else {
                        isViewPresented = true
                    }
                }
            }
    }
}

@MainActor
class NotificationDelegate: NSObject, @MainActor UNUserNotificationCenterDelegate {
    static let shared = NotificationDelegate()

    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        willPresent notification: UNNotification,
        withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
    ) {
        completionHandler([.banner, .sound])
    }
}
*/

#if os(iOS)
@const let platform = GreatSekaiPlatform.iOS
#elseif os(macOS)
@const let platform = GreatSekaiPlatform.macOS
#elseif os(visionOS)
@const let platform = GreatSekaiPlatform.visionOS
#else
@const let platform = GreatSekaiPlatform.unknown
#endif

enum GreatSekaiPlatform {
    case iOS
    case macOS
    case visionOS
    case unknown
}
