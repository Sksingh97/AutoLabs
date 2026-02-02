package com.autolabs.widget

import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import android.widget.RemoteViewsService
import com.autolabs.R
import org.json.JSONArray
import org.json.JSONObject
import android.app.PendingIntent
import android.graphics.Color

class WidgetRemoteViewsService : RemoteViewsService() {
    override fun onGetViewFactory(intent: Intent): RemoteViewsFactory {
        return WidgetRemoteViewsFactory(this.applicationContext)
    }
}

class WidgetRemoteViewsFactory(private val context: Context) : RemoteViewsService.RemoteViewsFactory {
    private var favorites: MutableList<WidgetAppliance> = mutableListOf()

    override fun onCreate() {
        loadData()
    }

    override fun onDataSetChanged() {
        loadData()
    }

    private fun loadData() {
        val prefs = context.getSharedPreferences("autolabs_widget_prefs", Context.MODE_PRIVATE)
        val data = prefs.getString("widget_data", null)
        favorites = parseFavorites(data).toMutableList()
    }

    override fun onDestroy() {
        favorites.clear()
    }

    override fun getCount(): Int = favorites.size

    override fun getViewAt(position: Int): RemoteViews {
        val views = RemoteViews(context.packageName, R.layout.widget_appliance_item)
        
        if (position < favorites.size) {
            val item = favorites[position]
            
            // Set appliance name
            views.setTextViewText(R.id.appliance_name, item.name)
            
            // Set status indicator drawable based on state (LOW = ON/green, HIGH = OFF/gray)
            val statusDrawable = if (item.value == "LOW") R.drawable.status_on else R.drawable.status_off
            views.setImageViewResource(R.id.status_indicator, statusDrawable)
            
            // Set appliance icon (same as React Native)
            views.setImageViewResource(R.id.appliance_icon, R.drawable.ic_appliance)
            
            // Show favorite star for all items (since they're all favorites)
            views.setViewVisibility(R.id.favorite_star, android.view.View.VISIBLE)
            
            // Set click intent for toggling - use root layout for better click area
            val toggleIntent = Intent().apply {
                putExtra(AutoLabsWidgetProvider.EXTRA_APPLIANCE_ID, item.id)
                putExtra(AutoLabsWidgetProvider.EXTRA_CURRENT_VALUE, item.value)
            }
            views.setOnClickFillInIntent(R.id.appliance_item_root, toggleIntent)
        }
        
        return views
    }

    override fun getLoadingView(): RemoteViews? = null

    override fun getViewTypeCount(): Int = 1

    override fun getItemId(position: Int): Long = position.toLong()

    override fun hasStableIds(): Boolean = true

    private fun parseFavorites(data: String?): List<WidgetAppliance> {
        if (data.isNullOrEmpty()) return emptyList()
        return try {
            val json = JSONObject(data)
            val favorites = json.optJSONArray("favorites") ?: JSONArray()
            val result = mutableListOf<WidgetAppliance>()
            for (i in 0 until favorites.length()) {
                val item = favorites.getJSONObject(i)
                result.add(
                    WidgetAppliance(
                        id = item.optInt("id"),
                        name = item.optString("name"),
                        value = item.optString("value")
                    )
                )
            }
            result
        } catch (error: Exception) {
            emptyList()
        }
    }

    data class WidgetAppliance(
        val id: Int,
        val name: String,
        val value: String
    )
}
