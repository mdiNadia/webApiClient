import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import SideBar from "./components/sideBar/sideBar";
import NavBar from "./components/navBar/navBar";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/common/user/login";
import { parseJwtExpTime } from "./functions/parseJwt";
import api, { config, ROOT_URL, Token } from "./api/api";
import Slider from "./components/slider/slider";
import Home from "./components/home/home";
import Footer from "./components/footer/footer";
import { _Get_Toggle_Handle_Value } from "./store/sideBar/sideBarAction";
import SliderActions from "./components/slider/sliderActions";
import Product from "./components/product/product";
import Basket from "./components/common/basket/basket";
function App() {
  const Toggle = useSelector((state) => state.HandleSidabar);
  const dispatch = useDispatch();

  const handleToggle = (e) => {
    e.preventDefault();
    dispatch(_Get_Toggle_Handle_Value(!Toggle.payload));
  };

  //چک کردنِ کاربر با توکن
  //////////////////////////////////////////
  if (!Token || parseJwtExpTime(Token)) {
    localStorage.removeItem("token");
    return <Login />;
  }
  //////////////////////////////////////////
  const customeStyle = {};
  console.log(Toggle.payload);

  return (
    <>
      <div className="custome-row">
        <div
          className="side-column"
          style={
            !Toggle.payload
              ? { width: "18%", float: "right", display: "block", customeStyle }
              : { width: "0", display: "none" }
          }
        >
          <SideBar />
        </div>
        <NavBar handleToggle={handleToggle} />
        <div
          className="contetn-column container-fluid pt-3 pb-3"
          style={
            !Toggle.payload
              ? { width: "82%", float: "left" }
              : { width: "100%" }
          }
        >
          <Switch>
            <Route exact path="/Login" component={Login} />
            <Route path="/Footer" component={Footer} />
            <Route exact path="/Slider" component={Slider} />
            <Route exact path="/Product" component={Product} />
            <Route exact path="/Basket" component={Basket} />

            
            <Route path="/Slider/Create" component={SliderActions} />
            <Route path="/Slider/Edit/:id" component={SliderActions} />
            <Route path="/Slider/:id" component={SliderActions} />
            <Route exact path={["/", "/Home"]} component={Home} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
