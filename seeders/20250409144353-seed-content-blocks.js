'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('content_blocks', [
      {
        content_id: 1,
        type: 'text',
        display_order: 1,
        data: 'Artificial Intelligence (AI) is transforming industries...'
      },
      {
        content_id: 1,
        type: 'image',
        display_order: 2,
        data: 'https://example.com/ai-diagram.jpg'
      },
      {
        content_id: 2,
        type: 'text',
        display_order: 1,
        data: 'Discover the most beautiful places to visit this year...'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('content_blocks', null, {});
  }
};