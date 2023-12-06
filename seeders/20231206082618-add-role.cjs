'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [{
        name: 'Admin',
        guard_name: 'app',
        description: 'system admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Contractor',
        guard_name: 'app',
        description: 'system contractor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sub-contractor',
        guard_name: 'app',
        description: 'system Sub-contractor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more Roles as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};