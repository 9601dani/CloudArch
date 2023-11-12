FROM node:18.18.2

WORKDIR /Backend
COPY package*.json .
RUN npm install

COPY . .
CMD npm start