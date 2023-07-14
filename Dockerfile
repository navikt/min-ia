FROM node:18-alpine

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /home/node/app

## Client side
WORKDIR /home/node/app
COPY client/src client/src
COPY client/package.json client/package.json
COPY client/next.config.js client/next.config.js
COPY client/next-env.d.ts client/next-env.d.ts
COPY client/tsconfig.json client/tsconfig.json
COPY client/.next client/.next
COPY client/node_modules client/node_modules

WORKDIR /home/node/app
COPY start.sh start.sh

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]
