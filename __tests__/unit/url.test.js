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
            tinyUrl: '060201a',
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


    /********************* Teste unitário para a função de buscar URL pelo código ***************************/
    it('should be return all urls linked to sent user', async () => {
        //Cria um novo usuário
        const user = await factory.create('User')

        //Cria uma URL curta com o id do usuário recém criado
        const tinyUrl = await factory.create('Url', {
            user_id: user.id
        })

        //Busca a url criada pelo factory, essa parte do código é necessária para garantir a integridade
        // do teste pois o módulo create do sequelize retorna mais dados que o necessário
        const newTinyUrl = await Url.findOne({
            raw:true,
            where:{id: Number(tinyUrl.id)}
        })

        //Busca todas as urls do usuário recém criado
        const tinyUrlFilter = await Url.findAll({
            raw: true,
            where:{ user_id: user.id }
        })

        //Espera que o índice 0 da URL retornada seja igual a URL gerada pelo teste
        expect(tinyUrlFilter[0]).toMatchObject(newTinyUrl)
    });


})
