import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderDetails: null,
  orderId: null,
  url: null,
  isLoading: false,
  orderList: [],
  orderData: null,
};

export const createOrder = createAsyncThunk(
  "/order/createOrder",
  async (orderDetails) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/order/payment-checkout`,
      orderDetails
    );
    return response.data;
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async (orderId) => {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/order/capture`,
      
       { orderId}, // Updating payment status
      
    );
    return response.data;
  }
);
export const getAllOrderByUser = createAsyncThunk(
  "/order/AllOrders",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`

    );
    return response.data;
  }
);
export const getOrdersDetails = createAsyncThunk(
  "/order/orderDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/order/details/${id}`
    );
    return response.data;
  }
);

const OrderSlice = createSlice({
  name: "OrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state)=>{
      state.orderData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload;
        state.url = action.payload.url;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
        sessionStorage.setItem(
          "currentCartId",
          JSON.stringify(action.payload.cartId)
        ); // Assuming cartId is part of the payload

        // Set currentOrderId and currentCartId in session storage
        // sessionStorage.setItem("currentCartId", JSON.stringify(action.payload.cartId)); // Assuming cartId is part of the payload
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = [];
        state.url = null;
        state.orderId = null;
      })
      .addCase(capturePayment.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
      })
      .addCase(getAllOrderByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrderByUser.fulfilled, (state,action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrderByUser.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrdersDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersDetails.fulfilled, (state,action) => {
        state.isLoading = false;
        state.orderData = action.payload.data;
      })
      .addCase(getOrdersDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderData = null;
      });
  },
});


export const {resetOrderDetails} = OrderSlice.actions
export default OrderSlice.reducer;
