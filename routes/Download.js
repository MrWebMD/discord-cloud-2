const express = require("express");
const router = express.Router();

const getDownloadLink = require("../controllers/download.js");

router.post("/", getDownloadLink);

module.exports = router;
