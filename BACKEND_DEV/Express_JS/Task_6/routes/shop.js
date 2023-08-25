const express = require('express');
const productsController = require('../controller/product')

const router = express.Router();

router.get('/',productsController.getProducts);

module.exports = router;
