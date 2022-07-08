import {
  _Get_Products,

} from "./productAction";
const ProductReducer = (state = [], action) => {
  switch (action.type) {
    case _Get_Products:
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
    default:
      return state;
  }
};

export default ProductReducer;
