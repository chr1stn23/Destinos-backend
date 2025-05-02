'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('magazine', [
      {
        title: 'Tech Monthly',
        issue_number: 1,
        publication_date: '2025-04-01',
        cover_image_url: 'https://example.com/tech-monthly.jpg',
        pdf_url: 'https://example.com/tech-monthly.pdf',
        is_physical: false
      },
      {
        title: 'Health Weekly',
        issue_number: 2,
        publication_date: '2025-04-08',
        cover_image_url: 'https://example.com/health-weekly.jpg',
        pdf_url: 'https://example.com/health-weekly.pdf',
        is_physical: true
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('magazine', null, {});
  }
};