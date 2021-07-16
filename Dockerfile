FROM node:14.16.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN yarn
COPY . .
ENTRYPOINT ["sh", "entrypoint.sh"]
