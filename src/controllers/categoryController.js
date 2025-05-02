const CategoryService = require('../services/categoryService');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryService.getAllCategories();

        return res.status(200).json({
            success: true,
            data: categories
        })

    } catch (error) {
        console.error('Error en getAllCategories:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al obtener las categorías',
            details: error.message
        });
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const category = await CategoryService.getCategoryById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'Categoría no encontrada'
            });
        }

        return res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        console.error('Error en getCategoryById:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al obtener la categoría'
        });
    }
}

exports.createCategory = async (req, res) => {
    try {
        const newCategory = await CategoryService.createCategory(req.body);
        return res.status(201).json({
            success: true,
            data: newCategory
        });
    } catch (error) {
        console.error('Error en createCategory:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: 'La categoría ya está registrada'
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Error al crear la categoría',
            details: error.message
        });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const category = await CategoryService.updateCategory(
            req.params.id,
            req.body
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'Categoria no encontrada'
            });
        }

        return res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        console.error('Error en updateCategory:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: 'La categoría ya está registrado'
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Error al actualizar la categoría'
        });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const result = await CategoryService.deleteCategory(req.params.id);

        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Categoria no encontrada'
            });
        }

        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error('Error en deleteCategory:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al eliminar la categoría'
        });
    }
}

