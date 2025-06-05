---
layout: post
title:  "Showcase GitHub Network Dependents in the README"
image: "https://dependents.info/images/social-preview.png"
excerpt: "Easily showcase a live image of GitHub network dependents (repository users) in your project's readme file."
audioId: "3a3eae44-9913-406e-a6e4-794751051647"
category: open-source
tags: ["libraries", "tools"]
author: gouravkhunger
---

If you’ve ever published a library on GitHub, you’ve probably noticed that GitHub shows a nice sidebar section on some repositories — **"Used by X repositories"** — giving your project social proof and discoverability.

<img alt="GitHub used by section" src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yhshsui1xn89wfijc8lc.png" />

Unfortunately, this info is only visible if **100+ repositories** depend on your project.

That sucks because I maintain several open source libraries like [jekyll-auto-authors](https://github.com/gouravkhunger/jekyll-auto-authors) that have dozens of real users and I'd love to showcase that information despite the thresholds.

So I built [dependents.info](https://dependents.info) — a simple tool that shows your network dependents right inside your README!

## Live demo

This is how the generated image looks like:

<a href="https://github.com/gouravkhunger/jekyll-auto-authors/network/dependents">
  <img src="https://dependents.info/gouravkhunger/jekyll-auto-authors/image.svg" />
</a>

Made with [dependents.info](https://dependents.info).

## Watch now

{% include youtube.html id="icdxdppB6AA" %}

## How it works

The idea is simple: [dependents.info](https://dependents.info) is a GitHub Action written in TypeScript + a Go based API that together generate a SVG image showing which repositories depend on your package.

Just like [contrib.rocks](https://contrib.rocks), but for **network dependents**.

The tech stack:

- **GitHub Action** in TypeScript: Crawls your repository’s network dependents and sends them to the backend.
- **API** in Go (Fiber): Authenticates using GitHub OIDC to verify requests, stores data, and generates a minimal SVG image with avatars and names of top users.

## Features
- Works for **any public GitHub repository**.
- Secure: uses GitHub’s built-in **OIDC** to verify authenticity.
- Shows top 10 dependent repos (sorted by stars).
- Live SVG badge, embeddable in any README.
- Supports a lot of configurations.
- Robust caching and rate-limit friendly.
- Minimal setup: just a few lines in a `.yml` GitHub workflow.

## Setup

1. Add a GitHub Action to your repository:

Add this simple workflow file to your repository's `.github/workflows` folder.

`dependents.yml`

```yml
name: Dependents Action

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  dependents:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
    steps:
      - uses: gouravkhunger/dependents.info@main
```

2. Copy the following code snippet below and replace `owner/repo` with your repository's name. paste it wherever you want to embed the image.

```html
<a href="https://github.com/owner/repo/network/dependents">
  <img src="https://dependents.info/owner/repo/image.svg" />
</a>

Made with [dependents.info](https://dependents.info).
```

As soon as you push these changes, you'll see the image inserted automatically!

## See It Live

- Website: https://dependents.info
- GitHub: https://github.com/gouravkhunger/dependents.info

> Got ideas or feature requests? Drop them on the repo — contributions and feedback are super welcome.

Hope this project helps bring visibility to your packages, no matter how big or small!

Happy coding :)

— [Gourav](https://gourav.sh)
