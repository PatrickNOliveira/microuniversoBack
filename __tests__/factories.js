const { factory } = require('factory-girl')
const bcrypt = require('bcrypt')
const { users } = require('../models')

factory.define('User', users, {
    firstName: 'Patrick',
    lastName: 'Nascimento',
    email: 'patrickndeoliveira@gmail.com',
    password: '123456'
})

module.exports = factory
