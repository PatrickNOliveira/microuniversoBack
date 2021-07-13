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
}

module.exports = UserServices
