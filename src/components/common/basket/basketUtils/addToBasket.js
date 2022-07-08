import { useDispatch } from "react-redux";
import PostData from "../../../../api/action/post";
import { _Add_Basket_Item } from "../../../../api/api";
import { _Add_Basket_ItemAction } from "../../../../store/Basket/BasketAction";

const AddToBasket = (product,dispatch) => {
    PostData({
      url: _Add_Basket_Item,
      form:{id:product.id},
      action: _Add_Basket_ItemAction,
      dispatch: dispatch,
    });
  };
  export default AddToBasket;