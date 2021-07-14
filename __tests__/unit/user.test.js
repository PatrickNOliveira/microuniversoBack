const bcrypt = require('bcrypt')
const {users} = require('../../models')
const truncate = require('../../utils/truncate')
const factory = require('../factories')
const genericUser = require('../../utils/genericUserGenerate')

describe('User', ()=>{
    //Limpa a base de dados antes de cada teste
    beforeEach(async () => {
        await truncate()
    })
    //Teste para a função de inserir um usuário e retornar uma senha criptografada
    it('should encrypt user pass', async ()=> {
        //Cria um usuário no banco de dados sqlite
        const userData = {
            firstName: 'Patrick',
            lastName: 'Nascimento',
            email: 'patrickndeoliveira@gmail.com',
            password: await bcrypt.hash('123', 12)
        }
        //Insere o usuário no campo de dados
        const user = await users.create(userData)
        //Espera que a comparação do bcrypt entre as senhas do usuário e o valor digitado manualmente (123)
        // retorne true, ou seja, que elas sejam equivalentes
        expect(await bcrypt.compare('123', user.password)).toBe(true)
    });


    //Teste para a função de editar usuários
    it('Should edit a user', async ()=> {
        //Cria um usuário no banco de dados usando um factory
        const user = await factory.create('User', {
            password: bcrypt.hash('123456', 12)
        })


        //Cria novos dados aleatoriamente para o usuário
        const newData = await genericUser

        //Atualiza o usuário recém criado
        const updatedUser = await users.update(newData, {
            where: { id: Number(user.id) },
            plain: true
        }).then(async () => {
            //Ao terminar de atualizar o usuário, busca-o na base de dados sem o id para que o teste seja
            // possível de ser realizado e o seta na variável updatedUser
            return await users.findOne({
                raw: true,
                attributes:{exclude:['id']},
                where: { id: Number(user.id) }
            })
        })


        //Espera-se que o updatedUser tenha dados iguais aos recém criados
        expect(updatedUser).toStrictEqual(newData)
    });
})
