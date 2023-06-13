FROM node:12

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

COPY app ./app
COPY config ./config
COPY data ./data
COPY policies ./policies
COPY public ./public
COPY routes ./routes
COPY ssl ./ssl
COPY views ./views

COPY appstore.js .
COPY captcha.js .
COPY config.js .
COPY configdbx3.js .
COPY npm-shrinkwrap.json .
COPY package-lock.json .
COPY package.json .
COPY routerCMS.js .
COPY routerHttp.js .
COPY routerHTTPV1.js .
COPY routerSocket.js .
COPY run_server.bat .
COPY server.js .
COPY socketAdmin.js .
COPY socketUsers.js .
COPY tele.js .
COPY update.js .
COPY version_generator.js .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]