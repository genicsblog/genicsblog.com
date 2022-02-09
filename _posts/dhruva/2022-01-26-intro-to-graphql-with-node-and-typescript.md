---
layout: post
title:  "Intro to GraphQL with Node.js and TypeScript"
excerpt: "The complete guide to working with GraphQL using TypeGraphQL and building a basic CRUD functionality with TypeORM and Postgres."
image: "https://user-images.githubusercontent.com/46792249/151178959-781d2ea4-a4dc-4f89-90d9-b98d62821944.png"
original: "https://thecatblog.hashnode.dev/intro-to-graphql-with-nodejs-and-typescript"
hasCode: true
audioId: 3468789
category: backend
tags: ["api", "node-js", "web-development"]
author: dhruva
permalink: /dhruva/intro-to-graphql-with-node-and-typescript
---

In this post, I’ll help you get a solid understanding of working with GraphQL in Node.js and TypeScript using a library called [TypeGraphQL](https://typegraphql.com).

TypeGraphQL is an awesome way to create your GraphQL resolvers and it has seamless integration capabilities with ORMs like `TypeORM` (we’ll be using it in this post!) and mikro-orm. It uses classes and decorators to beautifully generate our schemas using very less code.

Also stick around till the end to find some challenges to reinforce your skills!

# What we’re gonna do

- First, we’ll setup a basic TypeScript project
- Then, we’ll configure **TypeORM**, to interact with our database
- We’ll create a `Task` database entity and hook it up with TypeORM
- After that, we’ll set up a basic Apollo/Express web server
- And finally, we’ll create our own GraphQL resolver using TypeGraphQL with CRUD (create, read, update, delete) functionality

Alright, let’s get started!

# Setting up a TypeScript project

First let’s create an empty directory called `graphql-crud`.

```shell
mkdir graphql-crud
```

And you can open this directory with the editor of your choice (I’ll be using Visual Studio Code).

Now let’s initialize this as an NPM project using

```shell
npm init -y
```

This creates a basic `package.json`.

```json
{
  "name": "graphql-crud",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Alright cool!

So now since we have an NPM project set up, we can install TypeScript and the type definitions for Node:

```shell
yarn add typescript
```

and

```shell
yarn add -D @types/node
```

**Note:** I’ll be using Yarn throughout this post, feel free to use NPM.

Also we need to make a `tsconfig.json` file to configure the TypeScript compiler, so to do that we’ll use a library called `tsconfig.json`

```shell
npx tsconfig.json
```

Select `node` from the options

![Untitled](https://i.imgur.com/cSC9N19.png)

And now, it will create a TSConfig in your root directory.

```json
{
  "compilerOptions": {
    "target": "es2017",
    "module": "commonjs",
    "lib": ["dom", "es6", "es2017", "esnext.asynciterable"],
    "skipLibCheck": true,
    "sourceMap": true,
    "outDir": "./dist",
    "moduleResolution": "node",
    "removeComments": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "resolveJsonModule": true,
    "baseUrl": "."
  },
  "exclude": ["node_modules"],
  "include": ["./src/**/*.ts"]
}
```

Now, let’s create a simple TypeScript file.

`src/index.ts`

```typescript
console.log("hellooooo");
```

We cannot run this file directly using Node, so we need to compile this into JavaScript. To do this, let’s create a `watch` script in our `package.json` to watch our TypeScript files for changes and compile them to JavaScript in the `dist/` directory.

```json
{
  "name": "graphql-crud",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "watch": "tsc -w"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Now if we run `npm watch` in our terminal, it will create a `dist` folder with our compiled JavaScript code. We’ll create a `dev` command to run this compiled code with the following script:

```json
"scripts": {
    "watch": "tsc -w",
    "dev": "nodemon dist/index.js"
},
```

By the way, make sure you install `nodemon` either globally or in this project for this command to work. 

Now to run this code you will run both `yarn watch` and `yarn dev` together, to compile our TypeScript and run the compiled code automatically. 

Alright, now our TypeScript project is ready to go! 🔥🔥

# Setting up TypeORM

[TypeORM](https://typeorm.io) is an amazing ORM, which we can use to interact with various databases. It also has really good TypeScript support and the way we define database entities in TypeORM will be very useful when we setup TypeGraphQL later in this post.

In this tutorial, I will be using PostgreSQL as my database and really you can follow along with any relational database which you have set up.

Let’s install TypeORM and the native Postgres driver for Node:

```shell
yarn add typeorm pg
```

Now we can replace the code in `src/index.ts` to this:

```typescript
import { Connection, createConnection } from "typeorm";

const main = async () => {
  const conn: Connection = await createConnection({
    type: "postgres", // replace with the DB of your choice
    database: "graphql-crud", // replace with the name of your DB
    username: "username", // replace with your database user's username
    password: "pass", // replace with your database user's password
    logging: true, // this shows the SQL that's being run
    synchronize: true, // this automatically runs all the database migrations, so you don't have to :)
    entities: [], // we'll add our database entities here later.
  });
};

main().catch((err) => console.error(err));
```

This basically just specifies all the options for your database connection. We are using a `main` function because top-level awaits are not a thing unless you’re using ES7 or something like that.

# Creating our `Entity`

First things first, I think some people don’t exactly know what an Entity is, so I’ll just explain that part a bit now.

As you should already know, SQL databases (like Postgres, MySQL etc.) are made up of **Tables** and **Columns.** Like an Excel spreadsheet. Each table will contain fields related to it. For example:

- A table of **Cars,** may have columns like **Manufacturer**, **Engine Type**, **Color** etc.

An `Entity` basically defines the structure of a database table and its corresponding columns. In this post, we’ll perform our CRUD operations with Tasks or Todos. So lets create an entity for a **Task.**

First off, create a new file in the `src/entities` directory.

To keep it simple, we’re going to have 2 columns for our `Task` table:

- The **title** of the task
- The **description** of the task

We’ll also have an `id`, a `created`, and an `updated` column.

We won’t really use the created and updated column, but its kind of a best practice 😉

`src/entities/Task.ts`

```typescript
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column()
  title: string;

  @Column()
  description: string;
}
```

Woah, woah, what is that?!

This my friend, is the ✨ magic of decorators ✨

This code is extremely clean and self-documenting:

- We are creating a class called `Task` with the `Entity` decorating specifying that this class is an Entity.
- We are extending this class from `BaseEntity` so that some useful methods like `create`, `delete` etc. will be exposed to us with this class. You’ll see what I mean later on.
- Then we’re creating a primary column, for our ID. This is ID field is an integer and its automatically generated by TypeORM!
- Next is the created and updated column and this too is automatically generated by TypeORM.
- The `title` and `description` is a normal column, containing the title and the description of our task.

And don’t forget to add the `Task` entity to your `entities` array in your TypeORM config:

`src/index.ts`

```typescript
import { Connection, createConnection } from "typeorm";
import { Task } from "./entities/Task";

const main = async () => {
  const conn: Connection = await createConnection({
    type: "postgres", // replace with the DB of your choice
    database: "graphql-crud", // replace with the name of your DB
    username: "postgres", // replace with your database user's username
    password: "postgres", // replace with your database user's password
    logging: true, // this shows the SQL that's being run
    synchronize: true, // this automatically runs all the database migrations, so you don't have to :)
    entities: [Task], // we'll add our database entities here later.
  });
};

main().catch((err) => console.error(err));
```

Phew! Finally, let’s get started with the GraphQL part!

# Setting up Express with Apollo Server

We’ll be using Express as our server and we’ll tell Express to use Apollo Server as middleware. 

But, what **is** Apollo Server??

To understand what Apollo Server does, you’ll need to know how GraphQL works at its core. Basically, in an API there will be a REST endpoint for the GraphQL stuff (kinda ironic but yeah) from where you can run Queries and Mutations from your Resolvers.

What Apollo Server does, is just create an endpoint for your GraphQL to be served with some extra dev tools, like GraphQL Playground which helps you test your GraphQL queries in a cool environment.

So let’s start!

We’ll install these libraries:

- `express`
- `apollo-server-express`:  Express middleware for Apollo Server
- `graphql`: The JavaScript implementation of GraphQL
- `type-graphql`

```shell
yarn add express apollo-server-express graphql type-graphql 
```

Let’s also install the type definitions for express:

```shell
yarn add -D @types/express
```

Cool!

Let’s now create our Express app:

`src/index.ts`

```typescript
import { Connection, createConnection } from "typeorm";
import express, { Express } from "express";
import { Task } from "./entities/Task";

const main = async () => {
  const conn: Connection = await createConnection({
    type: "postgres", // replace with the DB of your choice
    database: "graphql-crud", // replace with the name of your DB
    username: "postgres", // replace with your database user's username
    password: "postgres", // replace with your database user's password
    logging: true, // this shows the SQL that's being run
    synchronize: true, // this automatically runs all the database migrations, so you don't have to :)
    entities: [], // we'll add our database entities here later.
  });

  const app: Express = express();

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`server started on port ${PORT}`));
};

main().catch((err) => console.error(err));
```

Let’s also create a test route to see that everything’s working properly:

```typescript
import { Connection, createConnection } from "typeorm";
import express, { Express } from "express";
import { Task } from "./entities/Task";

const main = async () => {
  const conn: Connection = await createConnection({
    type: "postgres", // replace with the DB of your choice
    database: "graphql-crud", // replace with the name of your DB
    username: "postgres", // replace with your database user's username
    password: "postgres", // replace with your database user's password
    logging: true, // this shows the SQL that's being run
    synchronize: true, // this automatically runs all the database migrations, so you don't have to :)
    entities: [Task], // we'll add our database entities here later.
  });

  const app: Express = express();

  app.get("/", (_req, res) => res.send("you have not screwed up!"));

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`server started on port ${PORT}`));
};

main().catch((err) => console.error(err));
```

**Note:** I am using an `_` in front of `req` because I won’t be using that variable and if you don’t use a variable you can prefix it with an underscore.

Now let’s open up our browser and go to `[localhost:8000/](http://localhost:8000/)` and you should see something like this:

![Untitled](https://i.imgur.com/pKpSU2B.png)

To add Apollo Server as a middleware for Express, we can add the following code:

```typescript
import { Connection, createConnection } from "typeorm";
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

const main = async () => {
  const conn: Connection = await createConnection({
    type: "postgres", // replace with the DB of your choice
    database: "graphql-crud", // replace with the name of your DB
    username: "postgres", // replace with your database user's username
    password: "postgres", // replace with your database user's password
    logging: true, // this shows the SQL that's being run
    synchronize: true, // this automatically runs all the database migrations, so you don't have to :)
    entities: [], // we'll add our database entities here later.
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [],
      validate: false,
    }),
  });

  await apolloServer.start();
  const app: Express = express();

  apolloServer.applyMiddleware({ app });

  app.get("/", (_req, res) => res.send("you have not screwed up!"));

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`server started on port ${PORT}`));
};

main().catch((err) => console.error(err));
```

Now you’ll get TypeScript yelling at you because the `resolvers` array is empty but bear with me for a sec.

Here what we’re basically doing is, creating an instance of `ApolloServer` and passing our GraphQL schema as the `buildSchema` function from `type-graphql`.

So what TypeGraphQL does is it converts our GraphQL resolvers (TypeScript classes) which are present in the `resolvers` arrays into SDL or GraphQL Schema Definition Language, and passes this SDL as our final GraphQL schema to Apollo Server.

Lets also quickly create a simple GraphQL Resolver:

For those of you who don’t know what a Resolver is:

> Resolver is **a collection of functions that generate response for a GraphQL query**. In simple terms, a resolver acts as a GraphQL query handler.
>
> ~ tutorialspoint.com

`src/resolvers/task.ts`

```typescript
import { Query, Resolver } from "type-graphql";

@Resolver()
export class TaskResolver {
  @Query()
  hello(): string {
    return "hello";
  }
}
```

That’s all there is to it! 

Of course, now we should add this resolver in our `resolvers` array:

`src/index.ts`

```typescript
import { Connection, createConnection } from "typeorm";
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Task } from "./entities/Task";
import { TaskResolver } from "./resolvers/task";

const main = async () => {
  const conn: Connection = await createConnection({
    type: "postgres", // replace with the DB of your choice
    database: "graphql-crud", // replace with the name of your DB
    username: "postgres", // replace with your database user's username
    password: "postgres", // replace with your database user's password
    logging: true, // this shows the SQL that's being run
    synchronize: true, // this automatically runs all the database migrations, so you don't have to :)
    entities: [Task], // we'll add our database entities here later.
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TaskResolver],
      validate: false,
    }),
  });

  await apolloServer.start();
  const app: Express = express();

  apolloServer.applyMiddleware({ app });

  app.get("/", (_req, res) => res.send("you have not screwed up!"));

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`server started on port ${PORT}`));
};

main().catch((err) => console.error(err));
```

Cool! Now let’s look at our output in the terminal aaaandd...

```typescript
UnmetGraphQLPeerDependencyError: Looks like you use an incorrect version of the 'graphql' package: "16.2.0". Please ensure that you have installed a version that meets TypeGraphQL's requirement: "^15.3.0".
    at Object.ensureInstalledCorrectGraphQLPackage (/Users/dhruvasrinivas/Documents/graphql-crud/node_modules/type-graphql/dist/utils/graphql-version.js:20:15)
    at Function.checkForErrors (/Users/dhruvasrinivas/Documents/graphql-crud/node_modules/type-graphql/dist/schema/schema-generator.js:47:27)
    at Function.generateFromMetadataSync (/Users/dhruvasrinivas/Documents/graphql-crud/node_modules/type-graphql/dist/schema/schema-generator.js:26:14)
    at Function.generateFromMetadata (/Users/dhruvasrinivas/Documents/graphql-crud/node_modules/type-graphql/dist/schema/schema-generator.js:16:29)
    at buildSchema (/Users/dhruvasrinivas/Documents/graphql-crud/node_modules/type-graphql/dist/utils/buildSchema.js:10:61)
    at main (/Users/dhruvasrinivas/Documents/graphql-crud/dist/index.js:23:54)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

UH OH! We have an error! But it’s pretty obvious what we have to do to fix it. We just have to use the specified version of the graphql package in our `package.json`

```json
{
  "name": "graphql-crud",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "watch": "tsc -w",
    "dev": "nodemon dist/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/node": "^17.0.10",
    "apollo-server-express": "^3.6.2",
    "express": "^4.17.2",
    "graphql": "^15.3.0",
    "pg": "^8.7.1",
    "type-graphql": "^1.1.1",
    "typeorm": "^0.2.41",
    "typescript": "^4.5.5"
  },
  "devDependencies": {
    "@types/express": "^4.17.13"
  }
}
```

Now let’s reinstall all of our dependencies:

```shell
yarn
```

Now if we run our code, we shouldn’t get any errors!

Apollo Server serves our GraphQL at the `/graphql` endpoint.

So let’s open it up in our browser.

![apollo propaganda page](https://i.imgur.com/uYKIjOp.png)

And oof we’re greeted by Apollo Server’s propaganda page 💀

Fun fact: This is actually a new Apollo Server update, earlier it used to directly open up GraphQL Playground, an interactive environment to test our GraphQL queries.

No worries though, we can spin up GraphQL playground using this Apollo Server Plugin:

`src/index.ts`

```typescript
import { Connection, createConnection } from "typeorm";
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Task } from "./entities/Task";
import { TaskResolver } from "./resolvers/task";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const main = async () => {
  const conn: Connection = await createConnection({
    type: "postgres", // replace with the DB of your choice
    database: "graphql-crud", // replace with the name of your DB
    username: "postgres", // replace with your database user's username
    password: "postgres", // replace with your database user's password
    logging: true, // this shows the SQL that's being run
    synchronize: true, // this automatically runs all the database migrations, so you don't have to :)
    entities: [Task], // we'll add our database entities here later.
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TaskResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();
  const app: Express = express();

  apolloServer.applyMiddleware({ app });

  app.get("/", (_req, res) => res.send("you have not screwed up!"));

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`server started on port ${PORT}`));
};

main().catch((err) => console.error(err));
```

Now, if you refresh you can find something like this:

![Untitled](https://i.imgur.com/eKHWisM.png)

Now let’s run our `hello` query:

```graphql
{
  hello
}
```

And you’ll see our output:

![Untitled](https://i.imgur.com/fRSycbD.png)

Awesome!! 

# Building CRUD functionality

Now, let’s get to the main part, which is building out our CRUD functionality. Let’s start with the easiest, which is to fetch all the posts:

BUT WAIT A MINUTE!
Remember that `Task` entity we made? Like a hundred years back? Yep, that one.

That is a database **Entity**, but when we get all tasks we have to return a `Task` and we can’t return an **Entity** cause that’s dumb. So what we’re gonna have to do is, to make `Task` a GraphQL type.

Before you start complaining, remember that I told you that TypeGraphQL can integrate with TypeORM well? Let’s see that in action!

`src/entities/Task.ts`

```typescript
import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @CreateDateColumn()
  @Field(() => String)
  created: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updated: Date;

  @Column()
  @Field(() => String, { nullable: false })
  title: string;

  @Column()
  @Field(() => String, { nullable: false })
  description: string;
}
```

Get a load of that ✨ decorator magic ✨

What we’re essentially doing here is:

- Specifying that this `Task` class is **also a GraphQL type!**
- We are then decorating each column with the `Field` decorator, saying that each of these columns are also Fields of the `Task` type.
- We are also explicitly stating the GraphQL type of each `Field` , which are all coming from `type-graphql`
- We are also specifying that the title and description field **has to have a value and can never be declared as null.**

The cool thing about defining your entity and GraphQL type like this is that you may have a column in your database like a password which **you don’t want to expose** in a response and you can just not decorate it with a `Field` to do this!

## Getting all tasks

Now, let’s fetch all of our Tasks:

`src/resolvers/task.ts`

```typescript
import { Query, Resolver } from "type-graphql";
import { Task } from "../entities/Task";

@Resolver()
export class TaskResolver {
  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    return Task.find();
  }
}
```

Here you can see that we’re specifying the GraphQL return type as an array of `Task`s since we also made it a GraphQL type.

One fault you may find with this approach is that we’re defining the return types **twice:** once for the GraphQL return type, and once for the function’s return type. But that’s just how we do things in the TypeGraphQL world 😅

Ok cool, let’s now run our query:

```graphql
{
  tasks {
    id
    created
    updated
    title
    description
  }
}
```

And we will get a response like this:

```json
{
  "data": {
    "tasks": []
  }
}
```

The array is empty because we haven’t created any tasks yet.

## Creating a task

Now I’d like to ask you a question, if we use a `Query` to fetch data, will we be able to use the same `Query` to change (create, update, delete) data? No, we can’t. We will use something called a **`Mutation`** to achieve our task.

One more thing you might be thinking is how exactly do we take inputs because when we create a task, we’ll need to provide the title and description of the task, right? Guess what, TypeGraphQL has a decorator for it!

Let’s see all of this in action. We’ll define a new function in our task resolver.

`src/resolvers/task.ts` 

```typescript
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Task } from "../entities/Task";

@Resolver()
export class TaskResolver {
  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    return Task.find();
  }

  @Mutation(() => Task)
  createTask(
    @Arg("title", () => String) title: string,
    @Arg("description", () => String) description: string
  ): Promise<Task> {
    return Task.create({ title, description }).save();
  }
}
```

I’ll walk you through this new function line by line since it’s a bit confusing at first.

- We are first declaring this `createTask` as a GraphQL mutation, which returns the GraphQL `Task` type which we created. We are returning a `Task` because after the task is saved to the database we want to show that it has successfully added it.
- Then we have 2 variables, `title` and `string` decorated with `Arg`. This `Arg` specifies that these two variables will be passed as arguments when we are running this mutation (which we will do in a sec). The GraphQL type is given as `String` but this is optional because in most cases TypeGraphQL can **infer** the GraphQL type after looking at the variable’s TypeScript type.
- Then we’re creating a Task using `Task.create` and passing the title and description variables to it and then we’re calling `.save`.

But why are we doing both `.create` and `.save`? 

What `.create` essentially does is, that it **creates an instance of the `Task` class!** 

Something like this:

```typescript
const task = new Task(....) 
```

And `.save` actually saves this new instance to our Postgres database.

You might also be wondering why we’re specifying the name of the variable both as an argument for `@Arg` and for the TypeScript variable. What we’re specifying as the string is actually the name we’re going to use to provide GraphQL with the argument. For example:

```typescript
@Arg("myrandomarg", () => String) arg: string
```

To run this mutation we would do it like this:

```graphql
mutation {
	myQuery(myrandomarg: "val") {
		...
	}
}
```

Since we got all of that cleared, let’s run our mutation!

```graphql
mutation {
  createTask(
    title: "my first post!",
    description: "this is my first post"
  ) {
    id
    created
    updated
    title
    description
  }
} 
```

And we get our response back!

```json
{
  "data": {
    "createTask": {
      "id": 1,
      "created": "1643090973749",
      "updated": "1643090973749",
      "title": "my first post!",
      "description": "this is my first post"
    }
  }
}
```

Awesome!

Another thing we can do now is since we have created a post, we can try fetching all of our posts again.

```json
{
  "data": {
    "tasks": [
      {
        "id": 1,
        "created": "1643090973749",
        "updated": "1643090973749",
        "title": "my first post!",
        "description": "this is my first post"
      }
    ]
  }
}
```

And it’s all working yay 🎉

## Getting a single post by ID

This should be pretty straight-forward since we already know how to include an argument. 

`src/resolvers/task.ts`

```typescript
@Query(() => Task, { nullable: true })
async task(@Arg("id", () => Int) id: number): Promise<Task | undefined> {
  return Task.findOne({ id });
}
```

Here we’re saying that this `Query` returns a single `Task` and it can return a `null` if a post with this ID is not found. 

**Note:** `Int` comes from `type-graphql`

Also the TypeScript return type is:

```typescript
Promise<Task | undefined>
```

This basically says that this function can either return a Promise of a Task if a post with such and such ID is found, but otherwise it will return an `undefined`.

And we’re using `Task.findOne()` to get a single task and providing the ID as the search query.

So, if we run this query using:

```graphql
{
  task (id: 1) {
    id
    title
    description
  }
}
```

We’ll get this response:

```json
{
  "data": {
    "task": {
      "id": 1,
      "title": "my first post!",
      "description": "this is my first post"
    }
  }
}
```

And if we provide an ID that doesn’t exist, we’ll get a null as the response:

```graphql
{
  task (id: 1717) {
    id
    title
    description
  }
}
```

```json
{
  "data": {
    "task": {
      "id": 1,
      "title": "my first post!",
      "description": "this is my first post"
    }
  }
}
```

## Deleting a post

Deleting a post is quite similar to the function we created for getting a single post.

`src/resolvers/task.ts`

```typescript
@Mutation(() => Boolean)
async deleteTask(@Arg("id", () => Int) id: number): Promise<boolean> {
  if (await Task.findOne({ id })) {
    await Task.delete(id);
    return true;
  } else {
    return false;
  }
}
```

Here we are returning the `Boolean` GraphQL type. We first check if a post with the ID provided exists, then we delete it and return `true`, but if it doesn’t, we return `false`.

Let’s run this mutation:

```graphql
mutation {
  deleteTask(id: 2) 
}
```

**Note:** First, create another Task and then run this mutation.

And you will get this response!

```json
{
  "data": {
    "deleteTask": true
  }
}
```

Now, finally we’re gonna create one final function to update our Task.

## Updating a Task

To update a task, we’ll need to get:

- the ID of the task
- the new title
- the new description

And then we’ll need to check if a post with the mentioned ID exists, if it doesn’t we will return `null`

Then we will check if a title or a description if provided and if it is, we will update the Task using `Task.update`

`src/resolvers/task.ts`

```typescript
@Mutation(() => Task, { nullable: true })
async updateTask(
  @Arg("title", () => String, { nullable: true }) title: string,
  @Arg("description", () => String, { nullable: true }) description: string,
  @Arg("id", () => Int) id: number
): Promise<Task | null> {
  const task = await Task.findOne(id);
  if (!task) {
    return null;
  }
  if (typeof title !== "undefined") {
    await Task.update({ id }, { title });
  }

  if (typeof description !== "undefined") {
    await Task.update({ id }, { description });
  }
  return task;
}
```

All this is familiar code, it’s just that the complexity of our operation is a bit higher. Let’s now test this mutation:

```graphql
mutation {
  updateTask(id: 1, title: "first post by me!") {
    id
    title
    description
  }
}
```

And we’ll get our response:

```json
{
  "data": {
    "updateTask": {
      "id": 1,
      "title": "my first post!",
      "description": "this is my first post"
    }
  }
}
```

If we run the get task by ID query we can see our updated Task:

```graphql
{
  task (id: 1) {
    id
    title
    description
  }
}
```

Response:

```json
{
  "data": {
    "task": {
      "id": 1,
      "title": "first post by me!",
      "description": "this is my first post"
    }
  }
}
```

And that’s it!! We’re done with our CRUD!! 🚀🚀

# Challenge

As promised, you can try implementing the features listed below to improve your understanding of the concept 💪

- Make an `isComplete` boolean field in the `Task` entity
- Make a `markComplete` mutation to change the value of `isComplete` of a Task
- You can also make a simple `filter` query to search for tasks based on the `title` arg given by the user.

If you need help implementing any of these, leave a comment and I’ll answer your query!

You can find the source code [here](https://github.com/carrotfarmer/graphql-crud).

And that’s it for this post, see ya in the next one!
