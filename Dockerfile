FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent


COPY . .
#EXPOSE 3000
CMD ["npm","run","build","&&","npm","start"]
COPY ./build ./server/build
