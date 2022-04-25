# [genicsblog.com](https://genicsblog.com)

Static site for genicsblog.com

## [License](https://github.com/genicsblog/genicsblog.com/blob/main/LICENSE.md)

The content under `_posts` folder belongs to the respective authors. Please contact the authors for questions relating to their content and licensing.

The content of the site excluding `_posts` is licensed under the [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

## Local setup

Install [docker](https://docs.docker.com/get-docker).

Run these commands in order to build and run the container:

```shell
docker build -t genicsblog .
docker run -p 4000:4000 genicsblog
```

The first build would take a few minutes, once done go to [localhost:4000](http://localhost:4000) to preview the site.
