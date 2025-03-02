import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderDetails: null,
  isLoading: false,
};

export const createOrder = createAsyncThunk(
  "/shop/createOrder",
  async (orderDetails) => {
    const response = await axios.post(
      "http://localhost:7000/api/shop/order/payment-checkout",
      orderDetails
    );
    return response.data;
  }
);

const OrderSlice = createSlice({
  name: "OrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createOrder.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderDetails = action.payload;
    })
    .addCase(createOrder.rejected, (state) => {
      state.isLoading = false;
      state.orderDetails = []; 
    });
  
  },
});

export default OrderSlice.reducer;
