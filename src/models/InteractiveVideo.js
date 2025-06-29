'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('InteractiveVideo', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        highlighted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: true,  // Solo necesario si está destacado
        }
    },{
        tableName: 'interactive_video',
        timestamps: false
    });
};
