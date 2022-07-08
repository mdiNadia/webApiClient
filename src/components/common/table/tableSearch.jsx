import { Form } from "react-bootstrap";

const TableSearch = ({
  setSearchValue,
  searchValue,
  onPageChange,
  setKeyValue,
}) => {
  return (
    <div className="searchbox">
      <Form.Group action="/" method="get" className="searchbox d-flex">
        <input
          type="text"
          id="header-search"
          placeholder="جستجو کنید..."
          name="search"
          onChange={(e) => {
            e.preventDefault();

            setSearchValue(e.target.value);
          }}
          onClick={() => {
            setKeyValue("");
          }}
          onKeyPress={() => {
            onPageChange(1);
          }}
          value={searchValue}
        />
        <a
          onClick={(e) => {
            e.preventDefault();
            onPageChange(1);
          }}
          type="submit"
        >
          <i className="fa fa-search"></i>
        </a>
      </Form.Group>
    </div>
  );
};

export default TableSearch;
