#!/bin/sh

##Verifica de o mysql já iniciou
while ! curl -o - database-micro:3306; do
  sleep 5;
done
  npx sequelize db:migrate
  npm start
