import { HousePlug, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { HiBuildingStorefront } from "react-icons/hi2";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";

function MenuItems() {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuitems) => (
        <Link
          key={menuitems.id}
          to={menuitems.path}
          className="text-sm font-medium"
        >
          {menuitems.label}
        </Link>
      ))}
    </nav>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2" to="/shop/home">
          {/* <HousePlug/> */}
          <HiBuildingStorefront className="h-8 w-8" />
          <span className="font-bold">ShopXpress</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {isAuthenticated ? <div></div> : null}
      </div>
    </header>
  );
}

export default ShoppingHeader;
