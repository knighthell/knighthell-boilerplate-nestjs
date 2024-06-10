FROM node:22-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY apps ./apps
COPY libs ./libs
COPY nest-cli.json ./
COPY tsconfig*.json ./
COPY knighthell-boilerplate-idl-proto/domain/chat ./knighthell-boilerplate-idl-proto/domain/chat

RUN npm run build:server-chat

FROM node:22-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY knighthell-boilerplate-idl-proto/domain/chat ./knighthell-boilerplate-idl-proto/domain/chat

COPY --from=development /usr/src/app/dist/apps/server-chat ./dist/apps/server-chatonfig.json ./

CMD node dist/apps/server-chat/main
