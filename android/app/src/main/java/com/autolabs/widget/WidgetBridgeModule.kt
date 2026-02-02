package com.autolabs.widget

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class WidgetBridgeModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "WidgetBridge"

    @ReactMethod
    fun updateWidgetData(payload: String, promise: Promise) {
        try {
            val prefs: SharedPreferences = reactContext.getSharedPreferences("autolabs_widget_prefs", Context.MODE_PRIVATE)
            prefs.edit().putString("widget_data", payload).apply()
            
            // Store auth token for widget API calls
            try {
                val json = org.json.JSONObject(payload)
                val authToken = json.optString("authToken", "")
                if (authToken.isNotEmpty()) {
                    prefs.edit().putString("auth_token", authToken).apply()
                }
            } catch (e: Exception) {
                // Auth token not in payload, ignore
            }

            AutoLabsWidgetProvider.updateAllWidgets(reactContext)
            promise.resolve(true)
        } catch (error: Exception) {
            promise.reject("WIDGET_UPDATE_FAILED", error)
        }
    }
}
