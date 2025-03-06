import { Minus, Plus, Trash, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deletecartItems, updateCartQuantity } from "@/Store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
// import { title } from "process";

function UsercartItemsContent({ cartItem }) {
 
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const { productList } = useSelector((state) => state.shopProducts);
  const { productList } = useSelector((state) => state.shopProducts);

  const { cartItems } = useSelector((state) => state.shopCart);

  // console.log(cartItem)
  // console.log(productList)

  const { toast } = useToast();

  function handlecartItemsDelete(getcartItems) {
    dispatch(
      deletecartItems({ userId: user?.id, productId: getcartItems?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "cart item deleted sucessfully",
        });
      }
    });
  }

  function handleUpdateItemQty(getcartItem, typeOfAction) {
    if (typeOfAction == "plus") {
      let getcartItems = cartItems.items || [];

      if (getcartItems.length) {
        const indexOfCurrentcartItems = getcartItems.findIndex(
          (item) => item.productId === getcartItem?.productId
        );
        // console.log(productList[0]._id, getcartItems[0].productId);
        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getcartItem?.productId
        );
        // console.log(getCurrentProductIndex);
        if (getCurrentProductIndex === -1) {
          toast({
            title: "Product not found.",
            variant: "destructive",
          });
          return;
        }
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentcartItems > -1) {
          const getQuantity = getcartItems[indexOfCurrentcartItems].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });
            return;
          }
        }
      }
    }
    // console.log("asd")
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getcartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getcartItem?.quantity + 1
            : getcartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "cart Items updated sucessfully",
        });
      }
    });
  }

  // console.log(cartItem);
  return (
    <div className="flex items-center space-x-4">
      {console.log(cartItem)}
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={cartItem?.quantity == 1}
            onClick={() => handleUpdateItemQty(cartItem, "minus")}
          >
            <Minus className="w-4 h-4 " />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateItemQty(cartItem, "plus")}
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
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash2
          onClick={() => handlecartItemsDelete(cartItem)}
          className="cursor-pointer mt-1 "
          size={20}
        />
      </div>
    </div>
  );
}

export default UsercartItemsContent;
