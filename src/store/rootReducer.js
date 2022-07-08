import { combineReducers } from "redux";
import SideBarReducer from "./sideBar/sideBarReducer";
import SliderReducer from "./slider/sliderReducer";
import UserReducer from "./user/userReducer";
import ProductReducer from "./product/productReducer";
import BasketReducer from "./Basket/BasketReducer";
import ModuleReducer from "./Module/ModuleReducer";

export const rootReducer = combineReducers({
  User: UserReducer,
  HandleSidabar: SideBarReducer,
  Slider: SliderReducer,
  Module: ModuleReducer,
  Product:ProductReducer,
  Basket:BasketReducer,
});
