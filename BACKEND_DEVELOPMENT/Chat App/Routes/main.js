const express = require('express');
const router = express.Router();

router.get('/main',(req,res) => {
    res.sendFile('main.html',{root:'views'});
})

module.exports = router;