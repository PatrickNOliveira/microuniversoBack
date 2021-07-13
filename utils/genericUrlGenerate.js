const faker = require('faker')

async function generateUrl(){
    return {
        destiny: faker.internet.url(),
        tinyUrl: faker.lorem.word(),
        user_id: Math.floor(faker.datatype.number())
    }

}


module.exports = generateUrl()

