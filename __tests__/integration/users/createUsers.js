const request = require('supertest')
const app = require('../../../index')
const truncate = require('../../../utils/truncate')
const genericUser = require('../../../utils/genericUserGenerate')


describe('Users', () => {

        describe('Create users testes', () => {
        //Antes de cada teste, elimina os dados do banco sqlite
        beforeEach(async () => {
            await truncate()
        })
        //Após cada teste, finaliza o servidor node
        afterEach(() => {
            app.close()
        })


        /*************** Teste para garantir que o usuário está sendo criado na rota post (/register) *****************/
        it('should create user with valid data', async () => {
            const newData = await genericUser
            //Faz uma requisição para a rota de registro com os dados a serem inseridos no sistema
            const response = await request(app)
                .post('/register')
                .send(newData)

            //Espera-se que o status retornado seja 201 (Created)
            expect(response.status).toBe(201)
        });

        /******** Teste para garantir que o usuário não conseguirá inserir dados no model de usuários se não passar
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


        /********** Teste para garantir que o usuário não conseguirá cadastrar o mesmo e-mail duas vezes *************/
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
})
