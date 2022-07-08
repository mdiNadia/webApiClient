import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import TableItemsCount from "./tableItemsCount";

const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
  currentPageDataLength,
}) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const Neighbours = 5;

  if (pagesCount === 1) return null;
  const startpage = Math.max(1, currentPage);
  const endpage = Math.min(pagesCount + 1, currentPage + Neighbours);
  const pages = _.range(startpage, endpage);
  //const pages = _.range(1, pagesCount + 1);

  const prevChange = (e) => {
    e.preventDefault();
    onPageChange(currentPage - 1);
  };
  const nextChange = (e) => {
    e.preventDefault();
    onPageChange(currentPage + 1);
    console.log(currentPage + 1);
  };

  const firstPage = (e) => {
    e.preventDefault();
    onPageChange(1);
  };
  const lastPage = (e) => {
    debugger;
    e.preventDefault();
    console.log(pagesCount);
    onPageChange(pagesCount);
  };

  return (
    <div className="tablefooter">
      <nav className="d-flex">
        <ul className="pagination">
          <li className="page-item">
            <a
              className={currentPage === 1 ? "page-link disable" : "page-link"}
              onClick={(e) => {
                currentPage !== 1 ? firstPage(e) : e.stopPropagation();
              }}
            >
              <i className="fa fa-caret-right"></i>
            </a>
          </li>
          <li className="page-item">
            <a
              className={currentPage === 1 ? "page-link disable" : "page-link"}
              onClick={(e) => {
                currentPage !== 1 ? prevChange(e) : e.stopPropagation();
              }}
            >
              <i className="fa fa-caret-right"></i>
              <i className="fa fa-caret-right"></i>
            </a>
          </li>
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a
                style={{
                  cursor: "pointer",
                }}
                className="page-link"
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              className={
                currentPage === pagesCount ? "page-link disable" : "page-link"
              }
              onClick={(e) => {
                currentPage !== pagesCount
                  ? nextChange(e)
                  : e.stopPropagation();
              }}
            >
              <i className="fa fa-caret-left"></i>
              <i className="fa fa-caret-left"></i>
            </a>
          </li>
          <li className="page-item">
            <a
              className={
                currentPage === pagesCount ? "page-link disable" : "page-link"
              }
              onClick={(e) => {
                currentPage !== pagesCount ? lastPage(e) : e.stopPropagation();
              }}
            >
              <i className="fa fa-caret-left"></i>
            </a>
          </li>
        </ul>
      </nav>
      <TableItemsCount
        currentPage={currentPage}
        pagesCount={pagesCount}
        pageSize={pageSize}
        currentPageDataLength={currentPageDataLength}
        itemsCount={itemsCount}
      />
    </div>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
