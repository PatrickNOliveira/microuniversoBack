const { Router } = require('express')

const router = Router()
router.get('/teste', async (req, res) =>{

    return res.send('testando...')

})
module.exports = router
