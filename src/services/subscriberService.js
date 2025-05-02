const { Subscriber } = require('../models/models');
const { hashPassword, comparePasswords } = require('../utils/passwordUtils');
require('bcrypt');

// Funciones para gestión de suscriptores (datos)
const getAllSubscribers = async (page = 1, pageSize = 10) => {
    const offset = (page - 1) * pageSize;

    const { count, rows } = await Subscriber.findAndCountAll({
        attributes: { exclude: ['password'] },
        limit: pageSize,
        offset: offset
    });

    return {
        data: rows,
        pagination: {
            page: Number(page),
            pageSize: Number(pageSize),
            totalItems: count,
            totalPages: Math.ceil(count / pageSize),
            hasNextPage: page * pageSize < count,
            hasPreviousPage: page > 1
        }
    };
};

const getSubscriberById = async (id) => {
    return await Subscriber.findByPk(id, {
        attributes: { exclude: ['password'] }
    });
};

const createSubscriber = async (subscriberData) => {
    if (subscriberData.password) {
        subscriberData.password = await hashPassword(subscriberData.password);
    }
    return Subscriber.create(subscriberData);
};

const updateSubscriber = async (id, updateData) => {
    const subscriber = await Subscriber.findByPk(id);
    if (!subscriber) return null;

    if (updateData.password) {
        delete updateData.password;
    }

    return await subscriber.update(updateData);
};

const deleteSubscriber = async (id) => {
    const subscriber = await Subscriber.findByPk(id);
    if (!subscriber) return null;

    return await subscriber.destroy();
};

// Funciones relacionadas con autenticación y seguridad

const updateSubscriberInfo = async (email, data) => {
    const subscriber = await Subscriber.findOne({ where: { email } });

    if (!subscriber) {
        throw new Error('Suscriptor no encontrado');
    }

    // Actualiza los campos necesarios
    await Object.assign(subscriber, data);
    await subscriber.save();
    return subscriber;
};

const changePassword = async (email, current_password, new_password) => {
    const subscriber = await Subscriber.findOne({ where: { email } });

    if (!subscriber) {
        throw new Error('Suscriptor no encontrado');
    }

    // Verificar si la contraseña actual es correcta
    const passwordMatch = await comparePasswords(current_password, subscriber.password);
    if (!passwordMatch) {
        throw new Error('La contraseña actual es incorrecta');
    }

    // Hashear y Actualizar la contraseña
    subscriber.password = await hashPassword(new_password);
    await subscriber.save();
    return subscriber;
};

const updateMarketingPreferences = async (email, accepts_marketing) => {
    const subscriber = await Subscriber.findOne({ where: { email } });

    if (!subscriber) {
        throw new Error('Suscriptor no encontrado');
    }

    subscriber.accepts_marketing = accepts_marketing;
    await subscriber.save();
    return subscriber;
};

const updateAccountStatus = async (email, is_active) => {
    const subscriber = await Subscriber.findOne({ where: { email } });

    if (!subscriber) {
        throw new Error('Suscriptor no encontrado');
    }

    subscriber.is_active = is_active;
    await subscriber.save();
    return subscriber;
};

// Funciones para actualizar la contraseña
const updatePassword = async (id, password, newPassword) => {
    const subscriber = await Subscriber.findByPk(id);
    if (!subscriber) return null;

    const isMatch = await comparePasswords(password, subscriber.password);
    if (!isMatch) return false;

    subscriber.password = await hashPassword(newPassword);
    await subscriber.save();
    return true;
};

module.exports = {
    getAllSubscribers,
    getSubscriberById,
    createSubscriber,
    updateSubscriber,
    deleteSubscriber,
    updatePassword,
    updateSubscriberInfo,
    changePassword,
    updateMarketingPreferences,
    updateAccountStatus,
};
