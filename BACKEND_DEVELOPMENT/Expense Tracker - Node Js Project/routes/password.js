const express = require('express');
const router = express.Router();
const passwordController = require('../controller/password');
const userAuthentication = require('../middleware/authentication');


// router.post('/forgot-password', userAuthentication.authenticate, passwordController.forgotPassword);
router.post('/forgot-password', passwordController.forgotPassword);
router.get('/reset-password/:uuid', passwordController.resetPassword);
router.get('/update-password/:uuid', passwordController.updatePassword)

module.exports = router