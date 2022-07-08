const TableSelect = ({ id, onSelect, row }) => {
  return (
    <input
      className="form-check-input selected"
      id={id}
      type="checkbox"
      row={JSON.stringify(row)}
      onChange={(e) => {
        onSelect(e, row);
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    />
  );
};

export default TableSelect;
