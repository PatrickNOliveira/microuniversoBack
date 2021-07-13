const faker = require('faker')

async function generateUrl(){
    return {
        destiny: faker.internet.url(),
        tinyUrl: faker.lorem.characters({
            number: 5,
            min_alpha: 1,
            min_numeric: 1
        }),
        user_id: user.id
    }

}


module.exports = generateUrl()

