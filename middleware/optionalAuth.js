const jwt = require('jsonwebtoken')

function isAuth(req, res, next){
    //Pega o authorization header da requisição
    const token = req.headers['authorization'];
    if (!token){
        next()
    } else {

        //Elimina o prefixo Bearer do token
        const tokenJWT = token && token.split(' ')[1]

        //Faz a verificação do token usando o SECRET do .env
        jwt.verify(tokenJWT, process.env.SECRET, function (err, decoded) {
            if (err){next()}
            // Salva no request para uso posterior
            req.user = decoded.usuario;
            next();
        });
    }
}

module.exports = isAuth
