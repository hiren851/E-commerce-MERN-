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
import { fetchAllFilteredProducts } from "@/Store/shop/product-slice";
import SHoppingProductTile from "@/components/shopping-view/Product-tile";

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  const [sort,setSort] = useState(null)
  const [filter, setFilter] = useState({});

  function handleSort(value){
    console.log(value)
    setSort(value)
  }

  function handleFilter(getSectionId,getCurrentOption){
    console.log(getSectionId,getCurrentOption)
    let cpyFilters = { ...filter };
    const indexOfCurrentSection  = Object.keys(cpyFilters).indexOf(getSectionId)

    if(indexOfCurrentSection == -1 ){
        cpyFilters = {
            ...cpyFilters,
            [getSectionId] : [getCurrentOption]
         }
    }else{
        const indexOfCurrentSection = cpyFilters[getSectionId].indexOf(getCurrentOption);

        if(indexOfCurrentSection == -1 ) cpyFilters[getSectionId].push(getCurrentOption);
        else cpyFilters[getSectionId].splice(indexOfCurrentSection, 1);
    }

    setFilter(cpyFilters);
    sessionStorage.setItem("filters" , JSON.stringify(cpyFilters))
  }
  
useEffect(()=>{
    setSort("price-lowtohigh");
    setFilter(JSON.parse(sessionStorage.getItem("filters")) || {})
},[])
  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);
  console.log(filter);
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
                    <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
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
          {productList.length > 0
            ? productList.map((productItem) => (
                <SHoppingProductTile product={productItem} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
