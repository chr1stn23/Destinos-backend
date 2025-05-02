'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('magazine', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      issue_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      publication_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      cover_image_url: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      pdf_url: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      is_physical: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('magazine');
  }
};