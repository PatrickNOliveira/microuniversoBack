const { UrlService } = require('../services')
const urlService = new UrlService();

class UrlController {

    static async criarUrl(req, res){
        try {

            const url = req.body
            const urlCriada = await urlService.insertData(url)
            return res.status(201).json(urlCriada)

        } catch (err) {
            if (err){
                return res.status(500).json(err.message)
            }
        }
    }

}

module.exports = UrlController
