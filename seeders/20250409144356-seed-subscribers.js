'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('subscribers', [
      {
        full_name: 'John Subscriber',
        email: 'john@example.com',
        password: 'hashed_password_1', // Asegúrate de que esté hasheado
        country: 'USA',
        city: 'New York',
        phone: '123456789',
        company: 'Tech Corp',
        job_title: 'Developer',
        subscribed_at: '2025-04-01 10:00:00',
        last_login: '2025-04-02 12:00:00',
        is_active: true,
        is_confirmed: true,
        accepts_marketing: true
      },
      {
        full_name: 'Jane Subscriber',
        email: 'jane@example.com',
        password: 'hashed_password_2', // Asegúrate de que esté hasheado
        country: 'Canada',
        city: 'Toronto',
        phone: '987654321',
        company: 'Health Inc',
        job_title: 'Manager',
        subscribed_at: '2025-04-01 11:00:00',
        last_login: '2025-04-02 13:00:00',
        is_active: true,
        is_confirmed: false,
        accepts_marketing: false
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subscribers', null, {});
  }
};