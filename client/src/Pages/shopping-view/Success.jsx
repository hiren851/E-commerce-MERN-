import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchCartItems } from "@/Store/shop/cart-slice";
import { capturePayment } from "@/Store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate()
  const {user} = useSelector(state => state.auth)
  const {cartItems} = useSelector(state => state.shopCart)
  
  const dispatch = useDispatch();
  

  useEffect(()=>{
    const getCurrentOrderId = JSON.parse(sessionStorage.getItem('currentOrderId'));

    dispatch(capturePayment( getCurrentOrderId )).then((data)=>{
      if(data?.payload?.success){
        sessionStorage.removeItem("currentCartId")
      }
    })

  },[dispatch])

  // useEffect(()=>{
  //   dispatch(fetchCartItems(user.id))
  // },[dispatch])


  return ( 
   <Card className="p-10">
    <CardHeader className="p-0">
      <CardTitle className="text-4xl">
        Payment is successful
      </CardTitle>
    </CardHeader>
    <Button className="mt-5" onClick={()=>navigate('/shop/account')}>
      View Orders
    </Button>
   </Card>
   );
}

export default PaymentSuccess;
