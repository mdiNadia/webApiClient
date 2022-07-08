import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import userM from "../../assets/images/userM.png";
import { _Get_Toggle_Handle_Value } from "../../store/sideBar/sideBarAction";
import { _USER_LOGOUT } from "../../store/user/userAction";
const styleInToggleoff =
  window.innerWidth > 500
    ? {
        width: " 7%",
        textAlign: "left",
        cursor: "pointer",
      }
    : {
        width: " 15%",
        textAlign: "left",
        cursor: "pointer",
      };
const styleInToggleOn =
  window.innerWidth > 500
    ? {
        textAlign: "left",
        cursor: "pointer",
      }
    : {
        textAlign: "left",
        cursor: "pointer",
        display: "block",
      };
const NavBar = ({ handleToggle }) => {
  const Toggle = useSelector((state) => state.HandleSidabar);
  const dispatch = useDispatch();
  return (
    <Nav style={{ position: "relative" }}>
      <div
        className="nav-brand-box"
        style={!Toggle.payload ? styleInToggleOn : styleInToggleoff}
      >
        <i
          className="fa fa-bars"
          onClick={(e) => {
            handleToggle(e);
          }}
          style={{ cursor: "pointer", padding: 10, color: "#001529" }}
        ></i>
      </div>

      <NavDropdown
        title={<img className="thumbnail-image" src={userM} alt="user pic" />}
      >
        <NavDropdown.Item
          onClick={() => {
            dispatch(_USER_LOGOUT());
          }}
        >
          خروج
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

export default NavBar;
