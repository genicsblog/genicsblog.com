---
layout: post
title:  "Introducing JekyllEx - The easiest way to manage a Jekyll blog from an Android device!"
excerpt: "A project I made for the Hashnode x Auth0 August Hackathon."
image: "https://raw.githubusercontent.com/jekyllex/jekyllex-android/main/media/cover-image.png"
audioId: 3467849
category: android
tags: ["open-source", "apps", "jekyll"]
author: gouravkhunger
---

Hello, awesome people! 

Today I present to you my latest project - [JekyllEx](https://jekyllex.xyz), which I have been working on for the [Hashnode Auth0 August Hackathon](https://townhall.hashnode.com/auth0-hackathon)!

## 🎊 Detailed Background

---

**TLDR**: I built JekyllEx because Jekyll(a static site generator) has a lot of potentials, but the learning curve for a non-tech-savvy person was high. 

To bridge the gap, I am presenting JekyllEx which can intuitively manage a Jekyll blog's posts with a much simpler UI and effective editor- using which you don't need to mess with code and commits for any article you write!

---

A few months ago, I got to learn about [Jekyll](https://jekyllrb.com/), which is a static site generator. In short:

>  Jekyll is a simple, blog-aware, static site generator perfect for personal, project, or organization sites. Think of it like a file-based CMS, without all the complexity. Jekyll takes your content, renders Markdown and Liquid templates, and spits out a complete, static website ready to be served by Apache, Nginx, or another web server.

This caught my attention in the first go as I am a blogging freak who has been [testing different blogging solutions for a few years now](https://blog.gouravkhunger.me/introductory-first-post) 😆.

I used Jekyll in many places, testing things locally and then finally making [my sister's blog](https://samdisha.me){:rel="dofollow"} with it, and helped someone(can't mention) to make a [small blog](https://60wordsofwisdom.xyz) for him.

It was just the fact that after initial setup, all we need to do for a new post is write markdown and let Jekyll do the further work... And, since it builds a static site, we can host it for free on Github Pages!

This seems a good deal for someone, who doesn't want to pay much amount for hosting and themes (if we consider WordPress and alternatives), and just want a minimal site for the content they want to put up.

So, I went on to make the blog for my sister. But here comes the tricky part. Jekyll is actually hard for non-techy people. For, at least they must understand basic coding principles and some web dev to be able to understand what goes on in their Jekyll theme and posts.

This was the birth of **JekyllEx**, a solution to a problem that isn't solved because Jekyll hasn't that vast of a community for it to have such solutions. 

> **Jekyll is used by 0.1% of all the websites** whose content management system we know. This is 0.1% of all websites.
>
> ~ [w3techs.com](https://w3techs.com/technologies/details/cm-jekyll)

I had the idea of making a blog manager app for Jekyll, partly because I hadn't coded in a while because of my studies, and partly because my sister would eat my head if there's any single typo in her blog post because I was the one who managed it 😆. I had to edit, preview, test, and commit for such small things which seemed tedious.

I was just procrastinating making this cool project, but as soon as I heard about Auth0, and how easily they let integrating login functionality in an app, I was pretty sure I would be using it. And coincidently, Hashnode partnered with Auth0 to organize the august hackathon challenge and that provided the motivation to work on the project!

JekyllEx wouldn't be made such a short amount of time if Hashnode hadn't partnered with Auth0 to present this hackathon. That's because JekyllEx depends on Github API, and integration with GitHub is in turn provided by Auth0. JekyllEx, at its core, uses the GitHub API to manage jekyll repositories.

To put things in a better structure, these were the points that lead me to make JekyllEx:

- My sister personally needed an intuitive manager app for her Jekyll blog, using which she can do things from her phone itself.
- I wanted to get my hands dirty on some project as I hadn't coded for a while
- I also wanted to do something for this blog, as it had been inactive for some months because I couldn't get the time to post anything 😅
- Hashnode's august hackathon in partnership with Auth0 provided the zeal required to start a new project!

---

## 🚀 Introducing JekyllEx

![round_logo.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630347657127/VGBAZJ7zN.png)

JekyllEx is the new way to write articles for a Jekyll blog. It is an android app using which you can create/edit/delete posts for the blog hosted at Github Pages.

Download and install the [latest release](https://github.com/jekyllex/jekyllex-android/releases/latest) of the app to start relishing the power of blogging from your mobile!

Check out the demo video to know how to use JekyllEx!

{% include youtube.html id="U92BmvFzmCc" %}

---

### 🔗 Some Handy Links:

Before the App tour, let me give you the links to different resources that revolve around JekyllEx and will be referred to, later in the post.

#### GitHub Repositories

Go smash a star on all of 'em 😆. If not all, do star the app's repository 😀

- [GitHub Organisation](https://github.com/jekyllex)
- [JekyllEx Android App](https://github.com/jekyllex/jekyllex-android)
- [Proxy API](https://github.com/jekyllex/jekyllex-api)
- [Demo Jekyll blog](https://github.com/gouravkhunger/demo-jekyll-blog)(to test the app)

#### Others

- [Landing Page](https://jekyllex.xyz)
- [Documentation](https://docs.jekyllex.xyz) (under construction)
- [Hosted API](https://api.jekyllex.xyz)
- [Demo blog's link](https://demo.jekyllex.xyz)

---

## 🔎 App Tour

This section showcases the UI of the JekyllEx app.

### Authentication

This is the auth page where the user must connect his GitHub account with JekyllEx to authorize the App to manage the blog repository.

![auth-page.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630351766117/Q5GSw4BdA.png)

### Home Page

The home page of the app lists all your repositories on the home page, so you can choose the repository that has the Jekyll blog in it.

![home-page.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630351781213/6x7woWiw8.png)

### Posts Page

Clicking on any repository on the Home Page takes you to the Posts page. If the selected repository is a Jekyll blog, then the posts of the blog will be loaded, else an error will be shown that the repository isn't a Jekyll project.

Implementing the logic of loading posts from the `_posts` folder in the repository was a bit tricky, it took me around 1-2 hours to come up with a solution. More on this later in the post!

![posts-page.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630355745666/OuiVtnSgk.png)

### New Post

From the posts page, you can create a new post by pressing the icon on the top right representing "New Post".

![new-post.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630355869755/bv7Unn3vJ.png)

### The Editor

This is the core page of the app where a user can edit and preview the markdown post being rendered live, and also set post metadata. Meta Data in a Jekyll post is a collection of some variables that define specifics about a post like its `Title`, `Description`, `Summary`...

These fields are then used by the installed Jekyll theme to present the posts in the rendered HTML accordingly...

The Editor has two tabs- the **EDIT FILE** tab and the **PREVIEW CHANGES** tab. As the text is entered in the editing pane, it gets auto rendered on the preview pane live.

Another feature of the editor is synchronized scrolling, that is, as soon as one scrolls down in the editing pane, the preview pane scrolls by the same unit so that the editor and the preview show pretty much the same thing and provide a seamless experience of editing.

This is really helpful if the post file is large and the sections that are to be edited are far away, in such scenarios, synchronized scrolling helps a lot.

![editing-page.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630355928541/fYHl0Gzkr.png)

### Profile Page

The app has a cool profile page that shows user information that it receives from the GitHub API. Once the data is fetched, it is cached and saved to a local room database. But the user can force refresh the profile from the menu too.

![profile-page.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630355109995/TcAVSCdzsQ.png)

### Some other sections

These are some of the things that were left in the above images, so included aside:

![other.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630356234366/bxtpJ84ko.png)

---

## 🛠 Technical Details

The codebase of the app is based on the MVVM pattern. Here's a list of tools/libraries/components JekyllEx uses:

### Frontend

#### Platform

- Android

#### Languages Used

- Kotlin
- XML

#### Libraries

- Android Architecture Components
- [Auth0](https://auth0.com/) : For user authentication
- [Retrofit](https://github.com/square/retrofit) : For network requests
- [Room](https://developer.android.com/training/data-storage/room) : For local database and caching user profile
- Kotlin extensions and Coroutines for Room
- [Markwon](https://github.com/noties/Markwon) : Markdown rendering
- [App Updater](https://github.com/javiersantos/AppUpdater) : To check for updates from GitHub Releases
- [Glide](https://github.com/bumptech/glide) : For image loading.
- [Firebase](https://firebase.google.com/) : For push notifications, analytics and crashlytics.

I used [the unofficial `ktlint` plugin](https://plugins.jetbrains.com/plugin/15057-ktlint-unofficial-) for linting the code files locally, and used [GitHub super linter](https://github.com/github/super-linter) as a second lint test for the code files. The super linter also lints XML files.

#### M.A.D. Score

JekyllEx has a [M.A.D.](https://goo.gle/MADscore) score of MAD legend, the Greatest Of All Time of Android development.

Check out the [score card](https://madscorecard.withgoogle.com/scorecards/878880162/).

![summary.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1630400803535/RMu_MMtyW.png)

### Backend

Language: **JavaScript**

JekyllEx uses a proxy API to securely retrieve user information from Auth0 Management API [as recommended in the Auth0 docs](https://auth0.com/docs/connections/calling-an-external-idp-api#from-the-frontend). 

The API is built using express and is hosted on Heroku.

### 🛡️ License

This project is [`MIT`](https://github.com/jekyllex/jekyllex-android/blob/main/LICENSE) licensed.

---

## 👨🏻‍💻 Development Journey

Developing JekyllEx was a lot of fun because it involved learning new things!

I completed most of the UI in 3 days, then took some time to figure out the Proxy API thing. It was completely new for me so I had to struggle a bit for 2 days to understand how Express APIs work.

Then I made the different features by integrating GitHub API. Authorization was effortlessly handled by Auth0! I used the Retrofit library to do all the networking stuff like API calls, handling responses, etc.

I quickly made a [demo blog](https://demo.jekyllex.xyz) with a minimal theme and tested features of JekyllEx once it was done.

## 😎 Challenges

### Making the Proxy API

The biggest challenge I faced during development was building the proxy API, which was needed to securely retrieve user credentials.

I had to look through a lot of articles to understand how Node.js works and how would I get my API to work.

With considerable theoretical help from @[SamJakob](@SamJakob), I got clarity and could proceed to start developing the API.

To get user profiles from Auth0 Management API, we first get an access token that can be used to retrieve the profile.

I use this snippet to refresh the Auth0 access token periodically:

```javascript
// Function to renew Auth0 Management API access token
function getAccessToken() {

  // time after which token must be refreshed, It will be updated later
  refreshAfter = -1;

  // required parameter to pass to Auth0 Management API OAuth
  const body = JSON.stringify({
    "client_id": process.env.CLIENT_ID,
    "client_secret": process.env.CLIENT_SECRET,
    "audience": process.env.AUTH0_AUDIENCE,
    "grant_type": process.env.GRANT_TYPE
  });

  // axios request to get the access token
  axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, body, {
    headers: {
      // Overwrite Axios' automatically set Content-Type
      "Content-Type": "application/json"
    }
  }).then(function (response) {
    // get the access token
    accessToken = response.data.access_token;

    // token must refresh every 10 minutes before the expiration time
    refreshAfter = response.data.expires_in - 600;

    // refresh the token
    setTimeout(getAccessToken, (refreshAfter * 1000));
  }).catch(function (error) {
    accessToken = "";
  });
}

// execute the function for the first time
getAccessToken();
```

This refreshes the Auth0 Management API access token 10 minutes before it expires. This token can be used to query the API to get details of a specific user.

### Getting files from the `_posts` folder

It feels good to give yourself a pat on the shoulders when you do something good, and that also boosts your motivation to strive and do better than ever. I felt this when making the logic for retrieving all the files under the `_post` folder(Jekyll blogs need a `_post` folder with `md` files) 

When we query for items at a particular path in a repository, the GitHub API returns a list of items present there. 

So it seems simple that the files will be there in the `_posts` folder and we can query the content present there from the API and show the posts to the user.

But this is not the case. The thing is, Jekyll looks for markdown files in the _posts folder on nested folders too. That means if someone has a file at the following path:

```
_posts/android/2021-08-29-introduction-to-android.md
```

that will also be considered a valid post, even though it is in the `android` subdirectory. So to solve this problem, we could query the GitHub API recursively, as we get the path of a folder when it is returned from the API.

Here's a snippet of how I am achieving this:

```kotlin
// Function to get the content of the repository at a specific path inside it.
fun getContentFromPath(
    shouldPost: Boolean,
    repoName: String,
    path: String,
    accessToken: String
): ArrayList<RepoContentItemModel> {
    val postsArray = arrayListOf<RepoContentItemModel>()
    runBlocking {
        val response = repository.getRepoContent(repoName, path, accessToken)
        if (response.isSuccessful) {
            response.body()!!.forEach {
                when (it.type) {
                    "file" -> postsArray.add(it)
                    "dir" -> {
                        val nextLevel = getContentFromPath(false, repoName, it.path, accessToken)
                        postsArray.addAll(nextLevel)
                    }
                }
            }
            if (shouldPost) posts.postValue(postsArray)
        } else {
            hasPosts.postValue(false)
        }
    }
    return postsArray
}
```

What this code does is, it takes some parameters such as `repoName` and `path` to query for the content at the path in the provided repository. The `shouldPost` variable dictates whether all the folders have been checked or not. Once all the folders have been queried, then it returns the array of posts, else it keeps on querying for folders sequentially- one level at a time.

Notice `runBlocking`, it is used to carry out the tasks defined in the block, on the main thread, because if the folders are queried from the coroutines(that carry out code asynchronously), then there can be errors when the posts are returned by GitHub API, consider this case:

There are two folders- both are queried from separate threads, the problem here is, suppose the API didn't return content for the first folder but returned content for the second folder faster than the first one, now since there are only 2 folders, the function would return the posts array as all folders have been marked as queried...

And if by chance the API returns content for the second folder, this could lead to a crash, as the posts folder has already been returned. Also, if not a crash, this could lead to missing posts.

### Synchronizing Editor With the Preview Tab

The idea of synchronizing came to me when I once edited a markdown file in visual studio code, there was a markdown plugin that actually scrolled the preview by the same distance as the editing screen would.

So I thought of implementing it in JekyllEx too, as that would be a really handy feature.

`MutableLiveData`, when used in a `ViewModel` easily, allows emitting data that can be observed from Activities/Fragments. I used it to store the scroll distance as soon as the user scrolls inside the Editing tab, and it was observed by the Preview Fragment and was configured to set the scroll of the preview the same.

#### `EditorViewModel.kt`

```kotlin
// other stuff...

// Observable live data variables.
val scrollDist: MutableLiveData<Int> by lazy { MutableLiveData() }
// other variables

// Function to set the Scroll View scroll distance.
fun setScrollDist(newDist: Int) {
    scrollDist.postValue(newDist)
}

// other stuff...
```

#### `EditingFragment.kt`

```kotlin
// other stuff...

// Synchronize scroll distance with the preview tab.
editorBinding.editorScrollView.setOnScrollChangeListener { _, _, scrollY, _, _ ->
    viewModel.setScrollDist(scrollY)
}

// other stuff...
```

#### `PreviewFragment.kt`

```kotlin
// other stuff...

// Observe the scroll dist of the editor area and scroll to that distance.
viewModel.scrollDist.observe(viewLifecycleOwner, {
    previewBinding.previewScrollView.smoothScrollTo(0, it)
})

// other stuff...
```

The same logic was used for text, as soon as text would be edited, it will be observed by the Preview Fragment and set the rendered markdown.

---

## 🔥 Roadmap

JekyllEx solves the major problem of managing posts. But there exists another problem, one can manage their blog from JekyllEx, but how could they make the Jekyll blog in the first place?

Well, this is a major feature and it could bring a great change in how Jekyll Blogs are made, transforming from the traditional coding style, migrating to mobile devices. Then everyone could relish the power of Jekyll. Still, in the end, Jekyll remains only for those who don't wish to have big features on their site and want to keep their hosting bills low, but still want the flexibility to be able to change every single bit of their blog.

On a side note: For those who want to have an awesome newsletter, custom CSS and complete ownership of their blog for free, and still don't want to mess up with code, Hashnode is a really great fit for them! [Go sign up now](https://hashnode.com/@gouravkhunger/joinme) and start blogging in minutes.

Here's a list of features I am planning to add to JekyllEx in the future:

- Add functionality to make a blog using open-source Jekyll Themes directly from the app.
- Add feature to edit pages too.
- Add the "Continue where you left off" feature.
- Add syntax highlighting to the markdown editor.
- Improve the Meta Data editor to a more intuitive chip-based editor rather than a text box.
- Allow editing `config.yml` file from the App.
- Save deleted posts to local DB to act as a restore point if deleted in error.
- **If possible**, make a section to share your article with other JekyllEx users, like a community sort of thing.

---

## 💡 Real Usage

JekyllEx is already being used to manage:

- [The personal blog of my sister](https://samdisha.me){:rel="dofollow"}
- [60 w.o.w blog](https://60wordsofwisdom.xyz)

If you use JekyllEx <s>and want to get some backlinks and referral</s>, you can get listed here by comment your experience with using JekyllEx and providing a link to your blog!

---

## 😊 Final Words

On an ending note, I would say making JekyllEx for this hackathon was extremely fun. I couldn't have put myself to learn more new things if I would have procrastinated more. I also made really good new friends on the hashnode server.

I would really appreciate it if you could take a moment and comment on your views on my project! Also, react to the post to spread some love :)

All feedbacks are welcome 😄

---

## 🌏 Connect with me!

- Hashnode: [`@gourav_khunger`](https://hashnode.com/@gouravkhunger)
- StackOverflow: [`Gourav`](https://stackoverflow.com/users/9819031)
- Twitter: [`@gourav_khunger`](https://twitter.com/gourav_khunger)
- Instagram: [`@_gourav.khunger_`](https://instagram.com/)
- Youtube: [`Gourav Khunger`](https://www.youtube.com/channel/UCkv-J_D8jK2N02nBcyM92mQ)
- Discord: `gourav#2215`