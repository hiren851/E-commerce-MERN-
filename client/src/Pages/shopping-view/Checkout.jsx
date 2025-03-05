import Address from "@/components/shopping-view/Address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/Cart-items-content";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { createOrder } from "@/Store/shop/order-slice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { clearCart } from "@/Store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
// import {loadStripe} from '@stripe/react-stripe-js'

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const navigate = useNavigate();
  const {toast} = useToast()

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  // console.log(currentSelectedAddress)
  const handlePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51QxPWqA8ZItKkZV01uAeLxLSvG5ycsSHTJNI9csn6qjm2i7rfyKW332AujGAhYj6QqUMeB9hHUoP8yz6no3G70gs00RMFvv6ic"
      );

      if ( cartItems.items.length == 0 ) {
       toast({
        title : 'Your card is empty ! please add some items to cart',
        variant: 'destructive'
       });

       return;
      }

      if (currentSelectedAddress == null) {
       toast({
        title : 'Please select an address',
        variant: 'destructive'
       });

       return
      }

      const orderDetails = {
        cartId: cartItems._id,
        cartItems: cartItems.items.map((item) => ({
          productId: item?.productId,
          title: item?.title,
          image: item?.image,
          price: item?.salePrice > 0 ? item?.salePrice : item?.price,
          quantity: item?.quantity,
        })),
        addressInfo: {
          addressId: currentSelectedAddress?._id,
          address: currentSelectedAddress?.address,
          city: currentSelectedAddress?.city,
          state: currentSelectedAddress?.state,
          country: currentSelectedAddress?.country,
          pincode: currentSelectedAddress?.pincode,
          phone: currentSelectedAddress?.phone,
          notes: currentSelectedAddress?.notes,
        },
        totalAmount: totalCartAmount,
        userId: user.id,
        userEmail: user.email,
        orderStatus: "pending",
        paymentMethod: "Stripe",
        paymentStatus: "pending",
        orderDate: new Date(),
        orderUpdateDate: new Date(),
        paymentId: "",
        payerId: "",
      };

      const response = await dispatch(createOrder(orderDetails));

      if (response?.payload?.id) {
        const result = await stripe.redirectToCheckout({
          sessionId: response.payload.id,
        });



    // const orderId = response.payload.id;
        
        if (result.error) {
          console.error(result.error);
        }
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {/* {console.log(cartItems)} */}
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItems={item} key={item.productId} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button className="w-full" onClick={handlePayment}>
              Checkout With Stripe{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
