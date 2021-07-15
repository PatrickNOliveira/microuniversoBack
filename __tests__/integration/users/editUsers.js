const request = require('supertest')
const bcrypt = require('bcryptjs')
const app = require('../../../index')
const truncate = require('../../../utils/truncate')
const factory = require('../../factories')
const genericUser = require('../../../utils/genericUserGenerate')


describe('Users', () => {
    //Antes de cada teste, elimina os dados do banco sqlite
    beforeEach(async () => {
        await truncate()
    })
    //Após cada teste, finaliza o servidor node
    afterEach(() => {
        app.close()
    })

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
})
