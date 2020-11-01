const express = require('express');
const { getDailyAmsDataController } = require('../controllers');
const router = express.Router();

router.get('/', getDailyAmsDataController);

module.exports = router;
