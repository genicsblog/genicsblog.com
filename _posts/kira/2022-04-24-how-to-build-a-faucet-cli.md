---
layout: post
title: "How to build a faucet CLI using NodeJS 🚀"
excerpt: "The complete guide to building a faucet CLI using NodeJS."
original: "https://blog.kiradev.co/how-to-build-a-faucet-cli-using-nodejs"
image: "https://imgur.com/0qQxUt3.png"
audioId: 4050344
category: web3
tags: ["blockchain", "node-js", "cli"]
author: kira
permalink: /kira/how-to-build-a-faucet-cli-using-node-js
---

Hey everyone 👋! I guess I took a long break from blogging but I am back with some interesting web3 stuff. Today we are doing to be BUIDLing a command-line interface that would act as a faucet and we would be also adding metamask authentication to it 🚀!

![https://c.tenor.com/oR5fQW3UW78AAAAC/gm-web3.gif](https://c.tenor.com/oR5fQW3UW78AAAAC/gm-web3.gif)

# 💡 The idea

Let’s understand the idea of the command-line interface which we are going to be building. It’s a simple command-line interface that would transfer testnet tokens to the user and we are going to be adding metamask authentication also 👀.

Wait what? Metamask authentication via a CLI ???

![https://c.tenor.com/awhlFQC8WcAAAAAM/kid-what.gif](https://c.tenor.com/awhlFQC8WcAAAAAM/kid-what.gif)

Let me explain how are we going to implement the Metamask authentication.

- We would create a basic website using Next.js which would have the connect with wallet (Metamask authentication) button. We would be using thirdweb to add Metamask authentication to our Next.js website.
- After the user has authenticated themselves via Metamask on the website, they would be redirected to a page with route `/callback`. When redirected the page would also contain a query parameter that contains the user’s wallet address 👀. So the user would be redirected to a page with route path something like this: `/callback?address=0xd24CA0297558f0827e2C467603869D1AC9fF435d`.
- We would be starting up a local express application at port `9991` (don’t worry we would be immediately closing the port after the authentication process is been completed). The `/callback` route exists on this local express application.
- 👀 We don’t want the user to be seeing a blank page for hours right? (in context to make the user stay on the `/callback` route on the local express application) Instead, we can redirect them to a `/done` route on the main website, so that they will know that the authentication process is being completed.

![Authentication workflow](https://imgur.com/OeXrCG0.png)

😵‍💫 Woah! That’s hard to digest in one go

# ⚒️ Tech stack

The tech stack which we are going to be using to build this CLI:

- TypeScript as the main programming language that we are going to be using to program the command-line interface, website, and the backend
- Next.js as the framework that we are going to be using to build the website
- Tailwind CSS as our CSS framework to style the website
- Express as the backend framework
- Oclif as our command-line interface framework
- Thirdweb for the metamask authentication
- Web3.js and Ethers to perform tasks such as sending the testnet token to the user
- Alchemy as our blockchain node service

# 🛠️ Building the website

## 🏗️ Creating a new Next.js project

Let’s create a new Next.js project by using the following command:

```shell
npx create-next-app -e=with-tailwindcss thw-faucet-cli
```

I am using `thw-faucet-cli` as my CLI name. Feel free to change the name of the CLI.

This should generate a folder structure similar to this:

![Folder structure of the generated Next.js project](https://imgur.com/7wf52Gk.png)

## 🦁 Adding metamask authentication using thirdweb

We would have to install a few packages so that we can build the metamask authentication using thirdweb.

```shell
yarn add @thirdweb-dev/react @thirdweb-dev/sdk ethers
```

After you have installed it, go ahead and open the `pages/_app.tsx` file. We would have to set up the `ThirdwebProvider` that provides all the context consumed by your app. With this context, you will have a standard web3 provider that you can use throughout your app.

To set up the `ThirdwebProvider` you need to just wrap your app with the following setup:

```tsx
import type { AppProps } from "next/app";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const desiredChainId = ChainId.Mumbai;

  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
```

Let’s now add the feature where the user can click a button and can connect their wallet to the website.

Head over to the `pages/index.tsx` file and add the following code:

```tsx
import type { NextPage } from "next";

import {
  useAddress,
  useMetamask,
  useCoinbaseWallet,
  useWalletConnect,
  useDisconnect,
} from "@thirdweb-dev/react";

const Home: NextPage = () => {
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const address = useAddress();
  const disconnectWallet = useDisconnect();

  if (address) {
    return (
      <div>
        <p className="m-12 font-medium text-gray-600">Address: {address}</p>
        <br />
        <button
          onClick={disconnectWallet}
          className="w-64 rounded-full bg-blue-600 py-2 font-medium text-white transition-all duration-75 hover:bg-blue-500"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gray-50">
        <button
          onClick={connectWithCoinbaseWallet}
          className="w-64 rounded-full bg-blue-600 py-2 font-medium text-white transition-all duration-75 hover:bg-blue-500"
        >
          Connect Coinbase Wallet
        </button>
        <button
          onClick={connectWithMetamask}
          className="w-64 rounded-full bg-blue-600 py-2 font-medium text-white transition-all duration-75 hover:bg-blue-500"
        >
          Connect MetaMask
        </button>
        <button
          onClick={connectWithWalletConnect}
          className="w-64 rounded-full bg-blue-600 py-2 font-medium text-white transition-all duration-75 hover:bg-blue-500"
        >
          Connect WalletConnect
        </button>
      </div>
    </>
  );
};

export default Home;
```

Let’s understand what kind of magic is the above code doing 👀

We are using the React hooks provided by the `@thirdweb-dev/react` package which we have installed just a while ago. We are importing the following hooks:

- `useAddress`, Used to get the address when the user has successfully authenticated themselves via metamask
- `connectWithMetamask`, Used to open the metamask popup from which the user can authenticate themselves
- `connectWithCoinbaseWallet`, Used to authenticate the user via [Coinbase Wallet](https://www.coinbase.com/wallet)
- `connectWithWalletConnect`, Used to authenticate the user via [Wallet Connect](https://walletconnect.com/)

Let’s now test it out by running `yarn dev` command.

{% include youtube.html id="Kk5WpFlbC4Y" %}

🎉 Woohoo!! It’s working

## 🎨 Building the done page

Let’s now build the done page. We are going to keep it simple as of this tutorial, you can improve the UI as you wish.

Create a new file named `done.tsx` under the `pages` folder and add the following code:

```tsx
import type { NextPage } from "next";

const Done: NextPage = () => {
  return (
    <p className="m-12 font-medium text-gray-600">
      You have successfully connected your metamask wallet to the CLI. You can
      now close this tab and return to the CLI
    </p>
  );
};

export default Done;
```

# 🛠️ Building the CLI

## 🏗 Creating a new CLI project using Oclif

Let's create a new CLI project using the following command:

```shell
npx oclif generate cli
```

Fill in the inputs which are been asked and hit enter. This should generate a folder structure similar to this:

![](https://imgur.com/IbGbxej.png)

> Psst... I am making a monorepo for this tutorial. So make sure to add the code responsible for CLI into the `cli` folder and the code responsible for the website into the `web` folder.

Let's now delete some default generated files by Oclif that we are not going to be using in this tutorial.

- We are not going to write any kind of tests for this tutorial. So let's just delete the `tests` folder and the `.mocharc.json` file.
- We are not going to be using CircleCI for this tutorial. So let's just delete the `.circleci` folder.
- Oclif has also generated a default command (`hello`) which isn't necessary for this tutorial, so let's just delete the `src/commands/hello` folder.

## 🔑 Building the login command

Oclif CLI has pretty useful generator commands which can be used to generate commands quickly!

Let's create a new command named `login` which would be used to authenticate the user via metamask.

```shell
npx oclif generate command login
```

This would generate two files:

- `src/commands/login.ts`
- `src/test/commands/login.test.ts`

As I have said before, we would be not writing any tests in this tutorial. So let's just delete the `test` folder again.

Head over to the `src/commands/login.ts` file. You would see that there is a lot of boilerplate code.

Let's clean it up and add a console log to run the `run` function by which we can verify that our Oclif CLI setup doesn't have any issues.

```tsx
import { Command } from "@oclif/core";

export default class Login extends Command {
  static description = "🦁 Connect your Metamask wallet to the faucet CLI";

  static examples = ["faucet-cli login"];

  async run() {
    console.log("🎉 It's working!");
  }
}
```

The `description` and the `examples` are shown in the help sub-command.

Let's test the CLI out but first, we need to compile TypeScript code into JavaScript code. We do it by running the `yarn build` command. It would create a `dist` folder with the compiled JavaScript code.

To run the CLI, we need to run the `run` file present in the `bin` folder along with the command. So to run the `login` command, we have to run the `./bin/run login` command.

![https://imgur.com/pYbAEBw.png](https://imgur.com/pYbAEBw.png)

🎉 Woohoo! It's working!

Let's now actually build the login command 👀.

Create a new folder named `lib` and then create a new file under it named `connectWallet.ts`. This file would contain the logic to connect the user's wallet to the CLI.

Let's install a package called [`inquirer`](https://www.npmjs.com/package/inquirer) which is used to prompt the user for input. We would be using this package to prompt the user to open the browser or not.

```shell
yarn add inquirer
```

As we are using TypeScript, we need also to install [`@types/inquirer`](https://npmjs.com/package/@types/inquirer) as a dev dependency. The `@types/inquirer` package includes the type declarations for the `inquirer` package.

```shell
yarn add -D @types/inquirer
```

Let's import the `inquirer` package into our `src/lib/connectWallet.ts` file.

```tsx
import * as inquirer from "inquirer";
```

Let's now programmatically create a prompt that asks the user whether to open the browser or not using inquirer.

```tsx
import * as inquirer from "inquirer";

const connectWallet = () => {
  inquirer
    .prompt([
      {
        name: "openBrowser",
        type: "confirm",
        message: "Would you like to open the browser to connect wallet?",
        default: true,
      },
    ])
    .then((answer) => {
      console.log(answer);
    });
};

export default connectWallet;
```

I have wrapped the entire code which is responsible for connecting the user's wallet inside a function. As we are going to be importing this into the `src/commands/login.ts` file.

Let's import the `connectWallet` function into our `src/commands/login.ts` file and call it inside the `run` function.

```tsx
import { Command } from "@oclif/core";

import connectWallet from "../lib/connectWallet";

export default class Login extends Command {
  static description = "🦁 Connect your Metamask wallet to the faucet CLI";

  static examples = ["faucet-cli login"];

  async run() {
    connectWallet();
  }
}
```

Let's build the code and test it out.

![https://imgur.com/OSbXO8A.png](https://imgur.com/OSbXO8A.png)

As you can see the inquirer package returns an object with the key as the name of the prompt and the value as the answer.

Let's add a console log that says that the user won't be able to use the request command if they don't connect their wallet.

```tsx
import * as inquirer from "inquirer";

const connectWallet = () => {
  inquirer
    .prompt([
      {
        name: "openBrowser",
        type: "confirm",
        message: "Would you like to open the browser to connect wallet?",
        default: true,
      },
    ])
    .then((answer) => {
      if (!answer.openBrowser) {
        console.log(
          "You won't be able to request testnet tokens if you don't connect your wallet."
        );
        return;
      }
    });
};

export default connectWallet;
```

Let's now start building the cool part of the CLI, authenticating the user 🦄.

We need to first need a few packages:

- [`express`](https://www.npmjs.com/package/express), to start a local server at port `9991` to handle the authentication.
- [`open`](https://www.npmjs.com/package/open), to open links in the browser from the cli.
- [`chalk`](https://www.npmjs.com/package/chalk), to colorize the console output.

To install all of the above packages, run the following command:

```shell
yarn add express open chalk@4.1.2
```

We are using the [v4.1.2](https://github.com/chalk/chalk/releases/tag/v4.1.2) of chalk as [v5](https://github.com/chalk/chalk/releases/tag/v5.0.0) of chalk is complete ESM module. As we are using TypeScript, it is better to stay on the v4.1.2.

As we are using Typescript, we need also to install the TypeScript declarations for the above packages. `chalk` and `open` come with in-built TypeScript declarations. So we need to just install the TypeScript declarations for the `express` package.

```shell
yarn add -D @types/express
```

Let's start a local express application when the user chooses `Yes` for the prompt.

```tsx
import * as inquirer from "inquirer";
import * as express from "express";
import * as open from "open";

const connectWallet = async () => {
  inquirer
    .prompt([
      {
        name: "openBrowser",
        type: "confirm",
        message: "Would you like to open the browser to connect wallet?",
        default: true,
      },
    ])
    .then(async (answer) => {
      if (!answer.openBrowser) {
        console.log(
          "You won't be able to request testnet tokens if you don't connect your wallet."
        );
        return;
      }

      try {
        const app: express.Application = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        const server = app.listen(9991);

        server.close();

        process.exit(0);
      } catch (err) {
        console.log(err);

        process.exit(1);
      }
    });
};

export default connectWallet;
```

👀 We have to change some code in the website. So let's head back to the `web` folder and open the `pages/index.tsx` file. Let's replace the code where we were showing the user's wallet address after they have connected theirs to redirecting the user to the local express's `/callback` with the address query parameter.

```tsx
import type { NextPage } from "next";

import {
  useAddress,
  useMetamask,
  useCoinbaseWallet,
  useWalletConnect,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const address = useAddress();
  const router = useRouter();

  if (address) {
    router.push(`http://localhost:9991/callback?address=${address}`);
  }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gray-50">
        <button
          onClick={connectWithCoinbaseWallet}
          className="w-64 rounded-full bg-blue-600 py-2 font-medium text-white transition-all duration-75 hover:bg-blue-500"
        >
          Connect Coinbase Wallet
        </button>
        <button
          onClick={connectWithMetamask}
          className="w-64 rounded-full bg-blue-600 py-2 font-medium text-white transition-all duration-75 hover:bg-blue-500"
        >
          Connect MetaMask
        </button>
        <button
          onClick={connectWithWalletConnect}
          className="w-64 rounded-full bg-blue-600 py-2 font-medium text-white transition-all duration-75 hover:bg-blue-500"
        >
          Connect WalletConnect
        </button>
      </div>
    </>
  );
};

export default Home;
```

Let's now try to open the `http://localhost:3000` in the browser and console log the user's wallet address when he successfully connected his wallet.

```tsx
import * as inquirer from "inquirer";
import * as express from "express";
import * as open from "open";

const connectWallet = async () => {
  inquirer
    .prompt([
      {
        name: "openBrowser",
        type: "confirm",
        message: "Would you like to open the browser to connect wallet?",
        default: true,
      },
    ])
    .then(async (answer) => {
      if (!answer.openBrowser) {
        console.log(
          "You won't be able to request testnet tokens if you don't connect your wallet."
        );
        return;
      }

      try {
        const app: express.Application = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        const server = app.listen(9991);

        let resolve: any;

        const p = new Promise((_resolve) => {
          resolve = _resolve;
        });

        // get the address query param which is been sent by the website and redirecting the user to the done page.
        app.get(
          "/callback",
          async (req: express.Request, res: express.Response) => {
            resolve(req.query.address);
            res.redirect("http://localhost:3000/done");
          }
        );

        // opening the main website in browser
        open("http://localhost:3000");

        // grabbing the address from the query param
        const code = await p;

        console.log(code);

        // closing the server as we don't want it to run forever
        server.close();

        process.exit(0);
      } catch (err) {
        console.log(err);

        process.exit(1);
      }
    });
};

export default connectWallet;
```

Let's test it out by starting the website with the `yarn dev` command. Make sure that you are present in the `web` folder before running this command.

Let's also compile the TypeScript code of the CLI into JavaScript by using the `yarn build` command. Make sure that you are present in the `cli` folder before running this command.

Let's now finally test the login command by running the `./bin/run login` command while being there in the `cli` directory.

{% include youtube.html id="w-aUXaZueLE" %}

👀 We are missing out on something...

We don't want the user to connect their wallet every single time they use our CLI to request testnet tokens. So let's store the user's wallet address in a local file that lives in the user's root directory. The path of the config file (`config.json`) would be something like this `<user's-root-dir>/.thw-faucet-cli/config.json`. The structure of content inside the `config.json` would be something like this:

```json
{
  "address": "0x0"
}
```

Create a new folder named `utils` and create a new file under it named `saveAddress.ts`. This file would contain the logic for creating a new file and then writing the user's wallet address to it.

```tsx
import * as fs from "fs";
import * as os from "os";

import { configFilePath } from "../constants/constants";

const saveAddress = (address: string) => {
  try {
    fs.mkdirSync(`${os.homedir()}/.thw-faucet-cli`);
    fs.writeFileSync(configFilePath, JSON.stringify({ address: address }));
  } catch (err) {
    console.log(err);
    return;
  }
};

export default saveAddress;
```

I have created a new file named `constants/constants.ts` which contains the path of the config file. I did this because we are going to be using the path of the file in multiple places.

Let's import the `saveAddress` function into the `lib/connectWallet.ts` file and call it along with the user's wallet address as the parameter.

```tsx
import * as inquirer from "inquirer";
import * as express from "express";
import * as open from "open";
import * as chalk from "chalk";

import saveAddress from "../utils/saveAddress";

const connectWallet = async () => {
  inquirer
    .prompt([
      {
        name: "openBrowser",
        type: "confirm",
        message: "Would you like to open the browser to connect wallet?",
        default: true,
      },
    ])
    .then(async (answer) => {
      if (!answer.openBrowser) {
        console.log(
          "You won't be able to request testnet tokens if you don't connect your wallet."
        );
        return;
      }

      try {
        const app: express.Application = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        const server = app.listen(9991);

        let resolve: any;

        const p = new Promise((_resolve) => {
          resolve = _resolve;
        });

        // get the address query param which is been sent by the website and redirecting the user to the done page.
        app.get(
          "/callback",
          async (req: express.Request, res: express.Response) => {
            resolve(req.query.address);
            res.redirect("http://localhost:3000/done");
          }
        );

        // opening the main website in browser
        open("http://localhost:3000");

        // grabbing the address from the query param
        const code = await p;

        // storing the user's address locally in the config file
        saveAddress(code as string);

        console.log(
          chalk.greenBright(
            `\nYou have successfully connected your wallet to the faucet CLI!\nWallet address: ${code}`
          )
        );

        // closing the server as we don't want it to run forever
        server.close();

        process.exit(0);
      } catch (err) {
        console.log(err);

        process.exit(1);
      }
    });
};

export default connectWallet;
```

If the user has logged in once and the address has been saved then if the user tried to log in again, then it would be a problem 🤔. So let's first check if the `config.json` file exists or not. If it exists then call the `connectWallet` function or else console log that the user is already logged in.

Let's create a new file named `utils/getToken.ts` which contains the logic for getting the token which is been stored in the local file (`config.json`).

```tsx
import * as fs from "fs";

import { configFilePath } from "../constants/constants";

const getToken = () => {
  try {
    const config = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
    return config.address;
  } catch (err) {
    return null;
  }
};

export default getToken;
```

We are returning `null` if the `address` key in the `config.json` file doesn't exist and the value of the `address` key if it exists.

Let's import the `getToken` function into the `src/commands/login.ts` file and call it.

```tsx
import { Command } from "@oclif/core";
import * as chalk from "chalk";

import connectWallet from "../lib/connectWallet";

import getToken from "../utils/getToken";

export default class Login extends Command {
  static description = "🦁 Connect your Metamask wallet to the faucet CLI";

  static examples = ["faucet-cli login"];

  async run() {
    // checking if the user is already logged in or not
    if (getToken() === null) {
      console.log(chalk.redBright("\nYou are already logged in!"));
      return;
    }
    connectWallet();
  }
}
```

Let's test it out 👀

![](https://imgur.com/847lRJj.png)

🎉 Woohoo! We have successfully made the login command. Phew! That was long. Let's take a coffee break ☕.

![](https://c.tenor.com/2KcNT1aGdNEAAAAC/coffee-need.gif)

Let's back to work now 🚀!

## 🚰 Building request command

Let's start building the main core command of the CLI, the `request` command.

### 👷‍♂️ Workflow of the request command

Let's understand the workflow of the request command:

- The user first uses the `request` command, we would check if the user is logged in or not via the `getToken` function.
- If the user is not logged in, then we console log saying that you need to be logged in to use this command.
- If the user is logged in, then send a request to the backend with the specified network (for this tutorial I am going to be Rinkeby and Polygon Mumbai testnet networks)
- The backend would use web3.js and ethers to send the testnet tokens to the user and it would return with the transaction hash in the response.

Let's use Oclif's CLI to generate a new command:

```shell
npx oclif generate command request
```

As I have mentioned before, we would not be writing any kinds of test in this tutorial. So let's delete the generated `test` folder again.

Go ahead and open the `src/commands/request.ts` file and let's clean the boilerplate code.

```tsx
import { Command } from "@oclif/core";

export default class Request extends Command {
  static description = "🚰 Request for testnet tokens";

  async run() {}
}
```

Let's use the inquirer package to prompt the user with the supported testnet networks. In this tutorial, I would be using Rinkeby and Polygon Mumbai. Feel free to add any testnet network in which you have a sufficient amount of tokens to build a faucet out of it.

Let's create a file named `src/data/questions.ts` which would contain an array with all the questions which would be prompted to the user. I have created another file named `src/data/networks.ts` which would contain an array with all the supported testnet networks.

`src/data/networks.ts`

```tsx
const networks = ["mumbai", "rinkeby"];

export default networks;
```

`src/data/questions.ts`

```tsx
import networks from "./networks";

const questions = [
  {
    type: "list",
    name: "network",
    message:
      "🦄 choose the testnet network on which you want to request the tokens",
    choices: networks,
  },
];

export default questions;
```

Let's import the `questions` array in the `src/commands/request.ts` file and use the inquirer package to create a prompt out of it.

```tsx
import { Command } from "@oclif/core";
import * as inquirer from "inquirer";

import questions from "../data/questions";

export default class Request extends Command {
  static description = "🚰 Request for testnet tokens";

  async run() {
    inquirer.prompt(questions).then((answers) => {});
  }
}
```

👀 Oh wait... We forgot to check whether the user is logged in or not firstly. Let's import the `getToken` function into the `src/commands/request.ts` file and call it.

```tsx
import { Command } from "@oclif/core";
import * as inquirer from "inquirer";
import * as chalk from "chalk";

import getToken from "../utils/getToken";

import questions from "../data/questions";

export default class Request extends Command {
  static description = "🚰 Request for testnet tokens";

  async run() {
    if (getToken() === null) {
      console.log(
        chalk.redBright(
          "\nYou need to be logged in first to use this command!\nUse `faucet-cli login` command to login."
        )
      );
      return;
    }

    inquirer.prompt(questions).then((answers) => {});
  }
}
```

# ✨ Building the backend

Let's now start building the backend 🦄.

Create a new folder named `server` in the root directory.

Let's initialize a new npm project by using the `yarn init -y` command. Make sure to run `cd server`, if you are present in the root directory. This should generate a `package.json` file.

Let's edit the `package.json` file a bit:

```json
{
  "name": "server",
  "version": "0.0.1",
  "main": "dist/index.js",
  "license": "MIT"
}
```

Let's now add the packages which we would need to build the backend:

- [`express`](https://www.npmjs.com/package/express), as our backend framework
- [`web3`](https://www.npmjs.com/package/web3) and [`ethers`](https://www.npmjs.com/package/ethers), as our blockchain library
- [`dotenv`](https://www.npmjs.com/package/dotenv), to read the environment variables from the `.env` file

To install the above packages, run the following command:

```shell
yarn add express web3 ethers dotenv
```

As we are using TypeScript, we would also need to install a few more packages as dev dependencies:

- `@types/express`, type declarations for `express`
- `typescript`, to compile the TypeScript code
- `ts-node`, to run the TypeScript code
- `nodemon`, to run the reload the server on file changes

```shell
yarn add -D @types/express typescript ts-node nodemon
```

After the package has been installed, let's create a new `tsconfig.json` where we defined the configuration to be followed by the TypeScript compiler.

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
  "include": ["./src/**/*.ts", "tsconfig.json", "index.ts"]
}
```

Let's create a new file named `src/index.ts` and add the following code:

```tsx
import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "Alive!",
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${port}`);
});
```

Let's understand what does the above code does:

- We are importing the `express` package and creating an instance of `express` called `app`.
- We have defined a GET route `/` which returns a JSON object saying `status: 'Alive!'.
- We have defined a middleware `app.use` which is used to parse the incoming request body as JSON and URL encoded.
- We are defining a `port` variable that would be used to listen to the port. The port which we are defining right now (in our case it's `3000`) might vary from the port on which the server would run in the production mode. So, we are defining a `process.env.PORT` variable which would be used to listen to the port.

Let's add a few scripts in the `package.json`:

```json
  "scripts": {
    "watch": "tsc --watch",
    "start": "node dist/src/index.js",
    "build": "tsc",
    "dev": "nodemon dist/src/index.js"
  }
```

Let's now open two terminal windows, one for compiling the TypeScript code and the other for running and automatically reloading the server on file changes. Run `yarn watch` in one of the terminals and `yarn dev` in the other terminal. Make sure that you are present in the `server` directory, if not then run the `cd server` command before running the above commands.

![](https://imgur.com/nu1v6ji.png)

👀 We have just created a basic express application. Let's now understand how can we test the routes which we have added. Currently, we only have one route but as our backend grows, we would have more and more routes.

If you are using VSCode then there is a pretty good extension that can help you to test the API routes inside VSCode itself. Go ahead and search for `Thunder Client` in the extensions tab and install the one whose author is `Ranga Vadhineni`.

After you have installed Thunder Client, you would see a thunder icon in the left sidebar.

![](https://imgur.com/IWAyZnh.png)

Click that thunder client and you would see a webview something like this:

![](https://imgur.com/56PS9C2.png)

Click the "New Request" button and you would see a screen like this:

![](https://imgur.com/2qtTgLk.png)

If you have used Postman before then you would feel this interface is familiar.

Let's change the URL to `http://localhost:3000/` and click the "Send" button.

![](https://imgur.com/9EyPFvl.png)

You would see the response like this:

![](https://imgur.com/rvKbvOo.png)

Let's now start building the actual `request` route which would send the tokens to the user.

Let's create a new folder called `controllers`, this folder would contain the core logic for the respective routes. Create a new file called `request.ts` under the `controllers` folder.

It's the time to interact with the blockchain using `ethers` and `web3.js` libraries.

![](https://c.tenor.com/siUF6_Z22eUAAAAC/wow.gif)

Let's add the following code to the `src/controllers/request.ts` file, don't worry we would be explaining the code:

```tsx
import { Request, Response } from "express";
import { ethers } from "ethers";
import dotenv from "dotenv";
import Web3 from "web3";

import constants from "../data/constants";
import { chainId, txUrl, apiUrls, amount } from "../data/networks";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY!.toString();
const wallet = new ethers.Wallet(privateKey);

const request = async (req: Request, res: Response) => {
  const address = wallet.address;

  const httpsUrl = apiUrls.get(String(req.query.network!));

  var web3 = new Web3(new Web3.providers.HttpProvider(httpsUrl!));

  const httpsProvider = ethers.getDefaultProvider(httpsUrl);

  let nonce = await httpsProvider.getTransactionCount(address, "latest");

  let feeData = await httpsProvider.getFeeData();

  const balance = web3.utils.fromWei(
    // @ts-ignore
    await web3.eth.getBalance(constants["fromAddress"]),
    "ether"
  );

  if (web3.utils.isAddress(String(req.query.address!)) === false) {
    res.json({
      error: "Invalid receiver address",
      invalidAddress: true,
    });
  } else {
    // @ts-ignore
    if (balance < amount?.get(req.query.network)!) {
      res.json({
        error: "Insufficient funds",
        insufficientFunds: true,
      });
    } else {
      const tx = {
        type: 2,
        nonce: nonce,
        to: req.query.address,
        maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"],
        maxFeePerGas: feeData["maxFeePerGas"],
        // @ts-ignore
        value: ethers.utils.parseEther(amount.get(req.query.network)),
        gasLimit: 30000,
        chainId: chainId.get(String(req.query.network)),
      };

      // @ts-ignore
      const signedTx = await wallet.signTransaction(tx);

      const txHash = ethers.utils.keccak256(signedTx);
      console.log("Precomputed txHash:", txHash);
      httpsProvider.sendTransaction(signedTx).then(console.log);

      res.json({
        txLink: `${txUrl.get(String(req.query.network))}/${txHash}`,
      });
    }
  }
};

export default request;
```

![](https://c.tenor.com/f-maJKMFVRMAAAAC/kevin-hart-dst.gif)

Damn! That's a lot of code. Let's break it down:

- We are importing the `express` (along with the `Request` and `Response` types), `ethers`, `web3.js`, and `dotenv` libraries.
- We are importing the `chainId` (Chain ID of the supported networks), `txUrl` (The URL of the blockchain explorer along with the `tx` route), `apiUrls` (URL of Alchemy project), `amount` (The amount of tokens to be sent on each network). Wait what's this `data/network.ts` file now? What does it contain? The `data/networks.ts` basically contains a quite few hashmaps to map the network name with the properties mentioned above.

  ```tsx
  import dotenv from "dotenv";

  dotenv.config();

  const chainId = new Map([
    ["mumbai", 80001],
    ["rinkeby", 4],
  ]);

  const txUrl = new Map([
    ["mumbai", "https://mumbai.polygonscan.com/tx"],
    ["rinkeby", "https://rinkeby.etherscan.io/tx"],
  ]);

  const apiUrls = new Map([
    ["mumbai", process.env.ALCHEMY_API_URL_MUMBAI],
    ["rinkeby", process.env.ALCHEMY_API_URL_RINKEBY],
  ]);

  const amount = new Map([
    ["mumbai", "1"],
    ["rinkeby", "0.1"],
  ]);

  export { chainId, txUrl, apiUrls, amount };
  ```

- We configured the `dotenv` library to load the environment variables from the `.env` file.
- We are creating a wallet using the `ethers` library using the private key. Wait whose private key is it? Is it the private key of the user? Nope! It's the private key of a new metamask wallet which we are going to be creating now specifically for this faucet.

  > If you have metamask then you can skip to step 5.

  - To install the metamask extension, go ahead to [Metamask](https://metamask.io) and install the extension.
  - After you have installed the extension, you would see a page something like this. Click get started.

    ![](https://imgur.com/CriKrTv.png)

  - Click on create a new wallet

    ![](https://imgur.com/kkFt2qW.png)

  - Type in the password for your Metamask account

    ![](https://imgur.com/yn6fTB3.png)

  - Metamask would give you a **secret recovery phrase** which makes it easy to recover your account. **Never share your secret recovery phrase with anyone**.

    ![](https://imgur.com/yq10GFB.png)

  - Let's create a new wallet for this faucet specifically. Click on the icon of the metamask extension. You would see something like this.

    ![](https://imgur.com/pPiTfHS.png)

  - Click on the avatar of the account which is present on the top right.

    ![](https://imgur.com/jY3Jjck.png)

  - Select "Create Account". This should ask you for the name of the new wallet that you are going to create.

    ![](https://imgur.com/pDoRz7h.png)

  - After you have entered the name of the new wallet, click on the "Create" button.

    ![](https://imgur.com/Uu4oYOb.png)

  - Let's now export the private key of this wallet. Click on the three dots on the top right and then select "Account details".

    ![](https://imgur.com/SZxQbvP.png)

  - Click on "Export private key", and you would be asked for your metamask password. Enter that in copy the private key.
  - Create a new file called `.env` under the `server` folder and add the following text in that file.

    ```
    PRIVATE_KEY=<add your private key over here>
    ```

- We have then grabbed the API URL from the hashmaps of the `src/data/networks.ts` file. Wait what are these API URLs? These are the API URLs of our Alchemy project.

  - If you don't know have an account at Alchemy, you can create one at [Alchemy](https://www.alchemy.com).
  - After you have created the account head over to [the dashboard](https://dashboard.alchemyapi.io) and create a new project. We would be creating two apps one for Rinkeby and one for Polygon Mumbai.

    ![](https://imgur.com/77AIeaY.png)

    ![](https://imgur.com/AACBTq9.png)

  - After you have created the project, click on it and it would open the dashboard for that project and click on the "View key"

    ![](https://imgur.com/Kf4c2X7.png)

  - Copy the HTTP API key and paste it into the `.env` file. The `.env` file would look something like this now:

  ```
  PRIVATE_KEY=<add your private key over here>
  ALCHEMY_API_URL_MUMBAI=<add the alchemy api url for the polygon mumbai network over here>
  ALCHEMY_API_URL_RINKEBY=<add the alchemy api url for the rinkeby network over here>
  ```

- We are checking whether the given wallet address is valid or not using the `web3.js` library.

  ```tsx
  if (web3.utils.isAddress(String(req.query.address!)) === false) {
    res.json({
      error: "Invalid receiver address",
      invalidAddress: true,
    });
  }
  ```

- We are also checking whether we have a sufficient amount of balance in the wallet or not.

  ```tsx
  if (balance < amount?.get(req.query.network)!) {
    res.json({
      error: "Insufficient funds",
      insufficientFunds: true,
    });
  }
  ```

- We are then using the `ethers` library to send the tokens to the receiver.

```tsx
const tx = {
  type: 2,
  nonce: nonce,
  to: req.query.address,
  maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"],
  maxFeePerGas: feeData["maxFeePerGas"],
  // @ts-ignore
  value: ethers.utils.parseEther(amount.get(req.query.network)),
  gasLimit: 30000,
  chainId: chainId.get(String(req.query.network)),
};

// @ts-ignore
const signedTx = await wallet.signTransaction(tx);

const txHash = ethers.utils.keccak256(signedTx);
console.log("Precomputed txHash:", txHash);
httpsProvider.sendTransaction(signedTx).then(console.log);

res.json({
  txLink: `${txUrl.get(String(req.query.network))}/${txHash}`,
});
```

Create a new file called `router.ts` under the `server` folder and add the following text in that file.

```tsx
import { Router } from "express";

import request from "./controllers/request";

const router = Router();

router.post("/request", request);

export default router;
```

Here we are importing the `request` controller from the `controllers` folder and creating a specific route for it (`/request`).

Let's now import `router` into the `src/index.ts` file and use the `app.use` method on `router`

```tsx
import router from "./router";
```

```tsx
app.use("/api", router);
```

Let's test the `/api/request` route but before testing, we need to get some testnet tokens into the account of the faucet CLI. Recently I have made a CLI get testnet tokens right away from the terminal so maybe it can help y'all 👀.

[GitHub repo](https://github.com/Kira272921/faucetli)

If you don't want to get the testnets tokens from the CLI, then you can get the testnet tokens from these faucets:

- [Polygon Mumbai faucet](https://faucet.polygon.technology/)
- [Rinkeby faucet](https://faucets.chain.link/rinkeby)

After you have got a sufficient amount of testnet tokens, we can now test the `/api/request` route. Go ahead and open Thunder Client and change the API link to `http://localhost:3000/api/request` and change the HTTP request method to `POST`.

![](https://imgur.com/deOCeaI.png)

We need to also pass the following query parameters while sending the request:

- `network` - The network on which the user wants the testnet token. In our case, it's either `mumbai` or `rinkeby`.
- `address` - The address of the receiver.

![](https://imgur.com/anGNMC9.png)

Let's now send the request 🚀!

![](https://imgur.com/JoLSg39.png)

![](https://imgur.com/CBRXFqP.png)

🎉 Woohoo! It's working like a charm

# 👀 Integrating the backend and the CLI

Let's now integrate the backend and the cli using the [`axios`](https://npmjs.com/package/axios) library. We would be calling the backend using axios and then console logging the transaction link into the terminal.

Let's create a new file called `src/lib/sendTokens.ts` under the `cli` folder. This file would be containing the core logic for calling the backend and error handling.

```tsx
import * as ora from "ora";
var axios = require("axios").default;
import * as chalk from "chalk";

import { apiUrl } from "../constants/constants";

const sendTokens = async (wallet: string, network: string) => {
  const spinner = ora(`🦄 sending tokens to ${wallet} on ${network}`).start();

  await axios
    .post(`${apiUrl}/request?address=${wallet}&network=${network}`)
    .then((res: any) => {
      if (res.data.insufficientFunds === true) {
        spinner.fail(
          chalk.redBright(
            `😿 I'm out of funds! You can use the Chainlink Faucet until I get refilled. https://faucets.chain.link.\nDonate: 0x16aD561aC34818E2f314E2D1d5a777cC39f5E3aB`
          )
        );
      } else {
        if (res.data.invalidAddress === true) {
          spinner.fail(chalk.redBright(`🤷‍♂️ The address provided is invalid`));
        } else {
          spinner.succeed(
            chalk.greenBright(
              `🎉 sent the tokens to ${wallet} on ${network}, check ${res.data.txLink} to verify if the transaction was successful`
            )
          );
        }
      }
    })
    .catch((err: any) => {
      spinner.fail(chalk.redBright`😿 ${err}`);
    });
};

export default sendTokens;
```

Woah! That's a lot of code. Let's break it down:

- We are importing a package called `ora` by which we can create terminal spinners. To install `ora` run the following command:

  ```
  yarn add ora@5.4.1
  ```

  Why are we installing the v5.4.1 of ora? Because the latest version of ora is a pure ESM module and instead of changing a hell lot of code, we can just install the version of ora which isn't pure ESM.

  Ora comes with in-built TypeScript declarations so there is no need to install separately for its types.

- We are importing the `axios` package and the `chalk` package. We have already installed the `chalk` package previously. So to install `axios` package run the following command:

  ```shell
  yarn add axios
  ```

- You might notice we are importing a variable called `apiUrl` from the `constants/constants.ts` file. The `apiUrl` variable is the base URL of the backend. As we didn't deploy the backend till now so we would be using localhost.

  ```tsx
  import * as os from "os";

  const configFilePath = `${os.homedir()}/.thw-faucet-cli/config.json`;
  const apiUrl = `http://localhost:3000`;

  export { configFilePath, apiUrl };
  ```

- We are starting a spinner by calling the `ora` function and passing the message as `🦄 sending tokens to ${wallet} on ${network}`.

  ```tsx
  const spinner = ora(`🦄 sending tokens to ${wallet} on ${network}`).start();
  ```

- We are calling the backend with the `address` and `network` query parameters. We are then returning the transaction link which is sent along with the response when we call the backend.

```tsx
await axios
  .post(`${apiUrl}/request?address=${wallet}&network=${network}`)
  .then((res: any) => {
    if (res.data.insufficientFunds === true) {
      spinner.fail(
        chalk.redBright(
          `😿 I'm out of funds! You can use the Chainlink Faucet until I get refilled. https://faucets.chain.link.\nDonate: 0x16aD561aC34818E2f314E2D1d5a777cC39f5E3aB`
        )
      );
    } else {
      if (res.data.invalidAddress === true) {
        spinner.fail(chalk.redBright(`🤷‍♂️ The address provided is invalid`));
      } else {
        spinner.succeed(
          chalk.greenBright(
            `🎉 sent the tokens to ${wallet} on ${network}, check ${res.data.txLink} to verify if the transaction was successful`
          )
        );
      }
    }
  })
  .catch((err: any) => {
    spinner.fail(chalk.redBright`😿 ${err}`);
  });
```

Let's now import the `sendTokens` function into the `src/commands/request.ts` and call with along with the wallet address and the network parameters.

```tsx
import { Command } from "@oclif/core";
import * as inquirer from "inquirer";
import * as chalk from "chalk";

import sendTokens from "../lib/sendTokens";

import getToken from "../utils/getToken";

import questions from "../data/questions";

export default class Request extends Command {
  static description = "🚰 Request for testnet tokens";

  async run() {
    if (getToken() === null) {
      console.log(
        chalk.redBright(
          "\nYou need to be logged in first to use this command!\nUse `faucet-cli login` command to login."
        )
      );
      return;
    }

    inquirer.prompt(questions).then((answers) => {
      sendTokens(getToken(), answers.network);
    });
  }
}
```

# 🧪 Testing the entire project

Let's test it out 🚀! Let me delete the `.thw-faucet-cli` folder from my root directory as I want to test the login command as well.

Let's first build the code of the cli by using the `yarn build` command. Open another terminal window cd into the server folder and run the `yarn dev` command. Open another terminal window cd into the web folder and run the `yarn dev` command.

😱 Oh no! We have just found an issue the `login` command redirects to `localhost:3000` which we thought to be the port where the frontend would run but we have given that port to the backend so let's do a quick fix in the backend code and change the port from `3000` to `8080`. We would also have to change the `apiUrl` variable in the `cli/src/constants/constants.ts` folder.

```tsx
import * as os from "os";

const configFilePath = `${os.homedir()}/.thw-faucet-cli/config.json`;
const apiUrl = `http://localhost:8080/api`;

export { configFilePath, apiUrl };
```

As we have changed some code in the cli folder, we would have to build the code again so let's run the `yarn build` again.

![](https://imgur.com/D1gCRZQ.png)

![](https://imgur.com/74XE9XW.png)

🎉 It's working!!! LFG 🚀

# 🚀 Deploying

Let's now deploy the frontend and the backend and publish the entire cli to npmjs.

## 🎨 Deploying the frontend

Let's deploy the frontend on [Vercel](https://vercel.com/). If you are building a Next.js application and want to deploy it, Vercel is the best option in my opinion.

Let's first create a initialize a git repository from the root directory of the project.

```shell
git init
```

Create a [new GitHub repository](https://repo.new) and push the code to the repository.

Head over to the [Vercel dashboard](https://vercel.com/dashboard) and create a new project and edit the root directory from `./` to `web`.

![](https://imgur.com/XunPAf7.png)

![](https://imgur.com/Cgdi1Y4.png)

Click on deploy and that's it 🎉!

## 🚄 Deploying the backend

We would be deploying the backend on [Railway](https://railway.app/). Create a new project and select "Deploy from GitHub repo"

![](https://imgur.com/4HGqGt2.png)

Select the GitHub repo and select add environment variables.

This should create a new project for us. Open up that project you would first see that the deployment has failed, don't worry we would fix that in a minute.

Open the settings tab

![](https://imgur.com/k5q2vau.png)

We would have to change the scripts in the backend a bit:

```json
"scripts": {
  "watch": "tsc --watch",
  "build": "tsc",
  "start": "ts-node src/index.ts",
  "dev": "nodemon dist/src/index.js"
},
```

We also need to add a file called `Procfile` which contains the start command. Create a file named `Procfile` under the `server` folder and add the following to that file:

```
web: yarn start
```

Push the code to the GitHub repo and this should railway should redeploy it for us.

This should redeploy the latest commit again. You might see the deployment has failed again no worries we will fix it.

Head over to the variables tab and bulk import the environment variables from the `.env` file. We would also need to change the root directory from `/` to `server`. Head over to the settings tab and scroll down a bit and change the root directory from `/` to `server` and add the start command as `yarn start`.

That's you have just deployed the backend on the railway! 🎉

## 📦 Publishing the CLI

Let's now finally publish our CLI on npmjs. We would need to change the links of the backend and the frontend in the code of CLI. So let's do that:

- In the `src/constants/constants.ts` change the backend URL from `localhost:8080` to the deployed URL of the backend.
- In the `src/lib/connectWallet.ts` change the frontend URL from `localhost:3000` to the deployed URL of the frontend.

Let's test the cli out for the last time.

![](https://imgur.com/ryLY9Ih.png)

![](https://imgur.com/V76k4gh.png)

![](https://imgur.com/VdVv0AA.png)

Woohoo! It's working! 🎉

Let's now generate the README.md using oclif 👀. Run `yarn oclif readme` command. This should generate a README.md with the table of content of all the commands which we have created and their usage and descriptions.

Let's now publish it to npmjs by using the `npm publish` command. Woohoo! It's finally done!

![](https://c.tenor.com/MkyiUsAp8t8AAAAM/tom-and-jerry-tom-the-cat.gif)

# 👋 The end

All those who have read the blog post until here deserve a big round of applause. Hope y'all have learned something new from this blog post

![](https://c.tenor.com/Sq7rY9NKKd4AAAAC/oscars-standing-ovation.gif)

## 🔗 Links

- [GitHub](https://github.com/Kira272921/thw-faucet-cli)
- [npmjs](https://www.npmjs.com/package/thw-faucet-cli)
- [Website](https://thw-faucet-cli.vercel.app)
- [Backend](https://thw-faucet-cli-production.up.railway.app)

~ Happy building!
