import React from "react";
import Bubble from "../ui/Bubble";
import classes from "./BrowserFooter.module.css";
import formatBytes from "../../helpers/formatBytes";
import { useSelector } from "react-redux";
import useGuildChannelParams from "../../hooks/useGuildChannelParams";

const BrowserFooter = (props) => {

  const fileBrowserSlice = useSelector(state => state.fileBrowserSlice);

  const { selectedGuild} = useGuildChannelParams();

  const totalBytes = formatBytes(fileBrowserSlice.files.messageArray.reduce((prevVal, file) => {
    return prevVal + file.size
  }, 0))
  
  return (
    <footer className={classes.footer}>
      <section>
        <Bubble text={selectedGuild.nameAcronym} />
        <p>
          {fileBrowserSlice.selectedRows.length} Files selected
          <br />
          {formatBytes(fileBrowserSlice.totalBytesSelected)} in total
          <br />
          
          {fileBrowserSlice.files.moreMessages && "Scroll for more messages"}
          {!fileBrowserSlice.files.moreMessages && "No more data available"}
        </p>
      </section>
      <section>
        <p>
          Channel summary:
          <br />
          {totalBytes} in total
          <br />
          {fileBrowserSlice.filesIndexed} files from {fileBrowserSlice.messagesIndexed} messages
        </p>
      </section>
      <section>
      
      </section>
    </footer>
  );
};

export default BrowserFooter;
