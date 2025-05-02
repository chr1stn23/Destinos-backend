// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Ruta para crear un nuevo usuario
router.post('/', userController.createUser);

// Ruta para obtener todos los usuarios
router.get('/', authenticateJWT, userController.getAllUsers);

// Ruta para obtener un usuario por su ID
router.get('/:id', authenticateJWT, userController.getUserById);

// Ruta para actualizar la información de un usuario
router.put('/:id', authenticateJWT, userController.updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', authenticateJWT, userController.deleteUser);

module.exports = router;