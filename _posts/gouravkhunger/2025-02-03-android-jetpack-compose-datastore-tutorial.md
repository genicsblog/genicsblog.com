---
layout: post
title: "Android Jetpack DataStore Tutorial 2025 [Kotlin Generics Way]"
excerpt: "A complete guide on migrating from SharedPreferences to Jetpack Compose Preference DataStore in Android using a Kotlin generics-based approach."
category: android
author: gouravkhunger
tags: ["intermediates", "libraries", "kotlin"]
audioId: "971aa0dc-90d8-4c81-b5b5-17cba131bb6f"
image: "https://i.ytimg.com/vi_webp/1zXwaySv2JM/maxresdefault.webp"
permalink: /gouravkhunger/android-jetpack-compose-datastore-tutorial
---

For years, Android developers have relied on `SharedPreferences` for persisting key-value pairs, but it comes with several limitations—synchronous execution, lack of proper error handling, and no clear mechanism for handling large or complex data. With Android Jetpack, Google introduced **DataStore**, a modern and robust solution designed to replace `SharedPreferences` while offering better efficiency and scalability.

In this article, we will explore how to **migrate from SharedPreferences to Jetpack DataStore** using a clean and type-safe **Kotlin generics based approach**.

If you prefer a video tutorial instead, do check out this YouTube video I made recently:

{% include youtube.html id="1zXwaySv2JM" %}

# Why Jetpack DataStore?

Jetpack DataStore provides two solutions for key-value data persistence:

- **Preferences DataStore** (similar to SharedPreferences but with better async support)
- **Proto DataStore** (uses protocol buffers for type safety)

In this guide, we’ll focus on **Preferences DataStore**, which allows us to work with key-value pairs just like `SharedPreferences` but in a more modern, scalable way.

### Key Benefits of DataStore:

- **Asynchronous & Coroutine-friendly**: Unlike SharedPreferences, DataStore is designed for Kotlin coroutines, preventing UI thread blocking.
- **Type Safety**: Proto DataStore ensures strong type safety with protocol buffers.
- **No UI Freezes**: Since DataStore runs asynchronously, there are no UI freezes, even when working with large datasets.
- **Single Source of Truth**: Designed for a unidirectional data flow pattern, making state management easier.

# Migrating from SharedPreferences to DataStore

Let’s assume we previously used `SharedPreferences` for managing settings in our Android app. Below is a typical `Settings` class using `SharedPreferences` in a generic way:

```kotlin
class Settings(context: Context) {
    private val sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context)

    fun <T> get(setting: Setting): T {
        return when (val type = setting.defaultValue) {
            is SettingType.IntValue -> sharedPreferences.getInt(setting.key, type.value) as T
            is SettingType.FloatValue -> sharedPreferences.getFloat(setting.key, type.value) as T
            is SettingType.StringValue -> sharedPreferences.getString(setting.key, type.value) as T
            is SettingType.BooleanValue -> sharedPreferences.getBoolean(setting.key, type.value) as T
        }
    }

    fun <T> set(setting: Setting, value: T) {
        with(sharedPreferences.edit()) {
            when (value) {
                is Float -> putFloat(setting.key, value)
                is String -> putString(setting.key, value)
                is Boolean -> putBoolean(setting.key, value)
            }
            apply()
        }
    }
}
```

where `SettingType` is a sealed class that holds the underlying data classes:

```kotlin
sealed class SettingType {
    inline fun <reified T> get(): T {
        return when (this) {
            is IntValue -> value as T
            is FloatValue -> value as T
            is StringValue -> value as T
            is BooleanValue -> value as T
        }
    }

    data class IntValue(val value: Int) : SettingType()
    data class FloatValue(val value: Float) : SettingType()
    data class StringValue(val value: String) : SettingType()
    data class BooleanValue(val value: Boolean) : SettingType()
}
```

We can define an enum class that uses this sealed class `SettingType` to define preferences that can be used throughout the app:

```kotlin
enum class Setting(val key: String, val defaultValue: SettingType) {
    USER_NAME("user_name", SettingType.StringValue("John Doe")),
}
```

This approach works but it is **synchronous** and lacks structured error handling. Now, let's migrate this to Jetpack DataStore. And specifically, **Preference DataStore**.

## Step 1: Add Dependencies

Open your `build.gradle.kts` file and add the DataStore dependency:

```kotlin
dependencies {
    implementation("androidx.datastore:datastore-preferences:1.1.2")
}
```

Then, sync your project after adding the dependencies.

## Step 2: Setting Up DataStore

Unlike `SharedPreferences`, DataStore requires defining an extension property in the `Context` class. This helps in initializing it properly.

```kotlin
val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")
```

## Step 3: Create a Generic Preferences Manager

We’ll now create a **type-safe generic manager** for handling different data types using Kotlin generics.

### Define a Generic Preference Class

```kotlin
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.intPreferencesKey
import androidx.datastore.preferences.core.stringPreferencesKey

// ...

sealed class Preference<T>(val key: Preferences.Key<T>, val defaultValue: T) {
  companion object {
    val USER_NAME = Preference(stringPreferencesKey("user_name"), "John Doe")
  }
}
```

Here we map the same `Settings` enum from the previous `SharedPreferences` example to something better. Notice how our code is already shorter and we don't need a `SettingType` sealed class anymore.

Let's create our generic class to get and set the Settings through `DataStore`.

### Create a Generic Settings class

```kotlin
import android.content.Context
import androidx.datastore.preferences.core.edit
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class Settings(private val context: Context) {
    fun <T> get(preference: Preference<T>): Flow<T> {
        return context.dataStore.data.map { preferences ->
            preferences[preference.key] ?: preference.defaultValue
        }
    }
    
    suspend fun <T> set(preference: Preference<T>, value: T) {
        context.dataStore.edit { settings ->
            settings[preference.key] = value
        }
    }
}
```

## Step 4: Using DataStore in an Activity or ViewModel

Now, let’s integrate DataStore into our UI. Here's an example on how to update a value in the `DataStore` from a `ViewModel`:

```kotlin
class MainViewModel(private val settings: Settings) : ViewModel() {
    val trimLogs: Flow<Boolean> = settings.getPreference(Preference.TrimLogs)

    fun updateTrimLogs(enabled: Boolean) {
        viewModelScope.launch {
            settings.setPreference(Preference.TrimLogs, enabled)
        }
    }
}
```

And in your activity:

```kotlin
class MainActivity : AppCompatActivity() {
    private val settings by lazy { Settings(this) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        lifecycleScope.launch {
            settings.getPreference(Preference.TrimLogs).collect { trimLogs ->
                Log.d("DataStore", "Trim Logs: $trimLogs")
            }
        }
    }
}
```

### Using in a Composable

Using the `Settings` class in a composable is easy too:

```kotlin
@Composable
fun MyComposable(settings: Settings) {
    val trimLogs by settings.getPreference(Preference.TrimLogs).collectAsState(initial = false)

    // Use trimLogs in your UI
}
```

# Wrapping Up

In this guide, we successfully migrated from `SharedPreferences` to Jetpack **DataStore** using a clean and generic approach. The new implementation is **fully asynchronous**, **type-safe**, and **avoids UI-blocking operations**.

### Key Takeaways

- **Jetpack DataStore is the modern replacement for SharedPreferences**.
- **Using Kotlin generics**, we can create a flexible and reusable preference manager.
- **DataStore works seamlessly with coroutines and Flow** for reactive programming.

If you're building an Android app in 2025, DataStore is the recommended solution for managing persistent key-value data. 🚀

Have thoughts or questions? Drop a comment below!

Happy coding! 🎉
