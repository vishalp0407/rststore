import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        state.cartItems = state.cartItems.map((cartItem) => {
          return cartItem._id === existingItem._id ? item : cartItem;
        });
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate items price
      state.itemsPrice = state.cartItems.reduce(
        (acc, currVal) => acc + currVal.price * currVal.qty,
        0
      );

      // Calculate shipping price
      state.shippingPrice = state.itemsPrice > 5000 ? 0 : 5000;

      // Calculate tax price
      state.taxPrice = 0.18 * state.itemsPrice;

      // Calculate total price
      state.totalPrice =
        state.itemsPrice + state.shippingPrice + state.taxPrice;

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice;
export default cartSlice.reducer;
