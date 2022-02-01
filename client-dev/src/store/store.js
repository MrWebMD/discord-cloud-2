import {configureStore} from "@reduxjs/toolkit";

import fileBrowserSlice from './fileBrowserSlice';
import appSlice from "./appSlice";

const store = configureStore({
  reducer: {
    fileBrowserSlice: fileBrowserSlice.reducer,
    appSlice: appSlice.reducer
  }
})
export const fileBrowserActions = fileBrowserSlice.actions;
export const appActions = appSlice.actions;

export default store;