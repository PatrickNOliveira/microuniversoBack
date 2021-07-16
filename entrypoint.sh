#!/bin/sh

##Verifica de o mysql já iniciou
while ! curl -o - database-micro:3306;
do
  echo "Aguardando mysql"
  sleep 5;
done
  ##Se iniciou, roda as migrations e inicia a aplicação
npx sequelize-cli db:migrate
npm start
