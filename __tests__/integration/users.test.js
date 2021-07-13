const request = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../../index')
const truncate = require('../../utils/truncate')
const factory = require('../factories')
const faker = require('faker')


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
        //Faz uma requisição para a rota de registro com os dados a serem inseridos no sistema
        const response = await request(app)
            .post('/register')
            .send({
                //Usar o módulo faker para gerar dados aleatórios para o test
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: await bcrypt.hash(faker.internet.password(), 12)
            })

        //Espera-se que o status retornado seja 201 (Created)
        expect(response.status).toBe(201)
    });
})
