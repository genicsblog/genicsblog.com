---
layout: post
title:  "Privacy friendly website analytics with Umami and NextJS"
excerpt: "A guide on settting up Umami on Railway and adding it to a NextJS project."
image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1645091755632/-NyymMbeL.png"
hasCode: true
category: "web"
tags: ["next-js", "tools", "free-stuff"]
author: anishde12020
original: "https://blog.anishde.dev/privacy-friendly-website-analytics-with-umami-and-nextjs"
---

Website analytics is truly a very important thing. We can understand our audience well and can tailor our content to our audience for higher engagement. [Google Analytics](https://analytics.google.com/) had always been the go-to solution as it is popular, easy to set up, and gives a lot of data.

However, Google Analytics has got its own set of issues. One must ask for a cookie consent to use Google Analytics as Google Analytics uses cookies. The Google Analytics script is also quite big and is known to slow down websites. There have been recent allegations against Google Analytics for not being privacy-friendly and [many European authorities have also found it breaching GDPR](https://techcrunch.com/2022/02/10/cnil-google-analytics-gdpr-breach/).

So, what is the solution?

Over the years, many privacy-friendly analytics solutions have emerged including [Fathom Analytics](https://usefathom.com/), [Plausible Analytics](https://plausible.io/), and [Umami Analytics](https://umami.is/). The last 2 are open-source and all 3 of them are cookie-less and have a lightweight script that should not affect website load times.

We are going to be focusing on Umami in this article

## A little bit about Umami
Umami is an open-source self-hosted analytics service. This means the source code can be accessed by anyone and one must host it themselves. Now, you might say that this costs money and it is not free but today we are going to look at how we can host it for free. Also, Umami uses NextJS API routes for the backend and hence it can run on any serverless architecture. We are going to be looking at setting it up on [Railway](https://railway.app/) today, however, it can also be hosted on [Vercel](https://vercel.com/dashboard) or [Netlify](https://www.netlify.com/). We are also going to look at adding analytics to a NextJS application.

You can see a [live demo of the platform here](https://app.umami.is/share/8rmHaheU/umami.is)

Fun fact: [Hashnode](https://hashnode.com/) also uses Umami and is rolling out an Umami dashboard as advanced analytics 😎

You can see the [public analytics for my blog here](https://stats.hashnode.com/share/VDldVSkU/9f4dd26c-c7e6-4fa1-88aa-87d90a0dba43)

## Hosting Umami for free on Railway
[Railway](https://railway.app/) is an awesome hosting platform that lets you host applications quickly and easily. The free plan allows usage of up to $5/month which should be good enough for a few small to medium-sized websites.

In fact, I have been using it for the past 3-4 months and it has been an amazing experience. My usage costs are usually lower than $2/month and hence I have never paid anything. You don't even need to link your credit card!

My usage this month (3 websites) - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645083158123/UEZNXrJL_.png)

You can also link a credit card to get $10 of usage per month for free (you will be charged for anything above that).

You can sign up [here](https://railway.app?referralCode=AnishDe12020)

### Setting up the project on Railway

We are going to follow the [official guide on hosting it on Railway](https://umami.is/docs/running-on-railway)

First of all, we must fork the repository. This will help us make changes to the source code to fit our own needs and more importantly, receive updates in the future (as we will see later in the tutorial). Head over to the [Umami GitHub repository](https://github.com/mikecao/umami) and click on fork on the top-right corner - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645084023444/UIfe4bLPm.png)

You may be asked to select your personal account or an organization if you are in any. I would recommend going for personal account unless it is for an organization.

Once you have signed up for an account, click on "New Project" (note that I already have an existing project and hence the layout looks like this. It may be different for you) - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645083729581/NrhvEnIUM.png)

Now, select "Deploy from Repo" on the new project screen - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645084230742/IsU6U7Fb2.png)

Do note that if you didn't sign up with GitHub, you will be prompted to connect your GitHub account.

Search and select Umami there.

Make sure that the master branch has been selected. Now click on deploy - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645085133125/PEO4Np0hp.png)

This might take some time (2-5 minutes).

This is how it should look like after deploying (do note that I am currently using the Metro UI and the layout might look a little different) - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645085314989/SGu2FefSM.png)

Now, we need to add a database. We are going to be using PostgreSQL for this example. Now, Railway has built-in support for databases and hence we can spin up a PostgreSQL instance within Railway itself for free.

Click on this "New" button - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645085285069/quu1-MwRS.png)

Select "Databases" and then select "PostgreSQL" - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645085252955/_pxkdwdGj.png)

This might take some time as well.

Do note that if you are using the old UI, you have to select the "Add Plugin" button.

Now, we need to add two environment variables, `PORT` and `HASH_SALT`. Click on the card that says "umami" and go to the "Variables" tab - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645085586275/6b3hX2IJX.png)

In the old UI, there will be a button called "Variables" in the sidebar. Click that and then add the following variables under "custom".

We need to put a random string for the `HASH_SALT` environment variable. Use any random string generator like [this one](https://devkit.one/generators/random-string). Let us go with 20 characters including uppercase and lowercase letters, numbers, and symbols - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645086073622/Oaa9dkb2U.png)

Now paste that into Railway and click "Add" - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645086092990/Z5TMAndNtH.png)

Also, add an environment variable called `PORT` and set it to `3000` - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645086013249/TBX1KtxPZ.png)

Note that Railway will redeploy our application every time we add an environment variable.


### Setting up our database schema

Now, we need to make tables in our database. For this, we need to locally clone the project. Go ahead and clone it with git and open a terminal in that repository (I am using the GitHub CLI to clone here but you can use `git` as well) - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645086274311/ESnkCPq02.png)

Now, we need to [install the Railway CLI](https://docs.railway.app/develop/cli). You can install it with NPM with the following command - 
```
npm i -g @railway/cli
```
You can also install it with [Homebrew](https://brew.sh/) with the following command - 
```
brew install railwayapp/railway/railway
```

Now run the following command to authenticate the CLI with your Railway account - 
```
railway login
```
Note that if you face any issues while doing this, you can also try logging in with the following command -
```
railway login --browserless
```
Now run the following command to link the local directory with your Railway project - 
```
railway link
```

Now head over to Railway and click the PostgreSQL card and go to the "Variables" tab - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645086844780/5Z7sCtfB6.png)

Now run the following command in the terminal - 
```
railway run psql -h PGHOST -U PGUSER -d PGDATABASE -f sql/schema.postgresql.sql
```
Replace the values caps with their corresponding values from the Railway dashboard (from the environment variables tab for PostgreSQL from the previous step)

Now press enter to run the command.

Do note that you need the PostgreSQL CLI for this. If you don't have it, you can follow [this guide to install it](https://www.timescale.com/blog/how-to-install-psql-on-mac-ubuntu-debian-windows/).

Now run the following command to deploy it - 
```
railway up
```

Hooray, we have successfully deployed Umami 🥳

## Using Umami

After deploying, you will get an URL to deployment logged on to your CLI. You can also retrieve this URL from the Railway web app.

You can also set up a custom subdomain (or even a custom domain) from the Umami dashboard - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645087633934/7mcDLz429.png)

You will see a login screen now. The username is "admin" and the default password is "umami" (we will change this).

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645087925651/mO7f7rbEO.png)

Our dashboard should look like this now - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645087905782/XJLyLBPL1.png)

Now, there is a banner saying there is a new version out! While writing this tutorial, [Mikecao](https://github.com/mikecao), the creator of Umami, pushed a new version 😅

Now, that is a good thing because now I get to show you how to update Umami 😎

Before that, let us just quickly change our password as "umami" isn't a secure password.

Head over to Settings --> Profile and click on "Change Password"

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645088278499/VheBGhUUXY.png)

Enter "umami" in the "Current Password" field and then set a new secure password and click "Save" - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645088387324/VmfJRvZft.png)

### Updating Umami

Head over to the forked Umami repository on GitHub. You should see that our branch is behind by a few commits - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645088470198/r7hgqcKVi.png)

Click on "Fetch Upstream" and then "Fetch and merge" - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645088510722/8sBS4wExL.png)

That is it! A new deployment will be initiated on Railway and in a few minutes, you should be up and running the latest version - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645088575876/UhIEb2SZl.png)

## Adding Umami to a NextJS website

Now, let us look at adding Umami to a NextJS website. For this let us first create a new NextJS application (note that it will work with existing NextJS applications as well) - 
```
npx create-next-app umami-tutorial
```

Let us now move into that directory - 
```
cd umami-tutorial
```

Now, open it in your favorite text editor. We will be using VSCode for this tutorial - 
```
code .
```

Now, open the `pages/_app.js` file. It should look like this - 
```js
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```

Now, let us add the script tag for Umami. This is how our `_app.js` should look like now - 
```js
import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL &&
        process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="lazyOnload"
          />
        )}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
```

Here, we are using the [NextJS Script component](https://nextjs.org/docs/api-reference/next/script) and lazy loading the script so that it doesn't block our website from loading.

We will also need to add the environment variables but before that, we need to add the website to Umami. 

Head over to Umami and then to Settings --> Websites - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645090114917/h3EVdgmDM.png)

Now, click on "Add website"

I am naming this "Umami Tutorial" but you can name it whatever you want to. In the next field, make sure to enter the domain and NOT THE URL to the website. Note that I have quickly created a GitHub repository and deployed this NextJS app to [Vercel](https://vercel.com/). I have also checked "Enable Share URL" so that I can share the analytics for this website with you guys 😁

Here it is - [https://umami-tutorial.up.railway.app/share/3lOPyajp/Umami%20Tutorial](https://umami-tutorial.up.railway.app/share/3lOPyajp/Umami%20Tutorial)

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645090318295/8b01p6l-xH.png)

Now, click on "Save" and then "Get tracking code" - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645090384630/csMsmGMW7.png)

From the modal that appears, just copy the values of `data-website-id` and `src` - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645090430194/_Ep6VvsVs.png)

Now, create a new file in your NextJS app called `.env.local` and add the following environment variables - 
```
NEXT_PUBLIC_UMAMI_SCRIPT_URL= # Your script URL, the value under `src`
NEXT_PUBLIC_UMAMI_WEBSITE_ID= # The website's id, the value under `data-website-id`
```

Now, visit the website on your browser and take a look at the Umami dashboard, it should record a view and a visit under the "Realtime" tab - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645090808765/DClWJJP28.png)

We can see more detailed analytics under the details page of the website - 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1645090870636/yVqIm4_VA.png)

More data will pile up as you start getting visitors on your site

Note: Some browsers like brave have in-built ad-blockers which blocks such scripts from loading in many cases. Even third-party ad-blockers can be responsible for this. If no data is showing up in your Umami dashboard, try a browser without ad-blockers (or private mode), try restarting your development server, and make sure that the values of the environment variables are right.

Woohoo, that was a lot!

## Conclusion
We got Umami set up and running and added analytics to a NextJS application. Umami does a lot more like recording events. Take a look at [their documentation for more information](https://umami.is/docs)

I hope everything worked out for you. Do feel free to comment on this article or reach out to me on [Twitter](https://twitter.com/AnishDe12020) and I will help you out 😄

## Important Links
- [Umami](https://umami.is/)
- [Umami Docs](https://umami.is/docs/about)
- [Official guide on setting up Umami on Railway](https://umami.is/docs/running-on-railway)
- [Railway](https://railway.app/)
- [Repository for this tutorial](https://github.com/AnishDe12020/umami-tutorial)
- [Demo website for this tutorial](https://umami-tutorial.vercel.app/)
- [Public analytics for the demo website](https://umami-tutorial.up.railway.app/share/3lOPyajp/Umami%20Tutorial)
