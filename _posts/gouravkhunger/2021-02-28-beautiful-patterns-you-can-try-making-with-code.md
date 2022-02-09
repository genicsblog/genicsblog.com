---
layout: post
title:  "Beautiful Patterns You Can Try Making With Code"
excerpt: "Learning the syntax of a language with patterns can be fun!"
image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1614086705341/KvZHQQVpn.gif"
audioId: 3468105
hasCode: true
category: coding
tags: ["beginners", "design"]
author: gouravkhunger
---

I feel that learning the basics and syntax of any kind of programming language can be boring if you don't do it recreationally.

The very basics of any language include variables, simple data types, loops, and general syntax of writing instructions. To learn those efficiently, I would recommend picking any language of your choice and have a look at how that stuff works.

When you are comfortable with the general syntax, you can try out printing patterns with the language you chose. I know that figuring out how to make some patterns can be boring as hell! But chill, this article has some cool-looking patterns and how you can make them.

This article has the pseudo-code of the patterns, and the difficulty level increases as you proceed with the post. The article also explains the logic needed to make the pattern.

Converting the pseudo-code to a preferred language is left as an exercise for the readers, as this is meant to make beginners learn the syntax well!

Doing this type of exercise will improve your implementation efficiency!

Here's the list of patterns given in this post:

- [Squares](#squares)
- [Right Angled Triangle](#triangle)
- [Snakes](#snakes)
- [CheckerBoard Pattern](#checkerboard-pattern)
- [Diamonds](#diamonds)
- [Diamond Platform](#diamond-platform)

At the end of this post, there's a [bonus](#bonus) practice pattern for you!

---

# Squares

The task is to print a square of size `n*n` filled with `*`'s.

This is a really basic and easy pattern. All you need is to print `*` for `n` times in a line and print the line `n` times.

The pseudo-code for the same is as follows:

```
input n
for i=1 to n:
    for j=1 to n:
        print('*')
    print('\n')  // new line
```

Example:

```
Input: 5

Output:

*****
*****
*****
*****
*****
```

---

# Triangle

For this task, you need to print a right-angled triangle with `*` symbols.

Example:
```
input: 4
output:

*
**
***
****
```

This is simple, the logic is just to print n `*`'s on the `n`th line. The pseudo-code for the same is:

```
input n
for i=1 to n:
    for j=1 to i:
        print('*')
    print('\n')
```

Okay, these were some simple ones just for a warm-up, lets move to some real fun!

---

# Snakes

This pattern is really nice. You need to print a visual pattern of a snake as if it was crawling alternatingly on a plane. The body of the snake is represented by `#`'s and the rest area must be filled with `.`'s.

The plane has `n` rows and `m` columns. The input will have `n` followed by `m`.

An example will clear out what the task is.

```
input: 3 4
output:
####
...#
####

input: 5 3
output:

###
..#
###
#..
###
```

Okay so this example might have made the task clear, I had a pretty cool logic for this one. 

We can observe that alternating lines will be completely filled with `#`'s. Also, for other lines, the `#` appears either on the extreme right or on the extreme left.

So I thought to print all `#`'s on each line whose number is odd(this will be more clear from the pseudo-code) and also have a boolean variable whose value will determine whether to print `#` on the extreme right or the extreme left!

Here's the pseudo-code for this logic:

```
input n and m

flag = true

for i=1 to n:
    if(i%2==1):  //if i is odd
        for j=1 to m:
            print('#')
        print('\n')
    else:
        if(flag):
            for j=1 to m-1:
                print('.')
            print('\n')
            flag = false;
        else:
            print('#')
            for j=1 to m-1:
                print('.')
            print('\n')
            flag = true
```

---

# CheckerBoard Pattern

This is an advanced pattern that can't be explained in the text, also visual representations are worth 1000 words!

Here's what this pattern is.

```
n = 4
oxox
xoxo
oxox
xoxo

n = 5
oxoxo
xoxox
oxoxo
xoxox
oxoxo
```

This might seem like a cakewalk at first, as our brain can understand patterns easily but to make the computer print such patterns can be a mess. I recommend you try doing this yourself first.

Anyways, here's the pseudo-code I used to make such a pattern:

```
input n
make a 2D array 'a' of size  n x n
f = true
o = 'o', x = 'x'
for i=1 to n:
    for j=1 to n:
        if(f):
            a[i][j] = o
            f = false
        else :
            a[i][j] = x
            f = true

for i=1 to n:
    for j=1 to n:
        print(a[i][j])
    print('\n') //new line
```

This was crazy, at first I had thought to print it without some arrays and stuff in the scene, but when I failed to do so, I had to use this alternative. I love this pattern! Do you? Let me know in the comments!

---

# Diamonds
This one is also an interesting pattern, the task is to make a diamond whose max radius is given.

Example:
```
input: 5

output: 

    *
   ***
  *****
 *******
*********  // radius = 5
 *******
  *****
   ***
    *
```

Again, this is getting difficult at this point. We want to have the `*` at their correct position using spaces.

For such cases, what I think is to break the pattern into simpler subparts, i.e., at first, I will make the pyramid type of thing at the top and handle the bottom in another case. 

Now, one can see that for any number `n`, the total height of the diamond will always be `n+(n-1)`, of which, the upper part is a pyramid with height `n` and lower is an inverted pyramid of height `n-1`.

Here is the pseudo-code and the explanation follows below:

```
input n
start = n, cnt = 1 #start = position where * must start printing, cnt = number of * to print

for i=1 to n:
    temp = cnt
    for j=1 to (n+(n-1)):
        if(j>=start and temp>0):
            print(*)
            temp--
        else:
            print(' ')
    start--
    cnt+=2
    print('\n')

start = 2, cnt = (n+(n-3))

for i=n+1 to (n+(n-2)):
    temp = cnt
    for j=1 to (n+(n-1)):
        if(j>=start and temp>0):
            print(*)
            temp--
        else:
            print(' ')
    start++
    cnt-=2
    print('\n')
```

What I did is to have two control variables `start` and `cnt`. They control where to print `*` and where to print whitespace. Overall I am pretty inspired by the logic of the code. I hope you loved this one as well!

---

# Diamond Platform

This is another extension of the above pattern but still, it looks nice. The task is to make a platform that is bounded by `/`'s and `\`'s and whose each side is `n` units long. The shape of the platform must be that of a diamond.

This example will make it clear:

```
input: 3
output:
  /\
 /  \
/    \
\    /
 \  /
  \/
```

The logic I followed for this was also pretty simple. Here's the pseudo-code for it:

```
input n
x=n
for i=1 to n:
    for j=1 to n:
        if(j==x):
            print('/')
        else:
            print(' ')
    for j=n to 1:
        if(j==x):
            print('\')
        else:
            print(' ')
    x--
    print('\n')

x=1

for i=1 to n:
    for j=1 to n:
        if(j==x):
            print('\')
        else:
            print(' ')
    for j=n to 1:
        if(j==x):
            print('/')
        else:
            print(' ')
    x--
    print('\n')
```

---

# Bonus
Here's an additional pattern task which is left as an exercise to you! If you did this, or even try it, let me know in the comments section below, you can share your pseudo-code there and I will look into it!

### Egyptian Pyramid

You might be knowing about pyramids, they have their peak in the center and all the other points are symmetrically lower than it. The task is to form an asymmetric pyramid of height `n`.

Here's an example for it:

```
input: 4
output:
1 1 1 1 1 1 1
1 2 2 2 2 2 1
1 2 3 3 3 2 1
1 2 3 4 3 2 1
1 2 3 3 3 2 1
1 2 2 2 2 2 1
1 1 1 1 1 1 1
```

---

Writing this article was so much fun for me! But yeah it required a lot of effort figuring out things, get them working, and compiling them into this article, I hope you got to learn something new from it.

If you have any kind of feedback, feel free to leave it in the comments section or find me on my social accounts. Happy Coding :)