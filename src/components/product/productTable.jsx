import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import AddToBasket from "../common/basket/basketUtils/addToBasket";
import Table from "../common/table/table";
import TableSelect from "../common/table/tableSelect";
const ProductTable = ({
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
  dispatch,
}) => {
  let match = useRouteMatch();
  const columns = [
    {
      key: "select",
      content: (product) => (
        <TableSelect
          row={product}
          id={product.id}
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
      path: "description",
      label: "موضوع",
    },
    {
      path: "createDate",
      label: "تاریخ ایجاد",
    },
    {
      label: "عملیات",
      key: "actions",
      content: (product) => (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log(product);
              onDelete(product);
            }}
            className="btn btn-danger btn-sm"
          >
            <i className="fa fa-trash m-1"></i>حذف
          </button>
          <Link
            className="btn btn-info btn-sm m-2"
            to={`${match.url}/Edit/${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <i className="fa fa-edit m-1"></i>
            ویرایش
          </Link>

          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log(product);
              AddToBasket(product,dispatch);
            }}
            className="btn btn-success btn-sm"
          >
            <i className="fa fa-plus m-1"></i>افزودن به سبد خرید
          </button>
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

export default ProductTable;
