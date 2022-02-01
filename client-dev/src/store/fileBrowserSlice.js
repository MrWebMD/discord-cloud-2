import { createSlice } from "@reduxjs/toolkit";
import fetchFiles from "../api/fetchFiles";
const fileBrowserSlice = createSlice({
  name: "fileBrowserSlice",
  initialState: {
    files: {
      messageArray: [],
      moreMessages: true,
    },
    selectedRows: [],
    totalBytesSelected: 0,
    searchTerm: "",
    messagesIndexed: 0,
    filesIndexed: 0,
    lastMessagePointer: null,
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    updateSelectedRows(state, action) {
      state.selectedRows = action.payload;

      state.totalBytesSelected = state.files.messageArray.reduce((prevVal, message) => {

        if(state.selectedRows.indexOf(message.id) >= 0) {
          return prevVal + message.size;
        }

        return prevVal;
      }, 0);

    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFiles.fulfilled, (state, action) => {
      if (action.payload.firstRequest) {
        state.files = action.payload;
        state.messagesIndexed = action.payload.messagesIndexed;
      } else {
        state.files.messageArray.push(...action.payload.messageArray);
        state.messagesIndexed += action.payload.messagesIndexed;
      }
      state.files.moreMessages = action.payload.moreMessages;
      state.lastMessagePointer = action.payload.lastMessagePointer;
      state.filesIndexed = state.files.messageArray.length;

    });
  },
});

export default fileBrowserSlice;
