import { capturePayment } from "@/Store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function PaymentSuccess() {

  const dispatch = useDispatch();

  useEffect(()=>{
    const getCurrentOrderId = JSON.parse(sessionStorage.getItem('currentOrderId'));

    dispatch(capturePayment( getCurrentOrderId )).then((data)=>{
      if(data?.payload?.success){
        sessionStorage.removeItem("currentCartId")
      }
    })

  },[dispatch])
  return ( 
    <div>
      success
    </div>
   );
}

export default PaymentSuccess;
