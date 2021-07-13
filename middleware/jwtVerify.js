const jwt = require('jsonwebtoken')

function verifyJWT(req, res, next){
    //Pega o authorization header da requisição
    const token = req.headers['authorization'];
    //Se ele estiver ausente, encerra a requisição com um erro 401
    if (!token) return res.status(401).json({ auth: false, message: 'Token de autorização ausente' });

    //Elimina o prefixo Bearer do token
    const tokenJWT = token && token.split(' ')[1]
    //Faz a verificação do token usando o SECRET do .env
    jwt.verify(tokenJWT, process.env.SECRET, function(err, decoded) {
        //Se encontrar algum erro no token, retorna o status 400 e uma mensagem de erro
        if (err) return res.status(400).json({ auth: false, message: 'Token inválido' });

        // se tudo estiver ok, salva no request para uso posterior
        req.user = decoded.usuario;
        next();
    });
}

module.exports = verifyJWT
