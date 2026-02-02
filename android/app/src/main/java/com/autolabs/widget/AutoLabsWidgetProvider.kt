package com.autolabs.widget

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.view.View
import android.widget.RemoteViews
import com.autolabs.R
import org.json.JSONArray
import org.json.JSONObject
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.net.HttpURLConnection
import java.net.URL

class AutoLabsWidgetProvider : AppWidgetProvider() {

    companion object {
        const val ACTION_TOGGLE_APPLIANCE = "com.autolabs.ACTION_TOGGLE_APPLIANCE"
        const val EXTRA_APPLIANCE_ID = "appliance_id"
        const val EXTRA_CURRENT_VALUE = "current_value"

        fun updateAllWidgets(context: Context) {
            val manager = AppWidgetManager.getInstance(context)
            val widgetIds = manager.getAppWidgetIds(ComponentName(context, AutoLabsWidgetProvider::class.java))
            if (widgetIds.isNotEmpty()) {
                val intent = Intent(context, AutoLabsWidgetProvider::class.java).apply {
                    action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
                    putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, widgetIds)
                }
                context.sendBroadcast(intent)
            }
        }
    }

    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        appWidgetIds.forEach { appWidgetId ->
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        
        if (intent.action == ACTION_TOGGLE_APPLIANCE) {
            val applianceId = intent.getIntExtra(EXTRA_APPLIANCE_ID, -1)
            val currentValue = intent.getStringExtra(EXTRA_CURRENT_VALUE) ?: ""
            
            if (applianceId != -1) {
                handleToggleAppliance(context, applianceId, currentValue)
            }
        }
    }

    private fun handleToggleAppliance(context: Context, applianceId: Int, currentValue: String) {
        val nextValue = if (currentValue == "LOW") "HIGH" else "LOW"
        
        // Update local data immediately for UI responsiveness
        updateLocalApplianceValue(context, applianceId, nextValue)
        
        // Make API call in background
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val prefs = context.getSharedPreferences("autolabs_widget_prefs", Context.MODE_PRIVATE)
                val authData = prefs.getString("auth_token", null)
                
                if (authData != null) {
                    val url = URL("https://autolabs.in/api/appliance/publish/")
                    val connection = url.openConnection() as HttpURLConnection
                    connection.requestMethod = "POST"
                    connection.setRequestProperty("Content-Type", "application/json")
                    connection.setRequestProperty("Authorization", "Bearer $authData")
                    connection.doOutput = true
                    
                    val jsonBody = """{"appliance_id":$applianceId,"value":"$nextValue"}"""
                    connection.outputStream.write(jsonBody.toByteArray())
                    
                    val responseCode = connection.responseCode
                    if (responseCode == HttpURLConnection.HTTP_OK) {
                        // Success - widget already updated
                    } else {
                        // Revert on failure
                        updateLocalApplianceValue(context, applianceId, currentValue)
                    }
                    connection.disconnect()
                }
            } catch (e: Exception) {
                // Revert on error
                updateLocalApplianceValue(context, applianceId, currentValue)
            }
        }
    }

    private fun updateLocalApplianceValue(context: Context, applianceId: Int, newValue: String) {
        val prefs = context.getSharedPreferences("autolabs_widget_prefs", Context.MODE_PRIVATE)
        val data = prefs.getString("widget_data", null)
        
        if (data != null) {
            try {
                val json = JSONObject(data)
                val favorites = json.optJSONArray("favorites")
                
                if (favorites != null) {
                    for (i in 0 until favorites.length()) {
                        val item = favorites.getJSONObject(i)
                        if (item.optInt("id") == applianceId) {
                            item.put("value", newValue)
                            break
                        }
                    }
                    
                    json.put("favorites", favorites)
                    prefs.edit().putString("widget_data", json.toString()).apply()
                    
                    // Trigger widget update
                    updateAllWidgets(context)
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    private fun updateAppWidget(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int) {
        val views = RemoteViews(context.packageName, R.layout.widget_favorites)

        val prefs = context.getSharedPreferences("autolabs_widget_prefs", Context.MODE_PRIVATE)
        val data = prefs.getString("widget_data", null)
        val favorites = parseFavorites(data)

        if (favorites.isEmpty()) {
            views.setViewVisibility(R.id.widget_empty, View.VISIBLE)
            views.setViewVisibility(R.id.widget_grid, View.GONE)
        } else {
            views.setViewVisibility(R.id.widget_empty, View.GONE)
            views.setViewVisibility(R.id.widget_grid, View.VISIBLE)
            
            // Set up the intent that will be used for the GridView
            val serviceIntent = Intent(context, WidgetRemoteViewsService::class.java).apply {
                putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId)
            }
            serviceIntent.data = Uri.parse(serviceIntent.toUri(Intent.URI_INTENT_SCHEME))
            
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S) {
                views.setRemoteAdapter(R.id.widget_grid, serviceIntent)
            } else {
                @Suppress("DEPRECATION")
                views.setRemoteAdapter(appWidgetId, R.id.widget_grid, serviceIntent)
            }
            
            // Set up the click intent template for items
            val toggleIntentTemplate = Intent(context, AutoLabsWidgetProvider::class.java).apply {
                action = ACTION_TOGGLE_APPLIANCE
            }
            val togglePendingIntentTemplate = PendingIntent.getBroadcast(
                context,
                0,
                toggleIntentTemplate,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_MUTABLE
            )
            views.setPendingIntentTemplate(R.id.widget_grid, togglePendingIntentTemplate)
        }

        appWidgetManager.updateAppWidget(appWidgetId, views)
        
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S) {
            appWidgetManager.notifyAppWidgetViewDataChanged(appWidgetId, R.id.widget_grid)
        } else {
            @Suppress("DEPRECATION")
            appWidgetManager.notifyAppWidgetViewDataChanged(intArrayOf(appWidgetId), R.id.widget_grid)
        }
    }

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
