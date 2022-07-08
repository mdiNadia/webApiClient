import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

// export const BASE_Route_Url = "";
// export const BASE_Route_Url = "http://armanliftapi.asanito.com";
// export const ROOT_URL = `${BASE_Route_Url}/api`;
// export const ROOT_URL = "/api";
export const ROOT_URL = "https://localhost:44345";
export const BASE_Route_Url = "https://localhost:44345";
export const Static_Source_Url = "https://localhost:44345/UploadedFiles/Images/";

export const Token = localStorage.getItem("token");
export const config = {
  headers: {
    Authorization: `Bearer ${Token}`,
  },
};

// export const MEDIA_URL = `${BASE_Route_Url}/file/`;

/***** National Plate ******/

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export const _User_Login = "/Account/Login";
export const _User_LogOut = "/Account/LogOut";
export const _Get_ALL_ShopForm = "/Shopform";
//////////////////////////////////////////////////////
export const _Product = "/Product";
export const _Product_Report_Excel = "/Product/Report";
//////////////////////////////////////////////////////
export const _Basket="/Cart";
export const _Add_Basket_Item="/Cart/AddBasketItem";
export const _update_Basket_Item="/Cart/UpdateBasketItem";
export const _Delete_Basket_Item="/Cart/DeleteBasketItem"
///////////////////////////////////////////////////////
export const _Module="/Module";
///////////////////////////////////////////////////////
export const _Slider = "/Slider";
export const _Add_Slider="/Slider/AddSlider";
export const _Update_Slider="/Slider/UpdateSlider";
export const _Delete_Slider="/Slider/DeleteSlider";


