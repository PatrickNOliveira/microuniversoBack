const { Router } = require('express')
const UserController = require('../controllers/UserController')

const router = Router()
router.get('/user', UserController.todosOsUsuarios)

module.exports = router
