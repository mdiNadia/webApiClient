import { Form } from "react-bootstrap";

const TableItemsShow = ({ setPageSizeValue, pageSizeValue, itemsCount }) => {
  return (
    <Form.Group
      controlId="exampleForm.SelectCustom"
      className="sortbox"
      style={{
        width: "165px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        paddingRight: "10px",
      }}
    >
      <Form.Label style={{ width: "230px" }}>تعداد نمایش :</Form.Label>
      <Form.Control
        as="select"
        custom="true"
        value={pageSizeValue}
        onChange={(e) => {
          setPageSizeValue(e.target.value);
        }}
        style={{ padding: "0.1rem 0.75rem" }}
      >
        <option value={4}>4</option>
        <option value={12}>12</option>
        <option value={36}>36</option>
        <option value={itemsCount}>همه</option>
      </Form.Control>
    </Form.Group>
  );
};

export default TableItemsShow;
