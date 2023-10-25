const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../utility_funcs/path')


// router.get('/comment', (req, res, next) => {
//     res.send('<h1>Comment added</h1>')
// })

router.get('/shop', (req, res, next) => {
    res.sendFile(path.join(rootDir,'views','shop.html'));
});

module.exports = router