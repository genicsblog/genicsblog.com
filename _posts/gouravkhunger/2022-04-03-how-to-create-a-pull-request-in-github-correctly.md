---
layout: post
title:  "How to Create a Pull Request in GitHub *Correctly*"
excerpt: "Guide that teaches you how to fork a GitHub repository, make changes and create pull requests in the correct way."
image: "https://user-images.githubusercontent.com/46792249/161420369-eb87073e-b49c-462e-84bf-57c442839eb3.png"
audioId: 3922814
category: "coding"
tags: ["open-source", "beginners", "tips"]
author: gouravkhunger
permalink: /gouravkhunger/how-to-create-a-pull-request-in-github-correctly
---

A major aspect of open source is the ability to create and maintain a community of developers who collaborate on building software together. Collaboration is a key component of open source development!

[Git](https://git-scm.com) and [GitHub](https://github.com) are popular open source collaboration tools. Git helps you keep track of changes to your code, and GitHub helps you share your code with others. In this article, we will teach you how to create a pull request in GitHub in the correct way.

We will use this demo repository to demonstrate the process on collaboration:

{% include linkpreview.html url="https://github.com/gouravkhunger/PRs-demo" title="gouravkhunger/PRs-demo" %}

Feel free to play with it and see how it works. Follow along with the tutorial below.

## 1. Fork the Repository

Forking a repository means you are creating a copy of the repository to your own GitHub account. This makes a clone of the repository that you can work on.

Any changes to your fork will not affect the original repository! Thus, it is kind of a playground area for you to experiment with code/files.

To fork a repository, simply press the **Fork** button on the top right corner of the repository page:

![Fork button on GitHub](https://user-images.githubusercontent.com/46792249/161415696-9e0772ed-60a6-4f5d-98d5-3976217fdc1a.png){:width="80%"}

This creates a new repository in your account.

## 2. Clone the Repository

Cloning a repository means you are downloading the repository to your computer. This creates a folder that you will work on.

Run this command in your terminal:

```shell
git clone https://github.com/<your-username>/PRs-demo
```

This will clone the repository to a folder names `PRs-demo` which you can `cd` into:

```shell
cd PRs-demo
```

## 3. Create a New Branch

Branching is a way to work on a different version of files in a project with Git version control. Creating a new branch is effective when you are working on a new feature or bug fix. Here's why:

- It helps to keep changes organized and clean.
- It separates changes from working code in the main branch. In case of broken code, you can easily revert to the main branch.
- This also helps your fork's main branch clean once your PRs are merged (more on this later).

Run this command in your terminal:

```shell
git checkout -b <new-branch-name>
```

Here, `<new-branch-name>` is the name of the new branch. It can be anything like: `bug-fix`, `feature-1`, `feature-2`, etc. For simplicity purpose you can keep it `learning-about-prs`.

The `-b` flag is used to create a new branch, and `checkout` asks Git to switch to that new branch we created.

To verify that you have correctly switched to the new branch, run:

```shell
git branch
```

This should output something like this:

```
* learning-about-prs
  main
```

The `*` verifies that you are currently on that branch.

## 4. Make changes

Now you can make changes to the files in the project. Here, we just have a `README.md` file. You can edit it and add this sentence to the end of the file:

```markdown
- This line was added by [<Your Name Here>](https://github.com/<your-username>).
```

Make sure to replace `<Your Name Here>` with your name and `<your-username>` with your GitHub username!

## 5. Commit your changes

Committing your changes is crucial to save the current state of your project.

You can check the current state of your project by running:

```shell
git status
```

This tells us which files have changes that are not committed yet. The output would be something like:

```
On branch learning-about-prs
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   README.md
```

Now, we can prepare the README.md file to be committed. Files that have finalized changes and are ready to be committed are moved to the staging area. Git only commited files that are staged, which provides us even more flexibility.

```shell
git add .
```

This adds all the changed files to the staging area. Optionally you can handpick files to be added.

Now, you can make a commit by running this command in your terminal:

```shell
git commit -m "<Commit Message>"
```

Here `-m` flag lets us add a message to our commit. This message is helpful for other people viewing change history of the project. Replace `<Commit Message>` with a short summary of the changes you made. For example: "Added a new line to the README.md file".

## 6. Push changes to your fork

Now that you have committed the file locally, you need to send this file over to your fork present on GitHub.

**NOTE**: GitHub doesn't automatically know about your commits made locally. You need to push the commits yourself.

Since you have made changes to `learning-about-prs`, you can push them to GitHub with this command:

```shell
git push -u origin learning-about-prs
```

Here we are asking git to `push` our changes to the branch `learning-about-prs` on the `origin` present on GitHub (your fork).

`-u` sets the upstream for current branch so that you don't have to type `origin learning-about-prs` everytime. From the next time, even if you type `git push` it will push to `learning-about-prs` branch on GitHub.

> ### Additional Note:
> Here, `origin` is linked to your fork. You can verify it by running this command in your terminal:
>
>
> ```shell
> git remote -v
> ```
> This should show the `push` and `fetch` links which point to your fork.
>
>
> If you change these links by using `git remote rm origin` and `git remote add origin <new-link>`, the commits will be sent to new remote then!

## 7. Make the PR

Once you push your changes to GitHub, open the fork on GitHub. You will be able to see a a notification regarding the new commits to `learning-about-prs` branch.

![Branch had recent pushes, Compare and pull request](https://user-images.githubusercontent.com/46792249/161416102-4e803e63-f22c-4125-a5dd-38ee7c07bbc3.png)

Press the `Compare and pull request` button and you will be presented with an interface to create a pull request.

Enter the appropriate **Title** and **Comment** to our PR. This helps the reviewers know what changes you are making to the repository.

Once you are done with adding the metadata to the PR, go ahead and press the "**Create Pull Request**" button.

Congratulations 🥳

You've successfully made a Pull Request to a repository on GitHub!

Using these steps you can create a Pull Request to any repository on GitHub!

## (Optional) Useful Information

### I forgot to make some required changes but made a PR, do I have to make a new one now?

Absolutely no! GitHub is smart enough to handle this. **You can't create more than one PR from a single branch**. This means that you can add more commits to the current branch and as soon as you push them, they will automatically go to the existing PR.

Just add as many commits you want, to the branch and use `git push`. That will send the commits to the existing PR, avoiding the need to create a new one from scratch!

### Why do we create a new branch in the first place?

There are quite a few reasons to it. The main one being it maintains a separation of concerns. One can work on different features at the same time without affecting existing working code.

This also helps teams to assign different features to different people and collaborate on different parts of projects in realtime.

Another reason is, once the reviewers approve and merge your changes, it adds a new commit to the original repository.

Now your fork would get left behind because it doesn't automatically pull new changes from the original source.

GitHub provides us with **Fetch upstream** button to keep our fork in sync with the remote repository.

![Fetch upstream button on GitHub](https://user-images.githubusercontent.com/46792249/161415987-2c9160b0-9f14-4ee6-b569-16c900b26950.png){:width="60%"}

Pressing **Fetch and merge** gets changes from the original repository to our fork allowing us to keep the fork up to date.

If we had made changes directly to the main branch, it could cause merge conflicts as our fork would have different commits than the original repository.

Also, this could pollute the new PRs with old commits if the main branch of the fork isn't kept up to date with the original repository.

### What is a good place to start with open source?

Genics Blog is an [open source](https://github.com/genicsblog) developer publication where we do a lot of open source work. We are a high school student run organization. Join our [community on Discord](https://discord.genicsblog.com) to learn about opportunities from experienced developers and get involved!

## Further Resources

Check out this video where I use the steps taught here to create a PR to the [`theme-files`](https://github.com/genicsblog/theme-files) repository for [Genics Blog](/) on GitHub:

{% include youtube.html id="wHxlA0p1AbM" %}

## Conclusion

This was a long but to the point guide to create Pull Requests on GitHub which can help you to contribute to open source projects on GitHub.

If you find this guide helpful, or have any related questions feel free to comment or [join our discord](https://discord.genicsblog.com) to get help.

Share this article with people who are new to open source world!
