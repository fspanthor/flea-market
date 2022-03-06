import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface PricesStateType {
  golfCarts: number;
  cellPhones: number;
  pocketKnives: number;
  hotSauce: number;
  dvds: number;
  nachos: number;
}

interface GameManagerStateType {
  gameState?: string;
}

interface FleaMarketStateType {
  value: number;
  prices: PricesStateType;
  gameManager: GameManagerStateType;
}

const initialState: FleaMarketStateType = {
  value: 0,
  prices: {
    golfCarts: 0,
    cellPhones: 0,
    pocketKnives: 0,
    hotSauce: 0,
    dvds: 0,
    nachos: 0,
  },
  gameManager: {
    gameState: "init",
  },
};

//reducer
export const fleaMarketSlice = createSlice({
  name: "fleaMarket",
  initialState,
  reducers: {
    setPrices: (state, action: PayloadAction<PricesStateType>) => {
      state.prices = action.payload;
    },
    setGameState: (state, action: PayloadAction<string>) => {
      state.gameManager.gameState = action.payload;
    },
  },
});

//actions
export const { setPrices, setGameState } = fleaMarketSlice.actions;

//selectors
export const selectPrices = (state: RootState) => state.fleaMarket.prices;
export const selectGameState = (state: RootState) =>
  state.fleaMarket.gameManager.gameState;

export default fleaMarketSlice.reducer;
