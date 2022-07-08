import React from "react";

const Input = ({
  lable,
  type,
  value,
  setValue,
  name,
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
      <input
        type={`${type}`}
        className={"form-control"}
        value={value}
        name={`${name}`}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
