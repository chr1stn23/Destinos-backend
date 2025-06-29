const InteractiveVideoService = require('../services/interactiveVideoService');

const getAllInteractiveVideos = async (req, res) => {
    try {
        const videos = await InteractiveVideoService.getAllInteractiveVideos();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFeaturedInteractiveVideos = async (req, res) => {
    try {
        const videos = await InteractiveVideoService.getFeatured();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getInteractiveVideoById = async (req, res) => {
    try {
        const video = await InteractiveVideoService.getInteractiveVideo(req.params.id);
        if (!video) {
            return res.status(404).json({ error: 'Video no encontrado' });
        }
        res.json(video);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createInteractiveVideo = async (req, res) => {
    try {
        const video = await InteractiveVideoService.createInteractiveVideo(req.body);
        res.status(201).json(video);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateInteractiveVideo = async (req, res) => {
    try {
        const video = await InteractiveVideoService.updateInteractiveVideo(req.params.id, req.body);
        res.json(video);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteInteractiveVideo = async (req, res) => {
    try {
        await InteractiveVideoService.deleteInteractiveVideo(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllInteractiveVideos,
    getFeaturedInteractiveVideos,
    getInteractiveVideoById,
    createInteractiveVideo,
    updateInteractiveVideo,
    deleteInteractiveVideo,
};
