const express = require('express');
const router = express.Router();
const purchaseController = require('../controller/purchase');

// user buys premium plan then initiate the order routes
router.get('/purchase-premium-membership', purchaseController.purchasePremium);
router.post('/update-transaction-status', purchaseController.updateTransaction);

module.exports = router