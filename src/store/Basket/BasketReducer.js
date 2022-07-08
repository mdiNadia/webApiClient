import { _Add_Basket_Item, _Delete_Basket_Item, _Get_Basket_Items, _Update_Basket_Item } from "./BasketAction";

const BasketReducer = (state = [], action) => {
  switch (action.type) {
    case _Add_Basket_Item:
      if(action.payload != null){
        return {
          ...state,
        };
      }
    case _Get_Basket_Items:
      return {...state,payload: action.payload}
    case _Update_Basket_Item:
      return { ...state};
    case _Delete_Basket_Item:
        return {
          ...state,
          payload: state.payload.filter(
            (s) => s.id !== action.payload
          ),
    };
    default:
      return state;
  }
};

export default BasketReducer;
