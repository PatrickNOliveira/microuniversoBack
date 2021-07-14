const faker = require('faker')
const bcrypt = require('bcryptjs')

async function generateUser(){
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 12)
    }

}


module.exports = generateUser()

