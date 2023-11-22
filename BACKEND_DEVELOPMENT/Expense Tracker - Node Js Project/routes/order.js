const express = require('express');
const router = express.Router();
const orderController = require('../controller/order')

router.get('/premium-membership', orderController.purchasePremium)
router.post('/update-transaction-status', orderController.updateTransaction)

module.exports = router