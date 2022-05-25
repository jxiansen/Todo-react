FROM node:slim

WORKDIR /app

COPY . .

RUN npm install --registry=https://registry.npm.taobao.org

RUN npm run build
