# [genicsblog.com](https://genicsblog.com)

Genics Blog is an open-source developer publication.

For publishing your content on the blog, please refer to the [Author Docs](https://docs.genicsblog.com/author).

This repository mainly holds all the content for the blog and the static pages of the site. It also hosts the workflow for building the [Jekyll](https://jekyllrb.com/) site and deploying it. Theme related setup for the site is done in the [`theme-files`](https://github.com/genicsblog/theme-files) repository.

## Structure of this repository

`.github`: CI/CD workflows, issue and pull request templates.

`_data`: Metadata used by the site.

`_drafts`: The drafts for the blog posts.

`_posts`: The published blog posts, under specific author folders.

`_series`: Series pages that list grouped articles.

## Contributing

### Publishing content

To publish a post on the blog, you must first [set up your profile](https://docs.genicsblog.com/author/configure-your-profile).

Then you can [create a submission request](https://docs.genicsblog.com/author/create-a-submission-request) by opening an issue and filling out the **Submission Request** template.

Once someone from the team responds and approves your request, you can [create a draft](https://docs.genicsblog.com/author/writing-the-article). Once done, go back to the submission request and let the team know. Someone from the team will review the submission, make some small changes (for grammar, seo, styling, etc) and then publish your post.

Check out the [author docs](https://docs.genicsblog.com/author) for more information.

### Site-related discussions

You may open general issues related to the site in this repository. Only the PRs related to publishing articles or the CI/CD process are to be done in this repository.

Anything related to the styling/feature requests for the website must be done in the [`theme-files`](https://github.com/genicsblog/theme-files) repo.

### Local Setup

Please install [Ruby](https://www.ruby-lang.org/en/downloads/) (preferrably 3.x) and [Node.js](https://nodejs.org/en/download/) (preferrably 16.x) before you proceed.

Run the `dev.sh` script in order to set up the local environment and build the website:

```shell
./dev.sh
```

The first build would take a few moments as it clones the [theme files](https://github.com/genicsblog/theme-files) and installs all the required dependencies. Once done, you can preview the site at [localhost:4000](http://localhost:4000). Subsequent builds should be faster.

### Troubleshooting

If you get a permission error, try providing the correct permissions to the bash script by running:

```shell
chmod +x dev.sh
```

Now you should be able to run the `./dev.sh` command.

If you get an error saying that the command `bundle` is not found, make sure you have Ruby installed and then try running `gem install bundler` and then run `./dev.sh` again.

Feel free to [open an issue](https://github.com/genicsblog/genicsblog.com/issues/new) if you need any help! You can also [join our Discord server](https://discord.genicsblog.com/) to get in touch with us.

## [License](https://github.com/genicsblog/genicsblog.com/blob/main/LICENSE.md)

The content under `_posts` folder belongs to the respective authors. Please contact the authors for questions relating to their content and licensing.

The content of the site excluding `_posts` is licensed under the [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).


## Project Contributors⭐ 

<table align="center">
<tr>
<td>
<a href="https://github.com/genicsblog/genicsblog.com/graphs/contributors" align="center">
  <img src="https://contrib.rocks/image?repo=genicsblog/genicsblog.com" /> 
</a>
</td>
</tr>
</table>
