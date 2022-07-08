import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({
  columns,
  data,
  onRowOnclick,
  onRowOnDoubleclick,
  onPageChange,
  setSearchValue,
  searchValue,
  handleSelectAll,
  setKeyValue,
  searchKey,
  setCpath,
  setCorder,
  corder,
  cpath,
  isCheckAll,
}) => {
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        handleSelectAll={handleSelectAll}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        onPageChange={onPageChange}
        setKeyValue={setKeyValue}
        searchKey={searchKey}
        setCpath={setCpath}
        setCorder={setCorder}
        corder={corder}
        cpath={cpath}
        isCheckAll={isCheckAll}
      />
      <TableBody
        columns={columns}
        data={data}
        onRowOnclick={onRowOnclick}
        onRowOnDoubleclick={onRowOnDoubleclick}
      />
    </table>
  );
};

export default Table;
