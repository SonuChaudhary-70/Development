const express = require('express');
const router = express.Router();
const premiumFeatureController = require('../controller/premiumFeature');

router.get('/update-leaderBoard', premiumFeatureController.updateLeaderBoard);
router.get('/report/download',premiumFeatureController.downloadExpenseReport)


module.exports = router