const bodyParser = require('body-parser')
const usersRoutes = require('./usersRoutes')

module.exports = app => {
    app.use(
        bodyParser.json(),
        usersRoutes
    )
}
