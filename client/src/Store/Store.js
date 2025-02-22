import  { configureStore }  from "@reduxjs/toolkit";
import authReducer   from "./auth-slice"
import adminProductSLice  from './admin/products-slice'

const store = configureStore({
    reducer : {
        auth: authReducer,
        adminProducts : adminProductSLice
    }
})

export default store;