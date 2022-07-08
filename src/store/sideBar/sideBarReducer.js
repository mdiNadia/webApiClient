import { _Toggle_Handle } from "./sideBarAction";

const SideBarReducer = (state, action) => {
  switch (action.type) {
    case _Toggle_Handle:
      return { ...state, payload: action.payload };
    default:
      return { ...state, payload: window.innerWidth > 767 ? false : true };
  }
};
export default SideBarReducer;
