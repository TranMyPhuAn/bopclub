FROM node:12

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . ./

EXPOSE 80

CMD ["node", "server", "start"]