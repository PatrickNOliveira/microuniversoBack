const { UrlService } = require('../services')
const urlService = new UrlService();

class UrlController {

    static async criarUrl(req, res){
        try {

            const url = req.body
            if (req.user) url.user_id = req.user.id
            const urlCriada = await urlService.insertData(url)
            return res.status(201).json(urlCriada)

        } catch (err) {
            if (err){
                return res.status(500).json(err.message)
            }
        }
    }

    static async buscarPeloCodigo(req, res){
        try {

            const codigo = req.params.codigo
            const url = await urlService.searchForCode(codigo)
            if (url) {
                return res.status(200).json(url)
            } else {
                return res.status(204).json()
            }

        } catch (err) {
            if (err){
                return res.status(500).json(err.message)
            }
        }
    }

}

module.exports = UrlController
