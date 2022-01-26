---
layout: post
title:  "How and when to override Android Activity's Lifecycle methods?"
excerpt: "Explanation of a StackOverflow question regarding an Android Activity's lifecycle"
image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1630916159630/gZuyRfFaz.png"
languages: ["java"]
category: android
tags: ["app-development", "beginners", "tips"]
author: gouravkhunger
---

Yesterday, I came across a [StackOverflow question](https://stackoverflow.com/questions/69064102/how-can-i-stop-the-progressdialog-after-returning-to-the-activity).

The OP(original poster) of the question had a scenario like this:

He made a `ProgressDialog` in an activity. After pressing a `CardView` in that activity corresponding to a meditation session, a `ProgressDialog` should appear for 3 seconds, and then the other activity would open - the `m1` activity. 

The problem he faced was - After returning to `MeditationActivity`, the `ProgressDialog` continued to show up and never stopped.

He wanted that the progress dialog is closed once the user comes back from the `m1` activity to the `MeditationActivity`.

Just after reading the question, it should strike to the mind that one can override the default methods present in an Activity's Lifecycle and dismiss the dialog from there!

Here's how the lifecycle of an Android Activity looks like:

![activity_lifecycle.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630915330208/6F9zSmseW2.png)

*This is an image from the official [android documentation](https://developer.android.com/guide/components/activities/activity-lifecycle)*

From the flowchart, we can see that it is the `onResume()` method that is called whenever a person comes back to the activity from another screen. So it seems to be the place where we should place the logic for dismissing the dialog!

![activity_lifecycle.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630915509631/Eq9kO4b_9.png)

Here's how we can do that:

```java
@Override
public void onResume(){
    super.onResume();
    if(progressDialog != null) progressDialog.dismiss();
}
```

The null check is placed because the `progressDialog` was initialized only when the person presses the `CardView`. And if it is initialized earlier, then there would be redundant dismissals of the `progressDialog`.

This was a perfect example where we could override the default lifecycle methods provided by an Android `Activity` to perform actions pertaining to lifecycle.

[Here's my answer](https://stackoverflow.com/a/69064294/9819031) to the original question on StackOverflow! I'll be writing more explanations to StackOverflow Questions, so consider following me on hashnode.

I hope you find this article helpful :)