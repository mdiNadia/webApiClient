import { _Get_Modules } from "./ModuleAction";
const ModuleReducer = (state = [], action) => {
  switch (action.type) {
    case _Get_Modules:
      return { ...state, payload: action.payload };

    default:
      return state;
  }
};
export default ModuleReducer;
