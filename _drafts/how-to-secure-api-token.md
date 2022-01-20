---
layout: post
title:  "How to Secure API token"
excerpt: "In this IT world, securing the data transfer is tough. But securing the API with token is important."
image: "https://www.techfunnel.com/wp-content/uploads/2021/07/application-programming-interface.png"
category: Web
tags: ["API", "Backend-Security", "Web-Development"]
author: maheshthedev
original: "https://maheshthedev.hashnode.dev/how-to-secure-api-token"
---

If you are into this tech world for a while. I’m sure you heard about the word API. API is the Application Program Interface. For example, Google has API which gives user details access to third party software. So basically API acts as a bridge to pass secure information to authenticate third-party software. To authenticate this third parties API token is required.

Many contributors use this API tokens to create some unique products like creating Telegram Bot, Slack Bot. Although the product was built successfully. Contributors can get organized by showing their code. To do that they need to secure the API token before they publish it to GitHub.

Different ways of Securing API:
1. Securing API tokens on Windows
2. Securing API tokens on GitHub
3. Securing API on Heroku

# Securing API tokens on Windows:

To secure API token you need to define them in the environment variables.

1. Search the `Environment Variables` you will find Edit the Environment variables, open it. you will find these

![](https://miro.medium.com/max/824/1*AvRoS1MbBRl4oe2q7Tq-rA.png)

2. Then go to Environment Variables. Click on the New button then add the API token with some variable name and note the variable name

![](https://miro.medium.com/max/1306/1*hRrygxDz_d5EbPRZfsDh6w.png)

3. After adding this Variable then Restart it.

Now you can use this API token across any code in your local system.

# Securing API tokens on GitHub:
1. First, upload your Repo in the GitHub. Open the Your Repo Settings tab as shown below.

![](https://miro.medium.com/max/2666/1*wpoSrUMBBM05WfZrSEXOrA.png)

2. Then open Secrets on the left side as shown in the above picture.



3. Then add new Secret with Var name and API token.

4. Now this variable works across the Repo.

And Secret Variable won't disclose to any other users or third parties by GitHub.

# Securing API tokens on Heroku:

In Heroku, you can do this in two ways either through Heroku CLI or Dashboard.

## Heroku CLI
1. Open CMD and login to Heroku with Heroku login
2. Go to your Project Folder
3. Then use this command heroku config:set S3_KEY=8N0SD29N81 S3_SECRET=9sSED109d3+583493190

Now you can use variable name anywhere in the Project

## Heroku Dashboard:
1. First Create an app in the Heroku
2. Go to the App settings tab
3. Go to Config Vars and add your API tokens

![](https://miro.medium.com/max/2480/1*MJWNVqZQpfWIpiLm9wTwsg.png)

This is it. Hope this post is helpful to you!