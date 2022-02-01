import { useSelector } from "react-redux";
import { useParams } from "react-router";

export default function useGuildChannelParams() {
  var errorMessage = null;
  var selectedGuild = null;
  var selectedChannel = null;

  /**
   * Try to identify
   * the selected guild from the
   * url parameters.
   */
  const { guildId: guildIdParam, channelId: channelIdParam } = useParams();

  const allGuilds = useSelector((state) => state.appSlice.guilds);

  selectedGuild = allGuilds.filter((guild) => {
    return guild.id === guildIdParam;
  })[0];

  if (!selectedGuild) {
    errorMessage = "Guild does not exist... try refreshing";
    return { selectedGuild, selectedChannel, errorMessage };
  }

  if (selectedGuild.channels.length === 0) {
    errorMessage = "Guild does not have any channels.";
    return { selectedGuild, selectedChannel, errorMessage };
  }

  /**
   * Try to identify
   * the selected channel of
   * the guild from the
   * url parameters.
   */

  selectedChannel = selectedGuild.channels.filter((channel) => {
    return channel.id === channelIdParam;
  })[0];

  /**
   * Only throw an error if the 
   * user was looking for a specific channel ID (with url params)
   * AND that channel doesn't exist.
   */

  if (!selectedChannel && channelIdParam) {
    errorMessage = "Oops, that channel does not exist.";
  }

  return { selectedGuild, selectedChannel, errorMessage };
}
