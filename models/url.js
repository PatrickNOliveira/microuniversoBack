'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Url extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Url.init({
    destiny: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Campo destiny é obrigatório !"
        }
      }
    },
    tinyUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Campo tinyUrl é obrigatório !"
        },
        isUnique: async (value, next) => {

          const user = await Url.findOne({
            where: {tinyUrl: value}
          })


          if (user){ return next('Url encurtada já existe !')}
          next()
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Campo user_id é obrigatório !"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Url',
  });
  return Url;
};
