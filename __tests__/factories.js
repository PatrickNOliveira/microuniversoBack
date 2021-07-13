const { factory } = require('factory-girl')
const faker = require('faker')
const { users } = require('../models')

factory.define('User', users, {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
})

factory.define('Url', users, {
    destiny: faker.internet.url(),
    tinyUrl: faker.lorem.word(5,5),
    user_id: Math.floor(faker.datatype.number()),
})

module.exports = factory
