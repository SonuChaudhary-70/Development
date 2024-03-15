const express = require('express');
const router = express.Router();
const userController = require('../Controller/user');


router.get('/sign-up', (req, res) => {
    res.sendFile('signup.html', { root: 'views' });
})

router.post('/sign-up', userController.addUser)

module.exports = router;