'use strict';
const { Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Magazine', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    issue_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    publication_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cover_image_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pdf_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_physical: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    tableName: 'magazine',
    timestamps: false
  });
};
