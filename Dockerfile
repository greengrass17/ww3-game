FROM node:alpine AS Builder

WORKDIR /usr/src/app

RUN rm -rfv /usr/src/app/*
COPY package.json yarn.lock ./
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  yarn global add node-gyp &&\
  yarn install &&\
  apk del native-deps

COPY . .
RUN yarn build

FROM nginx:stable-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=Builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 80