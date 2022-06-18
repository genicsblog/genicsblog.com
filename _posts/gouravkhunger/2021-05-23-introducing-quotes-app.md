---
layout: post
title:  "Introducing Quotes App"
excerpt: "An Open Source Quotes App made by Gourav Khunger. The app is open source and uses zenquotes' API to fetch quotes"
image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1621705813818/nq9ltm2ud.png"
audioId: 3467755
category: android
tags: ["open-source", "apps"]
author: gouravkhunger
---

Hi everyone, how are y'all doing 😃

It's been a long time since I published my last blog post and all that is because it was getting difficult to manage studies and blogging. But in the meantime, I have been working on a really awesome project and this article is all about explaining that ✨

# Introducing Quotes App 🚀

### Background

If you ever read even one of my android articles, you will definitely be knowing I used Java to make android apps.

And, as we all know Google is going on to promote Kotlin at its level best and encouraging developers to use Kotlin to develop android apps, I too was thinking for a long time of migrating to Kotlin as soon as possible.

Also, a lot of open-source projects and articles on the internet about android development, these days are based on Kotlin and require you to understand Kotlin! So it was high time for me too to adopt Kotlin and get my hands dirty over it.

If you too ever thought of starting to learn a new language from scratch, you definitely know how difficult it seems at first, to pick a new topic and start learning it by researching over the internet. And the same happened to me!

But my learning process of Kotlin is a talk of another article, I will surely write articles about it and update this one to include them.

So, after learning Kotlin, the thing I had left out was, I had not implemented things I learned in a project and I would say that's a massive mistake that beginners make. It's important to try out stuff in the real world if we wish to get good in any field!

### Idea

As soon I was done with learning modern tools and concepts about android development, like the MVVM pattern(I did not use it much before learning Kotlin), Room Database library, ViewModels, LiveData, and trying few things here and there, I had an idea of integrating all the things I learned into a single android app.

I really wished to make something useful out of what I learned and not just implement any 3rd world demo app that does nothing.

And hence it had to lead me to think about making a Quotes App 🎉. The concept of the app is really simple.

I thought of having just two screens in the app, one for viewing the current quote and the other for viewing all the saved quotes of the user.

On the quotes page, there would be a card that would show the currently loaded quote and the author of the quote. There would be a button on the bottom of the page to bookmark, or in other words, save the current quote. Look below in the design section to see the design I took inspiration from.

The second page would be about showing the bookmarked quotes to the user. There we can long-press the quotes to copy them to the clipboard, and swipe them to delete them from our collection. Also, we can undo the action if the quote was deleted in error and it will get back into place.

### Design

I thought over the designing aspect a lot, but since I am not that much interested in designing as I am fascinated with programming, I wished to focus on the coding part more than the design part.

Hence, I looked over the internet for some design inspirations and ideas, I ended up with this image, and most of the design inspiration is taken from it, though not completely, but the major look and feel is derived from it.

![app-design-idea.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1621707289953/fIkD18DZu.jpeg)

This design looked great to me and I made up my mind to use it as a reference while designing the whole UI

### Development

It took me just 2 days to get working with a working base model of the app. I had done implementing Retrofit, Room Database, Recycler View, Navigation, and pretty much everything the basic version of the app would need.

I have used the [ZenQuotes API](https://zenquotes.io/) to load quotes into the app. Huge thanks to them for making such a quality API for free usage!!

As of now, here's a list of tools and frameworks this app uses:

- Material Design
- Android LifeCycle Components
- Room Database Library
- Kotlin Extensions and Coroutines
- Retrofit Library
- Android Navigation Components

All the code for this app is hosted on [this Github repository](https://github.com/GouravKhunger/QuotesApp).

Feel free to clone the repository and add new amazing features that you have in your mind 🙂

Also, Don't forget to smash the star button and show some love!

### End result

Here's a demo video showing all the features of the app:

{% include youtube.html id="9Kl6WDmTK8g" %}

# Final thoughts

It was an overall fun experience implementing all the new things I learned while diving even deeper into Android development.

I learned a lot of new concepts along the way, also coming up with errors here and there and failing while learning Kotlin, but the quotes themselves from my app kept me motivated to continue the learning process 😇

Please [download the latest `apk` file](https://github.com/GouravKhunger/QuotesApp/releases/latest), install it on your device, and provide feedback about what you think  about the app 🔥

I hope you would love the app as well as the article, thanks a lot for reading this far 😊