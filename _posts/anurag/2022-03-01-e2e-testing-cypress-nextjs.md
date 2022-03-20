---
layout: post
title:  "Basics of E2E Testing & Quickstart Cypress with Next.js"
excerpt: "Learn the basics of E2E Testing using Cypress in your Next.js app from this start guide!"
image: "https://user-images.githubusercontent.com/46792249/156170962-605f6ce9-2924-411b-8d39-888c351d0ada.png"
original: "https://blog.anurag.tech/basics-of-e2e-testing-and-integrating-cypress-with-nextjs"
hasCode: true
audioId: 3723090
category: web
tags: ["next-js", "testing"]
author: anurag
permalink: /anurag/basics-of-e2e-testing-and-integrating-cypress-with-next-js
---

## Basics of E2E Testing and Integrating Cypress with Next.js

👋 Hello fellas! It's been a while since I posted an article. 

![hello](https://media.giphy.com/media/3ornk57KwDXf81rjWM/giphy.gif)

As developers, we always want to deliver the best products to users. And Testing is a crucial part of this process. One of the commonly used testing techniques is E2E testing.

## 💡 E2E Testing - The Basics

End to End Testing (or E2E testing in short) is a technique that tests the entire software product from beginning to end to ensure the application flow behaves as expected. 

The main intent of E2E testing is to simulate the real user scenario and to test from the end user's experience.

#### 📃 Benefits of E2E Testing

- Reduced Risks
- Increased Confidence
- Reduced Cost

### ⚡ E2E testing methods

#### Horizontal E2E testing

Horizontal Testing is done from the end user's perspective. It evaluates whether the user can navigate the software and use its functions properly. It also helps to detect the bugs that might prevent the user from using some software functions.

#### Vertical E2E Testing

This method refers to testing in layers, meaning that tests happen in sequential, hierarchical order. Each subcomponent of the system is tested from start to finish to ensure quality.

It is mostly done when the system has no UI or the UI has a high level of technicality and is used to test critical components.

### ❓ How to perform E2E Testing?

- Analyze all the requirements. Have a clear idea about what the app is supposed to do.
- Set up a test environment as per the requirements.
- List down all the testing methods required to test these responses.
- Design the test cases.
- Run the tests and jot the results.

### ⚡ E2E Testing Frameworks

E2E Testing frameworks are used to ensure that all the moving parts in an application is configured properly.

Here are some of the most popular ones:

- Selenium
- Cypress
- Cucumber
- Testim

Now that you are familiar with the basic concept of E2E Testing, let's take a look at how to integrate E2E Testing using Cypress in Next.JS

## 👨‍💻 Integration of Cypress with Next.js for E2E Testing

> Now that you're familiar with the Basics of E2E Testing, let's take a look at how to get started with Cypress in Next.js

#### Next.JS

In case you are not familiar with Next.js, it's a react framework packed with some extra features to help both developers and clients.

#### Cypress

Cypress is a test runner for E2E Testing for the web.

#### Setting up the Project

You can use `create next-app` with the `cypress` example to get started quickly.

```shell
npx create-next-app@latest --example with-cypress with-cypress-app 
```

For existing projects, you can start off by installing the `cypress` package.

```shell
npm install --save-dev cypress
```

Then, add Cypress to the `scripts` section in the `package.json` file.

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "cypress": "cypress open",
}
```

Next, run cypress to generate examples that use their recommended folder structure.

```shell
npm run cypress
```

#### Creating your first Cypress integration test

Let's say you have two pages
```jsx
// pages/index.js

import Link from 'next/link'

export default function Home() {
  return (
    <nav>
      <Link href="/about">
        <a>About</a>
      </Link>
    </nav>
  )
}
```

```jsx
// pages/about.js
export default function About() {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  )
}
```

Then, to test that your navigation is working correctly:

```jsx
// cypress/integration/app.spec.js

describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="about"]').click()

    // The new url should include "/about"
    cy.url().should('include', '/about')

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('About Page')
  })
})
```

**Tip**: Instead of using `cy.visit('http://localhost:3000/')`, you can just use `cy.visit('/')` if you set the `baseUrl` to `http://localhost:3000` in the `cypress.json` config file.

```json
// cypress.json 
{
  "baseUrl": "http://localhost:3000"
}
```

At this point, you will have a simple test setup. Since Cypress is testing a real Next.js application, it requires the Next.js server to be running prior to starting cypress.

First Run `npm run build` and `npm run start`, then run `npm run cypress` in another terminal window to start Cypress.

Now, cypress will start and you can view the results.

### Further steps for Continuous Integration (CI)

At this point, you will have noticed that running Cypress so far has opened an interactive browser which is not ideal for CI environments.

You can run Cypress headlessly using the `cypress run` command. 

In the `package.json` file:

```json
// package.json

"scripts": {
  // ...
  "cypress": "cypress open",
  "cypress:headless": "cypress run"
}
```

That's it for this article! You can show your support by dropping some comments here!

**About the Author**

- [Portfolio](https://anurag.tech)
- [Blog](https://blog.anurag.tech)