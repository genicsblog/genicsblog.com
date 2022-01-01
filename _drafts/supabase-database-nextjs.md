---
layout: post
title:  "Get Started with Supabase Database in Next.JS!"
excerpt: "All you need to setup a supabase database and work with it in Next.JS!"
image: "https://raw.githubusercontent.com/kr-anurag/kr-anurag/main/q4bZT4PyR.jpg"
category: web
tags: ["web-development", "next-js", "supabase"]
languages: ["shell", "javascript"]
author: anurag
---


🙋‍♂️Hello Everyone

![hello-gif](https://media.giphy.com/media/Nx0rz3jtxtEre/giphy.gif)

## In this blog post, we're gonna Get Started with Supabase Database in NextJS!
**One of the coolest things about Supabase is its database and for building full-stack apps, we all like to use NextJS, so in this tutorial, I'm gonna show you how can we integrate the two!**

## Why choose Supabase

In case you don't know about Supabase Database, here are a few points to catch up on!

- It's free to use and follows the *pay as you go, model,*
- The free version provides unlimited read and write requests!
- The free version contains 500 MB of space
- It's a SQL Based database
- It is one of the easiest databases to get started with!

So, let's jump right in!

## What we're building today:
[Demo](https://www.loom.com/share/d39e39db3c634b3d8ed2df61b554de69)

First, you need to set up a project in [Supabase](https://supabase.io/), you can go to their official website and create a free project! In case you don't have an account there, you need to make an account there.

Go to Supabase, and click on create a new Project, choose a name and a password, and you're good to go!

![Screenshot (296).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1638968211764/oCcXRuJLU.png)

Next up, create a new table in the database named *responses*

![Screenshot (298).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1638970345348/cit4t6yG2.png)

![Screenshot (299).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1638970419288/_mdgg2ZU6.png)

Now, let's jump to the coding part! 
So, we're using NextJS for this demo, and I'm using Tailwind as my UI preference. But you can use your preferred UI Framework as your preference!

```shell
npx create-next-app -e with-tailwindcss supabase-demo
``` 

Now, we're gonna make a simple form. 
For this demo, you can just use the *index.js* file. Clear up the boilerplate code.

Now, we're gonna make a simple form!

First, make the main div and align its children to the center using flexbox

```javascript
<div className="min-h-screen min-w-screen bg-purple-500 flex justify-center items-center">
</div>
``` 

Now, we can add input fields and a submit button:


```javascript
<div className="min-h-screen min-w-screen bg-purple-500 flex justify-center items-center">
  <form className="p-8 bg-white shadow rounded flex flex-col justify-center items-center">
    <input
      type="text"
      className="m-2 outline-none py-2 px-4 border-2 border-black-200 rounded focus:border-blue-400 text-black-300 text-xl"
      placeholder="Your Name"
    />

    <input
      type="text"
      className="m-2 outline-none py-2 px-4 border-2 border-black-200 rounded focus:border-blue-400 text-black-300 text-xl"
      placeholder="Your Email"
    />

    <button className="m-1 p-2 bg-green-500 text-white font-medium text-xl grid place-items-center rounded">
      Submit
    </button>
  </form>
</div>;
``` 

Now, we are gonna use hooks to get the input values:

First, let's make two variables using the *useState* hook

```javascript
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
``` 

Now, we will assign these values to the input fields and update them if the value changes. We can do this using the onChange event.

```javascript
  <input
    type="text"
    className="m-2 outline-none py-2 px-4 border-2 border-black-200 rounded focus:border-blue-400 text-black-300 text-xl"
    placeholder="Your Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <input
    type="text"
    className="m-2 outline-none py-2 px-4 border-2 border-black-200 rounded focus:border-blue-400 text-black-300 text-xl"
    placeholder="Your Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
``` 

So now, you should have a simple form that looks like this:

![Screenshot (304).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1639054552792/fcufKw4gE.png)

Now, we will work on the database part, first, we will install *supabase-js* 


```shell
npm install @supabase/supabase-js     # for npm
yarn add @supabase/supabase-js     # for yarn
``` 

Now, we need to initialize supabase, go to the project dashboard on supabase, and get your keys from there. Then, follow along:

```javascript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "<your_project_url_here>",
  "<your_public_anon_key_here>"
);

``` 

Now, let's make a function to handle form submit.
We are gonna structure the form data in a new variable:


```javascript
const handleSubmit = async () => {
  const form = {
    name: name,
    email: email,
  };
};

``` 

Now, we're going to upload the form data to Supabase Database!
Here's how we're gonna do it:


```javascript
const handleSubmit = async () => {
  const form = {
    name: name,
    email: email,
  };

  const { data, error } = await supabase
    .from("responses")
    .insert([{ response: form }]);

  error ? console.log(error) : console.log(data);
};

``` 

**And, That's it!!**
**Now, you can fill the form and submit it to see the data update in the database!**

![well-done!](https://media.giphy.com/media/11F0d3IVhQbreE/giphy.gif)
