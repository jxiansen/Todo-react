FROM node:slim

WORKDIR /app

COPY . .

RUN npm install --registry=https://registry.npmmirror.com

RUN npm run build
