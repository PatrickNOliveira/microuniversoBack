const request = require('supertest')
const bcrypt = require('bcryptjs')
const app = require('../../index')
const truncate = require('../../utils/truncate')
const factory = require('../factories')
const genericUser = require('../../utils/genericUserGenerate')


describe('Users', () => {
    //Antes de cada teste, elimina os dados do banco sqlite
    beforeEach(async () => {
        await truncate()
    })
    //Após cada teste, finaliza o servidor node
    afterEach(() => {
        app.close()
    })


    /***************Teste para garantir que o usuário está sendo criado na rota post (/register)*****************/
    it('should create user with valid data', async () => {
        const newData = await genericUser
        //Faz uma requisição para a rota de registro com os dados a serem inseridos no sistema
        const response = await request(app)
            .post('/register')
            .send(newData)

        //Espera-se que o status retornado seja 201 (Created)
        expect(response.status).toBe(201)
    });


    /*******Teste para garantir que o usuário só acessará a rota de editar usuário se estiver autenticado*********/
    it('should be able to access edit users route when authenticated', async () => {

        //Seta um usuário com dados aleatórios usando o factory mas, envia uma senha padrão
        // pois ela será necessária no teste
        const user = await factory.create('User', {
            password: await bcrypt.hash('123456', 12)
        })

        //Faz uma requisição para a rota de autenticação do usuário
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123456'
            })

        const newData = await genericUser

        //Faz a requisição para a rota put de edição de usuário enviando o bearer token adquirido na
        // requisição anterior
        const secondResponse = await request(app)
            .put('/user')
            .send(newData)
            .set('Authorization', `Bearer ${response.body.token}`)

        //Espera-se que o status retornado seja 200 (Ok)
        expect(secondResponse.status).toBe(200)
    });


    /******Teste para garantir que o usuário não acessará a rota de editar usuários se não estiver logado *******/
    it('should be not able to access edit users route when dont authenticated', async () => {

        //Seta dados genéricos de usuário para serem usados na requisição
        const newData = await genericUser

        //Faz a requisição para a rota put de edição de usuário sem enviar o token
        const response = await request(app)
            .put('/user')
            .send(newData)

        //Espera-se que o status retornado seja 401 (unauthorized)
        expect(response.status).toBe(401)
    });


    /********Teste para garantir que o usuário não conseguirá inserir dados no model de usuários se não passar
    pelas validações de not Null ****/
    it('should be not enter a user when submitting missing data', async () => {

        //Cria dados para serem enviados para a requisição sem mandar um campo email(obrigatório)
        const data = {
            firstName: "Integration",
            secondName: "Test",
            password: "123456"
        }

        //Faz a requisição para a rota de registro
        const response = await request(app)
            .post('/register')
            .send(data)

        //Espera-se que o status retornado seja 500
        expect(response.status).toBe(500)
    });


    /**********Teste para garantir que o usuário não conseguirá cadastrar o mesmo e-mail duas vezes*************/
    it('should not be able to insert a used email', async () => {

        //Cria dados  genéricos de usuário para serem enviados a requisição
        const data = await genericUser

        //Faz a requisição para a rota de registro com os dados gerados
        const response = await request(app)
            .post('/register')
            .send(data)

        //Faz a requisição novamente usando os mesmos dados
        const secondResponse = await request(app)
            .post('/register')
            .send(data)

        //Verifica se a string possui o valor Validation error e espera que essa verificação retorne true
        expect(secondResponse.body.indexOf("Validation error") > -1).toBe(true)
    });
})
