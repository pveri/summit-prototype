FROM node:lts-alpine3.14
RUN apk update && apk add g++ make py3-pip
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
