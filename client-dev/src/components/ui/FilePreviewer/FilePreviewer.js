import React from "react";
import { useSelector } from "react-redux";
import classes from "./FilePreviewer.module.css";
const FilePreviewer = (props) => {
  const { selectedRows, files } = useSelector(
    (state) => state.fileBrowserSlice
  );

  const previewFile = files.messageArray
    .filter((f) => {
      return selectedRows.includes(f.id);
    })
    .at(-1);

  if (!previewFile) {
    return (
      <div className={classes.filePreviewer}>
        <h3>No file selected</h3>
      </div>
    );
  }

  var contentType = previewFile.contentType;

  if (!contentType) {
    contentType = "";
  }

  console.log("File to preview: ", previewFile);

  return (
    <div className={classes.filePreviewer}>
      <h3>{previewFile.name}</h3>

      {contentType.includes("image") && <img src={previewFile.url} alt={previewFile.name}/>}
      {contentType.includes("audio") && (
        <audio src={previewFile.url} controls></audio>
      )}
      {contentType.includes("video") && (
        <video src={previewFile.url} controls />
      )}
      <table>
        <tbody>
          {props.fields.map((field) => {
            var value = previewFile[field.name];

            if (field.modifier) {
              value = field.modifier(value);
            }

            return (
              <tr key={field.name}>
                <td>{field.name}</td>
                <td> {value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FilePreviewer;
