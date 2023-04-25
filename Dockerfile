FROM node:20-bullseye

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN  adduser node sudo

USER root

RUN npm install

COPY --chown=node:node . .

EXPOSE 8000

CMD [ "node", "server.js" ]
