const Services = require('./Services')
const database = require('../models')
class UrlService extends Services {
    constructor() {
        super('Url');
    }

    async searchForCode(code){
        return await database[this.model].findOne({
            where:{tinyUrl: code}
        })
    }

    async getAll(id){
        return await database[this.model].findAll({
            where:{user_id: id}
        })
    }
}

module.exports = UrlService
