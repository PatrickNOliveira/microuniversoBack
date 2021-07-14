const faker = require('faker')

async function generateUrl(){
    return {
        destiny: faker.internet.url(),
        tinyUrl: faker.lorem.word(),
    }

}


module.exports = generateUrl()

