const MagazineService = require('../services/magazineService');

// Obtener todas las revistas
exports.getAll = async (req, res) => {
    try {
        const magazines = await MagazineService.getAllMagazines();
        res.status(200).json({
            success: true,
            data: magazines
        });
    } catch (error) {
        console.error('Error al obtener revistas:', error);
        res.status(500).json(
            {
                success: false,
                error: 'Error al obtener las revistas',
                details: error.message
            }
        );
    }
};

exports.getById = async (req, res) => {
    try {
        const {id} = req.params;
        const magazine = await MagazineService.getMagazineById(id);
        if (!magazine) return res.status(404).json(
            {success: false, error: 'Revista no encontrada'}
        );

        return res.status(200).json({
            success: true,
            data: magazine
        })
    } catch (error) {
        console.error('Error al obtener revista:', error);
        res.status(500).json({error: 'Error al obtener la revista'});
    }
}

// Crear una nueva revista
exports.create = async (req, res) => {
    try {
        const newMagazine = await MagazineService.createMagazine(req.body);
        res.status(201).json({
            success: true,
            data: newMagazine,
        });
    } catch (error) {
        console.error('Error al crear revista:', error);
        res.status(400).json({success: false, error: 'Error al crear la revista'});
    }
};

// Actualizar una revista
exports.update = async (req, res) => {
    const {id} = req.params;
    try {
        const result = await MagazineService.updateMagazine(id, req.body);
        if (!result) return res.status(404).json({success: false, error: 'Revista no encontrada'});

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Error al actualizar revista:', error);
        res.status(400).json({success: false, error: 'Error al actualizar la revista'});
    }
};

// Eliminar una revista
exports.remove = async (req, res) => {
    const {id} = req.params;
    try {
        const deleted = await MagazineService.deleteMagazine(id);
        if (!deleted) return res.status(404).json({success: false, error: 'Revista no encontrada'});
        res.status(200).json({success: true});
    } catch (error) {
        console.error('Error al eliminar revista:', error);
        res.status(400).json({error: 'Error al eliminar la revista'});
    }
};
