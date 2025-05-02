'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('content', [
      {
        title: 'The Future of AI',
        subtitle: 'How AI is shaping the world',
        author: 'John Doe',
        publication_date: '2025-04-01',
        main_image_url: 'https://example.com/ai.jpg',
        category_id: 1, // Asegúrate de que este ID exista
        content_type_id: 1, // Asegúrate de que este ID exista
        slug: 'the-future-of-ai-2025'
      },
      {
        title: 'Top 10 Travel Destinations',
        subtitle: 'Places you must visit in 2025',
        author: 'Jane Smith',
        publication_date: '2025-03-15',
        main_image_url: 'https://example.com/travel.jpg',
        category_id: 3, // Asegúrate de que este ID exista
        content_type_id: 1, // Asegúrate de que este ID exista
        slug: 'top-10-travel-destinations-2025'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('content', null, {});
  }
};