---
layout: post
title: "Adding Multiple Authors to a Jekyll Blog got Easier!"
excerpt: "Jekyll doesn't support multiple authors out of the box. But we can add that functionality using this plugin I made!"
image: "https://user-images.githubusercontent.com/46792249/162621431-f9004144-8a56-4cb5-b3ac-5c5a2660a6fa.png"
audioId: 3968519
category: jekyll
tags: ["open-source", "libraries"]
author: gouravkhunger
permalink: /gouravkhunger/adding-multiple-authors-to-a-jekyll-blog-got-easier
---

A Jekyll powered blog doesn't have the support for multiple authors out of the box. I faced the same issue for [Genics Blog](/). I've built the blog from scratch using Jekyll.

The primary feature of this publication is having the support for multiple authors. I have tackled this problem in two ways which I'll be discussing in this post!

# 1. Traditional approach using data files

The traditional approach is very straight forward but comes with its own limitations.

We start by defining a file inside the **`_data/`** folder that hosts author's information.

**`_data/authors.yml`**

```yml
johndoe:
  name: "John Doe"
  bio: "John Doe is a software engineer."
  email: "john@example.com"
  socials:
    github: "john-doe"
    twitter: "john_doe"

janedoe:
  name: "Jane Doe"
  bio: "Jane Doe is a systems engineer."
  email: "jane@example.com"
  socials:
    github: "jane-doe"
    twitter: "jane_doe"
```

Now we have the author objects in this file. Then we generate a layout that has the blueprint for the author's page. A minimal layout looks like this:

```html
{% raw %}<!DOCTYPE html>
<html lang="en">

{% assign author = site.data.authors[page.author] %}
<!--
  Now you can use the author variable.
  It has all the data as defined inside _data/authors.yml for the current author.
-->

  <head>
    <!-- See how we can use values inside the author variable. -->
    <meta name="description" content={{ author.bio }}>
    <!-- other stuff -->
  </head>

  <body>
    <h1>{{ author.name }}</h1>
    <p>{{ author.bio }}</p>

    {% assign links = author.socials %}
    <a href="{{ link.twitter }}">Twitter</a>
    <a href="{{ link.github }}">GitHub</a>

    <!--
      Here we get all the posts by the author of the current page.
      And then render a post preview box for each of the post.
    -->
    {% assign posts = site.posts | where_exp:"item", "item.author == page.author" %}
    {% for post in posts %}
      {% include postbox.html %}
    {% endfor %}
  </body>

</html>{% endraw %}
```

Here, we get the author data for the current page and assign relevant meta information on the page. The information comes from the data files we set.

Then we get all the posts by the author of the current page using the `where_exp` filter ([docs for filters](https://jekyllrb.com/docs/liquid/filters/)). Then we render a post preview box for each of the post.

The postbox can be any way you want to present the post. This is similar to what an index page would have as as to keep the structure uniform.

Now, we assign an author to each post in the site by adding this to the post's front matter:

```yml
---
# other config
author: johndoe
---
```

We need to keep the same author username as defined in the data file.

This sets up the configuration for the author's page. But the pages won't be rendered because Jekyll doesn't know where to render the pages.

Now, we create a collection for the author pages so that we can output author pages at the desired location.

To create the collection, add this to the `_config.yml` file:

```yml
collections:
  authors:
    output: true
    permalink: /author/:author/
```

This let's us have a folder named `_authors/` in the root directoy and have the markdown files for authors there. [More on collections >](https://jekyllrb.com/docs/collections/)

Inside the folder, we add individual files named `johndoe.md` and `janedoe.md`. This renders these files at endpoints `/author/johndoe` and `/author/janedoe` respectively.

Make sure to add these lines in the files (variable `author` changes as per file):

```yml
---
layout: author
author: johndoe
---
```

That's it!

This is the general way that allows us to add multiple authors to a simple Jekyll blog. Nothing fancy here. It was a bit long to setup but adding new authors is as easy as creating a new file in `_authors` folder, defining data in `_data/authors.yml` and adding the author's name to the post's front matter.

But you see, this process is way tedious!

You have to add the file for each author. Sure, it scales well upto about 10-15 authors. But for a publication like [Genics Blog](/) that is consistently gaining traction for new authors, this becomes a pain.

I had set up an automated process using GitHub Actions that would add the markdown file in `_authors` folder as soon as a PR for a new author profile is received. But that doesn't scale well and isn't the most optimum way to do it!

So I spent some time building up a solution for this. Let's look at how it works!

# 2. Using my plugin jekyll-auto-authors

There's a major issue of pagination with the above approach. For example, let's take [my profile](/author/gouravkhunger/) at Genics Blog. I've got tons of posts. Along with Each post has a thumbnail image associated with it.

The above method doesn't have pagination support. Now if all the posts are listed in a single page, the page speed becomes too low.

I've already setup [`jekyll-paginate-v2`](https://github.com/sverrirs/jekyll-paginate-v2) for paginating category and tag pages. But it doesn't work with authors. Also, it has got an amazing autopages feature for auto-generating category and tag pages that I use extensively for Genics.

I wished to integrate autopages for authors functionality to it, but the paginate-v2 plugin isn't being actively maintained. So I decided to build [`jekyll-auto-authors`](https://github.com/gouravkhunger/jekyll-auto-authors){:rel="dofollow"} that works in sync with it. Drop a star at GitHub to show support!

{% include linkpreview.html url="https://github.com/gouravkhunger/jekyll-auto-authors" title="gouravkhunger/jekyll-auto-authors" %}

Let's look at how to start using the plugin. If you prefer a video tutorial, watch this:

{% include youtube.html id="V5Ly6T_bWwU" %}

## Setup

Add the plugin to your `Gemfile` inside `jekyll_plugins` group:

```ruby
group :jekyll_plugins do
    # other gems
    gem "jekyll-paginate-v2" # reqiured for jekyll-auto-authors to work
    gem "jekyll-auto-authors"
end
```

Now, execute:

```shell
bundle install
```

## Usage

This plugin fits well inside the configuration for `jekyll-paginate-v2` plugin.

First, you need to set pagination configuration inside `_config.yml` file. This is similar to what the pagination plugin does.

```yml
pagination:
  enabled: true
  per_page: 9
  permalink: '/page/:num/'
  title: ':title - page :num'
  sort_field: 'date'
  sort_reverse: true
```

This configuration will be used for the pagination on the generated author pages. The above example defines that each page should get 9 posts at max. The permalink of first page is same, but the later pages get `/page/:num` appended to it. `:num` gets converted to the page number.

You can skip the pagination by setting `enabled: false`, if you only care about auto-generation of author pages.

Now we'll define the autopages config for authors.

Define an `autopages` block to set up author autopages:

```yml
autopages:

  # Other autopage configs for jekyll-paginate-v2 stay the same

  authors:
    enabled: true # adding false here stops the auto-generation
    data: '_data/authors.yml' # Data file with the author details
    layouts: 
      - 'author.html' # We'll define this layout later, will be used for each author
    title: 'Posts by :author'
    permalink: '/author/:author/'
    slugify:
      mode: 'default' # choose from [raw, default, pretty, ascii or latin]
      cased: true # if true, the uppercase letters in slug will be converted to lowercase ones.
```

That's it for the autopages and pagination configuration.

As an example, we will use the same `_data/authors.yml` file as generated in the previous step.

All the data for an author is passed on to the liquid template inside the `page.pagination.author_data` variable so that you can render it as you wish!

Let's define a basic template for the `author.html` layout so you get a gist of how to use it:

```html
{% raw %}<!DOCTYPE html>
<html lang="en">

{% assign author = page.pagination.author_data %}
<!--
  Now you can use the author variable anyhow.
  It has all the data as defined inside _data/authors.yml for the current author.
-->

  <head>
    <!-- See how we can use values inside the author variable. -->
    <meta name="description" content={{ author.bio }}>
    <!-- other stuff -->
  </head>

  <body>
    <h1>{{ author.name }}</h1>
    <p>{{ author.bio }}</p>

    {% assign links = author.socials %}
    <a href="{{ link.twitter }}">Twitter</a>
    <a href="{{ link.github }}">GitHub</a>

    <!--
      The main logic for rendering an author's posts resides here.
      The plugin exposes a paginator object that you can use to loop through the post.
      It handles all the pagination logic for you.
    -->
    {% for post in paginator.posts %}
      {% include postbox.html %}
    {% endfor %}

    <!--
      If you don't want pagination, you can use the old way!
    -->
    {% assign posts = site.posts | where_exp:"item", "item.author.name == author.name" %}
    {% for post in posts %}
      {% include postbox.html %}
    {% endfor %}
  </body>

</html>{% endraw %}
```

That's it for the configuration!

Now, you can go to any post and just drop in the username to the frontmatter of the post.

```yml
---
# other configs
author: johndoe
---
```

Once you run the build, you'll see the author page for `johndoe` come inside the `_site/author/johndoe/` directory. If there are a lot of posts by `johndoe` and pagination is set up correctly, it will generate pagination pages as defined in the `pagination` block of `_config.yml` file.

## How does it work?

Read on how it works at the [GitHub repository](https://github.com/gouravkhunger/jekyll-auto-authors#how-does-it-work).

# Conclusion

I hope this article helped you understand the different ways to add multiple authors to a Jekyll blog!

Quick recap, we learnt how to add multiple authors to a Jekyll blog:

- Using the traditional manual author pages with data file method. This has caveats.
- Using my plugin [`jekyll-auto-authors`](https://github.com/gouravkhunger/jekyll-auto-authors) which also has pagination support.

Please drop a comment or join [our discord server](https://discord.genicsblog.com) if you need some help!