'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('content', {
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
      subtitle: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      author: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      publication_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      main_image_url: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'category',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      content_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'content_type',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      slug: {
        type: Sequelize.STRING(150),
        unique: true,
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('content');
  }
};