'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('subscribers', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('CURRENT_TIMESTAMP')
    });

    await queryInterface.addColumn('subscribers', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('CURRENT_TIMESTAMP')
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('subscribers', 'createdAt');
    await queryInterface.removeColumn('subscribers', 'updatedAt');
  }
};
