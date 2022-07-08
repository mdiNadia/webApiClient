import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ListItem from "./listItem";
import TreeData from "./treeData";

const SideBarModules = ({ search, setSearch }) => {
  const data = useSelector((state) => state.Module.payload);
  const [dataFilter, setDataFilter] = useState(data);
  var counter = 0;
  const handleFilter = (search) => {
    if (search) {
      var content =
        data && data.filter((c) => c.title.includes(search));
      const tree = [];
      if (content) {
        content.forEach((element) => {
          tree.push(element);
          TreeData(element, tree, dataFilter, data);
        });
      }
      setDataFilter(tree);
    } else {
      setDataFilter(data);
    }
  };
  useEffect(() => {
    handleFilter(search);
  }, [search, data]);
  console.log(dataFilter);

  return (
    <div className="navbar-nav">
      <ul className="temp-ul" key={`ul-${counter}`}>
        {dataFilter &&
          dataFilter.map((item) => {
            //someWhere parentId is 0 we can use inside if, "item.parentId === 0"
            if (item.parentId == null) {
              debugger;
              console.log(dataFilter);
              return (
                <li key={`li-p-${item.id}`} className="temp-li">
                  <ListItem
                    Controller={`/${item.controller}`}
                    Id={item.id}
                    Title={item.title}
                    dataFilter={dataFilter}
                    setDataFilter={setDataFilter}
                  />
                </li>
              );
            }
            counter++;
          })}
      </ul>
    </div>
  );
};

export default SideBarModules;
