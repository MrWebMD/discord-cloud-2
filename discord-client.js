const { Client, Intents } = require("discord.js");

/* Give bot access to available discord guilds and their messages */

const intents = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES];

const client = new Client({
  intents,
});

const getDiscordClient = (TOKEN) => {
  return new Promise((resolve, reject) => {
    
    /* The ready event triggers the promise to resolve with the discord client object */

    client.on("ready", () => {
      resolve(client);
    });

    client.login(TOKEN).catch(reject);
  });
};

module.exports = getDiscordClient;
