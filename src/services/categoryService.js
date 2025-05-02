const {Category} = require('../models/models');

const getAllCategories = async () => {
    return await Category.findAll();
}

const getCategoryById = async (id) => {
    return await Category.findByPk(id);
}

const createCategory = async (category) => {
    return Category.create(category);
}

const updateCategory = async (id, category) => {
    const categoryToUpdate = await Category.findByPk(id);
    if (!categoryToUpdate) return null;

    return categoryToUpdate.update(category);
}

const deleteCategory = async (id) => {
    const categoryToDelete = await Category.findByPk(id);
    if (!categoryToDelete) return null;

    return await categoryToDelete.destroy();
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}
