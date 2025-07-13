const { BASE_PUBLIC_URL } = require('../config/constants');

const uploadController = {
    uploadImage: (req, res) => {
        if (!req.file) return res.status(400).json({ error: 'No se subió ninguna imagen' });

        res.json({
            message: 'Imagen subida correctamente',
            filename: req.file.filename,
            url: `${BASE_PUBLIC_URL}/images/${req.file.filename}`
        });
    },

    uploadVideo: (req, res) => {
        if (!req.file) return res.status(400).json({ error: 'No se subió ningún video' });

        res.json({
            message: 'Video subido correctamente',
            filename: req.file.filename,
            url: `${BASE_PUBLIC_URL}/videos/${req.file.filename}`
        });
    },

    uploadMagazine: (req, res) => {
        if (!req.file) return res.status(400).json({ error: 'No se subió ninguna revista' });

        res.json({
            message: 'Revista subida correctamente',
            filename: req.file.filename,
            url: `${BASE_PUBLIC_URL}/magazines/${req.file.filename}`
        });
    }
};

module.exports = uploadController;
