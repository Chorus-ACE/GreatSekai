import SDWebImageSwiftUI
import SekaiKit
import SwiftUI

struct StickerDetailView: View {
    let id: Int
    var allStickers: [Sticker]? = nil

    var body: some View {
        DetailViewBase(forType: Sticker.self, previewList: allStickers, initialID: id) { information in
            StickerDetailContent(information: information).id(information.id)
        } switcherDestination: {
            StickerSearchView()
        }
    }
}

private struct StickerDetailContent: View {
    let information: Sticker
    var body: some View {
        DetailInfoBase {
            DetailInfoItem("Sticker.title", localizableText: information.title)
            DetailInfoItem("Sticker.type", localizableText: information.type.map { $0?.localizedName })
            if let characters = information.characterIDs.majorValue, !characters.isEmpty {
                DetailInfoItem("Sticker.characters") {
                    if characters.count == 1, let item = characters.first {
                        NavigationLink(destination: {
                            CharacterDetailView(id: item)
                        }, label: {
                            Text(SekaiCache.preCache.character(id: item)?.fullName.forPreferredLocale() ?? String(localized: "Info.unknown"))
                            WebImage(url: Character.iconImageURL(forID: item))
                                .antialiased(true)
                                .resizable()
                                .frame(width: imageButtonSize, height: imageButtonSize)
                        })
                        .buttonStyle(.plain)
                    } else {
                        CharacterWrappingHStack(characters: characters)
                    }
                }
            }
            if !information.description.isCollectionEmpty {
                DetailInfoItem("Sticker.description", localizableText: information.description)
            }
            if !information.releaseDate.isEmpty {
                DetailInfoItem("Sticker.release-date", date: information.releaseDate)
            }
            DetailInfoItem("ID", text: String(information.id))
        } head: {
            StickerImage(sticker: information)
                .frame(maxWidth: 280)
        }
        DetailArtsSection {
            ArtsTab("Sticker.arts.image") {
                for locale in information.availableLocales {
                    if let url = information.imageURL(in: locale) {
                        ArtsItem(title: .init(stringLiteral: locale.rawValue.uppercased()), url: url)
                    }
                }
            }
        }
        ExternalLinksSection(links: [ExternalLink(name: "External-link.sekai-viewer", url: URL(string: "https://sekai.best/stamp")!)])
    }

}
