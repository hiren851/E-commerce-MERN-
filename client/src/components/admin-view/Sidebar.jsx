import React, { Fragment } from "react";
import { MonitorCog, ShoppingBag, Tag } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Tag />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingBag />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex flex-col  gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() =>{ navigate(menuItem.path)
            setOpen ? setOpen(false) : null}
          }
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 font-bold hover:bg-gray-200 hover:text-black"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

const AdminSideBar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment >
      <Sheet open={open} onOpenChange={setOpen} className="w-64">
        <SheetContent side="left" className="w-64  bg-lime-500 text-emerald-900">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <MonitorCog size={30} strokeWidth={3} className="" />
                <span>Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r  p-6 lg:flex bg-lime-500 ">
        <div
          className="flex cursor-pointer items-center gap-2 "
          onClick={() => navigate("/admin/dashboard")}
        >
          <MonitorCog size={30} strokeWidth={3} className="" />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSideBar;
