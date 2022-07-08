import React from "react";

const InputCheckBox = ({ lable, type, value, setValue, name }) => {
  return (
    <div className="form-check">
      <label className="form-check-label" htmlFor={`${name}`}>
        {lable}
      </label>
      <input
        id={`${name}`}
        type={`${type}`}
        className="form-check-input"
        checked={value}
        value={value}
        name={`${name}`}
        onChange={(e) => {
          setValue(e.target.checked);
          console.log(e.target.checked);
        }}
      />
    </div>
  );
};

export default InputCheckBox;
