'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Assign permissions to roles
    await queryInterface.bulkInsert('Role_has_permissions', [{
        role_id: 1,
        permission_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_id: 1,
        permission_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_id: 1,
        permission_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more role-permission assignments as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Role_has_permissions', null, {});
  },
};