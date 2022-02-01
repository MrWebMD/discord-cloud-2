const express = require("express");
const router = express.Router();

/**
 * This api route will fetch a 
 * list of files from any given discord channel
 */


const getFiles = require("../controllers/files.js");

router.post("/", getFiles);

module.exports = router;
