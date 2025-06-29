const {InteractiveVideo} = require('../models/models');

const getAllInteractiveVideos = async () => {
    return await InteractiveVideo.findAll();
}

const getFeatured = async () => {
    return await InteractiveVideo.findAll({
        where: {highlighted: true},
        order: [['order', 'ASC']],
        limit: 3
    });
}

const getInteractiveVideo = async (id) => {
    return await InteractiveVideo.findByPk(id);
}

const createInteractiveVideo = async (data) => {
    return InteractiveVideo.create(data);
}

const updateInteractiveVideo = async (id, data) => {
    const video = await InteractiveVideo.findByPk(id);
    if (!video) throw new Error('Video no encontrado');
    return await video.update(data);
}

const deleteInteractiveVideo = async (id) => {
    const video = await InteractiveVideo.findByPk(id);
    if (!video) throw new Error('Video no encontrado');
    await video.destroy();
}


module.exports = {
    getAllInteractiveVideos,
    getFeatured,
    getInteractiveVideo,
    createInteractiveVideo,
    updateInteractiveVideo,
    deleteInteractiveVideo,
}
