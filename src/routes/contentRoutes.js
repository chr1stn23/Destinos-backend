const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const { authenticateJWT, isAdmin, isEditorOrAdmin } = require('../middlewares/authMiddleware');

router.get('/', contentController.getAllContents);
router.post('/', contentController.createContent);
router.get('/:id', contentController.getContentById);
router.get('/slug/:slug', contentController.getContentBySlug);
router.put('/:id', contentController.updateContent);
router.delete('/:id', contentController.deleteContent);

// Ruta para admin (solo accesible por admin)
router.post('/admin/update-content', authenticateJWT, isAdmin, (req, res) => {
  // Lógica para actualizar contenido (solo accesible por admin)
  res.json({ message: 'Contenido actualizado exitosamente' });
});
// Ruta para admin y editor (accesible por ambos roles)
router.post('/content/upload', authenticateJWT, isEditorOrAdmin, (req, res) => {
  // Lógica para subir contenido (accesible por admin y editor)
  res.json({ message: 'Contenido subido exitosamente' });
});

module.exports = router;