---
layout: post
title:  "15 less-known and underrated HTML tags for web developers"
excerpt: "There are a few lesser-known HTML attributes that are easy to learn and can help you to achieve common tasks, which would otherwise be fulfilled using some external libraries."
image: "https://abhiraj-is.super-cool.xyz/unknown-html-tags.png"
hasCode: true
category: web
tags: ["web-development", "tips", "beginners"]
author: abhiraj
---

HTML may not be a programming language per se, but there's no doubt in the power it possesses. We often depend on external libraries for many tasks but that ends today.

Today, we'll discuss about 15 HTML tags you probably did not know but you need to know for sure.

## 1️. Autofocus

This tag specifies whether the browser is allowed to aid in the filling out of form fields such as email, phone numbers, nationality, and so on.
```html
<input name="credit-card-number" id="credit-card-number" autocomplete="off">
```
You can check out all the autocomplete values from [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)


## 2️.  Download

This tag specifies that the file/object will be downloaded when the user clicks on the hyperlink.
```html
<a href="document.pdf" download>Download PDF</a>
```

## 3. Contenteditable

This tags allows the user to edit the content of an element.
```html
<div contenteditable="true">
  Edit this text
</div>
```

## 4. Read-only

This tag specifies that an input field is read-only.

```html
<input type="text" id="sports" name="sports" value="golf" readonly>
```

A user can still highlight it, and copy the text. To forbid those actions, use the **disabled** tag, instead.

## 5. Accept

This tag states which input file types are allowed.

```html
<input type="file" accept=".jpg, .png">
```

Only used with file type of the <input> tag. To allow all files of specific media type, use accept="image/*".

## 6. Autofocus

This tag indicates that the particular element should be focused on page load.
```html
<input type="text" autofocus>
```
Only one element in the document or dialog may have the autofocus attribute. If applied to multiple elements only the first one will receive focus.

## 7. Hidden

This tag specifies whether or not the element is visible.
```html
<p hidden>This text is hidden</p>
```

## 8. Spellcheck

This tag defines whether the element is checked for spelling errors.
```html
<p contenteditable="true" spellcheck="true">Cehck mai spellnig</p>
```

## 9. Controls

This tag specifies whether or not the audio/video controls should be displayed on the default player.

```html
<audio controls
<source src="track.mp3"  type="audio/mpeg">
</audio>
```

## 10. Autoplay

This tag ensures that the audio/video will automatically start playing as soon as it is loaded.
```html
<video autoplay
src="https://cdn.mysite.com/media/myvideo.mp4"
poster="image.png">
</video>
```

## 11. Cite

This tag points to where the content is taken from, or referred.

```html
<blockquote cite="https://genicsblog.com/">
  <p>An awesome publication</p>
</blockquote>
```

## 12. Datetime

This tag specifies the date and time when the text was deleted/inserted.

```html
<p>
  My plans for 2023 include joining Google,
  <del datetime="2021-01-01T18:21">creating 6 courses,</del> 
  <ins datetime="2021-02-02T14:07">writing 12 articles.</ins>
</p>
<p>I will evaluate the completion on <time datetime="2021-12-31"></time>.</p>
```

## 13. Async

This tag ensures the script is executed asynchronously with the rest of the page.

```html
<script src="script.js" async></script>
```
The async attribute has an effect on external scripts only.

## 14. Defer

This tag ensures the script is executed when the page has finished parsing.
  
```html
<script src="script.js" defer></script>
```
  
## 15. Inputmode

This tag hints at the type of data that might be entered by the user while editing the element or its contents.
```html
<input type="text" inputmode="url" />
<input type="text" inputmode="email" />
<input type="text" inputmode="numeric" />
```

### Thanks for reading!

Hope I was able to help you learn about HTML more and shared some knowledge with you.

If you liked this post, subscribe to my [newsletter](https://abhirajbhowmick.substack.com) to never miss out on [my blogs](https://abhiraj.co), product launches, and tech news, and follow me on [Twitter](https://twitter.com/rainboestrykr) for daily threads on web dev resources.

