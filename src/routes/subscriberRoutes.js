const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriberController');
const { authenticateJWT } = require('../middlewares/authMiddleware');

router.post('/', subscriberController.createSubscriber);
router.get('/', subscriberController.getAllSubscribers);
router.get('/:id', subscriberController.getSubscriberById);
router.put('/:id', subscriberController.updateSubscriber);
router.delete('/:id', subscriberController.deleteSubscriber);

router.put('/:id/password', subscriberController.updatePasswordSubscriber);

// Ruta para actualizar la información del suscriptor
router.put('/:email', authenticateJWT, subscriberController.updateSubscriberInfo);
// Ruta para cambiar la contraseña
router.put('/:email/password', authenticateJWT, subscriberController.changePassword);

// Ruta para actualizar las preferencias de marketing
router.put('/:email/marketing', authenticateJWT, subscriberController.updateMarketingPreferences);

// Ruta para desactivar/reactivar la cuenta
router.put('/:email/status', authenticateJWT, subscriberController.updateAccountStatus);

module.exports = router;