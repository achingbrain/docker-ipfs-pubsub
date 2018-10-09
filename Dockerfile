FROM node:10

RUN export NODE_ENV=production
RUN npm set unsafe-perm true

COPY ./package.json /app/package.json

WORKDIR /app

RUN npm install --production

COPY ./index.js /app/index.js

WORKDIR /app

CMD node .
