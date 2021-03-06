const { factory } = require('factory-girl')
const faker = require('faker')
const { users, Url } = require('../models')

factory.define('User', users, {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
})

factory.define('Url', Url, {
    destiny: faker.internet.url(),
    tinyUrl: faker.lorem.word(7)
})

module.exports = factory
