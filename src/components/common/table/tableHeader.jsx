import React, { Component, useEffect } from "react";
import { Form } from "react-bootstrap";
const TableHeader = ({
  handleSelectAll,
  columns,
  setSearchValue,
  setKeyValue,
  onPageChange,
  searchKey,
  searchValue,
  setCpath,
  setCorder,
  corder,
  cpath,
  isCheckAll,
}) => {
  const raiseSort = (path) => {
    if (cpath === path) {
      setCpath(path);
      setCorder(corder === "asc" ? "desc" : "asc");
    } else {
      setCpath(path);
      setCorder("asc");
    }
  };
  const renderSortIcon = (column) => {
    if (column.path !== cpath) return null;
    if (corder === "asc") return <i className="fa fa-sort-asc m-1" />;
    return <i className="fa fa-sort-desc m-1" />;
  };
  return (
    <thead>
      <tr>
        <th colSpan={5} key={"check"}>
          <input
            className="form-check-input"
            id="all-data"
            key="all-data"
            type="checkbox"
            onChange={(e) => {
              handleSelectAll(e);
            }}
            checked={isCheckAll}
          />
        </th>
        {columns.map((column, i) => (
          <th
            colSpan={5}
            key={column.path || column.key}
            className="clickable"
            onClick={() => {
              raiseSort(column.path);
            }}
          >
            {column.label}
            {renderSortIcon(column)}
          </th>
        ))}
      </tr>
      <tr>
        {columns.map((column, i) => (
          <th colSpan={5} key={`c-${i}`}>
            <div className="search-content">
              <input
                id="search"
                onChange={(e) => {
                  e.preventDefault();
                  setKeyValue(e.target.value ? column.path : "");
                  setSearchValue(e.target.value);
                }}
                onKeyUp={() => {
                  onPageChange(1);
                }}
                onKeyPress={() => {
                  onPageChange(1);
                }}
                value={searchKey === column.path ? searchValue : ""}
              />
              {searchValue.length >= 1 && searchKey === column.path ? (
                <a
                  className="clear-search"
                  onClick={(e) => {
                    e.preventDefault();
                    setKeyValue("");
                    setSearchValue("");
                  }}
                  type="submit"
                >
                  <i className="fa fa-times"></i>
                </a>
              ) : (
                ""
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
