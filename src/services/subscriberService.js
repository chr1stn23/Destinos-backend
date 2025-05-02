const { Subscriber } = require('../models/models');
const { hashPassword, comparePasswords } = require('../utils/passwordUtils');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    Object.assign(subscriber, data);
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

    // Hashear la nueva contraseña
    const hashedPassword = await hashPassword(new_password);

    // Actualizar la contraseña
    subscriber.password = hashedPassword;
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

// Funciones relacionadas con autenticación (login, registro, etc.)

const registerSubscriber = async (subscriberData) => {
    const { subscribed_at, last_login, is_active, is_confirmed, id, ...filteredData } = subscriberData;

    // Hash de la contraseña si existe
    if (filteredData.password) {
        filteredData.password = await hashPassword(filteredData.password);
    }

    const subscriber = await Subscriber.create(filteredData);
    sendVerificationEmail(subscriber).catch((error) => console.error("Error al enviar correo de verificación", error));

    return subscriber;
};

const loginSubscriber = async ({ email, password }) => {
    const subscriber = await Subscriber.findOne({ where: { email } });
    if (!subscriber) return null;
    if (!subscriber.is_active) throw new Error('Cuenta inactiva');

    const isMatch = await comparePasswords(password, subscriber.password);
    if (!isMatch) throw new Error('Credenciales incorrectas');

    subscriber.last_login = new Date();
    await subscriber.save();

    const payload = { id: subscriber.id, email: subscriber.email };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken, id: subscriber.id, full_name: subscriber.full_name };
};

// Funciones para el manejo de tokens
const refreshLoginToken = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, JWT_SECRET);
        const subscriber = await Subscriber.findByPk(decoded.id);
        if (!subscriber || !subscriber.is_active) {
            return { success: false, code: 401, message: 'Usuario no encontrado o inactivo' };
        }

        const newAccessToken = jwt.sign({ id: subscriber.id, email: subscriber.email }, JWT_SECRET, { expiresIn: '2h' });

        return { success: true, accessToken: newAccessToken };
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return { success: false, code: 401, message: 'Refresh token ha expirado' };
        }
        return { success: false, message: 'Refresh token inválido', code: 400 };
    }
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
    registerSubscriber,
    loginSubscriber,
    refreshLoginToken
};
