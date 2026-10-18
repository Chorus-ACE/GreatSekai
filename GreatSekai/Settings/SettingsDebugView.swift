//
//  SettingsDebugView.swift
//  GreatSekai
//
//  Created by ThreeManager785 on 2026/3/24.
//

import SwiftUI

struct SettingsDebugView: View {
    @AppStorage("showAdvancedDetails") var showAdvancedDetails = false
    @AppStorage("useLiquidGlassCGB") var useLiquidGlassCGB = true
    var body: some View {
        Section("Settings.debug.flags") {
            Toggle(isOn: $showAdvancedDetails, label: {
                Text(verbatim: "showAdvancedDetails")
                    .fontDesign(.monospaced)
            })
            
            Toggle(isOn: $useLiquidGlassCGB, label: {
                Text(verbatim: "useLiquidGlassCGB")
                    .fontDesign(.monospaced)
            })
        }
    }
}
