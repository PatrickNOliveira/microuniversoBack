const { sequelize } = require('../models')

//Elimina todos os dados das tabelas dos models (Deve ser usado apenas em testes)
module.exports = () => {
    return Promise.all(Object.keys(sequelize.models).map(key => {
        return sequelize.models[key].destroy({truncate: true, force: true})
    }))
}
