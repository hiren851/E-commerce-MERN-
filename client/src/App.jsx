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

function App() {



  const {user,isAuthenticated,isLoading} = useSelector(state=> state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])


  if(isLoading) return  <div>Loading....</div>
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      
      <Routes>
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
        </Route>
        <Route path="/unauth-page" element={<UnAuthPage/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
