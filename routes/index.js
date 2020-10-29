const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const { getDailyAmsDataController } = require("../controllers");

router.get("/", getDailyAmsDataController);

module.exports = router;
