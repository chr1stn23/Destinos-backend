'use strict';

const {Sequelize} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Subscriber', {
        full_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        country: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        company: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        job_title: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        subscribed_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        last_login: {
            type: DataTypes.DATE,
            allowNull: true
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        is_confirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        accepts_marketing: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, {
        tableName: 'subscribers',
        timestamps: false,
    });
};