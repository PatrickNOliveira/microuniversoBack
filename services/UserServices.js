const Services = require('./Services')
const database = require('../models')
const bcrypt = require('bcrypt')

class UserServices extends Services {
    constructor() {
        super('users');
    }

    async createUser(user){
        user.password = await bcrypt.hash(user.password, 12)
        return database[this.model].create(user)
    }

    async editUser(user, id){
        if (user.password){
            user.password = await bcrypt.hash(user.password, 12)
        }
        //Atualiza o usuário recém criado
        return await database[this.model].update(user, {
            where: {id: Number(id)},
            plain: true
        }).then(async () => {
            //Ao terminar de atualizar o usuário, busca-o na base de dados sem o id para que o teste seja
            // possível de ser realizado e o seta na variável updatedUser
            return await database[this.model].findOne({
                raw: true,
                attributes: {exclude: ['password']},
                where: {id: Number(id)}
            })
        })
    }
}

module.exports = UserServices
