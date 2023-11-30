const express = require('express');
const router = express.Router();
const passwordController = require('../controller/password');

router.post('/forgot-password', passwordController.forgotPassword);
router.get('/reset-password/:uuid', passwordController.resetPassword);

module.exports = router