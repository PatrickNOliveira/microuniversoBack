'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      // define association here
    }
  };
  users.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: "Campo firstName é obrigatório !"
        }
      }
    },

    lastName:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: "Campo lastName é obrigatório !"
        }
      }
    },

    email:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: "Campo email é obrigatório !"
        },
        isEmail:{
          msg: "Insira um e-mail válido !"
        },
        isUnique: function(value, next) {

          users.find({
            where: {email: value},
            attributes: ['id']
          })
              .done(function(error, user) {

                if (error)
                    // Se o find encontrar algum erro
                  return next(error);

                if (user)
                  //Se encontrar um usuário com o e-mail especificado
                  return next('E-mail já em uso');

                // Se passar pelas validações anteriores, passa direto
                next();

              });

        }
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: "Campo password é obrigatório"
        }
      }
    }

  }, {
    sequelize,
    modelName: 'users',
    defaultScope: {
      //Elimina a senha das consultas para garantir a integridade e a segurança do sistema
      attributes: { exclude: ['password'] },
    }
  });
  return users;
};
