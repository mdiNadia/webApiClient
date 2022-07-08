import React, { useEffect, useState } from "react";
import SideBarModules from "./sideBarModules";
import { Link } from "react-router-dom";
import api, { config, ROOT_URL, _Module } from "../../api/api";
import { useDispatch } from "react-redux";
import Search from "./search";
import { _Get_ModulesAction } from "../../store/Module/ModuleAction";
const SideBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    //برای گرفتن دیتای سایدبار
    ////////////////////////////////////////
    const fetchData = async () => {
      try {
        await api.get(`${ROOT_URL}${_Module}`, config).then((res) => {
          dispatch(_Get_ModulesAction(res.data));
        });
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    fetchData();
    ////////////////////////////////////////
  }, [dispatch]);
  return (
    <div className="sidebar">
      <Link
        className="navbar-brand"
        to="/"
        style={{
          textAlign: "center",
          paddinBottom: "0.3125rem",
          margin: "53px",
          position: "relative",
          top: "10px",
        }}
      >
        {/* <img src={} width={110} alt="پویان سایت" /> */}
      </Link>

      <nav className="navbar flex-column">
        <Search setInpuValue={setSearch} inputValue={search} />
        <div className="colaps">
          <SideBarModules search={search} setSearch={setSearch} />
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
