const truncate = require('../../utils/truncate')
const factory = require('../factories')
const genericUser = require('../../utils/genericUserGenerate')

describe('Url', ()=>{
    //Limpa a base de dados antes de cada teste
    beforeEach(async () => {
        await truncate()
    })

    //Teste para a função de inserir novas tinyUrl no sistema
    it('should be insert a tiny url', function () {
        //Cria um usuário genérico para ser usado o id na hora de inserir uma nova URL
        const user = factory.create('User')
        //Dados que serão inseridos na URL
        const data = {
            destiny: 'https://bitbucket.org/PatrickNO/desafio/src/dev/',
            tinyUrl: 'localhost:3000/teste1',
            user_id: user.id,
        }

        const tinyUrl = Url.create(data)

        expect(tinyUrl).toBe(data)
    });

})
