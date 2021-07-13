const request = require('supertest')
const bcrypt = require('bcrypt')
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

    //Teste para garantir que o usuário está sendo criado na rota post (/register)
    it('should create user with valid data', async () => {
        const newData = await genericUser
        //Faz uma requisição para a rota de registro com os dados a serem inseridos no sistema
        const response = await request(app)
            .post('/register')
            .send(newData)

        //Espera-se que o status retornado seja 201 (Created)
        expect(response.status).toBe(201)
    });


    //Teste para garantir que o usuário só acessará a rota de editar usuário se estiver autenticado
    it('should be able to access edit users route when authenticated', async () => {

        //Seta um usuário com dados aleatórios usando o factory mas, envia uma senha padrão
        // pois ela será necessária no teste
        const user = await factory.create('User', {
            password: await bcrypt.hash('123456', 12)
        })

        //Faz uma requisição para a rota de edição de usuário enviando dados aleatórios e um token auth
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123456'
            })

        const newData = await genericUser

        //Faz a requisição para a rota put de edição de usuário
        const secondResponse = await request(app)
            .put('/user')
            .send(newData)
            .set('Authorization', `Bearer ${response.body.token}`)

        //Espera-se que o status retornado seja 200 (Ok)
        expect(secondResponse.status).toBe(200)
    });
})
