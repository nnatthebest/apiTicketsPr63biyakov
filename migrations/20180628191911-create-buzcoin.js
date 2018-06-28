'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('buzcoins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      marcetname: {
        type: Sequelize.STRING
      },
      tickername: {
        type: Sequelize.STRING
      },
      tickerbuy: {
        type: Sequelize.NUMERIC
      },
      tickersell: {
        type: Sequelize.NUMERIC
      },
      createtime: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('buzcoins');
  }
};