const express = require('express');
const router = express.Router();
const orderController = require('../controller/order')

router.get('premium-member-ship',orderController)

module.exports = router