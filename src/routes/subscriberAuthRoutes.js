const express = require('express');
const router = express.Router();
const subscriberAuthController = require('../controllers/subscriberAuthController');

router.post('/register', subscriberAuthController.registerSubscriber);
router.post('/login', subscriberAuthController.loginSubscriber);
router.post('/refresh-token', subscriberAuthController.refreshLoginToken);

router.post('/resend-verification', subscriberAuthController.resendVerificationEmail)
router.get('/verify-email', subscriberAuthController.verifyEmail);

router.post('/forgot-password', subscriberAuthController.forgotPassword);
router.post('/reset-password', subscriberAuthController.resetPassword);

module.exports = router;