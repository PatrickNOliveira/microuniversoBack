const truncate = require('../../../utils/truncate')
const factory = require('../../factories')
const app = require('../../../index')
const request = require('supertest')

describe('Url', ()=>{

    /******************************** Testes para as rotas de busca de URL ************************************/

    describe('Search URL tests', () => {

        //Limpa a base de dados antes de cada teste
        beforeEach(async () => {
            await truncate()
        })
        //Encerra o servidor após os testes
        afterEach(() => {
            app.close()
        })


        //Teste para garantir que a rota de busca de URL está retornando o status 200
        it('should be return a status 200', async () => {
            //Gera dados genéricos para a URL
            const url = await factory.create('Url')

            //Faz uma requisição para a rota de busca usando o código da URL
            const response = await request(app)
                .get('/url/'+url.tinyUrl)

            //Espera-se que o status retornado seja 200 (Ok)
            expect(response.status).toBe(200)
        });


        // Teste para garantir que a rota de busca de URL está retornando a URL correta
        it('should be return a search url', async () => {
            //Gera dados genéricos para a URL
            const url = await factory.create('Url')

            //Faz uma requisição para a rota de busca usando o código da URL
            const response = await request(app)
                .get('/url/'+url.tinyUrl)

            //Espera-se que o tinyUrl da resposta seja igual ao tinyUrl da url criada como o campo é
            // único, se o teste passar, a rota está funcionando
            expect(response.body.tinyUrl).toBe(url.tinyUrl)
        });


        //Teste para garantir que a rota de busca de URL está retornando a URL correta
        it('should be return a validation error when send a unexists user id', async () => {

            const response = await request(app)
                .post('/url')
                .send({
                    destiny: 'http://localhost:3000',
                    tinyUrl: 'teste12',
                    user_id: 3000
                })

            expect(response.body).toContain('Validation error')

        });


        //Teste para garantir que a rota de busca de URL pelo usuário logado está retornando os valores corretos
        it('should be return all status 200 when user is authenticated', async () => {

            //Cria um usuário no banco de dados sqlite
            const user = factory.create('User')

            //Autentica o usuário recém criado na API
            const auth = await request(app)
                .post('/sessions').
                send({
                    email: user.email,
                    password: user.password
                })

            //Faz a requisição para busca de URLs
            const response = await request(app)
                 .get('/url')
                 .set('Authorization', `Bearer ${auth.body.token}`)

            //Espera-se que a resposta seja um status 200
            expect(response.status).toBe(200)

        });


        //Teste para garantir que a rota de buscar URL do usuário autenticado só vai funcionar
        // se o usuário estiver autenticado
        it('should be return a 401 status when not authenticated', async () => {

            //Faz a requisição para busca de URLs
            const response = await request(app)
                .get('/url')

            //Espera-se que a resposta seja um status 401
            expect(response.status).toBe(401)

        });

    })
})
