import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { _Delete_Slider, _Slider } from "../../api/api";
import {
  _Delete_SliderAction,
  _Get_SlidersAction,
} from "../../store/slider/sliderAction";
import DeleteData from "../../api/action/delete";
import TablePageHeader from "../common/table/tableCreateHeader";
import Pagination from "../common/table/tablePagination";
import TableSearch from "../common/table/tableSearch";
import TableSort from "../common/table/tableSort";
import SliderTable from "./sliderTable";
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

const Slider = () => {
  const data = useSelector((state) => state.Slider.payload);
  const dispatch = useDispatch();
  let match = useRouteMatch();
  const history = useHistory();
  var [loading, setLoading] = useState(false);
  const [select, setSelect] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const totalCount = useSelector((state) => state.Slider.totalCount);
  const currentPage = useSelector((state) => state.Slider.page ?? 1);
  const pageSize = useSelector((state) => state.Slider.take ?? 4);
  const [pageSizeValue, setPageSizeValue] = useState(pageSize);
  const sortId = useSelector((state) => state.Slider.sortId ?? "1");
  const [sortValue, setSortValue] = useState(sortId);
  const search = useSelector((state) => state.Slider.search ?? "");
  const [searchValue, setSearchValue] = useState(search ?? "");
  const key = useSelector((state) => state.Slider.key ?? "");
  const [keyValue, setKeyValue] = useState(key ?? "");
  const [cpath, setCpath] = useState();
  const [corder, setCorder] = useState();
  const sorted = _.orderBy(data, [cpath], [corder]);
  //نمایش دیتا بر اساس شماره صفحه
  //////////////////////////////////////////////
  const handlePageChange = (pageno) => {
    const pageNumData = async () => {
      ListData({
        url: _Slider,
        pageno: pageno,
        currentPage: currentPage,
        action: _Get_SlidersAction,
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
  const handleDelete = (slider) => {
    DeleteData({
      url: _Delete_Slider,
      id: slider.id,
      action: _Delete_SliderAction,
      dispatch: dispatch,
    });
  };
  //////////////////////////////////////////////
  //رویداد کلیک و دوبار کلیک روی هر سطر
  //////////////////////////////////////////////
  const handleRowOnclick = (item) => {
    window.alert(`click ${item.shopSliders_ID}`);
  };
  const handleRowOnDoubleclick = (item) => {
    window.alert(`doubleClick ${item.shopSliders_ID}`);
  };
  //////////////////////////////////////////////
  //این درخواست هر وقت کامپوننت برای اولین بار بیاد بالا بلافاصله ارسال میشود و نتیجه در ریداکس قرار میگیرد
  //////////////////////////////////////////////
  useEffect(() => {
    setLoading(true);

    const getData = async () => {
      ListData({
        url: _Slider,
        currentPage: currentPage,
        action: _Get_SlidersAction,
        dispatch: dispatch,
        searchValue: search,
        sortValue: sortId,
        pageSizeValue: pageSizeValue,
        keyValue: keyValue,
        history: history,
        module: _Slider,
        setLoading: setLoading,
      });
    };
    getData();
  }, [dispatch]);
  console.log(selectedItems);
  /////////////////////////////////////////////
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

            <SliderTable
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

export default Slider;
