---
layout: post
title:  "15 underrated HTML attributes every web developer should know"
excerpt: "There are a few lesser known HTML attributes that are easy to learn and can help you to achieve common tasks, which would otherwise be fulfilled using some external libraries."
image: "https://user-images.githubusercontent.com/46792249/153724225-aa374faa-db20-451f-9291-fcdc4db064cf.png"
audioId: 3487925
category: web
tags: ["web-development", "tips", "beginners"]
author: abhiraj
---

HTML may not be a programming language per se, but there's no doubt in the power it possesses. We often depend on external javascript libraries for some basic tasks, but need for some of them might end today!

In this article we will discuss about **15 HTML attributes** you probably did not know, but need to know for sure.

Let's get started!

## 1. Autocomplete

The `autocomplete` attributes specifies whether the browser is allowed to aid in filling out the form fields or not. If turned on, it will assist users with autofilling options such as email, phone numbers, nationality, and so on.

```html
<input name="credit-card-number" id="credit-card-number" autocomplete="off">
```

You can check out all the autocomplete values from the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete).

## 2. Download

The `download` attribute on an anchor tag specifies that the file/object should be downloaded to the local storage when a user clicks on the hyperlink.

```html
<a href="document.pdf" download>Download PDF</a>
```

## 3. Contenteditable

The `contenteditable` attribute allows the user to edit the content of an element.

```html
<div contenteditable="true">
  You can now edit this text!
</div>
```

## 4. Readonly

The `readonly` attribute specifies that an input field is read-only and can't be edited.

```html
<input type="text" id="sports" name="sports" value="golf" readonly>
```

A user can still highlight it, and copy the text. To forbid those actions, use the `disabled` attribute instead.

## 5. Accept

The `accept` attribute states which file types are allowed to be selected in the input.

```html
<input type="file" accept=".jpg, .png">
```

This attribute can only be used on an `<input>` tag with `type="file"`. To allow all files of specific media type, use an asterisk beside its name. For example, `accept="image/*"`.

## 6. Autofocus

The `autofocus` attribute indicates that the particular element should be focused on page load.

```html
<input type="text" autofocus>
```

**Note**: Only one element in the HTML document or a dialog may have the autofocus attribute. If applied to multiple elements only the first one will receive focus.

## 7. Hidden

The `hidden` attribute specifies whether or not the element is visible.

```html
<p hidden>I am invincible 💪</p>
```

## 8. Spellcheck

The `spellcheck` attribute defines whether the element is checked for spelling errors.

```html
<p contenteditable="true" spellcheck="true">Cehck mai spellnig</p>
```

## 9. Controls

The `controls` attribute specifies whether or not the audio/video controls should be displayed on the default player.

```html
<audio controls>
  <source src="rick_roll.mp3"  type="audio/mpeg">
</audio>
```

## 10. Autoplay

The `autoplay` attribute ensures that the audio/video will automatically start playing as soon as it is loaded.

```html
<video autoplay
  src="https://cdn.mysite.com/media/myvideo.mp4"
  poster="image.png">
</video>
```

## 11. Cite

The `cite` attribute is used to point out where a an element's content is taken from, or referred to.

```html
<blockquote cite="https://genicsblog.com/">
  <p>An awesome publication for developers.</p>
</blockquote>
```

## 12. Datetime

The `datetime` attribute specifies the date and time when the text was deleted/inserted.

```html
<p>
  My plans for 2023 include joining Google as a SDE,
  <del datetime="2021-01-01T18:21">creating 6 courses,</del> 
  <ins datetime="2021-02-02T14:07">writing 12 articles.</ins>
</p>
<p>I will evaluate the completion on <time datetime="2021-12-31"></time>.</p>
```

## 13. Async

The `async` attribute ensures the script is executed asynchronously with the rest of the page.

```html
<script src="https://icanheckyou.com/heckingScript.js" async></script>
```

**Note**: The `async` attribute has an effect on external scripts only.

## 14. Defer

The `defer` attribute ensures the script is executed when the page has finished parsing.

```html
<script src="https://anotherhecker.com/heckingScriptAgainCozWhyNot.js" defer></script>
```

**Note**: The `defer` attribute has an effect on external scripts only.

## 15. Inputmode

The `inputmode` attribute hints at the type of data that might be entered by the user while editing the element or its contents. It also helps the mobile browsers to display the keyboard in the appropriate mode.

```html
<input type="text" inputmode="url" />
<input type="text" inputmode="email" />
<input type="text" inputmode="numeric" />
```

### Thanks for reading!

I hope this article was able to help you learn more about HTML and share some knowledge with you.

If you liked this post, subscribe to my [newsletter](https://abhirajbhowmick.substack.com) to never miss out on [my blogs](https://abhiraj.co){:rel="dofollow"}, product launches, and tech news. Follow me on [Twitter](https://twitter.com/rainboestrykr) for daily threads on web dev resources!