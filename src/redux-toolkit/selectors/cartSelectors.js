export const getTotalPayment = (state) =>
  Math.round(state.cart.reduce((total, item) => total + (item.price || 0), 0));

export const displayProducts = (state) =>
  state.products?.data?.slice(
    state.products.page * 6,
    state.products.page * 6 + 6
  ) || state.products.data;
