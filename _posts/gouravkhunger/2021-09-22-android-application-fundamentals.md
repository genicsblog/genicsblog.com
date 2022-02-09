---
layout: post
title:  "Android Application Fundamentals - Understand the bits and bytes"
excerpt: "A complete guide to understanding Android Studio basics and Android app structure."
image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1632128417570/zaxOSlbso.png"
audioId: 3467737
category: android
tags: ["app-development"]
author: gouravkhunger
series: "android-development"
---

Hello there!

In the last article at the [Android app development series](https://genicsblog.com/series/android-development), we learned [how to make a Hello World app](https://genicsblog.com/how-to-create-your-first-android-app-using-android-studio). We made a new project in Android Studio and ran the app.

Now, in this article, we are going to learn more about the Android App structure, its basic components, how to use [Android Studio](https://developer.android.com/studio), how to navigate through the project, and a lot many things that will be helpful along the way! 

Let's dig into it!

## Know Android Studio in depth

[Last time](https://genicsblog.com/how-to-create-your-first-android-app-using-android-studio), after we created a new app, this kind of screen popped up after the app was built.

![Android Studio main window](https://cdn.hashnode.com/res/hashnode/image/upload/v1631773265969/Sq2JDNXFps.png)

We'll go through the window pane-by-pane. On the left side of the IDE window, you can see the project files in different views. By default, the project opens in the "Android" view, whereby you can see all the files that are relevant for your final app. 

![rl-2Vl276G.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1632131895518/PvcNew3hC.png)

There are many other default files that (most of the time) aren't needed to mess with, so Android Studio provides a really handy way to keep aside the mess and focus on what files you need for the project.

These are the different views you can use to show/hide relevant files.

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1632131754395/fELwPHyzG.png)

But, most of the time, you would only need either the "Android" view or the "Project" view.

![7IM_tC9oR.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1632131855925/kIBWYnRTxg.png)

**Android View**: This view shows only relevant files related to your app screens and layout/resources.

**Project View**: This view shows all the files in the current project. You might need this while adding external files to a specific location in the project. Example: Adding `google-services.json` file to integrate Firebase in an Android app.

Let's get back to the main window, where you can write code.

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1632132266927/V7A34rdSN.png)

You can double-click on any file on the left pane, and it will open in the editor. The image above is of is an `XML` file. Each `XML` file has three different views, **Code**, **Split** and **Design** view.

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1632132831458/ziYWINZCA.png)

You can see just the code in the **Code** view, see code as well as and live updates in the **Split** view, or access the drag and drop layout builder in the **Design** view.

On the top bar, you would be able to see the various standard features any IDE would have. You can try going through all the options and find various things you might need.

![JDNXFps.pn](https://cdn.hashnode.com/res/hashnode/image/upload/v1632129954919/ip7yaj4dw.png)

And just below the bar, there are various useful things. On the left side you can see the current file you are working on, and the path it has inside the project.

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1632133059267/0869cuIRl.png)

On the right side, you can see various buttons, which I will explain one by one:

- The **build**(green hammer)  is used to build your project.
- the **run button**(green triangle) is used to build your project while installing the built `APK` on your connected Android device. You can select the device to launch your app from the drop-down beside your project.
    - When the app is running on a device, the two buttons beside the run button become active. They are for reloading the app once you made changes. 

    This is useful because it takes less time to build as it only considers the changes in code and builds them, which results in a significant reduction in build time.

- Then there is the **debug** button. In addition to what the run button does, it attaches a debugger to the app which logs what happens to your android device when the app is running. It is pretty helpful to debug errors and crashes.

- Then there is the **profiler** tool which allows you to scan how your app is using CPU, memory, network, battery, and other resources on the device where it is running.

- There are other buttons related to project structure, Gradle, AVD(Android Virtual Device) manager, and others. You can try them out. I have explained most of the tools you would need.

On the bottom, you would be able to see this:

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1632136020773/S-5CQBIRt.png)

The specific tabs open up to show different things. Like, the debug tab opens up when you press the debug button, Profiler opens when you press profile, Logcat can be used to find logs of the running app, TODO lists all the TODOs (reminder to yourself) you have set anywhere in the project, etc. 

These were the basic things you would need to know to get started with Android Studio 🥳

Now, as you have learned Android Studio. Let's understand what files constitute different parts of an Android app.

## Android Project File Structure

I would recommend you to open the *Project* view for understanding what responsibility each file/folder has.

![Screenshot 2021-09-20 172135.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1632138739381/mVpoCB8HG.jpeg)

Under the root folder, there are sub-folders for different things.

First, there is the `.gradle` folder. It is the local cache for Gradle to speed up some build processes. You would have noticed by now that the first Gradle build takes time and subsequent builds are a bit faster - that's because Gradle stores cache to make things faster on further builds.

The `.idea` folder has all the local settings for your current environment. Since Android Studio is based on IntelliJ IDEA, it follows IDEA's blueprints.

The `build` folder would have the assets you generate- like a signed APK or so.

Then there comes a cluster of files, I will cover them together because they are all related to Gradle:

- The root-level `build.gradle` file: It contains configurations that are used by the app you are making, and all the libraries included in the project too.

- The `settings.gradle` contains references of the repositories in which Gradle should look for while importing a library. It also unites all the libraries and the app together.

-  The `gradle.properties` defines settings that Gradle uses for the current project.

- The `local.properties` file, as the name suggests, is for local environment settings.

- [Read this answer](https://stackoverflow.com/a/44861408/9819031) on StackOverflow to know in-depth about the `gradlew` and the `gradle.bat` file.

Let's move to the `app` folder now. This is where the source code of our app lives.

![Screenshot 2021-09-20 172135.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1632139910393/1n9oXmT24.jpeg)

The `libs` folder here would contain any external libraries you would import to the project. The `build` folder is the same, it contains generated files. The `proguard-rules.pro` file has configurations for ProGuard - which allows obfuscating code for an app.

The `src` folder is the big deal. It contains all of your code files that define different pages(activities) in your app. All things related to the functioning of the app are contained inside this folder.

![Screenshot 2021-09-22 at 8.09.30 PM.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1632321699792/96aiZUoGx.png)

- The `androidTest` folder contains tests written to test the user interface of the app. For example, Tests that validate if a screen opens properly in different scenarios.
- the `test` folder has test files to test general functions implemented in the app. For example, Tests that validate if a function that validates E-Mail formatting is working fine or not.
- Finally, the `main` folder contains the actual files that make up the app.

We will know about testing in android apps in future articles :)

Now, open the `main` folder. Here comes the interesting part. Don't worry if the above things went over your head, this section will be understood by most of you because it's intuitive.

Now, you will be able to see three elements:

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1632327366167/XuraJ03g0.png)

We will start with the `AndroidManifest.xml` file. Consider this scenario, someone gives you a book but in an ambiguous way, they just pass you the pages, and the book isn't bound altogether. Then, the pages and the chapters won't make any sense to you, right?

This is the same with Android Operating System. Let's consider you made an app with multiple screens. The Android system doesn't know the screens that your app contains and it can misunderstand them to other screens implemented in other apps. Now how does it know what all screens are a part of your app?

Here comes the `AndroidManifest.xml` file into play. It is a structured file that lists all the activities that are a part of the app, and any other components that the app may contain, like implementations for background services that the app may utilize, the permissions that the app would use to give its full functionality or some other meta-data information.

Now, I am sure it would be clear to you what `AndroidManifest.xml` file does. Now, hop into the `java` folder.

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1632328494066/T3uWJn4wF.png)

It contains different packages with different files for anything you want to do. It can contain activity classes, utility classes for some functions that you want to reuse in the project again and again, for implementing data classes to store data, and basically anything that isn't related to the user interface.

The `xml` folder is where all the UI elements should be placed.

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1632328636033/7q5XnEdIC.png)

- The `drawable` folder should contain vector graphics that can be shown on the screen.
- The `layout` folder is the place where the screens are actually placed. It should contain the files that implement the user interface for different screens.
- The `mipmap` cluster of folders would contain non-scalable image assets. And if you are assuming that one has to define all the densities by themselves before importing them to Android Studio- then no, you are wrong 😂. Android Studio has an inbuilt feature that assists you to convert graphics to different densities.
- The `values` and `values-night` contain constant values in kind of a key-value format. You can access these values from the `java`/`kotlin` code at runtime by referencing the key. The `values` folder is used by android when the app is using a light theme, and the other one is automatically picked up if you turn to dark mode.

## FiNaL WoRdS

Okay, so this was it to know how a really basic Android project is structured. Now, you can go and have a look at various [open source android projects](https://github.com/topics/android) on GitHub. Try to remember what significance a file has in a project.

You can also try to make projects in Android Studio using the starter templates and have a look into different things.

I hope was able to explain to you how an Android project looks like. In future articles, we'll get into further details by making simple apps and understanding the use of different things in an android app.

Comment on this post if this was even a bit of help for you 🙌. It motivates me to keep writing and sharing useful things :)

Happy Coding :)