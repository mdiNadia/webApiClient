import { useSelector } from "react-redux";

export const _Get_Products = "_Get_Products";
export const _Get_Report_Product = "_Get_Report_Product";


export const _Get_ProductsAction = (response) => {
  return {
    type: _Get_Products,
    payload: response,
  };
};
export const _Get_Report_ProductAction=()=>{
  return {
    
  }
}
