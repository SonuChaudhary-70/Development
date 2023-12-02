const express = require('express');
const router = express.Router();
const premiumFeatureController = require('../controller/premiumFeature');

// user buys premium plan then initiate the order routes
router.get('/purchase-premium-membership', premiumFeatureController.purchasePremium);
router.post('/update-transaction-status', premiumFeatureController.updateTransaction);

router.get('/update-leaderBoard', premiumFeatureController.updateLeaderBoard);
router.get('/report/download',premiumFeatureController.report)


module.exports = router