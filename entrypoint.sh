#!/bin/sh

##Verifica de o mysql já iniciou
until mysqlshow --user=root --password=microuniverso -h database-micro -P 3306 --protocol=tcp > /dev/null 2>&1; do
        echo "Aguardando mysql";
        sleep 5;
done
  ##Se iniciou, roda as migrations e inicia a aplicação
  npx sequelize-cli db:migrate
  npm start
