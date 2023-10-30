const express = require('express')
const router = express.Router();
const signUpController = require('../controller/user')

// sign-up routes
router.post('/sign-up', signUpController.newUser);
router.post('/:emailId', signUpController.isUserExist)

// login routes
router.post('/login',signUpController.login)

module.exports = router;