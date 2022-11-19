import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { payload } = action;
      console.log("payload", payload);
      // if (state.orders[payload.reservationId]) {
      //   console.log("mar van");
      // }

      state.orders = [...state.orders, ...action.payload];
    },
    removeItem: (state, action) => {
      const index = state.orders.findLastIndex(
        (order) =>
          order.reservationId === action.payload.reservationId &&
          order.id === action.payload.id
      );

      if (index > -1) {
        state.orders.splice(index, 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem } = orderSlice.actions;

export default orderSlice.reducer;
