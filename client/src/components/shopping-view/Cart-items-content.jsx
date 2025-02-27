import { Minus, Plus, Trash, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/Store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
// import { title } from "process";

function UserCartItemsContent({ cartItems, key }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    )
    .then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "cart item deleted sucessfully",
          });
        }
      });;
  }

  function handleUpdateItemQty(getCartItem, typeOfAction) {
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "cart Items updated sucessfully",
        });
      }
    });
  }

  // console.log(cartItems?.salePrice)
  return (
    <div className="flex items-center space-x-4" key={key}>
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItems?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={cartItems?.quantity == 1}
            onClick={() => handleUpdateItemQty(cartItems, "minus")}
          >
            <Minus className="w-4 h-4 " />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItems?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateItemQty(cartItems, "plus")}
          >
            <Plus className="w-4 h-4 " />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ₹
          {(
            (cartItems?.salePrice > 0
              ? cartItems?.salePrice
              : cartItems.price) * cartItems?.quantity
          ).toFixed(2)}
        </p>
        <Trash2
          onClick={() => handleCartItemDelete(cartItems)}
          className="cursor-pointer nt-1 "
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
