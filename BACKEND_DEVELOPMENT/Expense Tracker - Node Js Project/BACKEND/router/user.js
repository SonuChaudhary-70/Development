const express = require('express')
const router = express.Router();
const signUpController = require('../controller/user')

router.post('/sign-up', signUpController.newUser);
// router.get('/sign-up', signUpController.newUser);

module.exports = router;