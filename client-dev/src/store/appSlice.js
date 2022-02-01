import { createSlice } from "@reduxjs/toolkit";
import fetchGuilds from "../api/fetchGuilds";
import config from "../appConfig";

const {appName, apiDomain} = config;

const appSlice = createSlice({
  name: "app details",
  apiDomain,
  initialState: {
    title: appName,
    pages: {
      fileBrowserPageURL: "/file-browser",
      homePageURL: "/",
      settingsPageURL: "/settings"
    },
    guilds: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGuilds.fulfilled, (state, action) => {
      state.guilds = action.payload;
    });
  },
});

export default appSlice;
