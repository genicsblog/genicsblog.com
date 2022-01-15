# [genicsblog.com](https://genicsblog.com)

Static site for genicsblog.com

## Local setup

Install [docker](https://docs.docker.com/get-docker).

Run these commands in order to build and run the container:

```shell
docker build -t genicsblog .
docker run -p 4000:4000 genicsblog
```

The first build would take a few minutes, once done go to [localhost:4000](http://localhost:4000) to preview the site.
