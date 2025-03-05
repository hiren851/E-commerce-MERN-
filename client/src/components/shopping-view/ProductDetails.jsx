import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { addToCart, fetchcartItems } from "@/Store/shop/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/Store/shop/product-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getcartItems = cartItems.items || [];

    if (getcartItems.length) {
      const indexOfCurrentItem = getcartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getcartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchcartItems(user?.id));
        toast({
          title: "Product Added to Cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg ">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }}`}
            >
              ₹{productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ₹{productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
            </div>
            <span className="text-muted-foreground">(4.5)</span>
          </div>
          <div className="mt-5 mb-5 ">
            {
              productDetails?.totalStock === 0 ?  <Button
              className="w-full opacity-60 cursor-not-allowed"
             
            >
              Out Of Stock
            </Button>
            :
            <Button
            className="w-full"
            onClick={() =>
              handleAddToCart(productDetails._id, productDetails?.totalStock)
            }
          >
            Add to cart
          </Button>
            }
       
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto ">
            <h2 className="text-xl font-bold mb-4 ">Reviews</h2>
            <div className="grid gap-6 ">
              <div className="flex gap-4 ">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>Hk</AvatarFallback>
                </Avatar>
                <div className="grid gap-1 ">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Hiren Kanzariya</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground ">
                    This is an awesome product
                  </p>
                </div>
              </div>
              <div className="flex gap-4 ">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>Hk</AvatarFallback>
                </Avatar>
                <div className="grid gap-1 ">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Hiren Kanzariya</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground ">
                    This is an awesome product
                  </p>
                </div>
              </div>
              <div className="flex gap-4 ">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>Hk</AvatarFallback>
                </Avatar>
                <div className="grid gap-1 ">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Hiren Kanzariya</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground ">
                    This is an awesome product
                  </p>
                </div>
              </div>
              <div className="flex gap-4 ">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>Hk</AvatarFallback>
                </Avatar>
                <div className="grid gap-1 ">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Hiren Kanzariya</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground ">
                    This is an awesome product
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Input placeholder="write a review..." />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
