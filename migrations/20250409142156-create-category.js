'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('category', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('category');
  }
};