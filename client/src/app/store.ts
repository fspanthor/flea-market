import { configureStore } from "@reduxjs/toolkit";
import fleaMarketReducer from "../redux/slices/fleaMarketSlice";

export const store = configureStore({
  reducer: {
    fleaMarket: fleaMarketReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {fleaMarket: fleaMarketReducer}
export type AppDispatch = typeof store.dispatch;
