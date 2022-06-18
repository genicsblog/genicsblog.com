---
layout: post
title:  "Kotlin: Multi-dimensional (2D, 3D, etc.) Array Initialization"
excerpt: "This concise tutorial explains how to declare and initialize 2D, 3D, and other multidimensional arrays in Kotlin programming language."
audioId: 4123777
image: "https://user-images.githubusercontent.com/46792249/166893523-b49fc45f-e356-45a9-a545-ac0086aa98a5.jpg"
category: coding
tags: ["kotlin", "beginners"]
author: gouravkhunger
---

At some point of time, we all have worked with arrays. It is a useful data structure to store multiple values of the same type in a single variable. Complex usage of arrays includes storing data in 2D, 3D, or other multidimensional arrays. This allows us to represent things like matrices, grids, and cubes effectively.

In this tutorial, we will specifically focus on declaring, initializing and using 2D, 3D, and other multidimensional arrays in the Kotlin programming language.

## 1D Arrays in Kotlin

### 1D Arrays with pre-defined data

Simple 1D arrays in kotlin are declared using the `arrayOf()` standard library function. It takes a list of values as an argument and returns a 1D array.

Here's an example:

```kotlin
val array = arrayOf(1, 2, 3, 4, 5)
```

This creates an array of Integer values with 5 elements: `1`, `2`, `3`, `4`, `5`.

Type declaration is optional for `arrayOf()` and this makes the array flexible. If array type isn't defined then you can store any kind of elements in the array. For example, you can use:

```kotlin
val array = arrayOf(1, "two", 3.0, true)
```

and it would work perfectly fine. You can verify this by iterating over the array and printing the values:

```kotlin
for(i in array) {
    println("$i is of type ${i::class.simpleName}")
}

/*
Output:

1 is of type Int
two is of type String
3.0 is of type Double
true is of type Boolean
*/
```

But this defeats the purpose of type-safety in Kotlin. We would not want to store a string in an array of integers. To guarantee type-safety, we declare the type of the array during initialization so that the elements of the array are ensured to be of the same type. Otherwise, they would throw an error.

To declare a type-safe 1D array in kotlin, we use `arrayOf<T>()` function where `T` is the type of the elements in the array.

For example, to declare a type-safe 1D array of integers, we use `arrayOf<Int>()`:

```kotlin
val array = arrayOf<Int>(10, 20, 30)
```

If you try to add a string to the type-safe Int array, you will get an error:

```kotlin
val array = arrayOf<Int>(10, 20, 30, "40")

/*
Doesn't even compile, error:

Type mismatch: inferred type is String but Int was expected
*/
```

It is pretty useful if you want to store data that is strongly typed.

> ### Fun Fact
> Kotlin standard library supports for functions like `intArrayOf()`, `doubleArrayOf()`, `booleanArrayOf()`, etc. to declare strongly typed arrays.

### 1D arrays with dynamic size

For lists of dynamic size, we use the function `mutableListOf()`. It works similar to `arrayOf()`, but provides us functions to perform actions on the list. Using them, we can add, remove, or modify the elements in the list without re-creating it!

**Note**: Unlike `arrayOf()`, once `mutableListOf()` automatically infers a single data type, you can't change the data type of the list. To explicitly allow for it, use `mutableListOf<Any>()` to add mixed data types to the list. If you pass in multiple data types in the constructor, the list will automatically be of type `Any`.

`mutableListOf<T>()` allows us to manually define type-safe lists.

Here are examples to declare a type-safe mutable lists with various examples:

```kotlin
val list2 = mutableListOf(10, 20, 30) // Type is inferred as Int, similar to mutableListOf<Int>()
list2 += "test" // Error, can't add a string to an Int list

val list2 = mutableListOf(10, 20, 30, true, "hehe") // Type is inferred as Any because of multiple data types
list2 += 100 // Works fine

val list3 = mutableListOf<Any>() // Type is explicitly set to Any
list3 += 10 // Works fine
list3 += "test" // That's okay too :D
list3 += true // All good!
```

Using the data present inside arrays and lists is fairly easy:

```kotlin
// The below code works for both lists and arrays

for(i in listOrArray.indices) { 
    // indices is a built-in function that returns the range of indices of the list
    // now you can use listOrArray[i] to access the elements
    print("${listOrArray[i]} ")
}

// You can also use listOrArray[number] to access the element at the given index.
```

> ### More kotlin knowledge
> Mutable lists provide a lot more functions: `get()`, `set()`, `plus`, `minus()`, etc. to modify the list.

Now, let's look at 2D array initialization and usage examples in kotlin!

## 2D Arrays in Kotlin

2D arrays are a convenient way to store grid/board/matrix type of data.

If we dig deep into Kotlin Standard Library, the function `arrayOf()` is actually returning `Array<T>` where `T` is the type of the elements in the array. This effectively means that if we pass in `T` we get out an array `Array<T>`.

This means if we pass in `arrayOf()` into the `arrayOf()` function, we effectively get out `Array<Array<T>>` and that is exactly the representation of 2D Arrays!

### 2D Arrays with pre-defined data

Let's see how to make 2D arrays with predefined values:

```kotlin
val array = arrayOf(
    arrayOf(1, 2, 3),
    arrayOf(4, 5, 6),
    arrayOf(7, 8, 9)
)
```

This creates a 2D Kotlin array which is a collection of 1D Kotlin arrays. Here's a representation of the array:

```
General Form:
[[1 2 3], [4,5,6], [7,8,9]]

As a matrix:
1 2 3
4 5 6
7 8 9
```

Again, these arrays are not type-safe. You can add another data type to the array without any issue. To make it type-safe, we need to declare the type of the array during initialization:

```kotlin
val array = arrayOf<Array<Int>>( // Declaring the type gives error if data types are mixed
    arrayOf(1, 2, 3),
    arrayOf(4, 5, 6, "this string will give error"),
    arrayOf(7, 8, 9)
)
```

### 2D arrays with dynamic size

To create 2D lists where we don't have a fixed known size, we use `mutableListOf<MutableList<T>>()` declaration where `T` is the data type we expect the inner lists to hold. We don't pass any initial value because the array will be populated using some logic later.

Let's look at it in action:

```kotlin
val list = mutableListOf<MutableList<Int>>()

// The elements within the inner lists can be anything, the numbers below are just an example.

// `repeat()` takes in a number and iterates from 0 to number-1
repeat(4) {
    // `row` is a new row in the array
    val row = mutableListOf<Int>()

    repeat(4) { col -> // `col` is a new column in the row, ranges from 0 to 3
        row += col
    }

    // Append the row to the array, can also use the `add()` function
    list += row
}

// for each list in the list, print its element in matrix form
for(sublist in list) {
    for (j in sublist.indices){
        print("$j ")
    }

    println() // new line after each row
}

/*
You can also access particular elements like:
list[0][0] -> First element of the first row
or
list.get(0).get(0) -> Same as above
*/
```

This code outputs the following:

```
0 1 2 3 
0 1 2 3 
0 1 2 3 
0 1 2 3
```

And hence we can create dynamic lists in kotlin as per our needs.

## N-Dimensional Arrays in Kotlin

Using the approaches discussed above, it wouldn't be hard to create 3D, 4D or even more dimensional arrays.

If the dataset you have is known, you can use the `arrayOf()` function, or to have variable array data, you can go ahead with `mutableListOf()` functions to create the arrays.

## Conclusion

In this tutorial you learned about the arrays and mutable lists in kotlin using `arrayOf()` and `mutableListOf()` functions.

These functions help you to create arrays and lists of any data type in Kotlin, to store values and perform actions based on that data.

I hope you find this tutorial useful. Share it with your friends who are beginning with kotlin!
