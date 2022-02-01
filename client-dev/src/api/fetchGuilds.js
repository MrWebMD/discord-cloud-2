import { createAsyncThunk } from "@reduxjs/toolkit";
import proxiedFetch from "./proxiedFetch";
const fetchGuilds = createAsyncThunk("fetchGuilds", async () => {

  const data = await proxiedFetch("/guilds", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data);

  return data;
});

export default fetchGuilds;
