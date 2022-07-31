FROM node:latest

WORKDIR /backend

COPY /backend/package.json ./
RUN npm install

COPY . .

WORKDIR /frontend

COPY /frontend/package.json ./
RUN npm install

COPY . .
