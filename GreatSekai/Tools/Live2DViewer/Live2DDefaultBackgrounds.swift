import Foundation

/// Curated defaults from the supplied background list. Entry order is intentional.
struct Live2DDefaultBackgrounds {
    enum Automatic: String, CaseIterable, Identifiable {
        case original = "auto:original"
        case brandNewWorld = "auto:brand-new-world"
        case bedroom = "auto:bedroom"
        var id: String { rawValue }
        var title: LocalizedStringResource {
            switch self {
            case .original: .init("Live2D.background.automatic.original", defaultValue: "SEKAI - Original")
            case .brandNewWorld: .init("Live2D.background.automatic.brand-new-world", defaultValue: "SEKAI - Brand New World")
            case .bedroom: .init("Live2D.background.automatic.bedroom", defaultValue: "Bedroom")
            }
        }
    }

    /// Resolve only curated, identified places; missing rooms or units use the distant tree.
    static func automaticAssetName(_ mode: Automatic, category: Category?, characterID: Int?, dark: Bool) -> String {
        let place: Place?
        switch mode {
        case .original:
            switch category {
            case .ln: place = .schoolSekaiClassroom
            case .mmj: place = .stageSekaiStage
            case .vbs: place = .streetSekaiCafeOutside
            case .ws: place = .wonderlandSekaiThemePark
            case .n25: place = .emptySekaiExpanse
            default: place = nil
            }
        case .brandNewWorld:
            switch category {
            case .ln: place = .schoolSekaiStation
            case .mmj: place = .stageSekaiFlowerGarden
            case .vbs: place = .streetSekaiPlaza
            case .ws: place = .wonderlandSekaiHarbor
            case .n25: place = .emptySekaiLake
            default: place = nil
            }
        case .bedroom:
            switch characterID {
            case 1: place = .ichikaRoom
            case 2: place = .sakiRoom
            case 3: place = .honamiRoom
            case 4: place = .shihoRoom
            case 5: place = .minoriRoom
            case 6: place = .harukaRoom
            case 7: place = .airiRoom
            case 8: place = .shizukuRoom
            case 9: place = .kohaneRoom
            case 10: place = .anRoom
            case 11: place = .akitoRoom
            case 12: place = .toyaRoom
            case 13: place = .tsukasaRoom
            case 14: place = .emuRoom
            case 15: place = .neneRoom
            case 16: place = .ruiRoom
            case 17: place = .kanadeRoom
            case 18: place = .mafuyuRoom
            case 19: place = .enaRoom
            case 20: place = .mizukiRoom
            default: place = nil
            }
        }
        guard let place, let family = groups.flatMap(\.families).first(where: { $0.place == place }) else {
            return "bg_f000904"
        }
        let preferred: Variant = dark ? .night : .day
        return (family.entries.first { $0.variant == preferred } ?? family.entries.first)?.assetName ?? "bg_f000904"
    }

    enum Category: String, CaseIterable, Sendable {
        case ln = "ln"
        case mmj = "mmj"
        case vbs = "vbs"
        case ws = "ws"
        case n25 = "n25"
        case betweenSekai = "between-sekai"
        case kamiyama = "kamiyama"
        case miyamasuzaka = "miyamasuzaka"
        case realWorld = "real-world"
        case nature = "nature"
        case colors = "colors"

        var title: LocalizedStringResource {
            switch self {
            case .ln: .init("Live2D.background.group.ln", defaultValue: "Leo/need")
            case .mmj: .init("Live2D.background.group.mmj", defaultValue: "MORE MORE JUMP!")
            case .vbs: .init("Live2D.background.group.vbs", defaultValue: "Vivid BAD SQUAD")
            case .ws: .init("Live2D.background.group.ws", defaultValue: "Wonderlands×Showtime")
            case .n25: .init("Live2D.background.group.n25", defaultValue: "Nightcord at 25:00")
            case .betweenSekai: .init("Live2D.background.group.between-sekai", defaultValue: "Between SEKAI")
            case .kamiyama: .init("Live2D.background.group.kamiyama", defaultValue: "Kamiyama High School")
            case .miyamasuzaka: .init("Live2D.background.group.miyamasuzaka", defaultValue: "Miyamasuzaka Girls’ Academy")
            case .realWorld: .init("Live2D.background.group.real-world", defaultValue: "Real World")
            case .nature: .init("Live2D.background.group.nature", defaultValue: "Nature")
            case .colors: .init("Live2D.background.group.colors", defaultValue: "Solid Colors")
            }
        }
    }

    enum Place: String, CaseIterable, Sendable {
        case ichikaRoom = "ichika-room"
        case sakiRoom = "saki-room"
        case honamiRoom = "honami-room"
        case shihoRoom = "shiho-room"
        case minoriRoom = "minori-room"
        case harukaRoom = "haruka-room"
        case airiRoom = "airi-room"
        case shizukuRoom = "shizuku-room"
        case kohaneRoom = "kohane-room"
        case anRoom = "an-room"
        case akitoRoom = "akito-room"
        case toyaRoom = "toya-room"
        case tsukasaRoom = "tsukasa-room"
        case emuRoom = "emu-room"
        case neneRoom = "nene-room"
        case ruiRoom = "rui-room"
        case playground = "playground"
        case solisRecords = "solis-records"
        case schoolSekaiStation = "school-sekai-station"
        case bandPracticeRoom = "band-practice-room"
        case stageSekaiStage = "stage-sekai-stage"
        case stageSekaiFlowerGarden = "stage-sekai-flower-garden"
        case cheerfulDaysStage = "cheerful-days-stage"
        case streetSekaiPlaza = "street-sekai-plaza"
        case vividStreet = "vivid-street"
        case phoenixWonderlandStage = "phoenix-wonderland-stage"
        case phoenixWonderlandMain = "phoenix-wonderland-main"
        case wonderlandSekaiThemePark = "wonderland-sekai-theme-park"
        case wonderlandSekaiHarbor = "wonderland-sekai-harbor"
        case emptySekaiExpanse = "empty-sekai-expanse"
        case emptySekaiLake = "empty-sekai-lake"
        case kanadeRoom = "kanade-room"
        case mafuyuRoom = "mafuyu-room"
        case enaRoom = "ena-room"
        case mizukiRoom = "mizuki-room"
        case kanadeLivingRoom = "kanade-living-room"
        case enaArtClassroom = "ena-art-classroom"
        case startingArea = "starting-area"
        case tree = "tree"
        case garden = "garden"
        case kamiyamaEntrance = "kamiyama-entrance"
        case kamiyamaPlayground = "kamiyama-playground"
        case kamiyamaClassroom = "kamiyama-classroom"
        case kamiyamaHallway = "kamiyama-hallway"
        case kamiyamaRooftop = "kamiyama-rooftop"
        case miyamasuzakaClassroom = "miyamasuzaka-classroom"
        case miyamasuzakaHallway = "miyamasuzaka-hallway"
        case miyamasuzakaRooftop = "miyamasuzaka-rooftop"
        case miyamasuzakaPlayground = "miyamasuzaka-playground"
        case miyamasuzakaCourtyard = "miyamasuzaka-courtyard"
        case miyamasuzakaStreet = "miyamasuzaka-street"
        case familyRestaurant = "family-restaurant"
        case cdShop = "cd-shop"
        case kamiyamaStreet = "kamiyama-street"
        case liveHouse1 = "live-house-1"
        case liveHouse2 = "live-house-2"
        case residentialArea = "residential-area"
        case cafe1 = "cafe-1"
        case cafe2 = "cafe-2"
        case park = "park"
        case shoppingCenter = "shopping-center"
        case shibuyaCrossing = "shibuya-crossing"
        case centerStreet = "center-street"
        case nonogiPark = "nonogi-park"
        case hotel = "hotel"
        case campsite = "campsite"
        case beach = "beach"
        case parkEntrance = "park-entrance"
        case sakuraTree = "sakura-tree"
        case white = "white"
        case black = "black"
        case schoolSekaiClassroom = "school-sekai-classroom"
        case schoolSekaiHallway = "school-sekai-hallway"
        case schoolSekaiRooftop = "school-sekai-rooftop"
        case moreMoreHouseLivingRoom = "more-more-house-living-room"
        case moreMoreHouseDanceStudio = "more-more-house-dance-studio"
        case streetSekaiCafeOutside = "street-sekai-cafe-outside"
        case streetSekaiCafeInside = "street-sekai-cafe-inside"
        case weekendGarageEntrance = "weekend-garage-entrance"
        case weekendGarageLiveArea = "weekend-garage-live-area"
        case wonderlandSekaiStage = "wonderland-sekai-stage"

        var title: LocalizedStringResource {
            switch self {
            case .ichikaRoom: .init("Live2D.background.place.ichika-room", defaultValue: "Ichika’s Room")
            case .sakiRoom: .init("Live2D.background.place.saki-room", defaultValue: "Saki’s Room")
            case .honamiRoom: .init("Live2D.background.place.honami-room", defaultValue: "Honami’s Room")
            case .shihoRoom: .init("Live2D.background.place.shiho-room", defaultValue: "Shiho’s Room")
            case .minoriRoom: .init("Live2D.background.place.minori-room", defaultValue: "Minori’s Room")
            case .harukaRoom: .init("Live2D.background.place.haruka-room", defaultValue: "Haruka’s Room")
            case .airiRoom: .init("Live2D.background.place.airi-room", defaultValue: "Airi’s Room")
            case .shizukuRoom: .init("Live2D.background.place.shizuku-room", defaultValue: "Shizuku’s Room")
            case .kohaneRoom: .init("Live2D.background.place.kohane-room", defaultValue: "Kohane’s Room")
            case .anRoom: .init("Live2D.background.place.an-room", defaultValue: "An’s Room")
            case .akitoRoom: .init("Live2D.background.place.akito-room", defaultValue: "Akito’s Room")
            case .toyaRoom: .init("Live2D.background.place.toya-room", defaultValue: "Toya’s Room")
            case .tsukasaRoom: .init("Live2D.background.place.tsukasa-room", defaultValue: "Tsukasa’s Room")
            case .emuRoom: .init("Live2D.background.place.emu-room", defaultValue: "Emu’s Room")
            case .neneRoom: .init("Live2D.background.place.nene-room", defaultValue: "Nene’s Room")
            case .ruiRoom: .init("Live2D.background.place.rui-room", defaultValue: "Rui’s Room")
            case .playground: .init("Live2D.background.place.playground", defaultValue: "Playground")
            case .solisRecords: .init("Live2D.background.place.solis-records", defaultValue: "SOLIS RECORDS Office")
            case .schoolSekaiStation: .init("Live2D.background.place.school-sekai-station", defaultValue: "Station, School SEKAI")
            case .bandPracticeRoom: .init("Live2D.background.place.band-practice-room", defaultValue: "Band Practice Room")
            case .stageSekaiStage: .init("Live2D.background.place.stage-sekai-stage", defaultValue: "Stage, Stage SEKAI")
            case .stageSekaiFlowerGarden: .init("Live2D.background.place.stage-sekai-flower-garden", defaultValue: "Flower Garden, Stage SEKAI")
            case .cheerfulDaysStage: .init("Live2D.background.place.cheerful-days-stage", defaultValue: "Cheerful Days Stage")
            case .streetSekaiPlaza: .init("Live2D.background.place.street-sekai-plaza", defaultValue: "Plaza, Street SEKAI")
            case .vividStreet: .init("Live2D.background.place.vivid-street", defaultValue: "Vivid Street")
            case .phoenixWonderlandStage: .init("Live2D.background.place.phoenix-wonderland-stage", defaultValue: "Stage, Phoenix Wonderland")
            case .phoenixWonderlandMain: .init("Live2D.background.place.phoenix-wonderland-main", defaultValue: "Main Area, Phoenix Wonderland")
            case .wonderlandSekaiThemePark: .init("Live2D.background.place.wonderland-sekai-theme-park", defaultValue: "Theme Park, Wonderland SEKAI")
            case .wonderlandSekaiHarbor: .init("Live2D.background.place.wonderland-sekai-harbor", defaultValue: "Harbor, Wonderland SEKAI")
            case .emptySekaiExpanse: .init("Live2D.background.place.empty-sekai-expanse", defaultValue: "Expanse, Empty SEKAI")
            case .emptySekaiLake: .init("Live2D.background.place.empty-sekai-lake", defaultValue: "Lake, Empty SEKAI")
            case .kanadeRoom: .init("Live2D.background.place.kanade-room", defaultValue: "Kanade’s Room")
            case .mafuyuRoom: .init("Live2D.background.place.mafuyu-room", defaultValue: "Mafuyu’s Room")
            case .enaRoom: .init("Live2D.background.place.ena-room", defaultValue: "Ena’s Room")
            case .mizukiRoom: .init("Live2D.background.place.mizuki-room", defaultValue: "Mizuki’s Room")
            case .kanadeLivingRoom: .init("Live2D.background.place.kanade-living-room", defaultValue: "Kanade’s Living Room")
            case .enaArtClassroom: .init("Live2D.background.place.ena-art-classroom", defaultValue: "Ena’s Art Classroom")
            case .startingArea: .init("Live2D.background.place.starting-area", defaultValue: "Starting Area")
            case .tree: .init("Live2D.background.place.tree", defaultValue: "Tree")
            case .garden: .init("Live2D.background.place.garden", defaultValue: "Garden")
            case .kamiyamaEntrance: .init("Live2D.background.place.kamiyama-entrance", defaultValue: "Kamiyama High School Entrance")
            case .kamiyamaPlayground: .init("Live2D.background.place.kamiyama-playground", defaultValue: "Kamiyama High School Playground")
            case .kamiyamaClassroom: .init("Live2D.background.place.kamiyama-classroom", defaultValue: "Kamiyama High School Classroom")
            case .kamiyamaHallway: .init("Live2D.background.place.kamiyama-hallway", defaultValue: "Kamiyama High School Hallway")
            case .kamiyamaRooftop: .init("Live2D.background.place.kamiyama-rooftop", defaultValue: "Kamiyama High School Rooftop")
            case .miyamasuzakaClassroom: .init("Live2D.background.place.miyamasuzaka-classroom", defaultValue: "Miyamasuzaka Girls’ Academy Classroom")
            case .miyamasuzakaHallway: .init("Live2D.background.place.miyamasuzaka-hallway", defaultValue: "Miyamasuzaka Girls’ Academy Hallway")
            case .miyamasuzakaRooftop: .init("Live2D.background.place.miyamasuzaka-rooftop", defaultValue: "Miyamasuzaka Girls’ Academy Rooftop")
            case .miyamasuzakaPlayground: .init("Live2D.background.place.miyamasuzaka-playground", defaultValue: "Miyamasuzaka Girls’ Academy Playground")
            case .miyamasuzakaCourtyard: .init("Live2D.background.place.miyamasuzaka-courtyard", defaultValue: "Miyamasuzaka Girls’ Academy Courtyard")
            case .miyamasuzakaStreet: .init("Live2D.background.place.miyamasuzaka-street", defaultValue: "Miyamasuzaka Street")
            case .familyRestaurant: .init("Live2D.background.place.family-restaurant", defaultValue: "Family Restaurant")
            case .cdShop: .init("Live2D.background.place.cd-shop", defaultValue: "CD Shop")
            case .kamiyamaStreet: .init("Live2D.background.place.kamiyama-street", defaultValue: "Kamiyama Street")
            case .liveHouse1: .init("Live2D.background.place.live-house-1", defaultValue: "Live House 1")
            case .liveHouse2: .init("Live2D.background.place.live-house-2", defaultValue: "Live House 2")
            case .residentialArea: .init("Live2D.background.place.residential-area", defaultValue: "Residential Area")
            case .cafe1: .init("Live2D.background.place.cafe-1", defaultValue: "Cafe 1")
            case .cafe2: .init("Live2D.background.place.cafe-2", defaultValue: "Cafe 2")
            case .park: .init("Live2D.background.place.park", defaultValue: "Park")
            case .shoppingCenter: .init("Live2D.background.place.shopping-center", defaultValue: "Shopping Center")
            case .shibuyaCrossing: .init("Live2D.background.place.shibuya-crossing", defaultValue: "Shibuya Crossing")
            case .centerStreet: .init("Live2D.background.place.center-street", defaultValue: "Center Street")
            case .nonogiPark: .init("Live2D.background.place.nonogi-park", defaultValue: "Nonogi Park")
            case .hotel: .init("Live2D.background.place.hotel", defaultValue: "Hotel")
            case .campsite: .init("Live2D.background.place.campsite", defaultValue: "Campsite")
            case .beach: .init("Live2D.background.place.beach", defaultValue: "Beach")
            case .parkEntrance: .init("Live2D.background.place.park-entrance", defaultValue: "Park Entrance")
            case .sakuraTree: .init("Live2D.background.place.sakura-tree", defaultValue: "Cherry Blossom Tree")
            case .white: .init("Live2D.background.place.white", defaultValue: "White")
            case .black: .init("Live2D.background.place.black", defaultValue: "Black")
            case .schoolSekaiClassroom: .init("Live2D.background.place.school-sekai-classroom", defaultValue: "Classroom, School SEKAI")
            case .schoolSekaiHallway: .init("Live2D.background.place.school-sekai-hallway", defaultValue: "Hallway, School SEKAI")
            case .schoolSekaiRooftop: .init("Live2D.background.place.school-sekai-rooftop", defaultValue: "Rooftop, School SEKAI")
            case .moreMoreHouseLivingRoom: .init("Live2D.background.place.more-more-house-living-room", defaultValue: "Living Room, MORE MORE HOUSE")
            case .moreMoreHouseDanceStudio: .init("Live2D.background.place.more-more-house-dance-studio", defaultValue: "Dance Studio, MORE MORE HOUSE")
            case .streetSekaiCafeOutside: .init("Live2D.background.place.street-sekai-cafe-outside", defaultValue: "Cafe Exterior, Street SEKAI")
            case .streetSekaiCafeInside: .init("Live2D.background.place.street-sekai-cafe-inside", defaultValue: "Cafe Interior, Street SEKAI")
            case .weekendGarageEntrance: .init("Live2D.background.place.weekend-garage-entrance", defaultValue: "Entrance, Weekend Garage")
            case .weekendGarageLiveArea: .init("Live2D.background.place.weekend-garage-live-area", defaultValue: "Live Performance Area, Weekend Garage")
            case .wonderlandSekaiStage: .init("Live2D.background.place.wonderland-sekai-stage", defaultValue: "Stage, Wonderland SEKAI")
            }
        }
    }

    enum Variant: String, CaseIterable, Sendable {
        case `default` = "default"
        case illuminated = "illuminated"
        case day = "day"
        case dusk = "dusk"
        case night = "night"
        case close = "close"
        case far = "far"
        case dusk1 = "dusk-1"
        case dusk2 = "dusk-2"
        case clear = "clear"
        case cloudy = "cloudy"
        case snow = "snow"
        case nightRain = "night-rain"
        case midnightRain = "midnight-rain"
        case dayRain = "day-rain"
        case rain = "rain"
        case noon = "noon"

        var title: LocalizedStringResource {
            switch self {
            case .default: .init("Live2D.background.variant.default", defaultValue: "Default")
            case .illuminated: .init("Live2D.background.variant.illuminated", defaultValue: "Illuminated")
            case .day: .init("Live2D.background.variant.day", defaultValue: "Day")
            case .dusk: .init("Live2D.background.variant.dusk", defaultValue: "Dusk")
            case .night: .init("Live2D.background.variant.night", defaultValue: "Night")
            case .close: .init("Live2D.background.variant.close", defaultValue: "Close-up")
            case .far: .init("Live2D.background.variant.far", defaultValue: "Distant View")
            case .dusk1: .init("Live2D.background.variant.dusk-1", defaultValue: "Dusk 1")
            case .dusk2: .init("Live2D.background.variant.dusk-2", defaultValue: "Dusk 2")
            case .clear: .init("Live2D.background.variant.clear", defaultValue: "Clear")
            case .cloudy: .init("Live2D.background.variant.cloudy", defaultValue: "Cloudy")
            case .snow: .init("Live2D.background.variant.snow", defaultValue: "Snow")
            case .nightRain: .init("Live2D.background.variant.night-rain", defaultValue: "Night, Rain")
            case .midnightRain: .init("Live2D.background.variant.midnight-rain", defaultValue: "Midnight, Rain")
            case .dayRain: .init("Live2D.background.variant.day-rain", defaultValue: "Day, Rain")
            case .rain: .init("Live2D.background.variant.rain", defaultValue: "Rain")
            case .noon: .init("Live2D.background.variant.noon", defaultValue: "Noon")
            }
        }
    }

    struct Entry: Identifiable, Sendable {
        let assetName: String
        let place: Place
        let variant: Variant?
        var id: String { assetName }

        init(_ assetName: String, _ place: Place, _ variant: Variant? = nil) {
            self.assetName = assetName; self.place = place; self.variant = variant
        }

        func localizedName(locale: Locale = .current) -> String {
            let name = Self.localized(place.title, locale: locale)
            guard let variant else { return name }
            let variantName = Self.localized(variant.title, locale: locale)
            return String(localized: "Live2D.background.name.%@.variant.%@",
                          defaultValue: "\(name) (\(variantName))", locale: locale)
        }

        static func localized(_ title: LocalizedStringResource, locale: Locale) -> String {
            var title = title
            title.locale = locale
            return String(localized: title)
        }
    }

    struct Family: Identifiable, Sendable {
        let place: Place
        var entries: [Entry]
        var id: Place { place }
        var hasVariants: Bool { entries.count > 1 && entries.allSatisfy { $0.variant != nil } }
    }

    struct Group: Identifiable, Sendable {
        let category: Category
        let entries: [Entry]
        var id: Category { category }

        // Blank lines have no meaning; gather matching places across the whole header.
        var families: [Family] {
            var result: [Family] = []
            for entry in entries {
                if let index = result.firstIndex(where: { $0.place == entry.place }) {
                    result[index].entries.append(entry)
                } else {
                    result.append(.init(place: entry.place, entries: [entry]))
                }
            }
            return result
        }
    }

    static let groups: [Group] = [
        .init(category: .ln, entries: [
            .init("bg_f000101", .schoolSekaiClassroom, .day),
            .init("bg_f000102", .schoolSekaiClassroom, .night),
            .init("bg_f000103", .schoolSekaiClassroom, .noon),
            .init("bg_f000201", .schoolSekaiHallway),
            .init("bg_f000701", .schoolSekaiRooftop),
            .init("bg_f001503", .schoolSekaiStation),
            .init("bg_f000903", .playground),
            .init("bg_f001201", .solisRecords),
            .init("bg_a001901", .bandPracticeRoom),
            .init("bg_f000301", .ichikaRoom, .day),
            .init("bg_f000303", .ichikaRoom, .night),
            .init("bg_f000401", .sakiRoom, .day),
            .init("bg_f000404", .sakiRoom, .night),
            .init("bg_f000501", .honamiRoom, .day),
            .init("bg_f000503", .honamiRoom, .night),
            .init("bg_f000601", .shihoRoom, .day),
            .init("bg_f000603", .shihoRoom, .night),
        ]),
        .init(category: .mmj, entries: [
            .init("bg_b001001", .stageSekaiStage, .default),
            .init("bg_b001002", .stageSekaiStage, .illuminated),
            .init("bg_b003101", .stageSekaiFlowerGarden),
            .init("bg_b003002", .moreMoreHouseLivingRoom),
            .init("bg_b003301", .moreMoreHouseDanceStudio),
            .init("bg_b001301", .cheerfulDaysStage),
            .init("bg_b000601", .minoriRoom, .day),
            .init("bg_b000602", .minoriRoom, .night),
            .init("bg_b000701", .harukaRoom, .day),
            .init("bg_b000703", .harukaRoom, .night),
            .init("bg_b000801", .airiRoom, .day),
            .init("bg_b000803", .airiRoom, .night),
            .init("bg_b000901", .shizukuRoom, .day),
            .init("bg_b000903", .shizukuRoom, .night),
        ]),
        .init(category: .vbs, entries: [
            .init("bg_c000401", .streetSekaiCafeOutside),
            .init("bg_c000501", .streetSekaiCafeInside),
            .init("bg_c002501", .streetSekaiPlaza),
            .init("bg_c000101", .weekendGarageEntrance),
            .init("bg_c000201", .weekendGarageLiveArea),
            .init("bg_c001101", .vividStreet, .day),
            .init("bg_c001102", .vividStreet, .dusk),
            .init("bg_c001103", .vividStreet, .night),
            .init("bg_c000701", .kohaneRoom, .day),
            .init("bg_c000703", .kohaneRoom, .night),
            .init("bg_c002601", .anRoom, .day),
            .init("bg_c002603", .anRoom, .night),
            .init("bg_c002701", .akitoRoom, .day),
            .init("bg_c002703", .akitoRoom, .night),
            .init("bg_c002702", .akitoRoom, .dusk),
            .init("bg_c001001", .toyaRoom, .day),
            .init("bg_c001002", .toyaRoom, .night),
        ]),
        .init(category: .ws, entries: [
            .init("bg_d000204", .phoenixWonderlandStage, .day),
            .init("bg_d000205", .phoenixWonderlandStage, .dusk),
            .init("bg_d000206", .phoenixWonderlandStage, .night),
            .init("bg_d000301", .phoenixWonderlandMain, .day),
            .init("bg_d000302", .phoenixWonderlandMain, .dusk),
            .init("bg_d000303", .phoenixWonderlandMain, .night),
            .init("bg_d000401", .wonderlandSekaiThemePark, .day),
            .init("bg_d000402", .wonderlandSekaiThemePark, .night),
            .init("bg_d000501", .wonderlandSekaiStage),
            .init("bg_d002501", .wonderlandSekaiHarbor),
            .init("bg_d000601", .tsukasaRoom, .day),
            .init("bg_d000603", .tsukasaRoom, .night),
            .init("bg_d000701", .emuRoom, .day),
            .init("bg_d000703", .emuRoom, .night),
            .init("bg_d000801", .neneRoom, .day),
            .init("bg_d000803", .neneRoom, .night),
            .init("bg_d000901", .ruiRoom, .day),
            .init("bg_d000903", .ruiRoom, .night),
        ]),
        .init(category: .n25, entries: [
            .init("bg_e000501", .emptySekaiExpanse),
            .init("bg_e002201", .emptySekaiLake),
            .init("bg_e000102", .kanadeRoom, .night),
            .init("bg_e000103", .kanadeRoom, .day),
            .init("bg_e000203", .mafuyuRoom, .night),
            .init("bg_e000201", .mafuyuRoom, .day),
            .init("bg_e000303", .enaRoom, .night),
            .init("bg_e000301", .enaRoom, .day),
            .init("bg_e000403", .mizukiRoom, .night),
            .init("bg_e000401", .mizukiRoom, .day),
            .init("bg_e000901", .kanadeLivingRoom, .day),
            .init("bg_e000902", .kanadeLivingRoom, .dusk),
            .init("bg_e001801", .enaArtClassroom),
        ]),
        .init(category: .betweenSekai, entries: [
            .init("bg_g000101", .startingArea),
            .init("bg_a006604", .tree, .close),
            .init("bg_f000904", .tree, .far),
            .init("bg_g000601", .garden),
        ]),
        .init(category: .kamiyama, entries: [
            .init("bg_a000101", .kamiyamaEntrance, .day),
            .init("bg_a000102", .kamiyamaEntrance, .dusk),
            .init("bg_a000201", .kamiyamaPlayground, .day),
            .init("bg_a000202", .kamiyamaPlayground, .dusk),
            .init("bg_a000301", .kamiyamaClassroom, .day),
            .init("bg_a000302", .kamiyamaClassroom, .dusk),
            .init("bg_a000501", .kamiyamaHallway, .day),
            .init("bg_a000502", .kamiyamaHallway, .dusk),
            .init("bg_a000701", .kamiyamaRooftop, .day),
            .init("bg_a000702", .kamiyamaRooftop, .dusk),
        ]),
        .init(category: .miyamasuzaka, entries: [
            .init("bg_a000401", .miyamasuzakaClassroom, .day),
            .init("bg_a000402", .miyamasuzakaClassroom, .dusk),
            .init("bg_a000601", .miyamasuzakaHallway, .day),
            .init("bg_a000602", .miyamasuzakaHallway, .dusk),
            .init("bg_a000801", .miyamasuzakaRooftop, .day),
            .init("bg_a000802", .miyamasuzakaRooftop, .dusk1),
            .init("bg_a000803", .miyamasuzakaRooftop, .dusk2),
            .init("bg_a000901", .miyamasuzakaPlayground, .day),
            .init("bg_a000902", .miyamasuzakaPlayground, .dusk),
            .init("bg_a002201", .miyamasuzakaCourtyard, .clear),
            .init("bg_a002202", .miyamasuzakaCourtyard, .dusk),
            .init("bg_a002203", .miyamasuzakaCourtyard, .cloudy),
            .init("bg_a002204", .miyamasuzakaCourtyard, .snow),
        ]),
        .init(category: .realWorld, entries: [
            .init("bg_a001001", .miyamasuzakaStreet, .day),
            .init("bg_a001002", .miyamasuzakaStreet, .dusk),
            .init("bg_a001003", .miyamasuzakaStreet, .night),
            .init("bg_a001101", .familyRestaurant),
            .init("bg_a001201", .cdShop),
            .init("bg_c000301", .kamiyamaStreet, .day),
            .init("bg_c000302", .kamiyamaStreet, .dusk),
            .init("bg_c000303", .kamiyamaStreet, .night),
            .init("bg_c000601", .liveHouse1),
            .init("bg_c001802", .liveHouse2),
            .init("bg_a001301", .residentialArea, .day),
            .init("bg_a001302", .residentialArea, .dusk),
            .init("bg_a001303", .residentialArea, .night),
            .init("bg_a001304", .residentialArea, .nightRain),
            .init("bg_a001305", .residentialArea, .midnightRain),
            .init("bg_a001401", .cafe1, .day),
            .init("bg_a001402", .cafe1, .night),
            .init("bg_a005701", .cafe2, .day),
            .init("bg_a005702", .cafe2, .dusk),
            .init("bg_a001501", .park, .day),
            .init("bg_a001502", .park, .dusk),
            .init("bg_a001701", .shoppingCenter),
            .init("bg_a002301", .shibuyaCrossing, .day),
            .init("bg_a002302", .shibuyaCrossing, .dusk),
            .init("bg_a002303", .shibuyaCrossing, .night),
            .init("bg_a002304", .shibuyaCrossing, .dayRain),
            .init("bg_a002305", .shibuyaCrossing, .nightRain),
            .init("bg_a002401", .centerStreet, .day),
            .init("bg_a002402", .centerStreet, .dusk),
            .init("bg_a003401", .nonogiPark, .day),
            .init("bg_a003402", .nonogiPark, .rain),
            .init("bg_a003403", .nonogiPark, .dusk),
            .init("bg_e002101", .hotel),
        ]),
        .init(category: .nature, entries: [
            .init("bg_c001501", .campsite, .day),
            .init("bg_c001504", .campsite, .dusk),
            .init("bg_c001503", .campsite, .night),
            .init("bg_a003801", .beach, .day),
            .init("bg_a003802", .beach, .dusk),
            .init("bg_a003803", .beach, .night),
            .init("bg_b002901", .garden),
            .init("bg_a002701", .parkEntrance),
            .init("bg_e001701", .sakuraTree),
        ]),
        .init(category: .colors, entries: [
            .init("bg00026", .white),
            .init("bg_a000000", .black),
        ]),
    ]
}
