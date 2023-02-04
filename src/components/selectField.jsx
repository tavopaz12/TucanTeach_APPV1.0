import React from "react";

import "../styles/SelectField.scss";

export default function SelectField({ options, value }) {
  return (
    <>
      <select defaultValue={value} className="selectField">
        {options.map((item) => (
          <option key={item} className="selectField__option" value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
}
