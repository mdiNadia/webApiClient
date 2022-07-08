import React from "react";
import { Link } from "react-router-dom";

const FromHeader = ({
  title,
  btnTitle,
  btnMode,
  btnType,
  toCreate,
  goBack,
}) => {
  return (
    <div className="pageheader">
      <h2>{title}</h2>
      <div className="btn-content">
        <button className={`btn btn-danger m-2`} onClick={goBack} type="button">
          بازگشت به عقب
        </button>
        <button className={`btn btn-${btnMode}`} type="submit">
          {btnTitle}
        </button>
      </div>
    </div>
  );
};

export default FromHeader;
