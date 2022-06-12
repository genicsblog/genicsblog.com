---
layout: post
title:  "Genics Log #2: Sponsorship from Vercel, Theme updates, Organic Growth and more"
excerpt: "Here's the issue #2 in the Genics log series containing all the latest news and updates on our blog's changes from the month of February to !"
image: "https://user-images.githubusercontent.com/46792249/173225923-7d3a6fc7-d0f3-4b2c-8289-d18398f82f93.jpg"
category: genics-log
author: gouravkhunger
---

Welcome to the second issue in the [Genics log](/category/genics-log) series! I know this is super late in the month, but I wanted to share some updates on the blog from the past months.

Before diving into the latest news at Genics, I would like to introduce myself. I am [Gourav Khunger](/author/gouravkhunger/), the founder of [Genics Blog](/). I am a teenager from India who is passionate about software development and [open source](/tag/open-source/).

In the [last article](/genics-log-1) in this series, we talked about how we went open source and how we managed to grow from 200 visitors/month to 500+ visitors/month, along with sponsorship from BeyondWords.

This log is more inclined towards the core theme infrastructure and how we managed to grow our community to 600+ readers now.

Let's get started!

## Staging ENVs with Vercel

This was a cruicial step in forming a better infrastructure for building [the theme](https://github.com/genicsblog/theme-files) and its plugins.

### Previous setup

From the beginning itself, I planned to create a separate repository for the theme just because it would allow us to use a separate github pages for [staging.genicsblog.com](https://staging.genicsblog.com).

[Here](https://github.com/genicsblog/theme-files/blob/aa7944b1943dbb7206b013dcc1d8102f8c48875e/.github/workflows/setup-staging.yml) is the GitHub Actions file that deployed the theme to staging url. We made sure to block indexing using robots.txt file:

```
User-agent: *
Disallow: /
```

But here comes the tricky part - the staging is not relevant until we deploy PRs to github actions to preview them. And we can't use secret variables if a workflow is run using `pull_request` event and those variables are needed to deploy to gh-pages.

For that, we have to use `pull_request_target` event trigger which allows PR actions to use the repository secrets to access the staging environment.

But the catch here is, this comes with **security vulnerabilities** as the PRs are run in the context of the repository base and not the PR base.

This could mean that user can manipulate the workflow file to misuse the repository secrets!

### Vulnerability in main repository

The above mentioned issue was also present in the main repository. I had setup a workflow for PRs using `pull_request_target` because I wanted to automerge "correct" changes to drafts by authors.

YES, this was a big mistake but fortunately, no one exploited this vulnerability using which one could clean up the whole repository in minutes (making a delete commit and managing to automerge it using repo secrets).

I did have security measures in place:

An [automerge](https://github.com/genicsblog/genicsblog.com/blob/8f8d936e72d886af28ea232d6e90eaa1442c6518/.github/workflows/validate-drafts.yml#L57-L64) happened [only if](https://github.com/genicsblog/genicsblog.com/blob/8f8d936e72d886af28ea232d6e90eaa1442c6518/.github/workflows/validate-drafts.yml#L54) the PR changes article files that are owned by the specific author. The [python script](https://github.com/genicsblog/theme-files/blob/aa7944b1943dbb7206b013dcc1d8102f8c48875e/_scripts/validate-drafts.py) referenced takes in the list of files changed in the PR and goes through them to verify if the PR author is the actual author of the article files.

Now, you could argue that a person could change the script in the PR and this check would easily be bypassed. That is the reason that the workflow uses `wget` to download the script from main branch and then run it. It [deletes the scripts](https://github.com/genicsblog/genicsblog.com/blob/8f8d936e72d886af28ea232d6e90eaa1442c6518/.github/workflows/validate-drafts.yml#L47-L48) in the PR and downloads the correct one before running.

But again, I was still skeptcial of the `pull_request_target` event trigger. The docs don't clearly mention but I am not sure - If the action runs in context of the PR base, then is it possible that the author change the action script and bypasses the script download and other verification checks?

This is the reasion we use Vercel to off-load all these security issues and still be able to deploy staging ENVs!

### Sponsorship from Vercel

[Vercel](https://vercel.com){:rel="dofollow"} was generous enough to sponsor our [GitHub organization account](http://github.com/genicsblog/genicsblog.com) to be able to deploy org repos for free!

> Vercel is a platform for frontend frameworks and static sites, built to integrate with your headless content, commerce, or database.

This sponsorship now enables us to remove our vulnerable GitHub actions and migrate to Vercel deployments. It was as easy as setting up the installation and build scripts. Vercel automatically deploys all PRs to staging environemnts!

Now we can easily preview pull requests and test them visually before moving them to prod!

## Theme updates

We have worked on massive improvements to the theme and its plugins!

### Paginating author pages ([#7](https://github.com/genicsblog/theme-files/issues/7))

This was by-far the biggest need for the theme. Author pages [like this](/author/gouravkhunger/) could get super big without pagination and that affects load times a lot.

This was a big problem for the jekyll community as well - there was no plugin to handle multiple authors with ease.

This lead me to spend time messing with [jekyll-paginte-v2](https://github.com/sverrirs/jekyll-paginate-v2) and understanding how its pagination works. With some days of effort, I came up with [jekyll-auto-authors](https://github.com/gouravkhunger/jekyll-auto-authors) which completely simplifies the process of paginating author pages!

Here's an [in-depth tutorial](https://genicsblog.com/gouravkhunger/adding-multiple-authors-to-a-jekyll-blog-got-easier#2-using-my-plugin-jekyll-auto-authors) on using the plugin to paginate author pages.

### Shortcut commands ([#10](https://github.com/genicsblog/theme-files/issues/10))

There are new shortcut commands you can use to perform these actions on the site:

- Opening up search bar: `command` + `K` or `Ctrl` + `K`. To close it please use `Esc` key.
- Toggling the site theme: `command` + `shift` + `L` or `Ctrl` + `Shift` + `L`.

### Copy button for codeblocks ([#1](https://github.com/genicsblog/theme-files/issues/1))

Copy buttons on codeblocks have been given an overhaul and provide a much nicer user experience.

### Spam comments

In light of [recent spam abuse](https://github.com/genicsblog/comments/pull/122) of our commenting system, we have removed the comment system for now. We might use [giscus](https://giscus.app) in future but there's no plans for it right now.

Please use our [discord server](https://discord.genicsblog.com) for discussions on articles on the site.

### Other updates

Here are some minor but relevant updates we've made to the theme:

- More open-graph meta tags ([#39](https://github.com/genicsblog/theme-files/issues/39)): better for SEO.
- Migration to GA4 ([#21](https://github.com/genicsblog/theme-files/issues/21)).
- Selection color for codeblocks ([#28](https://github.com/genicsblog/theme-files/issues/28)).
- Refactoring series pages ([#2](https://github.com/genicsblog/theme-files/issues/2)).
- For authors: tools like [frontmatter generator](https://genicsblog.com/tool/frontmatter-generator) ([#93](https://github.com/genicsblog/genicsblog.com/issues/93)) and [thumbnail generator](https://genicsblog.com/tool/thumbnail-generator).
- Licensing for the theme and articles ([#136](https://github.com/genicsblog/genicsblog.com/discussions/136)).

## Stats

### Open Source

Here are the stats that changed from the last time:

- [`genicsblog.com`](https://github.com/genicsblog/genicsblog.com) (Main repo with posts and data files): **25 stars**, **20 forks**
- [`theme-files`](https://github.com/genicsblog/theme-files) (Basically template files): **7 stars**, **9 fork**

### Google Analytics

Here's the recent 30 day stats from our Google Analytics:

![Genics blog's past 30 days Google Analytics Stats](https://user-images.githubusercontent.com/46792249/173242642-81e97597-073b-4068-b1ff-3fb0eac8633b.png)

Join our [discord server](https://discord.genicsblog.com) to view these public stats everyday :)

### Organic Stats

Almost 40-50% of our monthly traffic is through organic channels!

![Genics blog's past 3 month Google Search Console Stats](https://user-images.githubusercontent.com/46792249/173243091-49771902-7e9b-4eed-b37b-a911641ace8c.png)

## Final Words

It's been an absolute rollercoaster ride for us to get to this point! It was from 100 readers a month in december when I decided to open source the blog and start working on a newer and better version of it. And here we are, scaled to 600+ readers within 3 months!

In the near future I plan to continue working on the improvements and scale to atleast 5k readers per month. Upto that point, we will focus mainly on putting out quality content that people find insightful, while focussing on gaining traffic through organic channels mainly.

After the 5k check point, there will be great things to come ;)

Looking forward to your feedback and suggestions!