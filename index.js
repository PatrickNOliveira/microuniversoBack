const express = require('express')
const routes = require('./routes')
const cors = require('cors')
require("dotenv-safe").config({
    path: process.env.NODE_ENV=== 'test' ? '.env.test' : '.env',
    allowEmptyValues: true
});

const app = express();

app.use(cors())

routes(app)

app.listen(3000, () => {
    console.log("Servidor rodando")
})

module.exports = app
