import { Outlet } from "react-router-dom";
import AdminSideBar from "./Sidebar";
import AdminHeader from "./Header";
import { useState } from "react";

function AdminLayout() {

    const [openSidebar , setOpenSidebar] = useState(false);


    return ( 
        <div className="flex min-h-screen w-full text-emerald-900"> 
            <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} className=""/>
                <div className="flex flex-1 flex-col">
                    <AdminHeader setOpenSidebar={setOpenSidebar} />
                    <main className="flex flex-1 flex-col bg-muted/40 p-4 md:p-6">
                        <Outlet/>
                    </main>
                </div>
        </div>
     );
}

export default AdminLayout;