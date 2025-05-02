'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('content_blocks', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      content_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'content',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      display_order: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      data: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('content_blocks');
  }
};