const { Router } = require('express')
const urlController = require('../controllers/urlController')
const jwtVerify = require('../middleware/jwtVerify')

const router = Router()
router.post('/url', urlController.criarUrl)

module.exports = router
