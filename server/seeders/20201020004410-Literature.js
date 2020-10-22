'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Literatures',
      [
        {
          title: 'Management System',
          userId: 1,
          month: 'October',
          year: '2016',
          pages: 132,
          isbn: 97812384738,
          author: 'Rizky E. E.',
          file: 'mg.pdf',
          status: 'Approved',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Sistem Informasi Standar BAN-PT',
          userId: 1,
          month: 'October',
          year: '2017',
          pages: 132,
          isbn: 97812384738,
          author: 'Haris Astina',
          file: 'sisbanpt.pdf',
          status: 'Approved',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Manajemen Laba',
          userId: 1,
          month: 'October',
          year: '2008',
          pages: 132,
          isbn: 97812384738,
          author: 'S. Sulistyanto',
          file: 'ml.pdf',
          status: 'Approved',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Sistem Informasi Keuangan',
          userId: 1,
          month: 'October',
          year: '2020',
          pages: 132,
          isbn: 97812384738,
          author: 'Ganteng Egi',
          file: 'sik.pdf',
          status: 'Approved',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Literatures', null, {});
  },
};
