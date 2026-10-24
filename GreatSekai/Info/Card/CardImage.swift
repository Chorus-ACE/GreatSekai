//===---*- Greatdori! -*---------------------------------------------------===//
//
// CardCoverImage.swift
//
// This source file is part of the Greatdori! open source project
//
// Copyright (c) 2025 the Greatdori! project authors
// Licensed under Apache License v2.0
//
// See https://greatdori.com/LICENSE.txt for license information
// See https://greatdori.com/CONTRIBUTORS.txt for the list of Greatdori! project authors
//
//===----------------------------------------------------------------------===//

import SDWebImageSwiftUI
import SekaiKit
import SwiftUI

let cardCornerRadius: CGFloat = 0
let standardCardWidth: CGFloat = 2520
let standardCardHeight: CGFloat = 1440
let expectedCardRatio: CGFloat = 2520/1440
let cardFocusSwitchingAnimation: Animation = .easeOut(duration: 0.15)


// MARK: CardCoverImage
struct CardImage: View {
    private var card: Card
    private var displayType: CardImageDisplayType
    private var showNavigationHints: Bool
    
    @State var showCardDetailView: Bool = false
    @State var isNormalImageUnavailable: Bool = false
    
//    @State var normalCardIsOnHover = false
//    @State var trainedCardIsOnHover = false
    @State var focusIndex: Int = 0
    
    init(_ card: Card, showNavigationHints: Bool = true, displayType: CardImageDisplayType = .both) {
        self.card = card
        
        self.showNavigationHints = showNavigationHints
        self.displayType = displayType
    }
    var body: some View {
        ZStack {
            CardCoverImageBorder(card, isNormalImageUnavailable: $isNormalImageUnavailable, showNavigationHints: showNavigationHints, displayType: displayType, focusIndex: $focusIndex)
            
            // The Image may not be in expected ratio. Gosh.
            // Why the heck will the image has a different ratio with the border???
            // --@ThreeManager785
            
            // MARK: Visualized Card Information
            // This includes information like `card.attributes` and `card.rarity`.
            GeometryReader { proxy in
                VStack {
                    HStack {
                        Spacer()
                        Image("Attribute\(card.attribute.rawValue.capitalized)Large")
                            .resizable()
                            .frame(width: 0.1*proxy.size.width, height: 0.1*expectedCardRatio*92/88*proxy.size.height, alignment: .topTrailing)
                            .offset(x: proxy.size.width*(-0.04))
                    }
                    Spacer()
                    HStack {
                        VStack(alignment: .leading, spacing: -1) {
                            if let rarityInteger = card.rarity.integer {
                                ForEach(1...rarityInteger, id: \.self) { _ in
                                    Image((card.canTrain && displayType != .normalOnly) ? .rarityStarTrained : .rarityStarRegular)
                                        .resizable()
                                        .frame(width: 0.055*proxy.size.width, height: 0.055*expectedCardRatio*proxy.size.height, alignment: .topLeading)
                                        .padding(.top, CGFloat(-rarityInteger))
                                }
                            } else {
                                Image(.rarityBirthday)
                                    .resizable()
                                    .frame(width: 0.055*proxy.size.width, height: 0.055*expectedCardRatio*proxy.size.height, alignment: .topLeading)
                                    .padding(.top, -1)
                            }
                        }
                        Spacer()
                    }
                    .offset(x: 0.03*proxy.size.width, y: -0.03*proxy.size.width)
                }
            }
            .aspectRatio(expectedCardRatio, contentMode: .fit)
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel(String(localized: Card.singularName) + (card.name.majorValue ?? ""))
        .accessibilityCustomContent("Card.character", Text(SekaiCache.preCache.character(id: card.characterID)?.fullName.forPreferredLocale() ?? ""), importance: .high)
        .accessibilityCustomContent("Card.rarity", card.rarity.localizedName)
        .accessibilityCustomContent("Card.attribute", card.attribute.rawValue.uppercased())
        .accessibilityCustomContent("Card.unit", card.unit.localizedName)
        .accessibilityCustomContent("Card.type", card.sourceType.localizedName)
        .imageContextMenu({
            var result: [ImageInfo?] = []
            let beforeTraining = isNormalImageUnavailable ? nil : ImageInfo(url: card.beforeTrainingArtURL, description: "Image.card.normal")
            let afterTraining = card.canTrain ? ImageInfo(url: card.afterTrainingArtURL!, description: "Image.card.trained") : nil
            
            if focusIndex < 0 {
                result.append(beforeTraining)
            } else if focusIndex > 0 {
                result.append(afterTraining)
            } else {
                result = [beforeTraining, afterTraining]
            }
            
            return result.compactMap({ $0 })
        }()) {
            if showNavigationHints {
                CardCoverNavigationHints(showCardDetailView: $showCardDetailView, card: card)
                
                if focusIndex < 0 {
                    Text("Image.image.untrained")
//                    Label("Image.image.untrained", systemImage: "star")
                } else if focusIndex > 0 {
                    Text("Image.image.trained")
//                    Label("Image.image.trained", systemImage: "star.fill")
                }
            }
        }
        .navigationDestination(isPresented: $showCardDetailView, destination: {
            CardDetailView(id: card.id)
        })
        .onChange(of: card.id) {
            isNormalImageUnavailable = false
        }
    }
}

// MARK: CardCoverImageBorder
struct CardCoverImageBorder: View {
    var card: Card
    var displayType: CardImageDisplayType
    var showNavigationHints: Bool
    
    @Binding var isNormalImageUnavailable: Bool
    @Binding var focusIndex: Int
    
    @State var normalCardIsOnHover: Bool = false
    @State var trainedCardIsOnHover: Bool = false
    
    @State var showCardDetailView: Bool = false
    
    let cardWidthFactor: [Int: CGFloat] = [-2: 0, -1: 0.25, 0: 0.5, 1: 0.75, 2: 1]
    
    init(_ card: Card, isNormalImageUnavailable: Binding<Bool>, showNavigationHints: Bool = true, displayType: CardImageDisplayType = .both, focusIndex: Binding<Int>) {
        self.card = card
        self._isNormalImageUnavailable = isNormalImageUnavailable
        self.showNavigationHints = showNavigationHints
        self.displayType = displayType
        
        self._focusIndex = focusIndex
    }
    
    @Namespace var hoverGroup
    var body: some View {
        // MARK: Border
        Group {
            Image("CardFrameLarge\(card.rarity.borderNameSuffix)")
                .resizable()
        }
        .aspectRatio(expectedCardRatio, contentMode: .fit)
        .clipped()
        .allowsHitTesting(false)
        .background {
            // MARK: Card Content
            GeometryReader { proxy in
                Group {
                    if let afterTrainingArtURL = card.afterTrainingArtURL, displayType != .normalOnly {
                        if displayType == .both && !isNormalImageUnavailable {
                            HStack(spacing: 0) {
                                WebImage(url: card.beforeTrainingArtURL) { image in
                                    image
                                } placeholder: {
                                    RoundedRectangle(cornerRadius: 0)
                                        .fill(getPlaceholderColor())
                                }
                                .resizable()
                                .onFailure { _ in
                                    DispatchQueue.main.async {
                                        isNormalImageUnavailable = true
//                                        normalCardIsOnHover = false
//                                        trainedCardIsOnHover = false
                                    }
                                }
                                .interpolation(.high)
                                .antialiased(true)
                                .scaledToFill()
                                .frame(width: proxy.size.width * (cardWidthFactor[-focusIndex] ?? 0.5))
                                .clipped()
                                .onTapGesture {
                                    withAnimation(cardFocusSwitchingAnimation) {
                                        if [0, -1].contains(focusIndex) {
                                            focusIndex -= 1
                                        } else if focusIndex == -2 && normalCardIsOnHover {
                                            focusIndex = -1
                                        } else {
                                            focusIndex = 0
                                        }
                                    }
                                }
                                .onHover { isHovering in
                                    withAnimation(cardFocusSwitchingAnimation) {
                                        focusIndex = isHovering ? -1 : 0
                                        normalCardIsOnHover = isHovering
                                    }
                                }
                                .contentShape(Rectangle())
                                
                                WebImage(url: afterTrainingArtURL) { image in
                                    image
                                } placeholder: {
                                    RoundedRectangle(cornerRadius: 0)
                                        .fill(getPlaceholderColor())
                                }
                                .resizable()
                                .interpolation(.high)
                                .antialiased(true)
                                .scaledToFill()
                                .frame(width: proxy.size.width * (cardWidthFactor[focusIndex] ?? 0.5))
                                .clipped()
                                .onTapGesture {
                                    withAnimation(cardFocusSwitchingAnimation) {
                                        if [0, 1].contains(focusIndex) {
                                            focusIndex += 1
                                        } else if focusIndex == 2 && trainedCardIsOnHover {
                                            focusIndex = 1
                                        } else {
                                            focusIndex = 0
                                        }
                                    }
                                }
                                .onHover { isHovering in
                                    withAnimation(cardFocusSwitchingAnimation) {
                                        focusIndex = isHovering ? 1 : 0
                                        trainedCardIsOnHover = isHovering
                                    }
                                }
                                .contentShape(Rectangle())
                            }
                            .gesture(DragGesture(minimumDistance: 30)
                                .onEnded { value in
                                    let dx = value.translation.width
                                    let dy = value.translation.height
                                    
                                    guard abs(dx) > abs(dy) else { return }
                                    
                                    withAnimation(cardFocusSwitchingAnimation) {
                                        if dx > 0 {
                                            focusIndex -= 1
                                        } else {
                                            focusIndex += 1
                                        }
                                    }
                                }
                            )
                            .allowsHitTesting(true)
                        } else {
                            WebImage(url: afterTrainingArtURL) { image in
                                image
                            } placeholder: {
                                RoundedRectangle(cornerRadius: cardCornerRadius)
                                    .fill(getPlaceholderColor())
                            }
                            .resizable()
                            .interpolation(.high)
                            .antialiased(true)
                        }
                    } else {
                        WebImage(url: card.beforeTrainingArtURL) { image in
                            image
                        } placeholder: {
                            RoundedRectangle(cornerRadius: cardCornerRadius)
                                .fill(getPlaceholderColor())
                        }
                        .resizable()
                        .interpolation(.high)
                        .antialiased(true)
                    }
                }
                .scaledToFill()
                .frame(width: proxy.size.width, height: proxy.size.height)
                .clipped()
            }
        }
    }
}

// MARK: CardCoverNavigationHints
struct CardCoverNavigationHints: View {
    @Binding var showCardDetailView: Bool
    var card: Card
    var body: some View {
        VStack {
            Button(action: {
                // cardNavigationDestinationID = card.id
                showCardDetailView = true
            }, label: {
#if os(iOS)
                if let title = card.title.majorValue,
                    let character = SekaiCache.preCache.character(id: card.characterID)?.fullName {
                    Group {
                        Text(title)
                        Group {
                            Text(character.forPreferredLocale() ?? String(localized: "Info.unknown")) + Text("Typography.bold-dot-seperater").bold() + Text(card.sourceType.localizedName)
                        }
                        .font(.caption)
                    }
                } else {
                    Group {
                        Text(verbatim: "Lorem ipsum dolor")
                        Text(verbatim: "Lorem ipsum")
                            .font(.caption)
                    }
                    .redacted(reason: .placeholder)
                }
#else
                if let title = card.title.majorValue {
                    Label(title, systemImage: "info.circle")
                } else {
                    Text(verbatim: "Lorem ipsum dolor")
                        .redacted(reason: .placeholder)
                }
#endif
            })
            .disabled(card.title.majorValue == nil)
//            .disabled(card.title.forPreferredLocale() == nil || characterName?.forPreferredLocale() == nil)
        }
    }
}
