import { useEffect, useState } from "react";
import "./App.css";
// import MyButton from "./components/ui/Button";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import AdminLayout from "./components/admin-view/Layout";
import AdminDashboard from "./Pages/admin-view/Dashboard";
import AdminProducts from "./Pages/admin-view/Products";
import AdminOrders from "./Pages/admin-view/Orders";
import AdminFeatures from "./Pages/admin-view/Features";
import ShoppingLayout from "./components/shopping-view/Layout";
import ErrorPage from "./Pages/ErrorPage";
import ShoppingHome from "./Pages/shopping-view/Home";
import ShoppingListing from "./Pages/shopping-view/Listing";
import ShoppingCheckout from "./Pages/shopping-view/Checkout";
import ShoppingAccount from "./Pages/shopping-view/Account";
import CheckAuth from "./components/common/Check-auth";
import UnAuthPage from "./Pages/un-auth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./Store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import PaymentSuccess from "./Pages/shopping-view/Success";
import PaymentCancel from "./Pages/shopping-view/Cancel";
import Search from "./Pages/shopping-view/Search";

function App() {



  const {user,isAuthenticated,isLoading} = useSelector(state=> state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    const token = JSON.parse(sessionStorage.getItem('token'))
    dispatch(checkAuth(token))
  },[dispatch])


  if(isLoading) return  <div>
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[250px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  </div>
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      
      <Routes>
        <Route 
        path="/"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          
          </CheckAuth>
        }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated}  user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="success" element={<PaymentSuccess/>}/>
          <Route path="cancel" element={<PaymentCancel/>}/>
          <Route path="search" element={<Search/>}/>
        </Route>
        <Route path="/unauth-page" element={<UnAuthPage/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
