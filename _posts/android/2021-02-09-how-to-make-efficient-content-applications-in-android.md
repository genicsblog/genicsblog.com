---
layout: post
title:  "How to Make Efficient Content Applications in Android?"
excerpt: "This article explains an Android app-development use case in which an efficient approach could be used to deliver better results."
image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1612892448407/fOCn_s9fg.jpeg"
notice: "*Thumbnail art by [pikisuperstar - freepik.com](https://www.freepik.com/vectors/technology)*"
languages: ["xml", "java"]
category: android
tags: ["app-development"]
author: gouravkhunger
---

Everyone knows this! Android is one of the best OS out there. Every day, many people enter the world of Android coding. And yes, it is also very easy. This is one of the major reasons for the success of Android. People try to get their hands into Android, by starting out with basic apps, understanding activities, fragments, and Intents.


![android.jpeg](https://cdn.hashnode.com/res/hashnode/image/upload/v1612890480557/QhWgrxWHd.jpeg)

Then, they move on to something complex such as Lists, Arrays, different Views, Messaging, etc, expanding their knowledge of Android. Then they come upon the idea of making and publishing their own app. This is a general way, people tend to move into Android coding. And, it works well.

A good approach is to start with making a static content application that teaches others about a specific theme or content, i.e., A content application. This is also a good idea. And it is also famous as people download new apps to learn a particular thing. And, of course, this article is for you if you wish to make a static content based Android application.

# A general outline of the thought process

If you also thought of making such an app, then I can tell, what most novice or even some intermediate Android coders would think. Suppose, your application is about learning HTML. You know HTML very well and want to share your knowledge. Then you started an app and here comes the thing.

You might have thought to make a Home page(activity, if you know) followed by a splash screen. There you would link other activities to the Home activity with buttons. 

This implies that you are making different activities for each activity containing specific content that you want to show to the user! 

And what that means is, if you give information about more than 100 HTML tag(approx.), you will end up making these many activities(plus About page, credits, etc)! This now makes sense that handling that number of activities is not worthy enough and we need to do something efficiently!

If we make 100+ activities and link them to the Home activity, the size of the app and load on the system would increase incredibly.

# The solution

Don’t worry! I am here to solve your problem. Just follow me.

You can proceed to make your basic activities, including SplashScreen, HomePage, Contact, About, and Credits. These are the basic requirements for almost every kind of app. This makes your app feel special and worthy.

Then, don’t start making activities like hell, just make another Activity named *Content*(`.java` or `.kt`– your choice, this article will teach the steps in java). And don’t make other activities by their single name.

Now, what we are going to do is the dynamic viewing of static content! Doesn’t that seem interesting, lets dig into it.

## What to do after that?

After that, include all the content/information just into the `strings.xml` file. Since we want our content to be beautiful, let’s make use of basic HTML for it(later, I will show you how to render that text into TextView):

```xml
<resource>
...
    <string name="tag_anchor"><![CDATA[
        <h1>Anchor tag</h1>
        <p>Anchor Tag is used to make hyperlinks. It links webpages.....</p>
        ...
    ]]></string>

    <string name="tag_heading"><![CDATA[
        <h1>Heading tags</h1>
        <p>Heading tags enable us to enlarge text and make headings.....</p>
        ...
    ]]></string>
...
</resource>
```

Be sure to wrap the HTML in `<![CDATA[` tag to allow HTML usage in TextView.

Then, in the `setOnClickListener()` functions of buttons in the Home activity, add the Intent as such:

```java
tagAnchor.setOnClickListener(v->{  //tagAnchor is identifier for showing info about anchor tag.

    Bundle b = new Bundle();
    b.putString("from", "tagAnchor");

    /*tagAnchor is the identifier that represents that the Anchor tag button is pressed*/

    startActivity(new Intent(Home.this, Content.class).putExtras(b));

}
```

What we do here is, we are sending information from one activity to the other. In other words, the home activity says to the other activity:

Home Activity: "Hi There! The user is requesting content for: 'X' tag, please show it"
Content Activity: "Oh, sure!"

That's how the thing works in laymen's terms. I hope you understood what's going on, next we will be coding the Content activity to receive the information and display content accordingly.

----

Also read [Common ways to open a New Activity in Android](/ways-to-open-a-new-activity-in-an-android-app)

----

Now I am going to give you the code of `Content.java` and the `activity_content.xml` file and I will explain whatever is going on.

### Content.java

```java
package com.example; //your package

import ...;

public class Content extends AppCompatActivity {

    @Override
    protected void onCreate(final Bundle savedInstanceState) {
        ...
        TextView content = findViewById(R.id.main_content);

        Intent in = getIntent();
        Bundle b = in.getExtras();
        String s = Objects.requireNonNull(b).getString("from");

        switch (Objects.requireNonNull(s)) {
            case "tagAnchor":

                //You can also dynamically change ToolBar text to set title of the page here.

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                    main_content.setText(Html.fromHtml(getString(R.string.tagAnchor), Html.FROM_HTML_MODE_COMPACT));
                }else{
                    main_content.setText(Html.fromHtml(getString(R.string.tagAnchor)));
                }
            break;

            case "tag_heading":
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                    main_content.setText(Html.fromHtml(getString(R.string.tag_heading), Html.FROM_HTML_MODE_COMPACT));
                }else{
                    main_content.setText(Html.fromHtml(getString(R.string.tag_heading)));
                }
            break;
        }
        ...
    }
    
}
```

### activity_content.xml

```xml
<LinearLayout...>

    <ToolBar...>

    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
        <LinearLayout
            android:layout_height="wrap_content"
            android:layout_width="match_parent"
            android:orientation="vertical"
            android:padding="10dp">

            <TextView
                android:id="@+id/main_content"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#000000"
                android:linksClickable="true"
                android:textColorLink="@color/coloraccent"
                android:textSize="18dp"/>

        </linearLayout>
    </ScrollView>

</LinearLayout>
```

That's it for the activity's layout.

## Logic of Code

Now, I am going to analyze the code. In the `activity_content.xml`, we define an element- TextView with id `main_content`, and also, I initialize this in the `Content.java` file. When the intent to required content is triggered, I assign a bundle object, a string in the *key-value* pair format. 

For every button, we have the key named “from” which defines that a button has been clicked. It’s valued is the name of the button clicked.

In the `Content.java` file, we retrieve what is the value of the “from” key. On the basis of the value retrieved, I set the value of the TextView accordingly to show the content which is actually needed.

This is pretty simple and not hard to understand.

# Conclusion

In this article, you saw how you can dynamically show static content in an activity. Instead of making different activities for each type of content you want to show, you can make single activity and update its content as required.

This would significantly reduce the load on the system, the size of your app, and most importantly, your precious time :)

I hope you find this article helpful and you will share it to increase people’s efficiency in coding.

If you have any doubts or suggestions, please write to gouravkhunger18@gmail.com. Please do write a comment. It keeps me happy and motivated :)