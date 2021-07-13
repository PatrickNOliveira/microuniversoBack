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
      validate: {
        notNull: {
          msg: "Campo email é obrigatório !"
        },
        isEmail: {
          msg: "Insira um e-mail válido !"
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
    modelName: 'users'
  });
  return users;
};
