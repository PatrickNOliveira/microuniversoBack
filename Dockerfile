FROM node:14.16.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN yarn
RUN set -ex; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
    mysql-client
COPY . .
EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]
