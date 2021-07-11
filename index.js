const express = require('express')
const routes = require('./routes')
const cors = require('cors')

require("dotenv").config({
    path: process.env.NODE_ENV=== 'test' ? '.env.test' : '.env',
    allowEmptyValues: true
});

const app = express();

app.use(cors())

routes(app)

//Testando variáveis de ambiente
app.listen(process.env.APP_PORT || 3000, () => {
    console.log(process.env.NODE_ENV)
})

module.exports = app
