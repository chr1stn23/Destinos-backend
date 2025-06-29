'use strict';
const { Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const ContentType = sequelize.define('ContentType', {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        description: DataTypes.TEXT
    }, {
        tableName: 'content_type',
        timestamps: false
    });

    ContentType.associate = models => {
        ContentType.hasMany(models.Content, {
            foreignKey: 'content_type_id',
            as: 'contents'
        });
    };

    return ContentType;
};
