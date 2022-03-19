import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface SetLocationResponseType {
  day: number;
  gameState: string;
  location: string;
  prices: PricesStateType;
}

export interface PricesStateType {
  massageChairs: number;
  cellPhones: number;
  switchblades: number;
  hotSauce: number;
  dvds: number;
  fakeShoes: number;
}

export interface StashStateType {
  massageChairs: number;
  cellPhones: number;
  switchblades: number;
  hotSauce: number;
  dvds: number;
  fakeShoes: number;
  bank: number;
  debt: number;
}

export interface TrenchCoatStateType {
  massageChairs: number;
  cellPhones: number;
  switchblades: number;
  hotSauce: number;
  dvds: number;
  fakeShoes: number;
  cornDogs: number;
  cash: number;
  maxHold: number;
}

interface GameManagerStateType {
  gameState?: string;
  day: number;
  maximumBuy: number | undefined;
  currentItem: string;
}

interface MaximumBuyStateType {
  maximumBuy: number;
  currentItem: string;
}

interface FleaMarketStateType {
  value: number;
  prices: PricesStateType;
  gameManager: GameManagerStateType;
  stash: StashStateType;
  trenchCoat: TrenchCoatStateType;
  location: string;
}
interface PostBuyStateType {
  trenchCoat: TrenchCoatStateType;
  maximumBuy: number | undefined;
  currentItem: string;
  gameState: string;
}

const initialState: FleaMarketStateType = {
  value: 0,
  prices: {
    massageChairs: 0,
    cellPhones: 0,
    switchblades: 0,
    hotSauce: 0,
    dvds: 0,
    fakeShoes: 0,
  },
  stash: {
    massageChairs: 0,
    cellPhones: 0,
    switchblades: 0,
    hotSauce: 0,
    dvds: 0,
    fakeShoes: 0,
    bank: 0,
    debt: 0,
  },
  trenchCoat: {
    massageChairs: 0,
    cellPhones: 0,
    switchblades: 0,
    hotSauce: 0,
    dvds: 0,
    fakeShoes: 0,
    cornDogs: 0,
    cash: 0,
    maxHold: 0,
  },
  gameManager: {
    gameState: "init",
    day: 0,
    maximumBuy: undefined,
    currentItem: "",
  },
  location: "",
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
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setDay: (state, action: PayloadAction<number>) => {
      state.gameManager.day = action.payload;
    },
    setMaximumBuy: (state, action: PayloadAction<MaximumBuyStateType>) => {
      state.gameManager.maximumBuy = action.payload.maximumBuy;
      state.gameManager.currentItem = action.payload.currentItem;
    },
    setPostBuy: (state, action: PayloadAction<PostBuyStateType>) => {
      state.trenchCoat = action.payload.trenchCoat;
      state.gameManager.maximumBuy = action.payload.maximumBuy;
      state.gameManager.currentItem = action.payload.currentItem;
      state.gameManager.gameState = action.payload.gameState;
    },
    setLocationResponse: (
      state,
      action: PayloadAction<SetLocationResponseType>
    ) => {
      state.location = action.payload.location;
      state.gameManager.day = action.payload.day;
      state.gameManager.gameState = action.payload.gameState;
      state.prices = action.payload.prices;
    },
  },
});

//actions
export const {
  setPrices,
  setGameState,
  setStash,
  setTrenchCoat,
  setLocation,
  setLocationResponse,
  setDay,
  setMaximumBuy,
  setPostBuy,
} = fleaMarketSlice.actions;

//selectors
export const selectPrices = (state: RootState) => state.fleaMarket.prices;
export const selectStash = (state: RootState) => state.fleaMarket.stash;
export const selectLocation = (state: RootState) => state.fleaMarket.location;
export const selectTrenchCoat = (state: RootState) =>
  state.fleaMarket.trenchCoat;
export const selectGameState = (state: RootState) =>
  state.fleaMarket.gameManager.gameState;
export const selectDay = (state: RootState) => state.fleaMarket.gameManager.day;
export const selectMaximumBuy = (state: RootState) =>
  state.fleaMarket.gameManager.maximumBuy;
export const selectCurrentItem = (state: RootState) =>
  state.fleaMarket.gameManager.currentItem;

export default fleaMarketSlice.reducer;
