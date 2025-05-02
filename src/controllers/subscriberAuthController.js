const SubscriberAuthService = require('../services/subscriberAuthService');

exports.registerSubscriber = async (req, res) => {
    try {
        // Validación básica
        if (!req.body.email) {
            return res.status(400).json({
                success: false,
                error: 'El email es requerido'
            });
        }

        const newSubscriber = await SubscriberAuthService.registerSubscriber(req.body);
        return res.status(201).json({
            success: true,
            data: newSubscriber
        });
    } catch (error) {
        console.error('Error en createSubscriber:', error);

        // Manejo especial para errores de duplicados
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: 'El email ya está registrado'
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Error al registrarse',
            details: error.message
        });
    }
};

exports.loginSubscriber = async (req, res) => {
    try {
        const loginResponse = await SubscriberAuthService.loginSubscriber(req.body);

        if (!loginResponse) {
            return res.status(404).json({
                success: false,
                error: 'Suscriptor no encontrado'
            });
        }

        return res.status(200).json({
            ...loginResponse,
            success: true,
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: 'Error al loguearse',
            details: error.message
        });
    }
}

exports.refreshLoginToken = async (req, res) => {
    try {
        const result = await SubscriberAuthService.refreshLoginToken(req.body.refreshToken);

        if (!result.success) {
            return res.status(result.code).json({
                success: false,
                message: result.message,
            });
        }

        return res.status(200).json({
            success: true,
            accessToken: result.accessToken,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Hubo un problema al refrescar el token de acceso',
        });
    }
}

exports.resendVerificationEmail = async (req, res) => {
    try {
        await SubscriberAuthService.resendVerificationEmail(req.body.email);
        return res.status(200).json({
            success: true,
            message: "Correo de verificación enviado"
        })
    } catch (error) {
        if (error.message === '404') {
            return res.status(404).json({
                success: false,
                error: "No se encontró un usuario con ese correo"
            })
        }
        if (error.message === '400') {
            return res.status(400).json({
                success: false,
                error: "Este correo ya fue verificado previamente"
            })
        }

        return res.status(500).json({
            success: false,
            error: 'Error al loguearse',
            details: error.message
        })
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        const result = await SubscriberAuthService.verifyEmail(token);

        if (!result.success) {
            return res.status(result.code).json({
                success: false,
                message: result.message,
            });
        }

        return res.status(200).json({
            success: true,
            message: result.message,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Hubo un problema al verificar el correo',
        });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                error: "El email es requerido"
            });
        }

        const result = await SubscriberAuthService.sendPasswordReset(email);

        if (!result.success) {
            return res.status(result.code || 404).json({
                success: false,
                error: result.message
            });
        }

        return res.status(200).json({
            success: true,
            message: "Correo de recuperación enviado"
        });

    } catch (error) {
        console.error("Error en forgotPassword:", error);
        return res.status(500).json({
            success: false,
            error: "Hubo un error al enviar el correo de recuperación",
            details: error.message
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                success: false,
                error: "El token y la nueva contraseña son requeridos"
            });
        }

        const result = await SubscriberAuthService.resetPassword(token, newPassword);

        if (!result.success) {
            return res.status(result.code || 400).json({
                success: false,
                error: result.message
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada correctamente"
        });

    } catch (error) {
        console.error("Error en resetPassword:", error);
        return res.status(500).json({
            success: false,
            error: "Hubo un error al restablecer la contraseña",
            details: error.message
        });
    }
};
