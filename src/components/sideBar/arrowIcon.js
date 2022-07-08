import React from "react";
function AngleIcon(props) {
  if (props.hasChildrenLength) {
    if (props.isToggleOn) {
      return <i className="fa fa-angle-down"></i>;
    } else {
      return <i className="fa fa-angle-left"></i>;
    }
  } else {
    return "";
  }
}

export default AngleIcon;
