const { Router } = require('express')
const UserController = require('../controllers/UserController')

const router = Router()
router.get('/user', UserController.todosOsUsuarios)
router.post('/register', UserController.criarUsuario)

module.exports = router
