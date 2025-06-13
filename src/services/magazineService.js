const {Magazine} = require('../models/models');

const getAllMagazines = async () => {
    return await Magazine.findAll({
        order: [['publication_date', 'DESC']],
    });
}

const getMagazineById = async (id) => {
    return await Magazine.findByPk(id);
}

const createMagazine = async (magazine) => {
    return Magazine.create(magazine);
}

const updateMagazine = async (id, magazine) => {
    const magazineToUpdate = await Magazine.findByPk(id);
    if (!magazineToUpdate) return null;

    return magazineToUpdate.update(magazine);
}

const deleteMagazine = async (id) => {
    const magazineToDelete = await Magazine.findByPk(id);
    if (!magazineToDelete) return null;

    return await magazineToDelete.destroy();
}

module.exports = {
    getAllMagazines,
    getMagazineById,
    createMagazine,
    updateMagazine,
    deleteMagazine
}
