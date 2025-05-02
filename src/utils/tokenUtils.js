const jwt = require('jsonwebtoken');

const generateVerificationToken = (userId) => {
    const payload = {
        userId, // ID del usuario, puede ser cualquier dato relevante
        action: 'verify-email', // Acción que estamos realizando
    };

    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '24h',
    };

    return jwt.sign(payload, secret, options);
};

const generateResetToken = (userId) => {
    const payload = {
        userId, // ID del usuario, puede ser cualquier dato relevante
        action: 'reset-password-email', // Acción que estamos realizando
    };

    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn: '1h', // El token expirará en 1 hora
    };

    return jwt.sign(payload, secret, options);
};

module.exports = {
    generateVerificationToken,
    generateResetToken,
}