import React, { useEffect, useState, useRef } from "react";
import classes from "./FileTable.module.css";
import SearchBar from "../Inputs/SearchBar";
import FileTableMessage from "./FileTableMessage";
import useScroll from "../../../hooks/useScroll";
import FileTableRow from "./FileTableRow";
import useHotkeys from "../../../hooks/useHotkeys";
import useKeyPress from "../../../hooks/useKeypress";
import IndicatorLight from "../IndicatorLight";

const FileTable = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  // create a useStateRef hook

  const [selectedRows, setSelectedRows] = useState([]);

  var selectedRowsRef = useRef();

  selectedRowsRef.current = selectedRows;

  const { disabled, rows, fields, finishedLoadingFlag, getRows, onSelect } = props;

  const keysHeld = useHotkeys();

  const ctrlHeld = keysHeld.includes("Control");

  const shiftHeld = keysHeld.includes("Shift");

  var shiftHeldRef = useRef();

  shiftHeldRef.current = shiftHeld;

  var tableBodyRef = useRef();

  const satisfiesSearchTerm = (rowDataAsString, index, array) => {
    const searchTermList = props.searchTerm.split("||").map((term) => {
      return term.toLowerCase().trim();
    });
    var includesSearchTerm = searchTermList.some((term, index, array) => {
      return rowDataAsString.includes(term);
    });
    return includesSearchTerm;
  };

  const filteredRowData = rows
    .map((row) => {
      return { ...row, selected: false };
    })
    .filter((row) => {
      return Object.values(row)
        .map((v) => {
          if (!v) {
            return "";
          }
          return v.toString().toLowerCase();
        })
        .some(satisfiesSearchTerm);
    });

  var filteredRowDataRef = useRef(filteredRowData);

  filteredRowDataRef.current = filteredRowData;

  useKeyPress((event) => {
    let filteredRowData = filteredRowDataRef.current;

    const keyPressed = event.key;
    if (
      (keyPressed !== "ArrowUp" && keyPressed !== "ArrowDown") ||
      selectedRowsRef.current.length <= 0
    ) {
      return;
    }

    event.preventDefault();

    var indexDirection = keyPressed === "ArrowDown" ? 1 : -1;

    setSelectedRows((prevSelectedRows) => {
      var lastSelectedRowId = prevSelectedRows.at(-1);

      var lastSelectedRowIndex = filteredRowData
        .map((r) => r.id)
        .indexOf(lastSelectedRowId);

      var newSelectedRowIndex = lastSelectedRowIndex + indexDirection;

      if (
        newSelectedRowIndex > filteredRowData.length - 1 ||
        newSelectedRowIndex < 0
      ) {
        return prevSelectedRows;
      }
      var newSelectedRowId = filteredRowData[newSelectedRowIndex].id;

      if (shiftHeldRef.current) {
        return [...prevSelectedRows, newSelectedRowId];
      }

      var scrollToElement = tableBodyRef.current.querySelectorAll("tr")[newSelectedRowIndex];

      scrollToElement.scrollIntoViewIfNeeded({
        block: "end",
        inline: "nearest",
        behavior: "smooth",
      });
      return [newSelectedRowId];
    });
  });

  const { elementRef, scrollPercentage } = useScroll();

  useEffect(() => {
    if (scrollPercentage * 100 >= 80 && !isLoading && !disabled) {
      setIsLoading(true);
      getRows();
    }
  }, [scrollPercentage, isLoading, disabled, getRows]);

  useEffect(() => {
    onSelect(selectedRows);
  }, [selectedRows, onSelect]);

  useEffect(() => {
    setIsLoading(false);
  }, [finishedLoadingFlag]);

  const onSelectHandler = (row) => {

    setSelectedRows((prevSelectedRows) => {

      if (ctrlHeld) {
        if (prevSelectedRows.includes(row.id)) {
          return prevSelectedRows.filter((id) => id !== row.id);
        }

        return [...prevSelectedRows, row.id];
      }

      const lastSelectedRowId = prevSelectedRows.at(-1);

      if (shiftHeld && lastSelectedRowId && lastSelectedRowId !== row.id) {
        const filteredIdsOnly = filteredRowData.map((r) => r.id);

        const lastSelectedRowIndex = filteredIdsOnly.indexOf(lastSelectedRowId);

        const currentSelectedRowindex = filteredIdsOnly.indexOf(row.id);

        return [
          ...prevSelectedRows,
          ...filteredIdsOnly.filter((filteredRowId, index) => {
            const boundary1 =
              index >= currentSelectedRowindex && index < lastSelectedRowIndex;

            const boundary2 =
              index <= currentSelectedRowindex && index > lastSelectedRowIndex;
            return boundary1 || boundary2;
          }),
        ];
      }

      if (prevSelectedRows.includes(row.id)) {
        return [];
      }

      return [row.id];
    });
  };

  return (
    <div className={classes.fileTable}>
      <div className={classes.hotKeyIndicator}>
        <IndicatorLight color="#50509e" on={shiftHeld} />
        <IndicatorLight color="var(--theme-ui-secondary)" on={ctrlHeld} />
      </div>
      <header>
        <h3 className={classes.tableTitle}>{props.title}</h3>
        <SearchBar
          onChange={props.onSearchTermChange}
          value={props.searchTerm}
        />
      </header>
      <main ref={elementRef}>
        <table className={classes.table}>
          <thead>
            <tr>
              {fields.map((field) => {
                return <th key={field.name}>{field.name}</th>;
              })}
            </tr>
          </thead>
          <tbody ref={tableBodyRef}>
            {filteredRowData.map((file) => {
              return (
                <FileTableRow
                  selected={selectedRows.includes(file.id)}
                  key={file.id}
                  data={file}
                  fields={fields}
                  onSelect={onSelectHandler}
                />
              );
            })}
          </tbody>
        </table>
        {/* props.disabled && <p>Loading</p> */}
        {!disabled && isLoading && (
          <FileTableMessage showWumpus={false} message={"Loading"} />
        )}
        {!disabled && !isLoading && (
          <FileTableMessage
            showWumpus={false}
            message={"Press next or scroll to load more data"}
          />
        )}
        {disabled && (
          <FileTableMessage
            showWumpus={true}
            message={"No more messages available"}
          />
        )}
      </main>
    </div>
  );
};

export default FileTable;
