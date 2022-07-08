import { Form } from "react-bootstrap";

const TableSort = ({ setSortValue, sortValue }) => {
  return (
    <>
      <Form.Group controlId="exampleForm.SelectCustom" className="sortbox">
        <Form.Label style={{ width: "230px" }}>مرتب‌سازی بر اساس : </Form.Label>
        <Form.Control
          as="select"
          custom="true"
          value={sortValue}
          onChange={(e) => {
            setSortValue(e.target.value);
          }}
          style={{ padding: "0.1rem 0.75rem" }}
        >
          <option value="1">جدیدترین</option>
          <option value="2">قدیمی‌ترین</option>
          <option value="3">حروف الفبا</option>
        </Form.Control>
      </Form.Group>
    </>
  );
};

export default TableSort;
