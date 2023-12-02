const express = require('express')
const router = express.Router();

// home page routes - render login page first
router.get('/', (req, res) => {
    res.sendFile('login.html', { root: 'views' });
})

router.get('/signUp', (req, res) => {
    res.sendFile('signUp.html', { root: 'views' });
})

router.get('/homePage', (req, res) => {
    res.sendFile('home.html', { root: 'views' })
});

router.get('/report', (req, res) => {
    console.log('report route works');
    res.sendFile('report.html', { root: 'views' })
});


module.exports = router