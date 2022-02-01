/**
 * 
 * @param {array} messages 
 * @returns Array of file attachments
 */
const getAttachmentsFromMessages = (messages) => {
  let attachments = [];

  messages.forEach((message) => {
    if (message.attachments.size <= 0) {
      return;
    }

    attachments.push(...formatAttachments(message));
  });

  return attachments;
};

const lastElementOf = (mapObject) => {
  return Array.from(mapObject.values()).pop();
};

/**
 * 
 * @param {Message Object} message https://discord.js.org/#/docs/main/stable/class/Message
 * @returns Array of file attachments from message.
 */
const formatAttachments = (message) => {
  const returnVal = [];
  message.attachments.forEach((attachment) => {
    attachment.messageLink = message.url;
    attachment.createdAt = message.createdAt;
    returnVal.push(attachment);
  });
  return returnVal;
};

const getDefaultResponseData = () => ({
  messageArray: [],
  moreMessages: true,
  lastMessagePointer: "",
  messagesIndexed: 0,
});

const getFiles = (req, res) => {

  /* Retrieve discord client */

  const client = req.app.locals.client;

  /**
   * The message ID of the last message scanned
   * for files is used as a way to paginate
   * the results from the discord api.
   */

  const { channelId, lastMessageId: before } = req.body;

  const fetchOptions = { limit: 100, before };

  const channel = client.channels.cache.get(channelId);

  var responseData = getDefaultResponseData();



  channel.messages.fetch(fetchOptions).then((messages) => {

    /**
     * If discord doesn't resolve all 100 messages
     * in any response, it means there are no more messages
     * left to be indexed.
     */
    if (messages.size < fetchOptions.limit) {
      responseData.moreMessages = false;
    }

    console.log("Messages: " + messages.size);

    const attachments = getAttachmentsFromMessages(messages);

    responseData.messageArray.push(...attachments);

    responseData.lastMessagePointer = null;

    const lastElement = lastElementOf(messages);

    if(lastElement) {
      responseData.lastMessagePointer = lastElement.id;
    }
    
    responseData.messagesIndexed = messages.size;

    console.log("MESSAGE POINTER: ", responseData.lastMessagePointer);

    res.json(responseData);
  });
};

module.exports = getFiles;
