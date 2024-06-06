import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], changed: false },
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload;
    },
    add(state, action) {
      state.changed = true;
      const index = state.items.findIndex(
        (item) => item.title === action.payload.item.title
      );
      if (index > -1) {
        const item = state.items[index];
        item.quantity++;
      } else {
        state.items.push({
          ...action.payload.item,
          quantity: 1,
        });
      }
    },
    remove(state, action) {
      state.changed = true;
      const index = state.items.findIndex(
        (item) => item.title === action.payload.title
      );
      const item = state.items[index];
      const quantity = item.quantity;
      if (quantity > 1) {
        item.quantity--;
      } else {
        state.items.splice(index, 1);
      }
    },
  },
});


export const cartActions = cartSlice.actions;