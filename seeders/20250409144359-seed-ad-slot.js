'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ad_slot', [
      { name: 'Homepage Banner', description: 'Main banner on homepage' },
      { name: 'Sidebar Ad', description: 'Ad on the sidebar' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ad_slot', null, {});
  }
};