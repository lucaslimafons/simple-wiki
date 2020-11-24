'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('page', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        slug: { type: Sequelize.STRING(150), allowNull: false, field: 'slug' },
        title: { type: Sequelize.STRING(150), allowNull: false, field: 'title' },
        content: { type: Sequelize.TEXT, allowNull: false, field: 'content'},
        published: { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false, field: 'published'},
        createdAt: { type: Sequelize.DATE, allowNull: false, field: 'created_at' },
        updatedAt: { type: Sequelize.DATE, allowNull: false, field: 'updated_at' }
     });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('page');
  }
};
