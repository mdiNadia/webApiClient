import React from "react";
const Search = ({ inputValue, setInpuValue }) => {
  return (
    <div className="mt-2">
      <input
        placeholder="جستجو کنید"
        className="searchBox"
        lable=""
        type="text"
        name="search"
        value={inputValue}
        style={{
          width: "fit-content",
          margin: "auto",
          padding: "3px 20px",
          borderRadius: "1px",
          background: "transparent",
          border: "1px solid #6c757d",
        }}
        onChange={(e) => {
          e.preventDefault();
          setInpuValue(e.target.value);
        }}
        autoComplete="off"
      />
    </div>
  );
};

export default Search;
