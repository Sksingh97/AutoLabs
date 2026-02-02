import Foundation

struct WidgetAppliance: Identifiable, Codable {
    let id: Int
    let name: String
    let value: String
    let roomName: String?
    let floorName: String?
}

struct WidgetPayload: Codable {
    let favorites: [WidgetAppliance]
    let updatedAt: Double?
}

final class WidgetDataManager {
    static let shared = WidgetDataManager()
    private let groupId = "group.com.autolabs.widget"
    private let dataKey = "widget_data"

    func loadFavorites() -> [WidgetAppliance] {
        guard let defaults = UserDefaults(suiteName: groupId),
              let raw = defaults.string(forKey: dataKey),
              let data = raw.data(using: .utf8) else {
            return []
        }
        do {
            let payload = try JSONDecoder().decode(WidgetPayload.self, from: data)
            return Array(payload.favorites.prefix(4))
        } catch {
            return []
        }
    }
}
