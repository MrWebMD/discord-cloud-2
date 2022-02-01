const getTextChannels = guild => {

  const channels = guild.channels.cache;
  
  const textChannels = channels.filter(channel => {
    return channel.type === "GUILD_TEXT";
  })

  const channelList = textChannels.map(channel => {
    return {
      id: channel.id,
      name: channel.name,
    }
  })

  return channelList;
}


const getGuilds = (req, res) => {


  /* Retrieve discord client */

  const client = req.app.locals.client;

  /**
   * Generate a list of guilds
   * using client cache
   */

  let guildData = client.guilds.cache.map(guild => {

    const {id, name, nameAcronym} = guild;

    return {
      id,
      name,
      icon: guild.iconURL(),
      channels: getTextChannels(guild),
      nameAcronym
    }
 
  });

  res.json(guildData);
}

module.exports = getGuilds;