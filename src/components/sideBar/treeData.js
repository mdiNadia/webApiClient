import React from "react";

function TreeData(content, tree, dataFilter, data) {
  if (
    //content.parentId !== 0
    content.parentId != null &&
    !dataFilter.find((c) => c.id === content.parentId)
  ) {
    data.forEach((element) => {
      if (element.id === content.parentId) {
        tree.push(element);
        //setDataFilter((dataFilter) => dataFilter.concat(element));
        TreeData(element, tree, dataFilter, data);
      }
    });
  }
}
export default TreeData;
