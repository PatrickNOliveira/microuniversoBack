const request = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../../index')

const {users} = require('../../models')

describe('Authentication', () => {
    afterEach(() => {
        app.close()
    })
    //Teste para a rota de autenticação
    it('should auth with valid credentials', async () => {
        //Cria um usuário no banco de dados sqlite
        const user = await users.create({
            firstName: 'Patrick',
            lastName: 'Nascimento',
            email: 'patrickndeoliveira@gmail.com',
            password: '123456'
        })
        console.log(user)
        //Faz uma requisição para a rota de autenticação
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: await bcrypt.hash('123456', 12)
            })
        //Espera que o status retornado seja 200 (OK)
        expect(response.status).toBe(200)
    });
})
