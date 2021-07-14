const { Router } = require('express')
const urlController = require('../controllers/urlController')
const optionalAuth = require('../middleware/optionalAuth')

const router = Router()
router.post('/url', optionalAuth, urlController.criarUrl)

module.exports = router
