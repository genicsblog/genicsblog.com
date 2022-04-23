---
layout: post
title:  "8 No Brainer Ways to Keep Your Heroku App Awake"
excerpt: "Compilation of the easiest ways to keep your free Heroku dyno running 24/7."
image: "https://user-images.githubusercontent.com/46792249/158544648-96aac1a5-d4dc-4f55-adff-d0479f6f447f.png"
audioId: 3827320
hasCode: true
category: web
tags: ["web-development", "tools"]
author: gouravkhunger
permalink: /gouravkhunger/8-ways-to-keep-your-heroku-app-awake
---

Heroku is one of the easiest ways to quickly get your applications up and running on the web!

And what's so good about it? Heroku's free plan is pretty generous. Although it gives you just 550 hours of free hosting a month, it can be extended to a solid 1000 by verifying yourself by adding a credit card.

The only major issue with its free plan is that if your web app has not received any traffic for 30 minutes, it will auto shut your app :(

The next requests that your app receives would restart the application, but it takes 7-8 seconds to restart the server which the app is hosted on. This means that if you app went to sleep, the user would have to wait for the app to wake up again, which surely does not provide a good UX.

If you are struggling to keep your app awake, don't worry. I've got you!

Here are 8 ways to keep your Heroku app awake:

- Using a combination of `setInterval()` and `http.get()` functions.
- Using `node-cron` to ping your Heroku app.
- Using Kaffeine to ping your Heroku app.
- Pinging your app using Pingdom.
- With the `heroku-keep-awake` npm package.
- Configuring Newrelic addon to ping your Heroku app.
- Using other services like Uptime Robot to ping the app so it never sleeps.
- Scale up your Heroku app to hobby plan for just $7/month.

Let's dive into how to use these tools! For this tutorial we'll assume we have a Heroku application hosted at example.herokuapp.com.

## 1. Using setInterval() and http.get() functions

This is by far the easiest way to keep your Heroku app awake without using any third party tools. `setInterval()` and `http.get()` functions are inbuilt into Node.js!

Here's how you can use these functions to your advantage:

```javascript
const http = require('http');

setInterval(() => {
  http.get("http://example.herokuapp.com");
}, 25 * 60 * 1000); // every 25 minutes
```

Place this code inside your main `index.js` file, which is responsible to start your server/app. This will make sure to ping the application with a `GET` request every 25 minutes, which will simulate traffic to your application before 30 minutes of inactivity and thus keep your application awake!

## 2. Using node-cron

[`node-cron`](https://github.com/node-cron/node-cron) is a package that let's you easily schedule cron jobs to perform tasks at specific intervals set by cron expressions. You can use this package to your advantage to keep your Heroku app awake!

Let's say you are already working with [`axios`](https://github.com/axios/axios) in your application, using it along with node-cron is as simple as:

```javascript
const axios = require('axios');
const cron = require('node-cron');

cron.schedule('*/25 * * * *', () => {
  axios.get('example.herokuapp.com');
})
```

The expression `*/25 * * * *` means every 25 minutes of any hour/day/month. This will run the axios get command to ping your app every 25 minutes.

## 3. Using Kaffeine

I am pretty sure you have heard of [Kaffeine](https://kaffeine.herokuapp.com) a lot. It is one of the most popular tool to ping your Heroku app.

![Screenshot of Kaffeine tool that pings your Heroku app every 30 minutes](https://user-images.githubusercontent.com/46792249/158734348-13cb4a84-34a6-4ab1-add7-9a581b76b636.png){:class="aspect-video w-full"}

Basically, it is a tool with a database of Heroku apps. Every 30 minutes, it goes through the list of stored apps and pings them. This is an easy way to ping your app without any manual work involved.

But a major problem with Kaffeine is it has a big database of sites to ping (79406 as of now). This essentially means that it can be slow to iterate through the list. Even being some seconds later than 30 minutes can make your Heroku app go to sleep mode.

With some testing I have found that you can expect to see your app restart about 7-8 times a day, even while using Kaffeine, but this basically defies the purpose of keep the app awake 24/7. It is recommended to use the manual ping methods listed above.

## 4. Pingdom

[Pingdom](https://www.pingdom.com) is a easy to use analysing and monitoring tool for your website. In the process of monitoring your site for uptime, it will ping your Heroku site which will keep it awake!

## 5. Use Heroku-keep-awake npm package.

`Heroku-keep-awake` is a lightweight [npm package](https://www.npmjs.com/package/heroku-keep-awake) that  built specially to help you keep your apps alive.

[Internally](https://github.com/colbymillerdev/heroku-keep-awake/blob/develop/index.js), it uses [moment.js](https://github.com/moment/moment) and [node-fetch](https://github.com/node-fetch/node-fetch) to simulate traffic to your application.

You can install it with:

```shell
npm i heroku-keep-awake
```

Using it is as simple as:

```javascript
const express = require('express');

// wakeDyno for pinging single dyno
// wakeDynos for pinging multiple dynos
const { wakeDyno, wakeDynos } = require('heroku-keep-awake');

const DYNO_URL = 'https://example.herokuapp.com';
const DYNO_URLS = ['https://example.herokuapp.com', 'https://another-example.herokuapp.com']

const app = express();

app.listen(PORT, () => {
    wakeDyno(DYNO_URL); // Pass a single dyno url string to keep it awake

    wakeDynos(DYNO_URLS); // Pass an array of Dynos to keep awake
})
```

## 6. Setup New Relic APM plugin for Heroku

Heroku supports a wide set of addons, one of which is [New Relic](https://elements.heroku.com/addons/newrelic). It offers features such as:

- Monitoring critical transactions across your website.
- Ensure the backend server apps are never the bottleneck for server issues.
- Dashboard to track everything.
- Analyze front-end and back-end applications to identify the root cause of performance issues.

and a lot more.

You can set up a free version to monitor your application. In the process of monitoring your application, it will ping your application which will keep it alive!

## 7. Uptime Robot

[Uptime Robot](https://uptimerobot.com) is yet another free and flexible website monitoring tool, whose free plan can help you monitor HTTP security, response times, ports, keywords and a lot more.

It does it in the same way, by pinging the site to get the details. When it pings your Heroku app, it simulates traffic to it, which will keep it awake!

## 8. Get a Hobby dyno to avoid the mess

If you actually like Heroku as a service I'll recommend you to actually upgrade your dyno plan to Hobby, which is just $7/month. That gives you the option to keep your app awake 24/7 out of the box.

Not only does it keep the dyno awake 24/7, it gives you more features like:

- Free SSL certificates for your sites.
- Automatic certificate management.
- Dynos that never sleep.

To know more about Heroku's pricing, please visit their [pricing page](https://www.heroku.com/pricing).

## Conclusion

This was it for the list of 8 ways you could keep your Heroku apps awake 24/7.

I personally recommend you to go either with `setInterval()` way (because of no 3rd party interference), or with `node-cron` (using open source tools) as both of them give you the control on how you ping the app.

So, what tools/hacks are you actually using to achieve this task? Let me know in the comments below! Do you need help with programming? Join [our discord server](https://discord.genicsblog.com)!

[Let's get in touch](https://github.com/gouravkhunger).