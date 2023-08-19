const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../utility_funcs/path')

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir,'views','add-product.html'));
})

router.post('/products', (req, res, next) => {
    let data = req.body
    console.log('product :',data.title)
    console.log('quantity :',data.quantity);
    res.redirect('/shop')
})


module.exports = router