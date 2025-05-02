const ContentTypeService = require('../services/contentTypeService');

exports.getAllContentTypes = async (req, res) => {
    try {
        const contentTypes = await ContentTypeService.getAllContentTypes();

        return res.status(200).json({
            success: true,
            data: contentTypes
        })

    } catch (error) {
        console.error('Error en getAllContentTypes:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al obtener los ContentTypes',
            details: error.message
        });
    }
}

exports.getContentTypeById = async (req, res) => {
    try {
        const ContentType = await ContentTypeService.getContentTypeById(req.params.id);

        if (!ContentType) {
            return res.status(404).json({
                success: false,
                error: 'ContentType no encontrada'
            });
        }

        return res.status(200).json({
            success: true,
            data: ContentType
        });
    } catch (error) {
        console.error('Error en getContentTypeById:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al obtener el ContentType'
        });
    }
}

exports.createContentType = async (req, res) => {
    try {
        const newContentType = await ContentTypeService.createContentType(req.body);
        return res.status(201).json({
            success: true,
            data: newContentType
        });
    } catch (error) {
        console.error('Error en createContentType:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: 'El contentType ya está registrado'
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Error al crear el ContentType',
            details: error.message
        });
    }
}

exports.updateContentType = async (req, res) => {
    try {
        const ContentType = await ContentTypeService.updateContentType(
            req.params.id,
            req.body
        );

        if (!ContentType) {
            return res.status(404).json({
                success: false,
                error: 'ContentType no encontrada'
            });
        }

        return res.status(200).json({
            success: true,
            data: ContentType
        });
    } catch (error) {
        console.error('Error en updateContentType:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: 'El contentType ya está registrado'
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Error al actualizar el ContentType'
        });
    }
}

exports.deleteContentType = async (req, res) => {
    try {
        const result = await ContentTypeService.deleteContentType(req.params.id);

        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'ContentType no encontrada'
            });
        }

        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error('Error en deleteContentType:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al eliminar el ContentType'
        });
    }
}

