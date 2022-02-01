import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FileTable from "../ui/FileTable/FileTable";
import classes from "./BrowserBody.module.css";
import { fileBrowserActions } from "../../store/store";
import formatBytes from '../../helpers/formatBytes';
import formatDate from '../../helpers/formatDate';
import CopyButton from "../ui/Inputs/CopyButton";
import FilePreviewer from "../ui/FilePreviewer/FilePreviewer";

const BrowserBody = (props) => {
  const { files, searchTerm, lastMessagePointer } = useSelector(
    (state) => state.fileBrowserSlice
  );

  const dispatch = useDispatch();

  const searchTermChangeHandler = (event) => {
    console.log(event.target.value);

    dispatch(fileBrowserActions.changeSearchTerm(event.target.value));
  };

  const quickCopy = (value) => {
    return <CopyButton text={value}/>
  }

  const tableFields = [
    { name: "name" },
    { name: "createdAt", modifier: formatDate},
    { name: "contentType" },
    { name: "size", modifier: formatBytes},
    { name: "url", modifier: quickCopy},
    { name: "id", modifier: quickCopy },
  ];

  const onSelectHandler = (selectedRows) => {
    dispatch(fileBrowserActions.updateSelectedRows(selectedRows));
  }

  return (
    <main className={classes.browserBody}>
      <FileTable
        rows={files.messageArray}
        title={props.selectedGuild.name}
        fields={tableFields}
        disabled={props.disabled}
        isLoading={props.isLoading}
        getRows={props.getRows}
        onSearchTermChange={searchTermChangeHandler}
        onSelect={onSelectHandler}
        searchTerm={searchTerm}
        finishedLoadingFlag={lastMessagePointer}
      />
      <FilePreviewer fields={tableFields}/>
    </main>
  );
};

export default BrowserBody;
