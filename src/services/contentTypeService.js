const {ContentType} = require('../models/models');

const getAllContentTypes = async () => {
    return await ContentType.findAll();
}

const getContentTypeById = async (id) => {
    return await ContentType.findByPk(id);
}

const createContentType = async (contentType) => {
    return ContentType.create(contentType);
}

const updateContentType = async (id, contentType) => {
    const ContentTypeToUpdate = await ContentType.findByPk(id);
    if (!ContentTypeToUpdate) return null;

    return ContentTypeToUpdate.update(contentType);
}

const deleteContentType = async (id) => {
    const ContentTypeToDelete = await ContentType.findByPk(id);
    if (!ContentTypeToDelete) return null;

    return await ContentTypeToDelete.destroy();
}

module.exports = {
    getAllContentTypes,
    getContentTypeById,
    createContentType,
    updateContentType,
    deleteContentType
}
