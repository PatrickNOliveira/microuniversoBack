const request = require('supertest')

const app = require('../../index')

const {users} = require('../../models')

describe('Authentication', () => {
    //Teste para a rota de autenticação
    it('should auth with valid credentials', async () => {
        //Cria um usuário no banco de dados sqlite
        const userData = {
            firstName: 'Patrick',
            lastName: 'Nascimento',
            email: 'patrickndeoliveira@gmail.com',
            password: '123'
        }
        const user = await users.create(userData)
        //Faz uma requisição para a rota de autenticação
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123456'
            })
        //Espera que o status retornado seja 200 (OK)
        expect(response.status).toBe(200)
    });
})
