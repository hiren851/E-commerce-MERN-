import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
};

// Clear Cart

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      "http://localhost:7000/api/shop/cart/add",
      { userId, productId, quantity }
    );
    return response.data;
  }
);

// Fetch Cart Items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:7000/api/shop/cart/get/${userId}`
    );
    return response.data;
  }
);

// Delete a Cart Item
export const deletecartItems = createAsyncThunk(
  "cart/deletecartItems",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:7000/api/shop/cart/${userId}/${productId}`
    );
    return response.data;
  }
);

// Update Cart Quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      "http://localhost:7000/api/shop/cart/update-cart",
      { userId, productId, quantity }
    );
    return response.data;
  }
);

// export const clearCart = createAsyncThunk("cart/clearCart", async (userId) => {
//   const response = await axios.delete(
//     `http://localhost:7000/api/shop/cart/clear/${userId}`
//   );
//   return response.data;
// });

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deletecartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletecartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      // .addCase(clearCart.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(clearCart.fulfilled, (state) => {
      //   state.isLoading = false;
      //   state.cartItems = []; // Clear the cart state
      // })
      // .addCase(clearCart.rejected, (state) => {
      //   state.isLoading = false;
      // });
  },
});

export default shoppingCartSlice.reducer;
