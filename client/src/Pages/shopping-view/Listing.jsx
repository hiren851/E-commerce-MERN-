import ProductFilter from "@/components/shopping-view/Filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/Store/shop/product-slice";
import SHoppingProductTile from "@/components/shopping-view/Product-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetails";
import { addToCart, fetchCartItems } from "@/Store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";


function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList,productDetails } = useSelector((state) => state.shopProducts);
  const [sort, setSort] = useState(null);
  const [filter, setFilter] = useState({});
  const [searchParams, setSearchParmas] = useSearchParams();
  const [openProductDialog ,setOpenProductDialog] = useState(false)
  const {user} = useSelector(state => state.auth)
  const {cartItems } = useSelector(state => state.shopCart)
  const {toast} = useToast();

  const categorySearchParams = searchParams.get('category')

 
  function handleSort(value) {
    console.log(value);
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    console.log(getSectionId, getCurrentOption);
    let cpyFilters = { ...filter };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection == -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentSection =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentSection == -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentSection, 1);
    }

    setFilter(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleGetProductDetails(getCurrentProductId){
    console.log(getCurrentProductId)
    dispatch(fetchProductDetails(getCurrentProductId))
  }

  function handleAddToCart(getCurrentProductId , getTotalStock){
    console.log(cartItems)

    let getCartItems = cartItems.items || [];

    if(getCartItems.length){
      const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === getCurrentProductId)
      if(indexOfCurrentItem > -1){
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if(getQuantity + 1 > getTotalStock ){
          toast({
            title : `Only ${getQuantity} quantity can be added for this item`,
            variant : 'destructive'
          })
        }
      }
    }


      dispatch(addToCart({userId : user.id , productId : getCurrentProductId , quantity : 1}))
      .then((data)=>{
        if(data?.payload?.success){
          dispatch(fetchCartItems(user?.id))
          toast({
            title: 'Product Added to Cart',
          })
        }
      })
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilter(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParams]);

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQueryString = createSearchParamsHelper(filter);
      setSearchParmas(new URLSearchParams(createQueryString));
    }
  }, [filter]);

  useEffect(() => {
    if (filter !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filter, sortParams: sort })
      );
  }, [dispatch, sort, filter]);

  useEffect(()=>{
    if(productDetails !== null){
      setOpenProductDialog(true);
    }
  },[productDetails])

  // console.log(productList, "ProductList")
  // console.log(productDetails);
  // console.log(openProductDialog)
  // console.log(cartItems)
// console.log(cartItems)
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filter={filter} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All products</h2>
          <div className="flex items-center gap-3 ">
            <span className="text-muted-foreground">
              {productList.length} products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4 " />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                    >
                      {" "}
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {productList.length > 0 ? (
            productList.map((productItem) => (
              <SHoppingProductTile
                key={productItem._id}
                product={productItem}
                handleGetProductDetails={handleGetProductDetails}
                handleAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No products found based on your filters.
            </div>
          )}

        </div>
      </div>
      <ProductDetailsDialog open={openProductDialog} setOpen={setOpenProductDialog} productDetails={productDetails}/>
    </div>
  );
}

export default ShoppingListing;
