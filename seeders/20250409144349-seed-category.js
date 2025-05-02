'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('category', [
      { name: 'Technology', description: 'All about technology' },
      { name: 'Health', description: 'Health and wellness topics' },
      { name: 'Travel', description: 'Travel guides and tips' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('category', null, {});
  }
};