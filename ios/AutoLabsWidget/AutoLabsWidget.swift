import WidgetKit
import SwiftUI

struct FavoritesEntry: TimelineEntry {
    let date: Date
    let favorites: [WidgetAppliance]
}

struct FavoritesProvider: TimelineProvider {
    func placeholder(in context: Context) -> FavoritesEntry {
        FavoritesEntry(date: Date(), favorites: [])
    }

    func getSnapshot(in context: Context, completion: @escaping (FavoritesEntry) -> Void) {
        let favorites = WidgetDataManager.shared.loadFavorites()
        completion(FavoritesEntry(date: Date(), favorites: favorites))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<FavoritesEntry>) -> Void) {
        let favorites = WidgetDataManager.shared.loadFavorites()
        let entry = FavoritesEntry(date: Date(), favorites: favorites)
        completion(Timeline(entries: [entry], policy: .after(Date().addingTimeInterval(60 * 5))))
    }
}

struct AutoLabsWidgetEntryView: View {
    var entry: FavoritesProvider.Entry

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Favorite Appliances")
                .font(.headline)
                .foregroundColor(.white)
            if entry.favorites.isEmpty {
                Text("No favorites yet")
                    .font(.caption)
                    .foregroundColor(.white.opacity(0.8))
            } else {
                ForEach(entry.favorites) { item in
                    Link(destination: URL(string: "autolabs://toggle?applianceId=\(item.id)&currentValue=\(item.value)")!) {
                        HStack {
                            Text(item.name)
                                .font(.caption)
                                .foregroundColor(.white)
                            Spacer()
                            Text(item.value == "LOW" ? "OFF" : "ON")
                                .font(.caption)
                                .foregroundColor(.white.opacity(0.9))
                        }
                    }
                }
            }
        }
        .padding()
        .background(Color.black.opacity(0.85))
    }
}

@main
struct AutoLabsWidget: Widget {
    let kind: String = "AutoLabsWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FavoritesProvider()) { entry in
            AutoLabsWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Favorite Appliances")
        .description("Quick power toggle for favorite appliances.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
