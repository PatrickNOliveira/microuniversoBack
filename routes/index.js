const bodyParser = require('body-parser')
const usersRoutes = require('./usersRoutes')
const loginRoutes = require('./loginRoutes')

module.exports = app => {
    app.use(
        bodyParser.json(),
        usersRoutes,
        loginRoutes
    )
}
