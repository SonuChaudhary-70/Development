const express = require('express');
const router = express.Router()

router.get('/comment', (req, res, next) => {
    res.send('<h1>Comment added</h1>')
})

router.get('/', (req, res, next) => {
    res.send('<h1> hello from Express js </h1>');
})

module.exports = router