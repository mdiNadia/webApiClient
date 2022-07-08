const TableItemsCount = ({
  currentPage,
  pagesCount,
  pageSize,
  currentPageDataLength,
  itemsCount,
}) => {
  return (
    <div>
      <span>
        صفحه <strong>{currentPage}</strong> از{" "}
        <strong>{isNaN(pagesCount) ? 0 : pagesCount}</strong>
      </span>
      {` | `}
      <span>
        نمایش <strong>{(currentPage - 1) * pageSize + 1}</strong> تا{" "}
        <strong>
          {(currentPage - 1) * pageSize + 1 + currentPageDataLength - 1}
        </strong>{" "}
        از <strong>{itemsCount}</strong>
      </span>
    </div>
  );
};

export default TableItemsCount;
