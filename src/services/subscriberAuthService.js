const jwt = require('jsonwebtoken');
const {Subscriber} = require('../models/models');

const {sendVerificationEmail, sendPasswordResetEmail} = require('./subscriberNotificationService');

const {hashPassword, comparePasswords} = require('../utils/passwordUtils');

const JWT_SECRET = process.env.JWT_SECRET;

const registerSubscriber = async (subscriberData) => {
    const {subscribed_at, last_login, is_active, is_confirmed, id, ...filteredData} = subscriberData;

    // Hash de la contraseña si existe
    if (filteredData.password) {
        filteredData.password = await hashPassword(filteredData.password);
    }

    const subscriber = await Subscriber.create(filteredData);
    sendVerificationEmail(subscriber).catch(error =>
        console.error("Error al enviar correo de verificación",error));

    return subscriber;
};

const loginSubscriber = async ({email, password}) => {
    const subscriber = await Subscriber.findOne({where: {email}});
    if (!subscriber) return null;
    if (!subscriber.is_active) throw new Error('Cuenta inactiva');

    const isMatch = await comparePasswords(password, subscriber.password);
    if (!isMatch) throw new Error('Credenciales incorrectas');

    subscriber.last_login = new Date();
    await subscriber.save();

    const payload = {id: subscriber.id, email: subscriber.email};
    const accessToken = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});
    const refreshToken = jwt.sign(payload, JWT_SECRET, {expiresIn: '7d'});

    return {
        accessToken,
        refreshToken,
        id: subscriber.id,
        full_name: subscriber.full_name,
    }
};

const refreshLoginToken = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, JWT_SECRET);
        const subscriber = await Subscriber.findByPk(decoded.id);
        if (!subscriber || !subscriber.is_active) {
            return {success: false, code: 401, message: 'Usuario no encontrado o inactivo'};
        }

        const newAccessToken = jwt.sign({
            id: subscriber.id,
            email: subscriber.email
        }, JWT_SECRET, {expiresIn: '2h'});

        return {success: true, accessToken: newAccessToken};
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return {success: false, code: 401, message: 'Refresh token ha expirado'};
        }
        return { success: false, message: 'Refresh token inválido', code: 400 };
    }
}

const resendVerificationEmail = async (email) => {
    const subscriber = await Subscriber.findOne({where: {email}});
    if (!subscriber) throw new Error('404');

    if (subscriber.is_confirmed) throw new Error('400');

    await sendVerificationEmail(subscriber);
};

const verifyEmail = async (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const subscriber = await Subscriber.findOne({where: {id: decoded.userId}});

        if (!subscriber) {
            return {success: false, code: 404, message: 'Usuario no encontrado'};
        }

        if (subscriber.is_confirmed) {
            return {success: false, code: 400, message: 'El correo ya fue verificado'};
        }

        await Subscriber.update({is_confirmed: true}, {where: {id: decoded.userId}});

        return {success: true, message: 'Correo verificado correctamente'};

    } catch (error) {
        return {success: false, code: 401, message: 'Token inválido o expirado'};
    }
};

const sendPasswordReset = async (email) => {
    const subscriber = await Subscriber.findOne({where: {email}});

    if (!subscriber) {
        return {success: false, message: 'Correo no encontrado', code: 404};
    }

    await sendPasswordResetEmail(subscriber);

    return {success: true};
};

const resetPassword = async (token, newPassword) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const subscriber = await Subscriber.findByPk(userId);

        if (!subscriber) {
            return {success: false, message: 'Usuario no encontrado', code: 404};
        }

        const hashedPassword = await hashPassword(newPassword);

        await Subscriber.update({password: hashedPassword}, {where: {id: userId}});

        return {success: true};
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return {success: false, message: 'El token ha expirado', code: 401};
        }
        return {success: false, message: 'Token inválido', code: 400};
    }
};

module.exports = {
    registerSubscriber,
    loginSubscriber,
    refreshLoginToken,
    resendVerificationEmail,
    verifyEmail,
    sendPasswordReset,
    resetPassword,
}
