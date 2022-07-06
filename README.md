# [genicsblog.com](https://genicsblog.com)

Static site for genicsblog.com

## [License](https://github.com/genicsblog/genicsblog.com/blob/main/LICENSE.md)

The content under `_posts` folder belongs to the respective authors. Please contact the authors for questions relating to their content and licensing.

The content of the site excluding `_posts` is licensed under the [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

## Local setup

Please install [Ruby](https://www.ruby-lang.org/en/downloads/) (preferrably 3.x) and [Node.js](https://nodejs.org/en/download/) (preferrably 16.x) before you proceed.

Run the `dev.sh` script in order to set up the local environment and build the website:

```shell
./dev.sh
```

The first build would take a few moments. Once done, you can preview the site at [localhost:4000](http://localhost:4000). Subsequent builds should be faster.

If any problem persists, try providing the correct permissions to the bash script by running:

```shell
chmod +x dev.sh
```

Now you should be able to run the `./dev.sh` command.

Feel free to [open an issue](https://github.com/genicsblog/genicsblog.com/issues/new) if you need any help!
