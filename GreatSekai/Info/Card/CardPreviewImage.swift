//
//  CardPreviewImage.swift
//  GreatSekai
//
//  Created by ThreeManager785 on 2026/8/1.
//


import SDWebImageSwiftUI
import SekaiKit
import SwiftUI

// MARK: CardPreviewImage
struct CardPreviewImage: View {
    private var card: Card
    private var showTrainedVersion: Bool
    private var sideLength: CGFloat = 72
    private var showNavigationHints: Bool
    
    @State var showCardDetailView = false
    @State var cardNavigationDestinationID: Int = 0
    @State var isHovering: Bool = false
    
    init(_ card: Card, showTrainedVersion: Bool = false, sideLength: CGFloat = 72, showNavigationHints: Bool = false) {
        self.card = card
        self.showTrainedVersion = showTrainedVersion
        self.sideLength = sideLength
        self.showNavigationHints = showNavigationHints
    }
    
//
//    init(_ card: Card, showTrainedVersion: Bool = false, sideLength: CGFloat = 72, showNavigationHints: Bool = false/*, cardNavigationDestinationID: Binding<Int?>*/) {
//        self.cardID = card.id
//        self.thumbNormalImageURL = card.thumbNormalImageURL
//        self.thumbTrainedImageURL = card.thumbAfterTrainingImageURL
//        self.cardType = card.type
//        self.attribute = card.attribute
//        self.rarity = card.rarity
//        self.bandIconImageURL = URL(string: "https://bestdori.com/res/icon/band_\(DoriCache.preCache.characters.first { $0.id == card.characterID }?.bandID ?? 0).svg")!
//        self.showTrainedVersion = showTrainedVersion
//        self.sideLength = sideLength
//        self.showNavigationHints = showNavigationHints
//        self.cardTitle = card.cardName
//        self.characterID = card.characterID
//        //        self._cardNavigationDestinationID = cardNavigationDestinationID
//    }
    
    @Environment(\.disablePopover) private var disablePopover
    
    var body: some View {
        ZStack(alignment: .center) {
            // Cover
            WebImage(url: (card.canTrain && showTrainedVersion) ? card.afterTrainingThumbnailURL! : card.beforeTrainingThumbnailURL) { image in
                image
            } placeholder: {
                RoundedRectangle(cornerRadius: 10)
                //                    .fill(Color.gray.opacity(0.15))
                    .fill(getPlaceholderColor())
                    .aspectRatio(1, contentMode: .fit)
            }
            .resizable()
            .interpolation(.high)
            .antialiased(true)
            //.scaledToFill()
            //.cornerRadius(2)
            .clipped()
            .frame(width: 67/72*sideLength, height: 67/72*sideLength)
            
            // Frame
            Image("CardFrameSmall\(card.rarity.borderNameSuffix)")
                .resizable()
                .frame(width: sideLength, height: sideLength)
            
            // Icons
            VStack(spacing: 0) {
                HStack {
                    WebImage(url: card.unit.iconImageURL)
                        .resizable()
                        .interpolation(.high)
                        .antialiased(true)
                        .frame(width: 20/72*sideLength, height: 20/72*sideLength, alignment: .topLeading)
                    Spacer()
                    WebImage(url: card.attribute.selectorImageURL)
                        .resizable()
                        .interpolation(.high)
                        .antialiased(true)
                        .frame(width: 18/72*sideLength, height: 18/72*sideLength, alignment: .topTrailing)
                        .offset(x: -1)
                }
                
                Spacer(minLength: 0)
                HStack {
                    VStack(alignment: .leading, spacing: -2) {
                        if let rarityInteger = card.rarity.integer {
                            ForEach(1...rarityInteger, id: \.self) { _ in
                                Image((card.canTrain && showTrainedVersion) ? .rarityStarTrained : .rarityStarRegular)
                                    .resizable()
                                    .frame(width: 12/72*sideLength, height: 12/72*sideLength)
                            }
                        } else {
                            Image(.rarityBirthday)
                                .resizable()
                                .frame(width: 12/72*sideLength, height: 12/72*sideLength)
                        }
                    }
                    Spacer()
                }
            }
            .frame(width: sideLength, height: sideLength)
        }
        .wrapIf(showNavigationHints, in: { content in
#if os(iOS)
            content
                .contextMenu(menuItems: {
                    VStack {
                        //                        NavigationLink(destination: {
                        //                            CardDetailView(id: cardID)
                        //                        }, label: {
                        Button(action: {
                            cardNavigationDestinationID = cardID
                            showCardDetailView = true
                        }, label: {
                            if let title = cardTitle.forPreferredLocale(), let character = cardCharacterName?.forPreferredLocale() {
                                Group {
                                    Text(title)
                                    Group {
                                        Text("\(character)") + Text("Typography.bold-dot-seperater").bold() +  Text(cardType.localizedString)
                                    }
                                    .font(.caption)
                                }
                            } else {
                                Group {
                                    Text(verbatim: "Lorem ipsum dolor")
                                    //                                        .foregroundStyle(.secondary)
                                    Text(verbatim: "Lorem ipsum")
                                        .font(.caption)
                                    //                                        .foregroundStyle(.tertiary)
                                }
                                .redacted(reason: .placeholder)
                                
                            }
                        })
                        .disabled(cardTitle.forPreferredLocale() == nil ||  cardCharacterName?.forPreferredLocale() == nil)
                    }
                })
#else
            // Very weird code cuz SwiftUI has very weird refreshing logic.
            // Don't touch without complete-understaning
            /*
            let sumimi = HereTheWorld(arguments: (cardTitle, cardCharacterName)) { cardTitle, cardCharacterName in
                VStack {
                    if let title = cardTitle.forPreferredLocale(), let character = cardCharacterName?.forPreferredLocale() {
                        Group {
                            Text(title)
                            Group {
                                Text("\(character)") + Text("Typography.bold-dot-seperater").bold() +  Text(cardType.localizedString)
                            }
                            .font(.caption)
                        }
                    } else {
                        Group {
                            Text(verbatim: "Lorem ipsum dolor")
                                .foregroundStyle(getPlaceholderColor())
                            //                                .fill()
                            Text(verbatim: "Lorem ipsum")
                                .foregroundStyle(.tertiary)
                        }
                        .redacted(reason: .placeholder)
                        
                    }
                }
                .padding()
            }
             */
            content
                .onHover { isHovering in
                    self.isHovering = isHovering && !disablePopover
                }
                .popover(isPresented: $isHovering, arrowEdge: .bottom) {
                    VStack {
                        if let title = card.title.majorValue,
                           let character = SekaiCache.preCache.characters.first(where: { $0.id == card.characterID })?.fullName.forPreferredLocale(),
                           let sourceType = card.sourceType
                           {
                            Group {
                                Text(title)
                                Group {
                                    Text("\(character)") + Text("Typography.bold-dot-seperater").bold() +  Text(sourceType.localizedName)
                                }
                                .font(.caption)
                            }
                        } else {
                            Group {
                                Text(verbatim: "Lorem ipsum dolor")
                                    .foregroundStyle(getPlaceholderColor())
                                Text(verbatim: "Lorem ipsum")
                                    .foregroundStyle(.tertiary)
                            }
                            .redacted(reason: .placeholder)
                            
                        }
                    }
                    .padding()
                }
//                .onChange(of: cardTitle) {
//                    sumimi.updateArguments((cardTitle, cardCharacterName))
//                }
//                .onChange(of: cardCharacterName) {
//                    sumimi.updateArguments((cardTitle, cardCharacterName))
//                }
#endif
        })
        .frame(width: sideLength, height: sideLength)
//        .onAppear {
//            self.cardCharacterName = DoriCache.preCache.characterDetails[characterID]?.characterName
//        }
        .navigationDestination(isPresented: $showCardDetailView, destination: {
//            CardDetailView(id: cardNavigationDestinationID)
        })
        /*
        .accessibilityElement(children: .combine)
        .accessibilityLabel("Accessibility.card.\(cardTitle.forPreferredLocale() ?? "")")
        .accessibilityCustomContent("Card.character", cardCharacterName?.forPreferredLocale() ?? "", importance: .high)
        .accessibilityCustomContent("Card.rarity", "\(rarity)")
        .accessibilityCustomContent("Card.attribute", attribute.selectorText)
         */
    }
}

extension Card.Rarity {
    var borderNameSuffix: String {
        switch self {
        case .birthday:
            return "BD"
        default:
            return String(self.integer ?? 0)
        }
    }
}
