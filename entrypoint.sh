#!/bin/sh

##Verifica de o mysql já iniciou
while ! curl -o - database-micro:3306; do
  ##Repete de 5 em 5 segundos até que obtenha uma resposta
  sleep 5;
done
  #Quando obtiver a resposta, roda as migrations e inicia o sistema
  npx sequelize db:migrate
  npm start
