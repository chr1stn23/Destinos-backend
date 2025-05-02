'use strict';
const { Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        full_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        last_login: {
            type: DataTypes.DATE,
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM('admin', 'editor'),
            allowNull: false
        }
    }, {
        tableName: 'users',
        timestamps: false
    });
};
