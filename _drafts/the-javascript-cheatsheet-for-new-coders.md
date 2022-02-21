---
layout: post
title:  "A newbie's cheatsheet for Javascript"
excerpt: "The go-to super guide for beginner coders learing Javascript"
image: "https://abhiraj-is.super-cool.xyz/javascript-cheatsheet.png"
hasCode: true
category: web
tags: ["javascript", "web-development", "beginners"]
author: abhiraj
---

JavaScript forms the foundation of almost everything you see on the web. So, with web development on the rise in 2022 and it being the base of thousands of popular frameworks, it's a good one to learn.

## Basics

1️⃣ Include JS code in a HTML page

```html
<script type="text/javascript">

//JS code here

</script>
```

2️⃣ Call an external JS file

```html
<script src="thematrix.js">
</script> 
```

3️⃣ Include comments

```js
// Single line comment //
```

```js
/*
Multi line comment
*/
```

## Data types

1️⃣ Numbers

```js
var age = 23
```
2️⃣ Variables

```js
var x
```
3️⃣ Text strings

```js
var x = "Hacker"
```
4️⃣ Operations

```js
var sum = 1+9
```

5️⃣ True/False (Boolean)

```js
var x = true
```

6️⃣ Constant Values

```js
const x = 420
```

7️⃣ Objects

```js
var name = {firstname:"Abhiraj" , lastname:"Bhowmick"}
```

## Variables

1️⃣ var

The most common variable. Can be reassigned but can only be accessed inside a function.
Variables defined with var move to top when code is executed.

2️⃣ const

Cannot be reassigned and are not accessible before they appear within the code.

3️⃣ let

Similar to const but let variable can be re-assigned but not re-declared

## Operators

1️⃣ Logical Operators

&& - logical and

|| - logical or

! - logical not

2️⃣ Arithmetic Operators

+ - Addition
(-) - Subtraction
* - Multiplication
** - Exponentiation (ES2016)
/ - Division
% - Modulus (Division Remainder)
++ - Increment
(--) - Decrement

3️⃣ Comparison Operators

== - equal to
=== - equal value and equal type
!= - not equal
!== - not equal value or not equal type
> - greater than
< - less than
>= - greater than or equal to
<= - less than or equal to
? - ternary operator

4️⃣ Bitwise Operators

& - AND	
| - OR
~ - NOT	
^ - XOR	
<< - left shift
>> - right shift	
>>> - unsigned right shift

## Arrays

```js
var fruit = ["Apple", "Berries"]
```
1️⃣ concat() - Join several arrays into one

2️⃣ indexof() - Returns the first position at which a given element appears in an array

3️⃣ join() - Combine elements of an array into a single string and return the string

4️⃣ lastindexof() - Gives the last position at which a given element appears in an array

5️⃣ pop() - Removes the last element of an array

6️⃣ push() - Add a new element at the end

7️⃣ reverse() - This method reverses the order of the array elements.

8️⃣ sort() - Sorts the array elements in a specified manner.

9️⃣toString() - Converts the array elements to a string.

🔟 valueOf() - returns the relevant Number Object holding the value of the argument passed

## Dates

Date object is used to get the year, month and day. It has methods to get and set day, month, year, hour, minute, and seconds.

```js
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

click
```js
element.addEventListener('click', ()=>{
// Fired when an element is clicked
});
```
oncontextmenu
```js
element.addEventListener('contextmenu', ()=>{
// Fired when an element is right-clicked
});
```
dblclick
```js
element.addEventListener('dblclick', ()=>{
// Fired when an element is double-clicked
});
```
mouseenter
```js
element.addEventListener('mouseenter', ()=>{
// Fired when an element is entered by the mouse arrow
});
```
mouseleave
```js
element.addEventListener('mouseleave', ()=>{
// Fired when an element is exited by the mouse arrow
});
```
mousemove
```js
element.addEventListener('mousemove', ()=>{
// Fired when the mouse is moved inside the element
});
```
### Keyboard Events

keydown
```js
element.addEventListener('keydown', ()=>{
// Fired when the user is pressing a key on the keyboard
});
```
keypress
```js
element.addEventListener('keypress', ()=>{
// Fired when the user presses the key on the keyboard
});
```
keyup
```js
element.addEventListener('keyup', ()=>{
// Fired when the user releases a key on the keyboard
});
```

### Thank you for reading

If you liked this post, subscribe to my [newsletter](https://abhirajbhowmick.substack.com) to never miss out on my blogs, product launches, and tech news, and follow me on [Twitter](https://twitter.com/rainboestrykr) for daily threads on web dev resources.

