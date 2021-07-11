const database = require('../models')

class Services {

    constructor(model) {
        this.model = model;
    }

    async allData(){
        return database[this.model].findAll();
    }

    async insertData(registro){
        return database[this.model].create(registro)
    }

    async oneData(id){
        return database[this.model].findOne({
            where: { id: Number(id) }
        });
    }

    async editData(registro, id){
        return await database[this.model].update(registro, {
            where: { id: Number(id) },
            returning: true,
            plain: true
        }).then(() => {
            return database[this.model].findOne({
                where: { id: Number(id) }
            })
        })


    }

    async deleteData(id){
        const registroDeletado = await database[this.model].findOne({
            where:{
                id: Number(id)
            }
        });
        if (registroDeletado) {
            await database[this.model].destroy({
                where: {id: Number(id)}
            })
            return true;
        } else {
            return false;
        }
    }
}

module.exports = Services
