---
layout: post
title:  "Common ways to open a new Activity in an Android app"
excerpt: "This article explains the basics of linking two activities in Android using Intents."
image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1612701204335/IlBdysPPI.png"
notice: "*Thumbnail art by: [rawpixel.com - freepik.com](https://www.freepik.com/psd/background)*"
languages: ["java", "xml"]
category: android
tags: ["beginners", "app-development"]
author: gouravkhunger
---

The idea that comes to my mind to write this post was to help some beginners in Android app development, to let them know how to link two or more activities in Android. I am going to mention 2 ways in which you can do this.

This post is gonna be a very basic one but my main motive in it was that beginners sometimes don’t know about this and they ask dumb questions on StackOverflow. So here I am getting started with it. 

But first, you need to have at least two activities in your project. Suppose there is an `Activity1` and an `Activity2`. The java files associated with them are `Activity1.java` and `Activity2.java`. Here I am assuming that you want to navigate from `Activity1` to the `Activity2`.

I will explain both the easy one and the complex ways and I’ll explain why those methods are used.

## 1. Simple way

So this method is the simplest one. You need to do is this:

```java
startActivity(new Intent(Activity1.this, Activity2.class));
```

The code creates a new Intent, that schedules the opening of `Activity2`, from `Activity1` and `startActivity()` method opens the new Activity. This method is used when you simply want to navigate to other activities.

### Customization to this approach

You can split the declaration of the Intent like this:

```java
Intent openActivity = new Intent(Activity1.this, Activity2.class);

// add flags to the intent here

startActivity(openActivity);
```

This is done so as to add certain kind of flags to the Intent that is used to do certain actions, like showing system dialogs for sharing content, communicating with other apps, etc.

## 2. Complex way

Have you ever seen some apps open another one that is pre-installed? They use a method something like this. 

First, edit the `Activity2` in the `AndroidManifest.xml` file like this and add an `<intent-filter>` tag like this:

```xml
<activity android:name = "Activity2"> 
    <intent-filter> 
        <action android:name="com.test.Activity2" /> <!-- Change com.test with your own package name --> 
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter> 
</activity> 
```

And add the code in the `Activity1.java` file:

```java
Intent openActivity = new Intent("com.test.Activity2"); //Change com.test with your own package name
startActivity(openActivity);
```

As I said this method is used to receive/send data from/to other apps, it can also be used to open your activity from other apps or even an activity within your app as we did it above. But for this, the app must be installed on the device.

So these were the two main methods you saw how to open another activity from one activity in your app.

If you ever see any StackOverflow question asking such a simple question, you may link this article in the comments of that question :)

I hope you liked the article. If yes, please let me know about it in the comments section below.