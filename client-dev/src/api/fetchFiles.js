import { createAsyncThunk } from "@reduxjs/toolkit";
import proxiedFetch from "./proxiedFetch";
const fetchFiles = createAsyncThunk("fetchFiles", async ({channelId, lastMessageId, callback}, ) => {
  var requestOptions = {
    channelId,
    lastMessageId
  };

  const data = await proxiedFetch("/files", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestOptions),
  })
    .then((res) => res.json())
    .then((data) => data);

    callback();

  return {...data, firstRequest: !lastMessageId};
});

export default fetchFiles;
