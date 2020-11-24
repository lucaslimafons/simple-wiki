'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('history', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        description: { type: Sequelize.STRING(150), allowNull: true, field: 'description' },
        content: { type: Sequelize.TEXT, allowNull: false, field: 'content'},
        createdAt: { type: Sequelize.DATE, allowNull: false, field: 'created_at' },
        updatedAt: { type: Sequelize.DATE, allowNull: false, field: 'updated_at' },
        id_page: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'page',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
        },
     });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('history');
  }
};
