const express = require('express');
const router = express.Router();
const premiumFeatureController = require('../controller/premiumFeature');

router.get('/update-leaderBoard', premiumFeatureController.updateLeaderBoard);

module.exports = router