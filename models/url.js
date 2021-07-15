const {users} = require('../models/users')
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Url extends Model {
    static associate(models) {
      Url.belongsTo(models.users, {
        foreignKey: 'user_id',
        as: 'users'
      })
    }
  };
  Url.init({
    destiny: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Campo destiny é obrigatório !"
        },
        isUrl: true
      }
    },
    tinyUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Campo tinyUrl é obrigatório !"
        },
        len: {
          args: [7,7],
          msg: "Campo tinyUrl deve ter 7 caracteres"
        },
        isUnique: async (value, next) => {

          const url = await Url.findOne({
            where: {tinyUrl: value}
          })


          if (url){ return next('Url encurtada já existe !')}
          next()
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Url',
  });
  return Url;
};
