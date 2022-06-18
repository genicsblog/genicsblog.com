---
layout: post
title:  "A newbie's cheatsheet for Javascript"
excerpt: "This is the go-to super guide/cheatsheet for beginner coders learing Javascript"
image: "https://user-images.githubusercontent.com/46792249/158066053-34b1c462-70cb-4054-be5a-02a56d9df49c.png"
audioId: 3803231
category: web
tags: ["web-development", "beginners"]
author: abhiraj
permalink: /abhiraj/the-javascript-cheatsheet-for-new-coders
---

JavaScript forms the foundation of almost everything you see on the web. So, with web development on the rise in 2022 and it being the base of thousands of popular frameworks, it's a good language to learn!

This is the ultimate beginner cheatsheet for Javascript. It's a collection of useful snippets and tips to help you get started with Javascript.

## Basics

### 1. Include JS code in a HTML page

```html
<script type="text/javascript">

//JS code here

</script>
```

### 2. Call an external JS file

```html
<script src="thematrix.js">
</script> 
```

### 3. Include comments

```javascript
// Single line comment
```

```javascript
/*
Multi line comment
*/
```

## Data types

### 1. Numbers

```javascript
var age = 23
```
### 2. Variables

```javascript
var x
```

### 3. Text strings

```javascript
var x = "Hacker"
```

### 4. Operations

```javascript
var sum = 1 + 9
```

### 5. True/False (Boolean)

```javascript
var x = true
```

### 6. Constant Values

```javascript
const x = 420
```

### 7. Objects

```javascript
var name = {
  firstname: "Abhiraj",
  lastname: "Bhowmick"
}
```

## Storing data

### 1. `var`

This is the most common way to store data. `var`s can be reassigned but can only be accessed inside a function.

Variables defined with `var` move to top when code is executed.

### 2. `const`

`const` values cannot be reassigned and are not accessible before they appear within the code.

### 3. `let`

`let` is similar to `const` but let variable can be re-assigned but not re-declared

## Operators

### 1. Logical Operators

`&&` : logical and

`||` : logical or

`!` : logical not

### 2. Arithmetic Operators

`+` : Addition

`-` : Subtraction

`*` : Multiplication

`**` : Exponentiation (ES2016)

`/` : Division

`%` : Modulus (Division Remainder)

`++` : Increment

`--` : Decrement

### 3. Comparison Operators

`==` : equal to

`===` : equal value and equal type

`!=` : not equal

`!==` : not equal value or not equal type

`>` : greater than

`<` : less than

`>=` : greater than or equal to

`<=` : less than or equal to

`?` : ternary operator

### 4️. Bitwise Operators

`&` : AND

`|` : OR

`~` : NOT

`^` : XOR

`<<` : Left shift

`>>` : Right shift

`>>>` : Unsigned right shift

## Array Functions

```javascript
var fruit = ["Apple", "Berries"]
```

1. `concat()` : Join several arrays into one

2. `indexof()` : Returns the first position at which a given element appears in an array

3. `join()` : Combine elements of an array into a single string and return the string

4. `lastindexof()` : Gives the last position at which a given element appears in an array

5. `pop()` : Removes the last element of an array

6. `push()` : Add a new element at the end

7. `reverse()` : This method reverses the order of the array elements.

8. `sort()` : Sorts the array elements in a specified manner.

9. `toString()` : Converts the array elements to a string.

10. `valueOf()` : returns the relevant Number Object holding the value of the argument passed

## Dates

Date object is used to get the year, month and day. It has methods to get and set day, month, year, hour, minute, and seconds.

```javascript
getDate() // Returns the date from the date object

getDay() // Returns the day from the date object

getHours() // Returns the hours from the date object

getMinutes() // Returns the minutes from the date object

getSeconds() // Returns the seconds from the date object

getTime() // Returns the time from the date object
```

## Input Device Events

### Mouse Events
Any change in the state of an object is referred to as an Event. With the help of JS, you can handle events, i.e., how any specific HTML tag will work when the user does something.

`click`
```javascript
element.addEventListener('click', () => {
// Fired when an element is clicked
});
```

`oncontextmenu`
```javascript
element.addEventListener('contextmenu', () => {
// Fired when an element is right-clicked
});
```

`dblclick`
```javascript
element.addEventListener('dblclick', () => {
// Fired when an element is double-clicked
});
```

`mouseenter`
```javascript
element.addEventListener('mouseenter', () => {
// Fired when an element is entered by the mouse arrow
});
```

`mouseleave`
```javascript
element.addEventListener('mouseleave', () => {
// Fired when an element is exited by the mouse arrow
});
```

`mousemove`
```javascript
element.addEventListener('mousemove', () => {
// Fired when the mouse is moved inside the element
});
```

### Keyboard Events

`keydown`
```javascript
element.addEventListener('keydown', () => {
// Fired when the user is pressing a key on the keyboard
});
```

`keypress`
```javascript
element.addEventListener('keypress', () => {
// Fired when the user presses the key on the keyboard
});
```

`keyup`
```javascript
element.addEventListener('keyup', () => {
// Fired when the user releases a key on the keyboard
});
```

### Thank you for reading

If you liked this post, subscribe to my [newsletter](https://abhirajbhowmick.substack.com){:rel="dofollow"} to never miss out on my blogs, product launches, and tech news, and follow me on [Twitter](https://twitter.com/rainboestrykr) for daily threads on web dev resources!
