'use strict';
const { Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ContentBlock', {
        type: DataTypes.STRING,
        display_order: DataTypes.INTEGER,
        data: DataTypes.TEXT
    }, {
        tableName: 'content_blocks',
        timestamps: false
    });

    ContentBlock.associate = models => {
        ContentBlock.belongsTo(models.Content, {
            foreignKey: 'content_id',
            as: 'content'
        });
    };

    return ContentBlock;
};
