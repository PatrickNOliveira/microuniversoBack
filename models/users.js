'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.hasMany(models.Url, {
        foreignKey: 'user_id',
        as: 'url'
      })
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
        },
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
    indexes: [
      // Create a unique index on email
      {
        unique: true,
        fields: ['email']
      },
    ],
      sequelize,
    modelName: 'users'
  });
  return users;
};
