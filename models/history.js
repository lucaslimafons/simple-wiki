const messages = require('../common/messages');

module.exports = function (sequelize, DataTypes) {
  const History = sequelize.define('history', {
    description: {
      type: DataTypes.STRING(150),
      allowNull: true,
      field: 'description'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'content',
      validate: { notNull: { msg: messages.content_required } }
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
  });

  History.associate = function (models) {
    History.belongsTo(models.page, {
      foreignKey: {
        name: 'id_page',
        allowNull: false,
        validate: {
          notNull: { msg: messages.page_required }
        }
      },
      constraints: true,
      onUpdate: "NO ACTION",
      onDelete: "NO ACTION"
    });
  }

  return History;
};
