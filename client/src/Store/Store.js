import  { configureStore }  from "@reduxjs/toolkit";
import authReducer   from "./auth-slice"
import adminProductSLice  from './admin/products-slice'
import adminOrderSlice from './admin/products-slice/order-slice'
import shopProductSLice  from './shop/product-slice'
import shopCartSlice  from './shop/cart-slice'
import shopAddressSlice  from './shop/address-slice'
import OrderSlice  from './shop/order-slice'
import SearchSlice  from './shop/search-slice'
import reviewSlice  from './shop/review-slice'
import commonFeatureSlice  from './common-slice'

const store = configureStore({
    reducer : {
        auth: authReducer,
        adminProducts : adminProductSLice,
        adminOrder : adminOrderSlice,
        shopProducts : shopProductSLice,
        shopCart : shopCartSlice,
        shopAddress : shopAddressSlice,
        shopOrder : OrderSlice,
        shopSearch : SearchSlice,
        shopReview : reviewSlice,
        commonFeature : commonFeatureSlice
    }
})

export default store;