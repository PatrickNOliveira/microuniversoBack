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
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: process.env.DIALECT,
    storage: './__tests/database.sqlite',
    logging: false,
    define:{
        timestamps: false,
        underscored: true,
        undescoredAll: true
    }
}
