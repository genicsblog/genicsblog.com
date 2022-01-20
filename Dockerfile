FROM ubuntu
ENV DEBIAN_FRONTEND=noninteractive
ENV JEKYLL_ENV=dev
WORKDIR /app
COPY Gemfile ./
COPY package.json ./
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y curl git ruby-full build-essential zlib1g-dev
RUN curl -sL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs
RUN gem install jekyll bundler
RUN npm install
RUN bundle install
RUN git clone https://github.com/genicsblog/genicsblog.github.io genicsblog
RUN mv genicsblog/* .
RUN rm -rf genicsblog
COPY . .
EXPOSE 4000
CMD [ "bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0" ]