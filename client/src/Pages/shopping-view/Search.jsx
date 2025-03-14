import SHoppingProductTile from "@/components/shopping-view/Product-tile";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetails";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/Store/shop/cart-slice";
import { fetchProductDetails } from "@/Store/shop/product-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/Store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    // console.log(cartItems)

    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
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
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product Added to Cart",
        });
      }
    });
  }
  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) {
      setOpenProductDialog(true);
    }
  }, [productDetails]);

  // console.log(searchResults, "Search");
  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            className="py-6"
            placeholder="Search Products(more than 3 keywords)"
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No Results Found!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <SHoppingProductTile
            product={item}
            key={item._id}
            handleAddToCart={handleAddToCart}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openProductDialog}
        setOpen={setOpenProductDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default Search;
