FROM timbru31/ruby-node:2.7
ENV DEBIAN_FRONTEND=noninteractive
ENV JEKYLL_ENV=dev
WORKDIR /site
RUN gem install jekyll bundler
RUN git clone https://github.com/genicsblog/theme-files
RUN mv theme-files/* .
RUN rm -rf theme-files
RUN npm install
RUN bundle install
COPY . .
EXPOSE 4000
CMD [ "bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0" ]