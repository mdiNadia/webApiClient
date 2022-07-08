import { useSelector } from "react-redux";

export const _Add_Basket_Item = "_Add_Basket_Item";
export const _Get_Basket_Items = "_Get_Basket_Items";
export const _Update_Basket_Item="_Update_Basket_Item";
export const _Delete_Basket_Item="_Delete_Basket_Item";
export const _Get_Basket_ItemsAction = (response) => {
  return {
    type: _Get_Basket_Items,
    payload: response,
  };
};
export const _Add_Basket_ItemAction = (response) => {
  return {
    type: _Add_Basket_Item,
    payload: response,
  };
};
export const _Update_Basket_ItemAction = (response) => {
  return {
    type: _Update_Basket_Item,
    payload: response,
  };
};
export const _Delete_Basket_ItemAction = (response) => {
  return {
    type: _Delete_Basket_Item,
    payload: response,
  };
};

