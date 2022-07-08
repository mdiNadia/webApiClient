import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import BasketItems from "../../../api/action/Basket";
import { _Basket, _Delete_Basket_Item, _update_Basket_Item } from "../../../api/api";
import { _Delete_Basket_ItemAction, _Get_Basket_Items, _Get_Basket_ItemsAction, _Update_Basket_ItemAction } from "../../../store/Basket/BasketAction";
import { LoadingOutlined } from "@ant-design/icons";
import './basket.scss'
import PutData from "../../../api/action/put";
import DeleteData from "../../../api/action/delete";
const Basket = () => {
    const data = useSelector((state) => state.Basket.payload);
    const [flag,setFlag]=useState(0);
    const dispatch = useDispatch();
    let match = useRouteMatch();
    const history = useHistory();
    var [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
  ///////////////////////////////////////////////
    const getData = async () => {
      BasketItems({
        url: _Basket,
        action: _Get_Basket_ItemsAction,
        dispatch: dispatch,
        setLoading: setLoading,
      });
    };

  //حذف دیتا
  //////////////////////////////////////////////
  const handleDelete = (item) => {
    DeleteData({
      url: _Delete_Basket_Item,
      id: item.id,
      action: _Delete_Basket_ItemAction,
      dispatch: dispatch,
    });
  };
/////////////////////////////////////
const updateBasketItem=(itemId,itemQty)=>{
     console.log(itemId,itemQty);
      PutData({
        url:_update_Basket_Item,
        form: {itemId:itemId,itemQty:itemQty},
        action: _Update_Basket_ItemAction,
        dispatch: dispatch,
        
        setErrors: setErrors,
      });

  };

////////////////////////////////////
const handleItemQuantity = (itemId,itemQty,plus) => {
  if(itemId != null){
      itemQty = itemQty + (plus);
      if(itemQty > 0){
        updateBasketItem(itemId,itemQty);
        setFlag(1);
      }
  }
};
useEffect(()=>{
  getData();
  setFlag(0);
},[flag]);
 
//////////////////////////////////////////////
///برای بار اول که وارد میشیم
useEffect(()=>{
     setLoading(true);
     getData();
  },[dispatch]);
return ( 
<>
{!loading ? (
  <>
    <div className="content-box">
    
      
    </div>
    <div className="content-box">
      <div className="pt-1 search-sort-box">
      { console.log(data)}
      
      <table className="table">
        <thead>
          <tr>
         <td>آیدی محصول</td> 
            <td>تصویر</td>
            <td>نام</td>
            <td>قیمت تک</td>
            <td>تعداد</td>
            <td>قیمت کل</td>
            <td>عملیات </td>
          </tr>
        </thead>
        <tbody>
        {data && data.map((item)=>{
          
           return(
            <tr key={item.id}>
             <td>{item.productId}</td>

            <td>

            {item.name}
            </td>
            <td>
                {item.image}
            </td>
            <td>
            {item.price}
            </td>
            <td>
<button className="btn btn-success btn-sm" onClick={(e)=>{
  e.preventDefault();
  handleItemQuantity(item.id,item.qty,1)}}>
  +
</button>
              <input
              //defaultValue={1}
              value={item.qty}
              id={`input${item.id}`}
              className="itemQty"
              onChange={
                (e)=>{ 
                  e.preventDefault()
                }
              }
              />
          <button className="btn btn-warning btn-sm" onClick={(e)=>{
            e.preventDefault();
            handleItemQuantity(item.id,item.qty,-1)}}>
 -
</button>
            </td>

            <td id={item.id}>{item.price * item.qty}</td>
            <td>
          
              <button className="btn btn-danger btn-sm" onClick={()=>{handleDelete(item)}}>
               حذف از سبدخرید
              </button>

            </td>
            </tr>
           )


           
         })}
         
        </tbody>

          </table>
<div className="btn-content mt-4">
<button className="btn btn-info btn-lg">
ادامه خرید
          </button>
<button className="btn btn-success btn-lg">
            پرداخت
          </button>
</div>
      </div>
    </div>
  </>
) : (
  <div className="loader">
    <LoadingOutlined
      style={{
        fontSize: 35,
        color: "#001529",
      }}
      spin
    />
  </div>
)}
</>
     );
}
 
export default Basket;