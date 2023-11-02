const express = require('express')
const router = express.Router();
const signUpController = require('../controller/user')
const loginController = require('../controller/login')

// login routes
router.post('/login', signUpController.login)
router.post('/login/email', loginController.checkUserEmail)
router.post('/login/pass', loginController.checkPassword)

// sign-up routes
router.post('/sign-up', signUpController.newUser);
router.post('/:emailId', signUpController.isUserExist)

module.exports = router;