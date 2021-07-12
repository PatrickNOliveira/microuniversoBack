const { Router } = require('express')
const loginController = require('../controllers/loginController')

const router = Router()
router.post('/sessions', loginController.logIn)

module.exports = router
