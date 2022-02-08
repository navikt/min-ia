FROM node:16-alpine as base

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /home/node/app

COPY server server
COPY client client

WORKDIR /home/node/app/server

RUN yarn install --frozen-lockfile

## 'production' gjelder både dev og prod miljø
FROM base as production

WORKDIR /home/node/app/client

RUN yarn install --frozen-lockfile

RUN yarn run build
RUN yarn run export

WORKDIR /home/node/app/server

RUN yarn run build

ENTRYPOINT ["yarn", "run", "start"]

## 'dev' er lokalt
FROM base as dev

CMD ["yarn", "run", "dev"]
