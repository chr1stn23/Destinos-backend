'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('interactive_video', 'highlighted', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });

    await queryInterface.addColumn('interactive_video', 'order', {
      type: Sequelize.INTEGER,
      allowNull: true,  // Puede ser null por ahora
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('interactive_video', 'highlighted');
    await queryInterface.removeColumn('interactive_video', 'order');
  }
};