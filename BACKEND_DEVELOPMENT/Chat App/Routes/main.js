const express = require('express');
const router = express.Router();

router.get('/main', (req, res) => {
    res.sendFile('main.html', { root: 'views' });
})

router.get('/sign-up', (req, res) => {
    res.sendFile('signup.html', { root: 'views' });
})

module.exports = router;