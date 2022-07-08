import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AngleIcon from "./arrowIcon";

const ListItem = ({ Id, Controller, Title, dataFilter, setDataFilter }) => {
  const [isToggleOn, setisToggle] = useState(false);
  const handleToggle = () => {
    setisToggle(!isToggleOn);
  };

  const hasChildrenLength =
    dataFilter &&
    dataFilter.filter((st) => st.parentId === Id).length > 0
      ? true
      : false;
  return (
    <>
      <NavLink
        to={hasChildrenLength ? "#" : `${Controller}`}
        key={Id}
        onClick={handleToggle}
      >
        <i className="fa fa-times p-1"></i>
        {Title}
        
      </NavLink>
      <AngleIcon
        hasChildrenLength={hasChildrenLength}
        isToggleOn={isToggleOn}
      />
      {isToggleOn ? (
       
        <>
          {dataFilter &&
            dataFilter
              .filter((st) => st.parentId === Id)
              .map(function (i) {
                return (
                  <ul
                    className="parent"
                    key={`ul-c-${i.id}`}
                    //className="child-ul"
                  >
                    <li key={i.id} className="child-li">
                      <ListItem
                        Controller={`/${i.controller}`}
                        Id={i.id}
                        Title={i.title}
                        dataFilter={dataFilter}
                        setDataFilter={setDataFilter}
                      />
                    </li>
                  </ul>
                );
              })}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ListItem;
