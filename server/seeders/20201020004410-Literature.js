'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Literature',
      [
        {
          title: 'Aplikasi Diferensial dalam Ekonomi dan Bisnis',
          userId: 1,
          month: 'February',
          year: '2017',
          pages: 18,
          isbn: '978123847386',
          author: 'Ginanjar Syamsuar',
          file: 'turunan',
          status: 'Approved',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Pemrograman Kompetitif Dasar',
          userId: 1,
          month: 'August',
          year: '2019',
          pages: 149,
          isbn: '978006364873',
          author: 'William Gozali',
          file: 'pkd',
          status: 'Approved',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Pemanfaatan Kulit Singkong sebagai Bahan Baku Karbon Aktif',
          userId: 1,
          month: 'November',
          year: '2015',
          pages: 132,
          isbn: '978006364875',
          author: 'Leni Maulinda',
          file: 'singkong',
          status: 'Approved',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Metode Pengumpulan Data Penelitian Kuantitatif',
          userId: 1,
          month: 'June',
          year: '2011',
          pages: 132,
          isbn: '978123847318',
          author: 'UIN Malang',
          file: 'file-1604401084338',
          status: 'Approved',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Literature', null, {});
  },
};
