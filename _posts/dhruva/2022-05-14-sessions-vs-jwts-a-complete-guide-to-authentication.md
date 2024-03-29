---
layout: post
author: dhruva
title: "Sessions vs JWTs - A Complete Guide to Authentication"
image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1652269876694/PfE5eFaEj.png"
audioId: 4175001
category: backend
tags: ["authentication", "web-development", "security"]
excerpt: "Authentication or auth for short is the process where a server recognizes the identity of a user. This post goes over the methods for implementing authentication, each of their drawbacks, and which one you may want to choose."
original: "https://blog.dhruva.is-a.dev/sessions-vs-jwts-a-complete-guide-to-authentication"
---

Hello, in this post I will go over authentication, various methods to implement it, each of their drawbacks, and which one you may want to use! Let's get started!

## What is Authentication?

Authentication or auth for short is the process where a server recognizes **the identity of a user**. Authorization is then done, to allocate a role to the authenticated user and allocate the required services to that particular user.

There are 2 ways you can implement auth:
- Sessions
- JSON Web Tokens

Let's take a deep dive into sessions! 

## Sessions

Server-side sessions were the traditional way to implement auth. The flow of a session can be illustrated like this:

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1652199081833/Xut5oskzV.png)

The process begins with the client:
- Receiving an e-mail and a password
- Then, hashing the password 
- And sending the e-mail and the hashed password to the server 

Hashing is the process of **scrambling** a value using a key that is sent to an algorithm. **Hashed values can't be decrypted!**

[Argon2](https://argon2.online) is an extremely secure hashing algorithm that can be used to hash passwords.

While validating the credentials, the server hashes the given password, and the hash stored in the database (during register) and compares both of them. If the hashes match, the server then sends a request to the **session store** for the session ID.

A session store is a medium where data related to the logged-in user is stored. It could be in memory or a database. [Redis](https://redis.com) is commonly used as a session store because of its speed. 

The session data contains anything linked to the user who is logged in. It could be the `userId` or any field that is unique to the user.

This session ID is then sent back to the server, which in turn, sends the ID of the session to the client in the form of a **cookie**. Data on the user can then be accessed using this session ID which the store can query.

To log the user out, you can destroy the cookie and delete the key-value pair associated with the session ID in the store.

Now let's take a look at JSON Web Tokens.

## JSON Web Tokens (JWTs)

JWTs take a completely different approach to solving the problem. Authentication is done on the **client-side** here, rather than in the **server** like in sessions. 

The process can be illustrated in this way:

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1652256338392/ET6Zrh480.png)

It begins the same way as in sessions, but instead of asking the session store for a session ID, the server issues a **JWT access token** with a JWT Secret.

This token is relayed back to the client and should ideally be stored in a cookie. The JWT is not **private** and it should **NOT** contain private information like the hashed password. A token should just contain the user ID or other types of unique, non-jeopardizing data.

The JWT can then be used as an **Authorization Header's Bearer Token** that can be used to run queries that require auth. This JWT can be validated in the server during requests. Since the secret remains private a JWT cannot be forged. To log a user out, the cookie can be destroyed. 

To keep the app secure, JWT tokens should be short-lived. Another token called a **refresh token** should be signed on login, which can renew the access token when it expires.

When a client sends a request with an expired access token, the server would use the given refresh token and use it to generate a new access token. This way, if an attacker gets hold of an access token, the validity of that token is very short. 

> **Note: Do NOT store JWTs in localStorage!**

Storing JWTs in `localStorage` can make the app vulnerable to what's known as an **XSS Attack (Cross-Site Scripting)**.

It is a type of code injection where malicious code is injected into a website using another web application.  

## Pros and Cons of using Sessions

### More Control/Flexibility

Sessions give the developer more control over the app. If there is a breach, then you can immediately delete the session from the store, whereas blacklisting JWTs is tricky, and in the worst-case scenario, you would just have to wait for the token to expire.

### Easy to Implement

Since session IDs are stored in cookies, there is no need to provide any request headers. This is because cookies are supported automatically by browsers and all cookies are sent as part of the request to all websites.

It also reduces bandwidth usage when compared to JWT, since there is no need to send the token back and forth for every request made by the client. Cookies can also introduce a vulnerability for **CSRF (Cross-Site Request Forgery) attacks**.

This happens when requests through a malicious site force authenticated users on other websites to submit a request to the malicious website and get access to their credentials. This can be prevented by setting the [`SameSite`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite) cookie option to **lax**.

SameSite decides if the cookie should be sent only to the origin website. 

### Security

Session stores are not public and are stored remotely on a server, hence rendering the session data to be safe. In the case of JWTs, the tokens are relayed on every request and can be intercepted. Sessions are, in most cases, safer than using JWTs

### Scalability Issues

Sessions can be a pain to scale because there is a requirement for a place to host the session store. You will need to store more data on the store when more users authenticate and this will take a load on the server which can be expensive depending on what hosting solution you go with.

## Pros and Cons of using JWTs

### Scalable

Since JWTs store nothing on the server, it is stateless and scalable. As the user base grows, JWTs can scale since there is no overhead of requiring a store on the server.

### You can "not-worry" about a lot of stuff

  - **CORS**: Cross-Origin Resource Sharing
  - Domain Migration
  - Portability: With sessions, you need a cookie store that only browsers have. You can use tokens while making clients for other devices too. But then you would have to resort to a different place to store the token on the client.

### You can't truly log a user out

You'd normally log a user out by removing the cookie with the access token in it. But this doesn't ensure the **validity of the access token**. If an attacker gets hold of the token, he/she can still make requests to the server and do bad stuff.

To prevent such things, you have to implement a blacklist system, where if you get a report of a stolen token, you add that token to a blacklist, and any request with a blacklisted token will be blocked.

Simply removing the token from the hands of the client doesn't solve the problem. You could introduce a refresh token, but then again that's another token to deal with ;)

### They are heavy

If you store a lot of junk on your token, you may exceed the size limit for a cookie. And I already told you why storing them on `localStorage` is probably a bad idea.. (CSRF *wink, wink*)

### Security

JWTs are simply put, *not* secure. They can easily be intercepted and decrypted (Literally all you have to do is paste the token into a site like [this](https://jwt.io) and you can get the user data inside it). This is exactly why you should never store any sensitive data in a token.

Just store the required credentials that will allow the server to know who the user is. Something simple like a `userId`.

## Which one should you use?

It's all your choice. I prefer to use sessions since they are easy to implement (I don't have to worry about refresh tokens, blacklists, etc.) and are more secure (only the session ID is sent through an HTTP-Only, SameSite cookie).

I don't find scalability to be an issue, especially with platforms like [Railway](https://railway.app) providing a good free plan (not sponsored!). If you have a large user base, and you are willing to spend a bit of money on a VPS or a paid cloud service, definitely go with sessions.

Before I wrap up, here's a list of resources that can help you with implementing auth and going a bit deeper into the topics discussed in this article.

## Resources
- [Stop using JWT for sessions](http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/)
- [JWT vs Cookies for Authentication](https://www.youtube.com/watch?v=o9hT7v0OLJc)
- [How to Authenticate Users: JWT vs. Session](https://www.loginradius.com/blog/engineering/guest-post/jwt-vs-sessions/)
- [argon2 npm](https://www.npmjs.com/package//argon2)
- [express session middleware](https://www.npmjs.com/package/express-session)
- [redis session storage for express](https://www.npmjs.com/package/connect-redis)
- [express-jwt](https://www.npmjs.com/package/express-jwt)
- [passport-js](https://www.passportjs.org/)
- [The Easiest Way to Add Node.js User Authentication: James Q Quick](https://www.jamesqquick.com/blog/the-easiest-way-to-add-node-js-user-authentication)
- [XSS Attacks](https://owasp.org/www-community/attacks/xss/)
- [CSRF Attacks and how to prevent them](https://portswigger.net/web-security/csrf)

And that's it for this post, see you on the next one!
