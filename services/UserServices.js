const Services = require('./Services')

class UserServices extends Services {
    constructor() {
        super('users');
    }
}

module.exports = UserServices
