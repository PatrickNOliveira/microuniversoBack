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
    dialect: process.env.NODE_ENV==='test'?'sqlite':process.env.DIALECT,
    storage: './__tests__/database.sqlite',
    logging: false,
    define:{
        timestamps: false
    }
}
