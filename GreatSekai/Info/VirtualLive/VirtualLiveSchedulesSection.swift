import SekaiKit
import SwiftUI

struct VirtualLiveSchedulesSection: View {
    let information: VirtualLive

    var body: some View {
        RegionalDetailSection("VirtualLive.schedules", values: information.record.map { $0?.virtualLiveSchedules ?? [] }) { schedules in
            DetailExpandableRows(elements: schedules.sorted { ($0.startAt ?? .greatestFiniteMagnitude) < ($1.startAt ?? .greatestFiniteMagnitude) }, symbol: "calendar") { schedule in
                CustomGroupBox {
                    HStack(alignment: .top, spacing: 14) {
                        Image(systemName: "calendar").font(.title2).foregroundStyle(.secondary).frame(width: 32)
                        VStack(alignment: .leading, spacing: 6) {
                            if let start = schedule.startAt {
                                Text(Date(timeIntervalSince1970: start / 1000), format: .dateTime).font(.headline)
                            } else { Text("Info.unknown").foregroundStyle(.secondary) }
                            if let end = schedule.endAt {
                                Text(Date(timeIntervalSince1970: end / 1000), format: .dateTime).foregroundStyle(.secondary)
                            }
                            if schedule.isAfterEvent == true {
                                Label("VirtualLive.after-event", systemImage: "star.hexagon").font(.caption).foregroundStyle(.secondary)
                            }
                        }
                        Spacer(minLength: 0)
                    }.frame(maxWidth: .infinity, alignment: .leading)
                }
            }
        }
        if !information.record.map({ $0?.virtualLiveBeginnerSchedules }).isCollectionEmpty {
            RegionalDetailSection("VirtualLive.beginner-schedules", values: information.record.map { $0?.virtualLiveBeginnerSchedules ?? [] }) { schedules in
                DetailExpandableRows(elements: schedules, symbol: "calendar.badge.clock") { schedule in
                    CustomGroupBox {
                        HStack {
                            Text(weekdayName(schedule.dayOfWeek)).font(.headline)
                            Spacer()
                            Text([schedule.startTime, schedule.endTime].compactMap { $0 }.joined(separator: " – ")).monospacedDigit()
                        }
                    }
                }
            }
        }
    }

    private func weekdayName(_ raw: String?) -> String {
        let weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
        guard let raw else { return String(localized: "Info.unknown") }
        guard let index = weekdays.firstIndex(of: raw.lowercased()) else { return raw }
        return Calendar.current.weekdaySymbols[index]
    }
}
