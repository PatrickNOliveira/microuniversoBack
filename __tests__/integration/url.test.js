const truncate = require('../../utils/truncate')
const factory = require('../factories')
const genericUrl = require('../../utils/genericUrlGenerate')
const app = require('../../index')
const request = require('supertest')

describe('Url', ()=>{
    //Limpa a base de dados antes de cada teste
    beforeEach(async () => {
        await truncate()
    })
    //Encerra o servidor após os testes
    afterEach(() => {
        app.close()
    })

    /*******Teste para garantir que a rota de inserir um novo url no sistema está retornando um código 201*******/
    it('should be return a 201 status code', async () => {
        //Gera dados genéricos para a URL
        const data = await genericUrl
        //Faz uma requisição para a rota de inserção de url na API e envia os dados da URL genérica gerada
        const response = await request(app)
            .post('/url')
            .send(data)

        //Espera-se que o status retornado seja 201 (Created)
        expect(response.status).toBe(201)
    });


    /*******Teste para garantir que a rota de inserir um novo url pode ser usada mesmo sem autenticação***********/
    it('shoul be able to use when not authenticated', async () => {
        //Gera dados genéricos para a URL
        const data = await genericUrl
        //Faz uma requisição para a rota de inserção de url na API e envia os dados da URL genérica gerada
        const response = await request(app)
            .post('/url')
            .send(data)

        //Espera-se que o user id seja retornado como null/undefined
        expect(response.body.user_id).toBeUndefined()
        //Porém espera-se que o body não esteja vazio (Ou seja, criou um usuário mas sem o user_id)
        expect(response.body).not.toBeUndefined()
    });


    /****Teste para garantir que a rota de inserir um novo url vai inserir o user_id se o
     *
    usuário estiver autenticado */
    it('should be insert a user_id in url when user is authenticated', async () => {

        //Cria um usuário no banco de dados sqlite
        const user = factory.create('User')

        //Autentica o usuário recém criado na API
        const auth = await request(app)
            .post('/sessions').
            send({
                email: user.email,
                password: user.password
            })

        //Gera dados genéricos para a URL
        const data = await genericUrl
        //Faz uma requisição para a rota de inserção de url na API com os dados da URL genérica e com
        // o token de autenticação do usuário recém criado
        const response = await request(app)
            .post('/url')
            .send(data)
            .set('Authorization', `Bearer ${auth.body.token}`)

        //Espera-se que o user id seja igual ao id do usuário recém criado
        expect(response.body.user_id).toBe(user.id)
    });


    /******Teste para garantir que o usuário não conseguirá inserir uma URL com o mesmo valor no tinyUrl********/
   it('should be not able to insert a used tinyUrl', async () => {
        //Gera dados genéricos para a URL
        const data = await genericUrl
        //Faz uma requisição para a rota de inserção de url na API e envia os dados da URL genérica gerada
        const response = await request(app)
            .post('/url')
            .send(data)

        const secondResponse = await request(app)
            .post('/url')
            .send(data)

        //Verifica se a string possui o valor Validation error
        expect(secondResponse.body).toContain("Validation error")
    });

})
