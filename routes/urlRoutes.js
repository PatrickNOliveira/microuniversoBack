const { Router } = require('express')
const urlController = require('../controllers/urlController')
const optionalAuth = require('../middleware/optionalAuth')
const jwtVerify = require('../middleware/jwtVerify')

const router = Router()
router.post('/url', optionalAuth, urlController.criarUrl)
router.get('/url', jwtVerify, urlController.urlsDoUsuarioLogado)
router.get('/url/:codigo', urlController.buscarPeloCodigo)

module.exports = router
