import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import api, { config, Files_Root_URL, ROOT_URL, _Product, _Product_Report_Excel } from "../../api/api";
import {
  _Get_Products,
  _Get_ProductsAction,
  _Get_Report_Product,
  _Get_Report_ProductAction
} from "../../store/product/productAction";
import DeleteData from "../../api/action/delete";
import TablePageHeader from "../common/table/tableCreateHeader";
import Pagination from "../common/table/tablePagination";
import TableSearch from "../common/table/tableSearch";
import TableSort from "../common/table/tableSort";
import ProductTable from "./productTable";
import ListData from "../../api/action/list";
import TableItemsShow from "../common/table/tableItemsShow";
import { LoadingOutlined } from "@ant-design/icons";
import _ from "lodash";
import {
  Select,
  SelectAll,
  OnChangeSelect,
  OnChangeSelectAll,
} from "../common/table/tableSelectFunc";
import axios from "axios";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import downloadXLSFile from "../common/ReportUtils/downloadXLSFile";



const Product = () => {
//
  const data = useSelector((state) => state.Product.payload);
  const dispatch = useDispatch();
  let match = useRouteMatch();
  const history = useHistory();
  var [loading, setLoading] = useState(false);



  const [select, setSelect] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const totalCount = useSelector((state) => state.Product.totalCount);
  const currentPage = useSelector((state) => state.Product.page ?? 1);
  const pageSize = useSelector((state) => state.Product.take ?? 4);
  const [pageSizeValue, setPageSizeValue] = useState(pageSize);
  const sortId = useSelector((state) => state.Product.sortId ?? "1");
  const [sortValue, setSortValue] = useState(sortId);
  const search = useSelector((state) => state.Product.search ?? "");
  const [searchValue, setSearchValue] = useState(search ?? "");
  const key = useSelector((state) => state.Product.key ?? "");
  const [keyValue, setKeyValue] = useState(key ?? "");
  const [cpath, setCpath] = useState();
  const [corder, setCorder] = useState();
  const sorted = _.orderBy(data, [cpath], [corder]);

  //نمایش دیتا بر اساس شماره صفحه
  //////////////////////////////////////////////
  const handlePageChange = (pageno) => {
    const pageNumData = async () => {
      ListData({
        url: _Product,
        pageno: pageno,
        currentPage: currentPage,
        action: _Get_ProductsAction,
        dispatch: dispatch,
        searchValue: searchValue,
        sortValue: sortValue,
        pageSizeValue: pageSizeValue,
        keyValue: keyValue,
        history: history,
      });
    };
    pageNumData();
  };
  useEffect(() => {
    data && data.length === 0 && totalCount !== 0
      ? handlePageChange(currentPage - 1)
      : handlePageChange(currentPage);
  }, [totalCount, sortValue]);
  useEffect(() => {
    handlePageChange(1);
  }, [pageSizeValue, searchValue]);
  //////////////////////////////////////////////
  //چک‌باکس انتخاب
  //////////////////////////////////////////////
  var inputs = document.getElementsByClassName("selected");
  var content = [];
  const handleSelectAll = (e) => {
    SelectAll(setIsCheckAll, isCheckAll, setSelectedItems, content, e, inputs);
  };
  const handleSelect = (e, row) => {
    Select(e, row, selectedItems, setIsCheckAll, data);
  };
  useEffect(() => {
    OnChangeSelect(selectedItems);
  }, [data]);
  useEffect(() => {
    OnChangeSelectAll(isCheckAll, content, setSelectedItems, inputs);
  }, [isCheckAll, data]);
  //////////////////////////////////////////////
  //حذف دیتا
  //////////////////////////////////////////////
  const handleDelete = (Product) => {
    DeleteData({
      url: _Product,
      id: Product.shopProducts_ID,
      //action: _Delete_ProductAction,
      dispatch: dispatch,
    });
  };
  //////////////////////////////////////////////
  //رویداد کلیک و دوبار کلیک روی هر سطر
  //////////////////////////////////////////////
  const handleRowOnclick = (item) => {
    window.alert(`click ${item.shopProducts_ID}`);
  };
  const handleRowOnDoubleclick = (item) => {
    window.alert(`doubleClick ${item.shopProducts_ID}`);
  };
  //////////////////////////////////////////////
  //این درخواست هر وقت کامپوننت برای اولین بار بیاد بالا بلافاصله ارسال میشود و نتیجه در ریداکس قرار میگیرد
  //////////////////////////////////////////////
  useEffect(() => {
    setLoading(true);

    const getData = async () => {
      debugger
      ListData({
        url: _Product,
        currentPage: currentPage,
        action: _Get_ProductsAction,
        dispatch: dispatch,
        searchValue: search,
        sortValue: sortId,
        pageSizeValue: pageSizeValue,
        keyValue: keyValue,
        history: history,
        module: _Product,
        setLoading: setLoading,
      });
    };
    getData();
  }, [dispatch]);
  console.log(selectedItems);
  /////////////////////////////////////////////
  const getReport = (e) => {
    e.preventDefault();
  var frm = new FormData();
  frm.append("pageno", currentPage);
  frm.append("take", pageSizeValue);
    downloadXLSFile(_Product_Report_Excel,frm);
  };
  return (
    <>
      {!loading ? (
        <>
          <div className="content-box">
            <TablePageHeader
              totalCount={totalCount}
              btnMode={"success"}
              btnTitle={"افزودن"}
              link={`${match.url}/Create`}
            />
             <form onSubmit={getReport}>
                 <input className="btn btn-info" type="submit" value="گزارش از اطلاعات جدول"/>
             </form>
          </div>
          <div className="content-box">
            <div className="pt-1 search-sort-box">
              <TableSort setSortValue={setSortValue} sortValue={sortValue} />
              <TableItemsShow
                pageSizeValue={pageSizeValue}
                setPageSizeValue={setPageSizeValue}
                itemsCount={totalCount}
              />
              <TableSearch
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                onPageChange={handlePageChange}
                setKeyValue={setKeyValue}
              />
            </div>

            <ProductTable
              data={sorted}
              onDelete={handleDelete}
              onRowOnclick={handleRowOnclick}
              onRowOnDoubleclick={handleRowOnDoubleclick}
              select={select}
              handleSelect={handleSelect}
              handleSelectAll={handleSelectAll}
              isCheckAll={isCheckAll}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
              onPageChange={handlePageChange}
              setKeyValue={setKeyValue}
              itemsCount={totalCount}
              pageSize={pageSizeValue}
              currentPage={currentPage}
              currentPageDataLength={data && data.length}
              searchKey={key}
              setCpath={setCpath}
              setCorder={setCorder}
              cpath={cpath}
              corder={corder}
              setIsCheckAll={setIsCheckAll}
              dispatch={dispatch}
              //isCheckAll={isCheckAll}
            />

            <Pagination
              itemsCount={totalCount}
              pageSize={pageSizeValue}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              currentPageDataLength={data && data.length}
            />
          </div>
        </>
      ) : (
        <div className="loader">
          <LoadingOutlined
            style={{
              fontSize: 35,
              color: "#001529",
            }}
            spin
          />
        </div>
      )}
    </>
  );
};

export default Product;
