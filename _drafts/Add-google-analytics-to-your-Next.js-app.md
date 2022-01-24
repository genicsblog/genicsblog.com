---
layout: post
title:  "Add google analytics to your Next.js app ✨"
image: "![image](https://user-images.githubusercontent.com/76690419/150725716-dfca7d8b-9966-48a2-aac5-e62ecf7aa585.png)"
languages: ["javascript"]
category: web
tags: ["analytics", "javascript", "next.js", "webdev"]
author: avneesh
original: "https://blog.avneesh.tech/add-google-analytics-to-your-nextjs-app"
---

Wassup everyone, let's see how to add google analytics to your Next.js site. Google Analytics will help you to see the performance of each page, how well the site is doing in countries, different devices, etc.


## Setup Google Analytics
Go to  [Google Analytics](https://analytics.google.com/analytics/web/#/report-home/a215528627w297101680p257398486) and click on admin in the sidebar.

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1642347546151/V_VNBwjDM.png)

After clicking on admin you will see a screen similar to this-

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1642347749350/EkD2EHa3Z.png)

Click on "Create Property", now fill in the form with your details.

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1642347967831/C2JOHnX-W.png)

You also need to give basic business details.

After you click submit your property will be created! You will see this screen and as we are using Next.js, select web-

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1642348270857/uZb1Ioz8s.png)

Fill in your website URL and title-

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1642348443210/En2V_kUHK.png)

Click on add on Add new on-page inside **Tagging instructions**-

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1642348649689/0fbjYdwFL.png)

Copy the ID that you see and copy it as we are going to need it!

## Using Google Analytics in Next.js app

Go inside `pages/_app.tsx` and these two Next.js Scripts-

```Javascript
  <Script
    strategy="lazyOnload"
    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
  />

  <Script id="google-analytics" strategy="lazyOnload">
    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
  </Script>
```

This is going to load google analytics via this script. As you can see we are using env variables for the google-analytics tag because it must remain a secret 🤫, so if you don't already have a `.env.local` file create one and add the following-

```.env
NEXT_PUBLIC_GOOGLE_ANALYTICS=YOUR_GOOGLE_ANALYTICS_ID
```

Paste in the ID that we copied in the last step! Since we are changing the env variables you need to restart the server too.

As we are using the Next.js script we also need to import it-

```
import Script from "next/script";
```

Open your localhost app in one tab and google analytics in another. If you click on Real-time inside of Reports you will see that you have 1 user!


![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1642350505812/oMFfF0elgj.png)


## Conclusion

Adding google analytics to your Next.js app was this easy! Hope you found it useful and insightful. See ya next time ✌️

### Useful links

[Google Analytics](https://analytics.google.com/analytics/web/#/report-home/a215528627w297101680p257398486) 

 [Next.js](https://nextjs.org/)

 [Connect with me](https://links.avneesh.tech/)  
