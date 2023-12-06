'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Permissions', [
      { name: 'READ' ,guard_name: 'app',createdAt: new Date(), updatedAt: new Date()},
      { name: 'WRITE',guard_name: 'app',createdAt: new Date(), updatedAt: new Date()},
      { name: 'DELETE',guard_name: 'app',createdAt: new Date(), updatedAt: new Date()},
      // Add more permissions as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Permissions', null, {});
  },
};
