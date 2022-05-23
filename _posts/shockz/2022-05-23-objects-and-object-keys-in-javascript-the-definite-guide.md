---
layout: post
title: "Objects and Object Keys in JavaScript: The Definite Guide"
excerpt: "The complete beginner's guide to objects and object keys in javascript for web development."
image: "https://user-images.githubusercontent.com/46792249/169762706-0a457425-f5e5-49a9-9888-d963b8ba26c7.jpg"
hasCode: true
audioId: 4237242
category: web
tags: ["beginners", "javascript", "web-development"]
author: shockz
---

## Learn about Object Keys in JavaScript

Have you ever wondered how to use object keys in JavaScript? If so, then here is a quick tutorial on how to use object keys in JavaScript. Do not worry if you don't know anything about objects yet, this blog covers that as well!

## What are Javascript Objects?

Objects are one of the eight data types in javascript. They are used to store various kinds of complex data in a key-value collection pair.

Here's a simple example on how to create an empty object in JavaScript:

```javascript
let obj = new Object();

let obj = {}; // same as above
```

![image](https://cdn.discordapp.com/attachments/939202528392921198/977942194751172628/unknown.png)

## **Basic Objects**

The Objects data structure stores data in key-value pairs. Each pair is called a "property" of the object.

A property is defined using the notation `key: value`. Here, the `value` can be any data type or even a javascript function (more on this later).

Here's a visual representation of an object:

![image](https://media.discordapp.net/attachments/954717163808251924/976340109353975828/unknown.png)

An Object is created using curly (`{}`) brackets and its properties and values are separated by a `,` inside.

```javascript
let obj = {
    name: "John", // string property
    age: 30, // number propery
    isAdmin: true // boolean property
};
```

## Object Keys

Here in the above example, `obj` is the name of the object and it has 3 properties or `keys`: `name`, `age` and `isAdmin`.

## Object Values

The object `obj` contains 3 keys and each of them stores some data known as `value`.

### Pro Tip

You can even assign a function to a value in an object.

```javascript
let obj = {
    name: "John",
    age: 30,
    isAdmin: true,
    sayHi: function() {
        alert("Hello");
    }
};

obj.sayHi(); // executes the sayHi() function and alerts "Hello"
```

This comes in handy when you want to execute a function on similar kinds of objects when a certain event happens!

Let's get our hands dirty and look at how to define, access and modify data in an object using **Dot Notation** and **Bracket Notation** in JavaScript.

## Dot Notation in detail

As we have seen how to declare objects in javascript, how do you think objects are even a bit helpful if we can't modify the data inside the objects at runtime?

That's where **Dot Notation** comes in. Let's look at how we can access and modify data in an object using Dot Notation.

### Adding a key to a javascript object at runtime

Let's look at how to add a new property to an object using the dot notation:

```javascript
let obj = {};

obj.newKey = "newValue"; // add a new key-value pair to obj using dot notation

console.log(obj.newKey); // outputs newValue
```

Here, we declare an empty object `obj` and then add a new key and value pair to the object using dot notation. It's as simple as that!

### Deleting a key with Dot Notation

You can delete a property of an object using the `delete` keyword:

```javascript
delete obj.newKey; // now newKey doesn't exist in obj object
```

### Checking if a key exists with Dot Notation:

```javascript
if ("newKey" in obj) {
    alert("newKey exists");
}
```

Using this code, if the `newKey` key is present in `obj`, an alert saying "newKey exists" would be shown.

## Bracket Notation

**Bracket Notation** is another way to access and modify object properties but it is a bit different from Dot Notation. 

In Dot Notation, the keys we want to access/modify are known at the run time, but in Bracket Notation, they can be both static and dynamic.

This means the keys can be loaded from another source to be used at runtime using the Bracket Notation.

Now let's see how to do different things with Bracket Notation.

### Accessing a key's value with Bracket Notation

You can define a string and pass in the string to the bracket notation to access the value of the key:

```javascript
let obj = {
    lion: "roar",
    dog: "bark"
};

let cat = "lion";

console.log(obj[cat]); // outputs "roar"
```

### Defining a key and value with Bracket Notation

```javascript
let obj = {};

obj["newKey"] = "newValue";

alert(obj["newKey"]); // newValue
```

The above code adds a new property named `newKey` with the value `newValue` to the object named `obj`.

Later, you can access the value of the key like this:

```javascript
alert(obj["newKey"]);
```

Let's see one more example but with the access key being calculated at the runtime:

```javascript
let boy = {
    name = "Jeremy",
    age = "69"
};

let key = prompt("What do you want to know about boy?");

alert(boy[key]);
```

As you can see accessing a key with bracket notation is a bit different than dot notation, but it is still a good way to access properties of objects the keys are dynamic.

### Deleting a key with Bracket Notation

```javascript
delete obj["newKey"];
```

With this, the property named `newKey` ceases to exist in the `obj` object.

### Check if a key exists with Bracket Notation:

```javascript
if("newKey" in obj) {
    alert("newKey exists");
}
```

### Computed Properties in Square Brackets

While creating an object we can use square brackets

```javascript
let prompt = prompt("What do you want to buy?", "MacBook");

let products = {
    [prompt]: 1000 // the name of this property is taken from the variable prompt
};

alert(products.MacBook) // 1000 if product = Macbook
```

The same thing can be achieved by the code below:

```javascript
let prompt = prompt("What do you want to buy", "MacBook");

let products = {};
products[prompt] = 1000;

alert(products.MacBook)
```

Personally, I like Dot notation because it is easier to read and understand.

### Property Naming Limitations - NO!

As you know, in javascript and many other programming languages, a variable cannot have a name that is a reserved word like- `return`, `var`, `const`, `let`, etc. But there is no such restriction like this in object property!

```javascript
let obj = {
    return: 2,
    const: 5,
    let: 10,
    var: 15
};

console.log(obj.return); // outputs 2

console.log(obj.const + obj.let + obj.var); // outputs 30
```

> ### Important Note
>
> When you use a number like `0` as a property key, it gets converted to a string that is `"0"`.

## Testing if a Property in an object exists or not

If a property doesn't exist in an object, it will return `undefined`:

```javascript
let obj = {};

console.log(obj.abcd); //outputs undefined in the console
```

For making it easier, you can use the **in** notation to check if a property exists in an object as well:

```javascript
let obj = {};

console.log("year" in obj); //outputs false, year key doesn't exist in the object obj
```

## The `for ... in ...` loop

To loop over all keys/properties of an object, there exists a special kind of `for` loop:

```javascript
let obj = {
    name: "John",
    age: 30
};

for(key in obj){
    console.log(key); //will log name and age
}

for(key in obj){
    console.log(obj[key]); //will log John and 30
}
```

> ### Note
>
> These are not ordered in the same order we wrote them in the object, there exists a special order.
>
> For example, integer properties are according to their value in ascending order:
> 
> ```javascript
> let obj = {
>     30: "hi",
>     69: "okay",
>     42: "bye"
> }
> 
> for(key in obj){
>     console.log(key); // logs 30, 42, 69
> }
> ```
>
> Non-Integer Properties are logged in the order they are added to the object.

## Useful Information

You can use the `Object.keys()` method to get the names of all the keys in an object:

```javascript
let obj = {
    name: "John",
    age: 30
};

console.log(Object.keys(obj));
```

This logs an `Array` which contains the strings `name` and `age` to the console.

## Conclusion

In this tutorial, we learned about javascript objects, keys, Dot and Bracket Notation and many other useful things.

You can use all these things in your future projects according to your preference.

I hope you liked this tutorial. Do share it with your friends who are exploring and learning javascript!
