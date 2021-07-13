const request = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../../index')

const truncate = require('../../utils/truncate')

const {users} = require('../../models')

describe('Authentication', () => {
    beforeEach(async () => {
        await truncate()
    })
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
            password: await bcrypt.hash('123456', 12)
        })
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

    //Teste para garantir que a rota de autenticação está recusando usuários incorretos
    it('should auth with valid credentials', async () => {
        //Cria um usuário no banco de dados sqlite
        const user = await users.create({
            firstName: 'Patrick',
            lastName: 'Nascimento',
            email: 'patrickndeoliveira@gmail.com',
            password: await bcrypt.hash('123456', 12)
        })
        //Faz uma requisição para a rota de autenticação com credenciais inválidas
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: 'senhaErrada'
            })
        //Espera que o status retornado seja 401 (unauthorized)
        expect(response.status).toBe(401)
    });

    //Teste para garantir que a rota de autenticação está retornando um jwt token
    it('should return jwt token when authenticated', async () => {
        //Cria um usuário no banco de dados sqlite
        const user = await users.create({
            firstName: 'Patrick',
            lastName: 'Nascimento',
            email: 'patrickndeoliveira@gmail.com',
            password: await bcrypt.hash('123456', 12)
        })
        //Faz uma requisição para a rota de autenticação
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123456'
            })
        //Espera que o status retornado seja 200 (OK)
        expect(response.body).toHaveProperty('token')
    });
})
