import  { configureStore }  from "@reduxjs/toolkit";
import authReducer   from "./auth-slice"
import adminProductSLice  from './admin/products-slice'
import shopProductSLice  from './shop/product-slice'

const store = configureStore({
    reducer : {
        auth: authReducer,
        adminProducts : adminProductSLice,
        shopProducts : shopProductSLice
    }
})

export default store;