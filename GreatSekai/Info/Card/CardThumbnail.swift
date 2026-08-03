//
//  CardPreviewImage.swift
//  GreatSekai
//
//  Created by ThreeManager785 on 2026/8/1.
//


import SDWebImageSwiftUI
import SekaiKit
import SwiftUI

struct CardThumbnail: View {
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
    
    @Environment(\.disablePopover) private var disablePopover
    
    var body: some View {
        ZStack(alignment: .center) {
            // Cover
            WebImage(url: (card.canTrain && showTrainedVersion) ? card.afterTrainingThumbnailURL! : card.beforeTrainingThumbnailURL) { image in
                image
                    .interpolation(.high)
            } placeholder: {
                Rectangle()
                    .fill(getPlaceholderColor())
                    .aspectRatio(1, contentMode: .fit)
            }
            .resizable()
            .clipped()
            .frame(width: sideLength, height: sideLength)
            
            // Frame
            Image("CardFrameSmall\(card.rarity.borderNameSuffix)")
                .resizable()
                .frame(width: sideLength, height: sideLength)
            
            // Icons
            VStack(spacing: 0) {
                HStack {
                    Image("Attribute\(card.attribute.rawValue.capitalized)Small")
                        .resizable()
                        .frame(width: 0.225*sideLength, height: 0.225*68/64*sideLength, alignment: .topTrailing)
                        .offset(x: 1)
                    Spacer()
                }
                
                Spacer(minLength: 0)
                HStack {
                    HStack(spacing: 1) {
                        if let rarityInteger = card.rarity.integer {
                            ForEach(1...rarityInteger, id: \.self) { _ in
                                Image((card.canTrain && showTrainedVersion) ? .rarityStarTrained : .rarityStarRegular)
                                    .resizable()
                                    .frame(width: 0.17*sideLength, height: 0.17*sideLength)
                            }
                        } else {
                            Image(.rarityBirthday)
                                .resizable()
                                .frame(width: 0.17*sideLength, height: 0.17*sideLength)
                        }
                    }
                    .offset(x: 1)
                    Spacer()
                }
                .offset(y: -4)
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
                           let character = SekaiCache.preCache.character(id: card.characterID)?.fullName.forPreferredLocale()
                           {
                            Group {
                                Text(title)
                                Group {
                                    Text("\(character)") + Text("Typography.bold-dot-seperater").bold() +  Text(card.sourceType.localizedName)
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
