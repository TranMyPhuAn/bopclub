FROM node:12

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 80

CMD ["node", "server", "start"]