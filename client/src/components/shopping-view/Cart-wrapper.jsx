import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UsercartItemContent from "./Cart-items-content";

function UserCartWrapper({ cartItem ,setOpenCartSheet }) {
  const navigate = useNavigate()

  const totalCartAmount =
    cartItem && cartItem.length > 0
      ? cartItem.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity , 0
        )
      : 0;
  // console.log(cartItem)
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4 ">
        {/* {console.log(cartItem)} */}
        {cartItem && cartItem.length > 0
          ? cartItem.map((item) => (
              <UsercartItemContent
                key={item.productId}
                cartItem={item}
              />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">₹{totalCartAmount}</span>
        </div>
      </div>
      <Button className="w-full mt-6" onClick={()=>{
        navigate('/shop/checkout')
        setOpenCartSheet(false)
      }}>Checkout</Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
