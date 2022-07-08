import { useSelector } from "react-redux";

export const _Get_Sliders = "_Get_Sliders";
export const _Delete_Slider = "_Delete_Slider";

export const _Add_Slider = "_Add_Slider";
export const _Edit_Slider = "_Edit_Slider";

export const _Get_SlidersAction = (response) => {
  return {
    type: _Get_Sliders,
    payload: response,
  };
};

export const _Delete_SliderAction = (response) => {
  return {
    type: _Delete_Slider,
    payload: response,
  };
};

export const _Add_SliderAction = (response) => {
  return {
    type: _Add_Slider,
    payload: response,
  };
};

export const _Edit_SliderAction = (response) => {
  return {
    type: _Edit_Slider,
    payload: response,
  };
};
