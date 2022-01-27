---
layout: post
title:  "Toasty Library Demo"
excerpt: "This post explains how to use Toasty library for Android to customize toast notifications."
image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1613229759273/8Dre4FBM9.gif"
languages: ["groovy", "java", "xml"]
category: android
tags: ["libraries"]
author: gouravkhunger
series: "android-library-testing"
---

Here I am with my new Library testing series. I am starting this off with a very simple and basic Library- [Toasty](https://github.com/GrenderG/Toasty). It is a simple way to customize Android Toast Notifications. 

The default android Toasts gets boring with simple straight-forward methods and styling, also making it tedious. Toasty is a good way to customize those Toasts.

Check out this video for reference(it is a bit old so please bear with the audio and errors 😅️):

{% include youtube.html id="lgHq-JSP58g" %}

Okay, so, to use any library, first import it into the project, by implementing it through Gradle. Add this dependency in the `build.gradle(Module: App)` file:

```groovy
implementation 'com.github.GrenderG:Toasty:1.5.0'
```

Then add the below repository host in your `build.gradle` file(this time, Project level), if it's not there:

```groovy
allprojects {
	repositories {
		...
		maven { url "https://jitpack.io" } //add this line if not there
	}
}
```

After adding the dependencies, you can add some basic buttons to your layout, and then link them to the Buttons in the activity. We will use Toasty to show the different types of Toasts that it supports when the different buttons are clicked.

Add the buttons as follows:

## `activity_main.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:orientation="vertical">
    <Button
        android:id="@+id/toasty_success"
        android:layout_width="200dp"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="Success"
        android:layout_marginTop="20dp"/>
    <Button
        android:id="@+id/toasty_warning"
        android:layout_width="200dp"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="Warning"
        android:layout_marginTop="20dp"/>
    <Button
        android:id="@+id/toasty_info"
        android:layout_width="200dp"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="Information"
        android:layout_marginTop="20dp"/>
    <Button
        android:id="@+id/toasty_error"
        android:layout_width="200dp"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="Error"
        android:layout_marginTop="20dp"/>
    <Button
        android:id="@+id/toasty_iconToast"
        android:layout_width="200dp"
        android:layout_height="wrap_content"
        android:text="Icon Toast"
        android:layout_gravity="center"
        android:layout_marginTop="20dp"/>
    <Button
        android:id="@+id/toasty_custom"
        android:layout_width="200dp"
        android:layout_height="wrap_content"
        android:text="Custom"
        android:layout_gravity="center"
        android:layout_marginTop="20dp"/>
    <Button
        android:id="@+id/toasty_formatted"
        android:layout_width="200dp"
        android:layout_height="wrap_content"
        android:text="Formatted Text"
        android:layout_gravity="center"
        android:layout_marginTop="20dp"/>
</LinearLayout>
```

## `MainActivity.java`

Here’s the code I implemented in Java. Be sure to watch the video to learn more.

```java
package ...;

import ...;

public class MainActivity extends AppCompatActivity {

    Button success, error, info, warning, withIcon, custom, formatted;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        init(); //initialize buttons
        setOnClickListeners();  //set onclick listeners

    }

    public void init() {
        success = findViewById(R.id.toasty_success);
        error = findViewById(R.id.toasty_error);
        info = findViewById(R.id.toasty_info);
        warning = findViewById(R.id.toasty_warning);
        withIcon = findViewById(R.id.toasty_iconToast);
        custom = findViewById(R.id.toasty_custom);
        formatted = findViewById(R.id.toasty_formatted);
    }

    private void setOnClickListeners() {
        success.setOnClickListener(v->{
            Toasty.success(this, "Success", Toasty.LENGTH_SHORT).show(); //success toast
        });

        error.setOnClickListener(v->{
            Toasty.error(this, "Error", Toasty.LENGTH_SHORT).show();
        });

        info.setOnClickListener(v->{
            Toasty.info(this, "Information", Toasty.LENGTH_SHORT).show();
        });

        warning.setOnClickListener(v->{
            Toasty.warning(this, "Warning", Toasty.LENGTH_SHORT).show();
        });

        withIcon.setOnClickListener(v->{
            Toasty.normal(this, "Normal toast w/ icon", R.drawable.person).show();
        });

        custom.setOnClickListener(v->{
            Toasty.custom(this, "I'm a custom Toast", R.drawable.ic_launcher_foreground, R.color.colorAccent, Toasty.LENGTH_SHORT, true,
                    true).show();
        });

        formatted.setOnClickListener(v->{
            Toasty.custom(this, getFormattedMessage(), R.drawable.ic_launcher_foreground, R.color.colorAccent, Toasty.LENGTH_SHORT, true,
                    true).show();
        });
    }

    private CharSequence getFormattedMessage() {
        final String prefix = "Formatted ";
        final String highlight = "bold italic";
        final String suffix = " text";
        SpannableStringBuilder ssb = new SpannableStringBuilder(prefix).append(highlight).append(suffix);
        int prefixLen = prefix.length();
        ssb.setSpan(new StyleSpan(BOLD_ITALIC),
                prefixLen, prefixLen + highlight.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        return ssb;
    }

}
```

Now, I am going to mention the particular code snippets needed for different types of Toasty toasts.

## Error Toast:

```java
Toasty.error(this, "Error toast.", Toast.LENGTH_SHORT, true).show();
```

## Success Toast:

```java
Toasty.success(this, "Success!", Toast.LENGTH_SHORT, true).show();
```

## Information Toast:

```java
Toasty.info(this, "Info Toast.", Toast.LENGTH_SHORT, true).show();
```

## Warning Toast:

```java
Toasty.warning(this, "Warning!", Toast.LENGTH_SHORT, true).show();
```

## Usual Toast

```java
Toasty.normal(this, "Normal toast without icon", Toast.LENGTH_SHORT).show();
```

## Usual Toast with Icons

You’ll need to pass a drawable file as done here:

```java
Toasty.normal(this, "Normal toast with icon", Toast.LENGTH_SHORT, ContextCompat.getDrawable(this, yourIconDrawable)).show();
```

You can also create your custom Toasts with the `custom()` method:

```java
Toasty.custom(this, "Custom Toast", ContextCompat.getDrawable(this, yourIconDrawable), tintColor, Toasty.LENGTH_SHORT, withIcon,  shouldTint).show();
```

Also, Toasty allows custom formatted text, like Bold and Italic texts to be passed as the text value in the toast, so be sure to check it out. Here is the code you may use for preformatting the text. You can edit this as per your needs.

```java
private CharSequence getFormattedMessage() {
    final String prefix = "Formatted ";
    final String highlight = "bold italic";
    final String suffix = " text";
    SpannableStringBuilder ssb = new SpannableStringBuilder(prefix).append(highlight).append(suffix);
    int prefixLen = prefix.length();
    ssb.setSpan(new StyleSpan(BOLD_ITALIC),
            prefixLen, prefixLen + highlight.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        return ssb;
    }
}
```

## Conclusion

This was a tutorial on the [Toasty](https://github.com/GrenderG/Toasty) library, I hope you got well insights on it.

If you wish me to post a tutorial on a specific library, comment it down!

Thanks for reading! Happy Coding :)