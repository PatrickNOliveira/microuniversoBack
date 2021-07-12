const bcrypt = require('bcrypt')

const {users} = require('../../models')

describe('User', ()=>{
    it('should encrypt user pass', async ()=> {
        //Cria um usuário no banco de dados sqlite
        const userData = {
            firstName: 'Patrick',
            lastName: 'Nascimento',
            email: 'patrickndeoliveira@gmail.com',
            password: await bcrypt.hash('123', 12)
        }
        const user = await users.create(userData)
        expect(await bcrypt.compare('123', user.password)).toBe(true)
    });
})
