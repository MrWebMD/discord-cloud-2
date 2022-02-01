const express = require("express");
const router = express.Router();

/**
 * This api route will fetch a list
 * of all avaiable guilds that the discord 
 * bot has access to.
 */

const getGuilds = require('../controllers/guilds.js');

router.get("/", getGuilds);

module.exports = router;
