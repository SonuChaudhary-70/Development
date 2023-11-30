const express = require('express')
const router = express.Router();
const signUpController = require('../controller/user.js')

// sign-up routes
router.post('/sign-up', signUpController.signUp);

// login routes
router.post('/login', signUpController.login)

// check user exist with given mail id or not for both login and sign-up routes
router.post('/:id', signUpController.isUserExist)

module.exports = router;