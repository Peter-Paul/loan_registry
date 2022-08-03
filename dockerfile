FROM node:latest

WORKDIR /backend

COPY ./backend/package.json ./
RUN npm install

COPY ./backend .

# WORKDIR /frontend

# COPY /frontend/package.json ./
# RUN npm install

# COPY . .
