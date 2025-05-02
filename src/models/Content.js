'use strict';
const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define('Content', {
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    author: DataTypes.STRING,
    publication_date: DataTypes.DATE,
    main_image_url: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    tableName: 'content',
    timestamps: false
  });

  Content.associate = models => {
    Content.belongsTo(models.ContentType, {
      foreignKey: 'content_type_id',
      as: 'type'
    });

    Content.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category'
    });

    Content.hasMany(models.ContentBlock, {
      foreignKey: 'content_id',
      as: 'blocks',
      onDelete: 'CASCADE',
      hooks: true
    });
  };

  return Content;
};
