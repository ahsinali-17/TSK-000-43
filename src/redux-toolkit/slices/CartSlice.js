import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
    addItem: (state, action) => {
      const exists = state.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.push({ ...action.payload, quantity: 1 });

      }
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.price = (item.price/item.quantity)*(item.quantity+1)
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.price = (item.price/item.quantity)*(item.quantity-1)
        item.quantity -= 1;
      }
  },
}
});

export const {setCart, addItem, removeItem, incrementQuantity, decrementQuantity} = cartSlice.actions;

export default cartSlice.reducer;
