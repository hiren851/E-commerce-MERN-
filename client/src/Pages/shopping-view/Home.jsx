import { Button } from "@/components/ui/button";
import banner1 from "../../assets/b_1.webp";
import banner2 from "../../assets/b_2.webp";
import banner3 from "../../assets/b_3.webp";
import banner4 from "../../assets/b_4.webp";
import levis from "../../assets/levi.svg";
import hm from "../../assets/h-m.svg";

import {
  Baby,
  ChevronLeft,
  ChevronRight,
  Footprints,
  Glasses,
  Shirt,
  ShoppingBasket,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/Store/shop/product-slice";
import SHoppingProductTile from "@/components/shopping-view/Product-tile";
import { SiNike, SiAdidas, SiPuma, SiZara } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/Store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetails";
import { getFeatureImages } from "@/Store/common-slice";



// import { timeEnd } from "console";

const categoriesWithIcons = [
  { id: "men", label: "Men", icon: Shirt },
  { id: "women", label: "Women", icon: ShoppingBasket },
  { id: "kids", label: "Kids", icon: Baby },
  { id: "accessories", label: "Accessories", icon: Glasses },
  { id: "footwear", label: "Footwear", icon: Footprints },
];

const brandWithIcon = [
  { id: "nike", label: "Nike", icon: SiNike },
  { id: "adidas", label: "Adidas", icon: SiAdidas },
  { id: "puma", label: "Puma", icon: SiPuma },
  { id: "levi", label: "Levi's", icon: levis },
  { id: "zara", label: "Zara", icon: SiZara },
  { id: "h&m", label: "H&M", icon: hm },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const dispatch = useDispatch();
  const { productList,productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { featureImageList } = useSelector((state) => state.commonFeature);


  //   console.log(banner2);

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId) {
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featureImageList.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  useEffect(()=>{
    if(productDetails !== null){
      setOpenProductDialog(true);
    }
  },[productDetails])
  


    useEffect(() => {
      dispatch(getFeatureImages());
    }, [dispatch]);
  // console.log(productList);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList  && featureImageList.length> 0 ? featureImageList.map((slide, index) => (
          <img
            src={slide?.image}
            key={index}
            className={` ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-fill transition-opacity duration-1000`}
          />
        )) : null}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + featureImageList.length) % featureImageList.length
            )
          }
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % featureImageList.length)}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop By Category
          </h2>
          <div className="grid grid:cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcons.map((items) => (
              <Card key={items.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleNavigateToListingPage(items, "category")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 ">
                  <items.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{items.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop By Brand</h2>
          <div className="grid grid:cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandWithIcon.map((items) => (
              <Card key={items.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleNavigateToListingPage(items, "brand")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 ">
                  {typeof items.icon === "string" ? (
                    <img
                      src={items.icon}
                      alt={items.label}
                      className="w-16 h-16 mb-4"
                    />
                  ) : (
                    <items.icon className="w-12 h-12 mb-4 text-primary" />
                  )}
                  <span className="font-bold">{items.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <SHoppingProductTile key={productItem._id}
                    product={productItem}
                    handleAddToCart={handleAddToCart}
                    handleGetProductDetails={handleGetProductDetails}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openProductDialog}
        setOpen={setOpenProductDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
