---
layout: post
title:  "How I prefer to structure my Next.js projects"
excerpt: "A look into how Anurag prefers to maintain and scale his projects built with Next.js + some tips!"
image: "https://res.cloudinary.com/ddum5vpp3/image/upload/v1644217454/Frame_2_rbhlxk.png"
audioId: 3468610
category: web
tags: ["next-js", "web-development", "tips"]
author: anurag
original: "https://blog.anurag.tech/how-i-structure-my-next-js-projects"
permalink: /anurag/how-i-prefer-to-structure-my-next-js-projects
redirect_from: /anurag/how-i-structure-my-next-js-projects
---

Hello folks! Today I'm going to explain how I structure my Next.js projects.

![](https://c.tenor.com/-z2KfO5zAckAAAAC/hello-there-baby-yoda.gif)

> **Note**: There is no right or wrong way to structure a Next.js project, and this is highly opinionated.

So, the structure of a Next.js project depends mainly on the complexity of a project.

If a project needs only page and is small in terms of complexity, you should not over-structure it. With that being said, let's see how to manage your project depending upon the complexity.

### 📃 Single Pages

Next.js automatically routes every file in the `pages/` directory to a name associated with the file name.

For example, the React component inside the `pages/dashboard.jsx` will be routed to `${URL}/dashboard`

For single pages, you can just create a single file that will export a React component:

`pages/index.js`

```jsx
function Home() {
  return <div>Hello world</div>;
}

export default Home;
``` 

### 🧩 Breaking down into smaller components

Now, at some point, your file will have a lot of lines, so you can make smaller standalone components:

`pages/dashboard.jsx`

```jsx
const Header = () => {
  return <header>{/* component code */}</header>;
};

const Hero = () => {
  return <div>{/* component code */}</div>;
};

function Dashboard() {
  return (
    <>
      <Header />
      <Hero />
    </>
  );
}

export default Dashboard;
``` 

### 📁 Creating custom files for components

The above example works if you have smaller components. But it is advisable to create standalone files for components.

Conventionally, components should be stored in the `components` directory at the root directory of the app:

`components/Header.jsx`:

```jsx
const Header = () => {
  return (
    <header>
      {/* some code */}
      {/* some more code */}
    </header>
  );
};

export default Header;
``` 

Then, in the desired file, you can import and use it.

`pages/index.js`:

```jsx
import Header from "../components/header.jsx";

function Home() {
  return (
    <>
      <Header />
      {/* main component */}
    </>
  );
}

export default Home;
``` 

But as your app grows, it will contain more and more components, and while importing them, the code can be a little messy.

Here's a simple workaround for this!

First, make a file inside the `components` directory named `index.js` or `index.jsx`

Then, inside the file, export all the components at once.

`components/index.js`

```jsx
export * from "./Header.jsx";
export * from "./Hero.jsx";
export * from "./Footer";
``` 

Next, you can import all the components inside your desired file at once:

`pages/index.js`

```jsx
import { Header, Hero, Footer } from "../components";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Footer />
    </>
  );
}
``` 

### 🗃 Making categories for similar components

Now, let's say you have components of similar kinds. Like the `Header` and the `Footer` component are navigation components. Similarly, you have different `Card` components that can be sorted into the Cards category.

For this, you can create different folders inside the `components` directory as this:

```
- components
    | - Navigation
        | - Header.component.jsx
        | - Footer.component.jsx
    | - Cards
        | - Confirm.card.jsx
        | - Checkout.card.jsx
``` 

### 📖 Making categories for similar pages

Back to pages, in some cases, pages can also fall into some categories. For example, the `sign-up` and `login` page falls into the auth category.

So, for that case, you can make a directory inside the `pages` directory named `auth` containing the `sign-up` and `login` pages.

```
- pages
    | - auth
        | - sign-up.jsx
        | - login.jsx
``` 

### 🗄 Storing Files, Fonts

Moving from this, the conventional way to store external files such as Images, Fonts, etc. is to store them in the public directory.

For example, you can store all the required images in the `public/assets` directory and the required fonts in the `public/fonts` directory:

```
- public
    | - assests
        | - cover.png
        | - logo.png
    | - fonts
        | - poppins-medium.woff2
        | - sen-regular.woff2
``` 

### 🔮 Managing custom hooks, types, functions

In addition to this, you can create separate folders for custom hooks, types, functions, etc.

```
- hooks
    | - useuser.jsx
- @types
    | - propTypes.ts
- utils
    | - uploadImage.js
``` 

That's a wrap for this article. If you liked this, make sure to drop some comments on this article!

### About the Author

- [Portfolio](https://anurag.tech)
- [Blog](https://blog.anurag.tech)