const ContentService = require('../services/contentService');

exports.getAllContents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        if (page < 1 || limit < 1) {
            return res.status(400).json({
                success: false,
                error: 'Los parámetros de paginación deben ser números positivos'
            });
        }

        const {data, pagination} = await ContentService.getAllContents(page, limit);

        return res.status(200).json({
            success: true,
            pagination,
            count: data.length,
            data
        });

    } catch (error) {
        console.error('Error en getAllContents:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al obtener los contenidos',
            details: error.message
        });
    }
};

exports.getContentById = async (req, res) => {
    try {
        const content = await ContentService.getContentById(req.params.id);

        if (!content) {
            return res.status(404).json({
                success: false,
                error: 'Contenido no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: content
        });

    } catch (error) {
        console.error('Error en getContentById:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al obtener el contenido'
        });
    }
}

exports.getContentBySlug = async (req, res) => {
    try {
        const content = await ContentService.getContentBySlug(req.params.slug);

        if (!content) {
            return res.status(404).json({
                success: false,
                error: 'Contenido no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: content
        });

    } catch (error) {
        console.error('Error en getContentBySlug:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al obtener el contenido'
        });
    }
}

exports.createContent = async (req, res) => {
    try {
        const newContent = await ContentService.createContent(req.body);
        return res.status(201).json({
            success: true,
            data: newContent
        });
    } catch (error) {
        console.error('Error en createContent:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Error al crear el contenido',
            details: error.message
        });
    }
}

exports.updateContent = async (req, res) => {
    try {
        const content = await ContentService.updateContent(
            req.params.id,
            req.body
        );

        if (!content) {
            return res.status(404).json({
                success: false,
                error: 'Contenido no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: content
        });
    } catch (error) {
        console.error('Error en updateContent:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Error al actualizar el contenido',
            details: error.message
        });
    }
}

exports.deleteContent = async (req, res) => {
    try {
        const result = await ContentService.deleteContent(req.params.id);

        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Contenido no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error('Error en deleteContent:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al eliminar el contenido'
        });
    }
}