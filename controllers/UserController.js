const { UserService } = require('../services')
const userService = new UserService();

class UserController {

    static async todosOsUsuarios(req, res){
        try {
            const users = await userService.todosOsUsuarios();
            if (users) {
                return res.status(200).json(users)
            } else {
                return res.status(204).json([])
            }

        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async criarUsuario (req,res){
        try {
            const data = req.body
            const user = await userService.createUser(data);
            return res.status(201).json(user)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async editarUsuario (req, res) {
        try {
            const data = req.body
            const user = await userService.editUser(data, req.user.id);
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }
}

module.exports = UserController
