const express = require('express');
const router = express.Router();
const contentTypeController = require('../controllers/contentTypeController');

router.get('/', contentTypeController.getAllContentTypes);
router.post('/', contentTypeController.createContentType);
router.get('/:id', contentTypeController.getContentTypeById);
router.put('/:id', contentTypeController.updateContentType);
router.delete('/:id', contentTypeController.deleteContentType);

module.exports = router;