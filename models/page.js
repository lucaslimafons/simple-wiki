const messages = require('../common/messages');

module.exports = function (sequelize, DataTypes) {
  const Page = sequelize.define('page', {
    slug: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: 'slug',
      validate: { notNull: { msg: messages.slug_required } }
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: 'title',
      validate: { notNull: { msg: messages.title_required } }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'content',
      validate: { notNull: { msg: messages.content_required } }
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'published'
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
  });

  Page.associate = function (models) {
    Page.hasMany(models.history, {
      foreignKey: { name: 'id_page', allowNull: false },
      constraints: true,
      onUpdate: "NO ACTION",
      onDelete: "NO ACTION"
    });
  }

  return Page;
};
