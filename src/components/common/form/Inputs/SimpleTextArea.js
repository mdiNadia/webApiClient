import React from "react";

const SimpleTextArea = ({
  lable,
  value,
  setValue,
  name,
  rows,
  style,
  required,
  error,
}) => {
  return (
    <div
      className={`form-group ${required === true ? "required" : ""}`}
      style={style}
    >
      <label> {lable} </label>
      {error ? <p className="error">{error}</p> : ""}
      <textarea
        className="form-control"
        value={value}
        name={`${name}`}
        rows={rows}
        onChange={(e) => {
          setValue(e.target.value);
          console.log(value);
        }}
      ></textarea>
    </div>
  );
};

export default SimpleTextArea;
