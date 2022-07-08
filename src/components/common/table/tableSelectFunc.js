export const SelectAll = (
  setIsCheckAll,
  isCheckAll,
  setSelectedItems,
  content,
  e,
  inputs
) => {
  setIsCheckAll(!isCheckAll);
  if (!e.target.checked) {
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
      var m = inputs[i].getAttribute("row");
      console.log(m);
    }
    setSelectedItems(content);
  }
};

export const Select = (e, row, selectedItems, setIsCheckAll, data) => {
  if (e.target.checked) {
    e.target.checked = e.target.checked;
    selectedItems && selectedItems.push(row);
  } else {
    e.target.checked = e.target.checked;
    selectedItems && selectedItems.pop((c) => c != row);
  }
  if (selectedItems?.length === data?.length) setIsCheckAll(true);
};

export const OnChangeSelect = (selectedItems) => {
  if (selectedItems) {
    var tableRow = document.getElementsByClassName("selected");
    for (let index = 0; index < tableRow.length; index++) {
      var res = selectedItems.find(
        (c) => c.shopSliders_ID == tableRow[index].id
      );
      if (res) tableRow[index].checked = true;
      else tableRow[index].checked = false;
    }
  }
};

export const OnChangeSelectAll = (
  isCheckAll,
  content,
  setSelectedItems,
  inputs
) => {
  if (isCheckAll) {
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].checked = isCheckAll;
      var m = inputs[i].getAttribute("row");
      console.log(m);
      content = content.concat(m);
    }
    setSelectedItems(content);
  }
};
