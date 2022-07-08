import { ACTION_TYPE_LOGIN, ACTION_TYPE_LOGOUT } from "./userAction";

const UserReducer = (state, action) => {
  debugger
  switch (action.type) {
    case ACTION_TYPE_LOGIN:
      return {
        ...state,
        username: action.payload.username,
        token: action.payload.token,
      };
    case ACTION_TYPE_LOGOUT:
      localStorage.removeItem("token");
      return window.location.reload();

    default:
      return "";
  }
};   
export default UserReducer;
