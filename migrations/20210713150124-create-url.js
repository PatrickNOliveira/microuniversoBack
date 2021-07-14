'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Urls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      destiny: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tinyUrl: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Urls');
  }
};
