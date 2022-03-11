import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface PricesStateType {
  golfCarts: number;
  cellPhones: number;
  pocketKnives: number;
  hotSauce: number;
  dvds: number;
  nachos: number;
}

export interface StashStateType {
  golfCarts: number;
  cellPhones: number;
  pocketKnives: number;
  hotSauce: number;
  dvds: number;
  nachos: number;
  bank: number;
  debt: number;
}

export interface TrenchCoatStateType {
  golfCarts: number;
  cellPhones: number;
  pocketKnives: number;
  hotSauce: number;
  dvds: number;
  nachos: number;
  cornDogs: number;
  cash: number;
  maxHold: number;
}

interface GameManagerStateType {
  gameState?: string;
  day: number;
}

interface FleaMarketStateType {
  value: number;
  prices: PricesStateType;
  gameManager: GameManagerStateType;
  stash: StashStateType;
  trenchCoat: TrenchCoatStateType;
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
  stash: {
    golfCarts: 0,
    cellPhones: 0,
    pocketKnives: 0,
    hotSauce: 0,
    dvds: 0,
    nachos: 0,
    bank: 0,
    debt: 0,
  },
  trenchCoat: {
    golfCarts: 0,
    cellPhones: 0,
    pocketKnives: 0,
    hotSauce: 0,
    dvds: 0,
    nachos: 0,
    cornDogs: 0,
    cash: 0,
    maxHold: 0,
  },
  gameManager: {
    gameState: "init",
    day: 0,
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
    setStash: (state, action: PayloadAction<StashStateType>) => {
      state.stash = action.payload;
    },
    setTrenchCoat: (state, action: PayloadAction<TrenchCoatStateType>) => {
      state.trenchCoat = action.payload;
    },
  },
});

//actions
export const { setPrices, setGameState, setStash, setTrenchCoat } =
  fleaMarketSlice.actions;

//selectors
export const selectPrices = (state: RootState) => state.fleaMarket.prices;
export const selectStash = (state: RootState) => state.fleaMarket.stash;
export const selectTrenchCoat = (state: RootState) =>
  state.fleaMarket.trenchCoat;
export const selectGameState = (state: RootState) =>
  state.fleaMarket.gameManager.gameState;
export const selectDay = (state: RootState) => state.fleaMarket.gameManager.day;

export default fleaMarketSlice.reducer;
