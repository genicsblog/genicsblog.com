FROM ubuntu:20.04
ENV DEBIAN_FRONTEND=noninteractive
ENV JEKYLL_ENV=dev
WORKDIR /site
RUN apt-get clean && apt-get update && apt-get upgrade -y
RUN apt-get install -y curl git ruby-full build-essential zlib1g-dev
RUN curl -sL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs
RUN gem install jekyll bundler
RUN git clone https://github.com/genicsblog/theme-files
RUN mv theme-files/* .
RUN rm -rf theme-files
RUN npm install
RUN bundle install
COPY . .
EXPOSE 4000
CMD [ "bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0" ]