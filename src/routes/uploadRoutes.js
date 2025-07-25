const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const {
    uploadImage,
    uploadVideo,
    uploadMagazine
} = require('../middlewares/multerMiddleware');

// Endpoints de subida
router.post('/image', uploadImage.single('file'), uploadController.uploadImage);
router.post('/video', uploadVideo.single('file'), uploadController.uploadVideo);
router.post('/magazine', uploadMagazine.single('file'), uploadController.uploadMagazine);

module.exports = router;
