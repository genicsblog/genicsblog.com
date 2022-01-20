FROM ubuntu
ENV DEBIAN_FRONTEND=noninteractive
ENV JEKYLL_ENV=dev
WORKDIR /app
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y curl git ruby-full build-essential zlib1g-dev wget
RUN curl -sL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs
RUN gem install jekyll bundler
RUN wget https://raw.githubusercontent.com/genicsblog/theme-files/main/package.json
RUN wget https://raw.githubusercontent.com/genicsblog/theme-files/main/Gemfile
RUN npm install
RUN bundle install
RUN git clone https://github.com/genicsblog/theme-files
RUN mv theme-files/* .
RUN rm -rf theme-files
COPY . .
EXPOSE 4000
CMD [ "bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0" ]