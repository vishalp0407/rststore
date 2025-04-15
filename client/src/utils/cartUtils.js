export const updateCart = (state) => {
  // Calculate items price
  state.itemsPrice = state.cartItems
    .reduce((acc, currVal) => acc + currVal.price * currVal.qty, 0)
    .toFixed(2);

  // Calculate shipping price
  state.shippingPrice = (+state.itemsPrice > 5000 ? 0 : 5000).toFixed(2);

  // Calculate tax price
  state.taxPrice = (0.18 * +state.itemsPrice).toFixed(2);

  // Calculate total price
  state.totalPrice = (
    +state.itemsPrice +
    +state.shippingPrice +
    +state.taxPrice
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
