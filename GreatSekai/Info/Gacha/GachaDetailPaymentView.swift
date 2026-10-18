import SekaiKit
import SwiftUI

struct GachaDetailPaymentView: View {
    let information: Gacha
    @Environment(\.horizontalSizeClass) private var sizeClass
    var body: some View {
        if !information.configuration.map({ $0?.behaviors }).isCollectionEmpty {
            GachaRegionalSection("Gacha.payment-options", values: information.configuration.map { $0.map(GachaPaymentDefinition.init) }) { definition in
                CustomGroupBox {
                    if definition.options.isEmpty {
                        Text("Gacha.section.empty").foregroundStyle(.secondary)
                    } else if platform == .macOS || sizeClass == .regular {
                        Table(definition.options) {
                            TableColumn("Gacha.payment-type") { option in drawCount(option) }
                            TableColumn("Gacha.payment-cost") { option in Text(costDescription(option)) }
                            TableColumn("Gacha.payment-rule") { option in paymentNote(option) }
                        }
                        .scrollDisabled(true)
                        .frame(height: CGFloat(definition.options.count + 1) * 44)
                    } else {
                        Grid(alignment: .leading, horizontalSpacing: 14, verticalSpacing: 12) {
                            GridRow {
                                Text("Gacha.payment-type").bold()
                                Text("Gacha.payment-cost").bold()
                                Text("Gacha.payment-rule").bold()
                            }
                            Divider()
                            ForEach(definition.options) { option in
                                GridRow {
                                    drawCount(option)
                                    Text(costDescription(option))
                                    paymentNote(option)
                                }
                            }
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                    }
                }
            }
        }
    }

    @ViewBuilder
    private func drawCount(_ option: Gacha.Behavior) -> some View {
        if option.spinCount == 1 { Text("Gacha.draw-single") }
        else { Text("Gacha.draw-count.\(option.spinCount)") }
    }

    private func paymentNote(_ option: Gacha.Behavior) -> some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(behaviorName(option.type))
            if let limit = option.executeLimit, limit > 0 {
                Text("Gacha.payment-limit") + Text(verbatim: ": \(limit)")
            }
        }
    }

    private func behaviorName(_ type: String) -> String {
        switch type {
        case "normal": String(localized: "Gacha.behavior.normal")
        case "once_a_day": String(localized: "Gacha.behavior.once_a_day")
        case "once_a_week": String(localized: "Gacha.behavior.once_a_week")
        case "over_rarity_3_once": String(localized: "Gacha.behavior.over_rarity_3_once")
        case "over_rarity_4_once": String(localized: "Gacha.behavior.over_rarity_4_once")
        default: type
        }
    }

    private func costDescription(_ option: Gacha.Behavior) -> String {
        if option.costQuantity == 0 { return String(localized: "Gacha.cost.free") }
        let name: String
        switch option.costResourceType {
        case "jewel": name = String(localized: "Gacha.cost.jewel")
        case "paid_jewel": name = String(localized: "Gacha.cost.paid_jewel")
        case "gacha_ticket": name = String(localized: "Gacha.cost.gacha_ticket")
        case .none: name = String(localized: "Gacha.cost.unknown")
        case .some(let type): name = type
        }
        let ticket = option.costResourceID.map { " #\($0)" } ?? ""
        return "\(option.costQuantity) \(name)\(ticket)"
    }
}

private struct GachaPaymentDefinition: Equatable {
    let options: [Gacha.Behavior]
    init(configuration: Gacha.Configuration) {
        options = configuration.behaviors.sorted { ($0.groupID ?? 0, $0.priority, $0.id) < ($1.groupID ?? 0, $1.priority, $1.id) }
    }
    static func == (lhs: Self, rhs: Self) -> Bool {
        lhs.options.elementsEqual(rhs.options) {
            $0.type == $1.type && $0.costResourceType == $1.costResourceType && $0.costResourceID == $1.costResourceID &&
            $0.costQuantity == $1.costQuantity && $0.spinCount == $1.spinCount && $0.executeLimit == $1.executeLimit
        }
    }
}
