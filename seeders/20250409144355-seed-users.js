'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPasswordAdmin = await bcrypt.hash('admin_password', saltRounds);
    const hashedPasswordEditor = await bcrypt.hash('editor_password', saltRounds);

    await queryInterface.bulkInsert('users', [
      {
        full_name: 'Admin User',
        username: 'admin',
        password: 'hashed_password_1',
        email: 'admin@example.com',
        last_login: null,
        role: 'admin'
      },
      {
        full_name: 'Editor User',
        username: 'editor',
        password: 'hashed_password_2',
        email: 'editor@example.com',
        last_login: null,
        role: 'editor'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};