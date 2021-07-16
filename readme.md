# Desafio Microuniverso Back end

# Requisitos
Para rodar o projeto será necessário ter o node e o Yarn ou o Docker instalados.

 - Para instalar o node [Clique aqui](https://nodejs.org/en/download/) e siga as instruções
 - - Para instalar o yarn[Clique aqui](https://classic.yarnpkg.com/en/docs/install/#windows-stable) e siga as instruções
 - Para instalar o docker [Clique aqui](https://www.docker.com/products/docker-desktop/) e siga as instruções
 - Você precisará de um banco de dados mysql rodando na sua máquina se for rodar a aplicação localmente. Dentro do repositório você encontrará um arquivo .yml para criação do banco de dados
 

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

Construa a imagem do front end com o nome citado anteriormente

    docker build -t patrickn/frontend .

## Segundo passo

Navegue até a pasta do back end e rode o seguinte comando

    docker compose up

A aplicação subirá todos os requisitos necessários para rodar o sistema completo: A api, o banco de dados e front end.

## Informações importantes

O front end subirá antes dos demais por ter um tempo de inicialização menor. A Api subirá e executará um shell script para aguardar a inicialização do banco de dados e, só então, ficará disponível para receber requisições. Esse processo pode ser um pouco demorado na primeira vez.

## Testes
Para rodar os testes, navegue até a pasta da aplicação e rode o seguinte comando

    npm test
