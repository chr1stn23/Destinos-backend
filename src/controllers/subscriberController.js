const SubscriberService = require('../services/subscriberService');

// Obtener todos los suscriptores
exports.getAllSubscribers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        if (page < 1 || limit < 1) {
            return res.status(400).json({
                success: false,
                error: 'Los parámetros de paginación deben ser números positivos'
            });
        }

        const { data, pagination } = await SubscriberService.getAllSubscribers(page, limit);

        return res.status(200).json({
            success: true,
            pagination,
            count: data.length,
            data
        });

    } catch (error) {
        console.error('Error en getAllSubscribers:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al obtener los suscriptores',
            details: error.message
        });
    }
};

// Obtener un suscriptor por ID
exports.getSubscriberById = async (req, res) => {
    try {
        const subscriber = await SubscriberService.getSubscriberById(req.params.id);

        if (!subscriber) {
            return res.status(404).json({
                success: false,
                error: 'Suscriptor no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: subscriber
        });
    } catch (error) {
        console.error('Error en getSubscriberById:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al obtener el suscriptor'
        });
    }
};

// Crear nuevo suscriptor
exports.createSubscriber = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(400).json({
                success: false,
                error: 'El email es requerido'
            });
        }

        const newSubscriber = await SubscriberService.createSubscriber(req.body);
        return res.status(201).json({
            success: true,
            data: newSubscriber
        });
    } catch (error) {
        console.error('Error en createSubscriber:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: 'El email ya está registrado'
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Error al crear el suscriptor',
            details: error.message
        });
    }
};

// Actualizar suscriptor
exports.updateSubscriber = async (req, res) => {
    try {
        const subscriber = await SubscriberService.updateSubscriber(
            req.params.id,
            req.body
        );

        if (!subscriber) {
            return res.status(404).json({
                success: false,
                error: 'Suscriptor no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: subscriber
        });
    } catch (error) {
        console.error('Error en updateSubscriber:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: 'El email ya está registrado'
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Error al actualizar el suscriptor'
        });
    }
};

// Eliminar suscriptor
exports.deleteSubscriber = async (req, res) => {
    try {
        const result = await SubscriberService.deleteSubscriber(req.params.id);

        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Suscriptor no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error('Error en deleteSubscriber:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al eliminar el suscriptor'
        });
    }
};

// Actualizar contraseña del suscriptor
exports.updatePasswordSubscriber = async (req, res) => {
    try {
        const result = await SubscriberService.updatePassword(
            req.params.id,
            req.body.password,
            req.body.newPassword);

        if (result === null) {
            return res.status(404).json({
                success: false,
                error: 'Suscriptor no encontrado'
            })
        }

        if (result === false) {
            return res.status(401).json({
                success: false,
                error: 'Credenciales incorrectas'
            })
        }

        return res.status(200).json({
            success: true
        })
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al actualizar el password'
        })
    }
}

// Actualizar la información del suscriptor
exports.updateSubscriberInfo = async (req, res) => {
    try {
        const subscriber = await SubscriberService.updateSubscriberInfo(req.params.email, req.body);

        if (!subscriber) {
            return res.status(404).json({
                success: false,
                error: 'Suscriptor no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: subscriber
        });
    } catch (error) {
        console.error('Error en updateSubscriberInfo:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al actualizar la información del suscriptor'
        });
    }
};

// Cambiar contraseña del suscriptor
exports.changePassword = async (req, res) => {
    try {
        const result = await SubscriberService.changePassword(req.params.email, req.body);

        if (result === false) {
            return res.status(401).json({
                success: false,
                error: 'Credenciales incorrectas'
            });
        }

        return res.status(200).json({
            success: true
        })
    } catch (error) {
        console.error('Error en changePassword:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al cambiar la contraseña'
        });
    }
};

// Actualizar las preferencias de marketing
exports.updateMarketingPreferences = async (req, res) => {
    try {
        const result = await SubscriberService.updateMarketingPreferences(req.params.email, req.body);

        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Suscriptor no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Error en updateMarketingPreferences:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al actualizar las preferencias de marketing'
        });
    }
};

// Desactivar/reactivar la cuenta
exports.updateAccountStatus = async (req, res) => {
    try {
        const result = await SubscriberService.updateAccountStatus(req.params.email, req.body);

        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Suscriptor no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Error en updateAccountStatus:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al desactivar/reactivar la cuenta'
        });
    }
};
