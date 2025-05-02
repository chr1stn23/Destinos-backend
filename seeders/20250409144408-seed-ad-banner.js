'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ad_banner', [
      {
        slot_id: 1, // Asegúrate de que este ID exista en la tabla 'ad_slot'
        alt_text: 'Tech Ad',
        image_url: 'https://example.com/tech-ad.jpg',
        target_url: 'https://example.com',
        start_date: '2025-04-01',
        end_date: '2025-04-30',
        is_active: true
      },
      {
        slot_id: 2, // Asegúrate de que este ID exista en la tabla 'ad_slot'
        alt_text: 'Health Ad',
        image_url: 'https://example.com/health-ad.jpg',
        target_url: 'https://example.com/health',
        start_date: '2025-04-05',
        end_date: '2025-05-05',
        is_active: true
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ad_banner', null, {});
  }
};