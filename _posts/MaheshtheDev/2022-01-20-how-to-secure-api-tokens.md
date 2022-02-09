---
layout: post
title:  "How to Secure API tokens"
excerpt: "Securing API tokens is important to avoid their misuse. This post will show you how to secure your API tokens!"
image: "https://www.techfunnel.com/wp-content/uploads/2021/07/application-programming-interface.png"
audioId: 3468197
category: web
tags: ["api", "security", "web-development"]
author: MaheshtheDev
original: "https://maheshthedev.hashnode.dev/how-to-secure-api-token"
notice: "Thumbnail art credits: [techfunnel.com](https://www.techfunnel.com)"
permalink: /MaheshtheDev/how-to-secure-api-tokens
---

If you are into the tech world for a while, I’m sure you heard about the word `API`. It stands for Application Program Interface. For example, Google has API which gives user details access to third party software.

Basically, API acts as a bridge to pass information to authenticated third-party software. To authenticate these third parties, an API token is required.

Many contributors use this API tokens to create some unique products like creating Telegram Bot, Slack Bot. Although the product gets built successfully, contributors can get organized by open-sourcing their code. But it's very important that they  secure the API token before they publish it to GitHub!

Different ways of Securing API:
1. Securing API tokens on Windows
2. Securing API tokens on GitHub
3. Securing API on Heroku

# Securing API tokens on Windows:

To secure API token you need to define them in the environment variables.

1. Search the `Environment Variables` you will find Edit the Environment variables, open it. There, you will find these settings:

![](https://miro.medium.com/max/824/1*AvRoS1MbBRl4oe2q7Tq-rA.png)

2. Then go to Environment Variables. Click on the New button then add the API token with some variable name and take note of it:

![](https://miro.medium.com/max/1306/1*hRrygxDz_d5EbPRZfsDh6w.png)

3. After adding this Variable then restart it.

Now you can use this API token across any code in your local system!

# Securing API tokens on GitHub:

1. You need to have the code pushed to GitHub. Open the Your Repo Settings tab as shown below.

![](https://miro.medium.com/max/2666/1*wpoSrUMBBM05WfZrSEXOrA.png)

2. Then open Secrets on the left side as shown in the above picture.

3. Then add new Secret with the key name and API token.

4. Now this key works across the repository.

Secret Keys won't be disclosed to any other users or third parties by GitHub.

# Securing API tokens on Heroku:

In Heroku, you can do this in two ways either through Heroku CLI or Dashboard.

## Heroku CLI
1. Open CMD and login to Heroku with Heroku login
2. Go to your Project Folder
3. Then use this command: `heroku config:set <Key>=<Value> <Key>=<Value>`

Now you can use the key name anywhere in the project!

## Heroku Dashboard:
1. First Create an app in the Heroku
2. Go to the App settings tab
3. Go to Config Vars and add your API tokens

![](https://miro.medium.com/max/2480/1*MJWNVqZQpfWIpiLm9wTwsg.png)

That's it for the post. I hope this post is helpful to you!