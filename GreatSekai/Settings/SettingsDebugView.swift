//
//  SettingsDebugView.swift
//  GreatSekai
//
//  Created by ThreeManager785 on 2026/3/24.
//

import SwiftUI

struct SettingsDebugView: View {
    @AppStorage("showCharacterDetails") var showCharacterDetails = false
    var body: some View {
        Section("Settings.debug.flags") {
            Toggle(isOn: $showCharacterDetails, label: {
                Text(verbatim: "showCharacterDetails")
                    .fontDesign(.monospaced)
            })
        }
    }
}
