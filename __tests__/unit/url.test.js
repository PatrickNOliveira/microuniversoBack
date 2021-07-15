const truncate = require('../../utils/truncate')
const factory = require('../factories')
const genericUser = require('../../utils/genericUserGenerate')
const {Url} = require('../../models')

describe('Url', ()=>{
    //Limpa a base de dados antes de cada teste
    beforeEach(async () => {
        await truncate()
    })

    /******************Teste para a função de inserir novas tinyUrl no sistema********************************/
    it('should be insert a tiny url', async () => {
        //Cria um usuário genérico para ser usado o id na hora de inserir uma nova URL
        const user = await factory.create('User')
        //Dados que serão inseridos na URL
        const data = {
            destiny: 'https://bitbucket.org/PatrickNO/desafio/src/dev/',
            tinyUrl: 'localhost:3000/teste1',
            user_id: user.id
        }

        //Cria a nova URL
        const tinyUrl = await Url.create(data)

        //Faz uma consulta a nova URL (Essa parte do código é necessária pois o método create não permite que
        // escolhamos quais dados serão retornados e o id não deve estar na clausula final)
        const tinyUrlNew = await Url.findOne({
            where:{id: Number(tinyUrl.id)},
            raw: true,
            attributes:{
                exclude:['id']
            }
        })

        //Espera que a nova url tenha dados iguais aos que foram passados
        expect(tinyUrlNew).toStrictEqual(data)
    });

    /********************* Teste unitário para a função de buscar URL pelo código ***************************/
    it('should be return a tinyUrl', async () => {
        //Cria uma nova URL
        const tinyUrl = await factory.create('Url')

        //Faz uma consulta a nova URL usando o código gerado para ela
        const tinyUrlFilter = await Url.findOne({
            where:{tinyUrl: tinyUrl.tinyUrl},
            raw: true
        })

        //Espera que a nova url tenha dados iguais aos que foram passados
        expect(tinyUrlFilter.tinyUrl).toBe(tinyUrl.tinyUrl)
    });

})
