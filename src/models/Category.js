'use strict';

const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        description: DataTypes.TEXT
    }, {
        tableName: 'category',
        timestamps: false
    });

    Category.associate = models => {
        Category.hasMany(models.Content, {
            foreignKey: 'category_id',
            as: 'contents'
        });
    };

    return Category;
};
