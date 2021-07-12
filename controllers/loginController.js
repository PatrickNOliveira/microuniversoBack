const database = require('../models')
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

class loginController {

    static async logIn(req, res){
        try {
            const dados = req.body
            const usuario = await database.users.findOne({
                //Inclui a senha na busca (eliminada por padrão por questões de segurança)
                attributes:[
                    'id',
                    'firstName',
                    'lastName',
                    'password',
                    'email'
                ],
                where: {
                    email: dados.email
                }
            });

            //Se a consulta não encontrar nenhum usuário, retorna um erro 401 e encerra a execução do sistema
            if (!usuario){
                return res.status(401).json({message: "Usuário enviado não cadastrado"})
            } else {

                //Configura a variável senhaCorreta que é uma comparação entre a senha enviada
                // e a senha criptografada do usuário
                const senhaCorreta = await bcrypt.compare(dados.password, usuario.password)

                if (senhaCorreta){ //Se senhaCorreta retornar true
                    //Cria o token jwt com o SECRET do .env e os dados do usuário logado
                    const token = jwt.sign({usuario} , process.env.SECRET);
                    //Zera a senha para não retorná-la no endpoint
                    usuario.password = null
                    //Retorna um auth:true, o token e o usuário logado, além do status 200.
                    return res.status(200).json({ auth: true, token: token, user: usuario });
                } else { //se senhaCorreta retornar false
                    //Retorna um erro 401 e a mensagem de senha incorreta
                    return res.status(401).json({message: "Senha incorreta"});
                }

            }

        } catch (err) {
            return res.status(500).json(err.message)
        }
    }
}

module.exports = loginController
