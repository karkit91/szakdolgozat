import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: { items: [], inited: false },
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.orders.items = [...state.orders.items, ...action.payload];
      state.orders.inited = true;
    },
    removeItem: (state, action) => {
      const index = state.orders.items.findLastIndex(
        (order) =>
          order.reservationId === action.payload.reservationId &&
          order.id === action.payload.id
      );

      if (index > -1) {
        state.orders.items.splice(index, 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem } = orderSlice.actions;

export default orderSlice.reducer;
