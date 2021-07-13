const { factory } = require('factory-girl')
const faker = require('faker')
const { users } = require('../models')

factory.define('User', users, {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
})

module.exports = factory
