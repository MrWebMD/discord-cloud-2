const dotenv = require("dotenv");
const express = require("express");
const cors = require('cors');
const getDiscordClient = require("./discord-client.js");

const filesRoute = require("./routes/Files.js");
const guildsRoute = require("./routes/Guilds.js");
const downloadRoute = require('./routes/Download.js');

dotenv.config();

const { PORT, TOKEN } = process.env;

const app = express();
/**
 *
 * @param {DiscordClient Object} client - https://discord.js.org/#/docs/main/stable/class/Client
 */
const main = (client) => {
  /**
   * Make the discord bot client
   * available in all api controllers.
   */
  app.locals.client = client;

  app.use(express.json());

  app.use(cors());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  /* Define API routes */

  /* This api route will fetch a list of all available guilds from discord */

  /**
   * This api route will fetch a list
   * of all avaiable guilds that the discord 
   * bot has access to.
   */

  app.use(express.static('public'));
  
  app.use("/guilds", guildsRoute);

  /**
   * This api route will fetch a 
   * list of files from any given discord channel
   */
  app.use("/files", filesRoute);

  app.use("/download", downloadRoute);

  app.listen(PORT);

  console.log("My server is running on localhost:" + PORT);
};

const failedToStartHandler = (error) => {
  console.log("Failed to start: ", error);
  process.exit();
};

/* Promise that resolves the client for the discord bot */

getDiscordClient(TOKEN).then(main).catch(failedToStartHandler);
