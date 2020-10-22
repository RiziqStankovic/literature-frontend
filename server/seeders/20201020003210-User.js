'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'People',
      [
        {
          email: 'admin@literatures.com',
          password:
            '$2b$10$wU6wSvnsFQj76W1rCnl4ZOPdFHiNNNKsHTWuyHEEP1BldrWrAF4Ne',
          fullName: 'Administrator',
          gender: 'Other',
          phone: '000000000000',
          address: 'Blue Planet',
          photo: 'new-user.png',
          role: 'admin',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
