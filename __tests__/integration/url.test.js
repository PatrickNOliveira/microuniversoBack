const truncate = require('../../utils/truncate')
const factory = require('../factories')
const genericUrl = require('../../utils/genericUrlGenerate')
const app = require('../../index')
const request = require('supertest')
const {Url} = require('../../models')

describe('Url', ()=>{
    //Limpa a base de dados antes de cada teste
    beforeEach(async () => {
        await truncate()
    })
    //Encerra o servidor após os testes
    afterEach(() => {
        app.close()
    })

    //Teste para garantir que a rota de inserir um novo url no sistema está retornando um código 201
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

    //Teste para garantir que o usuário não conseguirá inserir uma URL com o mesmo valor no tinyUrl
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

        //Verifica se a string possui o valor Validation error e espera que essa verificação retorne true
        expect(secondResponse.body.indexOf("Validation error") > -1).toBe(true)
    });

})
