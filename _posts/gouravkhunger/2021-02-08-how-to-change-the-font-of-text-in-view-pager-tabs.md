---
layout: post
title:  "How to change the font of text in View Pager Tabs?"
excerpt: "This article explains how to change the Font family of the text in View Pager tabs"
image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1612804759970/w2robLovl.jpeg"
notice: "*Thumbnail art by [freepik - freepik.com](https://www.freepik.com/vectors/technology)*"
hasCode: true
category: android
tags: ["app-development"]
author: gouravkhunger
---

Today, I am going to explain to you how can you change the text of View Pager tabs in the tabbed activity of your android app. Many times, we want to customize the minor details in our Android app, but things in Android get confusing at times. This is a very simple yet effective way. So without taking any more time, let’s dive into the codes.

First, you have to create an assets directory(please remember to keep that out of the `res` folder) and put your font’s `.ttf` file there.

Then, create a method called `setCustomFont()` in the tabbed activity. Code it like this:

```java
public void setCustomFont() {
    ViewGroup vg = (ViewGroup) tabs.getChildAt(0);
    int tabsCount = vg.getChildCount();

    for (int j = 0; j < tabsCount; j++) {
        ViewGroup vgTab = (ViewGroup) vg.getChildAt(j);

        int tabChildsCount = vgTab.getChildCount();

        for (int i = 0; i < tabChildsCount; i++) {
            View tabViewChild = vgTab.getChildAt(i);
            if (tabViewChild instanceof TextView) {
                ((TextView) tabViewChild).setTypeface(Typeface.createFromAsset(getAssets(), "font.ttf"));
            }
        }
    }
}
```

*This code has been adapted from [this answer](https://stackoverflow.com/a/31067431/9819031).*

Here, `font.ttf` is the `.tff` file of the font you want to use and the ViewGroup variable `vg` is the TabLayout in the XML with id: `tabs`

Change the variables to suit your needs and then call the `setCustomFont()` function inside the `onCreate()` method.

With this, you will get your desired font face of the text in the tabs. If you have any problems, understanding this, please don’t hesitate to comment!