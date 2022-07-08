import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Table from "../common/table/table";
import TableSelect from "../common/table/tableSelect";
const SliderTable = ({
  data,
  onDelete,
  onRowOnclick,
  onRowOnDoubleclick,
  handleSelect,
  handleSelectAll,
  isCheckAll,
  setSearchValue,
  searchValue,
  onPageChange,
  setKeyValue,
  searchKey,
  handleSortingArrow,
  setCpath,
  setCorder,
  cpath,
  corder,
}) => {
  let match = useRouteMatch();
  const columns = [
    {
      key: "select",
      content: (slider) => (
        <TableSelect
          row={slider}
          id={slider.id}
          onSelect={handleSelect}
        />
      ),
    },
    { path: "image", label: "تصویر" },
    {
      path: "title",
      label: "عنوان",
    },
    {
      path: "subTitle",
      label: "زیرنویس",
    },
    {
      path: "isActive",
      label: "فعال است؟",
    },
    {
      path: "createDate",
      label: "تاریخ ایجاد",
    },
    {
      label: "عملیات",
      key: "actions",
      content: (slider) => (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log(slider);
              onDelete(slider);
            }}
            className="btn btn-danger btn-sm"
          >
            <i className="fa fa-trash m-1"></i>حذف
          </button>
          <Link
            className="btn btn-info btn-sm m-2"
            to={`${match.url}/Edit/${slider.id}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <i className="fa fa-edit m-1"></i>
            ویرایش
          </Link>
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      onRowOnclick={onRowOnclick}
      onRowOnDoubleclick={onRowOnDoubleclick}
      handleSelectAll={handleSelectAll}
      onPageChange={onPageChange}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      setKeyValue={setKeyValue}
      searchKey={searchKey}
      handleSortingArrow={handleSortingArrow}
      setCpath={setCpath}
      setCorder={setCorder}
      cpath={cpath}
      corder={corder}
      isCheckAll={isCheckAll}
    />
  );
};

export default SliderTable;
