'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('content_type', [
      { name: 'Article', description: 'Written articles' },
      { name: 'Video', description: 'Video content' },
      { name: 'Podcast', description: 'Audio podcasts' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('content_type', null, {});
  }
};