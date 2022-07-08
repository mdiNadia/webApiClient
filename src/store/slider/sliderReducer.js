
import {
  _Delete_Slider,
  _Get_Sliders,
  _Add_Slider,
  _Edit_Slider,
} from "./sliderAction";
const SliderReducer = (state = [], action) => {
  switch (action.type) {
    case _Get_Sliders:
      debugger;
      return {
        ...state,
        payload: action.payload.result,
        totalCount: action.payload.count,
        take: action.payload.take ?? 4,
        page: action.payload.page ?? 1,
        search: action.payload.search ?? "",
        sortId: action.payload.sortId ?? "1",
        key: action.payload.key ?? "",
      };
    case _Add_Slider:
      if (action.payload != null) {
        return { ...state };
      }
    case _Edit_Slider:
      return { ...state };
    case _Delete_Slider:
      return {
        ...state,
        payload: state.payload.filter(
          (s) => s.id !== action.payload
        ),
        totalCount: state.totalCount - 1,
      };
    default:
      return state;
  }
};

export default SliderReducer;
