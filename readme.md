# Desafio Microuniverso Back end

# Requisitos
Para rodar o projeto será necessário ter o node e o Yarn ou o Docker instalados.

 - Para instalar o node [Clique aqui](https://nodejs.org/en/download/) e siga as instruções
 - Para instalar o yarn[Clique aqui](https://classic.yarnpkg.com/en/docs/install/#windows-stable) e siga as instruções
 - Para instalar o docker [Clique aqui](https://www.docker.com/products/docker-desktop/) e siga as instruções
 - Você precisará de um banco de dados mysql rodando na sua máquina se for rodar a aplicação localmente. Dentro do repositório você encontrará um arquivo .yml para criação do banco de dados
 
# Importante
Antes de iniciar os processos para rodar a aplicação, é importante que você crie um arquivo .env para armazenar suas variáveis de ambiente
Copie o env.example

As variáveis de ambiente devem conter:

 - SECRET= "Senha" para criar os tokens de autenticação jwt
 - DB_HOST= Host para acesso do banco de dados, caso deseje rodar com o docker compose, essa variável deve, obrigatoriamente ter o valor database-micro
 - DB_NAME= Nome do banco de dados
 - DIALECT=mysql Tipo de banco de dados, novamente, para rodar com o docker compose, deve, obrigatoriamente ser um mysql
 - DB_USER= Nome de usuário do banco de dados
 - DB_PASS= Senha do banco de dados
 
Para rodar com o docker compose, o db_host e o dialect devem ser os especificados, os demais valores podem ser escolhidos à vontade

# Rodando localmente

Primeiro veremos como rodar o projeto localmente;

## Primeiro passo

Clone o repositório para sua máquina

    git clone https://PatrickNO@bitbucket.org/PatrickNO/desafio.git

## Segundo passo

Navegue até a pasta do repositório e digite o comando:

    npm install

Em seguida, rode o comando

    yarn

## Terceiro passo

Aguarde a instalação e rode o comando

    npm run dev
    
Para rodar a aplicação em modo de desenvolvimento.
A Api rodará no servidor local na porta 3000


# Rodando com Docker

Para rodar a aplicação dessa forma, será necessário levantar também um container com o banco de dados e colocá-lo na mesma rede do container da aplicação
visto que o localhost de um container é diferente do localhost de outro. Após subir o banco de dados na mesma rede, altere o arquivo .env e coloque o nome do container do banco de dados na variável DB_HOST


## Primeiro passo

Com o docker instalado, navegue até a pasta da aplicação e execute o seguinte comando:

    docker build -t patrickn/backend .

Você pode alterar o nome da imagem se quiser não fará diferença para o front end nem para o compositor

## Segundo passo

Após a imagem ser buildada, rode o seguinte comando no seu terminal

    docker run -p 3000:3000 patrickn/backend
    
  Se você mudou o nome da imagem no comando anterior, mude-o agora também.  


# Rodando com o orquestrador Docker Compose

E finalmente veremos um jeito de rodar todas as dependências necessárias do projeto de uma só vez

## Requisitos

Para esta parte, você precisará do docker compose instalado na sua máquina. Para instalá-lo,  [Clique aqui](https://docs.docker.com/compose/install/)

## Primeiro passo

Navegue até a pasta do sistema e rode o seguinte comando

    docker compose up

A aplicação subirá todos os requisitos necessários para rodar o sistema: A api e o banco de dados.

## Informações importantes

A Api subirá e executará um shell script para aguardar a inicialização do banco de dados e, só então, ficará disponível para receber requisições. Esse processo pode ser um pouco demorado na primeira vez.

## Testes
Para rodar os testes, navegue até a pasta da aplicação e rode o seguinte comando

    npm test
