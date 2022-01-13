---
layout: post
title:  "Make your first Crypto with ThirdWeb 🤯"
image: "![image](https://user-images.githubusercontent.com/76690419/149300558-70052677-940d-49d1-b243-e4e0ba437c01.png)"
languages: ["javascript"]
category: web3
tags: ["web3", "javascript", "blockchain", "crypto"]
author: avneesh
original: "https://blog.avneesh.tech/make-your-first-crypto-with-thirdweb"
---

Have you ever wondered how amazing it would be to create your crypto? So, in this article let's build our very first crypto!

## Setup
Create a new folder-

```
 mkdir thirdweb-crypto
```

Initialize Node.js-

```
npm init -y
```


Change type to `module`

we are going to use modular imports so change the type to `module` in `package.json`-

```
"type": "module",
```

Install the packages needed-

```
npm i @3rdweb/sdk dotenv ethers
```

## Initiazling 3rdweb

To keep stuff clean, create a new folder `scripts`. Inside of it create a file a file `initialize-sdk.js`. Now, paste in the following-

```
import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";
import dotenv from "dotenv";
dotenv.config();
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY == "") {
  console.log("🛑 Private key not found.");
}
if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL == "") {
  console.log("🛑 Alchemy API URL not found.");
}
if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS == "") {
  console.log("🛑 Wallet Address not found.");
}
const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.PRIVATE_KEY,
    ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)
  )
);
(async () => {
  try {
    const apps = await sdk.getApps();
    console.log("Your app address is:", apps[0].address);
  } catch (err) {
    console.error("Failed to get apps from the sdk", err);
    process.exit(1);
  }
})();
export default sdk;
```

This is going to initialize 3rdweb for us but first, we need some keys. So, create a new file `.env` in the root of your folder and add these three variables-

```
WALLET_ADDRESS=<3rdweb_project_address>
ALCHEMY_API_URL=<alchemy_api_key>
PRIVATE_KEY=<wallet_private_key>
```

### Creating a 3rdweb project

Go to  [Thirdweb](https://thirdweb.com/) sign up/in then, create a new project. I am going to use Rinkeby for this demo. Give a name to your project and you can also add a description if you want.

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1641983754661/iFAG14OuU4.png)

Copy the address that you get and replace it as the value of `WALLET_ADDRESS`

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1641984766639/qRsZEzp1l.png)

### Creating an alchemy project

Go to  [alchemy](https://alchemyapi.io/) after signing in, create a new project on the same chain and network as you did on thirdweb.

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1641984259639/7p-ar-Isl.png)

Click on the view key button and copy the HTTP one.

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1641985336824/Fpy2kRSm0.png)

This is the API key that we need from alchemy so paste it in the `.env` file.


### Getting the Private Key

In your metamask wallet, click on account details

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1641985709370/q0ORYddS8.png)

Click on the export private key button, enter the password and copy the key that you get. This is your `PRIVATE_KEY`.



Let's now run the initializing script-

```
node scripts/initialize-sdk.js
```

You will now see your app address-

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1641986218189/E-WpBbIJD.png)

## Creating and deploying our crypto

Create a new file `deploy-token.js` and paste in the following-

```
import sdk from "./initialize-sdk.js";
const app = sdk.getAppModule("YOUR_APP_ADDRESS");
(async () => {
  try {
    const tokenModule = await app.deployTokenModule({
      name: "My Token",
      symbol: "TOKEN",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenModule.address
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();
```
You need to replace the app address with the address that came in the console. You also need to change the name and symbol of the token to what you want it to be called. Let's now run it-

```
node scripts/deploy-token.js
```

It works and the token has been deployed 🥳


![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1641988251933/cS1Or4sUP.png)

You can also view the contract on  [Etherscan](https://rinkeby.etherscan.io/) 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1641988321364/9nju9LAo8.png)


## Import the token to your metamask wallet

We can also see how many tokens we have through the metamask wallet, so open Metamask scroll below and you will see a button "Import tokens".

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1641988462000/-PlYIVzMO.png)

Paste in the address of your token and click **add**.


![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1641988496990/KPFJzu_FG.png)

You will now see our token here 🎉. 

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1641988567376/6jMQO-afG.png)

But it is 0 in quantity so let's mint some tokens.

## Minting tokens

Create a new file `mint-token.js` and add the following-

```
import { ethers } from "ethers";
import sdk from "./initialize-sdk.js";
const tokenModule = sdk.getTokenModule("YOUR_TOKEN_ADDRESS");
(async () => {
  try {
    const amount = 1_000_000;
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();
    console.log(
      "✅ There now is",
      ethers.utils.formatUnits(totalSupply, 18),
      "$TOKEN in circulation"
    );
  } catch (error) {
    console.error("Failed to mint tokens", error);
  }
})();
```
Replace `YOUR_TOKEN_ADDRESS` with the address you got. You can also change the number of tokens to be minted. Currently, it will mint 1,000,000 tokens.

Run the script-

```
node scripts/mint-token.js
```

We successfully minted the tokens! 🥳

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1641989192684/gg9oPg9xv.png)

In metamask also it shows the tokens!

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1641989215876/D8gN8Nm59.png)

You can also send these tokens to your friends or anyone you like :D

## Conclusion

@[thirdweb](@thirdweb) is a great way to build web3 stuff, hope you found this article useful and made your first crypto. See ya in the next one ✌️


### Useful links

[GitHub Repo](https://github.com/avneesh0612/thirdweb-crypto)

[ThirdWeb](https://thirdweb.com/)

[Let's connect](https://links.avneesh.tech/)
