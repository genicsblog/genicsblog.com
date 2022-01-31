---
layout: post
title:  "Next generation Hello World program"
excerpt: "Done writing simple Hello World code? Give yourself a challenge by building this Next-gen Hello World program!"
image: "https://user-images.githubusercontent.com/46792249/151851304-f4c3746f-7c60-4cf9-84b6-cf551e627ada.jpg"
languages: ["java", "shell"]
category: coding
tags: ["advanced", "tips"]
author: gouravkhunger
---

Hey developers! Are you all bored of the pretty common **Hello World!** program you get to see in each programming tutorial?

Well, [we](#conclusion) have come up with a unique **Next-gen Hello World program challenge** that would surely flex your coding muscles and help you learn advanced concepts in your favourite programming language in a fun and interesting way!

# The Challenge

The challenge is pretty simple :wink:, here's what you have to do:

> Write a program that keeps on printing **Hello World** to the console in a loop, but after a time delay that is mentioned by the user.<br/><br/>
>
>The delay between each console output should be **1 second**.<br/><br/>
>
>At the time of execution of the code, the user may enter the letter "**s**" (without quotes) on the console to stop the process.

Here's basically what you have to do:

```shell
$ <Command to run your code>
Please enter the delay duration in Seconds: 5 <- user wants 5 second delay between each output
Type 's' without the quotes to stop the program.
5
4
3
2
1
Hello World!
5
4
3
s <- User inputs "s" to stop the program
$ <Back to terminal>
```

*Seems pretty easy, right?* :eyes:

**WAIT BEFORE MOVING AHEAD!** At this point, I'd like you to think over the problem and share what you come up with in the comments section below!

You could use any language of your choice! Here, in this article, I'll explain how to implement the above logic in Java.

## Why Java?

> Spoiler alert! Reading any further would reveal the concepts needed to solve this problem!

We'll use Java for this problem because it supports **Multi-Threading** out of the box. This means that we can run multiple blocks of codes at the same time, using different cores of the CPU. Any language with this capability can easily solve this problem.

## General Solution

Here's the thought process needed to solve this problem: We would run two threads, one for handling the console outputs and the other for user inputs. The user input thread would be responsible for checking if the user has entered "**s**" on the console. If yes, the output thread would be terminated.

We will use a `flag` boolean variable (initially set to `true`) that would be set to `false` when the user enters "**s**" on the console. The output thread would terminate once the flag is set to `false`.

## Java Solution

Let's dig into the coding part!

### Creating and initializing required variables

Here's the blueprint of the code we'll start with:

```java
import java.util.*; // all the classes we need to use are imported here

public class NextGenHelloWorld {

    // variables
    private static int time; // stores the time delay for "Hello World!" to appear on console
    private static String input = "nothing"; // stores what is entered by the user to the console
    private static Thread outputThread, inputThread; // threads for output and input
    private static Scanner scanner; // Scanner object handles console inputs
    private static boolean flag = true; // checks if threads should be stopped or should continue

    public static void main(String[] args) {
        
        // code goes here

    }

}
```

These variables will help us to keep track of the state of the program:

- `time` : This variable stores the time delay entered by the user for **Hello World!** to appear on the console.
- `input` : This variable stores the input by the user to the console. Later, it would be used to check if what the user has entered is the letter "**s**".
- `outputThread` and `inputThread` : These variables store the thread instances for the output and input threads respectively.
- `scanner` : This variable stores the `Scanner` object that handles console inputs.
- `flag` : This variable is a boolean variable that is set to `true` initially. It is set to `false` when the user enters "**s**" on the console.

### `init()` block

We will make an `init()` function inside the class to initialize the undeclared variables.

```java
static void init() {
    scanner = new Scanner(System.in);

    // until a valid integer value is provided for the time
    // keep asking for it
    while (true) {
        try {
            System.out.print("Please enter the delay duration in Seconds: ");
            time = scanner.nextInt();
            if (time < 0) throw new InputMismatchException(); // we don't want negative integers
            break;
        } catch (InputMismatchException e) {
            System.out.println("Not a valid positive integer, try again");
        }
        scanner.nextLine();
    }

    // general info
    System.out.println();
    System.out.println("Type 's' without the quotes to stop the program.");
    System.out.println();
}
```

Here, we initialize the `scanner` variable and create a loop to ask for user input.

The loop will keep asking for the input until the user enters a valid integer value for the `time` delay. The code for asking for user input is wrapped inside a `try`-`catch` block, to handle the case where the user enters an invalid input.

When a valid input is received, we `break` the loop and print some general information for the user on how to close the program.

Don't forget to call the `init()` function inside the `main()` function!

```java
public static void main(String[] args) {

    // initialise stuff
    init();

    // other things should start after init()

}
```

### Creating threads

#### The sleep function

Before creating the threads, we need to create a function that would simulate 1 second delay. We will use this function to add 1 second delays whenever we need to.

```java
public static void sleep() {
    try {
        Thread.sleep(1000); // 1000 millisecond = 1 second
    } catch (InterruptedException e) {
        System.err.println(e.getMessage());
    }
}
```

Here, we call the `sleep()` function of the thread class to add a 1 second delay. Let's move ahead to the threads!

#### Output Thread

As discussed earlier, the output thread will keep logging **Hello World!** along with a count-down timer that starts with what the user has entered for the `time` delay.

Let's code this thread! Threads in java require `Runnable` objects to be created, inside which we override the `run()` method and define what needs to be executed inside the thread.

Here's the code for the output thread:

```java
outputThread = new Thread(
    new Runnable() {
        @Override
        public void run() {
            // continue printing if not stopped
            while (flag) {
                for (int i = time; i > 0; i--) {
                    if (!flag) break; // if stopped, break loop
                    System.out.println(i);
                    sleep(); // 1 second delay
                }

                if (!flag) break; // if stopped, leave prining
                System.out.println("Hello World!");
                sleep();
            }
        }
    }
);
```

Here, we run a while loop that keeps a check on the `flag` variable. Unless it is `false`, it keeps printing the count-down and the **Hello World!** message using a `for` loop.

Notice how we put `if (!flag) break;` at 2 places. This is because we want the loop to break as soon as `flag` becomes `false`.

That's it for the output thread!

#### Input Thread

The input thread would follow the same logic as the output thread. It would keep on listening for user inputs and store it inside the `input` variable. Once the `input` matches "**s**", the variable `flag` would become `false` and the output thread would terminate because of this!

```java
inputThread = new Thread(
    new Runnable() {
        @Override
        public void run() {
            // while not stopped, continue to listen for inputs
            while (flag) {
                input = scanner.nextLine();

                // if "s" found, break the loop
                if (input.toLowerCase().equals("s")) {
                    flag = false;
                    break;
                }
            }
        }
    }
);
```

We use the `toLowerCase()` method to convert the `input` to lower case so as to avoid case sensitivity issues.

Try to run the program and see what happens! To your surprise, it won't do anything after asking input for the `time` delay.

That happens because we didn't call the `start()` function on the threads! It's important to start the threads otherwise they won't run after initialization.

```java
// start the threads
inputThread.start();
outputThread.start();
```

## Final Code

By now, the final `NextGenHelloWorld.java` file should look like this:

```java
import java.util.*;

public class NextGenHelloWorld {
    // variables
    private static int time; // time to be taken to print Hello World
    private static String input = "nothing"; // checks what is entered
    private static Thread outputThread, inputThread; // threads for output and input
    private static Scanner scanner; // gets inputs
    private static boolean flag = true; // checks if threads should be stopped or continued to run

    public static void main(String[] args) {
        // initialise variables and input timer seconds
        init();

        // output thread handles console outputs
        outputThread = new Thread(
            new Runnable() {
                @Override
                public void run() {

                    // continue printing if not stopped
                    while (flag) {
                        for (int i = time; i > 0; i--) {
                            if (!flag) break; // if stopped, break loop
                            System.out.println(i);
                            sleep(); // 1 second delay
                        }

                        if (!flag) break; // if stopped, leave prining
                        System.out.println("Hello World!");
                        sleep();
                    }

                }
            }
        );

        // input thread handles whether to stop the program or not
        inputThread = new Thread(
            new Runnable() {
                @Override
                public void run() {
                    // while not stopped, continue to listen for inputs
                    while (flag) {
                        input = scanner.nextLine();

                        // if "s" found, break the loop
                        if (input.toLowerCase().equals("s")) {
                            flag = false;
                            break;
                        }
                    }
                }
            }
        );

        // start the threads
        inputThread.start();
        outputThread.start();
    }

    // simulates 1 second delay
    public static void sleep() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            System.err.println(e.getMessage());
        }
    }

    // initialise stuff
    static void init() {
        scanner = new Scanner(System.in);

        // until a valid integer value is provided for the time
        // keep asking for it
        while (true) {
            try {
                System.out.print("Please Enter the delay duration in Seconds: ");
                time = scanner.nextInt();
                if (time < 0) throw new InputMismatchException(); // we don't want negative integers
                break;
            } catch (InputMismatchException e) {
                System.out.println("Not a valid positive integer, try again");
            }
            scanner.nextLine();
        }

        // general info
        System.out.println();
        System.out.println("Type 's' without the quotes to stop the program.");
        System.out.println();
    }
}
```

It's pretty long but I'm sure you understand most of it!

You can find all the code for this tutorial in [this repository](https://github.com/Kushagra-Jain99/NextGenHelloWorld).

## Conclusion

In this article, we got to learn how to use the **Multi-Threading** approach to solve this unique **Next-gen Hello World program Challenge**.

I would like to thank [Kushagra](/contributor/kushagra) for providing the idea for the problem. He came up with it some months ago and we spent time solving it together. I find this concept very intuitive and enjoyed writing this article.

I hope you find this article useful. I would love to hear your feedback and suggestions on how to improve this tutorial in the comments section below!

And yes, don't forget to share the code for the implementation of the logic, in your favourite programming language :)