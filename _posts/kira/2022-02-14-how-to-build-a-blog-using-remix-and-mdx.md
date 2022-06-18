---
layout: post
title:  "How to build a blog using Remix and MDX"
excerpt: "The guide to teach you how to build a blog using the latest javascript framework, Remix 🚀."
image: "https://user-images.githubusercontent.com/90365542/153700424-ffc22df1-7d4d-4530-983d-01eb5348807a.png"
original: "https://kirablog.hashnode.dev/build-a-blog-using-remix-and-mdx"
audioId: 3497697
category: frontend
tags: ["react", "remix"]
author: kira
permalink: /kira/how-to-build-a-blog-using-remix-and-mdx
---

Hey, folks 👋. Today we are going to build a new blog from scratch using [Remix](https://remix.run/), [MDX](https://mdxjs.com/) and [TailwindCSS](https://tailwindcss.com/)

# 🤔 What's Remix? Yet another JavaScript framework

Remix is a full-stack web framework based on web fundamentals and modern UX. It is created by the team of [React Router](https://reactrouter.com/). Remix isn't any brand new framework it had been over for a year but it was a paid framework over then but now the time had been changed and Remix is now free and open-source software 🚀.

Remix is a React-based framework that allows to you render code on the server-side. Wait for a second 🤔 Doesn't [NextJS](https://nextjs.org/) do the same thing?

Remix took the old problems but approached them in a new style 🐱‍💻.

Remix only does Server Side Rendering (SSG), no Static Site Generation (SSG), and Incremental Static Regeneration (ISR) like NextJS.

Applications which use Static Site Generation (SSG) are fast, easy to deploy but it is really hard to use dynamic data, as the pages would be re-built every time the dynamic data has been changed. In Remix, we are only doing Server Side Rendering (SSG), which is great for dynamic data but it would be hard to deploy as you would need to have an actual server to run it.

Remix is suitable for applications that have multiple pages and which depend on some sort of dynamic data

# 🛠 Setting up the project

Let's set up our project before getting started to code.

1. Create a new folder for our remix blog

   ```shell
   mkdir remix-blog
   ```

1. Navigate into that folder

   ```shell
   cd remix-blog
   ```

1. Open that folder in VSCode

   ```shell
   code .
   ```

1. Initialize remix project in that folder

   ```shell
   npx create-remix@latest
   ```

   - The path of the remix application would be `./`, as we have already created a folder of our project
   - We would be going to deploy our remix application on [Vercel](https://vercel.com)
   - We are going to be using JavaScript for this project

1. Starting a local development server

   ```shell
   npm run dev
   ```

   This would start a local development server at [localhost:3000](http://localhost:3000)

# 📁 Understanding the folder structure

The folder structure of a remix application is pretty simple.

- `api` folder contains all the backend/api code.
- `app` folder contains most of the frontend code.
  - `app/routes` folder contains the code for each route. Remix has the file-system based router similar to nextjs
- `public` folder contains the static files and assets that are served to the browser when our app is built or deployed.

# 👨‍💻 Building the project

Let's start building the blog now. Let's first clean up the `app/routes/index.jsx` file.

`app/routes/index.jsx`

```jsx
export default function Index() {
  return (
    <div style={‎{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to my blog</h1>
    </div>
  );
}
```

Remix supports the use of MDX to create a route module, which means we could create a new route using just a plain MDX file.

Let's create a new directory inside the `routes` directory called `posts` and inside that directory let's create a new file called `first-blog-post.mdx`

`app/routes/posts/first-blog-post.mdx`

```
Hey, welcome to my first blog post 👋
```

To check out your first blog post, visit [localhost:3000/posts/first-blog-post](http://localhost:3000/posts/first-blog-post)

**TADA** 🎉, we have built a basic blog within 2 minutes

![](https://imgur.com/x5a8ovB.png)

## 🙌 Adding frontmatter

The lines in the document above between the `---` are called "frontmatter"

Let's add some front matter to your first blog post page. You can think frontmatter as the metadata of that page.

You can reference your frontmatter fields through the global attributes variable in your MDX.

```
---
title: First Blog Post
---

Hey, welcome to {attributes.title} 👋
```

Let's now add metadata to our blog post's page using frontmatter.

```
---
title: First Blog Post
meta:
  title: First Blog Post
  description: ✨ WoW
---

Hey, welcome to {attributes.title} 👋
```

As you can see the title of the page has been changed

![](https://imgur.com/i8ftVOK.png)

... and the description as well

![](https://imgur.com/yuFHUf6.png)

Let's me quickly add a few blog posts

![](https://imgur.com/vI9iG0F.png)

Umm... 🤔 Our blog isn't completed yet with any kind of syntax highlighting ✨

## ✨ Adding syntax highlighting

We are going to be using [highlight.js](https://highlightjs.org/) for syntax highlighting, you could even use [prism](https://prismjs.com/).

### 🔌 About MDX plugins

We are going to achieve syntax highlighting using something called "MDX plugins". By plugins, we could manipulate the process of MDX converting into HTML.

Generally, there are two types of plugins

- Remark plugins are responsible for manipulating the process of converting MDX to markdown.

- Rehype plugins are responsible for manipulating the process of converting the markdown to HTML.

For our remix blog, we are going to be using a rehype plugin called [rehype-highlight](https://www.npmjs.com/package/rehype-highlight). To install the package using the following command:

```shell
npm install rehype-highlight
```

We need to add a bit of configuration to the `remix.config.js` file

```js
mdx: async (filename) => {
  const [rehypeHighlight] = await Promise.all([
    import('rehype-highlight').then((mod) => mod.default),
  ]);
  return {
    rehypePlugins: [rehypeHighlight],
  };
};
```

Now our `remix.config.js` file would look something like this:

```js
/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'api/_build',
  ignoredRouteFiles: ['.*'],
  mdx: async (filename) => {
    const [rehypeHighlight] = await Promise.all([
      import('rehype-highlight').then((mod) => mod.default),
    ]);
    return {
      rehypePlugins: [rehypeHighlight],
    };
  },
};
```

### 🧾 Creating a layout file

Now we have created a layout file, where we would import one of the highlight.js's styling. I would be using night owl style, you could choose your style from highlight.js's [style demo page](https://highlightjs.org/static/demo/)

To create a layout file for our blog posts, we have created a new file with the same name as the folder name (`posts`) and the same level of the `posts` folder.

![](https://imgur.com/MtEUjC0.png)

Now we have to import the night owl theme into our layout file and use that as well.

```jsx
import styles from 'highlight.js/styles/night-owl.css';
import { Outlet } from 'remix';

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export default function Posts() {
  return <Outlet />;
}
```

In remix, we have the links function is similar to the links tag in HTML.

> PS: If you are a VSCode user then install this [remix run snippets extension](https://marketplace.visualstudio.com/items?itemName=amimaro.remix-run-snippets) 🚀.

Now let's restart our local development server.

**TADA** 🎉, we have this wonderful syntax highlighting for our code blocks in our blog now

![](https://imgur.com/brpUvDo.png)

## 🎨 Adding TailwindCSS Typography

Right now our blog has syntax highlight but the font isn't looking great 🤔 and there is nothing great than [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) plugin to automatically styles our entire page's using a single `prose` class.

### 📦 Installing dependencies

We need a few dependencies for us to use tailwindcss and tailwindcss's typography plugin.

Those dependencies are:

- [Concurrently](https://www.npmjs.com/package/concurrently): Concurrently allows you to run multiple commands in a single terminal, so we can watch and build our tailwindcss styles as well as our entire remix application in a single terminal session

Let's install all of them:

```shell
npm install -D tailwindcss concurrently @tailwindcss/typography
```

### ⚙ Configuring TailwindCSS

Create a new file named `tailwind.config.js`, this file would contain all the configurations for tailwindcss.

Add the following configuration to the `tailwind.config.js` file

`tailwind.config.js`

```js
module.exports = {
  mode: 'jit',
  purge: ['./app/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
```

We would have to change the scripts in `package.json`

```json
  "scripts": {
    "build": "npm run build:css && remix build",
    "build:css": "tailwindcss -o ./app/tailwind.css",
    "dev": "concurrently \"npm run dev:css\" \"remix dev\"",
    "dev:css": "tailwindcss -o ./app/tailwind.css --watch"
  },
```

Importing tailwindcss into the `app/root.jsx` file

`app/root.jsx`

```jsx
import styles from './tailwind.css';

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
```

Let's restart our server and run the `npm run dev` command

You would see an error saying that

```
app/root.jsx:9:19: error: Could not resolve "./tailwind.css
```

![](https://imgur.com/iHGXcv1.png)

This occurred because there is no `tailwind.css` file but you would see that the file is been created. If in your case the file didn't create then create a new file named `tailwind.css` in the `app` directory and copy and paste the CSS from this gist, https://gist.github.com/Kira272921/4541f16d37e6ab4d278ccdcaf3c7e36b

### 💻 Using @tailwindcss/typography plugin

Let's open the `app/routes/posts.jsx` file and add few styling.

> As `app/routes/posts.jsx` file is the layout file for all the blog posts, if few add any kind of styling then it would reflect in the blog posts pages

```jsx
return (
  <div className='flex justify-center'>
    <div className='prose lg:prose-xl py-10'>
      <Outlet />
    </div>
  </div>
);
```

Here are using the `@tailwindcss/typography` plugin

**TADA** 🎉. Look how beautiful the blog posts are looking now

![](https://imgur.com/v84Sreb.png)

## 📰 Creating a list of articles

Let's create a list of articles on the main page (aka root route).

In remix, you could import the entire mdx module as well as the attributes within them.

`app/index.js`

```jsx
import * as firstPost from './posts/build-a-cli-using-nodejs.mdx';
import * as secondPost from './posts/build-a-rest-api-using-nodejs.mdx';
```

The below function would return the slug (the file name, without the `.mdx`) with the markdown attributes

`app/index.jsx`

```jsx
function postFromModule(mod) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ''),
    ...mod.attributes.meta,
  };
}
```

In remix, we use a loader function to load data on the server-side

`app/index.jsx`

```jsx
export const loader = () => {
  return [postFromModule(firstPost), postFromModule(secondPost)];
};
```

Here we are loading each of our MDX modules on the server-side using the loader function

Finally, our `app/index.jsx` would look something like this

```jsx
import { Link, useLoaderData } from 'remix';
import * as firstPost from './posts/build-a-cli-using-nodejs.mdx';
import * as secondPost from './posts/build-a-rest-api-using-nodejs.mdx';

function postFromModule(mod) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ''),
    ...mod.attributes.meta,
  };
}

export const loader = () => {
  return [postFromModule(firstPost), postFromModule(secondPost)];
};

export default function BlogIndex() {
  const posts = useLoaderData();
  return (
    <div className='prose lg:prose-xl py-10 pl-10'>
      <h2>Articles</h2>
      <div className='flex justify-center'>
        <ul>
          {posts.map((post) => (
            <li key={'posts/' + post.slug}>
              <Link to={'posts/' + post.slug}>{post.title}</Link>
              {post.description ? (
                <p className='m-0 lg:m-0'>{post.description}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

This is how our main page looks 🚀
![](https://imgur.com/pmTnI47.png)

## 🚀 Deploying to Vercel

As our application let's deploy it on vercel 🚀.

1. Initialize an empty git repository

   ```shell
   git init
   ```

1. Create a new GitHub repository

1. Push your changes to that repository

  ```shell
  git remote add origin git@github.com:Kira272921/remix-blog.git # change URL to your repo's link
  git add .
  git commit -m "feat: initial commit"
  git branch -M main
  git push -u origin main
  ```

1. If you don't have an account on vercel, create one

1. Create a new project

   ![](https://imgur.com/9wfhEQ9.png)

1. Import the remix application from our GitHub account

   ![](https://imgur.com/EMKOgOs.png)

1. Deploy the application

   ![](https://imgur.com/fgIkn2L.png)

   - If you are getting an error something like this, add a new script to `package.json`

     ```json
     "postinstall": "remix setup node"
     ```

     ![](https://imgur.com/PAG3nla.png)

The entire code for this tutorial is present on [my GitHub](https://github.com/kira272921/remix-blog).

[Here](https://remix-blog-orcin.vercel.app/) is what we have built today 🚀

### 🧑 About the author

- [Portfolio](https://kiradev.co)
- [Github](https://github.com/kira272921)

So that's it for this blog post folks 🤞. Meet y'all in the next blog.