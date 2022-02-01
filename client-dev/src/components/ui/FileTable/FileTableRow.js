import React from "react";
import classes from './FileTableRow.module.css';

const FileTableRow = (props) => {
  const { data, fields, selected } = props;

  const handleSelect = (event) => {
    event.stopPropagation();
    props.onSelect(data);
  };

  const rowClasses = `${selected && classes.selected}`;

  return (
    <tr key={data.id} onClick={handleSelect} className={rowClasses}>
      {fields.map((field, index) => {
        var cellContent = data[field.name];

        if (field.modifier) {
          cellContent = field.modifier(cellContent);
        }

        return (
          <td key={index}>
            {index === 0 && (
              <input
                type="checkbox"
                checked={selected}
                onChange={handleSelect}
              />
            )}

            {cellContent}
          </td>
        );
      })}
    </tr>
  );
};

export default FileTableRow;
