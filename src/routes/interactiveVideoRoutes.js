const express = require('express');
const router = express.Router();
const InteractiveVideoController = require('../controllers/interactiveVideoController');

router.get('/', InteractiveVideoController.getAllInteractiveVideos);
// Obtener los 3 videos destacados y ordenados
router.get('/featured', InteractiveVideoController.getFeaturedInteractiveVideos);
router.get('/:id', InteractiveVideoController.getInteractiveVideoById);
router.post('/', InteractiveVideoController.createInteractiveVideo);
router.put('/:id', InteractiveVideoController.updateInteractiveVideo);
router.delete('/:id', InteractiveVideoController.deleteInteractiveVideo);

module.exports = router;
