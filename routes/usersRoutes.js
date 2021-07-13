const { Router } = require('express')
const UserController = require('../controllers/UserController')
const jwtVerify = require('../middleware/jwtVerify')

const router = Router()
router.get('/user', UserController.todosOsUsuarios)
router.post('/register', UserController.criarUsuario)
router.put('/user', jwtVerify, UserController.editarUsuario)

module.exports = router
