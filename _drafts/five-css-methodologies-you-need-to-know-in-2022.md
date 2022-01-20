---
layout: post
title:  "5 CSS methodologies you need to know in 2022 "
excerpt: "CSS methodogies author CSS in a way that allows us to develop, maintain and scale the front-end as a set of small, isolated modules."
image: "https://digitalleadgroup.com/wp-content/uploads/2020/10/Android-app-development-cost-1.png"
languages: ["CSS", "Javascript"]
category: web
tags: ["web-development", "beginners", "CSS"]
author: abhiraj
---

In large, complicated, rapidly-iterated systems, CSS is notoriously difficult to maintain. The lack of a built-in scoping mechanism in CSS is one of the reasons. In CSS, everything is global. Until CSS gets its native scoping mechanism, we need to devise our own system for locking down styles to specific sections of an HTML document. CSS methodologies are the solution.
  
In this article, we will take a look at the CSS methodologies you need to know in 2022


## 1️⃣ [Object-oriented CSS](http://oocss.org/)

OOCSS concepts help us write components that are flexible, modular and interchangeable.

Example:
The style of your button elements might be set via two classes that you have given the class of:

- .button — provides the button’s basic structure
- .grey-btn — applies colors and other visual propertie

CSS:
```css
.button { box-sizing: border-box; height: 50px; width: 100%; } .grey-btn { background: #EEE; border: 1px solid #DDD; box-shadow: rgba(0, 0, 0, 0.5) 1px 1px 3px; color: #555; }
```
HTML:
```html
<button class="button grey-btn">
```


## 2️⃣ [Atomic CSS](https://acss.io/)

Atomic CSS is the approach to CSS architecture that favors small, single-purpose classes with names based on visual function.

Example:

Colors are set using hexadecimal values. Alpha transparency is created by appending the opacity value to the hex color.

```html
<div class="Bgc(#0280ae.5) C(#fff) P(20px)">
    Lorem ipsum
</div>
```

## 3️⃣ [BEM](http://getbem.com/)

Block Element Modifier is a methodology that helps you to create reusable components and code sharing in front-end development.

Example:

```html
<form class="loginform loginform--errors"> <label class="loginform__username loginform__username--error"> Username <input type="text" name="username" /> </label> <label class="loginform__password"> Password <input type="password" name="password" /> </label> <button class="loginform__btn loginform__btn--inactive"> Sign in </button> </form>
```
The .loginform class is the block. The .loginform block is composed of three elements:

| Element                      | Purpose              |   
|------------------------------|----------------------|
| loginform__username	         | Take in the username |   
| loginform__password          | Take in the password |   
| loginform__btn               | Allow the user to submit the web form |   


## 4️⃣ [SMA CSS](http://smacss.com/)

SMACSS is a way to examine your design process and as a way to fit those rigid frameworks into a flexible thought process.

Example:
Let’s say our layout is called .l-footer. We have a search form module inside it. The search form has already been submitted at least once by the user.

```html
<section class="l-footer"> <form class="search is-submitted"> <input type="search" /> <input type="button" value="Search"> </form> </section>
```

## 5️⃣ [Systematic CSS](https://www.yumpu.com/en/document/read/47573458/systematic-css)

Systematic CSS shares many of the principles and ideas you can find in OOCSS, BEM, SMACSS, SUIT CSS, and other CSS methodologies. Systematic CSS is meant to be a simpler alternative to existing CSS methodologies. 

Example:

Here’s the markup for two widgets that render a navigation bar and search form:

```html
<!-- navigation bar --> <div class="NavBar"> <ul> <li><a href="./">Home</a></li> <li><a href="about.html">About</a></li> <li><a href="learn/">Learn</a></li> <li><a href="extend/">Extend</a></li> <li><a href="share/">Share</a></li> </ul> </div> <!-- search form --> <div class="SearchBox"> <form action="search.html" method="get"> <label for="input-search">Search</label> <input name="q" type="search" id="input-search" /> <button type="submit">Search</button> </form> </div>
```
Content — in the form of widgets and naked HTML elements — is then placed within the layout. Finally, modifier classes are added to vary the default presentation of things.

## Conclusion

By providing a class-based approach for dividing up large web designs into many small, modular, distinct components, all CSS techniques address the scalability and maintainability challenge in CSS. Each UI module can be reused throughout a design and even ported from one project to the next if the CSS methodologies are the same. CSS approaches do a lot more than just solving the CSS scalability issue.

### Thank you for reading

If you liked this post, subscribe to my newsletter to never miss out on my blogs, product launches, and tech news.

[Abhiraj's Dev-letter](https://newsletter.abhiraj.co)

