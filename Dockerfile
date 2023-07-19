FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /home/node/app

COPY src src
COPY package.json package.json
COPY next.config.js next.config.js
COPY next-env.d.ts next-env.d.ts
COPY tsconfig.json tsconfig.json
COPY .next .next
COPY node_modules node_modules

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "start.sh"]