FROM node:14.15.3-slim

WORKDIR /usr/src/api

RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  mysql-client \
  apt-get install vim

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["/bin/sh", "entrypoint.sh"]