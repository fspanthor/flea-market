import { configureStore } from "@reduxjs/toolkit";
import fleaMarketReducer from "../redux/slices/fleaMarketSlice";

export default configureStore({
  reducer: {
    fleaMarket: fleaMarketReducer,
  },
});
