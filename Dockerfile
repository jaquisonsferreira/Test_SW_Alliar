FROM node:15-alpine

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli

RUN apk add --update python make g++\
  && rm -rf /var/cache/apk/*

WORKDIR /home/node/app

COPY package.json .

RUN yarn

CMD "yarn" "start:dev"
