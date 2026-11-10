import SekaiKit
import SwiftUI

struct CardDetailCostumesSection: View {
    let costumes: [CardCostume3D]

    var body: some View {
        Group {
            if !costumes.isEmpty {
                Section {
                    VStack {
                        ForEach(costumes) { costume in
                            NavigationLink {
                                Model3DViewerView(initialSelection: costume.selection)
                            } label: {
                                CardCostumeInfo(costume: costume)
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .frame(maxWidth: infoContentMaxWidth)
                } header: {
                    Text("Model-3d.inspector.costume")
                        .font(.title2)
                        .bold()
                        .frame(maxWidth: infoContentMaxWidth, alignment: .leading)
                        .detailSectionHeader()
                }
            }
        }
    }
}

private struct CardCostumeInfo: View {
    let costume: CardCostume3D

    var body: some View {
        SummaryViewBase(.horizontal, title: .unlocalized(costume.costume.name ?? costume.variant.name ?? String(costume.variant.costumeID))) {
            FallbackableWebImage(throughURLs: costume.variant.thumbnailImageURLs(in: costume.selection.locale)) { image in
                image.resizable().scaledToFit()
            } placeholder: {
                RoundedRectangle(cornerRadius: 5)
                    .fill(getPlaceholderColor())
                    .overlay {
                        Image(systemName: "hanger").foregroundStyle(.secondary)
                    }
            }
            .frame(width: 96 * 0.85, height: 96 * 0.85)
            .clipShape(RoundedRectangle(cornerRadius: 5))
            .accessibilityHidden(true)
        } detail: {
            Text(SekaiCache.preCache.character(id: costume.characterID)?.fullName.forLocale(costume.selection.locale) ?? String(localized: "Info.unknown"))
                .font(platform == .macOS ? .body : .caption)
        }
        .typesettingLanguage(.explicit(costume.selection.locale.nsLocale.language))
    }
}
