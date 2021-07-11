require("dotenv").config({
    allowEmptyValues: true
});

if (process.env.NODE_ENV === 'test'){
    require("dotenv").config({
        path: '.env.test',
        allowEmptyValues: true
    });
}
module.exports = {
    host: '127.0.0.1',
    username: 'root',
    password: '',
    database: 'microuniverso',
    dialect: 'mysql',
    logging: false,
    define:{
        timestamps: false,
        underscored: true,
        undescoredAll: true
    }
}
